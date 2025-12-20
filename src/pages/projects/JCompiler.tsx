import React from 'react';
import SimpleBlogLayout from '../../components/blog';

export default function JCompiler() {
  return (
    <>
      <SimpleBlogLayout 
        title="jCompiler"
        colour="lightcoral"
        text={
            <>
                <p>I wrote the lexer and parser for an LR(0) compiler in OCaml, as a way of consolidating some prerequisite reading we were required to do for a compilers course taken in our second year. I chose OCaml for a few reasons: firstly because its functional nature makes the lexer fairly intuitive, akin to a state machine, secondly because I wondered how far I could take a stateless compiler, and lastly as practice for a language I enjoyed writing in but never got the chance to do a larger project with.</p> 
                <p>During the process, I learned a lot from implementing the finer details missed out in books. Most of the important implementation details could be found in <i>Compilers: Principles, Techniques and Tools (Aho, Lam, Sethi & Ullman)</i>, though all code there is presented in an imperative format; converting this to a functional implementation while maintaining statelessness was a challenge.</p>
                <p>I also wrote the majority of an LALR(1) equivalent (allowing the compiler to understand postfix operations, making it usable for most modern programming languages) which I had hoped to finish by the end of the holidays that year, but uni work took priority and I had to put it on hold — I'd love to revisit it soon though!</p>
                <p>You can view the raw ML for the LR(0) version <a href="https://github.com/jacbn/ml-compilers">here</a>.</p>    
            </>
        }
        />
    </>
  );
}
