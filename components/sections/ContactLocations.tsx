import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { motion } from 'framer-motion';

const LOCATIONS = [
  { city: "Cedar Rapids, IA", top: "35%", left: "55%" },
  { city: "Chicago, IL", top: "33%", left: "60%" },
  { city: "Phoenix, AZ", top: "60%", left: "25%" },
  { city: "Concord, CA", top: "40%", left: "10%" },
];

export const ContactLocations: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-brand-black relative overflow-hidden border-t border-white/5">

      {/* Background Map Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Map_of_USA_with_state_names_2.svg/2000px-Map_of_USA_with_state_names_2.svg.png"
          alt="US Map"
          className="w-full h-full object-cover grayscale invert contrast-125 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Headline & CTA */}
        <div className="text-center mb-20 space-y-8">
          <Reveal width="100%">
            <h2 className="text-5xl lg:text-7xl font-serif text-white tracking-tight leading-none">
              Got a Roof Problem? <br />
              <span className="text-brand-gold italic">Need a Quote?</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2} width="100%">
            <button
              onClick={() => document.getElementById('contact-card')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-brand-gold text-black uppercase tracking-widest text-sm font-semibold hover:bg-white transition-all hover:scale-105 flex items-center gap-3 mx-auto"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[600px]">

          {/* Map Visualization Area */}
          <div className="hidden lg:block w-2/3 relative rounded-none border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              {/* Abstract Map Representation for Desktop */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/1280px-Blank_US_Map_%28states_only%29.svg.png"
                className="w-[90%] h-auto object-contain invert opacity-40"
                alt="Service Map"
              />
            </div>

            {/* Location Pins */}
            {LOCATIONS.map((loc, idx) => (
              <motion.div
                key={idx}
                className="absolute w-4 h-4"
                style={{ top: loc.top, left: loc.left }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-brand-gold rounded-full relative z-10 cursor-pointer hover:scale-150 transition-transform" />

                  {/* Tooltip */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-black border border-white/10 text-white text-xs px-3 py-1 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {loc.city}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-8 left-8">
              <div className="text-white font-serif text-2xl">Nationwide Service</div>
              <p className="text-slate-400 text-sm font-light">Strategic hubs serving all 50 states.</p>
            </div>
          </div>

          {/* Contact Card Hub */}
          <div id="contact-card" className="w-full lg:w-1/3 flex flex-col gap-6">

            {/* Emergency Box */}
            <Reveal width="100%">
              <div className="bg-red-900/20 border border-red-500/20 p-8 shadow-2xl relative overflow-hidden group transition-colors hover:bg-red-900/30">
                <div className="relative z-10 text-white">
                  <div className="flex items-center gap-3 mb-2 opacity-90">
                    <Phone className="w-4 h-4 text-red-500" />
                    <span className="tracking-widest text-xs uppercase text-red-400">Emergency Service</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-1">24/7 Rapid Response</h3>
                  <a href="tel:3193632073" className="magnetic-link text-xl font-light hover:text-red-400 transition-colors">
                    319.363.2073
                  </a>
                  <p className="text-slate-400 text-sm mt-4 leading-relaxed font-light">
                    Fire, wind, hail, or collapse. Our team is ready to deploy immediately.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* General Inquiries */}
            <Reveal width="100%" delay={0.2}>
              <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-md flex-1 flex flex-col justify-center">
                <h4 className="text-white font-serif text-lg mb-6 border-b border-white/10 pb-4">Department Directory</h4>

                <div className="space-y-6">
                  <div className="group cursor-pointer">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Career Inquiries</div>
                    <a href="mailto:jobs@dctaylorco.com" className="magnetic-link text-white font-light flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                      jobs@dctaylorco.com
                    </a>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Media Inquiries</div>
                    <a href="mailto:communications@dctaylorco.com" className="magnetic-link text-white font-light flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                      communications@dctaylorco.com
                    </a>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">General Inquiries</div>
                    <a href="mailto:info@dctaylorco.com" className="magnetic-link text-white font-light flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                      info@dctaylorco.com
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Newsletter Mini */}
            <Reveal width="100%" delay={0.3}>
              <div className="bg-white/5 border border-white/10 p-6">
                <h5 className="text-white font-serif text-sm mb-3">Join Our Newsletter</h5>
                <div className="flex gap-0">
                  <input type="email" placeholder="Email address" className="bg-transparent border-b border-white/20 px-0 py-2 text-sm text-white flex-1 focus:outline-none focus:border-brand-gold placeholder:text-white/20" />
                  <button className="text-brand-gold uppercase text-xs font-bold hover:text-white transition-colors pl-4">
                    Join
                  </button>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
};