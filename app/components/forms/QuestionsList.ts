import { InputField, TextArea, FileUpload } from './FormInputs';
import { Dropdown } from './dropDown';
import { DatePicker } from './DatePicker';

// Single optional flag shared by all question components
export interface PreviewableProps {
  preview?: boolean;
}

// Keep config typing minimal—any React component is acceptable
export interface QuestionConfig {
  id: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>; // each component defines its own props
  [key: string]: unknown; // extra per-question props
}

// Ordered list used by <ItemsList /> to render the form dynamically.
export const questionsList: QuestionConfig[] = [
  {
    id: 1,
    name: 'occasion',
    component: InputField,
    label: "What's the special occasion?",
    placeholder: "e.g., Our wedding, Leo's 5th birthday…",
  },
  {
    id: 2,
    name: 'date',
    component: DatePicker,
  },
  {
    id: 3,
    name: 'tiers',
    component: Dropdown,
    label: 'How many tiers will it be?',
    placeholder: 'Layers of joy...',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
    ],
  },
  {
    id: 4,
    name: 'filling',
    component: Dropdown,
    label: 'What delicious filling would you like?',
    placeholder: 'Pick a delicious surprise',
    options: [
      { label: 'Rich Chocolate Fudge', value: 'chocolate' },
      { label: 'Classic Vanilla Cream', value: 'vanilla-cream' },
      { label: 'Fresh Strawberry', value: 'strawberry' },
      { label: 'Zesty Lemon Curd', value: 'lemon-curd' },
    ],
  },
  {
    id: 5,
    name: 'images',
    component: FileUpload,
    label: 'Share your inspiration (optional)',
  },
  {
    id: 6,
    name: 'cakeStyle',
    component: TextArea,
    label: "Describe your dream cake's design",
    placeholder:
      'Tell us about the mood, colors, textures, or themes you have in mind!',
  },
  {
    id: 7,
    name: 'name',
    component: InputField,
    label: "Finally, how can we connect? Let's start with your name.",
    placeholder: 'So we know who to send the quote to',
  },
  {
    id: 8,
    name: 'email',
    component: InputField,
    label: 'Your Email Address',
    placeholder: "Where we'll send your quote and ideas",
  },
  {
    id: 9,
    name: 'phone',
    component: InputField,
    label: 'Your Phone Number',
    placeholder: 'In case we have a quick question',
  },
  {
    id: 10,
    name: 'address',
    component: InputField,
    label: 'Delivery Address',
    placeholder: 'Where the magic is happening',
  },
  {
    id: 11,
    name: 'additionalInfo',
    component: TextArea,
    label: 'Any special text or requests?',
    placeholder: "e.g., 'Happy 40th!', allergies, delivery notes",
  },
];
