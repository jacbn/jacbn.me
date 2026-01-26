import React, { ImgHTMLAttributes, lazy, Suspense, useContext } from "react";
import { useParams } from "react-router-dom";

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import lightSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import darkSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { ColorModeContext } from "./colorModeToggle";
import classNames from "classnames";
import { BlogErrorBoundary, ProjectErrorBoundary } from "./errorBoundary";

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('scss', scss);

function code({className, ...properties} : {className: string, children: React.ReactNode}) {
    const match = /language-(\w+)/.exec(className || '');

    const {themeLightness} = useContext(ColorModeContext);

    return match
      ? <SyntaxHighlighter language={match[1]} style={themeLightness === 'light' ? lightSyntax : darkSyntax} PreTag={"div"} {...properties}>
            {properties.children as string}
        </SyntaxHighlighter>
      : <code className={className} {...properties} />;
}

function img(props : ImgHTMLAttributes<HTMLImageElement>) {
    if (!props.title) return <img {...props} />;
    
    return <figure>
        <div>
            <img {...props} />
        </div>
        <figcaption>{props.title}</figcaption>
    </figure>;
}

interface BlogContainerProps {
    containerClassName?: string;
}

const MdxContainer = ({Post, containerClassName}: BlogContainerProps & {Post: React.LazyExoticComponent<React.ComponentType<any>>}) => {
    // must be surrounded by an error boundary!
    return <Suspense fallback={<>
        <title>jaycie ⋅ blog</title>
        <div>Loading...</div>
    </>}>
        <main className={containerClassName ?? "blog-container"}>
            <Post components={{code, img}} />
        </main>
    </Suspense>;
};

export const MdxProject = ({project, page, containerClassName}: BlogContainerProps & {project: string, page: string}) => {
    const Post = lazy(() => import(`../pages/projects/${project}/${page}.mdx`));
    return <ProjectErrorBoundary>
        <MdxContainer Post={Post} containerClassName={containerClassName} />
    </ProjectErrorBoundary>;
};

export const MdxBlogPost = ({containerClassName}: BlogContainerProps) => {
    const params = useParams();
    const postId = params.id;
    const Post = lazy(() => import(`../pages/blog/${postId}.mdx`));
    return <BlogErrorBoundary>
        <MdxContainer Post={Post} containerClassName={containerClassName} />
    </BlogErrorBoundary>;
};

export const TsxBlogPost = (props: React.HTMLAttributes<HTMLElement>) => {
    return <main {...props} className={classNames("blog-container", props.className)} />;
};
