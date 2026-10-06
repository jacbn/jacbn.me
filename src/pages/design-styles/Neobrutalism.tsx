import React, { useState } from "react";
import { UnstyledPageContainer } from "../../components/containers/UnstyledPageContainer";
import ScrollTop from "../../components/scrollTop";
import { FadeInWhenVisible } from "../../components/animation/fadeInWhenVisible";
import { Link } from "react-router";
import classNames from "classnames";
import useDeviceSize, { above } from "../../scripts/hooks/deviceSize";

interface TabsContentProps {
    activeTab: "features" | "history" | "modern";
    setActiveTab: (tab: "features" | "history" | "modern") => void;
    tabs: Array<"features" | "history" | "modern">;
}

const TabsContent = ({ activeTab, setActiveTab, tabs }: TabsContentProps) => {
    return <div>
        <div className="d-flex align-items-end">
            {tabs.includes("features") && <button className={classNames("bg-green w-max-content px-3 m-0 rounded-top-4 neo-info-top position-relative z-1 tab", {"active": activeTab === "features"})} onClick={() => setActiveTab("features")}>
                <h2 className="m-0">Features</h2>
            </button>}
            {tabs.includes("history") && <button className={classNames("bg-yellow w-max-content px-3 m-0 rounded-top-4 neo-info-top position-relative z-1 tab", {"active": activeTab === "history"})} onClick={() => setActiveTab("history")}>
                <h2 className="m-0">History</h2>
            </button>}
            {tabs.includes("modern") && <button className={classNames("bg-blue w-max-content px-3 m-0 rounded-top-4 neo-info-top position-relative z-1 tab", {"active": activeTab === "modern"})} onClick={() => setActiveTab("modern")}>
                <h2 className="m-0">Modern use</h2>
            </button>}
        </div>
        {activeTab === "features" && <>
            <div className="bg-white p-3 rounded-bottom-4 rounded-end-4 neo-border mt-n1">
                <p><Link to="/design-styles/brutalism">Brutalism</Link>&apos;s modern counterpart, neobrutalism is defined by its bright, bold aesthetic and more friendly feel. Block regions of colour exist throughout with thick, black outlines between them, often paired with solid, black box shadows to further make elements pop.</p>
                <p>The typography remains large, bold, and usually black, which when paired with the well-defined sections and grid layout, defines a strong visual hierarchy.</p>
                <p>Retro-style iconography, shapes and patterns are also commonly seen to add a nostalgic touch.</p>
            </div>
        </>}
        {activeTab === "history" && <>
            <div className="bg-white p-3 rounded-bottom-4 rounded-end-4 neo-border mt-n1">
                <p>In the early days of the internet, web design was defined by bright, blocky and often incoherent designs owing to the limitations on browsers. As the web matured, design trends shifted towards minimalism and restrained, professional aesthetics – but lacking a sense of personality that many had a fondness for.</p>
                <p>Neobrutalism is a response to this muted, sterile aesthetic. It embraces playfulness and expressivity, leaving a joyous and vibrant impression on the user.</p>
            </div>
        </>}
        {activeTab === "modern" && <>
            <div className="bg-white p-3 rounded-bottom-4 rounded-end-4 neo-border mt-n1">
                <p>While previously uncommon and reserved for when it was intentional, neobrutalism has seen a huge resurgence owing to the increasing quantity of AI-generated sites. Standard, boilerplate AI designs are built around minimalist principles, and neobrutalism appeals as a striking alternative to this. This remains, however, unfortunately true for the LLMs generating websites as well – and given this, the style itself is increasingly being associated with AI-generated content.</p>
            </div>
        </>}
    </div>;
};

