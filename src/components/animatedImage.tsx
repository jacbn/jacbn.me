import React from 'react';

export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
    srcAnimated?: string;
    animated?: boolean;
}

export const Image = (props : ImageProps) => {
    const {src, srcAnimated, animated, ...rest} = props;

    return <img src={animated ? srcAnimated : src} {...rest}/>;
};
