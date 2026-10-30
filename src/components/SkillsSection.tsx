import React, { useState } from 'react';
import { SKILLS, SkillItem } from '../data/portfolioData';
import { Code, Terminal, Database, Brain, Sparkles, GitBranch, Cpu, Filter } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'Core AI / ML', 'Data & Infrastructure', 'Tools & Version Control'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code className="w-4 h-4 text-[#06B6D4]" />;
      case 'Core AI / ML':
        return <Brain className="w-4 h-4 text-[#8B5CF6]" />;
      case 'Data & Infrastructure':
        return <Database className="w-4 h-4 text-[#67E8F9]" />;
      case 'Tools & Version Control':
        return <GitBranch className="w-4 h-4 text-[#A78BFA]" />;
      default:
        return <Terminal className="w-4 h-4 text-[#06B6D4]" />;
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      {/* Background glow */}
      <div 
        className="pointer-events-none absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full blur-[160px] -z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(6, 182, 212, 0.15) 70%, transparent 90%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131722] border border-[#06B6D4]/30 text-xs font-mono text-[#67E8F9]">
              <Terminal className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>TECHNICAL COMPETENCIES & TOOLCHAINS</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
              Skills & Engineering Stack
            </h2>
            
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl">
              Core technical proficiency across low-level programming, relational querying, algorithmic machine learning, and generative AI systems.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#06B6D4] text-[#003640] font-semibold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-[#131722]/80 text-[#94A3B8] hover:text-[#F8FAFC] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group p-5 rounded-2xl bg-[#0E1017]/90 border border-white/10 hover:border-[#8B5CF6]/40 transition-all duration-300 space-y-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(139,92,246,0.15)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#131722] border border-white/5 group-hover:border-[#06B6D4]/30 transition-colors">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#67E8F9] transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#8B5CF6]/15 text-[#D0BCFF] border border-[#8B5CF6]/30">
                    {skill.experienceLevel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Bottom: Proficiency Bar & Project Attribution */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[#94A3B8]">Proficiency</span>
                    <span className="text-[#67E8F9] font-bold">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#131722] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] transition-all duration-700"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>

                {/* Applied In tags */}
                <div className="flex flex-wrap gap-1 items-center">
                  <span className="text-[10px] font-mono text-[#94A3B8] mr-1">Used in:</span>
                  {skill.appliedIn.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-[#CBC3D7] border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tech Architecture Callout */}
        <div className="p-6 rounded-2xl bg-[#131722]/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-[#F8FAFC]">
              Focused on Efficient, Modular AI Engineering
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl">
              From hardware-friendly C kernels and relational SQL query optimization to PyTorch deep neural models and LangChain/RAG pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3 py-1.5 rounded-lg bg-[#090A0F] border border-white/10 text-xs font-mono text-[#67E8F9]">
              Clean Code & CI/CD
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#090A0F] border border-white/10 text-xs font-mono text-[#A78BFA]">
              PyTorch / LangChain
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
