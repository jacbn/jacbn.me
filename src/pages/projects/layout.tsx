import React from 'react';
import ScrollTop from '@/components/scrollTop';

export default function ProjectLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <ScrollTop /> 
      {/* TODO: why is this ScrollTop needed??? shouldn't this be default behaviour? */}
      <section>{children}</section>
    </>
  );
}
