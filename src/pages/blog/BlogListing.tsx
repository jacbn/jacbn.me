import React, { ReactNode } from 'react';
import { Link } from 'react-router';
import HomeText from '../../components/homeText';
import classNames from 'classnames';

type BlogTag = "design" | "development" | "updates" | "css" | "react" | "typescript" | "ux" | "ui" | "accessibility";

const BlogPost = ({title, link, date, tags}: {title: ReactNode, link: string, date: string, tags?: BlogTag[]}) => {

    const styles = {
        "design": "border-secondary shadow-light",
        "development": "border-primary shadow-light",
        "updates": "border-white shadow-mid",
    }[tags?.[0] as string || ""] || "border-white";

    return <li className="mt-3">
        <Link to={link} className={classNames("w-100 d-flex flex-column border border-2 rounded-4 p-4 text-decoration-none scale-hover", styles)}>
            <span className="font-title font-size-subtitle">{title}</span>
            <i className="text-muted">{date}</i>
            {tags && <span className="font-size-small mt-3 text-white">
                {tags.map((tag, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && ' ⋅ '}
                        {index === 0 ? <b>{tag}</b> : tag}
                    </React.Fragment>
                ))}
            </span>}
        </Link>
    </li>;
};

export default function BlogIntro() {
  return <HomeText
    title="Blog"
    text={
        <>
            <p>Some fun thoughts and interesting code I've worked on.</p>
            <ol reversed className="list-unstyled">
                <BlogPost
                    title="Designing in an eroding industry"
                    link="/blog/3-eroding-design"
                    date="Sept 2026"
                    tags={["updates"]}
                />
                <BlogPost 
                    title="CSS Theming" 
                    link="/blog/2-css-theming" 
                    date="Aug 2025"
                    tags={["development", "react", "css"]}
                />
                <BlogPost
                    title={<><code>&lt;tr/&gt;</code> links and <code>display: contents</code></>}
                    link="/blog/1-tr-links"
                    date="May 2025"
                    tags={["development", "react", "css"]}
                />
            </ol>
        </>
    }
    />;
}
