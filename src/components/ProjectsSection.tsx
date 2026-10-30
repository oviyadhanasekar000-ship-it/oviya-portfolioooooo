import React, { useState } from 'react';
import { Project, PROJECTS } from '../data/portfolioData';
import { Sparkles, ArrowUpRight, Play, Cpu, Layers, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Computer Vision & Sequence Modeling', 'Generative AI & Financial NLP', 'Quantitative ML & Predictive Analytics', 'Semantic NLP & Talent Analytics'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[160px] -z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.2) 70%, transparent 90%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131722] border border-[#8B5CF6]/30 text-xs font-mono text-[#D0BCFF]">
              <Cpu className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>CORE ARCHITECTURES & PROTOTYPES</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
              Featured AI Systems
            </h2>
            
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl">
              Engineered concepts and prototypes addressing complex real-world challenges through deep neural networks, computer vision, and generative intelligence.
            </p>
          </div>

          <div className="text-xs font-mono text-[#67E8F9] flex items-center gap-1.5 self-start md:self-end">
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span>Click any project to launch interactive simulator</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.5)] font-medium'
                  : 'bg-[#131722]/70 text-[#94A3B8] hover:text-[#F8FAFC] border border-white/5 hover:border-white/15'
              }`}
            >
              {cat === 'All' ? 'All Projects (4)' : cat.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* 2x2 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer rounded-2xl bg-[#0E1017]/85 border border-white/10 p-6 sm:p-7 space-y-6 glass-panel-interactive transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle accent line on top edge */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Card Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#8B5CF6]/15 text-[#D0BCFF] border border-[#8B5CF6]/30">
                      {project.status}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-[#94A3B8]">
                      {project.category.split('&')[0].trim()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-[#F8FAFC] group-hover:text-[#67E8F9] transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#67E8F9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                </div>

                {/* Launch badge */}
                <div className="w-10 h-10 rounded-xl bg-[#131722] border border-white/10 flex items-center justify-center text-[#94A3B8] group-hover:text-white group-hover:bg-[#8B5CF6] group-hover:border-[#8B5CF6] transition-all shadow-sm">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
              </div>

              {/* Tagline & Summary */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#D0BCFF]">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-2">
                  {project.summary}
                </p>
              </div>

              {/* Key Architecture Bullet Points */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="text-[11px] font-mono text-[#67E8F9] uppercase tracking-wider">
                  Technical Architecture
                </div>
                <div className="space-y-1.5">
                  {project.architecture.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#CBC3D7]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmark Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#090A0F] border border-white/5">
                    <div className="text-[10px] font-mono text-[#94A3B8] truncate">{m.label}</div>
                    <div className="text-sm font-mono font-bold text-[#F8FAFC] mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#131722] text-[#94A3B8] border border-white/5 group-hover:border-white/15 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
