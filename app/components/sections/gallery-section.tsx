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
    alt: 'Gallery image 1',
    cellClasses: 'items-start md:col-span-2',
  },
  {
    src: '/gallary/insta-2.jpg',
    alt: 'Gallery image 2',
    cellClasses: 'items-end md:col-span-2',
  },
  {
    src: '/gallary/insta-3.jpg',
    alt: 'Gallery image 3',
    cellClasses: 'items-start md:col-span-3 md:justify-end',
    imageClasses: 'md:w-2/3',
  },
  {
    src: '/gallary/insta-4.jpg',
    alt: 'Gallery image 4',
    cellClasses: 'items-start md:col-span-2',
  },
  {
    src: '/gallary/insta-5.jpg',
    alt: 'Gallery image 5',
    cellClasses: 'items-end md:col-span-2',
  },
  {
    src: '/gallary/insta-6.jpg',
    alt: 'Gallery image 6',
    cellClasses: 'items-start md:col-span-2',
  },
  {
    src: '/gallary/insta-7.jpg',
    alt: 'Gallery image 7',
    cellClasses: 'items-start md:col-span-2',
  },
  {
    src: '/gallary/insta-8.jpg',
    alt: 'Gallery image 8',
    cellClasses: 'items-end md:col-span-2',
  },
  {
    src: '/gallary/insta-9.jpg',
    alt: 'Gallery image 9',
    cellClasses: 'items-end md:col-span-2',
  },
  {
    src: '/gallary/insta-10.jpg',
    alt: 'Gallery image 10',
    cellClasses: 'items-start md:col-span-3 md:justify-end',
    imageClasses: 'md:w-2/3',
  },
  {
    src: '/gallary/insta-11.jpg',
    alt: 'Gallery image 11',
    cellClasses: 'items-end md:col-span-2',
  },
  {
    src: '/gallary/insta-12.jpg',
    alt: 'Gallery image 12',
    cellClasses: 'items-end md:col-span-2',
  },
];

export default function ImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

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
        <div className="mb-24 flex items-center gap-1">
          <h2 className="section-title">OUR CUSTOM CREATIONS </h2>
        </div>
      </div>
      <div
        ref={containerRef}
        className="sticky top-0 grid h-[100dvh] w-full grid-cols-4 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 md:grid-cols-[repeat(13,minmax(0,1fr))] lg:px-8"
      >
        {imageData.map((image, index) => (
          <div key={index} className={`flex h-full ${image.cellClasses}`}>
            <div
              className={`image-cell relative ${
                image.imageClasses || 'w-full'
              } aspect-[4/6]`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 15vw, (min-width: 640px) 30vw, 50vw"
                className="rounded-md object-cover"
              />
              {/* This overlay is only rendered for the last image. */}
              {index === imageData.length - 1 && (
                <div className="image-overlay absolute inset-0 bg-transparent" />
              )}
            </div>
          </div>
        ))}
        <span
          className="gallery-text absolute inset-0 z-10 flex h-full w-full items-center justify-center text-center text-7xl font-thin text-white opacity-0"
          style={{ fontFamily: 'var(--font-meow_Script), cursive' }}
        >
          A unique work of art <br /> just for you
        </span>
      </div>
    </section>
  );
}
