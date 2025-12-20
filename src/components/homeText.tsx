import React from 'react';

export interface HomeTextProps {
  title: string
  text: any
}

export default function HomeText(props : HomeTextProps) {
    return (
      <main className="home-bg wideTextContainer">
        <h1>{props.title}</h1> 
        <div className="font-size-body homeTextBody mt-2">
          {props.text}
        </div>
      </main>
    );
}
