import React from 'react';

const LOGOS = [
  "Fortune 500 Mfg", "Global Logistics", "National Retailer", "Health Systems Inc",
  "Tech Campus", "Federal Reserve", "Auto Makers", "Data Centers"
];

export const TrustTicker: React.FC = () => {
  return (
    <section className="py-10 border-y border-white/5 bg-brand-black overflow-hidden relative z-10">
      <div className="flex w-full">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
            <div
              key={`${logo}-${idx}`}
              className="mx-12 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default"
            >
              <span className="text-2xl font-serif italic text-white/80 tracking-tight hover:text-brand-gold transition-colors duration-300">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};