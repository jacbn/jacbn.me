import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollTop(props: React.HTMLAttributes<HTMLDivElement>) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <div>
    {props.children}
  </div>;
}