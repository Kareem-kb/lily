'use client';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
export default function AboutUs() {
  gsap.registerPlugin(SplitText, DrawSVGPlugin);

  useGSAP(() => {
    // Split and animate subtitle (starts after title animation)
    SplitText.create('.about-text', {
      type: 'lines,words',
      linesClass: 'hero-subtitle-line',
      mask: 'words',
      onSplit(self) {
        const tween = gsap.from(self.lines, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power2.out',
        });
        // Start after title animation (e.g., after 1.5s)
        return tween;
      },
    });


  });
  return (
    <section className="Sabout border-2 border-red-300">
      <div className="flex h-full flex-row">
        <div className="w-1/2">
          <div>
         
          </div>
        </div>
        <div className="flex w-1/2 flex-col justify-center">
          <h1 className="text-4xl font-bold">Our story</h1>
          <p className="about-text text-lg">
            Six years ago, our founder started Lily Cake from her own kitchen
            table, driven by a simple belief: every celebration deserves a cake
            that&apos;s made with the same love you&apos;d give your own family.
            What began as weekend baking for friends and neighbors has blossomed
            into something magical. We&apos;ve been there for first birthdays
            where tiny hands smash into frosting, golden anniversaries where
            couples cut their cake with the same knife from 50 years ago, and
            graduation parties where proud parents beam with joy. hands smash
            into frosting, golden anniversaries where couples cut their cake
            with the same knife from 50 years ago, and graduation parties where
            proud parents beam with joy.
          </p>
        </div>
      </div>
    </section>
  );
}
