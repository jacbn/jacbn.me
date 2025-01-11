import React from 'react';
import { MobileContact, References } from '../components/privateComponents';
import ThemeSelector from '../components/theming/themeSelector';

interface ContactLinkProps {
    icon: string;
    href: string;
    text: string;
}

const ContactLink = ({ icon, href, text }: ContactLinkProps) => {
    return <a href={href} target="_blank" rel="noreferrer" className="contact-link">
        <img src={icon} alt="" />
        <span>{text}</span>
    </a>;
};

interface SectionProps {
    title: string;
    tag?: string;
    children: React.ReactNode;
}

interface SubsectionProps {
    title: string;
    tag?: string;
    children: React.ReactNode;
}

const Section = ({ title, tag, children }: SectionProps) => {
    return <div className="section">
        <h2>
            {title}
            {tag && <span className="tag"> {tag}</span>}
        </h2>
        {children}
    </div>;
};

const Subsection = ({ title, tag, children }: SubsectionProps) => {
    return <div className="subsection">
        <h3>
            {title}
            {tag && <span className="tag"> {tag}</span>}
        </h3>
        {children}
    </div>;
};

const CV = () => {
    return <ThemeSelector themes={["paper", "cv"]}>
        <div className="d-flex cv page">
            <div className="col-l contacts">
                <h2>Contact</h2>
                <ContactLink icon="/assets/contacts/linkedin.svg" href="https://www.linkedin.com/in/jacob-ea-brown/" text="jacob-ea-brown" />
                <ContactLink icon="/assets/contacts/github.svg" href="https://github.com/jacbn" text="jacbn" />
                <ContactLink icon="/assets/contacts/web.svg" href="https://jacbn.me" text="jacbn.me" />
                <MobileContact/>
                <ContactLink icon="/assets/contacts/email.svg" href="mailto:jacob@jacbn.me" text="jacob@jacbn.me" />

                <h2>Languages</h2>
                <div className="dual-column">
                    <span>JS/TS</span>
                    <span>HTML</span>
                    <span>(S)CSS</span>
                    <span>Python</span>
                    <span>Java</span>
                    <span>Dart</span>
                    <span>C#</span>
                    <span>SQL</span>
                </div>

                <h2>Frameworks</h2>
                <div className="dual-column">
                    <span>React</span>
                    <span>Next.js</span>
                    <span>Flutter</span>
                    <span>.NET</span>
                </div>

                <h2>Soft Skills</h2>
                <div className="d-flex flex-column">
                    <span>Teamwork</span>
                    <span>Time management</span>
                    <span>Adaptability</span>
                    <span>Detail-oriented</span>
                    <span>Creativity</span>
                </div>

                <References/>
            </div>
            <div className="col-r px-3">
                <h1>Jacob Brown</h1>
                <h4>EdTech Software Engineer</h4>

                <p>
                    An experienced software engineer with an extensive history developing projects and skills across the breadth of computer science. Driven by wanting to make a meaningful difference to the world, I am keen to employ my skills in a role that both benefits the wider community while also challenging me to grow. I am demonstrably willing to learn from and adapt to new challenges, and would be keen to form part of a dynamic team that can both support my growth and benefit from my contributions.
                </p>

                <Section title="Employment">
                    <Subsection title="Isaac Physics, 2023-present">
                        <ul>
                            <li>
                                Working cross-stack on the Isaac platform, with a focus on the front-end. Major accomplishments include a new, extensively-used question type, various new pages from marketing to question finding, and a continuous effort to tidy and increase maintainability of the codebase.
                            </li>
                            <li>
                                Currently leading a major redesign of the front-end of the platform, comprising of a complete overhaul of the UI/UX across the website. 
                                {/* This has thus far involved breaking the designs down and implementing the underlying foundations for these, with more standard component and page development starting soon. */}
                            </li>
                            <li>
                                Helped to onboard two new developers to the team, and recently gave a technical talk on CSS and best practices to the wider team.
                            </li>
                            <li>
                                Taken on responsibilities for the wider university outside of the direct job description, including supervising undergraduates, assisting a PhD project using a fork of one of our components, and running admissions interviews.
                            </li>
                        </ul>
                    </Subsection>

                    <Subsection title="Cisco, 2022" tag="(3mo)">
                        <ul>
                            <li>
                                Working on Cisco&apos;s Data Loss Prevention engine, a cloud-based network traffic analysis engine to prevent data leaks.
                            </li>
                            <li>
                                Developed a user-facing Java application to efficiently and securely encrypt company data to upload to Cisco&apos;s SWG.
                            </li>
                            <li>
                                Worked with proprietary APIs, in one notable case discovering and providing a solution to a major inefficiency affecting several Cisco products.
                            </li>
                        </ul>
                    </Subsection>
                </Section>

                <Section title="Research">
                    <Subsection title="Yawning Detection, 2022-2023">
                        <ul>
                            <li>
                                An award-winning dissertation-turned-paper<sup><span className="tag">[1]</span></sup> developing a novel method of drowsiness detection using spatial data from head-tracking earphones.
                            </li>
                            
                        </ul>
                        <p className="citation">
                            [1] Brown, Jacob, Yang Liu, and Cecilia Mascolo. "Yawning Detection using Earphone Inertial Measurement Units." Proceedings of the 2nd Workshop on Smart Wearable Systems and Applications. 2023.
                        </p>
                    </Subsection>
                </Section>

                <Section title="Education">
                    <Subsection title="University of Cambridge, 2020-2023">
                        <ul>
                            <li>
                                BA Computer Science, 2:1 <span className="tag">(70.1%)</span>
                            </li>
                        </ul>
                    </Subsection>
                    <Subsection title="Saffron Walden County High School, 2013-2020">
                        <ul>
                            <li>
                                A-levels: A* A* A* A* <span className="tag">(CS, Physics, Maths, F. Maths)</span>
                            </li>
                            <li>
                                AS-levels: A A A B <span className="tag">(CS, Physics, Geology, F. Maths)</span>
                            </li>
                        </ul>
                    </Subsection>
                    

                </Section>
            </div>
        </div>
    </ThemeSelector>;
};

export default CV;
