import React, { useCallback, useMemo, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import { calculateStateTransitionVisualPath, getStateCenter } from "./svg-calcs";
import { DfaNodeProps, DragStateItem, DfaState, StateTransition, StateTransitionDisplay, clamp, ITEM_TYPE, BuilderMode, STATE_DIAMETER, STATE_RADIUS, generateRegexTree, stringifyKleeneTree, simplifyKleeneTree } from "./dfa-utils";
import './dfa-utils-test';

const DfaNode = ({ state, mode, isPendingSource, onClick, onDoubleClick }: DfaNodeProps) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ITEM_TYPE,
        item: {
            id: state.id,
            x: state.x,
            y: state.y,
        } as DragStateItem,
        canDrag: mode === "states",
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [mode, state.id, state.x, state.y]);

    return (
        <button
            ref={(node) => {
                dragRef(node);
            }}
            className={`dfa-node ${isPendingSource ? "dfa-node-selected" : ""}`}
            style={{
                left: `${state.x}px`,
                top: `${state.y}px`,
                opacity: isDragging ? 0.45 : 1,
                cursor: mode === "states" ? "grab" : "pointer",
                outline: state.isAccepting ? "2px solid var(--body-color)" : "none",
                outlineOffset: "-8px",
            }}
            onClick={(event) => {
                event.stopPropagation();
                onClick?.(state.id);
            }}
            onDoubleClick={(event) => {
                event.stopPropagation();
                onDoubleClick?.(state.id);
            }}
        >
            {state.id}
            {state.isStart ? <span className="dfa-node-start-dot" /> : null}
        </button>
    );
};

