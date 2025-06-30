'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

export default function Steps() {
  const theList = [
    { step: '1', description: 'Choose your cake' },
    { step: '2', description: 'Pick your date' },
    { step: '3', description: 'Book & pay deposit' },
    { step: '4', description: 'Get a confirmation e-mail' },
    { step: '5', description: 'Wait for your delivery' },
  ];

  useGSAP(() => {
    // Wait for DOM to be ready
    gsap.set('.prosesTital', { visibility: 'visible' });

    const prosesWords = new SplitText('.prosesTital', {
      type: 'words',
      wordsClass: 'word-split',
    });

    // Set initial state for words
    gsap.set(prosesWords.words, {
      yPercent: 100,
      opacity: 0,
    });

    // Animate words in
    gsap.to(prosesWords.words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.2,
      delay: 0.2,
    });

    // Fix the typo: 'lins' should be 'lines'
    const split = new SplitText('.step-description', {
      type: 'lines',
      linesClass: 'line-split',
    });

    // Set initial state for lines
    gsap.set(split.lines, {
      yPercent: 100,
      opacity: 0,
    });

    // Animate lines in
    gsap.to(split.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.8,
    });
  });

  return (
    <section className="panel bg-bakery-background">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-center space-x-24 px-4 sm:px-6 lg:px-8">
        <h2 className="prosesTital w-fit" style={{ visibility: 'hidden' }}>
          How it works{' '}
          <span>
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

        <div className="mt-12 flex flex-col gap-8 md:gap-10">
          {theList.map((item, index) => (
            <div key={index} className="flex">
              <span className="step-number text-bakery-primary font-bold">
                {item.step}
              </span>
              <h3 className="step-description" style={{ overflow: 'hidden' }}>
                {item.description}
              </h3>
            </div>
          ))}

          <div className="mt-12 flex justify-center">
            <button className="bg-bakery-primary text-bakery-background rounded-full px-8 py-3 text-lg font-medium transition hover:brightness-110">
              Start now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
