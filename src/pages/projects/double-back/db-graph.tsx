import React from 'react';
import ForceGraph, { type GraphData } from 'react-force-graph-3d';
import { useEffect, useRef, useState } from 'react';

interface NodeType {
    id: string | number;
    group: string | number;
}

interface LinkType {
    source: string | number;
    target: string | number;
    value?: number;
}

export const DBForceGraph = ({path}: {path: string}) => {
    const fgRef = useRef<any>(null);
    const [data, setData] = useState<GraphData<NodeType, LinkType> | undefined>(undefined);
    const [hoverNode, setHoverNode] = useState<NodeType | null>(null);

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
        fg.d3Force('charge').strength(-100);
        fg.d3Force('collision', null);
    }, [fgRef]);

    return (
        <ForceGraph
            ref={fgRef}
            graphData={data}
            nodeAutoColorBy="group"
            nodeRelSize={3}
            nodeVal={
                (node: any) => (node.group !== 1 ? 20 : 1)
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
            width={1200}
            height={600}
        />
    );
};
