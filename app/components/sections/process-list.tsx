'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessList() {
  const containerRef = useRef<HTMLDivElement>(null);

  const theList = [
    { step: '01', description: 'Choose your desired cake' },
    { step: '02', description: 'Select a date for delivery' },
    { step: '03', description: 'Book and pay the deposit' },
    { step: '04', description: 'Receive a confirmation e-mail' },
    { step: '05', description: 'Your order is delivered' },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.process-title-3', {
        yPercent: 100,
        opacity: 0,
        duration: 0.6,
        ease: 'power4.out',
      }).from(
        '.process-item-3',
        {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power4.out',
          stagger: 0.15,
        },
        '-=0.4'
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="process-list py-32 text-gray-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-24">
          {/* Col 1: Title */}
          <div className="md:col-span-1">
            <h2 className="process-title-3 overflow-hidden text-3xl font-semibold text-gray-900">
              How it works
            </h2>
          </div>

          {/* Col 2: Steps */}
          <div className="space-y-16 md:col-span-2">
            {theList.map((item) => (
              <div
                key={item.step}
                className="process-item-3 relative border-b border-gray-200 pb-8"
              >
                <span className="absolute -top-8 -left-12 text-[6rem] font-bold text-gray-100">
                  {item.step}
                </span>
                <h3 className="relative text-xl font-medium text-gray-800">
                  {item.description}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
