import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DndProvider, XYCoord, useDrag, useDrop } from "react-dnd";
import cloneDeep from "lodash/cloneDeep";
import classNames from "classnames";
import { clamp, throttle } from "lodash";
import { BallState, DBGraphConnectionContext, DragDropSimulationContext } from "./components";

const DoubleBackContext = createContext<{
    cols: number;
    potentialTarget?: XYCoord;
    setPotentialTarget?: React.Dispatch<React.SetStateAction<XYCoord | undefined>>;
    gameOptions?: DoubleBackGameOptions;
} | undefined>(undefined);

const MouseOffsetContext = createContext<XYCoord | undefined>(undefined);

interface DoubleBackGameOptions {
    enableFlips?: boolean;
    showMoveCount?: boolean;
    interactive?: boolean;
    hideUselessMoves?: boolean;
}

const getAdjacentCoords = (position: XYCoord, cols: number) => {
    return [
        position.x > 0 ? { x: position.x - 1, y: position.y } : undefined,
        position.x > 0 ? { x: position.x - 1, y: (position.y + 1) % 2 } : undefined,
        position.x < cols - 1 ? { x: position.x + 1, y: position.y } : undefined,
        position.x < cols - 1 ? { x: position.x + 1, y: (position.y + 1) % 2 } : undefined,
        { x: position.x, y: (position.y + 1) % 2 },
    ].filter((coord) => coord) as XYCoord[];
};

function isValidMove(a: BallProps, b: BallProps, gameOptions?: DoubleBackGameOptions): boolean {
    if (a.id === b.id) return false;
    if (gameOptions?.hideUselessMoves) {
        return Math.abs(a.value - b.value) === 1 && Math.abs(a.position.x - b.position.x) <= 1;
    } else {
        return Math.abs(a.value - b.value) <= 1  && Math.abs(a.position.x - b.position.x) <= 1;
    }
}

interface BallProps {
    id: number;
    className?: string;
    value: number;
    position: XYCoord;
    swap?: (a: XYCoord, b: XYCoord) => void;
    setDragged?: React.Dispatch<React.SetStateAction<BallProps | undefined>>;
    lastDragged?: BallProps | undefined;
    setLastDragged?: React.Dispatch<React.SetStateAction<BallProps | undefined>>;
    isDragTarget?: boolean;
}

