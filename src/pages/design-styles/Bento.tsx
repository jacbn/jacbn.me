import React from "react";
import ScrollTop from "../../components/scrollTop";
import { UnstyledPageContainer } from "../../components/containers/UnstyledPageContainer";
import { FadeInWhenVisible } from "../../components/animation/fadeInWhenVisible";
import { Link } from "react-router";

export const Bento = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return <UnstyledPageContainer {...props} id="ds-bento">
        <ScrollTop />
        <section id="hero" className="w-100 d-flex flex-column align-items-center">
            <img src="/assets/design-styles/bento/hero.png" alt="Bento design style hero" className="img-fluid my-4" />
        </section>
        <section id="about" className="text-dark py-4 py-md-10 d-flex flex-column gap-3">
            <FadeInWhenVisible className="container-lg d-flex gap-3">
                <div className="px-5 py-3">
                    <h2 className="mt-0 text-purple">About</h2>
                    <p>Inspired by the namesake Japanese food box, Bento design focuses on distinct, sectioned content. Each section is self-contained and has minimal information, sometimes paired with a single graphic. While typically flat, Bento is increasingly being paired subtle gradients and shadows to modernise the look.</p>
                </div>
                <div className="d-none d-sm-block bg-purple rounded-4 px-5 py-3" />
            </FadeInWhenVisible>

            <FadeInWhenVisible className="container-lg d-flex flex-column flex-sm-row gap-3">
                <div className="bg-green rounded-4 px-5 py-10 py-sm-3" />
                <div className="px-5 py-3">
                    <h2 className="mt-0 text-purple">Features</h2>
                    <p>Beyond the grid layout, Bento typically embraces a soft, rounded minimalism to match the clean aesthetic. Elements have lots of breathing room, with details spared in favour of imagery or well-considered spacing. Typography is clear and simple – i.e. large, sans-serif fonts – and can be paired with flat iconography. Realistic images pop dramatically against the clean background and flat panels, greatly emphasising graphical content.</p>
                </div>
                <div className="d-none d-sm-block bg-green rounded-4 px-5 py-3" />
            </FadeInWhenVisible>

            <FadeInWhenVisible className="container-lg d-flex flex-column flex-sm-row gap-3">
                <div className="bg-purple rounded-4 px-5 py-10 py-sm-3" />
                <div className="px-5 py-3">
                    <h2 className="mt-0 text-purple">Impact</h2>
                    <p>A more purpose-driven design style compared to <Link to="/design-styles">others</Link>, Bento's iconic grid structure is widely used to present multiple points of independent data pleasingly. Able to pair incredibly smoothly with other styles and components, the Bento grid has become a staple of modern web design.</p>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="when-to-use" className="text-dark pb-10 d-flex flex-column gap-3 w-100">
            <FadeInWhenVisible className="container-lg">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col">
                        <div className="bg-blue rounded-4 px-5 py-3 h-100">
                            <h2 className="mt-0 text-purple">When to use</h2>
                            <p>Bento is incredibly popular in product showcases, owing to its ability to simultaneously present bite-size information cleanly while allowing realistic images to stand out. These features also work for dashboards, infographics and data-driven content, or for easy display of available product categories (e.g. clothing). </p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="bg-purple rounded-4 px-5 py-3 h-100">
                            <h2 className="mt-0 text-light-lime">Audience</h2>
                            <p className="text-light-lime">Given the ability to mix with so many design styles, Bento can be made to work with a wide range of audiences. When paired with neutral colours, the clean, focused aesthetic works perfectly for professional, business audiences. This, of course, risks feeling "corporate" for indie or creative projects, but using a bolder palette or pairing it with stylised graphical elements helps retain a unique identity.</p>
                        </div>
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="examples" className="text-black mb-10">
            <FadeInWhenVisible className="container-lg">
                <h2 className="text-purple">Examples</h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible className="container-lg">
                <div className="d-flex flex-column">
                    <a href="https://everytailvets.co.uk" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/design-styles/bento/everytailvets.png" alt="Every Tail Vets' website" className="img-fluid my-4 scale-hover mb-0" />
                    </a>
                    <span className="mt-md-n2 z-1"><a href="https://everytailvets.co.uk" target="_blank" rel="noopener noreferrer">Every Tail Vets' website</a>. Softer palette, iconic Bento design.</span>
                </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible className="container-lg">
                <div className="d-flex flex-column">
                    <div className="mx-4">
                        <img src="/assets/design-styles/bento/apple-product-2022.webp" alt="A slide from Apple's 2022 product showcase" className="img-fluid my-4 scale-hover mb-0 rounded-4" />
                    </div>
                    <span className="mt-3 z-1">A slide from Apple's 2022 product showcase. The source of the modern Bento aesthetic.</span>
                </div>
            </FadeInWhenVisible>
        </section>
        <FadeInWhenVisible className="bg-purple text-light-lime w-100 pt-8 pb-10">
            <section id="further-reading" className="text-center">
                <h2>Like this and want more?</h2>
                <Link to="/design-styles"><b>Check out my other design style pages!</b></Link>
            </section>
        </FadeInWhenVisible>
    </UnstyledPageContainer>;
};
