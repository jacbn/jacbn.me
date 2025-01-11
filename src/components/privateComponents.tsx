import React from "react";
import { Suspense } from "react";

// @ts-ignore this intentionally may not exist
const isPrivate = await import("./private").then(module => module.isPrivateAccessible).catch(() => false);

const privateComponent = (f : string) => {
    // @ts-expect-error we are not using the default export for these components
    const Component = React.lazy(() => import("./private").then(m => ({default: m[f]})));
    return isPrivate 
        ? <Suspense>
            <Component/>
        </Suspense>
        : null;
};

export const MobileContact = () => privateComponent("MobileContact");

export const References = () => privateComponent("References");
