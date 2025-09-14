'use client';

import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useGSAP(() => {
    const imageCells = gsap.utils.toArray<HTMLDivElement>('.image-cell');
    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1000', // A longer scroll distance for a more graceful animation.
          pin: true,
          scrub: 1, // Smoothly links the animation progress to the scrollbar.
        },
      })
      .to(
        '.fade-bg',
        {
          backgroundColor: '#303030',
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        '.gallery-text',
        {
          opacity: 1,
          ease: 'power2.inOut',
          duration: 0.2,
        },
        '>-0.1'
      );

    imageCells.forEach((cell, index) => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const cellRect = cell.getBoundingClientRect();

      const x =
        containerRect.width / 2 -
        (cellRect.left - containerRect.left) -
        cellRect.width / 2;
      const y =
        containerRect.height / 2 -
        (cellRect.top - containerRect.top) -
        cellRect.height / 2;

      // Check if this is the last image to apply a special animation.
      if (index === imageCells.length - 1) {
        // Set initial filter state
        gsap.set(cell, { filter: 'brightness(1)' });

        timeline.to(
          cell,
          { x, y, scale: 2, ease: 'power2.inOut', filter: 'brightness(0.75)' },
          0
        );
        // Find the overlay and animate its background color to create the mask effect.
        const overlay = cell.querySelector('.image-overlay');
        if (overlay) {
          timeline.to(overlay, { ease: 'power2.inOut' }, 0);
        }
      } else {
        // Apply the standard animation to all other images.
        timeline.to(cell, { x, y, scale: 1.1, ease: 'power2.inOut' }, 0);
      }
    });
  });

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
