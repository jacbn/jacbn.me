import React from 'react';
import Blog from '../../../components/blog';

export default function GreenMaps() {
  return (
    <Blog 
      title="Green Maps"
      image={{
        src: "/assets/home/logo-green-maps.png",
        alt: "A leaf on a wheat background, the logo of the Green Maps project."
      }}
      colour="wheat"
      text={
        <>
          <p>As part of second year, a series of external companies came in with a prompt, and a group of 6 worked together over the course of a term to produce a product that satisfied the requirements set out in the prompt. Our group worked with <a href="https://www.imc.com/">IMC</a> to produce a maps app with a focus on carbon emissions.</p>
          <p>In the app, a user can plot their journey by entering a start and end location, for which a number of different routes are calculated. The carbon emissions for each route are then calculated as accurately as possible &#8212; in a car, for example, the app would take into account the make of car used, the average speed along each road used, the type of fuel used and more. To make this process streamlined, each user can enter their car's information once when they first download the app then reuse that profile, or indeed enter multiple car profiles over time and switch between them as necessary.</p>
          <p>Every time the user completes their journey, the carbon calculator adds the amount of carbon saved by taking the route they did as opposed to the "average person" (an average car taking the fastest route). This encourages users to spend more time e.g. taking public transport or cycling to lower their overall carbon emissions. Then, to help put their efforts into perspective, a list of equivalent carbon savings is shown on the screen displaying their lifetime emissions.</p>
          <p>Regarding team structure, we split the project into 3 groups: front-end, back-end API, and carbon calculator. I worked mostly on the front-end, designing a number of screens within the app and dealing with calls to external APIs such as Google's place autocomplete or Geolocation; I also, however, worked with the back-end team to manage the integration with the cloud-based API.</p>
          <p>In all, the project was a huge success &#8212; of the 20 groups participating, we won one of three awards, "Most Professional Achievement". We were also invited to IMC's office in Amsterdam to meet the team we had been working with. I found the opportunity to work together on an extended project to be incredibly enjoyable and the experience taught me a lot about expected standards in industry and how to work effectively as a team.</p>
        </>
      }
    />
  );
}
