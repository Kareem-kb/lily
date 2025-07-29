import { useState, type ChangeEvent } from 'react';
import Image from 'next/image';

// ---------------- InputField ----------------
interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  preview?: boolean;
}
export function InputField({
  label,
  placeholder,
  name,
  onChange,
  preview = false,
}: InputFieldProps) {
  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        className={`border-0 text-base font-bold text-black placeholder-black transition-all duration-700 placeholder:transition-colors focus:placeholder-gray-400 focus:outline-none ${preview ? 'mt-6' : ''}`}
      />
    </label>
  );
}

// ---------------- TextArea ----------------
interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  preview?: boolean;
}
export function TextArea({
  label,
  name,
  placeholder,
  onChange,
  preview = false,
}: TextAreaProps) {
  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <textarea
        rows={3}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`resize-none border-0 text-base font-bold text-black placeholder-black transition-all duration-700 placeholder:transition-colors focus:placeholder-gray-400 focus:outline-none ${preview ? 'mt-6' : ''}`}
      />
    </label>
  );
}

// ---------------- RadioGroup ----------------

interface RadioGroupProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  preview?: boolean;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  preview = false,
}: RadioGroupProps) {
  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <div
        className={`flex flex-wrap gap-3 transition-all duration-700 ${preview ? 'mt-6' : ''}`}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-1"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              {...(value !== undefined
                ? { checked: value === opt.value, onChange }
                : {})}
              className="h-3 w-3 accent-black"
            />
            <span className="text-base font-bold text-black">{opt.label}</span>
          </label>
        ))}
      </div>
    </label>
  );
}

// Compact single-use upload
interface FileUploadProps {
  label: string;
  name: string;
  preview?: boolean;
}

export function FileUpload({ label, name, preview = false }: FileUploadProps) {
  const [urls, setUrls] = useState<string[]>([]);

  const addImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const slotsLeft = 3 - urls.length;
    const newUrls = files
      .slice(0, slotsLeft)
      .map((file) => URL.createObjectURL(file));
    setUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    setUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <div
        className={`flex w-full flex-wrap items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-3 transition-all duration-700 ${preview ? 'mt-6' : ''}`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          name={name}
          onChange={addImages}
          className="sr-only"
          disabled={urls.length >= 3}
        />
        {urls.map((u, i) => (
          <div
            key={i}
            className="group relative h-16 w-16 overflow-hidden rounded"
          >
            <Image src={u} alt={`img-${i}`} fill className="object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeImage(i);
              }}
              className="absolute top-0.5 right-0.5 hidden h-4 w-4 items-center justify-center rounded bg-black/60 text-[10px] text-white group-hover:flex"
            >
              ×
            </button>
          </div>
        ))}
        {urls.length < 3 && (
          <span className="flex h-16 w-16 cursor-pointer items-center justify-center rounded border border-dashed border-gray-300 text-2xl text-gray-400">
            +
          </span>
        )}
      </div>
    </label>
  );
}
