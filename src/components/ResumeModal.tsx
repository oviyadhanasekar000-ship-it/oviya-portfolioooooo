import React from 'react';
import { PORTFOLIO_OWNER, PROJECTS, SKILLS } from '../data/portfolioData';
import { X, Printer, Download, GraduationCap, MapPin, Mail, Github, Linkedin, ExternalLink, Code2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0E1017] border border-[#8B5CF6]/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#131722]/80 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#8B5CF6]/20 text-[#D0BCFF]">
              <Code2 className="w-4 h-4" />
            </span>
            <span className="font-mono text-xs font-semibold text-[#F8FAFC]">
              CURRICULUM VITAE // OVIYA DHANASEKAR
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#E2E2EC] bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#67E8F9]" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left font-sans bg-[#090A0F] text-[#E2E2EC]">
          
          {/* Document Header */}
          <div className="border-b border-white/10 pb-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                {PORTFOLIO_OWNER.name}
              </h1>
              <span className="font-mono text-xs text-[#06B6D4]">
                Bengaluru, Karnataka, India
              </span>
            </div>

            <p className="text-xs sm:text-sm font-mono text-[#D0BCFF]">
              B.Tech in Artificial Intelligence & Machine Learning // REVA University
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-1">
              <a href={`mailto:${PORTFOLIO_OWNER.email}`} className="hover:text-[#67E8F9] flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#06B6D4]" />
                {PORTFOLIO_OWNER.email}
              </a>
              <a href={PORTFOLIO_OWNER.socials.github} target="_blank" rel="noreferrer" className="hover:text-[#67E8F9] flex items-center gap-1">
                <Github className="w-3 h-3 text-[#8B5CF6]" />
                github.com/oviyadhanasekar
              </a>
              <a href={PORTFOLIO_OWNER.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#67E8F9] flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-[#A78BFA]" />
                linkedin.com/in/oviya-dhanasekar
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider">
              EDUCATION
            </h2>
            <div className="p-4 rounded-xl bg-[#0E1017] border border-white/5 space-y-1">
              <div className="flex justify-between items-baseline">
                <strong className="text-sm text-white">REVA University, Bengaluru</strong>
                <span className="text-xs font-mono text-[#94A3B8]">Current Undergraduate</span>
              </div>
              <div className="text-xs font-mono text-[#A78BFA]">
                Bachelor of Technology (B.Tech) — Artificial Intelligence & Machine Learning
              </div>
              <p className="text-xs text-[#94A3B8] pt-1 leading-relaxed">
                Core coursework: Neural Networks, Computer Vision, Pattern Classification, Relational Databases, Advanced Data Structures, and Systems Programming.
              </p>
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider">
              TECHNICAL COMPETENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#0E1017] border border-white/5">
                <span className="font-mono text-[#D0BCFF] block mb-1">Programming Languages:</span>
                <span className="text-[#CBC3D7]">Python, C, SQL</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0E1017] border border-white/5">
                <span className="font-mono text-[#D0BCFF] block mb-1">AI & Machine Learning:</span>
                <span className="text-[#CBC3D7]">Deep Learning, Generative AI, Computer Vision, Data Science</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0E1017] border border-white/5">
                <span className="font-mono text-[#D0BCFF] block mb-1">Frameworks & Libraries:</span>
                <span className="text-[#CBC3D7]">PyTorch, TensorFlow, OpenCV, MediaPipe, LangChain, FAISS</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0E1017] border border-white/5">
                <span className="font-mono text-[#D0BCFF] block mb-1">Tools & Platforms:</span>
                <span className="text-[#CBC3D7]">Git, GitHub, Linux, Jupyter, Vector Databases</span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider">
              FEATURED ENGINEERING PROJECTS
            </h2>

            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-[#0E1017] border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-[#F8FAFC]">
                      {proj.title} <span className="font-normal text-xs text-[#94A3B8]">— {proj.tagline}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#D0BCFF]">{proj.status}</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#67E8F9]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#131722]/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-mono font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
