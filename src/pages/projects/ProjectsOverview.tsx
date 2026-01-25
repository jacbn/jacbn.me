import React from "react";
import { ProjectsCardDoubleBack, ProjectsCardGameDev, ProjectsCardGreenMaps, ProjectsCardJCompiler, ProjectsCardMathsArt, ProjectsCardPandemic, ProjectsCardSentiment, ProjectsCardYawNN } from "./project-cards";

export const AllProjectsGrid = () => {
  return <ol className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 list-unstyled">
    <li>
        <ProjectsCardDoubleBack />
    </li>
    <li>
        <ProjectsCardYawNN />
    </li>
    <li>
        <ProjectsCardGreenMaps />
    </li>
    <li>
        <ProjectsCardMathsArt />
    </li>
    <li>
        <ProjectsCardJCompiler />
    </li>
    <li>
        <ProjectsCardSentiment />
    </li>
    <li>
        <ProjectsCardPandemic />
    </li>
    <li>
        <ProjectsCardGameDev />
    </li>
  </ol>;
};

export const ProjectsOverview = () => {
    return <div className="container-fluid container-projects">
        <h1>All Projects</h1>
        <div className="topText">
            <p>Click on any project card to learn more!</p>
        </div>
        <AllProjectsGrid />
    </div>;
};
