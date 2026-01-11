import React, { useState } from "react";
import { FlatGridSquare } from "../../components/homeGrid/flatGridSquare";

export const ProjectsCardIsaacRedesign = () => {
    return <FlatGridSquare
        title="Isaac Redesign"
        description="revamping the isaac physics learning platform"
        year="2024-2025"
        imageProps={{
          src: "/assets/home/isaac-launch.png",
          alt: "The Isaac Science logo with balloons attached over a starry sky."
        }}
        colour={"var(--accent-isaac)"}
        lang="React, SCSS"
    />;
};

export const ProjectsCardComponentisation = () => {
    return <FlatGridSquare
        title="Componentisation"
        description="designing & implementing a reusable component library"
        year="2025-present"
        lang="Figma, React"
        imageProps={{
            src: "/assets/home/coming-soon.png",
            alt: "Coming soon!"
        }}
        colour={"var(--accent-component)"}
    />;
};

export const ProjectsCardGreenMaps = () => {
    return <FlatGridSquare 
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
    />;
};

export const ProjectsCardYawNN = () => {
    const [isAnimated, setIsAnimated] = useState(false);
    return <FlatGridSquare 
        title="Yawning Detection"
        description="applying deep learning to safety-critical environments"
        year="2022-2023"
        lang="Python, Dart"
        colour="var(--accent-yawning)"
        imageProps={{
          src: "/assets/home/logo-yawnn-static.png",
          srcAnimated: "/assets/home/logo-yawnn.gif",
          animated: isAnimated,
          alt: "An animation of a headphone, a key component of the Yawnn project."
        }}
        link="/projects/yawnn/"
        onMouseOver={() => setIsAnimated(true)}
        onMouseLeave={() => setIsAnimated(false)}
    />;
};

export const ProjectsCardMathsArt = () => {
    return <FlatGridSquare 
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
    />;
};

export const ProjectsCardJCompiler = () => {
    return <FlatGridSquare
        title="jCompiler"
        description="lexing and parsing an arbitrary input given a grammar"
        year="2021-2022"
        lang="OCaml, Java"
        colour="var(--accent-compiler)"
        link="/projects/jcompiler/"
    />;
};

export const ProjectsCardSentiment = () => {
    return <FlatGridSquare 
        title="Sentiment Classifier"
        description="interpreting the emotion of reviews using various models"
        year="2021"
        lang="Java"
        colour="var(--accent-sentiment)"
        link="/projects/sentiment/"
    />;
};

export const ProjectsCardPandemic = () => {
    return <FlatGridSquare 
        title="Pandemic Analysis"
        description="simulating a pandemic and analysing real Covid data"
        year="2020-2021"
        lang="Python"
        colour="var(--accent-pandemic)"
        link="/projects/pandemic/"
    />;
};

export const ProjectsCardGameDev = () => {
    return <FlatGridSquare 
        title="Game Development"
        description="designing unique experiences in reaching for high scores"
        year="2017 onwards"
        lang="C#"
        colour="var(--accent-game-dev)"
        link="/gamedev/"
    />;
};

export const ProjectsCardDoubleBack = () => {
    return <FlatGridSquare
        title="Double Back"
        description="taking a puzzle game too far"
        year="2023 onwards"
        lang="Maths, JS"
        imageProps={{
            src: "/assets/home/logo-double-back.png",
            alt: "A drawing of the double back grid."
        }}
        colour="var(--accent-double-back)"
        link="/projects/double-back/"
    />;
};

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
