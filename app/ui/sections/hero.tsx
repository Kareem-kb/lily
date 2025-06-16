'use client';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { DomReady } from '@/app/helperFn/domReady';

gsap.registerPlugin(SplitText, DrawSVGPlugin);

export default function Hero() {
  useGSAP(() => {
    DomReady.then(() => {
      const tl = gsap.timeline();

      // Log0 animatiin
      tl.fromTo(
        '.hero-logo',
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
        }
      );

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
              duration: 1,
              ease: 'power2.out',
              delay: i * 0.2, // Each line starts after the previous
            });
          });
        },
      });

      SplitText.create('.hero-subtitle', {
        type: 'lines',
        mask: 'lines',
        onSplit(self) {
          const tween = gsap.from(self.lines, {
            yPercent: 80,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'sine.out',
          });
          // Start after title animation (e.g., after 1.5s)
          tl.add(tween);
          return tween;
        },
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
    <section className="h-screen w-full overflow-hidden">
      {/* Background Images */}
      <div className='fixed inset-0 -z-0'>
        <Image
          alt="Bakery Hero Image"
          src="/desktop-hero.jpg"
          fill
          className="hidden object-cover md:block"
          priority
          quality={90}
          sizes="100vw"
        />
        <Image
          alt="Bakery Hero Image"
          src="/mobile-hero.jpg"
          fill
          className="object-cover md:hidden"
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, 0vw"
        />
      </div>
      {/* Content Container */}
      <div className="relative mx-auto flex h-full max-w-xl flex-col justify-center">
        <div className="absolute top-16 left-0 flex flex-col justify-center gap-4 p-6 md:top-24">
          <Image
            alt="Bakery Logo"
            src="/lily-logo.png"
            className="hero-logo"
            width={200}
            height={200}
            priority
          />
          <div className="w-fit">
            <h1 className="hero-title text-bakery-primary">
              Let us be part of your celebration
            </h1>
          </div>
          <p className="hero-subtitle">
            From superhero birthdays to elegant weddings, we make cakes that
            tell your story.
          </p>
          <div>
            <button className="hero-btn bg-bakery-primary w-0 overflow-hidden whitespace-nowrap opacity-0">
              <span className="hero-btn-text inline-block -translate-y-10">
                Order Now
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
