import React from 'react';
import classNames from 'classnames';

export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
    srcAnimated?: string;
    animated?: boolean;
}

export const Image = (props : ImageProps) => {
    const {src, srcAnimated, animated, ...rest} = props;

    return <img {...rest} src={animated ? srcAnimated : src} className={classNames("img-fluid", rest.className)}/>;
};
