import React, { useContext } from 'react';
import ForceGraph, { type GraphData } from 'react-force-graph-3d';
import { useEffect, useRef, useState } from 'react';
import { DBGraphConnectionContext, gameStateToNodeId } from './components';

interface NodeType {
    id: string | number;
    group: string | number;
}

interface LinkType {
    source: string | number;
    target: string | number;
    value?: number;
}

interface DBForceGraphProps {
    path: string;
    N: number;
    nodeBaseSize?: number;
}

export const DBForceGraph = ({path, N, nodeBaseSize = 3}: DBForceGraphProps) => {
    const fgRef = useRef<any>(null);
    const [data, setData] = useState<GraphData<NodeType, LinkType> | undefined>(undefined);
    const [hoverNode, setHoverNode] = useState<NodeType | null>(null);

    const { gameState } = useContext(DBGraphConnectionContext);
    const activeNode = gameStateToNodeId(gameState);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(path);
            const file = await response.json();
            setData(file);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fg = fgRef.current;
        if (!fg) return;

        fg.d3Force('link').distance(15).strength(2);
        fg.d3Force('charge').strength(N === 3 ? -300 : -100);
        fg.d3Force('collision', null);
    }, [fgRef]);

    return <div className="db-force-graph-container w-100">
        <ForceGraph
            ref={fgRef}
            graphData={data}
            nodeRelSize={nodeBaseSize}
            nodeVal={
                (node: any) => (
                    node.id === activeNode 
                        ? 10 
                        : 1
                )
            }
            nodeColor={
                (node: any) => (
                    node.id === activeNode
                        ? "lightgreen"
                        : node.group === 2
                            ? "white"
                            : "#668"
                )
            }
            nodeLabel={
                (node: any) => {
                    if (hoverNode && node.id === hoverNode.id) {
                        return node.id;
                    }
                }
            }
            forceEngine="d3"
            enableNodeDrag={false}
            // nodeThreeObject={(node: any) => {
            //     const sprite = new SpriteText(node.id);
            //     sprite.color = node.color;
            //     sprite.textHeight = 8;
            //     return sprite;
            // }}
            onNodeClick={(node) => {
                if (node) {
                    setHoverNode(node);
                }
            }}
            width={840}
            height={560}
        />
    </div>;
};
