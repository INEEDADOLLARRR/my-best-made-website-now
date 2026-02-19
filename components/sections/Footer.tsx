import React from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Main CTA */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <h2 className="text-4xl lg:text-6xl font-serif text-white tracking-tight max-w-4xl text-balance">
            Ready to secure your assets?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl font-light">
            Join the facility managers who sleep soundly when it rains. Start with a free consultation.
          </p>
          <Link to="/quote" className="px-10 py-5 bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-brand-gold transition-all flex items-center gap-3">
            Get Your Free Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 border-t border-white/5 pt-16">
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-white">D. C. Taylor Co.</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Industrial roofing experts with 75 years of experience. Safety, integrity, and performance.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4">Services</h4>
            <ul className="space-y-2 text-slate-500 text-sm font-light">
              <li><Link to="/more-services" className="magnetic-link hover:text-brand-gold transition-colors">Commercial Reroof</Link></li>
              <li><Link to="/more-services" className="magnetic-link hover:text-brand-gold transition-colors">Repairs & Maintenance</Link></li>
              <li><Link to="/more-services" className="magnetic-link hover:text-brand-gold transition-colors">Fall Protection</Link></li>
              <li><Link to="/more-services" className="magnetic-link hover:text-brand-gold transition-colors">Emergency Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4">Insights</h4>
            <ul className="space-y-2 text-slate-500 text-sm font-light">
              <li><Link to="/blog" className="magnetic-link hover:text-brand-gold transition-colors">All Articles</Link></li>
              <li><Link to="/blog?category=Maintenance" className="magnetic-link hover:text-brand-gold transition-colors">Maintenance</Link></li>
              <li><Link to="/blog?category=Safety" className="magnetic-link hover:text-brand-gold transition-colors">Safety</Link></li>
              <li><Link to="/blog?category=Technology" className="magnetic-link hover:text-brand-gold transition-colors">Technology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4">Locations</h4>
            <ul className="space-y-2 text-slate-500 text-sm font-light">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Cedar Rapids, IA (HQ)</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Chicago, IL</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Phoenix, AZ</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Concord, CA</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-500 text-sm font-light">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (319) 363-2073</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@dctaylorco.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-light">
          <p>© {new Date().getFullYear()} D. C. Taylor Co. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="magnetic-link cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="magnetic-link cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            <a href="/sitemap.xml" className="magnetic-link cursor-pointer hover:text-white transition-colors">Sitemap</a>
            <span className="magnetic-link cursor-pointer hover:text-white transition-colors">Safety Record</span>
          </div>
        </div>
      </div>
    </footer>
  );
};