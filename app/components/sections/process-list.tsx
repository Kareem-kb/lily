'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const descriptionsRef = useRef<HTMLUListElement>(null);

  const theList = [
    { step: '01', description: 'Choose your cake', icon: '/Cake-Icons.svg' },
    { step: '02', description: 'Pick your date', icon: '/Calendar-Icon.svg' },
    {
      step: '03',
      description: 'Book & pay deposit',
      icon: '/Deposit-Icon.svg',
    },
    {
      step: '04',
      description: 'Get a confirmation e-mail',
      icon: '/Email-Icon.svg',
    },
    {
      step: '05',
      description: 'Wait for your delivery',
      icon: '/Delivery-Icon.svg',
    },
  ];

  useGSAP(() => {
    const box = containerRef.current; // the pinned viewport
    const column = descriptionsRef.current; // the <ul> we’ll slide
    if (!box || !column) return;

    const steps = theList.length - 1; // e.g. 4 when you have 5 items
    const setY = gsap.quickSetter(column, 'yPercent'); // 0-allocation setter

    ScrollTrigger.create({
      trigger: box,
      start: 'top top',
      end: `+=${steps * 100}`, // 100 px per step
      pin: true,
      scrub: 1,
      snap: 1 / steps, // 0 → 0.25 → 0.5 → …
      onUpdate: (self) => setY(-self.progress * steps * 100),
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="process-list min-h-screen bg-white py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-lift mb-16">
          <h2 className="inline-flex flex-col">
            How it works
            <svg viewBox="0 0 100 2" className="w-fit">
              <line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </h2>
        </div>

        <div className="mx-auto flex flex-col justify-center gap-12 md:flex-row lg:gap-16">
          {/* Icons Section */}
          <div className="relative h-[400px] flex-1/2 overflow-hidden lg:h-[500px]">
            {' '}
            {/* Match item heights */}
            <div ref={iconsRef} className="flex flex-col">
              {theList.map((item) => (
                <div
                  key={item.step}
                  className="relative flex h-[400px] w-full justify-center lg:h-[500px]"
                >
                  <div className="relative aspect-square w-full max-w-sm">
                    <Image
                      src={item.icon}
                      alt={item.description}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 40vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Descriptions Section */}
          <div className="flex flex-1/2 items-center justify-center">
            <div /* 100 px = viewport for one line */
              ref={containerRef}
              className="relative h-[100px] overflow-hidden"
            >
              <ul /* holds the stack we’ll slide upward */
                ref={descriptionsRef}
                className="flex flex-col" /* natural flow, no absolute tricks */
              >
                {theList.map((item) => (
                  <li key={item.step} className="flex h-[100px] flex-col">
                    <span className="text-bakery-primary">{item.step}</span>
                    <h2>{item.description}</h2>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
