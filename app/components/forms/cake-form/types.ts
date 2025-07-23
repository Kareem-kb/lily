// --- Form Option Types ---
export interface RadioOption {
  label: string;
  value: string;
}

// --- Form State Types ---
export interface CakeFormState {
  tierNumber: string;
  tierType: string;
  flavour: string;
  frosting: string;
  occasion: string;
  eventDate: string;
}

export interface FormValues extends CakeFormState {
  [key: string]: string;
}

// --- Help Content Types ---
export interface HelpContent {
  title: string;
  content: string;
}

export interface DynamicHelpContent {
  title: string;
  getContent: (...args: string[]) => string;
}

// --- Summary Component Props ---
export interface DesktopOrderSummaryProps {
  tierNumber: string;
  tierType: string;
  flavour: string;
  frosting: string;
  basePrice: number;
  total: number;
  estimatedSize: string;
}

export interface MobileOrderSummaryProps {
  tierNumber: string;
  flavour: string;
  estimatedSize: string;
  total: number;
}

export interface HelpCardProps {
  title: string;
  content: string;
  mobile?: boolean;
}
