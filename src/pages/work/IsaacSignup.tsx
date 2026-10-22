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
                <h1 className="font-size-display text-white text-shadow-dark mt-4 mb-0 mb-md-3 pb-10">isaac <span className="text-green">signup</span></h1>
                {/* <p className="font-size-title mb-0 mb-md-5 text-green">a redesign of the isaac science signup flow</p> */}
            </div>
            <img src="/assets/isaac-signup/figma.webp" className="w-100" alt="" />
        </section>
        <section id="setting-the-scene" className="w-100 py-6 py-md-10">
            <FadeInWhenVisible className="container-xl g-9">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <h2 className="mb-4 mb-md-6">Setting the scene</h2>
                        <p>While the <Link to="/work/isaac-redesign">Isaac Redesign</Link> had focused on upgrading questions, concepts and site navigation, a few pages and flows hadn't seen the same level of attention. While perhaps a few components (e.g. buttons, inputs, etc) had been updated, the signup flow was one that had mostly stayed the same since its inception 12 years ago; the only structural changes it had received in that time only served to lengthen it.</p>
                        <p>I started thinking about this at a time when a real focus was being put on younger (10-13 year old) users; content for years 7-9 had been in development for some time at this point. A large gripe I had with the wider roadmap was that it was just <i>assumed</i> that the rest of the site would function for these younger users as it does for older students.</p>
                        <p>Unfortunately, this just isn't true. Assumptions like "users will have email addresses" or "users will be familiar with common web components" hold much less frequently for young users. If they are using laptop computers in class, for example, this may be the first time these users have ever used a non-mobile device. In addition, the needs of a younger user are also distinct from those of an older user; the sources of motivation, learning styles, and level of need for guidance can't be assumed to work the same.</p>
                    </div>
                    <div className="col-12 col-md-4">
                        <figure>
                            <img src="/assets/isaac-signup/old-signup.webp" className="w-100" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">The original signup flow, which had been in place for over a decade. Lots of different components create a complex user experience.</figcaption>
                        </figure>
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="teachers" className="w-100 py-6 py-md-10 bg-light">
            <FadeInWhenVisible className="container-xl g-9">
                <h2>The needs of teachers</h2>
                <p>Aside from the younger audience, there were unaddressed needs from teachers that I sought to address too. Most students come to the site because their teacher has assigned homework on the platform, so they are <i>required</i> to sign up; metrics such as time-to-value (TTV) for students mean little from a "business" perspective. However, for new teachers or for schools investigating whether Isaac is right for them, the signup flow is a critical first impression.</p>
                <p>To become a teacher on Isaac, the process was:</p>
                <ul>
                    <li>Sign up for a student account</li>
                    <li>Verify the provided email address</li>
                    <li>Log in</li>
                    <li>Find the form to manually request a teacher account</li>
                    <li>Fill out the form and submit it</li>
                    <li>Await a response</li>
                </ul>
                <p>It made sense to streamline this process, in an ideal world keeping it all in one flow.</p>
            </FadeInWhenVisible>
        </section>
        <section id="start-of-flow" className="w-100 py-6 py-md-10">
            <FadeInWhenVisible className="container-xl g-9">
                <h2>Prototyping the start of the flow</h2>
                <p>With these requirements locked in, I set out to prototype a new flow that better supported all users.</p>
                <p>A first point of note was that the old designs had two separate pages; <i>log in</i> (left) and <i>sign up</i> (right). All "sign up / log in" buttons around the site actually point to the log in page, from which there is a redirect to the sign up page.</p>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <figure>
                            <img src="/assets/isaac-signup/old-isaac-1.webp" className="img-fluid" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">The old login page. Note the "Sign up" option (which redirects to the registration page, right) is visually <b>after</b> the email and password fields, which can only be used to log in. This can create an infuriating experience where the user types their information to sign up, only to have it discarded when they are redirected to the registration page – and bear in mind, this is the first screen a trial user may see. Not a great look!</figcaption>
                        </figure>
                    </div>
                    <div className="col-12 col-md-6">
                        <figure>
                            <img src="/assets/isaac-signup/old-isaac-2.webp" className="img-fluid" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">The old registration page. The SSO buttons are repeated here (despite doing the same thing as on the previous page), and the user came from the log in page, so a redirect back feels unnecessary.</figcaption>
                        </figure>
                    </div>
                </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible className="container-xl g-9 mt-8">
                <p>I always found this split approach entirely unnecessary and frustrating. To start improving, I broke the pages down into the core 4 distinct actions that are actually available between them: two SSO options, log in with a known email and password, and register with a new email. These are then the only options available on a reworked, single page for both registration and logging in.</p>
                <figure className="mt-4 px-10">
                    <img src="/assets/isaac-signup/new-signup-1.webp" className="img-fluid" alt="" />
                    <figcaption className="text-dark font-size-small mt-2">Owing to under-13 users being required to use SSO (for GDPR compliance purposes), these options are higher up and thus more prominent. The two email-based options are together, under an "or use an email" separator to visually move them apart from the SSO options. You'll also notice the addition of Newt, a site mascot I created to create a friendlier and more welcoming experience. Newt's appeal within the team was far greater than I had anticipated, and has already become part of the 11-14 content.</figcaption>
                </figure>
            </FadeInWhenVisible>
            <FadeInWhenVisible className="container-xl g-9 mt-8">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <p>Logging in with email and password brings up the details form. Compared to the old flow, this is one additional step in the process – but given the push towards SSO and an improved user experience, it is a tradeoff that improves all the other flows.</p>
                        <p>The SSO options work by either signing a known user in if one exists, or creating a new account if not; this takes users to the same page as the email-based registration flows. Before, the SSO flow was entirely separate from the email-based flow, which meant key user details were not obtained (as SSO does not collect all the same information). We were previously solving this via a popup modal when signed in, that appeared if any account information is missing – but this feels messy from a user perspective owing to a disjoint flow.</p>
                    </div>
                    <div className="col-12 col-md-4">
                        <figure className="px-10 px-md-0">
                            <img src="/assets/isaac-signup/new-signup-2.webp" className="img-fluid" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">The email and password fields, displayed only when email login is selected.</figcaption>
                        </figure>
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="distinguishing-users" className="w-100 py-6 py-md-10 bg-light">
            <FadeInWhenVisible className="container-xl g-9">
                <h2>Distinguishing users</h2>
                <p>To link back to the requirements, it is important to keep flows minimal and simple. A student doesn't need to see teacher-specific content, so that section of the flow can be hidden. And when duplicated information can come from different sources (e.g. SSO), this should be made use of, rather than requiring the same information multiple times.</p>
                <div className="row mt-5">
                    <div className="col-12 col-md-6">
                        <figure className="px-10 px-md-0">
                            <img src="/assets/isaac-signup/new-signup-3.webp" className="img-fluid" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">Selecting an account type. The parent/tutor and teacher options extend the flow at the end with additional information and verification steps.</figcaption>
                        </figure>
                    </div>
                    <div className="col-12 col-md-6">
                        <figure className="px-10 px-md-0">
                            <img src="/assets/isaac-signup/new-signup-4.webp" className="img-fluid" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">The age verification step. Used only for student accounts, and skipped for those creating an account with SSO as age verification is handled by the SSO provider.</figcaption>
                        </figure>
                    </div>
                </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible className="container-xl g-9 mt-8">
                <p>After this, gathering information about the user is mostly the same across all account types. Minor differences appear in:</p>
                <ul>
                    <li>SSO users can have their name pre-filled, and do not need an email/password input (unless they want one);</li>
                    <li>Teachers need to be reminded to use their institutional email address, as this is used in the verification process.</li>
                </ul>
                <figure className="mt-6 px-10">
                    <img src="/assets/isaac-signup/new-signup-5.webp" className="img-fluid" alt="" />
                    <figcaption className="text-dark font-size-small mt-2">An email-based student signup.</figcaption>
                </figure>
            </FadeInWhenVisible>
        </section>
        <section id="concluding-the-flow" className="w-100 py-6 py-md-10">
            <FadeInWhenVisible className="container-xl g-9">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2>Concluding the student flow</h2>
                        <p>Depending on the method of signup, the old flow may not have had any confirmation (e.g. with SSO), leading to an incomplete user experience. To resolve this, the new flow includes a completion step with options to check over the submitted account information, or to go straight to the learning side of the platform.</p>
                        <p>To avoid this completion becoming just an extra step in the flow, however, the design includes a group code entry box that allows students to connect to teachers. This may not be needed in all cases, but exists as a shortcut to avoid navigating through other parts of the site – as this is known to be the first interaction a user makes once they have their account, and my aim is to make it as smooth as possible.</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <figure className="mt-4 px-10">
                            <img src="/assets/isaac-signup/new-signup-6.webp" className="img-fluid" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">The signup completion page.</figcaption>
                        </figure>
                    </div>
                </div>
                <div className="row mt-7">
                    <div className="col-12 col-md-6">
                        <figure className="mt-4 px-10">
                            <img src="/assets/isaac-signup/new-signup-7.webp" className="img-fluid" alt="" />
                            <figcaption className="text-dark font-size-small mt-2">The signup completion page.</figcaption>
                        </figure>
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>Incorporating teacher information</h2>
                        <p>As we require additional information from teachers, this is the point where the flows diverge more significantly such that more info can be gathered. The most important distinction for users in this category to know is the difference between the available account types; they may have selected "teacher" while our definition of this (works at a contactable school) may not be valid for them. To this end, we first show an information screen detailing the differences, before proceeding to the info gathering step for confirmed teachers.</p>
                    </div>
                </div>
            </FadeInWhenVisible>
        </section>
        <section id="error-states" className="w-100 py-6 py-md-10 bg-light">
            <FadeInWhenVisible className="container-xl g-9">
                <h2>Error states</h2>
                <p>Despite being a fundamental part of the user experience, error states are often overlooked in the design process. Ensuring users recover from mistakes is critical to maintaining a positive user experience. By far our most common complaint email from users was the difficulty in understanding the difference between SSO and traditional login. Many, many users believed that they could log in with SSO because they previously used an e.g. Microsoft email... to create an account with a password. From a technical perspective, this distinction is clear – but from a non-technical user, it certainly is not. As such, this was the first error state I considered, and I wanted to be as careful and precise as possible in the message conveyed such that a correct recovery path was understood.</p>
                <p>To do this, I made better use of our API's response when attempting to sign in such that a distinction could be made between different failure modes. If the database's response after creating an account via SSO was that the account already exists, then the user must have an account with us, but not an SSO one. From a security standpoint, it is safe to tell them that we can locate an account with that email as they have verifiably logged in to their SSO account with that email address.</p>
                <figure className="mt-4 px-10">
                    <img src="/assets/isaac-signup/new-signup-8.webp" className="img-fluid" alt="" />
                    <figcaption className="text-dark font-size-small mt-2">The error state created by attempting to sign in with SSO, when the account is not set up to use it.</figcaption>
                </figure>
            </FadeInWhenVisible>
        </section>
        <section id="conclusion" className="w-100 py-6 py-md-10">
            <FadeInWhenVisible className="container-xl g-9">
                <h2>Conclusion</h2>
                <p>It was universally agreed within the team that the new signup flow was a significant improvement over the old one. After some iteration on the teacher flow having conversed with our teacher advisor, the flow was signed off on and ready for implementation. I unfortunately left before this was complete, but two things I would have loved to compare would be drop-off rates and error rates between the old and new flows; this would provide valuable insight into the effectiveness of the new design.</p>
            </FadeInWhenVisible>
        </section>
    </UnstyledPageContainer>;
};
