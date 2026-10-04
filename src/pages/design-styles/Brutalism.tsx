import React from "react"
import { UnstyledPageContainer } from "../../components/containers/UnstyledPageContainer"
import ScrollTop from "../../components/scrollTop"
import { FadeInWhenVisible } from "../../components/animation/fadeInWhenVisible";

export const Brutalism = (props: React.HTMLAttributes<HTMLElement>) => {
    return <UnstyledPageContainer {...props} id="ds-brutalism" className="bg-white">
        <ScrollTop />
        <section id="hero" className="w-100 d-flex flex-column align-items-center">
            <div className="container-lg d-flex flex-column justify-content-end bg-red m-4 mb-10 pb-2">
                <h1 className="d-flex m-0 align-items-center gap-2 w-100">
                    BRUTALISM
                    <div id="title-box" className="flex-grow-1 py-2 bg-black"/>
                </h1>
                <div id="sep" />
                <span className="font-size-label">FUNCTIONAL | MINIMALIST | BOLD</span>
            </div>
        </section>
        <FadeInWhenVisible className="container-lg font-size-label text-dark">
            <p className="h3 font-size-subtitle my-3 w-md-75 border-start border-2 border-black ps-3 mb-4">
                Inspired by the 1940-50s architectural movement seen during post-war reconstruction across Britain and Europe, brutalism emphasises <em>minimalist</em> and <em>functional</em> construction over decoration.
            </p>
        </FadeInWhenVisible>
        <FadeInWhenVisible className="container-lg font-size-label text-dark">
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col d-flex flex-column justify-content-center">
                    <h3>In design</h3>
                    <ul>
                        <li>Heavy, bold typography</li>
                        <li>Blocky grid layouts</li>
                        <li>Strict colour palette – neutrals and one highlight, often red</li>
                    </ul>
                    <h3>Perception</h3>
                    <ul>
                        <li>Bold, confident, purposeful</li>
                        <li>Rugged, rejects comfort</li>
                        <li>Harsh, cold</li>
                    </ul>
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                    <img src="/assets/design-styles/brutalism/architecture.png" alt="Brutalist architecture" className="img-fluid my-4" />
                </div>
            </div>
        </FadeInWhenVisible>
        <section id="when-to-use" className="w-100 bg-red pb-10">
            <FadeInWhenVisible className="container-lg font-size-label text-white">
                <h2 className="d-flex w-max-content bg-black text-red px-3 ms-n3 mt-0">When to use</h2>
                <p className="h3 font-size-subtitle w-md-75 mb-5">
                    Brutalism is all about sending a message. Bold, blocky layouts capture attention immediately – but not always positively. It makes for a striking aesthetic, built for one-time attention capture.
                </p>
                <p>
                    After the initial message, brutalist design can feel cold and unwelcoming, and the limited palette loses interest quickly.
                    Use it for one-off experiences, such as posters or one-time campaigns, but not for long-term engagement.
                </p>
            </FadeInWhenVisible>
        </section>
        <section id="examples" className="w-100 bg-black">
            <FadeInWhenVisible className="container-lg font-size-label text-white">
                <h2 className="d-flex w-max-content bg-red text-black px-3 ms-n3 mt-0">Examples</h2>
                <div className="d-flex flex-column">
                    <a href="https://adamclarkecolour.com" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/design-styles/brutalism/adamclarkecolour.png" alt="Adam Clarke's portfolio" className="img-fluid my-4 scale-hover mb-0" />
                    </a>
                    <span className="mt-md-n5 z-1"><a href="https://adamclarkecolour.com" target="_blank" rel="noopener noreferrer">Adam Clarke's excellent portfolio</a>. Militantly brutalist.</span>
                </div>
                <div className="d-flex flex-column">
                    <a href="https://modeselektor.com" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/design-styles/brutalism/modeselektor.png" alt="Mode Slektor's website" className="img-fluid my-4 scale-hover mb-0" />
                    </a>
                    <span className="mt-md-n5 z-1"><a href="https://modeselektor.com" target="_blank" rel="noopener noreferrer">Modeslektor's website</a>. Uses less traditional colours, but the typography, layout and simplicity are heavily brutalist.</span>
                </div>
                <div className="d-flex w-md-50 mx-auto py-10 mb-10 text-center">
                    <span><a href="https://brutalistwebsites.com/">brutalistwebsites.com</a> maintains a large collection of sites partly and wholly designed with brutalist principles.</span>
                </div>
            </FadeInWhenVisible>
        </section>
    </UnstyledPageContainer>;
};
