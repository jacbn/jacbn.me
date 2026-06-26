export const ITEM_TYPE = "DFA_STATE";
export const STATE_DIAMETER = 52;
export const STATE_RADIUS = STATE_DIAMETER / 2;

export type BuilderMode = "add" | "edit" | "delete";

export interface DfaState {
    id: string;
    x: number;
    y: number;
    isStart: boolean;
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
    onRightClick?: (stateId: string) => void;
    onDoubleClick?: (stateId: string) => void;
}

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
