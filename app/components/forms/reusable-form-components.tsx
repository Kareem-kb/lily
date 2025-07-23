'use client';

import {
  useState,
  useMemo,
  FC,
  PropsWithChildren,
  ChangeEvent,
  useEffect,
  useRef,
  RefObject,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

// --- Custom Hook for detecting outside clicks ---
function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// --- Shared UI helpers ---
const baseInputClasses =
  'mt-1 block w-full border-0 border-b-2 bg-transparent px-1 py-1.5 focus:border-pink-600 focus:ring-0 focus:outline-none';

const FormLabel: FC<PropsWithChildren<{ htmlFor?: string }>> = ({
  htmlFor,
  children,
}) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

// --- Reusable Form Components ---

export const FormSection: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <div className="space-y-6  p-6 sm:p-8">
    <h3 >
      {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);

// ---------------- InputField ----------------
type InputProps = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField: FC<InputProps> = ({
  label,
  name,
  onChange,
  ...rest
}) => {
  const [hasValue, setHasValue] = useState(() => {
    const initial =
      'value' in rest && rest.value !== undefined
        ? rest.value
        : rest.defaultValue;
    return initial !== undefined && String(initial) !== '' && initial !== '0';
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== '' && e.target.value !== '0');
    onChange?.(e);
  };
  return (
    <div>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <input
        id={name}
        name={name}
        {...rest}
        onChange={handleChange}
        className={`${baseInputClasses} ${
          hasValue ? 'border-transparent' : 'border-gray-300'
        }`}
      />
    </div>
  );
};

// ---------------- TextArea ----------------
type TextAreaProps = {
  label: string;
  name: string;
  rows?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: FC<TextAreaProps> = ({
  label,
  name,
  rows = 3,
  onChange,
  ...rest
}) => {
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHasValue(e.target.value.trim() !== '');
    onChange?.(e);
  };
  return (
    <div>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <textarea
        id={name}
        name={name}
        rows={rows}
        {...rest}
        onChange={handleChange}
        className={`${baseInputClasses} resize-none ${
          hasValue ? 'border-transparent' : 'border-gray-300'
        }`}
      />
    </div>
  );
};

type RadioOption = {
  label: string;
  value: string;
};

export const RadioGroup: FC<{
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, options, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-2 flex flex-col space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex cursor-pointer items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="peer sr-only"
          />
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 peer-focus-visible:ring-2 peer-focus-visible:ring-pink-500 peer-focus-visible:ring-offset-2">
            <span
              className={`h-2 w-2 rounded-full bg-pink-600 transition-transform duration-150 ease-in-out ${
                value === option.value ? 'scale-100' : 'scale-0'
              }`}
            />
          </span>
          <span className="ml-3 text-sm text-gray-800">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export const FileUpload: FC<{ label: string }> = ({ label }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-2 flex w-full justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
      <div className="space-y-1 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
          />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-medium text-pink-600 focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 focus-within:outline-none hover:text-pink-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">JPEG, PNG or PDF up to 10MB</p>
      </div>
    </div>
  </div>
);

// --- Simplified Custom DatePicker Component ---

const CalendarView: FC<{
  onDateSelect: (date: Date) => void;
  minDate: Date;
  maxDate: Date;
  initialDate: Date;
}> = ({ onDateSelect, minDate, maxDate, initialDate }) => {
  const [viewDate, setViewDate] = useState(initialDate);

  const daysInMonth = useMemo(() => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const days = [];
    while (date.getMonth() === viewDate.getMonth()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [viewDate]);

  const startDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay();

  const changeMonth = (offset: number) => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1)
    );
  };

  // --- Smarter Navigation Logic ---
  const firstDayOfNextMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    1
  );
  const lastDayOfPrevMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    0
  );

  const canGoForward = firstDayOfNextMonth <= maxDate;
  const canGoBackward = lastDayOfPrevMonth >= minDate;

  return (
    <div className="w-80 rounded-md border bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between pb-4">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={!canGoBackward}
          className="rounded-full p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-sm font-semibold">
          {viewDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          disabled={!canGoForward}
          className="rounded-full p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="font-medium text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: startDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {daysInMonth.map((day) => {
          const isDisabled = day < minDate || day > maxDate;
          return (
            <button
              key={day.toString()}
              type="button"
              disabled={isDisabled}
              onClick={() => onDateSelect(day)}
              className={`h-8 w-8 rounded-full ${
                isDisabled ? 'text-gray-300' : 'hover:bg-gray-100'
              }`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const DatePicker: FC<{ label: string; name: string }> = ({
  label,
  name,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const datepickerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(datepickerRef, () => setIsOpen(false));

  const today = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 50);
    return d;
  }, []);

  return (
    <div ref={datepickerRef}>
      <label
        htmlFor={`${name}-button`}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type="hidden"
          name={name}
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
        />
        <button
          type="button"
          id={`${name}-button`}
          onClick={() => setIsOpen(!isOpen)}
          className={`${baseInputClasses} flex items-center justify-between ${
            selectedDate ? 'border-transparent' : 'border-gray-300'
          }`}
        >
          <span className={selectedDate ? 'text-gray-900' : 'text-gray-400'}>
            {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
          </span>
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1">
            <CalendarView
              onDateSelect={(date) => {
                setSelectedDate(date);
                setIsOpen(false);
              }}
              minDate={today}
              maxDate={maxDate}
              initialDate={selectedDate || today}
            />
          </div>
        )}
      </div>
    </div>
  );
};
