import React from 'react';
import {useEffect, useState} from 'react';
import './main.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jacob Brown',
  description: 'Welcome to my website!',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return render ? (
    <html lang="en">
      <body>{children}</body>
    </html>
  ) : null;
}
