'use client';

import { useState } from 'react';
import {
  FormSection,
  InputField,
  TextArea,
  RadioGroup,
  FileUpload,
  DatePicker,
} from '../forms/reusable-form-components';
import {
  tierNumberOptions,
  tierTypeOptions,
  flavourOptions,
  frostingOptions,
  calculateBasePrice,
  calculateTotal,
  getEstimatedSize,
  isFieldComplete,
  getFieldHelp,
  HelpCard,
  DesktopOrderSummary,
  MobileOrderSummary,
} from '../forms/cake-form';

export default function ItemsList() {
  const [tierType, setTierType] = useState('all-real');
  const [tierNumber, setTierNumber] = useState('1');
  const [flavour, setFlavour] = useState('chocolate');
  const [frosting, setFrosting] = useState('buttercream');
  const [occasion, setOccasion] = useState('');
  const [eventDate] = useState('');
  const [currentField, setCurrentField] = useState('occasion');

  // Computed values
  const formValues = {
    occasion,
    eventDate,
    tierNumber,
    tierType,
    flavour,
    frosting,
  };
  const formState = { tierNumber, tierType, flavour, frosting };
  const helpContent = getFieldHelp(currentField, formState);
  const basePrice = calculateBasePrice(tierNumber);
  const total = calculateTotal(tierNumber, tierType);
  const estimatedSize = getEstimatedSize(tierNumber);

  return (
    <div className="w-full bg-white p-4 py-16 sm:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="mb-12 w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Design Your Perfect Cake
          </h2>
          <p className="mt-2 text-gray-600">
            Each creation is a unique piece of art, made just for you.
          </p>
        </div>

        {/* Mobile: Sticky Help Card at Top */}
        <div className="lg:hidden">
          <div className="sticky top-0 z-10 mb-6 bg-white pb-4">
            <HelpCard
              title={helpContent.title}
              content={helpContent.content}
              mobile
            />
          </div>
        </div>

        {/* Two Column Layout (Desktop) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Field Help & Order Summary (Desktop Only) */}
          <div className="hidden lg:flex lg:justify-start">
            <div className="sticky top-8 w-full max-w-sm space-y-6">
              <HelpCard
                title={helpContent.title}
                content={helpContent.content}
              />
              <DesktopOrderSummary
                tierNumber={tierNumber}
                tierType={tierType}
                flavour={flavour}
                frosting={frosting}
                basePrice={basePrice}
                total={total}
                estimatedSize={estimatedSize}
              />
            </div>
          </div>

          {/* Right Column - The Form */}
          <div>
            <form className="space-y-10">
              <FormSection title="Event Details">
                <InputField
                  label="Occasion"
                  name="occasion"
                  type="text"
                  placeholder="e.g., Birthday"
                  value={occasion}
                  onChange={(e) => {
                    setOccasion(e.target.value);
                    setCurrentField('occasion');
                  }}
                  onFocus={() => setCurrentField('occasion')}
                />
                <div
                  className={
                    !isFieldComplete('occasion', formValues)
                      ? 'pointer-events-none opacity-50'
                      : ''
                  }
                  onClick={() => setCurrentField('eventDate')}
                >
                  <DatePicker label="Event Date" name="date" />
                </div>
              </FormSection>

              <FormSection title="Cake Structure">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div
                    className={
                      !isFieldComplete('eventDate', formValues)
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                    onClick={() => setCurrentField('tierNumber')}
                  >
                    <RadioGroup
                      label="Number of cake tiers"
                      name="tierNumber"
                      options={tierNumberOptions}
                      value={tierNumber}
                      onChange={(e) => {
                        setTierNumber(e.target.value);
                        setCurrentField('tierNumber');
                      }}
                    />
                  </div>
                  <div
                    className={
                      !isFieldComplete('tierNumber', formValues)
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                    onClick={() => setCurrentField('tierType')}
                  >
                    <RadioGroup
                      label="Real vs. dummy tiers"
                      name="tierType"
                      options={tierTypeOptions}
                      value={tierType}
                      onChange={(e) => {
                        setTierType(e.target.value);
                        setCurrentField('tierType');
                      }}
                    />
                  </div>
                </div>
                {tierType === 'some-dummy' && (
                  <InputField
                    label="Which tiers should be real?"
                    name="dummy_tier_description"
                    placeholder="e.g., 'Top and bottom tiers real, middle dummy'"
                  />
                )}
              </FormSection>

              <FormSection title="Design & Flavour">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div
                    className={
                      !isFieldComplete('tierType', formValues)
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                    onClick={() => setCurrentField('flavour')}
                  >
                    <RadioGroup
                      label="Single cake flavour"
                      name="flavour"
                      options={flavourOptions}
                      value={flavour}
                      onChange={(e) => {
                        setFlavour(e.target.value);
                        setCurrentField('flavour');
                      }}
                    />
                  </div>
                  <div
                    className={
                      !isFieldComplete('flavour', formValues)
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                    onClick={() => setCurrentField('frosting')}
                  >
                    <RadioGroup
                      label="Frosting Type"
                      name="frosting"
                      options={frostingOptions}
                      value={frosting}
                      onChange={(e) => {
                        setFrosting(e.target.value);
                        setCurrentField('frosting');
                      }}
                    />
                  </div>
                </div>
                <FileUpload label="Upload an inspiration photo" />
                <TextArea
                  label="Describe the style, colours and decorations you’d like"
                  name="style_description"
                  placeholder="e.g., 'Minimalist design with gold leaf and fresh flowers'"
                  rows={4}
                />
                <InputField
                  label="Message on the cake (optional)"
                  name="cake_message"
                  type="text"
                  placeholder="e.g., 'Happy Birthday, Lily!'"
                />
                <TextArea
                  label="Any allergies or dietary restrictions?"
                  name="allergies"
                  rows={3}
                />
              </FormSection>

              <FormSection title="Contact & Delivery">
                <InputField
                  label="Delivery address"
                  name="delivery_address"
                  type="text"
                  placeholder="Street, City, Postal Code"
                />
                <InputField
                  label="Full Name"
                  name="full-name"
                  autoComplete="name"
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 123-4567"
                />
              </FormSection>

              {/* Mobile Order Summary - Before Submit */}
              <div className="lg:hidden">
                <MobileOrderSummary
                  tierNumber={tierNumber}
                  flavour={flavour}
                  estimatedSize={estimatedSize}
                  total={total}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-pink-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none"
                >
                  Request Your Custom Cake
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
