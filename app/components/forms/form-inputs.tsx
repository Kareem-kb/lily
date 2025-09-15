import { type ChangeEvent, useRef } from 'react';

// ---------------- InputField ----------------
interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  preview?: boolean;
  disabled?: boolean;
}
export function InputField({
  label,
  placeholder,
  name,
  onChange,
  preview = false,
  disabled = false,
}: InputFieldProps) {
  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        disabled={disabled}
        className={`border-0 text-base font-bold text-black placeholder-black transition-all duration-700 placeholder:transition-colors focus:placeholder-gray-400 focus:outline-none disabled:bg-white disabled:text-gray-400 ${preview ? 'mt-6' : ''}`}
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
  disabled?: boolean;
}
export function TextArea({
  label,
  name,
  placeholder,
  onChange,
  preview = false,
  disabled = false,
}: TextAreaProps) {
  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <textarea
        rows={3}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`resize-none border-0 text-base font-bold text-black placeholder-black transition-all duration-700 placeholder:transition-colors focus:placeholder-gray-400 focus:outline-none disabled:bg-white disabled:text-gray-400 ${preview ? 'mt-6' : ''}`}
      />
    </label>
  );
}

// ---------------- SelectField ----------------

// Compact single-use upload
interface FileUploadProps {
  label: string;
  name: string;
  value?: File[];
  onChange?: (e: { target: { name: string; value: File[] } }) => void;
  preview?: boolean;
  disabled?: boolean;
}
export function FileUpload({
  label,
  name,
  value = [],
  onChange,
  preview = false,
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);

    // Filter only image files
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith('image/')
    );

    const slotsLeft = 3 - value.length;
    const filesToAdd = imageFiles.slice(0, slotsLeft);
    const updatedFiles = [...value, ...filesToAdd];

    if (onChange) {
      onChange({ target: { name, value: updatedFiles } });
    }

    // Clear the input so the same file can be selected again
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    if (onChange) {
      onChange({ target: { name, value: updatedFiles } });
    }
  };

  return (
    <label className="flex flex-col gap-1 p-2">
      <span className="text-xs font-medium">{label}</span>
      <div
        className={`flex w-full flex-col gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 transition-all duration-700 ${preview ? 'mt-6' : ''} ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          name={name}
          onChange={addFiles}
          className="sr-only"
          disabled={value.length >= 3 || disabled}
        />
        {value.map((file) => (
          <div
            key={`${file.name}-${file.size}-${file.lastModified}`}
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
                const fileIndex = value.findIndex(
                  (f) =>
                    f.name === file.name &&
                    f.size === file.size &&
                    f.lastModified === file.lastModified
                );
                if (fileIndex > -1) {
                  removeFile(fileIndex);
                }
              }}
              disabled={disabled}
              className="ml-2 text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              ×
            </button>
          </div>
        ))}
        {value.length < 3 && (
          <div
            className={`flex cursor-pointer items-center justify-center py-4 text-sm text-gray-400 transition-colors ${disabled ? 'cursor-not-allowed' : ''}`}
            onClick={(e) => {
              if (disabled) return;
              e.preventDefault();
              inputRef.current?.click();
            }}
          >
            <div className="text-center">
              <div>+ Add {value.length === 0 ? 'images' : 'more images'}</div>
              <div className="mt-1 text-xs text-gray-300">
                {value.length === 0
                  ? 'Select multiple images'
                  : `${3 - value.length} more allowed`}
              </div>
            </div>
          </div>
        )}
      </div>
    </label>
  );
}
