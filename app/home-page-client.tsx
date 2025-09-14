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

export default function HomePageClient() {
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

      {/* About Section */}
      <section className="panel bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <AboutSection />
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Form Section */}
      <CakeFormSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
