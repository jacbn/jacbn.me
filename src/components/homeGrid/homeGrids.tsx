import React from 'react';
import { ProjectsCardAdaCyberTransition, ProjectsCardComponentisation, ProjectsCardDoubleBack, ProjectsCardGreenMaps, ProjectsCardIsaacRedesign, ProjectsCardMathsArt, ProjectsCardYawNN } from '../../pages/projects/project-cards';
import { DraggableCarousel } from '../Carousel';

// todo: fill alt text of svgs

export const WorkGrid = () => {
  return <ol className="work-grid row row-cols-1 row-cols-lg-3 g-4 list-unstyled">
    <li>
      <ProjectsCardIsaacRedesign />
    </li>
    <li>
      <ProjectsCardAdaCyberTransition />
    </li>
    <li>
      <ProjectsCardComponentisation />
    </li>
  </ol>;
};

export const FeaturedProjectsGrid = () => {
  return <DraggableCarousel className="container-fluid-override" element={{className: "w-100 w-sm-50 w-lg-25", maxWidth: "600px"}}>
    <ProjectsCardDoubleBack tabIndex={-1} />
    <ProjectsCardYawNN tabIndex={-1} />
    <ProjectsCardGreenMaps tabIndex={-1} />
    <ProjectsCardMathsArt tabIndex={-1} />
  </DraggableCarousel>;
};

