'use client';
import { useRef, useActionState, useState } from 'react';
import { cakeForm } from '@/app/actions/cake-form';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { questionsList } from '@/app/components/forms/QuestionsList';
gsap.registerPlugin(Flip);

export default function ItemsList() {
  const [state, formAction, isPending] = useActionState(cakeForm, null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoStep = (next: number) => {
    // 1. Get the initial state
    const state = Flip.getState('.step-animation');

    // 2. Change the classes
    setCurrentIndex(next);

    // 3. Animate to the new state
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 1,
        ease: 'power2.inOut',
        // THIS IS THE FIX:
        // Tell Flip to only animate these specific properties
        props: 'grid-row-start, margin-bottom, gap',
      });
    });
  };

  useGSAP(() => {
    gsap.to(mainContainerRef.current, {
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: 'top top',
        pin: true,
        end: '+=200',
      },
    });
  });

  return (
    <section
      className="flex h-screen flex-col justify-center gap-20 bg-[url('/lily-pattern.svg')] bg-repeat"
      style={{ backgroundSize: 'calc(100%/6) calc(100%/3)' }}
      ref={mainContainerRef}
    >
      <div className="mx-auto grid h-full w-full max-w-6xl">
        <div className="mt-5 ml-10 flex items-center gap-1">
          <span className="text-bakery-gray text-lg font-bold">—</span>
          <h2 className="section-title">LET&apos;S CREATE TOGETHER</h2>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex h-[65vh] max-w-lg flex-col gap-6 p-4">
            <form
              action={formAction}
              className="flex h-full w-full flex-col justify-end overflow-hidden rounded-lg bg-white shadow-[0px_4px_45px_9px_rgba(51,_65,_85,_0.12)]"
            >
              {/* --- THE SIMPLIFIED LOOP --- */}

              <div
                ref={formWrapperRef}
                className="form-step-wrapper grid h-full grid-rows-[0_93%_auto_0] overflow-hidden p-4"
              >
                {questionsList.map(
                  ({ id, component: Component, ...props }, index) => (
                    <div
                      key={id}
                      className={`step-animation col-start-1 ${
                        index === currentIndex
                          ? 'pointer-events-auto row-start-2 self-start' // current card (visible top)
                          : index === currentIndex + 1
                            ? 'pointer-events-none row-start-3 self-start' // next card (visible bottom, controls offset via preview prop)
                            : index < currentIndex
                              ? 'pointer-events-none row-start-1 mb-10 self-end' // previous cards (hidden above)
                              : 'pointer-events-none row-start-4 self-start' // future cards (hidden below)
                      }`}
                    >
                      <div className="flex w-full items-start gap-2">
                        <span className="w-fit flex-shrink-0 rounded-full border-2 border-gray-300 px-2.5 py-1.5 text-sm font-bold text-gray-500">
                          {id}.
                        </span>
                        <div className="flex-1">
                          <Component
                            {...(props as Record<string, unknown>)}
                            preview={index === currentIndex + 1}
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="relative z-10 flex w-full justify-between bg-white p-4 shadow-[0px_4px_45px_9px_rgba(51,_65,_85,_0.12)]">
                <button
                  type="button"
                  className="rounded-md bg-gray-600 p-2 text-white disabled:bg-gray-300"
                  disabled={isPending || currentIndex === 0}
                  onClick={() => gotoStep(Math.max(currentIndex - 1, 0))}
                >
                  Previous
                </button>
                <button
                  className="rounded-md bg-gray-600 p-2 text-white disabled:bg-gray-300"
                  type="button"
                  disabled={
                    isPending || currentIndex === questionsList.length - 1
                  }
                  onClick={() =>
                    gotoStep(
                      Math.min(currentIndex + 1, questionsList.length - 1)
                    )
                  }
                >
                  Next
                </button>
              </div>
            </form>
            {state && <p></p>}
          </div>
        </div>
      </div>
    </section>
  );
}
