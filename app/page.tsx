'use client';
import Hero from './components/sections/hero';
import AboutUs from './components/sections/about-us';
import Navbar from './components/navbar/navbar';
import ItemsList from './components/sections/items-list';
import HomeReveal from './lib/gsap/home-reveal';
// import ProcessList from './components/sections/process-list';
import Footer from './components/sections/footer';
import { masterTimeline } from './lib/gsap/master-timeline';
import { useGSAP } from '@gsap/react';
import ImageGallery from './components/sections/image-gallery';
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
        <Hero />
      </section>

      {/* All Other Sections Combined */}
      <section className="panel bg-white">
        <AboutUs />
        {/* <ProcessList /> */}
        <ImageGallery />
        <ItemsList />
        <Footer />
      </section>
    </main>
  );
}
