import React from 'react';
import { Reveal } from '../ui/Reveal';

const FEATURES = [
  {
    title: "Zero Unplanned Downtime",
    description: "Our preventative maintenance detects leaks before they stop your production line."
  },
  {
    title: "Eliminate Liability Risk",
    description: "We don't just fix roofs; we install permanent fall protection to keep your workers safe."
  },
  {
    title: "10-Year Capital Certainty",
    description: "Stop guessing. Our Roof Management Program forecasts your budget for the next decade."
  },
  {
    title: "Safety Beyond Compliance",
    description: "Named one of America's Safest Companies. We protect your property and our people."
  }
];

export const ValueGrid: React.FC = () => {
  return (
    <section className="py-24 bg-brand-black relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-20 max-w-3xl">
          <Reveal>
            <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6 tracking-tight">
              Roofing is a commodity. <br />
              <span className="text-brand-gold italic">Asset management is a strategy.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 bg-brand-black">
          {FEATURES.map((feature, index) => (
            <Reveal key={index} delay={0.1 * index} width="100%">
              <div className="group h-full flex flex-col items-start border-l border-white/10 pl-6 hover:border-brand-gold/50 transition-colors duration-500">
                <h3 className="text-xl font-serif text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-relaxed text-sm font-light">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};