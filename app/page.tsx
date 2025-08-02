'use client';
import HeroSection from './components/sections/hero-section';
import AboutSection from './components/sections/about-section';
import Navbar from './components/layouts/nav-bar';
import CakeFormSection from './components/sections/form-section';
import HomeReveal from './lib/gsap/home-reveal';
import Footer from './components/layouts/footer';
import { masterTimeline } from './lib/gsap/master-timeline';
import { useGSAP } from '@gsap/react';
import GallerySection from './components/sections/gallery-section';

export default function Home() {
  useGSAP(() => {
    masterTimeline.play(0);
  }, []);

  return (
    <main>
      <Navbar />
      {/* Hero Section */}
      <section className="panel">
        <HomeReveal />
        <HeroSection />
      </section>

      {/* All Other Sections Combined */}
      <section className="panel bg-white">
        <AboutSection />
        <GallerySection />
        <CakeFormSection />
        <Footer />
      </section>
    </main>
  );
}
