'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import { masterTimeline } from '@/app/lib/gsap/animations/master-timeline';

gsap.registerPlugin(SplitText);

export default function Hero() {
  useGSAP(() => {
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
        duration: 1,
        ease: 'power4.out',
        yPercent: 75,
        onComplete: () => {
          gsap.to('.hero-btn', {
            borderRadius: '0.75rem',
          });
        },
      },
      '<'
    ).addLabel('heroDone');

    masterTimeline.add(tl, '-=0.5');
  });

  return (
    <div className="bg-bakery-background h-screen hero-section">
      <div className="mx-auto flex h-full w-full flex-col md:flex-row">
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
            From dream weddings to unforgettable birthdays, we create
            personalized cakes that taste as incredible.
          </p>
          <div className="mt-4 overflow-hidden">
            <button className="bg-bakery-primary hero-btn">
              <span className="text-bakery-background">Order Yours </span>
            </button>
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
