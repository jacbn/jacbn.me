import React from 'react';
import { Link } from 'react-router-dom';
import HomeText from '../../components/homeText';

export default function BlogIntro() {
  return <HomeText
    title="Blog"
    text={
        <>
            <p>Some fun thoughts and interesting code I've worked on.</p>
            <p>
                <ol reversed>
                    <li>
                        <Link to="/blog/2-css-theming">CSS Theming</Link>
                    </li>
                    <li>
                        <Link to="/blog/1-tr-links"><code>&lt;tr/&gt;</code> links and <code>display: contents</code></Link>
                    </li>
                </ol>
            </p>
        </>
    }
    />;
}
