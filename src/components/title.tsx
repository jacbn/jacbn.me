import classNames from 'classnames';
import React from 'react';
import { BounceInWhenVisible } from './animation/BounceInWhenVisible';
import { MagnetText } from './animation/MagnetText';
import { motion } from 'framer-motion';

export const Title = ({full}: {full?: boolean}) => {
    return <div className={classNames("title-wrapper", {"full": full})}>
        <div className="position-absolute w-100 h-100">
            <BounceInWhenVisible>
                <MagnetText className="text-shadow-dark" Tag={motion.h1}>jaycie</MagnetText>
            </BounceInWhenVisible>
            {full && <BounceInWhenVisible delay={0.2}>
                <h2 className="text-shadow-dark shadow-offset-md mt-8">UI ⋅ UX ⋅ frontend</h2>
            </BounceInWhenVisible>}
        </div>
        <img src="/assets/home/71 hills-extended.gif" />
    </div>;
};
