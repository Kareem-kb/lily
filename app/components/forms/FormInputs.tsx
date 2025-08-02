import { useState, type ChangeEvent } from 'react';

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

// ---------------- SelectField ----------------

// Compact single-use upload
interface FileUploadProps {
  label: string;
  name: string;
  preview?: boolean;
}
export function FileUpload({ label, name, preview = false }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    const slotsLeft = 3 - files.length;
    const filesToAdd = newFiles.slice(0, slotsLeft);
    setFiles((prev) => [...prev, ...filesToAdd]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <div
        className={`flex w-full flex-col gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 transition-all duration-700 ${preview ? 'mt-6' : ''}`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          name={name}
          onChange={addFiles}
          className="sr-only"
          disabled={files.length >= 3}
        />
        {files.map((file, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded bg-gray-50 px-3 py-2"
          >
            <span className="flex-1 truncate text-sm font-medium text-gray-700">
              {file.name}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFile(i);
              }}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
        {files.length < 3 && (
          <span className="flex cursor-pointer items-center justify-center rounded border border-dashed border-gray-300 py-2 text-sm text-gray-400">
            + Add image
          </span>
        )}
      </div>
    </label>
  );
}
