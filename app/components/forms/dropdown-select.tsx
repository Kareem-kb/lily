'use client';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/shadcn/dropdown-menu'; // Assuming this path is correct

interface DropdownProps {
  label: string;
  name: string;
  placeholder: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (e: { target: { name: string; value: string } }) => void; // Simplified event for custom components
  preview?: boolean;
  disabled?: boolean;
}

export function Dropdown({
  label,
  name,
  placeholder,
  options,
  value,
  onChange,
  preview = false,
  disabled = false,
}: DropdownProps) {
  // This state holds the currently selected value.
  const [selectedValue, setSelectedValue] = useState(value || '');

  // This effect ensures the component updates if the parent `value` prop changes.
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    if (onChange) {
      // We fire onChange with a simple object, which is common for custom inputs.
      onChange({ target: { name, value: optionValue } });
    }
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <div className={preview ? 'mt-6' : ''}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={disabled}>
            <button
              className="flex w-full items-center justify-between px-3 py-2 text-left font-bold text-black disabled:cursor-not-allowed disabled:text-gray-400"
              disabled={disabled}
            >
              {selectedLabel}
              {/* Optional: Add a chevron icon for better UX */}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-md border border-gray-200 bg-white p-0 shadow-lg"
            align="start"
            sideOffset={4}
          >
            {options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
                // FIX: Corrected classes, removed inline style
                className="cursor-pointer rounded-none border-b border-gray-200 px-3 py-2 text-sm font-medium last:border-b-0 focus:bg-gray-100 focus:text-black"
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* This hidden input is crucial for making the component work in a form */}
        <input type="hidden" name={name} value={selectedValue} />
      </div>
    </label>
  );
}
