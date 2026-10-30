import React from 'react';
import { PORTFOLIO_OWNER, EDUCATION_MILESTONES } from '../data/portfolioData';
import { GraduationCap, BookOpen, Compass, Code, Brain, MapPin, Sparkles, ExternalLink } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 pb-4 border-b border-white/10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131722] border border-[#8B5CF6]/30 text-xs font-mono text-[#D0BCFF]">
            <GraduationCap className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>BACKGROUND & ACADEMIC GROUNDING</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
            About & Academic Journey
          </h2>
          
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl">
            Currently pursuing an undergraduate degree in Artificial Intelligence and Machine Learning at REVA University, Bengaluru.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Academic Profile & Story (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1017]/90 border border-white/10 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#8B5CF6]" />
                Building Practical Intelligence from First Principles
              </h3>
              
              <div className="space-y-4 text-sm sm:text-base text-[#CBC3D7] leading-relaxed">
                <p>
                  As an Artificial Intelligence and Machine Learning undergraduate at <span className="text-[#67E8F9] font-medium">REVA University, Bengaluru</span>, I focus on bridging theoretical algorithmic foundations with deployable, end-to-end intelligent systems.
                </p>
                <p>
                  My work spans computer vision, sequence modeling, and generative AI. Whether developing gesture recognition pipelines with <span className="text-white font-medium">SignIQ</span>, building intelligent financial deduction systems with <span className="text-white font-medium">TaxNova</span>, or forecasting market volatility with <span className="text-white font-medium">MarketMind</span>, I prioritize computational efficiency, interpretability, and robust software engineering practices.
                </p>
                <p>
                  I write clean, modular code across <span className="text-[#A78BFA] font-medium">Python, C, and SQL</span>, pairing algorithmic rigor with Git/GitHub collaborative version control.
                </p>
              </div>

              {/* Focus Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-[#131722] border border-white/5 space-y-1">
                  <div className="text-xs font-mono text-[#06B6D4] font-semibold">01 // Computer Vision</div>
                  <div className="text-xs text-[#94A3B8]">Spatial keypoint extraction, gesture translation & MediaPipe</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131722] border border-white/5 space-y-1">
                  <div className="text-xs font-mono text-[#8B5CF6] font-semibold">02 // Generative AI</div>
                  <div className="text-xs text-[#94A3B8]">Document RAG, LLM orchestration & prompt pipelines</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131722] border border-white/5 space-y-1">
                  <div className="text-xs font-mono text-[#67E8F9] font-semibold">03 // Predictive ML</div>
                  <div className="text-xs text-[#94A3B8]">Time-series volatility, FinBERT NLP & risk modeling</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Education Timeline Card (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* University Card */}
            <div className="p-6 rounded-2xl bg-[#0E1017]/90 border border-white/10 space-y-5">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-[#131722] border border-[#06B6D4]/30 text-[#06B6D4]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#8B5CF6]/15 text-[#D0BCFF] border border-[#8B5CF6]/30">
                  Undergraduate
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#F8FAFC]">
                  {PORTFOLIO_OWNER.institution}
                </h4>
                <div className="text-sm font-medium text-[#67E8F9]">
                  {PORTFOLIO_OWNER.degree}
                </div>
                <div className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2.5">
                <div className="text-xs font-mono text-[#D0BCFF] uppercase font-semibold">
                  Key Focus Areas
                </div>
                <ul className="space-y-2 text-xs text-[#94A3B8]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-1.5 shrink-0" />
                    <span>Neural Networks & Deep Learning Architectures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-1.5 shrink-0" />
                    <span>Data Structures, Analysis & Systems Programming (C & Python)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-1.5 shrink-0" />
                    <span>Relational Database Management (SQL) & Data Science</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-1.5 shrink-0" />
                    <span>Natural Language Processing & Generative Models</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <div className="p-3 rounded-xl bg-[#090A0F] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#94A3B8]">Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Enrolled & Active Student
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
