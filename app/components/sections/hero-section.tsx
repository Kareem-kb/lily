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

    // Create both splits upfront
    const titleSplit = SplitText.create('.hero-title', {
      type: 'lines',
      linesClass: 'block overflow-hidden',
      mask: 'lines',
    });

    const subtitleSplit = SplitText.create('.hero-subtitle', {
      type: 'lines',
      linesClass: 'block overflow-hidden',
      mask: 'lines',
    });

    tl.fromTo(
      '.heroImage',
      { yPercent: 5 },
      { yPercent: 0, duration: 0.8, ease: 'power1.out' }
    );

    tl.call(
      () => {
        slideWords('.slide-words');
      },
      [],
      '<'
    );
    tl.from(
      titleSplit.lines,
      { yPercent: 60, opacity: 0, duration: 1, ease: 'power4.out' },
      '<'
    );
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
      { yPercent: 75, duration: 1, ease: 'power4.out' },
      '<'
    );
    tl.addLabel('heroDone');

    masterTimeline.add(tl, 'revealDone-=0.9');
  });

  return (
    <div className="hero-section h-screen">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-4 sm:flex-row sm:px-6">
        <div className="flex flex-col justify-center gap-2 text-[90%] sm:basis-1/2 sm:text-base">
          <h1 className="hero-title heading-section">
            <span className="block sm:inline">Cakes That Make</span>
            <span className="block sm:inline">
              Moments Unforgettable&nbsp;
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
            <button
              className="btn-p hero-btn"
              onClick={() => {
                const formSection = document.querySelector('.form-section');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Order Yours
            </button>
          </div>
        </div>

        {/* ── image column ───────────────────────────── */}
        <div className="h:fit flex sm:h-full sm:basis-1/2">
          <div className="relative h-[70vw] w-full sm:h-full">
            <Image
              src="/lily-cake-img-1-2.jpg"
              alt="Hero cake"
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 768px) 80vw, 40vw"
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
