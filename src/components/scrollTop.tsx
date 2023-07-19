'use client';
import { useEffect } from 'react';
import React from 'react';

export default function ScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
//   return React.createElement(React.Fragment, null);
  return null;
}