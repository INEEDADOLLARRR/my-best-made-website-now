import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { OTHER_SERVICES } from '../../data/services';

interface NavbarProps {
  isPreloading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isPreloading = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Insights', path: '/blog' },
    { name: 'Safety', path: '/#safety' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Careers', path: '/#careers' }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-black/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center min-h-[40px]">
        {/* Logo - Only renders its contents here when not preloading to allow layout transition */}
        <div className="relative z-50 flex items-center">
          {!isPreloading && (
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity whitespace-nowrap font-serif">
              D. C. Taylor <span className="text-brand-blue">Co.</span>
            </Link>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {/* Services Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link
              to="/more-services"
              className={`flex items-center gap-1 transition-colors py-2 ${location.pathname === '/more-services' ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
            >
              More Services
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </Link>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 w-64 pt-4"
                >
                  <div className="bg-brand-black/98 backdrop-blur-2xl border border-white/5 rounded-sm p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
                    <div className="relative space-y-0">
                      {OTHER_SERVICES.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          onClick={() => setShowDropdown(false)}
                          className="group block py-3 px-4 rounded-sm hover:bg-white/[0.03] transition-colors"
                        >
                          <span className="text-white text-sm font-serif group-hover:text-brand-gold transition-colors block">
                            {service.title}
                          </span>
                        </Link>
                      ))}
                      <div className="mt-2 pt-2 border-t border-white/5">
                        <Link
                          to="/more-services"
                          className="block text-center text-[9px] uppercase tracking-[0.3em] text-brand-gold hover:text-white transition-colors py-2 font-bold"
                        >
                          View All Expertise
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navItems.map((item) => (
            item.path.startsWith('/#') ? (
              <a
                key={item.name}
                href={item.path.replace('/', '')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors ${location.pathname === item.path ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-brand-black border-t border-white/10 overflow-hidden lg:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8 px-6">
              <Link
                to="/more-services"
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${location.pathname === '/more-services' ? 'text-white' : 'text-slate-300'
                  }`}
              >
                More Services
              </Link>
              {navItems.map((item) => (
                item.path.startsWith('/#') ? (
                  <a
                    key={item.name}
                    href={item.path.replace('/', '')}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-300"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium ${location.pathname === item.path ? 'text-white' : 'text-slate-300'
                      }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};