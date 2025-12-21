import React from 'react';
import Blog from '../../components/blog';
import DoubleBackPlayer from '../../components/doubleBackPlayer';

export const DoubleBack = () => {
    return <>
        <Blog 
            title="Double Back"
            colour="lightcoral"
            text={
                <>
                    text
                </>
            }
        />
        <DoubleBackPlayer 
            gameState={[[1, 8], [2, 7], [3, 4], [4, 5], [5, 6], [6, 3], [1, 2], [7, 8]]}
        
        />
    </>;
};

export default DoubleBack;
