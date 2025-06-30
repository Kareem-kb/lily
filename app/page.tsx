'use client';
import NavBar from './ui/navBar';
import Hero from './ui/sections/hero';
import AboutUs from './ui/sections/aboutUs';
import ItemsList from './ui/sections/itemsList';
import HomeRevel from './assits/homeRevel';
import Proses from './ui/sections/proses';
import Footer from './ui/sections/footer';
import { useEffect, useRef } from 'react';
import { MasterTL } from './assits/masterTL';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function Home() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    ScrollSmoother.create({
      smooth: 2,
      effects: true,
    });
    MasterTL.play(0);
  }, []);
  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.panel');

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,

          onEnter: () => {
            // Set current panel to top
            gsap.set(panel, { zIndex: 0 });

            // Set all previous panels below current
            panels.forEach((p, index) => {
              if (index < i) {
                gsap.set(p, { zIndex: -1 - (i - index) });
              } else if (index > i) {
                gsap.set(p, { zIndex: 1 + (index - i) });
              }
            });
          },

          onEnterBack: () => {
            // Set current panel to top
            gsap.set(panel, { zIndex: 0 });

            // Set all panels relative to current position
            panels.forEach((p, index) => {
              if (index < i) {
                gsap.set(p, { zIndex: 1 + (i - index) });
              } else if (index > i) {
                gsap.set(p, { zIndex: -1 - (index - i) });
              }
            });
          },
        });
      });
    },
    { scope: scope }
  );
  return (
    <div className="mx-auto" ref={scope}>
      <NavBar />
      <HomeRevel />
      <Hero />
      <AboutUs />
      <Proses />
      <ItemsList />
      <Footer />
    </div>
  );
}
