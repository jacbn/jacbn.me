import React from "react";
import { UnstyledPageContainer } from "../../components/containers/UnstyledPageContainer"
import ScrollTop from "../../components/scrollTop"
import { FadeInWhenVisible } from "../../components/animation/fadeInWhenVisible";

export const AdaCyberTransition = (props: React.HTMLAttributes<HTMLElement>) => {
    return <UnstyledPageContainer {...props} className="ada-cyber bg-white text-dark">
        <ScrollTop />
        <section id="hero" className="d-flex flex-column align-items-center">
            <img src="/assets/ada-cyber/hero.png" alt="Ada Cyber Transition hero image" className="img-fluid" />
        </section>
        <section id="intro" className="pb-4 pb-md-8">
            <FadeInWhenVisible className="container-lg font-size-label">
                <p>
                    Ada CS was successful in a bid to host the UK Government's TechFirst programme, requiring that content be developed for a significantly younger audience than before. With an incredibly tight deadline, I was tasked with designing a new landing page for the programme.
                </p>
                <p>
                    Designing for younger users was a unique challenge. The two main priorities were to create bright, engaging visuals that capture attention and create an exciting experience, and to ensure the interface was intuitive and easy to navigate for young learners.
                </p>
            </FadeInWhenVisible>
        </section>
        <section id="ada-theme-spotlight" className="py-4 py-md-8">
            <FadeInWhenVisible className="container-lg font-size-label">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col d-flex flex-column justify-content-center">
                        <h2>Colour palette</h2>
                        <p>
                            Ada CS' theme palette has a mixture of cyans, pinks, yellows and neutrals. Picking one to use as a brightly-coloured background creates a strong visual identity for the page, and the cyan works best to create legible text over the top.
                        </p>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img id="ada-palette" src="/assets/ada-cyber/ada-palette.png" alt="A subset of the Ada CS colour palette" className="img-fluid" />
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="ada-nav-spotlight" className="py-4 py-md-8">
            <FadeInWhenVisible className="container-lg font-size-label">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col d-flex justify-content-center align-items-center">
                        <img id="ada-explore-button" src="/assets/ada-cyber/button.png" alt="The main action button" className="img-fluid" />
                    </div>
                    <div className="col d-flex flex-column justify-content-center">
                        <h2>Ease of navigation</h2>
                        <p>
                            Clear headings, an entirely vertical page structure, and bright action buttons make it easy for young learners to navigate the page and find the information they need.
                        </p>
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="ada-tf-spotlight" className="py-4 py-md-8">
            <FadeInWhenVisible className="container-lg font-size-label">
                <h2>Maintaining the original identity</h2>
                <p>
                    The page maintains shapes and ideas that define the original Cyber Explorers identity, ensuring users recognise the programme and its origins.
                </p>
                <div className="col d-flex gap-6 mt-6 justify-content-center align-items-center">
                    <img id="ada-tf-branding" src="/assets/ada-cyber/cyber-explorers.svg" alt="Imagery modified from the original Cyber Explorers branding" className="img-fluid" />
                    <img id="ada-tf-branding-2" src="/assets/ada-cyber/tf.png" alt="A styled chevron, a key symbol in the Cyber Explorers branding" className="img-fluid" />
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="ada-text-spotlight" className="py-4 py-md-8">
            <FadeInWhenVisible className="container-lg font-size-label">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col d-flex flex-column justify-content-center">
                        <h2>Typography</h2>
                        <p>
                            The hero text was designed to be inclusive under conditions regarding both scale and colour-blindness legibility. Darker shadows are used to boost contrast underneath the text, allowing for multiple bright colours to be used in tandem without sacrificing legibility.
                        </p>
                        <p>
                            Paired with cyber-inspired geometric shapes, the typography creates a strong visual identity for the page and the programme.
                        </p>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img id="ada-typography" src="/assets/ada-cyber/typography.png" alt="A Figma screenshot showing variations of the hero text under different accessibility conditions" className="img-fluid" />
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
    </UnstyledPageContainer>;
};
