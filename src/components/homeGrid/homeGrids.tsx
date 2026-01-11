import React from 'react';
import { ProjectsCardComponentisation, ProjectsCardDoubleBack, ProjectsCardGreenMaps, ProjectsCardIsaacRedesign, ProjectsCardMathsArt, ProjectsCardYawNN } from '../../pages/projects/project-cards';
import { DraggableCarousel } from '../Carousel';

// todo: fill alt text of svgs

export const WorkGrid = () => {
  return <ol className="work-grid row row-cols-1 row-cols-md-2 g-4 list-unstyled">
    <li>
      <ProjectsCardIsaacRedesign />
    </li>
    <li>
      <ProjectsCardComponentisation />
    </li>
  </ol>;
};

export const FeaturedProjectsGrid = () => {
  return <DraggableCarousel className="container-fluid-override" elementWidth={"calc(min(600px, 40%))"}>
    <ProjectsCardDoubleBack />
    <ProjectsCardYawNN />
    <ProjectsCardGreenMaps />
    <ProjectsCardMathsArt />
  </DraggableCarousel>;
};

