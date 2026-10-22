import React from 'react';
import { ProjectsCardAdaCyberTransition, ProjectsCardComponentisation, ProjectsCardDoubleBack, ProjectsCardGreenMaps, ProjectsCardIsaacRedesign, ProjectsCardIsaacSignup, ProjectsCardMathsArt, ProjectsCardWebDesignStyles, ProjectsCardYawNN } from '../../pages/projects/project-cards';
import { DraggableCarousel } from '../Carousel';
import { FadeInWhenVisible } from '../animation/fadeInWhenVisible';
import { motion } from 'framer-motion';
import useDeviceSize, { above } from '../../scripts/hooks/deviceSize';

// todo: fill alt text of svgs

export const WorkGrid = () => {
  const deviceSize = useDeviceSize();
  return <>
    <ol className="work-grid list-unstyled">
      <FadeInWhenVisible Tag={motion.li}>
        <ProjectsCardIsaacRedesign />
      </FadeInWhenVisible>
      <FadeInWhenVisible Tag={motion.li}>
        <ProjectsCardIsaacSignup />
      </FadeInWhenVisible>
      <FadeInWhenVisible Tag={motion.li}>
        <ProjectsCardComponentisation />
      </FadeInWhenVisible>
      <FadeInWhenVisible Tag={motion.li} className={above['lg'](deviceSize) ? "col-span-2" : ""}>
        <ProjectsCardWebDesignStyles />
      </FadeInWhenVisible>
      <FadeInWhenVisible Tag={motion.li}>
        <ProjectsCardAdaCyberTransition />
      </FadeInWhenVisible>
    </ol>
  </>;
};

export const FeaturedProjectsGrid = () => {
  return <DraggableCarousel className="container-fluid-override" element={{className: "w-100 w-sm-50 w-lg-25", maxWidth: "600px"}}>
    <ProjectsCardDoubleBack tabIndex={-1} />
    <ProjectsCardYawNN tabIndex={-1} />
    <ProjectsCardGreenMaps tabIndex={-1} />
    <ProjectsCardMathsArt tabIndex={-1} />
  </DraggableCarousel>;
};

