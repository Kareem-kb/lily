'use client';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutUs() {
  gsap.registerPlugin(SplitText, ScrollTrigger);

  useGSAP(() => {
    // Split and animate subtitle (s
    //
    gsap.from('.about-text', {
      scrollTrigger: '.about-text',
      yPercent: 100,

      ease: 'power2.out',
    });

    // SplitText.create('.about-text', {
    //   type: 'lines,words',
    //   linesClass: 'hero-subtitle-line',
    //   mask: 'words',
    //   onSplit(self) {
    //     const tween = gsap.from(self.lines, {
    //       yPercent: 100,
    //       opacity: 0,
    //       stagger: 0.15,
    //       duration: 0.7,
    //       ease: 'power2.out',
    //     });
    //     // Start after title animation (e.g., after 1.5s)
    //     return tween;
    //   },
    // });
  });
  return (
    <section className="Sabout">
      <div className="flex h-full flex-col items-center justify-center md:flex-row">
        {' '}
        {/* Added flex class */}
        <div className="flex w-full items-center justify-center p-4 md:w-1/2">
          <Image
            src="/aboutUs-img.jpg"
            alt="About Us Image"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex w-full flex-col justify-center space-y-8 p-6 md:w-1/2">
          <h2 className="w-fit border-b-2 text-2xl font-semibold">Our story</h2>
          <p className="about-text">
            Born in a cozy home kitchen, Lily&#39;s cakes began as a hobby and
            quickly became a way to make life&#39;s celebrations sweeter. Every
            order is handcrafted with care and made to reflect the moment from
            weddings to birthdays all baked with a personal, homemade touch.
          </p>
        </div>
      </div>
    </section>
  );
}
