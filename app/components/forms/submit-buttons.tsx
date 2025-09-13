'use client';
import { useState, useRef } from 'react';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

interface NavigationButtonsProps {
  currentIndex: number;
  totalQuestions: number;
  isPending: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isValid: boolean;
}

export default function NavigationButtons({
  currentIndex,
  totalQuestions,
  isPending,
  onPrevious,
  onNext,
  onSubmit,
  isValid = false,
}: NavigationButtonsProps) {
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

  const handleSubmit = () => {
    if (!containerRef.current) return;

    // Capture state and trigger animation in one frame
    flipStateRef.current = Flip.getState(
      containerRef.current.querySelectorAll('.prev-btn, .submit-btn'),
      { props: 'opacity, transform' }
    );

    requestAnimationFrame(() => {
      setIsSubmitClicked(true);
      onSubmit();
    });
  };

  // Animate after state change
  useGSAP(() => {
    if (!isSubmitClicked || !flipStateRef.current) return;

    Flip.from(flipStateRef.current, {
      duration: 1,
      ease: 'power2.inOut',
    });

    flipStateRef.current = null;
  }, [isSubmitClicked]);

  return (
    <div
      ref={containerRef}
      className={`btn-position flex h-[5rem] w-full bg-white p-4 shadow-[0px_4px_45px_9px_rgba(51,_65,_85,_0.12)] ${
        isSubmitClicked ? 'justify-center' : 'justify-between'
      }`}
    >
      {!isSubmitClicked && (
        <button
          type="button"
          className="prev-btn w-24 rounded-lg border-2 border-gray-600 px-4 py-2 text-center font-bold text-gray-600 disabled:border-gray-300 disabled:text-gray-300"
          disabled={currentIndex === 0}
          onClick={onPrevious}
        >
          Previous
        </button>
      )}

      {currentIndex === totalQuestions - 1 ? (
        <button
          type="button"
          className="bg-bakery-primary submit-btn w-24 overflow-hidden rounded-lg px-4 py-2 text-center font-bold text-white"
          onClick={handleSubmit}
          disabled={isPending}
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          className="w-24 rounded-lg bg-gray-600 px-4 py-2 text-center font-bold text-white disabled:bg-gray-300 disabled:text-white"
          disabled={!isValid}
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
}
