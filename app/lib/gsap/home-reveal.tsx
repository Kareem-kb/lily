'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { masterTimeline } from '@/app/lib/gsap/master-timeline';
import Image from 'next/image';

export default function HomeReveal() {
  useGSAP(() => {
    // build a local timeline so we can clean it easily if the component unmounts
    const tl = gsap.timeline({ id: 'reveal' });

    tl.to('#revelLogo', {
      delay: 0.4,
      duration: 0.5,
      yPercent: -110,
      ease: 'sine.in',
    }).to(
      '#revelCover',
      {
        duration: 1,
        backgroundSize: '100% 0%',
        ease: 'power1.inOut',
      },
      '<0.2' // start this after the logo animation
    );

    /* inject the child timeline at the *beginning* of MasterTL */
    masterTimeline.add(tl, 0).addLabel('revealDone');

    masterTimeline.call(() => {
      const revelElement = document.getElementById('revelCover');
      if (revelElement) {
        revelElement.remove();
      }
    }, []);
  }, []);

  return (
    <div
      id="revelCover"
      className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center"
    >
      <div className="h-fit overflow-hidden">
        <Image
          id="revelLogo"
          alt="Bakery Logo"
          src="/lily-logo.png"
          className="rounded-lg md:w-[300px]"
          width={120}
          height={100}
          priority
        />{' '}
      </div>
    </div>
  );
}