export const Neobrutalism = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const [activeTab, setActiveTab] = useState<"features" | "history" | "modern">("features");
    const deviceSize = useDeviceSize();

    return <UnstyledPageContainer {...props} id="ds-neobrutalism" className="bg-white">
        <ScrollTop />
        <section id="hero" className="w-100 d-flex flex-column align-items-center border-bottom border-black border-5">
            <div className="bg-green border-bottom border-black border-5 hero-1 w-100 d-flex align-items-center px-5 position-relative gap-5">
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <img src="/assets/design-styles/neobrutalism/donut.svg" />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <img id="messages" src="/assets/design-styles/neobrutalism/messages.svg" />
                </div>
                <div className="d-none d-md-flex flex-column justify-content-center align-items-center h-100">
                    <img id="triangles" src="/assets/design-styles/neobrutalism/triangles.svg" />
                </div>
            </div>
            <h1 className="visually-hidden">Neobrutalism</h1>
            <div className="hero-2">
                <img src="/assets/design-styles/neobrutalism/phone.svg" className="img-fluid" />
            </div>
        </section>
        <FadeInWhenVisible className="d-flex flex-column align-items-center w-100 bg-pink border-bottom border-black border-5" id="about">
            <div className="container-lg font-size-label text-dark d-flex py-5">
                <section id="about-neobrutalism" className="d-flex flex-column gap-3 col">
                    {above["md"](deviceSize)
                        ? <TabsContent activeTab={activeTab} setActiveTab={setActiveTab} tabs={["features", "history", "modern"]} />
                        : <>
                            <TabsContent activeTab={activeTab} setActiveTab={setActiveTab} tabs={["features"]} />
                            <TabsContent activeTab={activeTab} setActiveTab={setActiveTab} tabs={["history"]} />
                            <TabsContent activeTab={activeTab} setActiveTab={setActiveTab} tabs={["modern"]} />
                        </>
                    }

                    <div className="row row-cols-1 row-cols-md-2 g-4 mt-3 mb-5">
                        <div className="col">
                            <div className="bg-blue neo-border p-3 h-100">
                                <h2>Perception</h2>
                                <p>Vibrant features display life, energy and playfulness; it's informal and approachable. Compared to brutalism, the neo-counterpart has a more user-friendly focus, welcoming users to stay and explore.</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="col bg-yellow neo-border p-3 h-100">
                                <h2>Audience</h2>
                                <p>Given its history, neobrutalism greatly appeals to those with a taste for retro web design. Young adults, who grew up around this aesthetic, are standard target audiences for sites using this style. Its energy and creativity can also resonate with younger audiences still.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible className="d-flex flex-column align-items-center w-100 bg-blue border-bottom border-black border-5" id="examples">
            <div className="container-lg font-size-label text-dark d-flex py-5">
                <section id="examples" className="col">
                    <div className="bg-pink text-blue px-3 pt-1 pb-2 rounded-top-4 neo-info-top position-relative z-1">
                        <h2 className="m-0">Examples</h2>
                    </div>
                    <div className="bg-white p-3 neo-border border-bottom-0">
                        <div className="d-flex flex-column mx-3 mx-md-10 mt-md-6 gap-3">
                            <a href="https://byooooob.com" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/design-styles/neobrutalism/byooooob.png" alt="byooooob's website" className="img-fluid my-md-4 scale-hover rounded-5 border border-5 border-black" />
                            </a>
                            <span className="mt-md-n5 z-1"><a href="https://byooooob.com" target="_blank" rel="noopener noreferrer">byooooob's website</a>. Block colours, thick borders and black shadows are characteristic of the neobrutalism style.</span>
                        </div>
                    </div>
                    <div className="bg-white p-3 neo-border border-top-0 rounded-bottom-4 pb-10">
                        <div className="d-flex flex-column mx-3 mx-md-10 mt-md-6 gap-3">
                            <a href="https://sakubloom.com" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/design-styles/neobrutalism/sakubloom.png" alt="sakubloom's website" className="img-fluid my-md-4 scale-hover rounded-5 border border-5 border-black" />
                            </a>
                            <span className="mt-md-n5 z-1"><a href="https://sakubloom.com" target="_blank" rel="noopener noreferrer">sakubloom's website</a>. A more subtle theme, but retaining bold edges and borders. Has hallmarks of AI-assisted design.</span>
                        </div>
                    </div>
                </section>
            </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible className="bg-green text-black w-100 pt-8 pb-10">
            <section id="further-reading" className="text-center">
                <h2>Like this and want more?</h2>
                <Link to="/design-styles"><b>Check out my other design style pages!</b></Link>
            </section>
        </FadeInWhenVisible>
    </UnstyledPageContainer>;
};
