import React from "react";
import { Suspense } from "react";

const privateComponent = (f : string) => {
    if (!import.meta.env.VITE_PRIVATE_COMPONENT) return null;
    if (import.meta.env.PROD) return null;

    const Component = React.lazy(() => import(/* @vite-ignore */ import.meta.env.VITE_PRIVATE_COMPONENT).then(m => ({default: m[f]})));

    return <Suspense fallback={null}>
        <Component/>
    </Suspense>;
};

export const MobileContact = () => privateComponent("MobileContact");

export const References = () => privateComponent("References");
