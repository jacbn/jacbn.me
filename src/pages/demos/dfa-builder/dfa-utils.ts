export const ITEM_TYPE = "DFA_STATE";
export const STATE_DIAMETER = 52;
export const STATE_RADIUS = STATE_DIAMETER / 2;

export type BuilderMode = "states" | "transitions" | "delete";

export interface DfaState {
    id: string;
    x: number;
    y: number;
    isStart?: boolean;
    isAccepting?: boolean;
}

export interface StateTransition {
    id: string;
    from: string;
    to: string;
    symbol: string;
}

export interface DragStateItem {
    id: string;
    x: number;
    y: number;
}

export interface StateTransitionDisplay {
    transition: StateTransition;
    path: string;
    labelX: number;
    labelY: number;
}

export interface DfaNodeProps {
    state: DfaState;
    mode: BuilderMode;
    isPendingSource: boolean;
    onClick?: (stateId: string) => void;
    onDoubleClick?: (stateId: string) => void;
}

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const generateRegex = (states: DfaState[], transitions: StateTransition[]): string => {
    // kleene's algorithm
    const R : Record<number, Record<number, Record<number, string>>> = {};

    for (let k = -1; k < states.length; k++) {
        R[k] = {};
        for (let i = 0; i < states.length; i++) {
            R[k][i] = {};
            for (let j = 0; j < states.length; j++) {
                if (k === -1) {
                    const direct = transitions.find(t => t.from === states[i].id && t.to === states[j].id);
                    if (direct && i === j) {
                        R[k][i][j] = OR(direct.symbol, "ε");
                    } else if (direct) {
                        R[k][i][j] = direct.symbol;
                    } else if (i === j) {
                        R[k][i][j] = "ε";
                    } else {
                        R[k][i][j] = "∅";
                    }
                } else {
                    R[k][i][j] = OR(CONCAT(R[k - 1][i][k], CONCAT(STAR(R[k - 1][k][k]), R[k - 1][k][j])), R[k - 1][i][j]);
                }
            }
        }
    }
    
    const startStates = states.filter(s => s.isStart);
    const acceptStates = states.filter(s => s.isAccepting);

    return startStates.map(start => {
        return acceptStates.map(accept => {
            return R[states.length - 1][states.indexOf(start)][states.indexOf(accept)];
        }).reduce((acc, curr) => OR(acc, curr), "∅");
    }).reduce((acc, curr) => OR(acc, curr), "∅")
};

const OR = (a: string, b: string) => {
    if (a === "∅") return b;
    if (b === "∅") return a;
    if (a === b) return a;
    return `(${a}|${b})`;
};

const CONCAT = (a: string, b: string) => {
    if (a === "∅" || b === "∅") return "∅";
    if (a === "ε") return b;
    if (b === "ε") return a;
    return `${a}${b}`;
};

const STAR = (a: string) => {
    if (a === "∅" || a === "ε") return "ε";
    return `(${a})*`;
};
