'use client';

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
  return (
    <div className="relative z-10 flex w-full justify-between bg-white p-4 shadow-[0px_4px_45px_9px_rgba(51,_65,_85,_0.12)]">
      <button
        type="button"
        className="w-24 rounded-lg border-2 border-gray-600 px-4 py-2 text-center font-bold text-gray-600 disabled:border-gray-300 disabled:text-gray-300"
        disabled={isPending || currentIndex === 0}
        onClick={onPrevious}
      >
        Previous
      </button>
      {currentIndex === totalQuestions - 1 ? (
        <button
          type="button"
          className="bg-bakery-primary w-24 rounded-lg px-4 py-2 text-center font-bold text-white"
          onClick={onSubmit}
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          className="w-24 rounded-lg  bg-gray-600 px-4 py-2 text-center font-bold text-white disabled:bg-gray-300 disabled:text-white"
          disabled={
            isPending || currentIndex === totalQuestions - 1 || !isValid
          }
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
}
