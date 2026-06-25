import { DfaState, STATE_RADIUS, StateTransition, StateTransitionDisplay } from "./dfa-consts";
    

export const getStateCenter = (state: DfaState) => ({
    x: state.x + STATE_RADIUS,
    y: state.y + STATE_RADIUS,
});

interface CalculateStateTransitionVisualPathProps {
    transition: StateTransition;
    fromState?: DfaState;
    toState?: DfaState;
    hasReverseTransition?: boolean;
}

export const calculateStateTransitionVisualPath = (props: CalculateStateTransitionVisualPathProps): StateTransitionDisplay => {
    const { transition, fromState, toState, hasReverseTransition } = props;

    if (!fromState || !toState) {
        return {
            transition,
            path: "",
            labelX: 0,
            labelY: 0,
        };
    }

    const fromCenter = getStateCenter(fromState);
    const toCenter = getStateCenter(toState);

    if (fromState.id === toState.id) {
        const startX = fromCenter.x + STATE_RADIUS * 0.45;
        const startY = fromCenter.y - STATE_RADIUS * 0.75;
        const endX = fromCenter.x - STATE_RADIUS * 0.45;
        const endY = fromCenter.y - STATE_RADIUS * 0.75;
        const c1x = fromCenter.x + STATE_RADIUS * 1.9;
        const c1y = fromCenter.y - STATE_RADIUS * 2.3;
        const c2x = fromCenter.x - STATE_RADIUS * 1.9;
        const c2y = fromCenter.y - STATE_RADIUS * 2.3;

        return {
            transition,
            path: `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`,
            labelX: fromCenter.x,
            labelY: fromCenter.y - STATE_RADIUS * 2.6,
        };
    }

    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;
    const distance = Math.max(Math.hypot(dx, dy), 1);
    const unitX = dx / distance;
    const unitY = dy / distance;
    
    const curveMagnitude = hasReverseTransition ? 50 : 0;
    const normalX = -unitY;
    const normalY = unitX;

    const startX = fromCenter.x + unitX * STATE_RADIUS;
    const startY = fromCenter.y + unitY * STATE_RADIUS;
    const endX = toCenter.x - unitX * STATE_RADIUS;
    const endY = toCenter.y - unitY * STATE_RADIUS;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const controlX = midX + normalX * curveMagnitude;
    const controlY = midY + normalY * curveMagnitude;

    const labelX = 0.25 * startX + 0.5 * controlX + 0.25 * endX;
    const labelY = 0.25 * startY + 0.5 * controlY + 0.25 * endY;

    return {
        transition,
        path: `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`,
        labelX,
        labelY,
    };
};
