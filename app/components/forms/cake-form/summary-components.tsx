import React from 'react';

// --- Summary Row Component ---
export const SummaryRow: React.FC<{
  label: string;
  value: string;
  className?: string;
}> = ({ label, value, className = '' }) => (
  <div className={`flex justify-between ${className}`}>
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);

// --- Help Card Component ---
export const HelpCard: React.FC<{
  title: string;
  content: string;
  mobile?: boolean;
}> = ({ title, content, mobile = false }) => (
  <div
    className={`rounded-lg border border-blue-200 bg-blue-50 ${mobile ? 'p-4 shadow-sm' : 'p-6'}`}
  >
    <h3
      className={`font-semibold text-blue-900 ${mobile ? 'mb-2 text-base' : 'mb-3 text-lg'}`}
    >
      {title}
    </h3>
    <p className="text-sm leading-relaxed text-blue-800">{content}</p>
  </div>
);

// --- Order Summary Card Component ---
export const OrderSummaryCard: React.FC<{
  children: React.ReactNode;
  mobile?: boolean;
}> = ({ children, mobile = false }) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${mobile ? 'p-4' : 'p-6'}`}
  >
    <h3
      className={`font-semibold text-gray-900 ${mobile ? 'mb-3 text-base' : 'mb-4 text-lg'}`}
    >
      Order Summary
    </h3>
    {children}
  </div>
);

// --- Desktop Order Summary Component ---
export const DesktopOrderSummary: React.FC<{
  tierNumber: string;
  tierType: string;
  flavour: string;
  frosting: string;
  basePrice: number;
  total: number;
  estimatedSize: string;
}> = ({
  tierNumber,
  tierType,
  flavour,
  frosting,
  basePrice,
  total,
  estimatedSize,
}) => (
  <OrderSummaryCard>
    {/* Cake Details */}
    <div className="space-y-3 text-sm">
      <SummaryRow
        label="Tiers"
        value={`${tierNumber} tier${tierNumber !== '1' ? 's' : ''}`}
      />
      <SummaryRow
        label="Type"
        value={tierType.replace('-', ' ')}
        className="capitalize"
      />
      <SummaryRow
        label="Flavour"
        value={flavour.replace('-', ' ')}
        className="capitalize"
      />
      <SummaryRow
        label="Frosting"
        value={frosting.replace('-', ' ')}
        className="capitalize"
      />
    </div>

    <hr className="my-4" />

    {/* Pricing */}
    <div className="space-y-2 text-sm">
      <SummaryRow label="Base Price" value={`$${basePrice}`} />
      {tierType === 'some-dummy' && (
        <div className="flex justify-between text-green-600">
          <span>Dummy Tier Discount:</span>
          <span>-$50</span>
        </div>
      )}
      <div className="flex justify-between border-t pt-2 font-semibold">
        <span>Estimated Total:</span>
        <span className="text-pink-600">${total}</span>
      </div>
    </div>

    <hr className="my-4" />

    {/* Delivery Info */}
    <div className="text-sm">
      <SummaryRow label="Estimated Size" value={estimatedSize} />
      <div className="mt-2">
        <span className="text-gray-600">Delivery:</span>
        <p className="mt-1 text-xs text-gray-500">
          Custom cakes require 3-5 business days
        </p>
      </div>
    </div>

    {/* Trust Badge */}
    <div className="mt-4 rounded-md bg-pink-50 p-3">
      <p className="text-xs text-pink-800">
        ✨ Handcrafted with premium ingredients
      </p>
    </div>
  </OrderSummaryCard>
);

// --- Mobile Order Summary Component ---
export const MobileOrderSummary: React.FC<{
  tierNumber: string;
  flavour: string;
  estimatedSize: string;
  total: number;
}> = ({ tierNumber, flavour, estimatedSize, total }) => (
  <OrderSummaryCard mobile>
    <div className="space-y-2 text-sm">
      <SummaryRow
        label="Cake"
        value={`${tierNumber} tier${tierNumber !== '1' ? 's' : ''}, ${flavour.replace('-', ' ')}`}
      />
      <SummaryRow label="Size" value={estimatedSize} />
      <div className="flex justify-between border-t pt-2 font-semibold">
        <span>Total:</span>
        <span className="text-pink-600">${total}</span>
      </div>
    </div>
  </OrderSummaryCard>
);
