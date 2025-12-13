import React, { useState } from 'react';
import { FlatGridSquare } from './flatGridSquare';

// todo: fill alt text of svgs

export const WorkGrid = () => {
  return <ol className="row row-cols-1 row-cols-md-2 g-4 list-unstyled">
    <li>
      <FlatGridSquare
        title="Isaac Redesign"
        description="revamping the isaac physics learning platform"
        year="2024-2025"
        imageProps={{
          src: "/assets/home/isaac-launch.png",
          alt: "The Isaac Science logo with balloons attached over a starry sky."
        }}
        lang="React, SCSS"
      />
    </li>
    <li>
      <FlatGridSquare
        title="Componentisation"
        description="designing & implementing a reusable component library"
        year="2025-present"
        lang="Figma, React"
      />
    </li>
  </ol>;
};

export const FeaturedProjectsGrid = () => {
  const [animatedImageIndex, setAnimatedImageIndex] = useState<number | undefined>(undefined);

  return <ol className="row row-cols-1 row-cols-md-2 row-cols-xxl-3 row-cols-center-last g-4 list-unstyled">
    <li>
      <FlatGridSquare 
        title="Green Maps"
        description="reducing vehicle emissions through&nbsp;smarter navigation"
        year="2022"
        lang="Dart"
        colour="var(--accent-greenmaps)"
        imageProps={{
          src: "/assets/home/logo-green-maps.png",
          alt: "A leaf on a wheat background, the logo of the Green Maps project."
        }}
        link="/projects/greenmaps"
      />
    </li>
    <li>
      <FlatGridSquare 
        title="Yawning Detection"
        description="applying deep learning to safety-critical environments"
        year="2022-2023"
        lang="Python, Dart"
        colour="var(--accent-yawning)"
        imageProps={{
          src: "/assets/home/logo-yawnn-static.png",
          srcAnimated: "/assets/home/logo-yawnn.gif",
          animated: animatedImageIndex === 0,
          alt: "An animation of a headphone, a key component of the Yawnn project."
        }}
        link="/projects/yawnn/"
        onMouseOver={() => setAnimatedImageIndex(0)}
        onMouseLeave={() => setAnimatedImageIndex(undefined)}
      />
    </li>
    <li>
      <FlatGridSquare 
        title="Maths Art"
        description="exploring geometry at its finest"
        year="2016 onwards"
        lang="JS, Python"
        colour="var(--accent-maths)"
        imageProps={{
          src: "/assets/home/logo-maths-art.png",
          alt: "An Apollonian Gasket, one of the projects in the Maths Art collection."
        }}
        link="/maths-art/"
      />
    </li>
  </ol>;
};

export const SmallerProjectsGrid = () => {
  return <ol className="row row-cols-1 row-cols-md-2 g-4 list-unstyled">
    <li>
      <FlatGridSquare 
        title="jCompiler"
        description="lexing and parsing an arbitrary input given a grammar"
        year="2021-2022"
        lang="OCaml, Java"
        colour="var(--accent-compiler)"
        imageProps={{
          src: "",
          alt: ""
        }}
        link="/projects/jcompiler/"
      />
    </li>
    <li>
      <FlatGridSquare 
        title="Sentiment Classifier"
        description="interpreting the emotion of reviews using various models"
        year="2021"
        lang="Java"
        colour="var(--accent-sentiment)"
        imageProps={{
          src: "",
          alt: ""
        }}
        link="/projects/sentiment/"
      />
    </li>
    <li>
      <FlatGridSquare 
        title="Pandemic Analysis"
        description="simulating a pandemic and analysing real Covid data"
        year="2020-2021"
        lang="Python"
        colour="var(--accent-pandemic)"
        imageProps={{
          src: "",
          alt: ""
        }}
        link="/projects/pandemic/"
      />
    </li>
    <li>
      <FlatGridSquare 
        title="Game Development"
        description="designing unique experiences in reaching for high scores"
        year="2017 onwards"
        lang="C#"
        colour="var(--accent-game-dev)"
        imageProps={{
          src: "",
          alt: ""
        }}
        link="/gamedev/"
      />
    </li>
      {/* <GridSquare 
        title="Utilities"
        description="simplifying work with a collection of bespoke tools"
        year="2021 onwards"
        lang="JS, Python"
        colour="#C3B1E1"
        image={{
          src: "",
          alt: ""
        }}
        link="/utilities/"
      /> */}
  </ol>;
};
