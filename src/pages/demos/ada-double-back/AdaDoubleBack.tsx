import React, { useMemo, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import { DoubleBackPlayer } from "../../projects/double-back/db-sim";
import { DBForceGraph } from "../../projects/double-back/db-graph";
import { DBGraphConnect, DragDropSimulationContext } from "../../projects/double-back/components";
import { Link, useParams } from "react-router";
import { useLeaderboard } from "./leaderboard";

interface AdaDoubleBackProps {
    backend: any;
}

const AdaDBNavbar = () => {
    return <div className="d-flex gap-3 justify-content-center mb-4 position-absolute z-2" style={{top: "1rem", left: "50%", transform: "translateX(-50%)"}}>
        <Link to="/demos/ada-double-back" className="nav-link">game</Link>
        <Link to="/demos/ada-double-back/graph" className="nav-link">graph</Link>
    </div>;
};

const AdaDoubleBackGraph = ({ backend }: AdaDoubleBackProps) => {
    const [N, setN] = useState(3);
    return <>
        <DragDropSimulationContext.Provider value={{backend}}>
            <DBGraphConnect
                simulation={<DoubleBackPlayer 
                    cols={N}
                    className="ada-demo"
                />}
                graph={<DBForceGraph key={N} path={`/data/double-back/spectral-${N}-full.json`} N={N} width={window.innerWidth} height={window.innerHeight} />}
            />
        </DragDropSimulationContext.Provider>
        <div className="d-flex position-absolute z-2" style={{top: "1rem", right: "1rem"}}>
            <select value={N} onChange={(e) => setN(parseInt(e.target.value))} className="db-settings-btn" style={{appearance: "none"}}>
                <option value={3}>N=3</option>
                <option value={4}>N=4</option>
            </select>
        </div>
    </>;
};

const AdaDoubleBackMain = ({ backend }: AdaDoubleBackProps) => {
    const [cols, setCols] = useState(4);
    const {leaderboard, saveScore} = useLeaderboard();

    return <div className="fullscreen-container d-flex flex-column align-items-center gap-5">
        <img src="/assets/other/ada-double-back/circles.svg" alt="decorative circles" className="position-absolute" style={{top: "-20%", right: "-20%", width: "50%", opacity: 0.75}} />
        <img src="/assets/other/ada-double-back/fingerprint.svg" alt="decorative fingerprint" className="position-absolute" style={{top: "0%", left: "-25%", width: "60%", rotate: "-30deg", opacity: 0.75}} />
        <DragDropSimulationContext.Provider value={{backend}}>
            <DoubleBackPlayer 
                cols={cols}
                gameOptions={{showMoveCount: true, showWinAnimation: true}}
                className="ada-demo"
                onWin={(N, moveCount) => {
                    saveScore(N, moveCount)
                }}

            />
        </DragDropSimulationContext.Provider>
        <div className="d-flex flex-column align-items-center gap-2 position-relative">
            <input 
                type="range"
                id="colsRange"
                min="2"
                max="7"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value))}
            />
            <label htmlFor="colsRange" className="text-muted">number of columns: {cols}</label>
        </div>
        <div className="position-absolute z-2 db-leaderboard" style={{bottom: "1rem", left: "1rem"}}>
            <h3>Leaderboard:</h3>
            <ol className="list-unstyled ms-2">
                {leaderboard && Object.entries(leaderboard).map(([N, score]) => (
                    <li key={N} className="d-flex gap-2 align-items-center" style={{opacity: score ? 1 : 0.5}}>
                        <strong>N={N}:</strong> {!score ? "no score yet" : `[${score.nameTag}] ${score.score} moves`}
                    </li>
                ))}
            </ol>
        </div>
    </div>;
};

export const AdaDoubleBack = () => {
    const { page } = useParams<{page: string}>();
    const backend = useMemo(() => isMobile ? TouchBackend : HTML5Backend, [isMobile]);

    switch (page) {
        case "graph":
            return <>
                <AdaDBNavbar />
                <AdaDoubleBackGraph backend={backend} />
            </>;
        default:
            return <>
                <AdaDBNavbar />
                <AdaDoubleBackMain backend={backend} />
            </>;
    }
};
