import React from 'react';
import Blog from '../../components/blog';
import NavBar from '../../components/navbar';

interface BallProps {
    value: number;
}

const Ball = (props : BallProps) => {
    return <div className="db-ball">
        <span>{props.value}</span>
    </div>;
};

export const DoubleBack = () => {
    return <>
        <NavBar showName={true} />
        <Blog 
        title="Double Back"
        colour="lightcoral"
        text={
            <>
                text
            </>
        }
        />
    </>;

    // return <div>
    //     <Ball value={10} />
    // </div>;
};

export default DoubleBack;