const Ball = (props : BallProps) => {
    const context = useContext(DoubleBackContext);
    const mouseContext = useContext(MouseOffsetContext);
    if (!context) return;
    const item = props;
    const ballRef = useRef<HTMLDivElement>(null);
    const ballWidth = ballRef.current?.clientWidth ?? 0;
    const TARGET_OFFSET = ballWidth / 2;

    const [{ isDragging, offset, draggedBall }, drag] = useDrag(
        () => ({
            type: "ball",
            item: item,
            canDrag() {
                return context.gameOptions?.interactive ?? true;
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                offset: {
                    x: (monitor.getClientOffset()?.x ?? 0) - (monitor.getInitialSourceClientOffset()?.x ?? 0) - ballWidth / 2,
                    y: (monitor.getClientOffset()?.y ?? 0) - (monitor.getInitialSourceClientOffset()?.y ?? 0) - ballWidth / 2,
                },
                draggedBall: monitor.getItem()?.id,
            }),
        }),
        [item]
    );

    useEffect(() => {
        if (!context) return;
        props.setDragged?.(isDragging ? props : undefined);
        if (isDragging) {
            props.setLastDragged?.(undefined);
        } else {
            context.setPotentialTarget?.(undefined);
        }
    }, [isDragging]);

    useEffect(() => {
        if (!offset) return;
        if (draggedBall !== props.id) return;
        if (props.position.y === 0) {
            if (offset.y > TARGET_OFFSET) {
                if (offset.x < -TARGET_OFFSET) {
                    context.setPotentialTarget?.({ x: props.position.x - 1, y: 1 });
                } else if (offset.x > TARGET_OFFSET) {
                    context.setPotentialTarget?.({ x: props.position.x + 1, y: 1 });
                } else {
                    context.setPotentialTarget?.({ x: props.position.x, y: 1 });
                }
            } else {
                if (offset.x < -TARGET_OFFSET) {
                    context.setPotentialTarget?.({ x: props.position.x - 1, y: 0 });
                } else if (offset.x > TARGET_OFFSET) {
                    context.setPotentialTarget?.({ x: props.position.x + 1, y: 0 });
                } else {
                    context.setPotentialTarget?.(undefined);
                }
            }
        } else {
            if (offset.y < -TARGET_OFFSET) {
                if (offset.x < -TARGET_OFFSET) {
                    context.setPotentialTarget?.({ x: props.position.x - 1, y: 0 });
                } else if (offset.x > TARGET_OFFSET) {
                    context.setPotentialTarget?.({ x: props.position.x + 1, y: 0 });
                } else {
                    context.setPotentialTarget?.({ x: props.position.x, y: 0 });
                }
            } else {
                if (offset.x < -TARGET_OFFSET) {
                    context.setPotentialTarget?.({ x: props.position.x - 1, y: 1 });
                } else if (offset.x > TARGET_OFFSET) {
                    context.setPotentialTarget?.({ x: props.position.x + 1, y: 1 });
                } else {
                    context.setPotentialTarget?.(undefined);
                }
            }
        }
    }, [offset]);

    const [isHighlighted, setIsHighlighted] = useState(false);

    const [, drop] = useDrop({
        accept: "ball",
        canDrop() {
            return context.gameOptions?.interactive ?? true;
        },
        drop: (ball: BallProps) => {
            props.setDragged?.(undefined);
            if (!context || !ball) {
                return null;
            }
            if (isValidMove(ball, props, context.gameOptions)) {
                props.swap?.(ball.position, props.position);
                props.setLastDragged?.(props);
            }
        },
    });

    return drag(
        <div className="db-ball-container" ref={ballRef} style={{
            width: `${100 / context.cols}%`,
            left: `${(props.position.x / context.cols) * 100}%`,
            top: props.position.y === 0 ? '0%' : '50%',
            transition: props.lastDragged ? "none" : undefined,
        }}>
            {drop(<div className={classNames("db-drop", {"inactive": !(context.gameOptions?.interactive ?? true)})} />)}
            <div 
                style={isDragging
                    ? {
                        left: `${(mouseContext?.x ?? 0) - (50 / context.cols)}%`,
                        top: `${mouseContext?.y ?? 0}%`,
                    }
                    : props.isDragTarget && offset && props.className?.includes("db-target")
                        ? {
                            transform: `translate(
                                ${-Math.sign(offset.x) * (ballRef.current?.clientWidth ?? 0) * clamp(((Math.abs(offset.x) > TARGET_OFFSET ? Math.max(Math.abs(offset.x), Math.abs(offset.y)) : 0) - TARGET_OFFSET) / ((ballRef.current?.clientWidth ?? 0) - TARGET_OFFSET), 0, 1)}px,
                                ${-Math.sign(offset.y) * (ballRef.current?.clientHeight ?? 0) * clamp(((Math.abs(offset.y) > TARGET_OFFSET ? Math.max(Math.abs(offset.x), Math.abs(offset.y)) : 0) - TARGET_OFFSET) / ((ballRef.current?.clientHeight ?? 0) - TARGET_OFFSET), 0, 1)}px
                            )`,
                        }
                        : props.id === props.lastDragged?.id ? {
                            transition: "none",
                        } : undefined
                } 
                className={classNames("db-ball", { "highlight": isHighlighted, "hidden": isDragging, "inactive": !(context.gameOptions?.interactive ?? true) }, props.className)}
                onClick={() => setIsHighlighted(h => !h)}
            >
                <span>{props.value}</span>
            </div>
        </div>
    );
};

interface PositionedBallState extends BallState {
    // used exclusively for rendering. should not be used for game logic
    position: XYCoord;
}

