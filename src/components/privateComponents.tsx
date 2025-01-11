import React from "react";
import { Suspense } from "react";

const privateComponent = (f : string) => {
    // @ts-expect-error we are not using the default export for these components
    const Component = React.lazy(() => import("./private").then(m => ({default: m[f]})));

    const isPrivate = import.meta.env.VITE_PRIVATE_ENABLED ?? false;

    return <Suspense fallback={null}>
        {isPrivate && <Component/>}
    </Suspense>;
};

export const MobileContact = () => privateComponent("MobileContact");

export const References = () => privateComponent("References");
