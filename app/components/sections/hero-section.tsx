'use client';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import { masterTimeline } from '@/app/lib/gsap/master-timeline';
import { slideWords, createSplitText } from '@/app/lib/gsap/split-text';

gsap.registerPlugin(SplitText, ScrollToPlugin);

export default function Hero() {
  const handleOrderClick = () => {
    gsap.to(window, {
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTo: { y: '.form-section', offsetY: 0 },
    });
  };

  useGSAP(() => {
    const initAnimations = async () => {
      const tl = gsap.timeline({ id: 'hero' });

      tl.fromTo(
        '.heroImage',
        { yPercent: 5 },
        { yPercent: 0, duration: 0.8, ease: 'power1.out' }
      );

      // Wait for fonts before initializing SplitText animations
      await slideWords('.slide-words');

      const split = await createSplitText('.hero-title', {
        type: 'lines',
        linesClass: 'block overflow-hidden',
        mask: 'lines',
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

      const subtitleSplit = await createSplitText('.hero-subtitle', {
        type: 'lines',
        linesClass: 'block overflow-hidden',
        mask: 'lines',
      });

      tl.from(
        subtitleSplit.lines,
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '<0.1'
      );

      tl.from(
        '.hero-btn',
        {
          duration: 1,
          ease: 'power4.out',
          yPercent: 75,
        },
        '<'
      ).addLabel('heroDone');

      masterTimeline.add(tl, 'revealDone-=0.9');
    };

    initAnimations();
  });

  return (
    <div className="hero-section h-screen">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="flex basis-1/2 flex-col justify-center gap-2">
          <h1 className="hero-title heading-section">
            Cakes That Make Moments&nbsp;
            <span className="whitespace-nowrap">
              Unforgettable&nbsp;
              <span className="inline-block h-[1.04em] w-fit overflow-hidden align-baseline">
                <span className="text-bakery-primary slide-words">
                  Memories
                  <br />
                  Milestones
                  <br />
                  Celebrations <br />
                  Memories
                </span>
              </span>
            </span>
          </h1>
          <p className="hero-subtitle text-p">
            From dream weddings to unforgettable birthdays, we create
            personalized cakes that taste as incredible.
          </p>
          <div className="mt-4 overflow-hidden">
            <button className="btn-p hero-btn" onClick={handleOrderClick}>
              Order Yours
            </button>
          </div>
        </div>

        {/* ── image column ───────────────────────────── */}
        <div className="flex h-full basis-1/2">
          <div className="relative h-full w-full">
            <Image
              src="/lily-hero-img.jpg"
              alt="Hero cake"
              fill
              sizes="(max-width: 768px) 80vw, 40vw"
              priority
              quality={90}
              className="heroImage z-0 object-contain object-[right_bottom]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
