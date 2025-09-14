'use client';
import { useState, useRef } from 'react';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface NavigationButtonsProps {
  currentIndex: number;
  totalQuestions: number;
  submitSuccess: boolean;
  isPending: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isValid: boolean;
}

// Animation constants for better maintainability
const ANIMATION_CONFIG = {
  duration: 0.6,
  ease: 'power2.inOut',
  submitBtnSize: '2.5rem',
  borderRadius: '1rem', // Not fully rounded - adjust as needed
  successDelay: 400,
} as const;

export default function NavigationButtons({
  currentIndex,
  totalQuestions,
  submitSuccess,
  isPending,
  onPrevious,
  onNext,
  onSubmit,
  isValid = false,
}: NavigationButtonsProps) {
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleSubmit = () => {
    if (!containerRef.current || isPending) return;

    // Capture position for Flip animation
    flipStateRef.current = Flip.getState(
      containerRef.current.querySelectorAll('.prev-btn, .submit-btn'),
      { props: 'x,y' }
    );

    requestAnimationFrame(() => {
      setIsSubmitClicked(true);
      onSubmit();
    });
  };

  // Step-by-step animation sequence
  useGSAP(() => {
    if (!containerRef.current) return;
    const submitBtn = containerRef.current.querySelector(
      '.submit-btn'
    ) as HTMLElement;
    if (!submitBtn) return;

    if (isSubmitClicked && flipStateRef.current) {
      // Kill any existing timeline
      if (timelineRef.current) timelineRef.current.kill();

      timelineRef.current = gsap.timeline({
        onComplete: () => {
          flipStateRef.current = null;
          setIsAnimationComplete(true); // Signal that the main animation is done
        },
      });

      // A clean, sequential 1.2s timeline
      timelineRef.current
        // Step 1: Prepare the button for the animations
        .set(
          submitBtn,
          {
            textContent: '',
            innerHTML: '',
            innerText: '',
            transformOrigin: 'right center', // Anchor right side for shrink
          },
          0
        )
        // Step 2: Shrink the button from the left (0s -> 0.3s)
        .to(
          submitBtn,
          {
            width: '1rem',
            height: '1rem',
            padding: 0,
            margin: 0,
            borderRadius: '2rem',
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0
        )
        // Step 3: Flip the button into position (0.3s -> 1.0s)
        .add(
          Flip.from(flipStateRef.current, {
            duration: 1,
            ease: 'power2.inOut',
            targets: submitBtn,
          }),
          0.3 // Starts right after the shrink
        )
        // Step 4: Rotate during the flip (0.4s -> 1.2s)
        .set(submitBtn, { transformOrigin: 'center center' }, 0.4) // Switch to center for rotation
        .to(
          submitBtn,
          {
            rotation: -220,
            duration: 1,
            ease: 'power1.inOut',
          },
          0.3 // Starts shortly after the flip begins
        );
    }

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [isSubmitClicked]);

  // Dedicated effect for the success animation
  useGSAP(() => {
    if (!containerRef.current) return;
    const submitBtn = containerRef.current.querySelector(
      '.submit-btn'
    ) as HTMLElement;
    const successMsg = containerRef.current.querySelector(
      '.success-message'
    ) as HTMLElement;

    if (!submitBtn || !successMsg) return;

    if (isAnimationComplete && submitSuccess) {
      const successTl = gsap.timeline();
      successTl
        .to(submitBtn, {
          yPercent: -150,
          duration: 0.6,
          ease: 'power2.out',
        })
        .fromTo(
          successMsg,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          }
        );
    }
  }, [isAnimationComplete, submitSuccess]);

  return (
    <div
      ref={containerRef}
      className={`btn-position relative flex h-20 w-full overflow-hidden bg-white p-4 shadow-[0px_4px_45px_9px_rgba(51,_65,_85,_0.12)] transition-all duration-300 ${
        isSubmitClicked ? 'justify-center' : 'justify-between'
      }`}
    >
      {!isSubmitClicked && (
        <button
          type="button"
          className="prev-btn flex w-24 items-center justify-center rounded-lg border-2 border-gray-600 px-4 py-2 text-center font-bold text-gray-600 transition-colors disabled:border-gray-300 disabled:text-gray-300"
          disabled={currentIndex === 0}
          onClick={onPrevious}
        >
          Previous
        </button>
      )}
      {currentIndex === totalQuestions - 1 || isSubmitClicked ? (
        <button
          type="button"
          className="submit-btn bg-bakery-primary disabled:bg-bakery-primary overflow-hidden rounded-lg px-4 py-2 text-center font-bold text-white transition-colors"
          onClick={handleSubmit}
          disabled={isPending}
          style={{
            minWidth: isSubmitClicked ? ANIMATION_CONFIG.submitBtnSize : '6rem',
          }}
        >
          {isSubmitClicked ? '' : 'Submit'}
        </button>
      ) : (
        <button
          type="button"
          className="flex w-24 items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-center font-bold text-white transition-colors disabled:bg-gray-300"
          disabled={!isValid}
          onClick={onNext}
        >
          Next
        </button>
      )}
      <div className="success-message pointer-events-none absolute inset-0 flex items-center justify-center opacity-0">
        <p className="text-bakery-primary text-center text-base font-bold">
          Thank you! We&apos;ll be in touch soon.
        </p>
      </div>
    </div>
  );
}
