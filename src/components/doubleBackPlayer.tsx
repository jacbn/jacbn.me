import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DndProvider, XYCoord, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cloneDeep } from "lodash";

const DoubleBackContext = React.createContext<{
    current?: BallProps;
} | undefined>(undefined);

type Target = "left top" | "left bottom" | "top" | "bottom" | "right top" | "right bottom" | undefined;
const TARGET_OFFSET = 40;

const getAdjacentCoords = (position: XYCoord, cols: number) => {
    return [
        position.x > 0 ? { x: position.x - 1, y: position.y } : undefined,
        position.x > 0 ? { x: position.x - 1, y: (position.y + 1) % 2 } : undefined,
        position.x < cols - 1 ? { x: position.x + 1, y: position.y } : undefined,
        position.x < cols - 1 ? { x: position.x + 1, y: (position.y + 1) % 2 } : undefined,
        { x: position.x, y: (position.y + 1) % 2 },
    ].filter((coord) => coord) as XYCoord[];
}

interface BallProps {
    className?: string;
    value: number;
    position: XYCoord;
    swap?: (a: XYCoord, b: XYCoord) => void;
    setDragged?: React.Dispatch<React.SetStateAction<BallProps | undefined>>;
}

const Ball = (props : BallProps) => {
    const context = useContext(DoubleBackContext);
    const [target, setTarget] = useState<Target>(undefined);
    const item = props;

    const [{ isDragging, offset }, dragRef] = useDrag(
        () => ({
            type: "ball",
            item: item,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                offset: monitor.getDifferenceFromInitialOffset(),
            }),
        }),
        [item]
    );

    useEffect(() => {
        if (!context) return;
        context.current = isDragging ? props : undefined;
        props.setDragged?.(isDragging ? props : undefined);
    }, [isDragging]);

    useEffect(() => {
        if (!offset) return;
        if (props.position.y === 0) {
            if (offset.y < -TARGET_OFFSET) {
                if (offset.x < -TARGET_OFFSET) {
                    setTarget("left bottom");
                } else if (offset.x > TARGET_OFFSET) {
                    setTarget("right bottom");
                } else {
                    setTarget("bottom");
                }
            } else {
                if (offset.x < -TARGET_OFFSET) {
                    setTarget("left top");
                } else if (offset.x > TARGET_OFFSET) {
                    setTarget("right top");
                } else {
                    setTarget("top");
                }
            }
        }
    }, [offset]);

    useEffect(() => {
        console.log(target);
    }, [target]);

    const [isHighlighted, setIsHighlighted] = useState(false);

    const [, dropRef] = useDrop({
        accept: "ball",
        drop: () => {
            props.setDragged?.(undefined);
            if (!context || !context.current) {
                return null;
            }
            const dragged = context.current;
            if (Math.abs(dragged.value - props.value) === 1 && Math.abs(dragged.position.x - props.position.x) <= 1) {
                props.swap?.(dragged.position, props.position);
            }
        },
    });

    return <>
        <div 
            ref={dragRef} 
            style={{visibility: isDragging ? 'hidden' : 'visible'}} 
            className={"db-ball " + (isHighlighted ? "highlight " : "") + props.className}
            onClick={() => setIsHighlighted(h => !h)}
        >
            <div ref={dropRef} className="db-drop" />
            <span>{props.value}</span>
        </div>
    </>;
};

interface DoubleBackPlayerProps {
    cols?: number;
    gameState?: number[][];
}

export const DoubleBackPlayer = (props: DoubleBackPlayerProps) => {

    return <DndProvider backend={HTML5Backend}>
        <DoubleBackContext.Provider value={{}}>
            <DoubleBackManager {...props} />
        </DoubleBackContext.Provider>
    </DndProvider>;
};

const DoubleBackManager = (props: DoubleBackPlayerProps) => {
    const [gameState, setGameState] = useState<number[][] | undefined>(props.gameState);
    const [dragged, setDragged] = useState<BallProps | undefined>(undefined);
    const [availableTargets, setAvailableTargets] = useState<XYCoord[]>([]);
    const [moves, setMoves] = useState(0);
    const [undoStack, setUndoStack] = useState<number[][][]>([]);
    const [redoStack, setRedoStack] = useState<number[][][]>([]);
    const numCols = props.cols ?? gameState?.length;
    if (!numCols) {
        return <span>Invalid game. Either set the number of columns or a game state.</span>;
    }

    const flipCol = (col: number[]) => {
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
            const state: number[][] = [];
            for (let i = 1; i < numCols + 1; i++) {
                state.push([i, i]);
            }
            setGameState(state);
        }
    }, []);

    useEffect(() => {
        if (gameState && dragged?.position) {
            const targets: XYCoord[] = getAdjacentCoords(dragged.position, numCols);
            setAvailableTargets(targets.filter((target) => Math.abs(gameState[target.x][target.y] - dragged.value) === 1));
        } else {
            setAvailableTargets([]);
        }
    }, [dragged]);

    if (!gameState) {
        return null;
    }

    return <>
        <div className="db-row">
            {gameState.map((col, i) => {
                return <div key={i} className="db-col">
                    {col.map((value, j) => {
                        return <Ball key={j} value={value} position={{x: i, y: j}} swap={swap} setDragged={setDragged} 
                            className={availableTargets.some((target) => target.x === i && target.y === j) ? 'db-target' : ''}
                        />;
                    })}
                    <Button onClick={() => flipCol(col)}>Flip</Button>
                    {/* <span>
                        {col[0] > col[1] ? (col[0] * (col[0] + 1)) / 2 - col[0] + col[1] : (col[1] * (col[1] + 1)) / 2 - col[1] + col[0]}
                    </span> */}
                </div>;
            })}
        </div>
            <span>
            Moves: {moves}
        </span>
        <div>
            <Button
                className="undo-button" 
                onClick={() => {
                    if (undoStack.length > 0) {
                        const newState = undoStack[undoStack.length - 1];
                        setRedoStack([...redoStack, cloneDeep(gameState)]);
                        setUndoStack(undoStack.slice(0, undoStack.length - 1));
                        setGameState(newState);
                        setMoves(m => m - 1);
                    }
                }}
            >
                Undo
            </Button>
            <Button 
                className="redo-button"
                onClick={() => {
                    if (redoStack.length > 0) {
                        const newState = redoStack[redoStack.length - 1];
                        setUndoStack([...undoStack, cloneDeep(gameState)]);
                        setRedoStack(redoStack.slice(0, redoStack.length - 1));
                        setGameState(newState);
                        setMoves(m => m + 1);
                    }
                }}
            >
                Redo
            </Button>
        </div>
    </>;
};

export default DoubleBackPlayer;
