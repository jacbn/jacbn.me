import classNames from 'classnames';
import React from 'react';

export const Title = ({full}: {full?: boolean}) => {
    return <div className={classNames("title-wrapper", {"full": full})}>
        <div className="position-absolute w-100 h-100">
            <h1>jaycie</h1>
            {full && <h2 className="mt-8">UI ⋅ UX ⋅ frontend</h2>}
        </div>
        <img src="/assets/home/71 hills-extended.gif" />
    </div>;
};
