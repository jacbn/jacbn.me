import React from 'react';
import { MobileContact, References } from '../components/privateComponents';
import ThemeSelector from '../components/theming/themeSelector';
import { Link } from 'react-router-dom';
import { ReturnToParentPage } from '../components/returnToParentPage';

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

const TechCVBody = () => {
    return <main>
        <div className="d-flex cv page">
            <div className="col-l contacts">
                <h2>Contact</h2>
                <ContactLink icon="/assets/contacts/linkedin.svg" href="https://www.linkedin.com/in/jaycie-bn/" text="jaycie-bn" />
                <ContactLink icon="/assets/contacts/github.svg" href="https://github.com/jacbn" text="jacbn" />
                <ContactLink icon="/assets/contacts/web.svg" href="https://jaycie.me" text="jaycie.me" />
                <MobileContact/>
                <ContactLink icon="/assets/contacts/email.svg" href="mailto:hello@jaycie.me" text="hello@jaycie.me" />

                <h2>Tooling</h2>
                <div className="dual-column">
                    <span>Figma</span>
                    <span>Framer</span>
                    <span>Git</span>
                    <span>Docker</span>
                </div>

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
                    <span>Creativity</span>
                    <span>Teamwork</span>
                    <span>Detail-oriented</span>
                    <span>Adaptability</span>
                    <span>Time management</span>
                </div>

                <References/>
            </div>
            <div className="col-r px-3">
                <h1>Jaycie Brown</h1>
                <h4>EdTech Software Engineer</h4>

                <p>
                    An experienced software engineer with an extensive history designing, developing, and expanding a variety of projects. Driven by a desire to provide memorable, authentic experiences for real people, I am keen to employ my skills in a role that benefits a wide community while also challenging me to grow. I am demonstrably willing to learn from and adapt to new challenges, and am keen to form part of a dynamic team that can both support my growth and benefit from my contributions.
                </p>

                <Section title="Employment">
                    <Subsection title="Isaac Science, 2023-present">
                        <ul>
                            <li>
                                Working cross-stack on the Isaac platform, with a focus on the front-end. Major accomplishments include a new, extensively-used question type, various new pages from marketing to question finding, and a continuous effort to tidy and increase maintainability of the codebase.
                            </li>
                            <li>
                                Currently leading a major redesign of the front-end of the platform, comprising of a complete overhaul of the UI/UX across the website. 
                            </li>
                            <li>
                                Helped to onboard three new developers to the team, and recently gave a technical talk on CSS and best practices to the wider team.
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
                            [1] J. Brown, Y. Liu, and C. Mascolo. "Yawning Detection using Earphone Inertial Measurement Units." Proceedings of the 2nd Workshop on Smart Wearable Systems and Applications. 2023.
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
    </main>;
};

const Photo = () => {
    return <div className="profile-photo">
        <img src="/assets/cv/me.png" alt="A picture of me" />
    </div>;
};

const ServiceCVBody = () => {
    return <main>
        <div className="d-flex cv page">
            <div className="col-l contacts">

                <Photo />

                <h2>Contact</h2>
                <ContactLink icon="/assets/contacts/web.svg" href="https://jaycie.me" text="jaycie.me" />
                <MobileContact/>
                <ContactLink icon="/assets/contacts/email.svg" href="mailto:hello@jaycie.me" text="hello@jaycie.me" />

                <div className="py-2" />

                <h2>Soft Skills</h2>
                <div className="d-flex flex-column gap-1">
                    <span>Teamwork</span>
                    <span>Time management</span>
                    <span>Adaptability</span>
                    <span>Detail-oriented</span>
                    <span>Creativity</span>
                </div>

                <div className="py-2" />

                <References/>


            </div>

            <div className="col-r px-3">
                <h1>Jaycie Brown</h1>
                {/* <h4>Web Developer</h4> */}

                <div className="py-2" />

                <p>
                    A developer wishing to learn a new set of skills and apply abilities to an unfamiliar environment. Driven by wanting to make a meaningful difference to real people, I am keen to work in a role that both benefits the wider community while also challenging me to grow and improve myself. I am demonstrably willing to learn from and adapt to new challenges, and would be keen to form part of a friendly, dynamic team that can both support my growth and benefit from my contributions.
                </p>

                <Section title="Employment">
                    <Subsection title="Isaac Science, 2023-present">
                        <ul>
                            <li>
                                Developing the online learning platform for the Isaac Science project, a STEM-learning initiative for secondary school students run by the University of Cambridge.
                            </li>
                            <li>
                                Lead the team in a major redesign of the website, involving working with external designers, breaking designs down into fixed-size tasks, and implementing a highly consistent, clean and reliable foundation for future development to continue on.
                            </li>
                            <li>
                                Helped to onboard three new developers to the team, and have delivered several talks to both the team and to a wider community in the department.
                            </li>
                            <li>
                                Been involved in a number of events and outreach activities, from feature discussions and CPD with teachers to workshops and open days for students.
                            </li>
                            <li>
                                Taken on a range of responsibilities for the university outside the direct job description, including undergraduate teaching, running admissions interviews, and assisting PhD projects.
                            </li>
                        </ul>
                    </Subsection>

                    <Subsection title="Cisco, 2022" tag="(3mo)">
                        <ul>
                            <li>
                                Worked on Cisco&apos;s Data Loss Prevention engine, a network analyser aimed at preventing important data leaking from a company.
                            </li>
                            <li>
                                Worked closely alongside another intern, sharing ideas, developing solutions and fostering collaboration among the wider team.
                            </li>
                            <li>
                                Gained experience of working for a small team within a larger company, alongside an understanding of the challenges and expectations that this brings.
                            </li>
                        </ul>
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
    </main>;
};

export const CV = () => {
    return <main>
        <h1>CV</h1>
        <div className="topText">
            I have interests in working in both software engineering and public-facing service roles. Accordingly, I have two versions of my CV: one focused on my technical skills and experience, and one focused on my service and people skills.
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center align-content-center align-self-md-stretch gap-5 cv-switcher mt-5">
            <Link className="card" to="/cv/tech">
                <img src="/assets/cv/tech.svg" alt="Tech CV" />
                <span>Tech CV</span>
            </Link>
            <Link className="card" to="/cv/service">
                <img src="/assets/cv/service.svg" alt="Service CV" />
                <span>Service CV</span>
            </Link>
        </div>
    </main>;
};

export const TechCV = () => {
    return <ThemeSelector themes={["paper", "cv"]}>
        <ReturnToParentPage />
        <TechCVBody />
    </ThemeSelector>;
};

export const ServiceCV = () => {
    return <ThemeSelector themes={["paper", "cv"]}>
        <ReturnToParentPage />
        <ServiceCVBody />
    </ThemeSelector>;
};
