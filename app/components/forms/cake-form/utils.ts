import {
  tierPrices,
  tierSizes,
  tierServings,
  tierOccasions,
  flavorDescriptions,
  frostingDescriptions,
  fieldHelpContent,
} from './constants';

// --- Calculation Functions ---
export const calculateBasePrice = (tierNumber: string) => {
  return tierPrices[tierNumber as keyof typeof tierPrices] || 150;
};

export const calculateTotal = (tierNumber: string, tierType: string) => {
  let total = calculateBasePrice(tierNumber);
  if (tierType === 'some-dummy') total -= 50;
  return total;
};

export const getEstimatedSize = (tierNumber: string) => {
  return tierSizes[tierNumber as keyof typeof tierSizes] || '6-8 inches';
};

export const getTierServings = (tierNumber: string) => {
  return tierServings[tierNumber as keyof typeof tierServings] || '8-12';
};

export const getTierOccasion = (tierNumber: string) => {
  return (
    tierOccasions[tierNumber as keyof typeof tierOccasions] ||
    'intimate gatherings'
  );
};

export const getFlavorDescription = (flavour: string) => {
  return (
    flavorDescriptions[flavour as keyof typeof flavorDescriptions] ||
    'Delicious homemade flavor'
  );
};

export const getFrostingDescription = (frosting: string) => {
  return (
    frostingDescriptions[frosting as keyof typeof frostingDescriptions] ||
    'Professional quality frosting'
  );
};

// --- Validation Functions ---
export const isFieldComplete = (
  fieldName: string,
  values: Record<string, string>
) => {
  switch (fieldName) {
    case 'occasion':
      return values.occasion?.trim() !== '';
    case 'eventDate':
      return values.eventDate !== '';
    case 'tierNumber':
      return values.tierNumber !== '';
    case 'tierType':
      return values.tierType !== '';
    case 'flavour':
      return values.flavour !== '';
    case 'frosting':
      return values.frosting !== '';
    default:
      return false;
  }
};

// --- Help Content Functions ---
export const getFieldHelp = (
  currentField: string,
  formState: {
    tierNumber: string;
    tierType: string;
    flavour: string;
    frosting: string;
  }
) => {
  const { tierNumber, tierType, flavour, frosting } = formState;

  switch (currentField) {
    case 'occasion':
      return fieldHelpContent.occasion;
    case 'eventDate':
      return fieldHelpContent.eventDate;
    case 'tierNumber':
      return {
        title: fieldHelpContent.tierNumber.title,
        content: fieldHelpContent.tierNumber.getContent(
          tierNumber,
          getEstimatedSize(tierNumber),
          getTierServings(tierNumber),
          getTierOccasion(tierNumber)
        ),
      };
    case 'tierType':
      return {
        title: fieldHelpContent.tierType.title,
        content: fieldHelpContent.tierType.getContent(tierType),
      };
    case 'flavour':
      return {
        title: fieldHelpContent.flavour.title,
        content: fieldHelpContent.flavour.getContent(
          flavour,
          getFlavorDescription(flavour)
        ),
      };
    case 'frosting':
      return {
        title: fieldHelpContent.frosting.title,
        content: fieldHelpContent.frosting.getContent(
          frosting,
          getFrostingDescription(frosting)
        ),
      };
    default:
      return fieldHelpContent.default;
  }
};
