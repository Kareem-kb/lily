// --- Form Options Data ---
export const tierNumberOptions = [
  { label: '1 tier', value: '1' },
  { label: '2 tiers', value: '2' },
  { label: '3 tiers', value: '3' },
  { label: '4+ tiers', value: '4+' },
];

export const tierTypeOptions = [
  { label: 'All real', value: 'all-real' },
  { label: 'Some dummy (specify which)', value: 'some-dummy' },
  { label: 'All dummy', value: 'all-dummy' },
];

export const flavourOptions = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Red Velvet', value: 'red-velvet' },
  { label: 'Lemon', value: 'lemon' },
];

export const frostingOptions = [
  { label: 'Buttercream', value: 'buttercream' },
  { label: 'Cream Cheese', value: 'cream-cheese' },
  { label: 'Fondant', value: 'fondant' },
  { label: 'Ganache', value: 'ganache' },
];

// --- Pricing & Size Data ---
export const tierPrices = { '1': 150, '2': 280, '3': 420, '4+': 600 };
export const tierSizes = {
  '1': '6-8 inches',
  '2': '6-10 inches',
  '3': '6-12 inches',
  '4+': '6-14+ inches',
};
export const tierServings = {
  '1': '8-12',
  '2': '20-30',
  '3': '40-50',
  '4+': '60+',
};
export const tierOccasions = {
  '1': 'intimate gatherings',
  '2': 'small parties',
  '3': 'medium celebrations',
  '4+': 'large events',
};

// --- Descriptions ---
export const flavorDescriptions = {
  chocolate: 'Rich, moist chocolate cake with deep cocoa flavor',
  vanilla: 'Classic vanilla sponge, light and fluffy',
  'red-velvet': 'Luxurious red velvet with subtle cocoa notes',
  lemon: 'Fresh lemon cake with bright, citrusy taste',
};

export const frostingDescriptions = {
  buttercream: 'Smooth, creamy buttercream - perfect for piping and decorating',
  'cream-cheese':
    'Tangy cream cheese frosting - pairs beautifully with red velvet',
  fondant:
    'Smooth fondant finish - ideal for intricate designs and sharp edges',
  ganache: 'Rich chocolate ganache - decadent and glossy finish',
};

// --- Help Content ---
export const fieldHelpContent = {
  occasion: {
    title: 'Tell us about your celebration',
    content:
      "Whether it's a birthday, wedding, anniversary, or any special moment - this helps us understand the style and size you'll need.",
  },
  eventDate: {
    title: 'When do you need your cake?',
    content:
      'Please select a date at least 3 days before your event. We can deliver the night before (after 6 PM) or morning of your event (before 11 AM) to ensure maximum freshness.',
  },
  tierNumber: {
    title: 'How many tiers do you need?',
    getContent: (
      tierNumber: string,
      size: string,
      servings: string,
      occasion: string
    ) =>
      `${tierNumber} tier${tierNumber !== '1' ? 's' : ''} selected - ${size} diameter, serves approximately ${servings} people. Perfect for ${occasion}.`,
  },
  tierType: {
    title: 'Real vs Dummy tiers',
    getContent: (tierType: string) => {
      switch (tierType) {
        case 'all-real':
          return 'All tiers will be real cake - maximum deliciousness for your guests!';
        case 'some-dummy':
          return 'Mix of real and dummy tiers - great for photos while saving costs. You can specify which tiers should be real.';
        default:
          return 'All dummy tiers - perfect for display purposes and photo opportunities.';
      }
    },
  },
  flavour: {
    title: 'Choose your cake flavour',
    getContent: (flavour: string, description: string) =>
      `${flavour.replace('-', ' ')} selected - ${description}. This will be the flavour for all real tiers.`,
  },
  frosting: {
    title: 'Select your frosting',
    getContent: (frosting: string, description: string) =>
      `${frosting.replace('-', ' ')} selected - ${description}. This determines the final look and taste of your cake.`,
  },
  default: {
    title: 'Design Your Perfect Cake',
    content:
      "Fill out each section step by step. We'll guide you through creating your dream cake!",
  },
};
