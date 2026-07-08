import React from "react";
import { FlatGridSquare } from "../../components/homeGrid/flatGridSquare";

export const Demos = () => {
    return <section className="container-fluid container-projects py-4">
        <h1>Demos</h1>
        {/* <p className="mb-4">Demos for events.</p> */}
        <ol className="row row-cols-1 row-cols-md-2 g-4 list-unstyled">
            <li>
                <FlatGridSquare
                    title="Double Back (game)"
                    description="A game about swapping the order of two rows of numbers."
                    colour="var(--accent-double-back)"
                    link="/demos/ada-double-back"
                    imageProps={{
                        src: "/assets/home/logo-double-back.png",
                        alt: "A drawing of the double back grid."
                    }}
                />
            </li>
            <li>
                <FlatGridSquare
                    title="DFA Builder"
                    description="Build and test deterministic finite automata in your browser."
                    colour="var(--accent-compiler)"
                    link="/demos/dfa-builder"
                    imageProps={{
                        src: "/assets/demos/dfa.png",
                        alt: "A DFA with a number of states and transitions."
                    }}
                />
            </li>
        </ol>
    </section>;
};
