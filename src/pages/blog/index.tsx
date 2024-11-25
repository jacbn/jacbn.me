import React from 'react';
import Blog from '../../components/blog';
import { Link } from 'react-router-dom';

export default function BlogsIntro() {
  return <Blog
    title="Blogs"
    colour="rebeccapurple"
    className="w-100"
    text={
        <div className="w-100">
            Some fun thoughts and interesting code I've worked on.
            <br/><br/>
            <ol>
                <li>
                    <Link to="/blog/1-tr-links"><code>&lt;tr/&gt;</code> links and <code>display: contents</code></Link>
                </li>
            </ol>
            
        </div>
    }
    />;
}