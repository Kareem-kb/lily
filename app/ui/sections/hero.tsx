'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Image from 'next/image';

import { MasterTL } from '@/app/assits/masterTL';

gsap.registerPlugin(SplitText, DrawSVGPlugin);

export default function Hero() {
  useGSAP(() => {
    // Promise: wait until fonts / images finished => you already had DomReady
    const tl = gsap.timeline({ id: 'hero' });

    tl.fromTo(
      '.heroImage',
      { yPercent: 5 },
      { yPercent: 0, duration: 0.8, ease: 'power1.out' }
    );

    const split = SplitText.create('.hero-title', {
      type: 'lines',
      linesClass: 'block overflow-hidden', // optional clip wrapper
      mask: 'lines', // keeps the slide-in hidden
    });

    tl.from(
      split.lines,
      {
        yPercent: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '<'
    );

    SplitText.create('.hero-subtitle', {
      type: 'lines',
      linesClass: 'block overflow-hidden', // optional clip wrapper
      mask: 'lines',
      onSplit(self) {
        tl.from(
          self.lines,
          {
            yPercent: 80,
            opacity: 0,
            duration: 0.8,
            ease: 'sine.out',
          },
          '<0.1'
        );
      },
    });

    tl.from(
      '.hero-btn',
      {
        duration: 0.6,
        ease: 'power1.out',
        yPercent: 80,
        opacity: 0,
        onComplete: () => {
          gsap.to('.hero-btn', {
            borderRadius: '0.75rem',
          });
        },
      },
      '<0.1'
    ).addLabel('heroDone');

    MasterTL.add(tl, '-=0.5');
  });

  return (
    <section className="mx-auto flex h-screen w-full flex-col justify-around overflow-hidden md:flex-row">
      <div className="flex max-w-xl basis-1/2 flex-col justify-center gap-2">
        <h1 className="hero-title">
          Cakes That Make Moments Unforgettable&nbsp;
          <span className="inline-block h-[1.1em] overflow-hidden align-baseline">
            <span
              className="text-bakery-primary animate-slideWords block"
              style={{ animation: 'slideWords 20s ease-in-out infinite' }}
            >
              Memories
              <br />
              Milestones
              <br />
              Celebrations <br />
              Memories
            </span>
          </span>
        </h1>
        <p className="hero-subtitle">
          From dream weddings to unforgettable birthdays, we create personalized
          cakes that taste as incredible.
        </p>
        <div className="mt-4 overflow-hidden">
          <button className="bg-bakery-primary hero-btn">
            <span className="text-bakery-background">Order Yours </span>
          </button>
        </div>
      </div>

      {/* ── image column ───────────────────────────── */}
      <div className="flex h-full basis-1/2">
        <div
          id="heroCake"
          className="relative flex h-full w-full items-end justify-end px-4"
        >
          <Image
            src="/lily-cake-img-1-2.jpg"
            alt="Hero cake"
            width={0}
            height={0}
            sizes="(max-width: 640px) 90vw, 
             (max-width: 768px) 80vw,
             (max-width: 1024px) 45vw,
             40vw"
            className="heroImage h-auto w-[clamp(300px,90vw,450px)] rotate-1 object-contain md:w-[clamp(450px,45vw,800px)]"
            priority
            quality={90}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  );
}
