import React from 'react';

export interface BlogProps {
  title: string
  image?: {
    src: string
    alt: string
  }
  colour: string
  text: any
}

export default function Blog(props : BlogProps) {
    return (
      <main className="thinTextContainer">
        <h1>{props.title}</h1> 
        <div className="blogBody">
          {props.image !== undefined && (
          <div className="blogImage" style={{backgroundColor: props.colour}} id={`blogImageContainer${props.title.replaceAll(' ', '')}`}>
            <img src={props.image?.src} alt={props.image?.alt} id={`blogImage${props.title.replaceAll(' ', '')}`}/> 
          </div>
          )}
          <div className="blogText">
            {props.text}
          </div>
        </div>
        
      </main>
    );
}