import React, { ImgHTMLAttributes, lazy, Suspense, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import lightSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import darkSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { ColorModeContext } from "./colorModeToggle";

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('scss', scss);

const BlogErrorBoundary = ({children} : {children: React.ReactNode}) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            setHasError(true);
            console.error("Error caught by ErrorBoundary: ", error);
        };

        window.addEventListener("error", handleError);

        return () => {
        window.removeEventListener("error", handleError);
        };
    }, []);

    if (hasError) {
        return <div className="mt-5 text-center">
            Something went wrong. There's probably no blog at this URL.
            <br/><br/>
            Try searching through <a href="/blog">the list of blogs</a> instead!
        </div>;
    }

  return <>{children}</>;
};

function code({className, ...properties} : {className: string, children: React.ReactNode}) {
    const match = /language-(\w+)/.exec(className || '');

    const {theme} = useContext(ColorModeContext);

    return match
      ? <SyntaxHighlighter language={match[1]} style={theme === 'light' ? lightSyntax : darkSyntax} PreTag={"div"} {...properties}>
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
  

export default function BlogPost() {
    const params = useParams();
    const postId = params.id;
    const Post = lazy(() => import(`../pages/blog/${postId}.mdx`));
    return <BlogErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
            <main className="blog-container">
                <Post components={{code, img}} />
            </main>
        </Suspense>
    </BlogErrorBoundary>;
}
