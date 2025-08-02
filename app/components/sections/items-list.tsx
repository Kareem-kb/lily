'use client';
import { useRef, useState, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { cakeForm, CakeFormResponse } from '@/app/actions/cake-form';
import { cakeFormSchema } from '@/app/validation/cake-form';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { questionsList } from '@/app/components/forms/QuestionsList';
import NavigationButtons from '@/app/components/forms/NavigationButtons';
gsap.registerPlugin(Flip);

export default function ItemsList() {
  const [state, setState] = useState<CakeFormResponse | null>(null);
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);

  // Validate current question only
  const isValid = useMemo(() => {
    const currentQuestion = questionsList[currentIndex];
    if (!currentQuestion) return false; // Safety check
    const fieldName = currentQuestion.name;
    const fieldValue = formData[fieldName];

    const result = cakeFormSchema.pick({ [fieldName]: true }).safeParse({
      [fieldName]: fieldValue,
    });

    return result.success;
  }, [currentIndex, formData]);

  // Handle form input changes
  const handleFormChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = await cakeForm(null, formData);
      setState(data);
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Form submission error:', error);
      setState({ success: false, message: 'Submission failed' });
    } finally {
      setPending(false);
    }
  };

  const handleManualSubmit = () => {
    const formElement = document.querySelector('form');
    if (formElement) {
      handleSubmit({
        preventDefault: () => {},
        currentTarget: formElement,
      } as React.FormEvent<HTMLFormElement>);
    }
  };

  const gotoStep = (next: number) => {
    const state = Flip.getState('.step-animation');
    setCurrentIndex(next);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.7,
        ease: 'power2.inOut',
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
      style={{ backgroundSize: '120px 122px' }}
      ref={mainContainerRef}
    >
      <div className="mx-auto grid h-full w-full max-w-6xl">
        <div className="ml-10 flex items-center gap-1">
          <h2 className="section-title drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
            LET&apos;S CREATE TOGETHER{' '}
          </h2>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex h-[70vh] max-w-lg flex-col gap-6 p-4">
            <form
              onSubmit={handleSubmit}
              className="flex h-full w-full flex-col justify-end overflow-hidden rounded-lg bg-white shadow-[0px_4px_45px_9px_rgba(51,_65,_85,_0.12)]"
            >
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
                          ? 'pointer-events-auto row-start-2 self-start'
                          : index === currentIndex + 1
                            ? 'pointer-events-none row-start-3 self-start'
                            : index < currentIndex
                              ? 'pointer-events-none row-start-1 mb-10 self-end'
                              : 'pointer-events-none row-start-4 self-start'
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
                            value={formData[props.name] || ''}
                            onChange={(e: { target: { value: string } }) =>
                              handleFormChange(props.name, e.target.value)
                            }
                          />
                          {state && <p>{JSON.stringify(state)}</p>}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <NavigationButtons
                currentIndex={currentIndex}
                totalQuestions={questionsList.length}
                isPending={pending}
                onPrevious={() => gotoStep(currentIndex - 1)}
                onNext={() => gotoStep(currentIndex + 1)}
                isValid={isValid}
                onSubmit={handleManualSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