function augmentGameState(gameState: BallState[][]): PositionedBallState[] {
    return gameState
        .flatMap((col, x) => col.map((ball, y) => ({...ball, position: {x, y}})))
        .sort((a, b) => a.index - b.index);
}

interface DoubleBackPlayerProps {
    cols?: number;
    gameState?: BallState[][] | number[][];
    gameOptions?: DoubleBackGameOptions;
}

export const DoubleBackPlayer = (props: DoubleBackPlayerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    
    const dndContext = useContext(DragDropSimulationContext);
    if (!dndContext.backend) return <div>Drag and drop backend not provided.</div>;

    return <DndProvider backend={dndContext.backend} context={window}>
        <DoubleBackContextProvider gameRef={ref} {...props} />
    </DndProvider>;
};

const DoubleBackContextProvider = ({gameRef, ...props}: DoubleBackPlayerProps & {gameRef?: React.RefObject<HTMLDivElement | null>}) => {
    const [potentialTarget, setPotentialTarget] = useState<XYCoord | undefined>(undefined);

    return <DoubleBackContext.Provider value={{
        cols: props.cols ?? props.gameState?.length ?? 0, 
        gameOptions: props.gameOptions,
        potentialTarget,
        setPotentialTarget,
    }}>
        <DoubleBackManager gameState={props.gameState} gameRef={gameRef} />
    </DoubleBackContext.Provider>;
};

const DoubleBackManager = ({ gameState: initialGameState, gameRef }: { gameState?: BallState[][] | number[][], gameRef?: React.RefObject<HTMLDivElement | null> }) => {
    const context = useContext(DoubleBackContext);
    if (!context) return null;

    if (initialGameState && typeof initialGameState[0][0] === 'number') {
        initialGameState = (initialGameState as number[][]).map((col, i) =>
            col.map((value, j) => ({ index: i + j * context.cols, value }) as BallState)
        );
    }

    const [gameState, setGameState] = useState<BallState[][] | undefined>(initialGameState as BallState[][] | undefined);
    const [dragged, setDragged] = useState<BallProps | undefined>(undefined);
    const [lastDragged, setLastDragged] = useState<BallProps | undefined>(undefined);
    const [availableTargets, setAvailableTargets] = useState<XYCoord[]>([]);
    const [moves, setMoves] = useState(0);
    const [undoStack, setUndoStack] = useState<BallState[][][]>([]);
    const [redoStack, setRedoStack] = useState<BallState[][][]>([]);
    const graphConnectionContext = useContext(DBGraphConnectionContext);

    if (!context.cols) {
        return <span>Invalid game. Either set the number of columns or a game state.</span>;
    }

    const flipCol = (col: BallState[]) => {
        setGameState(gameState?.map((c) => c === col ? [c[1], c[0]] : c));
    };

    const swap = (a: XYCoord, b: XYCoord) => {
        if (!gameState) {
            return;
        }
        setUndoStack([...undoStack, cloneDeep(gameState)]);
        const tempState = cloneDeep(gameState);
        const other = gameState[a.x][a.y];
        tempState[a.x][a.y] = tempState[b.x][b.y];
        tempState[b.x][b.y] = other;
        setGameState(tempState);
        setRedoStack([]);
        setMoves(m => m + 1);
    };

    useEffect(() => {
        if (!gameState) {
            const state: BallState[][] = [];
            for (let i = 1; i < context.cols + 1; i++) {
                state.push([{index: i, value: i}, {index: i + context.cols, value: i}]);
            }
            setGameState(state);
        }
    }, []);

    useEffect(() => {
        if (gameState && dragged?.position) {
            const targets: XYCoord[] = getAdjacentCoords(dragged.position, context.cols);
            setAvailableTargets(
                context.gameOptions?.hideUselessMoves
                    ? targets.filter((target) => Math.abs(gameState[target.x][target.y].value - dragged.value) === 1)
                    : targets.filter((target) => Math.abs(gameState[target.x][target.y].value - dragged.value) <= 1)
            );
        } else {
            setAvailableTargets([]);
        }
    }, [dragged]);

    useEffect(() => {
        graphConnectionContext?.setGameState?.(gameState);
    }, [gameState]);

    if (!gameState) {
        return null;
    }

    const flatGameState = augmentGameState(gameState);

    return <div className="w-100 d-flex flex-column align-items-center justify-content-center gap-2 pb-3" ref={gameRef}>
        <DBContainer cols={context.cols}>
            {flatGameState.map((ball, i) => {
                return <Ball key={i} id={i} value={ball.value} position={ball.position} swap={swap} 
                    setDragged={setDragged} lastDragged={lastDragged} setLastDragged={setLastDragged}
                    isDragTarget={context.potentialTarget?.x === ball.position.x && context.potentialTarget?.y === ball.position.y}
                    className={classNames({
                        "db-target": availableTargets.some((target) => target.x === ball.position.x && target.y === ball.position.y),
                    })}
                />;
            })}
        </DBContainer>
        {context.gameOptions?.enableFlips && <div className="w-100 d-flex justify-content-around z-2" style={{minWidth: `${(context.cols ?? 1) * 50}px`, maxWidth: `${(context.cols ?? 1) * 150}px`,}}>
            {gameState.map((col, i) => {
                return <button key={i} onClick={() => {
                    flipCol(col);
                    setLastDragged(undefined);
                }}>
                    Flip
                </button>;
            })}
        </div>}
        {(context.gameOptions?.interactive ?? true) && context.gameOptions?.showMoveCount && <span>
            Moves: {moves}
        </span>}
        {(context.gameOptions?.interactive ?? true) && <div>
            <button
                className="undo-button" 
                onClick={() => {
                    if (undoStack.length > 0) {
                        const newState = undoStack[undoStack.length - 1];
                        setRedoStack([...redoStack, cloneDeep(gameState)]);
                        setUndoStack(undoStack.slice(0, undoStack.length - 1));
                        setGameState(newState);
                        setMoves(m => m - 1);
                        setLastDragged(undefined);
                    }
                }}
            >
                Undo
            </button>
            <button 
                className="redo-button"
                onClick={() => {
                    if (redoStack.length > 0) {
                        const newState = redoStack[redoStack.length - 1];
                        setUndoStack([...undoStack, cloneDeep(gameState)]);
                        setRedoStack(redoStack.slice(0, redoStack.length - 1));
                        setGameState(newState);
                        setMoves(m => m + 1);
                        setLastDragged(undefined);
                    }
                }}
            >
                Redo
            </button>
        </div>}
    </div>;
};

