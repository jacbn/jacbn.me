import classNames from 'classnames';
import React from 'react';
import { BounceInWhenVisible } from './animation/BounceInWhenVisible';

export const Title = ({full}: {full?: boolean}) => {
    return <div className={classNames("title-wrapper", {"full": full})}>
        <div className="position-absolute w-100 h-100">
            <BounceInWhenVisible>
                <h1 className="text-shadow-dark">jaycie</h1>
            </BounceInWhenVisible>
            {full && <BounceInWhenVisible delay={0.2}>
                <h2 className="text-shadow-dark shadow-offset-md mt-8">UI ⋅ UX ⋅ frontend</h2>
            </BounceInWhenVisible>}
        </div>
        <img src="/assets/home/71 hills-extended.gif" />
    </div>;
};
