import React from "react";
import ScrollTop from "../../components/scrollTop";
import { UnstyledPageContainer } from "../../components/containers/UnstyledPageContainer";
import classNames from "classnames";
import { Link } from "react-router";
import { FadeInWhenVisible } from "../../components/animation/fadeInWhenVisible";

export const IsaacSignup = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return <UnstyledPageContainer {...props} className={classNames("isaac-signup bg-white text-dark")}>
        <ScrollTop />
        <section id="hero" className="w-100 d-flex flex-column justify-content-center align-items-center">
            <div className="container-xl g-9 text-center position-absolute">
                <h1 className="font-size-display text-white text-shadow-dark mt-4 mb-0 mb-md-3">isaac <span className="text-green">signup</span></h1>
                {/* <p className="font-size-title mb-0 mb-md-5 text-green">a redesign of the isaac science signup flow</p> */}
            </div>
            <img src="/assets/isaac-signup/figma.png" className="w-100" alt="" />
        </section>
        <section id="setting-the-scene" className="w-100 py-9 py-md-12">
            <FadeInWhenVisible className="container-xl g-9">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <h2 className="font-size-title mb-4 mb-md-6">Setting the scene</h2>
                        <p>While the <Link to="/work/isaac-redesign">Isaac Redesign</Link> had focused on questions, concepts and site navigation, a few pages hadn't seen the same level of attention. While perhaps a few components (e.g. buttons, inputs, etc) had been updated, the signup flow was one that had mostly stayed the same since its inception 12 years ago; the only structural changes it had received only served to lengthen it.</p>
                        <p>This also came at a time when a real focus was being put on younger (10-13 year old) users; content for years 7-9 had been in development for some time at this point. A large gripe I had with the approach taken here was that it was just <i>assumed</i> that the rest of the site would function for these younger users as it does for older students.</p>
                        <p>Unfortunately, this just isn't true. Assumptions like "users will have email addresses" or "users will be familiar with common web components" hold much less frequently for young users. If they are using laptop computers in class, for example, this may be the first time these users have ever used a non-mobile device. In addition, the needs of a younger user are also distinct from those of an older user; the sources of motivation, learning styles, and level of need for guidance can't be assumed to work the same.</p>
                    </div>
                    <div className="col-12 col-md-4">
                        <figure>
                            <img src="/assets/isaac-signup/old-signup.webp" className="w-100" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">The original signup flow, which had been in place for over a decade.</figcaption>
                        </figure>
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="problem" className="w-100 py-9 py-md-12 bg-light">
            <div className="container-xl g-9">

            </div>
        </section>
        <section id="solution" className="w-100 py-9 py-md-12">
            <div className="container-xl g-9">

            </div>
        </section>
    </UnstyledPageContainer>;
};
