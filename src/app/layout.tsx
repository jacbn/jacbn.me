import React from 'react';
import './main.css';
// import '../styles/main.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jacob Brown',
  description: 'Welcome to my website!',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
