'use client';
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

// Register the Flip plugin once
gsap.registerPlugin(Flip);

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null); // Ref to store the "before" state

  const handleSubmit = () => {
    // 1. Capture the state of the buttons BEFORE the DOM changes
    if (containerRef.current) {
      const buttons = (containerRef.current as HTMLElement).querySelectorAll(
        '.prev-btn, .submit-btn'
      );
      flipStateRef.current = Flip.getState(buttons, { props: 'opacity' });
    }

    // 2. Update React state to trigger the re-render
    setIsSubmitClicked(true);
    onSubmit();
  };

  // 3. Animate from the old state to the new state after the render
  useGSAP(() => {
    if (!isSubmitClicked || !flipStateRef.current || !containerRef.current) {
      return;
    }

    // This runs after React has updated the DOM (hiding the "Previous" button)
    Flip.from(flipStateRef.current, {
      duration: 1,
      ease: 'power2.inOut',
      // 'absolute' helps animate elements that are being removed from the layout flow
      absolute: true,
    });

    // Clean up the ref
    flipStateRef.current = null;
  }, [isSubmitClicked]);

  return (
    <div
      ref={containerRef}
      className={`btn-position h-[5rem] flex w-full bg-white p-4 shadow-[0px_4px_45px_9px_rgba(51,_65,_85,_0.12)] ${
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
