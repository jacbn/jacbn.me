import React from 'react';

interface BallProps {
    value: number;
}

const Ball = (props : BallProps) => {
    return <div className="db-ball">
        <span>{props.value}</span>
    </div>;
};

export const DoubleBack = () => {
    return <div>
        <Ball value={10} />
    </div>;
};

export default DoubleBack;