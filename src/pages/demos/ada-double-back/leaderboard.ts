import { useState } from "react";

const LEADERBOARD_KEY = "ada-double-back-leaderboard";

export interface Leaderboard {
    [key: number]: { score: number; nameTag: string } | null;
}

export const useLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<Leaderboard>(() => {
        const stored = localStorage.getItem(LEADERBOARD_KEY);
        if (stored) {
            return JSON.parse(stored);
        }

        // else initialise with empty leaderboard
        return {4: null, 5: null, 6: null} as Leaderboard;
    });

    const saveScore = (N: number, score: number): void => {    
        if (leaderboard[N] !== undefined && (leaderboard[N] === null || score < leaderboard[N]?.score)) {

            const nameTag = window.prompt("New high score! Enter a name tag (max 3 characters):", "AAA")?.toUpperCase().slice(0, 3) || "AAA";

            setLeaderboard(prev => ({ ...prev, [N]: { score, nameTag } }));
            localStorage.setItem(LEADERBOARD_KEY, JSON.stringify({ ...leaderboard, [N]: { score, nameTag }}));
        }
    };

    return { leaderboard, saveScore };
};
