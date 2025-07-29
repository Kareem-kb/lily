import type { Metadata } from 'next';
import {
  Ms_Madi,
  Quattrocento,
  Manrope,
  Cairo,
  Markazi_Text,
  Noto_Kufi_Arabic,
} from 'next/font/google';
import './globals.css';

const meow_Script = Ms_Madi({
  subsets: ['latin'],
  variable: '--font-meow_Script',
  weight: ['400'],
});

const quattrocento = Quattrocento({
  subsets: ['latin'],
  variable: '--font-quattrocento',
  weight: ['700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '700'],
});

// Arabic fonts
const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['800'],
});

const markazi_Text = Markazi_Text({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['700'],
});

const noto_Kufi_Arabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['400'],
});

// Metadata for the application
export const metadata: Metadata = {
  title: 'Your Bakery',
  description: 'Your Bakery Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${meow_Script.variable} ${quattrocento.variable} ${manrope.variable} bg-light antialiased ${cairo.variable} ${markazi_Text.variable} ${noto_Kufi_Arabic.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
