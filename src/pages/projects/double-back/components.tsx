import React, { createContext } from "react";
import { Link } from "react-router-dom";

export const DragDropSimulationContext = createContext<{backend: any | undefined}>({backend: undefined});

export const BlogNavigation = ({page}: {page: number}) => {
    return <nav className="w-100 text-highlight fs-3 font-title d-flex justify-content-center gap-3 my-5">
        {page > 1 && <Link to={`/projects/double-back/${page - 1}`} className="blog-nav-button">previous</Link>}
        <Link to={`/projects/double-back/${page + 1}`} className="blog-nav-button">next</Link>
    </nav>;
};
