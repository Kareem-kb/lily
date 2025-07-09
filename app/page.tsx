'use client';
import Hero from './components/sections/hero';
import AboutUs from './components/sections/about-us';
import Navbar from './components/navbar/navbar';
// import ItemsList from './components/sections/items-list';
import HomeReveal from './lib/gsap/animations/home-reveal';
import ProcessList from './components/sections/process-list';
import Footer from './components/sections/footer';
import { masterTimeline } from './lib/gsap/animations/master-timeline';
import { useGSAP } from '@gsap/react';
import masterScroll from './lib/gsap/animations/master-scroll';
export default function Home() {
  useGSAP(() => {
    masterScroll();
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
      <section className="panel">
        <AboutUs />
        <ProcessList />
        {/* <ItemsList /> */}
        <Footer />
      </section>
    </main>
  );
}
