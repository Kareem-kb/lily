'use client';
import Image from 'next/image';
import gsap from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { splitText } from '@/app/lib/gsap/split-text';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);

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
    <section
      ref={aboutSectionRef}
      className="about-section mx-auto min-h-[50vh] max-w-6xl py-10 sm:my-[18vh] sm:h-[60vh] sm:pb-0"
    >
      <div className="mx-auto grid min-h-full w-full items-center gap-6">
        <h2 className="section-title h-fit self-end">OUR STORY</h2>
        <div className="grid h-fit w-full grid-cols-1 place-items-center gap-8 md:grid-cols-[1.5fr_1fr]">
          <p className="about-text text-p" ref={aboutTextRef}>
            What began as a passion in a cozy home kitchen has blossomed, with
            over six years of experience, into a celebrated art form. We have
            since had the privilege of sweetening more than 100 unique
            celebrations, meticulously handcrafting each cake to serve as a
            beautiful and personal centerpiece for life&apos;s most cherished
            moments, from grand weddings to intimate milestones.
          </p>
          <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 sm:w-96">
            <Image
              src="/about-us.jpg"
              alt="A glimpse into the cozy, passionate kitchen of Lily Bakery where our story began."
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
