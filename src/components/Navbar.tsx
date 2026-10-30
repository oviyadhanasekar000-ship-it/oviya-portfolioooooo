import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Sparkles, Mail } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'skills', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Overview', id: 'hero' },
    { label: 'Projects', id: 'projects' },
    { label: 'Technical Skills', id: 'skills' },
    { label: 'Profile & Research', id: 'about' },
    { label: 'Connect', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300">
      <nav className={`max-w-7xl mx-auto rounded-full transition-all duration-300 border ${
        isScrolled
          ? 'bg-[#0E1017]/85 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] py-2.5 px-4 sm:px-6'
          : 'bg-[#131722]/50 backdrop-blur-md border-white/5 py-3 px-4 sm:px-6'
      } flex items-center justify-between`}>
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 text-left group transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] p-[1px] shadow-[0_0_12px_rgba(139,92,246,0.3)]">
            <div className="w-full h-full bg-[#090A0F] rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-[#67E8F9] group-hover:text-white transition-colors">
              OD
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-[#F8FAFC] group-hover:text-[#67E8F9] transition-colors">
              Oviya Dhanasekar
            </span>
            <span className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">
              AI & ML Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                activeSection === item.id
                  ? 'text-[#67E8F9] bg-[#06B6D4]/10 border border-[#06B6D4]/30'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onContactClick}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all transform active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-[#0E1017]/95 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl animate-fadeIn space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                activeSection === item.id
                  ? 'text-[#67E8F9] bg-[#06B6D4]/15 border border-[#06B6D4]/30 font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5'
              }`}
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          ))}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-mono font-medium text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch (oviyadhanasekar000@gmail.com)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
