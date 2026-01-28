import React from 'react';
import { Link } from 'react-router';

export function ReturnToParentPage({isParent}: {isParent?: boolean}) {
    // This component may be managed by the parent page you wish to return to; if so, use isParent.
    return <Link className="return-to-parent d-print-none" to={isParent ? "./" : "../"}>
        <span className="material-icons-outlined">arrow_back</span>
    </Link>;
}
