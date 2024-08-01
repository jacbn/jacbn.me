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
            cols={7} 
            gameState={[[1, 7], [5, 6], [4, 5], [3, 4], [2, 3], [1, 2], [7, 6]]}
        
        />
    </>;
};

export default DoubleBack;