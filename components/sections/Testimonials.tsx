import React from 'react';
import { Reveal } from '../ui/Reveal';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "D. C. Taylor Co. handled our multi-site reroofing project without interrupting a single day of operations. Their safety protocols are unmatched.",
    author: "James Wilson",
    role: "Director of Facilities",
    company: "National Logistics Co."
  },
  {
    id: 2,
    quote: "We were facing a 2-week downtime estimate from another contractor. Their emergency team had us temporary watertight in 4 hours.",
    author: "Sarah Jenkins",
    role: "Plant Manager",
    company: "Midwest Manufacturing"
  },
  {
    id: 3,
    quote: "The 10-year forecast allowed us to budget capital improvements accurately. No surprises. Just consistent performance.",
    author: "Robert Chen",
    role: "Asset Manager",
    company: "Tech Properties REIT"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-brand-black relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal width="100%">
            <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6 tracking-tight">
              Trusted by the Industry.
            </h2>
          </Reveal>
          <Reveal delay={0.2} width="100%">
            <p className="text-slate-400 text-lg font-light">
              We protect the assets of the world's most demanding facility managers.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <Reveal key={t.id} delay={idx * 0.1} width="100%">
              <div className="bg-white/[0.03] border border-white/5 p-10 h-full rounded-sm hover:border-white/15 transition-all duration-500 group flex flex-col">

                <div className="mb-8 flex-grow">
                  <p className="text-xl font-serif text-white leading-relaxed italic opacity-90">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-serif text-lg">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.author}</div>
                    <div className="text-xs text-slate-400 font-light mt-0.5">{t.role}, {t.company}</div>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};