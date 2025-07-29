'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import { masterTimeline } from '@/app/lib/gsap/master-timeline';
import { slideWords } from '@/app/lib/gsap/split-text';

gsap.registerPlugin(SplitText);

export default function Hero() {
  useGSAP(() => {
    const tl = gsap.timeline({ id: 'hero' });

    tl.fromTo(
      '.heroImage',
      { yPercent: 5 },
      { yPercent: 0, duration: 0.8, ease: 'power1.out' }
    );

    slideWords('.slide-words');

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
        duration: 1,
        ease: 'power4.out',
        yPercent: 75,
      },
      '<'
    ).addLabel('heroDone');

    masterTimeline.add(tl, '-=0.5');
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
            <button className="btn-p hero-btn">Order Yours</button>
          </div>
        </div>

        {/* ── image column ───────────────────────────── */}
        <div className="flex h-full basis-1/2">
          <div className="relative h-full w-full">
            <Image
              src="/lily-cake-img-1-2.jpg"
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
