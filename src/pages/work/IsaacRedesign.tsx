import React from "react";
import { UnstyledPageContainer } from "../../components/containers/UnstyledPageContainer";
import classNames from "classnames";
import useDeviceSize, { above } from "../../scripts/hooks/deviceSize";
import { FadeInWhenVisible } from "../../components/animation/fadeInWhenVisible";
import ScrollTop from "../../components/scrollTop";

export const IsaacRedesign = (props: React.HTMLAttributes<HTMLElement>) => {
    const deviceSize = useDeviceSize();

    return <UnstyledPageContainer {...props} className={classNames("isaac-redesign bg-white")}>
        <ScrollTop />
        {/* <h1 className="text-black font-isaac-title py-9 my-5 fs-hero">Rebuilding a decade-old site <span className="isaac-green">from the ground up.</span></h1> */}
        <section id="hero" className="d-flex flex-column align-items-center">
            <img className="w-100 h-100 position-absolute" src="/assets/isaac-redesign/hero-bg.png" />
            <img id="hero-text" height="400px" className="w-100 position-relative object-fit-contain" src="/assets/isaac-redesign/title-text-1.svg" />
            {above[deviceSize]("lg") && <img id="phone-decor" className="position-absolute" src="/assets/isaac-redesign/phone-decor-lg.svg" alt="" />}
            <img id="phone" height="600px" className="position-relative" src="/assets/isaac-redesign/isaac-phone.png" alt="A preview of the redesigned Isaac Science platform, showcasing a modern and clean interface." />
        </section>
        <section id="need-for-change" className="py-12">
            <FadeInWhenVisible className="container-lg">
                <h2>A need for change</h2>
                <p>Launched in 2014 as Isaac Physics with an aim to support sixth form students develop problem solving and maths skills in physics, Isaac has since developed into a leading online learning platform for both a wider variety of subjects and age groups. Such an expansion, particularly into chemistry and biology, led to the branding of Isaac <i>Physics</i> becoming increasingly less aligned with the platform's goals.</p>
            </FadeInWhenVisible>
        </section>
        <section id="nav-overview" className="my-12">
            <FadeInWhenVisible className="container-lg text-black">
                <div className="bento-card p-4">
                    <img className="w-100 h-100" src="/assets/isaac-redesign/nav-menu.png" />
                </div>
                <h3>Multidisciplinary overhaul</h3>
                <p>Navigation on the new site, with shortcuts to all subject-stage pairs on the homepage and from the navbar.</p>
            </FadeInWhenVisible>
        </section>
        <section id="fluent-overview">
            <img className="w-100 h-100 position-absolute object-fit-cover" src="/assets/isaac-redesign/fluent-panel.svg" />
        
            <FadeInWhenVisible className="container-lg position-relative text-black py-12">
                <div className="row g-9">
                    <div className="col-lg-6">
                        <h3>Initially working with a design agency...</h3>
                        <p>We worked with Fluent to revamp the more common pages and components - the homepage, navigation, questions, and concepts. This became the basis for the ‘look and feel’ of the site, the cornerstone of all future work. They did a fantastic job considering the flakiness and open-endedness of the initial prompt - but such a broad scope and variety of content types meant the work was only just beginning.</p>
                    </div>
                    <div className="col-lg-6">
                        <h3>...then taking control ourselves</h3>
                        <p>As our time working together came to an end, there were still pages that hadn’t seen a change and didn’t fit with the theme of the common ones. There was also a large chunk of work for our content teams to do, and we needed both intermediary solutions to show in the meantime, and final designs that could only be developed when the structure of the content was known. I took control of Fluent’s Figma project to extract and rework components, creating a reusable component library with the additions this work required.</p>
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="showcase">
            <div id="showcase-bg" />
            <div className="d-flex flex-column gap-3 container-lg py-9 text-black bg-white">
                <FadeInWhenVisible className="row g-5">
                    <div className="d-flex flex-column col-lg-4">
                        <video id="demo-sidebar" className="bento-card w-100 object-fit-cover" src="/assets/isaac-redesign/demo-sidebar-1.mp4" autoPlay loop muted />
                        <h3>Solving the scrollbar on mobile</h3>
                        <p>Our "sidebar-first" approach worked great on desktop, but did not translate well to mobile. I developed a dynamic, always-accessible sidebar button that collapses when scrolled past.</p>
                    </div>
                    <div className="d-flex flex-column col-lg-8">
                        <div id="isaac-figma" className="bento-card p-4">
                            <img className="w-100 h-100" src="/assets/isaac-redesign/isaac-figma.png" />
                        </div>
                        <h3>A reusable component library</h3>
                        <p>I componentised and extended the provided Figma project. As a sample, the above shows my reworking of card components, built in two scales for Events (small) and Programmes (large).</p>
                    </div>
                </FadeInWhenVisible>
                <FadeInWhenVisible className="row g-5">
                    <div className="d-flex flex-column col-lg-7">
                        <div id="isaac-book" className="bento-card">
                            <img className="w-100 h-100" src="/assets/isaac-redesign/isaac-book.png" />
                        </div>
                        <h3>Spotlight: Book pages</h3>
                        <p>The site's book content underwent a complete overhaul, turning hard-coded pages into a beautified system of chapters entirely modifiable from our in-house content editor.</p>
                    </div>
                    <div className="col-lg-5">
                        <div id="inline-questions" className="bento-card">
                            <img className="w-100 h-100" src="/assets/isaac-redesign/inline.png" />
                        </div>
                        <h3>Spotlight: Inline questions</h3>
                        <p>Alongside the redesign, a new inline question type allows authors to create interactive questions embedded directly within content.</p>
                    </div>
                </FadeInWhenVisible>
                <FadeInWhenVisible className="row g-5">
                    <div className="d-flex flex-column col-lg-4">
                        <div id="markbook" className="bento-card p-2">
                            <img className="w-100 h-100" src="/assets/isaac-redesign/markbook.png" />
                        </div>
                        <h3>Rebuilding the markbook</h3>
                        <p>With conflicting and ever-changing requirements, designing the markbook was a complex challenge that required careful planning and iteration.</p>
                    </div>
                    <div className="col-lg-8">
                        <div id="accessibility" className="bento-card">
                            <img className="w-100 h-100" src="/assets/isaac-redesign/accessibility.png" />
                        </div>
                        <h3>Site-wide accessibility</h3>
                        <p>A major personal focus was to improve accessibility throughout the site, both through design and implementation. Features are laid out with priority for common use cases, and aria labels, skipnavs and landmark roles are properly used to assist screen reader navigation.</p>
                    </div>
                </FadeInWhenVisible>
            </div>
        </section>
        <section id="outro" className="mt-4">
            <div id="outro-bg" />
            <FadeInWhenVisible id="outro-main" className="container-lg pt-8 position-relative mb-12">
                <h2>Reflecting and continuing the journey</h2>
                <p>The main redesign might be complete, but there are still areas to improve and new features to add. Initial feedback from teachers has been incredibly positive, with only (now-fixed) small bugs surfacing. One user group I'm particularly keen to hear from are those for whom my push for accessibility changes would be relevant to, but this isn't something we've been able to set up yet.</p>
                <p>An area outside the scope of the redesign that I've taken the initiative on is the login and signup flows, as our most commonly received email type by far is issues with logging in, indicating a lack of clarity with how to fix issues on the user's end.</p>
                <div className="row mt-5 position-relative">
                    <div className="col-lg-6 offset-lg-3">
                        <div id="login-mockup" className="bento-card">
                            <img className="w-100 h-100" src="/assets/isaac-redesign/login-mockup.png" />
                        </div>
                        <p>A mockup of a new login flow for the site.</p>
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <div id="outro-bg-bottom" className="w-100 py-8" />
    </UnstyledPageContainer>;
};
