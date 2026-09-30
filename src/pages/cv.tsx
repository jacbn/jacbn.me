import React from 'react';

export const CV = () => {
    return <main>
        <h1>CV</h1>
        <div className="topText">
            I have interests in working in both software engineering and public-facing service roles. Accordingly, I have two versions of my CV: one focused on my technical skills and experience, and one focused on my service and people skills.
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center align-content-center align-self-md-stretch gap-5 cv-switcher mt-5">
            <a className="card" href="/assets/cv/tech.pdf" target="_blank">
                <img src="/assets/cv/tech.svg" alt="Tech CV" />
                <span>Tech CV</span>
            </a>
            <a className="card" href="/assets/cv/service.pdf" target="_blank">
                <img src="/assets/cv/service.svg" alt="Service CV" />
                <span>Service CV</span>
            </a>
        </div>
    </main>;
};
