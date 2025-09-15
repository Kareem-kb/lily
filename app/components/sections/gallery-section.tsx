'use client';

import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const imageData = [
  {
    src: '/gallary/insta-1.jpg',
    alt: 'Elegant multi-tiered wedding cake with floral decorations.',
    cellClasses: 'items-start col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-2.jpg',
    alt: 'Vibrant and colorful birthday cake with custom character designs.',
    cellClasses: 'items-end col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-3.jpg',
    alt: 'A close-up of a rustic, semi-naked cake adorned with fresh berries.',
    cellClasses: 'items-start col-span-1 sm:col-span-3 sm:justify-end',
    imageClasses: 'w-full sm:w-2/3',
  },
  {
    src: '/gallary/insta-4.jpg',
    alt: 'Artisanal cupcakes with intricate frosting details.',
    cellClasses: 'items-start col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-5.jpg',
    alt: 'A modern, geometric-patterned cake for a corporate event.',
    cellClasses: 'items-end col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-6.jpg',
    alt: "A whimsical, fairytale-themed cake for a child's party.",
    cellClasses: 'items-start col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-7.jpg',
    alt: 'A selection of delicate French macarons in various flavors.',
    cellClasses: 'items-start col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-8.jpg',
    alt: 'A classic chocolate drip cake topped with gourmet chocolates.',
    cellClasses: 'items-end col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-9.jpg',
    alt: 'A beautiful baby shower cake with pastel colors and cute decorations.',
    cellClasses: 'items-end col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-10.jpg',
    alt: 'An assortment of freshly baked pastries and croissants.',
    cellClasses: 'items-start col-span-1 sm:col-span-3 sm:justify-end',
    imageClasses: 'w-full sm:w-2/3',
  },
  {
    src: '/gallary/insta-11.jpg',
    alt: 'A sophisticated cake for an anniversary, with gold leaf accents.',
    cellClasses: 'items-end col-span-1 sm:col-span-2',
  },
  {
    src: '/gallary/insta-12.jpg',
    alt: 'Custom-designed cookies for a special occasion.',
    cellClasses: 'items-end col-span-1 sm:col-span-2',
  },
];

export default function ImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const imageCells = gsap.utils.toArray<HTMLDivElement>('.image-cell');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=1000',
        pin: true,
        scrub: 1,
      },
    });

    const buildAnimation = () => {
      // Clear the timeline on every refresh to ensure it's built from a clean state
      tl.clear();

      // Batch read DOM properties to avoid layout thrashing
      const containerRect = container.getBoundingClientRect();
      const cellRects = imageCells.map((cell) => cell.getBoundingClientRect());

      // Re-add tweens with fresh values
      tl.to(
        '.fade-bg',
        {
          backgroundColor: '#303030',
          ease: 'power2.inOut',
        },
        0
      ).to(
        '.gallery-text',
        {
          opacity: 1,
          ease: 'power2.inOut',
          duration: 0.2,
        },
        '<0.1'
      );

      imageCells.forEach((cell, index) => {
        gsap.set(cell, { willChange: 'transform' });
        const cellRect = cellRects[index];
        const x =
          containerRect.width / 2 -
          (cellRect.left - containerRect.left) -
          cellRect.width / 2;
        const y =
          containerRect.height / 2 -
          (cellRect.top - containerRect.top) -
          cellRect.height / 2;

        if (index === imageCells.length - 1) {
          gsap.set(cell, { filter: 'brightness(1)' });
          tl.to(
            cell,
            {
              x,
              y,
              scale: 2,
              ease: 'power2.inOut',
              filter: 'brightness(0.75)',
            },
            0
          );
          const overlay = cell.querySelector('.image-overlay');
          if (overlay) {
            tl.to(overlay, { ease: 'power2.inOut' }, 0);
          }
        } else {
          tl.to(cell, { x, y, scale: 1.1, ease: 'power2.inOut' }, 0);
        }
      });
    };

    // Attach the build function to ScrollTrigger's refresh event
    ScrollTrigger.addEventListener('refresh', buildAnimation);

    // Run it once for the initial setup
    buildAnimation();

    // Cleanup the event listener when the component unmounts
    return () => {
      ScrollTrigger.removeEventListener('refresh', buildAnimation);
    };
  });

  const getSizesForImage = (classes: string) => {
    const mobileSpanMatch = classes.match(/col-span-(\d+)/);
    const desktopSpanMatch = classes.match(/sm:col-span-(\d+)/);

    const mobileSpan = mobileSpanMatch ? parseInt(mobileSpanMatch[1], 10) : 1;
    const desktopSpan = desktopSpanMatch
      ? parseInt(desktopSpanMatch[1], 10)
      : mobileSpan;

    const mobileSize = Math.ceil((mobileSpan / 4) * 100);
    const desktopSize = Math.ceil((desktopSpan / 13) * 100);

    return `(max-width: 639px) ${mobileSize}vw, ${desktopSize}vw`;
  };

  return (
    <section className="fade-bg overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex items-center gap-1 sm:mb-24">
          <h2 className="section-title">OUR CUSTOM CREATIONS</h2>
        </div>
      </div>
      <div
        ref={containerRef}
        className="grid min-h-screen w-full grid-cols-4 gap-2 px-2 py-6 sm:grid-cols-[repeat(13,minmax(0,1fr))] sm:gap-4 sm:px-6 lg:px-8"
      >
        {imageData.map((image, index) => (
          <div key={image.src} className={`flex h-full ${image.cellClasses}`}>
            <div
              className={`image-cell relative ${image.imageClasses || 'w-full'} aspect-[2/3]`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={getSizesForImage(image.cellClasses)}
                className="rounded-md object-cover"
              />

              {index === imageData.length - 1 && (
                <div className="image-overlay absolute inset-0 bg-transparent" />
              )}
            </div>
          </div>
        ))}

        <span
          className="gallery-text absolute inset-0 z-10 mx-2 flex h-full w-full items-center justify-center text-center text-2xl font-thin text-white opacity-0 sm:text-7xl"
          style={{ fontFamily: 'var(--font-meow_Script), cursive' }}
        >
          A unique work of art <br /> just for you
        </span>
      </div>
    </section>
  );
}
