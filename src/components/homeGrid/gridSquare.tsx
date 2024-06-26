import React from 'react';
import { ImageProps } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export interface GridSquareProps {
  title: string;
  description: string;
  year: string;
  lang: string;
  colour: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
  podiumNum?: number;
}

const podiumClasses : {[id: number]: string} = {
  0: "",
  1: "podium1",
  2: "podium2",
  3: "podium3"
}

export function CardTop({colour, image, podiumNum, id} : {colour: string, image: ImageProps, podiumNum: number, id: string}) {
  if (podiumNum > 0) {
    return (
      <div className="cardTop" style={{backgroundColor: colour}}>
        <img
          className="gridImage"
          id={id}
          {...image}
        />
      </div>
    )
  } else {
    return <></>;
  }
}

export default function GridSquare({title, description, year, lang, colour, image, link, podiumNum = 0} : GridSquareProps) {
  // let cardClass = "card transition" + (podiumNum == 0 ? "" : " podium" + podiumNum);
  const cardClass = `card transition ${podiumClasses[podiumNum]}`;
  const id = title.replace(/ /g, '');
  return (
    <Link to={link} className={cardClass} id={`card${id}`}>
      <CardTop colour={colour} image={image} podiumNum={podiumNum} id={`gridImage${id}`}/>
      <div className="cardBase">
        <h2 style={{color: colour}}>{title}</h2>
        <p className="cardDescription">{description}</p>
      </div>
      <p className="projectInfoText">
        {year} &#183; {lang}
      </p>
    </Link> 
  );
}