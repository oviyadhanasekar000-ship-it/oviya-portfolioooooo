import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] relative selection:bg-[#8B5CF6]/30 selection:text-[#67E8F9] overflow-x-hidden">
      {/* Ambient background grid pattern */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40 z-0" />

      {/* Floating Header */}
      <Navbar onContactClick={() => scrollToSection('contact')} />

      {/* Main Content Layout */}
      <main className="relative z-10 space-y-4">
        {/* Hero Section */}
        <Hero
          onExploreProjects={() => scrollToSection('projects')}
          onContactClick={() => scrollToSection('contact')}
          onOpenResumeSummary={() => setIsResumeModalOpen(true)}
        />

        {/* Projects Section */}
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* Technical Skills Section */}
        <SkillsSection />

        {/* Academic Profile & Journey Section */}
        <AboutSection />

        {/* Contact & Connect Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
