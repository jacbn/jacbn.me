import React from 'react';
import { ProjectsCardComponentisation, ProjectsCardGreenMaps, ProjectsCardIsaacRedesign, ProjectsCardMathsArt, ProjectsCardYawNN } from '../../pages/projects/project-cards';

// todo: fill alt text of svgs

export const WorkGrid = () => {
  return <ol className="row row-cols-1 row-cols-md-2 g-4 list-unstyled">
    <li>
      <ProjectsCardIsaacRedesign />
    </li>
    <li>
      <ProjectsCardComponentisation />
    </li>
  </ol>;
};

export const FeaturedProjectsGrid = () => {
  return <ol className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 row-cols-center-last g-4 list-unstyled">
    <li>
      <ProjectsCardYawNN />
    </li>
    <li>
      <ProjectsCardGreenMaps />
    </li>
    <li>
      <ProjectsCardMathsArt />
    </li>
  </ol>;
};

