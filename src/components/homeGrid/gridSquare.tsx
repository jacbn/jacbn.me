import React from 'react';

import { Link } from 'react-router-dom';
import { Image, ImageProps } from '../animatedImage';

export interface GridSquareProps extends React.HTMLProps<HTMLAnchorElement> {
  title: string;
  description: string;
  year: string;
  lang: string;
  colour: string;
  imageProps: ImageProps,
  link: string;
  podiumNum?: number;
}

const podiumClasses : {[id: number]: string} = {
  0: "",
  1: "podium1",
  2: "podium2",
  3: "podium3"
};

export function CardTop({colour, imageProps, podiumNum, id} : {colour: string, imageProps: ImageProps, podiumNum: number, id: string}) {
  if (podiumNum > 0) {
    return (
      <div className="cardTop" style={{backgroundColor: colour}}>
        <Image
          className="gridImage"
          id={id}
          {...imageProps}
        />
      </div>
    );
  } else {
    return <></>;
  }
}

export default function GridSquare({title, description, year, lang, colour, imageProps, link, podiumNum = 0, ...rest} : GridSquareProps) {
  const cardClass = `card transition ${podiumClasses[podiumNum]} ${rest.className}`;
  const id = title.replace(/ /g, '');
  return (
    <Link to={link} {...rest} className={cardClass} id={`card${id}`}>
      <CardTop colour={colour} imageProps={imageProps} podiumNum={podiumNum} id={`gridImage${id}`}/>
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