interface DBContainerProps extends React.HTMLAttributes<HTMLElement> {
    cols?: number;
}

const DBContainer = ({cols, ...rest}: DBContainerProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [mouseOffset, setMouseOffset] = useState<XYCoord | undefined>(undefined);
    const throttleUpdate = useMemo(() => throttle(setMouseOffset, 16), []);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const handleDrag = (event: MouseEvent) => {
            const rect = divRef.current?.getBoundingClientRect();

            if (rect && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
                throttleUpdate({
                    x: 100 * (event.clientX - rect.left) / (rect.right - rect.left),
                    y: 100 * (event.clientY - rect.top) / (rect.bottom - rect.top)
                });
            }
        };

        document.addEventListener('dragover', handleDrag);

        return () => {
            document.removeEventListener('dragover', handleDrag);
        };
    }, []);

    const recalculateHeight = () => setHeight(2 * (divRef.current?.clientWidth ?? 0) / (cols ?? 1));

    useEffect(() => {
        const resizeObserver = new ResizeObserver(recalculateHeight);

        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, [divRef]);

    return <div className="db-container" ref={divRef} style={{
        minWidth: `${(cols ?? 1) * 50}px`, 
        maxWidth: `${(cols ?? 1) * 150}px`,
        height: `${height}px`,
    }} {...rest}>
        <MouseOffsetContext.Provider value={mouseOffset}>
            {rest.children}
        </MouseOffsetContext.Provider>
    </div>;
};
