import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'QUBIQ - Maktab Boshqaruv Tizimi',
  description: 'Maktablarni boshqarish platformasi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="bg-[#F8FAFC] text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
