import React from "react";
import HomeText from "../../components/homeText";
import { Link } from "react-router";
import classNames from "classnames";

interface DesignStyleProps {
    image: string;
    link: string;
    text: string;
}

const DesignStyle = ({ image, link, text }: DesignStyleProps) => {
    return <li className="mt-3">
        <Link to={link} className={classNames("w-100 d-flex flex-column border border-2 border-primary shadow-light text-decoration-none scale-hover")}>
            <img src={image} alt={text} className="img-fluid border-bottom rounded-top-2 border-2 border-primary" />
            <div className="p-5 bg-black text-end">
                <span className="font-size-label">{text}</span>
            </div>
        </Link>
    </li>;
};

export const DesignStylesListing = () => {
    return <HomeText
        title="design styles"
        text={
            <>
                <p>Explore my research into different web design styles.</p>
                <ol reversed className="list-unstyled">
                    <DesignStyle
                        image="/assets/design-styles/brutalism/hero.png"
                        link="/design-styles/brutalism"
                        text="october 2026"
                    />
                </ol>
            </>
        }
    />;
};
