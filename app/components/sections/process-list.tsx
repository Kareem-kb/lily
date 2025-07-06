'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function ProcessList() {
  const theList = [
    { step: '1', description: 'Choose your cake', icon: '/Cake-Icons.svg' },
    { step: '2', description: 'Pick your date', icon: '/Calendar-Icon.svg' },
    { step: '3', description: 'Book & pay deposit', icon: '/Deposit-Icon.svg' },
    {
      step: '4',
      description: 'Get a confirmation e-mail',
      icon: '/Email-Icon.svg',
    },
    {
      step: '5',
      description: 'Wait for your delivery',
      icon: '/Delivery-Icon.svg',
    },
  ];

  useGSAP(() => {
    // Example: animate each step in as it enters viewport
    gsap.utils.toArray('.process-step').forEach((el, i) => {
      gsap.fromTo(
        el as HTMLElement,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el as HTMLElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    gsap.to('.about-section', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.process-list',
        start: 'top 80%',
        end: 'top center',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
      ease: 'power1.out',
    });
  }, []);

  return (
    <div className="process-list flex items-center justify-center py-10 bg-white">
      <div className="flex w-full max-w-6xl flex-col gap-8 md:flex-row">
        {/* Left: SVG Path + Icons */}
        <div className="relative flex min-h-[32rem] flex-1 items-center justify-center">
          <svg
            viewBox="0 -1 270 360"
            className="h-[28rem] w-72 md:h-[32rem] md:w-96 lg:h-[36rem] lg:w-[28rem]"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M0,1.08C5.49.37,11.09,0,16.77,0h106.64c71.83,0,130.59,58.77,130.59,130.59v72.73c0,71.83-58.77,130.59-130.59,130.59H16.77c-5.05,0-10.04-.29-14.94-.86"
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          {/* Step Icons, positioned along the path */}
          {theList.map((item, index) => (
            <div
              key={item.step}
              className={`absolute left-1/2 -translate-x-1/2`}
              style={{
                top: `${10 + index * 60}px`, // adjust spacing as needed
                zIndex: 10,
              }}
            >
              <Image
                className="process-step rounded-full shadow-lg"
                src={item.icon}
                alt={item.description}
                width={64}
                height={64}
              />
            </div>
          ))}
        </div>

        {/* Right: Steps List */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <h2 className="text-bakery-primary flex items-center gap-2 text-2xl font-bold">
            How it works
            <svg viewBox="0 0 100 2" className="aboutSVG h-2 w-24">
              <line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </h2>
          <ol className="w-full max-w-md space-y-6">
            {theList.map((item) => (
              <li key={item.step} className="flex items-center gap-4">
                <span className="text-bakery-primary text-lg font-bold">
                  {item.step}.
                </span>
                <span className="process-step text-lg text-gray-700">
                  {item.description}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
