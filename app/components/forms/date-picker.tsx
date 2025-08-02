// app/components/forms/cake-form/date-picker.tsx
'use client';

import * as React from 'react';
import { addDays } from 'date-fns';
import { Calendar } from '@/app/lib/shadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/lib/shadcn/popover';

export function DatePicker({
  name,
  preview = false,
  value,
  onChange,
}: {
  name: string;
  preview?: boolean;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
}) {
  const [open, setOpen] = React.useState(false);

  // Convert string value to Date
  const date = value ? new Date(value) : undefined;

  const today = new Date();
  const maxDate = addDays(today, 60);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    const dateString = selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : '';

    // Call onChange with the expected format
    onChange?.({ target: { value: dateString } });
    setOpen(false);
  };

  return (
    <div className="flex flex-col p-2">
      <span className="text-xs font-medium">And when is the big day?</span>
      <input type="hidden" name={name} value={value || ''} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={`cursor-pointer border-0 text-base font-bold transition-all duration-700 focus:outline-none ${preview ? 'mt-6' : ''}`}
          >
            {date ? (
              <span className={open ? 'text-gray-400' : 'text-black'}>
                {date.toLocaleDateString()}
              </span>
            ) : (
              <span className={open ? 'text-gray-400' : 'text-black'}>
                we need 3 days minimum notice
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            className="p-1 [--cell-size:1.5rem]"
            mode="single"
            selected={date}
            disabled={(d) => d < today || d > maxDate}
            defaultMonth={today}
            classNames={{
              week: 'flex w-full gap-1',
              month: 'flex flex-col gap-1',
              day_button: 'p-1.5 m-0.5',
            }}
            captionLayout="label"
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
