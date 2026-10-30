import React from 'react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#090A0F] py-12 text-[#94A3B8] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#131722] border border-white/10 flex items-center justify-center font-bold text-xs text-[#67E8F9]">
              OD
            </div>
            <div className="text-left">
              <div className="font-bold text-sm text-[#F8FAFC]">Oviya Dhanasekar</div>
              <div className="text-[11px] text-[#A78BFA]">REVA University, Bengaluru // AI & ML</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_OWNER.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#131722] hover:bg-[#191e2d] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/5 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_OWNER.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#131722] hover:bg-[#191e2d] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/5 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PORTFOLIO_OWNER.email}`}
              className="p-2 rounded-lg bg-[#131722] hover:bg-[#191e2d] text-[#94A3B8] hover:text-[#67E8F9] border border-white/5 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#D0BCFF] border border-[#8B5CF6]/40 transition-colors flex items-center gap-1.5 ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px]">
          <div>
            © {new Date().getFullYear()} Oviya Dhanasekar. All rights reserved. Built with precision and care.
          </div>

          <div className="flex items-center gap-2 text-[#67E8F9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shadow-[0_0_6px_#06B6D4]" />
            <span>SYNTHETIC VANGUARD DESIGN SYSTEM // LIVE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
