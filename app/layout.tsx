import type { Metadata } from 'next';
import {
  Bodoni_Moda,
  Quattrocento,
  Manrope,
  Cairo,
  Markazi_Text,
  Noto_Kufi_Arabic,
} from 'next/font/google';
import './globals.css';

const meow_Script = Bodoni_Moda({
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
  variable: '--font-markazi_Text',
  weight: ['700'],
});

const noto_Kufi_Arabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto_Kufi_Arabic',
  weight: ['400'],
});

// Metadata for the application
export const metadata: Metadata = {
  title: {
    template: '%s | Lily - Artisan Bakery & Cafe',
    default: 'Lily - Artisan Bakery & Cafe',
  },
  description:
    'Discover the finest artisan baked goods at Lily. From custom cakes to fresh pastries, we offer a delightful experience for every occasion. Visit our cafe today!',
  keywords: [
    'bakery',
    'cafe',
    'artisan bread',
    'custom cakes',
    'pastries',
    'gourmet coffee',
    'Lily bakery',
  ],
  openGraph: {
    title: 'Lily - Artisan Bakery & Cafe',
    description: 'Freshly baked goods and gourmet coffee in a cozy atmosphere.',
    url: 'https://lilycake.appwrite.network/', // To be replaced by the user
    siteName: 'Lily',
    images: [
      {
        url: '/og-image.jpg', // Should be created
        width: 1200,
        height: 630,
        alt: 'A selection of artisan pastries and bread from Lily Bakery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lily - Artisan Bakery & Cafe',
    description:
      'Experience the best artisan bakery and cafe in town. #LilyBakery',
    images: ['/twitter-image.jpg'], // Should be created
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon1.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${meow_Script.variable} ${quattrocento.variable} ${manrope.variable} bg-light antialiased ${cairo.variable} ${markazi_Text.variable} ${noto_Kufi_Arabic.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
