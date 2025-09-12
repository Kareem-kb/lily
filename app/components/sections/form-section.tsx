'use client';
import { useRef, useState, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import { cakeForm } from '@/app/actions/form-action';
import { cakeFormSchema } from '@/app/lib/zod/form-validation';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { questionsList } from '@/app/components/forms/questions-list';
import NavigationButtons from '@/app/components/forms/navigation-buttons';

gsap.registerPlugin(Flip);

export default function ItemsList() {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement>(null);

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

  const isValid = useMemo(() => {
    const currentQuestion = questionsList[currentIndex];
    if (!currentQuestion) return false;
    const fieldName = currentQuestion.name;
    const fieldValue = formData[fieldName];
    const result = cakeFormSchema.pick({ [fieldName]: true }).safeParse({
      [fieldName]: fieldValue,
    });
    return result.success;
  }, [currentIndex, formData]);

  const handleFormChange = (name: string, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const formData = new FormData(e.currentTarget);
      await cakeForm(null, formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setPending(false);
    }
  };

  const submitForm = () => document.querySelector('form')?.requestSubmit();

  return (
    <section
      className="flex h-screen flex-col justify-center gap-20 bg-[url('/icons/lily-pattern.svg')] bg-repeat"
      style={{ backgroundSize: '120px 122px' }}
      ref={mainContainerRef}
    >
      <div className="mx-auto grid h-full w-full max-w-6xl">
        <div className="flex items-end gap-1 md:ml-10">
          <h2 className="section-title drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">
            LET&apos;S CREATE TOGETHER{' '}
          </h2>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex h-[66vh] max-w-lg flex-col gap-6 p-4">
            <form
              onSubmit={handleSubmit}
              className="flex h-full w-full flex-col justify-end overflow-hidden rounded-lg bg-white shadow-[0px_4px_45px_9px_rgba(51,_65,_85,_0.12)]"
            >
              <div className="form-step-wrapper grid h-full grid-rows-[0_93%_auto_0] overflow-hidden p-4">
                {questionsList.map(
                  ({ id, component: Component, ...props }, index) => (
                    <div
                      key={id}
                      className={`step-animation col-start-1 ${index === currentIndex ? 'pointer-events-auto row-start-2 self-start' : index === currentIndex + 1 ? 'pointer-events-none row-start-3 self-start' : index < currentIndex ? 'pointer-events-none row-start-1 mb-10 self-end' : 'pointer-events-none row-start-4 self-start'}`}
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
                onSubmit={submitForm}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
