'use client';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.about-title-reveal', {
        yPercent: 110,
        duration: 0.6,
        ease: 'power4.out',
      })
        .from(
          '.about-img-reveal',
          {
            scale: 1.1,
            clipPath: 'inset(0% 100% 0% 0%)',
            duration: 1,
            ease: 'power4.out',
          },
          '<'
        )
        .from(
          ['.about-text-reveal', '.about-stat-reveal'],
          {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power4.out',
          },
          '-=0.7'
        );
    },
    { scope: aboutSectionRef }
  );

  return (
    <section ref={aboutSectionRef} className="about-section py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 md:grid-cols-12 lg:gap-24 lg:px-8">
        {/* Image Column */}
        <div className="md:col-span-5">
          <div className="about-img-reveal relative aspect-[4/5] w-full max-w-sm rounded-lg border border-gray-200 p-2">
            <div className="relative h-full w-full">
              <Image
                src="/aboutUs-img-1.jpg"
                alt="A picture of a lily cake"
                fill
                sizes="(max-width: 768px) 90vw, 35vw"
                className="rounded-md object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text Column */}
        <div className="flex flex-col justify-center md:col-span-7">
          <div className="overflow-hidden pb-4">
            <h2 className="about-title-reveal text-3xl font-semibold text-gray-900">
              Our story
            </h2>
          </div>
          <p className="about-text-reveal text-base leading-relaxed text-gray-700">
            Born in a cozy home kitchen, Lily&#39;s cakes began as a hobby and
            quickly became a way to make life&#39;s celebrations sweeter. Every
            order is handcrafted with care and made to reflect the moment from
            weddings to birthdays all baked with a personal, homemade touch.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-12">
            <div className="about-stat-reveal">
              <span className="text-4xl font-bold text-gray-900">100+</span>
              <p className="mt-1 text-sm text-gray-500">Orders Delivered</p>
            </div>
            <div className="about-stat-reveal">
              <span className="text-4xl font-bold text-gray-900">6+</span>
              <p className="mt-1 text-sm text-gray-500">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