interface DFABuilderMainProps {
    mode: BuilderMode;
    states: DfaState[];
    setStates: React.Dispatch<React.SetStateAction<DfaState[]>>;
    transitions: StateTransition[];
    setTransitions: React.Dispatch<React.SetStateAction<StateTransition[]>>;
    pendingSourceStateId: string | null;
    setPendingSourceStateId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const DFABuilderMain = (props: DFABuilderMainProps) => {

    const { mode, states, setStates, transitions, setTransitions, pendingSourceStateId, setPendingSourceStateId } = props;

    const [stateIndex, setStateIndex] = useState(1);
    const [transitionIndex, setTransitionIndex] = useState(0);
    const boardRef = useRef<HTMLDivElement | null>(null);

    const moveState = useCallback((stateId: string, x: number, y: number) => {
        const boardBounds = boardRef.current?.getBoundingClientRect();
        const maxX = boardBounds ? boardBounds.width - STATE_DIAMETER : Number.POSITIVE_INFINITY;
        const maxY = boardBounds ? boardBounds.height - STATE_DIAMETER : Number.POSITIVE_INFINITY;

        setStates((currentStates) => currentStates.map((state) => {
            if (state.id !== stateId) {
                return state;
            }

            return {
                ...state,
                x: clamp(x, 0, maxX),
                y: clamp(y, 0, maxY),
            };
        }));
    }, []);

    const [, dropRef] = useDrop(() => ({
        accept: ITEM_TYPE,
        drop: (item: DragStateItem, monitor) => {
            const movement = monitor.getDifferenceFromInitialOffset();
            if (!movement) {
                return;
            }

            moveState(item.id, Math.round(item.x + movement.x), Math.round(item.y + movement.y));
        },
    }), [moveState]);

    const setBoardRef = useCallback((node: HTMLDivElement | null) => {
        boardRef.current = node;
        dropRef(node);
    }, [dropRef]);

    const addStateAt = useCallback((x: number, y: number) => {
        const boardBounds = boardRef.current?.getBoundingClientRect();
        if (!boardBounds) {
            return;
        }

        const normalizedX = clamp(x - STATE_RADIUS, 0, boardBounds.width - STATE_DIAMETER);
        const normalizedY = clamp(y - STATE_RADIUS, 0, boardBounds.height - STATE_DIAMETER);

        setStates((currentStates) => [...currentStates, {
            id: `q${stateIndex}`,
            x: normalizedX,
            y: normalizedY,
        }]);

        setStateIndex(i => i + 1);
    }, [stateIndex]);

    const addTransition = useCallback((fromStateId: string, toStateId: string) => {
        setTransitions((currentTransitions) => [...currentTransitions, {
            id: `t${transitionIndex}`,
            from: fromStateId,
            to: toStateId,
            symbol: "A",
        }]);

        setTransitionIndex(i => i + 1);
    }, [transitionIndex]);

    const onBoardClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (mode !== "states") {
            return;
        }

        const boardBounds = boardRef.current?.getBoundingClientRect();
        if (!boardBounds) {
            return;
        }

        addStateAt(event.clientX - boardBounds.left, event.clientY - boardBounds.top);
    }, [addStateAt, mode]);

    const onNodeClick = useCallback((stateId: string) => {
        if (mode === "states") {
            return;
        }

        if (mode === "transitions") {
            if (!pendingSourceStateId) {
                setPendingSourceStateId(stateId);
                return;
            }

            addTransition(pendingSourceStateId, stateId);
            setPendingSourceStateId(null);
            return;
        }

        if (mode === "delete") {
            if (stateId !== 'q0') {
                setStates((currentStates) => currentStates.filter((state) => state.id !== stateId));
                setTransitions((currentTransitions) => currentTransitions.filter((transition) => transition.from !== stateId && transition.to !== stateId));
            }

            // if (stateIndex === parseInt(stateId.split('q')[1]) + 1) {
            //     setStateIndex(i => i - 1);
            // }
        }
    }, [addTransition, mode, pendingSourceStateId, setPendingSourceStateId]);

    const onNodeDoubleClick = useCallback((stateId: string) => {
        if (mode === "states") {
            const newStates = states.map((state) => {
                if (state.id !== stateId) {
                    return state;
                } else {
                    return {
                        ...state,
                        isAccepting: !state.isAccepting,
                    };
                }
            });

            setStates(newStates);
        }
    }, [mode, states, setStates]);

    const onTransitionSymbolChange = useCallback((transitionId: string, symbol: string) => {
        let normalizedSymbol = symbol.toUpperCase();
        if (!/^[A-Z](,[A-Z])*,?$/.test(normalizedSymbol) && normalizedSymbol.length !== 0) {
            return;
        }

        setTransitions((currentTransitions) => currentTransitions.map((transition) => {
            if (transition.id !== transitionId) {
                return transition;
            }

            return {
                ...transition,
                symbol: normalizedSymbol,
            };
        }));
    }, []);

    const visualTransitions = useMemo<StateTransitionDisplay[]>(() => {
        return transitions.map((transition) => {
            const fromState = states.find((state) => state.id === transition.from);
            const toState = states.find((state) => state.id === transition.to);
            const hasReverseTransition = transitions.some((candidate) => (
                candidate.id !== transition.id
                && candidate.from === transition.to
                && candidate.to === transition.from
            ));
            return calculateStateTransitionVisualPath({ transition, fromState, toState, hasReverseTransition });
        });
    }, [states, transitions]);

    return <div
        ref={setBoardRef}
        className="dfa-canvas m-auto"
        onClick={onBoardClick}
        role="application"
        aria-label="DFA builder canvas"
    >
        <svg className="dfa-transition-layer" aria-hidden>
            <defs>
                <marker
                    id="dfa-arrowhead"
                    markerWidth="10"
                    markerHeight="8"
                    refX="8"
                    refY="4"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 4 L 0 8 z" fill="currentColor" />
                </marker>
            </defs>

            {states.filter((state) => state.isStart).map((state) => {
                const center = getStateCenter(state);
                return (
                    <path
                        key={`start-${state.id}`}
                        d={`M ${center.x - STATE_RADIUS - 40} ${center.y} L ${center.x - STATE_RADIUS - 4} ${center.y}`}
                        markerEnd="url(#dfa-arrowhead)"
                        className="dfa-start-path"
                    />
                );
            })}

            {visualTransitions.map(({ transition, path }) => (
                <path
                    key={transition.id}
                    d={path}
                    markerEnd="url(#dfa-arrowhead)"
                    className="dfa-transition-path"
                />
            ))}
        </svg>

        <div className="dfa-label-layer">
            {visualTransitions.map(({ transition, labelX, labelY }) => (
                <input
                    key={`${transition.id}-label`}
                    value={transition.symbol}
                    className="dfa-transition-label"
                    style={{ left: `${labelX}px`, top: `${labelY}px` }}
                    onClick={(event) => {
                        if (mode === "delete") {
                            setTransitions((currentTransitions) => currentTransitions.filter((t) => t.id !== transition.id));
                        }
                        event.stopPropagation()
                    }}
                    onChange={(event) => onTransitionSymbolChange(transition.id, event.target.value)}
                    aria-label={`Transition ${transition.from} to ${transition.to}`}
                />
            ))}
        </div>

        {states.map((state) => <DfaNode
            key={state.id}
            state={state}
            mode={mode}
            isPendingSource={pendingSourceStateId === state.id}
            onClick={onNodeClick}
            // onRightClick={onNodeRightClick}
            onDoubleClick={onNodeDoubleClick}
        />)}
    </div>;
};

