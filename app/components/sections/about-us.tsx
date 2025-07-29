'use client';
import gsap from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { splitText } from '@/app/lib/gsap/split-text';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      // Split the text and animate it
      splitText('.about-text').then((split) => {
        // Animate words in sequence
        tl.from(split.lines, {
          opacity: 0,
          yPercent: 100,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
        });
      });
    },
    { scope: aboutSectionRef }
  );

  return (
    <section ref={aboutSectionRef} className="about-section h-[70vh] py-20">
      <div className="mx-auto grid h-full w-full max-w-6xl">
        <div className="ml-10 flex items-center gap-1">
          <span className="text-bakery-gray text-lg font-bold">—</span>
          <h2 className="section-title">OUR STORY </h2>
        </div>
        <div className="flex w-full justify-center">
          <p className="about-text text-p">
            What began as a passion in a cozy home kitchen has blossomed, with
            over six years of experience, into a celebrated art form. We have
            since had the privilege of sweetening more than 100 unique
            celebrations, meticulously handcrafting each cake to serve as a
            beautiful and personal centerpiece for life’s most cherished
            moments, from grand weddings to intimate milestones.
          </p>
        </div>
      </div>
    </section>
  );
}
