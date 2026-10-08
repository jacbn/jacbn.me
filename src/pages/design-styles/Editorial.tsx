import React from "react";
import { UnstyledPageContainer } from "../../components/containers/UnstyledPageContainer";
import ScrollTop from "../../components/scrollTop";
import { FadeInWhenVisible } from "../../components/animation/fadeInWhenVisible";
import { Link } from "react-router";
import useDeviceSize, { above, below } from "../../scripts/hooks/deviceSize";
import classNames from "classnames";

interface RightColItemProps {
    title: string;
    subtitle: string;
}

const RightColItem = ({ title, subtitle }: RightColItemProps) => {
    return <li className="border-start border-2 border-black ps-3">
        <h3 className="mt-0">{title}</h3>
        <p className="font-size-small">{subtitle}</p>
    </li>;
};

interface LeftColItemProps {
    img: string;
    title: string;
    subtitle: string;
}

const LeftColItem = ({ img, title, subtitle }: LeftColItemProps) => {
    return <li className="d-flex flex-column align-items-center left-col-item text-center pb-6">
        <img src={img} alt={title} className="img-fluid" />
        <span className="font-size-small pt-2">{subtitle}</span>
        <span className="mt-0 font-size-label">{title}</span>
    </li>;
};

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    listClassName?: string;
}

const LeftCol = ({ listClassName, ...props }: ColProps) => {
    return <div {...props}>
        <h2>USE CASES</h2>
        <ul className={classNames("list-unstyled", listClassName)}>
            <LeftColItem img="/assets/design-styles/editorial/vogue-cover.jpg" subtitle="MAGAZINES" title="Large Photography Works Perfectly For Magazines" />
            <LeftColItem img="/assets/design-styles/editorial/print.jpg" subtitle="NEWS" title="Multiple Outbound Links Fit a Newspaper Style" />
        </ul>
    </div>;
};

const RightCol = ({ listClassName, ...props }: ColProps) => {
    return <div {...props}>
        <h2>KEY FEATURES</h2>
        <ul className={classNames("list-unstyled", listClassName)}>
            <RightColItem title="Large Photography, Generous Negative Space" subtitle="CAPTURES ATTENTION"/>
            <RightColItem title="Clean, Legible Body Text" subtitle="RETAINS PRINT IDENTITY" />
            <RightColItem title="Modular Column Layout, with Items Linking to Full Articles" subtitle="FOR A BROAD AUDIENCE"/>
        </ul>
    </div>;
};

export const Editorial = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const deviceSize = useDeviceSize();

    return <UnstyledPageContainer {...props} id="ds-editorial" className="bg-white text-black">
        <ScrollTop />
        <section id="hero" className="w-100 d-flex flex-column align-items-center">
            <img src="/assets/design-styles/editorial/hero.webp" alt="Editorial design style hero" className="img-fluid mt-0 mt-lg-n7" />
            <h1 className="visually-hidden">Editorial</h1>
            <div className={classNames("w-100 mt-lg-n5 px-3 py-1 font-size-small text-end", above["lg"](deviceSize) ? "text-white" : "text-black")}>
                <span>Photo modified from <a href="https://unsplash.com/@m_sajur?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Marcin Sajur</a> on <a href="https://unsplash.com/photos/woman-in-futuristic-attire-with-blindfold-and-jewelry-3lDd9XPFDc4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
            </div>
        </section>
        <section id="about" className="w-100 py-4 py-md-6">
            <FadeInWhenVisible className="container-lg d-flex" id="about-content">
                {above["md"](deviceSize) && <LeftCol />}
                <div className="px-5 py-3">
                    <p className="drop-cap">With an aim to mirror the world of print media to the web, editorial design takes heavy inspiration from the layout and typography of traditional newspapers and magazines. The landing page acts as the "front page", marked by a bold, attention-grabbing headline or graphic, and paired with clean, highly legible body text.</p>
                    <p>Multi-column layouts allow emphasising multiple content pieces, which news sites make heavy use of to showcase a range of content – and thus appeal to a wide audience.</p>
                    <div className="mb-4">
                        <img src="/assets/design-styles/editorial/vogue.png" alt="Vogue's website, a classic example of editorial design" className="img-fluid" />
                        <div className="mt-n2 text-center font-size-small">Vogue's website, a classic example of editorial design.</div>
                    </div>
                    {below["md"](deviceSize) && <RightCol className="my-5" listClassName="row row-cols-1 row-cols-md-2" />}
                    <p>Typography is important for dictating the style, but mostly free to experiment with in an editorial context. Headings with serif fonts read as elegant and sophisticated, whereas sans-serif fonts are more modern and clean. Body text need not align with headings in terms of font choice; the key is to maintain readability and cohesion throughout.</p>
                    <div className="mb-4 mt-2">
                        <img src="/assets/design-styles/editorial/wired.webp" alt="Wired's website, a more modern example showcasing sans-serif fonts" className="img-fluid" />
                        <div className="mt-n2 text-center font-size-small">Wired's website, a modern, tech-focused example showcasing sans-serif headings.</div>
                    </div>
                    {below["sm"](deviceSize) && <LeftCol className="my-5" listClassName="row row-cols-1 row-cols-sm-2" />}
                    <p>Keeping in line with readable body text, paragraphs are typically kept short to maintain digestible content. Readers often skim through content rather than read content in full, and breaking up text like this improves overall engagement.</p>
                    <div className="mb-4 mt-4">
                        <img src="/assets/design-styles/editorial/ft.webp" alt="FT's website, a go-to example of blocky, column-based content." className="img-fluid" />
                        <div className="mt-n2 text-center font-size-small">FT's website, a go-to example of blocky, column-based content.</div>
                    </div>
                    <p>Mobile responsiveness is crucial to a universally positive user experience. The column layout must adapt to different screen sizes, making maximal use of space when possible and collapsing when required. Collapsing content shifts the display order, forcing more thought from the designer in how to best present everything naturally.</p>
                    <hr className="my-4" />
                    <p>Editorial style, when done right, reads incredibly professionally. A big part of this feeling comes from both the quantity and quality of content – story and graphical – that is is difficult to reproduce in settings where content or staffing is limited. This significantly limits who can make successful use of it, and makes it especially difficult to implement if it is <em>not</em> currently in use already.</p>
                </div>
                {above["lg"](deviceSize) && <RightCol />}
            </FadeInWhenVisible>
        </section>
        <FadeInWhenVisible className="w-100 pt-8 pb-10 bg-black text-white">
            <section id="further-reading" className="text-center">
                <h2>LIKE THIS AND WANT MORE?</h2>
                <Link to="/design-styles"><b>Check out my other design style pages!</b></Link>
            </section>
        </FadeInWhenVisible>
    </UnstyledPageContainer>;
};
