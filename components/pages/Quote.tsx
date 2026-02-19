import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

// High-quality, reliable Unsplash images (Architecture/Minimalist)
const IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", // Tall glass building
  "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800", // Modern building angle
  "https://images.unsplash.com/photo-1460317442991-0ec2aa5a1195?auto=format&fit=crop&q=80&w=800", // Concrete detail
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"  // Office interior/clean
];

export const Quote: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'reroof', // default
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset form after 2 seconds or keep success state
    }, 1500);
  };

  return (
    <div className="pt-32 min-h-screen bg-brand-black text-white relative flex flex-col lg:flex-row">

      {/* Left: Form Section */}
      <div className="w-full lg:w-1/2 p-6 lg:p-24 flex flex-col justify-center relative z-10">
        <Reveal width="100%">
          <h1 className="text-5xl lg:text-7xl font-serif text-white mb-6">
            Start Your <br /> <span className="text-brand-gold italic">Project.</span>
          </h1>
          <p className="text-slate-400 mb-12 max-w-md font-light">
            Tell us about your roofing needs. We'll provide a comprehensive assessment and a detailed proposal.
          </p>
        </Reveal>

        <form onSubmit={handleSubmit} className="space-y-12 max-w-lg">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <InputGroup
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
            />
            <InputGroup
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>

          <InputGroup
            label="Work Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@company.com"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <InputGroup
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Corp"
            />
            <InputGroup
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Minimalist Select */}
          <div className="relative group">
            <label className="uppercase text-xs tracking-widest text-slate-500 mb-2 block font-semibold group-focus-within:text-brand-gold transition-colors">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer rounded-none"
            >
              <option value="reroof" className="bg-brand-black text-white">Commercial Reroof</option>
              <option value="repair" className="bg-brand-black text-white">Repair & Maintenance</option>
              <option value="inspection" className="bg-brand-black text-white">Inspection / Audit</option>
              <option value="new-construction" className="bg-brand-black text-white">New Construction</option>
            </select>
            <div className="absolute right-0 bottom-6 pointer-events-none text-white/20">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
          </div>

          <div className="relative group">
            <label className="uppercase text-xs tracking-widest text-slate-500 mb-2 block font-semibold group-focus-within:text-brand-gold transition-colors">Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your facility..."
              className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-white/10 rounded-none"
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className="group w-full md:w-auto px-12 py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-gold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
            >
              {status === 'submitting' ? (
                <span>Sending...</span>
              ) : status === 'success' ? (
                <>
                  <span>Request Sent</span>
                  <CheckCircle2 className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-400 text-sm flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                We'll be in touch shortly.
              </motion.p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Something went wrong. Please try again.
              </p>
            )}
          </div>

        </form>
      </div>

      {/* Right: Visual Section - Sticky, not Fixed */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-screen bg-brand-black/50">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-black z-20 pointer-events-none" />

          {/* Masonry Grid with reduced size/padding */}
          <div className="w-full h-full p-8 overflow-y-auto no-scrollbar opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            <div className="columns-2 gap-4 space-y-4">
              {[...IMAGES, ...IMAGES].map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.8 }}
                  className="break-inside-avoid"
                >
                  <img
                    src={img}
                    alt="Industrial Roofing"
                    className="w-full h-auto object-cover rounded-sm border border-white/5"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Reusable Minimalist Input Component
const InputGroup: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}> = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div className="relative group">
    <label
      htmlFor={name}
      className="uppercase text-xs tracking-widest text-slate-500 mb-2 block font-semibold group-focus-within:text-brand-gold transition-colors"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/10 rounded-none"
    />
  </div>
);
