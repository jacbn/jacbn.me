import React from 'react';
import SimpleBlogLayout from '../../../components/blog';
import NavBar from '../../../components/navbar';

interface BallProps {
    value: number;
}

const Ball = (props : BallProps) => {
    return <div className="db-ball">
        <span>{props.value}</span>
    </div>;
};

export const DoubleBackSimulation = () => {
    return <>
        
    </>;

    // return <div>
    //     <Ball value={10} />
    // </div>;
};

export default DoubleBackSimulation;
