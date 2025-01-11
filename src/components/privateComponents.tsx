import React from "react";
import { Suspense } from "react";

const privateComponent = (f : string) => {
    const isPrivate = import.meta.env.VITE_PRIVATE_ENABLED ?? false;
    if (!isPrivate) return null;

    const Component = React.lazy(() => import.meta.env.VITE_PRIVATE_COMPONENT && import(import.meta.env.VITE_PRIVATE_COMPONENT).then(m => ({default: m[f]})));

    return <Suspense fallback={null}>
        <Component/>
    </Suspense>;
};

export const MobileContact = () => privateComponent("MobileContact");

export const References = () => privateComponent("References");
