import React, { useMemo } from "react";
import { MdxProject } from "../../../components/blogPost";
import { useParams } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DoubleBackPlayer } from "./db-sim";
import { DragDropSimulationContext } from "./components";

export const DoubleBack = () => {
    const { page } = useParams<{page: string}>();
    const backend = useMemo(() => HTML5Backend, []);
    
    switch (page) {
        case undefined:
        case "1":
            return <DragDropSimulationContext.Provider value={{backend}}>
                <MdxProject path="/src/pages/projects/double-back/double-back-1.mdx" />
            </DragDropSimulationContext.Provider>;
        case "2":
            return <DragDropSimulationContext.Provider value={{backend}}>
                <div className="d-flex gap-3">
                    <MdxProject path="/src/pages/projects/double-back/double-back-2.mdx" containerClassName="blog-container-with-demo" />
                    <div className="blog-container-with-demo d-flex flex-column">
                        <h2>demo</h2>
                        <DoubleBackPlayer cols={4} />
                    </div>
                </div>
            </DragDropSimulationContext.Provider>;
    }

    return null;
};