interface DFABuilderToolbarProps {
    mode: BuilderMode;
    setMode: React.Dispatch<React.SetStateAction<BuilderMode>>;
    setPendingSourceStateId: React.Dispatch<React.SetStateAction<string | null>>;
}

const DFABuilderToolbar = (props: DFABuilderToolbarProps) => {
    const { mode, setMode, setPendingSourceStateId } = props;
    return <div className="d-flex flex-column align-items-center gap-2">
        <div className="d-flex gap-2">
            <button
                className={`btn btn-sm ${mode === "states" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => {
                    setMode("states");
                    setPendingSourceStateId(null);
                }}
            >
                Edit States
            </button>
            <button
                className={`btn btn-sm ${mode === "transitions" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => {
                    setMode("transitions");
                }}
            >
                Edit Transitions
            </button>
            <button
                className={`btn btn-sm ${mode === "delete" ? "btn-danger" : "btn-outline-danger"}`}
                onClick={() => {
                    setMode("delete");
                    setPendingSourceStateId(null);
                }}
            >
                Delete
            </button>
        </div>
        <span className="dfa-helper-text">
            {mode === "states"
                ? "Click anywhere on the canvas to add a state. Drag states to reposition."
                : mode === "transitions"
                ? "Click one state, then another, to add a transition. Labels are editable."
                : "Select a state or transition to delete it."}
        </span>
    </div>;
};

export const DFABuilder = () => {
    const backend = useMemo(() => (isMobile ? TouchBackend : HTML5Backend), []);
    const [mode, setMode] = useState<BuilderMode>("states");
    const [pendingSourceStateId, setPendingSourceStateId] = useState<string | null>(null);
    const [states, setStates] = useState<DfaState[]>([
        {
            id: "q0",
            x: 120,
            y: 180,
            isStart: true,
        },
    ]);
    const [transitions, setTransitions] = useState<StateTransition[]>([]);

    const tree = generateRegexTree(states, transitions);
    console.log("starting simplification of kleene tree", stringifyKleeneTree(tree));
    const kt = simplifyKleeneTree(tree);
    console.log("Kleene Tree:", kt);

    return <div className="dfa-builder-wrapper d-flex flex-column flex-md-row gap-3 align-items-center align-items-md-start justify-content-center">
        <div className="d-flex flex-column gap-3 pt-5">
            <DndProvider backend={backend} options={isMobile ? { enableMouseEvents: true } : undefined}>
                <DFABuilderMain
                    mode={mode}
                    states={states}
                    setStates={setStates}
                    transitions={transitions}
                    setTransitions={setTransitions}
                    pendingSourceStateId={pendingSourceStateId}
                    setPendingSourceStateId={setPendingSourceStateId}
                />
            </DndProvider>

            <textarea
                className="dfa-textarea"
                value={stringifyKleeneTree(kt)}
                readOnly
                rows={3}
                aria-label="Generated regular expression"
            />

            <DFABuilderToolbar 
                mode={mode}
                setMode={setMode}
                setPendingSourceStateId={setPendingSourceStateId}
            />
        </div>
        <textarea className="dfa-textarea my-5" readOnly value={
            "Try to make... \r\n\r\n" +
            "- 4 A's in a row.\r\n\r\n" +
            "- At least 2 B's in a row.\r\n\r\n" +
            "- An alternating sequence of A's and B's.\r\n\r\n" +
            "- Any number of A's, B's and C's, alphabetically ordered.\r\n\r\n" +
            "- A string that does not contain the substring 'ABBA'.\r\n\r\n"
        } />
    </div>;
};
