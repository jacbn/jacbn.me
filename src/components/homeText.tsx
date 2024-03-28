import React from 'react';

export interface HomeTextProps {
  title: string
  center?: boolean
  text: any
}

export default function HomeText(props : HomeTextProps) {
    return (
      <main className="wideTextContainer">
        <h1>{props.title}</h1> 
        <div className="homeTextBody" style={{textAlign: (props.center) ? 'center' : 'justify'}}>
          {props.text}
        </div>
      </main>
    )
}