import React from 'react';
import { TsxBlogPost } from './blogPost';

export interface BlogProps extends React.HTMLAttributes<HTMLDivElement> { 
  title: string
  image?: {
    src: string
    alt: string
  }
  colour: string
  text: any
}

export default function SimpleBlogLayout(props : BlogProps) {
    const {title, image, colour, text, ...rest} = props;

    return <TsxBlogPost>
      <h1>{title}</h1> 
      <div className="blogBody" {...rest}>
        {image !== undefined && (
        <div className="blogImage" style={{backgroundColor: colour}} id={`blogImageContainer${title.replaceAll(' ', '')}`}>
          <img src={image?.src} alt={image?.alt} id={`blogImage${title.replaceAll(' ', '')}`}/> 
        </div>
        )}
        <div className="blogText">
          {text}
        </div>
      </div>
    </TsxBlogPost>;
}
