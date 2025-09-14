import type { Metadata } from 'next';
import HomePageClient from './home-page-client';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to Lily, your favorite artisan bakery and cafe. Explore our delicious, freshly baked pastries, custom cakes, and gourmet coffee. Visit us today!',
};

export default function Home() {
  return <HomePageClient />;
}
