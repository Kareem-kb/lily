'use client';
import gsap from 'gsap';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  useGSAP(() => {
    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section', // One trigger for everything
        start: 'top 40%', // Start when top of section is 80% from top
        toggleActions: 'play none none reverse',
      },
    });

    // Split text setup
    const splitWords = new SplitText('.aboutTital', {
      type: 'words',
      mask: 'words',
    });
    const splitText = new SplitText('.about-text', {
      type: 'lines',
      mask: 'lines',
    });

    // Add animations to timeline (they play in sequence)
    tl.from('.aboutImg', {
      clipPath: 'inset(50% 0% 50% 0%)',
      duration: 1.2,
      ease: 'power4.out',
    })
      .from(
        '.aboutSVG',
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          duration: 0.5,
          ease: 'power4.out',
        },
        '<0.3'
      )
      .from(
        splitWords.words,
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.4,
          ease: 'power4.out',
          stagger: 0.1,
        },
        '<0.3'
      )
      .from(
        splitText.lines,
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.5,
          ease: 'power4.out',
          stagger: 0.1,
        },
        '<0.3'
      );

    gsap.to('.hero-section', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 90%',
        end: 'top 40%',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
      ease: 'power1.out',
    });
  });

  return (
    <div className="about-section bg-white pb-24">
      <div className="flex h-full flex-col items-center justify-center md:flex-row">
        <div className="flex w-full items-center justify-center overflow-hidden p-4 md:w-1/2">
          <div className="relative aspect-[5/4] h-[400px] w-full">
            {/* Added relative and height */}
            <Image
              src="/aboutUs-img.jpg"
              alt="About Us Image"
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="aboutImg rounded-lg object-cover shadow-lg"
              priority
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-center space-y-8 p-6 md:w-1/2">
          <h2 className="aboutTital w-fit">
            Our story{' '}
            <span>
              {' '}
              <svg viewBox="0 0 100 2" className="aboutSVG">
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
            </span>
          </h2>

          <p className="about-text">
            Born in a cozy home kitchen, Lily&#39;s cakes began as a hobby and
            quickly became a way to make life&#39;s celebrations sweeter. Every
            order is handcrafted with care and made to reflect the moment from
            weddings to birthdays all baked with a personal, homemade touch.
          </p>
        </div>
      </div>
    </div>
  );
}
