'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { masterTimeline } from '@/app/lib/gsap/master-timeline';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline({ id: 'nav' });
    tl.from('.navLogo', {
      yPercent: -160, // slide in from left
      duration: 1,
      ease: 'power2.out',
    });

    // Wait for reveal to be added first, then add nav
    gsap.delayedCall(0.1, () => {
      masterTimeline.add(tl, 'heroDone-=0.3');
    });
  });

  useEffect(() => {
    let lastScroll = window.scrollY; // previous scroll pos
    const onScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll + 2) setIsScrolled(true); // scrolling down
      if (currentScroll < lastScroll - 2) setIsScrolled(false); // scrolling up
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 bg-transparent py-2 transition-transform duration-300 ease-in-out ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex h-16 justify-between">
          <div className="navLogo flex items-center">
            <Link href="/" className="flex h-full items-center drop-shadow-2xl">
              <Image
                alt="Bakery Logo"
                src="/lily-logo-revel.png"
                className="h-full rounded-lg md:w-[140px]"
                width={120}
                height={100}
                priority
              />
            </Link>
          </div>
          {/* <div className="navItems flex items-center gap-3">
            <Link href="/">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H11M3 12H14M14 12L11 15M14 12L11 9"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/">
              {' '}
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                width="25px"
                height="25px"
                viewBox="0 0 902.86 902.86"
              >
                <g>
                  <g>
                    <path
                      d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                    />
                    <path
                      d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                    />
                  </g>
                </g>
              </svg>{' '}
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
