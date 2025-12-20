import React from 'react';
import VerticalPane from "../../components/verticalPane";

export default function GameDev() {
    return <div className="container-fluid container-projects">
      <h1>Game Development</h1>
      <div className="topText">
        <p>Gaming has always been a nice escape from reality for me, but there's something fascinating about being the one to design these experiences.</p>
        <p>Here's a few projects I've had a go at!</p>
      </div>
      <VerticalPane
        coverTitle="AmalgMG"
        coverImage={"/assets/gamedev/amalgmg.webp"}
        description={
          <>
            <p><b>AmalgMG</b> is a MonoGame-based .NET engine with support for physics, shaders, tilemaps, animation and more, built out of frustration at Unity's 2D engine.</p>
            <br/>
            <p>The aim of the library is to mimic the coding style supported by Unity, while enabling intimate control over all parts of the engine to simplify support for writing custom components. It's still in its infancy, but the current end goal would be an engine able to produce jam-style games.</p>
          </>
        }
        />
        <VerticalPane
          coverTitle="Capy'd Away"
          coverImage={"/assets/gamedev/capy.webp"}
          description={
            <>
              <p>For the Cambridge Game Jam 2023, I worked with 3 friends to create a game from scratch in 48 hours. The theme was 'Beneath the Earth', and our <a href="https://itch.io/jam/camgamejam/rate/1923220">game</a> tells the story of a capybara who must be reunited with his family after being washed underground during a storm.</p>
              <br/>
              <p>The game was built in Unity, which was new to the other members of the team. This was a great opportunity to practice fast and effective knowledge sharing, while also being able to learn new features myself like custom lighting and animation rigs. While we might not have won, we're proud of how far we came in such a short time!</p>
            </>
          }
        />
        <VerticalPane
          coverTitle="Hexad"
          coverImage={"/assets/gamedev/hexad.webp"}
          description={
            <>
              <p>2019 saw the development of <b>Hexad</b>, a 2D puzzle game about swapping neighbouring nodes on a hexagonal grid to complete full hexes. It was my first major project after just over a year of learning UnityScript (and later C# after its unfortunate demise) and the Unity engine. The <a href="https://play.google.com/store/apps/details?id=com.JBLabs.Hexad">app</a> was released to the Google Play Store that summer, and updates continued throughout the year.</p>
            </>
          }
        />
        <div style={{paddingBottom: '10vh'}}/>
      </div>;
  }
