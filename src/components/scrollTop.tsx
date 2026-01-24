import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollTop(props: React.HTMLAttributes<HTMLDivElement>) {
  const location = useLocation();

  useEffect(() => {
    // this seems, sometimes, to fire before rendering, preventing scroll;
    // useLayoutEffect doesn't seem to work either.
    // just using a timeout for now.
    window.scrollTo({top: 0, behavior: 'instant'});
    window.setTimeout(() => {
      if (location.hash) return; // let hash scrolling happen
      window.scrollTo({top: 0, behavior: 'instant'});
    }, 10);
  }, [location.pathname]);

  return props.children;
}
