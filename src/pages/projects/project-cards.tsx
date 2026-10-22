import React, { useState } from "react";
import { FlatGridSquare } from "../../components/homeGrid/flatGridSquare";
import { GridSquareProps } from "../../components/homeGrid/gridSquareTypes";
import { FlatGridItem } from "../../components/homeGrid/FlatGridItem";
import useDeviceSize, { above } from "../../scripts/hooks/deviceSize";

type RestProps = Omit<GridSquareProps, "title" | "description" | "year" | "lang" | "colour" | "imageProps" | "link">;

export const ProjectsCardIsaacRedesign = (rest?: RestProps) => {
    return <FlatGridSquare
        title="Isaac Redesign"
        description="revamping the isaac physics learning platform"
        year="2024-2025"
        link="/work/isaac-redesign/"
        imageProps={{
          src: "/assets/home/isaac-launch.png",
          alt: "The Isaac Science logo with balloons attached over a starry sky.",
          className: "pixel-image"
        }}
        colour={"var(--accent-isaac)"}
        className="scale-hover"
        lang="React, SCSS"
        {...rest}
    />;
};

export const ProjectsCardAdaCyberTransition = (rest?: RestProps) => {
    return <FlatGridSquare
        title="Ada CS: Cyber"
        description="launching 11-14 cybersecurity content on Ada CS"
        year="2026"
        link="/work/ada-cyber-transition/"
        imageProps={{
          src: "/assets/home/ada-explore.png",
          alt: "",
          className: "pixel-image"
        }}
        colour={"var(--accent-ada)"}
        className="scale-hover"
        lang="Figma, React"
        {...rest}
    />;
};

export const ProjectsCardComponentisation = (rest?: RestProps) => {
    return <FlatGridSquare
        title="Componentisation"
        description="designing & implementing a reusable component library"
        year="2025-2026"
        lang="Figma, React"
        imageProps={{
            src: "/assets/home/coming-soon.png",
            alt: "Coming soon!",
            className: "pixel-image"
        }}
        colour={"var(--accent-component)"}
        className="scale-hover"
        {...rest}
    />;
};

export const ProjectsCardWebDesignStyles = (rest?: RestProps) => {
    const deviceSize = useDeviceSize();
    const Tag = above['lg'](deviceSize) ? FlatGridItem : FlatGridSquare;
    return <Tag
        title="Web Design Styles"
        description="exploring different aesthetics in web design"
        year="2026"
        lang="Figma, React"
        imageProps={{
            src: "/assets/home/logo-web-design-styles.png",
            alt: "",
            className: "pixel-image"
        }}
        colour={"var(--accent-design-styles)"}
        className="scale-hover"
        link="/design-styles"
        {...rest}
    />;
};

export const ProjectsCardIsaacSignup = (rest?: RestProps) => {
    return <FlatGridSquare
        title="Isaac Signup"
        description="rethinking isaac's signup flow for a new audience"
        year="2026"
        lang="Figma"
        imageProps={{
            src: "/assets/home/logo-isaac-signup.png",
            alt: "",
            className: "pixel-image"
        }}
        colour={"var(--accent-signup)"}
        className="scale-hover"
        link="/work/isaac-signup/"
        {...rest}
    />;
};

export const ProjectsCardGreenMaps = (rest?: RestProps) => {
    return <FlatGridSquare 
        title="Green Maps"
        description="reducing vehicle emissions through&nbsp;smarter navigation"
        year="2022"
        lang="Dart"
        imageProps={{
            src: "/assets/home/logo-green-maps.png",
            alt: "A leaf on a wheat background, the logo of the Green Maps project.",
            className: "pixel-image"
        }}
        colour="var(--accent-greenmaps)"
        className="scale-hover"
        link="/projects/greenmaps"
        {...rest}
    />;
};

export const ProjectsCardYawNN = (rest?: RestProps) => {
    const [isAnimated, setIsAnimated] = useState(false);
    return <FlatGridSquare 
        title="Yawning Detection"
        description="applying deep learning to safety-critical environments"
        year="2022-2023"
        lang="Python, Dart"
        imageProps={{
          src: "/assets/home/logo-yawnn-static.png",
          srcAnimated: "/assets/home/logo-yawnn.gif",
          animated: isAnimated,
          className: "pixel-image",
          alt: "An animation of a headphone, a key component of the Yawnn project."
        }}
        colour="var(--accent-yawning)"
        className="scale-hover"
        link="/projects/yawnn/"
        onMouseOver={() => setIsAnimated(true)}
        onMouseLeave={() => setIsAnimated(false)}
        {...rest}
    />;
};

export const ProjectsCardMathsArt = (rest?: RestProps) => {
    return <FlatGridSquare 
        title="Maths Art"
        description="exploring geometry at its finest"
        year="2016 onwards"
        lang="JS, Python"
        imageProps={{
          src: "/assets/home/logo-maths-art.png",
          alt: "An Apollonian Gasket, one of the projects in the Maths Art collection.",
          className: "pixel-image"
        }}
        colour="var(--accent-maths)"
        className="scale-hover"
        link="/maths-art/"
        {...rest}
    />;
};

export const ProjectsCardJCompiler = (rest?: RestProps) => {
    return <FlatGridSquare
        title="jCompiler"
        description="lexing and parsing an arbitrary input given a grammar"
        year="2021-2022"
        lang="OCaml, Java"
        colour="var(--accent-compiler)"
        className="scale-hover"
        link="/projects/jcompiler/"
        {...rest}
    />;
};

export const ProjectsCardSentiment = (rest?: RestProps) => {
    return <FlatGridSquare 
        title="Sentiment Classifier"
        description="interpreting the emotion of reviews using various models"
        year="2021"
        lang="Java"
        colour="var(--accent-sentiment)"
        className="scale-hover"
        link="/projects/sentiment/"
        {...rest}
    />;
};

export const ProjectsCardPandemic = (rest?: RestProps) => {
    return <FlatGridSquare 
        title="Pandemic Analysis"
        description="simulating a pandemic and analysing real Covid data"
        year="2020-2021"
        lang="Python"
        colour="var(--accent-pandemic)"
        className="scale-hover"
        link="/projects/pandemic/"
        {...rest}
    />;
};

export const ProjectsCardGameDev = (rest?: RestProps) => {
    return <FlatGridSquare 
        title="Game Development"
        description="designing unique experiences in reaching for high scores"
        year="2017 onwards"
        lang="C#"
        colour="var(--accent-game-dev)"
        className="scale-hover"
        link="/gamedev/"
        {...rest}
    />;
};

export const ProjectsCardDoubleBack = (rest?: RestProps) => {
    return <FlatGridSquare
        title="Double Back"
        description="taking a puzzle game too far"
        year="2023 onwards"
        lang="Maths, JS"
        imageProps={{
            src: "/assets/home/logo-double-back.png",
            alt: "A drawing of the double back grid.",
            className: "pixel-image"
        }}
        colour="var(--accent-double-back)"
        className="scale-hover"
        link="/projects/double-back/"
        {...rest}
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
