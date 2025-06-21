'use client';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { DomReady } from '@/app/helperFn/domReady';
import { BestGraph } from '@/app/assits/bestSVG';

gsap.registerPlugin(SplitText, DrawSVGPlugin);

export default function Hero() {
  useGSAP(() => {
    DomReady.then(() => {
      const tl = gsap.timeline();

      // Hero text animation
      SplitText.create('.hero-title', {
        type: 'lines',
        mask: 'lines',
        onSplit(self) {
          // For each line, split into words and animate
          self.lines.forEach((line, i) => {
            const splitWords = SplitText.create(line, { type: 'words' });
            gsap.from(splitWords.words, {
              opacity: 0,
              yPercent: 60,
              stagger: 0.08, // Words animate in order
              duration: 0.8,
              ease: 'power2.out',
              delay: i * 0.2, // Each line starts after the previous
            });
          });
        },
      });

      tl.to('.img-hero-1', {
        xPercent: -30, // slide left
        yPercent: -10, // rise up
        rotate: -10, // slight counter-clockwise tilt
        duration: 1,
        ease: 'power2.out',
      })
        .to(
          '.img-hero-2',
          {
            // move right card[10]
            xPercent: 45, // slide right
            yPercent: -30, // rise up same height
            rotate: 10, // slight clockwise tilt
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          '.img-hero-3',
          {
            // move right card[10]
            xPercent: 60, // slide right
            yPercent: 40, // rise up same height
            rotate: 10, // slight clockwise tilt
            duration: 1,
            ease: 'power2.out',
          },
          '<'
        );

      SplitText.create('.hero-subtitle', {
        type: 'lines',
        mask: 'lines',
        onSplit(self) {
          const tween = gsap.from(self.lines, {
            yPercent: 80,
            opacity: 0,
            stagger: 0.2,
            duration: 0.7,
            ease: 'sine.out',
          });
          // Start after title animation (e.g., after 1.5s)
          tl.add(tween);
          return tween;
        },
      });

      tl.from('.my-path', {
        drawSVG: 0,
        duration: 1.4,
        stagger: 0.4,
        ease: 'sine.inOut',
      });

      // Animate button
      tl.to('.hero-btn', {
        opacity: 1,
        width: 'auto',
        duration: 0.5,
        ease: 'power2.out',
      });
      tl.to('.hero-btn-text', { y: 0, opacity: 1 }, '+=0.1');
    });
  }, []);

  return (
    <section className="flex h-screen w-full flex-col-reverse justify-around p-6 md:flex-row md:p-8">
      {/* Left Column - Text Content */}
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="flex max-w-xl flex-col gap-3 lg:gap-6">
          <div>
            <h1 className="hero-title text-bakery-primary">
              Let us be part of your celebration
            </h1>
          </div>
          <p className="hero-subtitle">
            From superhero birthdays to elegant weddings, we make cakes that
            tell your story.
          </p>
          <div className="mt-2">
            <button className="hero-btn bg-bakery-primary w-0 overflow-hidden whitespace-nowrap opacity-0">
              <span className="hero-btn-text inline-block -translate-y-10">
                Order Now
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Images */}
      <div className="flex min-h-[350px] w-full items-center justify-center p-6 md:w-1/2 md:p-8">
        <div className="relative top-0 -left-5 h-[50%] w-[45%]">
          <Image
            alt="Bakery Hero Image 2"
            src="/lily-hero-img-2.jpg"
            width={120}
            height={100}
            className="img-hero-2 absolute rounded-lg drop-shadow-2xl md:h-[250px] md:w-[150px] lg:h-[300px] lg:w-[200px]"
            priority
          />
          <Image
            alt="Bakery Hero Image 1"
            src="/lily-cake-test.png"
            width={120}
            height={100}
            className="img-hero-1 absolute rounded-lg drop-shadow-2xl md:h-[250px] md:w-[150px] lg:h-[300px] lg:w-[200px]"
            priority
          />
          <Image
            alt="Bakery Hero Image 3"
            src="/lily-hero-img-3.jpg"
            width={120}
            height={100}
            className="img-hero-3 absolute rounded-lg drop-shadow-2xl md:h-[250px] md:w-[150px] lg:h-[300px] lg:w-[200px]"
            priority
          />
          <svg
            id="Layer_1"
            className="absolute top-5 left-45 h-[50px] w-[40px] rotate-12 p-0 md:-top-20 md:left-2 md:h-[70px] md:w-[60px]"
            viewBox="-10 0 120 120"
          >
            <path
              fill="none"
              stroke="#c8a39e"
              strokeWidth={7}
              className="my-path"
              strokeLinecap="round"
              d="M38.47,92.29l40.54-46.02c7.68-10.19,5.64-24.68-4.55-32.36-10.25-7.73-24.85-5.62-32.49,4.72C39.56,8.02,27.08-2.68,14.85.6c-2.24.6-7.53,3.61-9.23,5.74C1.93,10.96.67,15.51.32,17.48c-.4,2.22-1.33,9.31,4.08,19.79,11.01,21.31,48.8,57.6,50.41,59.14"
            />
          </svg>
          <BestGraph className="absolute right-28 -bottom-30 h-[130px] w-[130px] -rotate-10 p-0 md:-bottom-8 md:-left-12 md:h-[150px] md:w-[150px]" />
        </div>
      </div>
    </section>
  );
}


