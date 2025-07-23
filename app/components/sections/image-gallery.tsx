'use client';

import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The component's data is now more descriptive for easier maintenance.
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

  useGSAP(
    () => {
      const imageCells = gsap.utils.toArray<HTMLDivElement>('.image-cell');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2000', // A longer scroll distance for a more graceful animation.
          pin: true,
          scrub: 1, // Smoothly links the animation progress to the scrollbar.
        },
      });

      // --- TIMELINE START ---

      // 1. Move all images to the center of the container.
      // This happens at the very beginning of the timeline (position `0`).
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
          timeline.to(cell, { x, y, scale: 1.2, ease: 'power2.inOut' }, 0);
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

      // 2. Change the background color.
      // This also starts at the beginning of the timeline (position `0`).
      timeline.to(
        containerRef.current,
        { backgroundColor: '#3b3b3b', ease: 'power2.inOut' },
        0
      );

      // 3. Create a label to mark the point where the button should appear.
      // This label is placed halfway through the total duration of the image animations.
      timeline.addLabel('buttonFadeIn', 0.5);

      // 4. Fade in the button.
      // The animation starts at the "buttonFadeIn" label we just created.
      timeline.to(
        '.gallery-button',
        { opacity: 1, ease: 'power2.inOut' },
        'buttonFadeIn'
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden p-4">
      <div className="mx-auto grid max-w-6xl grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-[repeat(13,minmax(0,1fr))]">
        {imageData.map((image, index) => (
          <div key={index} className={`flex h-96 ${image.cellClasses}`}>
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
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="gallery-button z-10 text-6xl font-bold text-white rounded-md p-4 opacity-0">
          Customise your cake
        </span>
      </div>
    </section>
  );
}
