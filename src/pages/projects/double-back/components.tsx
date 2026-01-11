import classNames from "classnames";
import React, { createContext, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

export interface BallState {
    index: number;
    value: number;
}

export const DragDropSimulationContext = createContext<{backend: any | undefined}>({backend: undefined});

export const DBGraphConnectionContext = createContext<{gameState: BallState[][] | undefined, setGameState?: React.Dispatch<React.SetStateAction<BallState[][] | undefined>>}>({gameState: undefined});

export const DBGraphConnect = ({simulation, graph}: {simulation: ReactNode, graph: ReactNode}) => {
    const [gameState, setGameState] = useState<BallState[][] | undefined>(undefined);
    return <div className="position-relative d-flex flex-column align-items-center gap-3">
        <DBGraphConnectionContext.Provider value={{gameState, setGameState}}>
            {graph}
            <div className="w-25 position-absolute end-0 bottom-0 pe-3">
                {simulation}
            </div>
        </DBGraphConnectionContext.Provider>
    </div>;
};

export const gameStateToNodeId = (gameState: BallState[][] | undefined): string | undefined => {
    if (!gameState) return undefined;
    return [0, 1].map(i => gameState.map(x => x[i]).map(ball => ball.value).join("-")).join("-");
};

interface BlogNavigationProps {
    page: number;
    nextComingSoon?: boolean;
    isEnd?: boolean;
}

export const BlogNavigation = ({page, nextComingSoon, isEnd}: BlogNavigationProps) => {
    return <nav className="w-100 text-highlight fs-3 font-title d-flex justify-content-center gap-3 pt-3 mt-9">
        {page > 1 && <Link to={`/projects/double-back/${page - 1}`} className="blog-nav-button flex-grow-1 text-center">{"< previous"}</Link>}
        {!isEnd && nextComingSoon
            ? <div className="d-flex flex-column flex-grow-1 text-disabled">
                <span className="blog-nav-button text-center">{"next >"}</span>
                <span className="fs-6 text-center">(coming soon!)</span>
            </div>
            : <Link to={`/projects/double-back/${page + 1}`} className="blog-nav-button flex-grow-1 text-center">{"next >"}</Link>
        }
    </nav>;
};
