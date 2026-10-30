import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { NeuralNetworkCanvas } from './NeuralNetworkCanvas';
import { ArrowRight, Code2, Sparkles, MapPin, GraduationCap, Github, Linkedin, Mail, Upload, Camera, Check } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
  onOpenResumeSummary: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onContactClick,
  onOpenResumeSummary,
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom uploaded profile photo from localStorage if present
  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem('oviya_portfolio_profile_photo');
      if (savedPhoto) {
        setProfileImage(savedPhoto);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setProfileImage(result);
        try {
          localStorage.setItem('oviya_portfolio_profile_photo', result);
        } catch {
          // ignore storage quota error
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_OWNER.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full blur-[140px] -z-10 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(6, 182, 212, 0.2) 60%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Bio & Action Buttons (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#131722]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#D0BCFF]">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
              <span className="tracking-wide uppercase">Undergraduate AI & ML Researcher</span>
              <span className="text-white/20">|</span>
              <span className="text-[#67E8F9] flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" /> REVA University
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.1]">
                Engineering Intelligent Systems with{' '}
                <span className="bg-gradient-to-r from-[#A78BFA] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                  Neural Precision
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed font-sans">
                I am <span className="text-white font-medium">Oviya Dhanasekar</span>, a B.Tech Artificial Intelligence and Machine Learning student at <span className="text-[#67E8F9] font-medium">REVA University, Bengaluru</span>. Building production-oriented machine learning pipelines, deep learning architectures, and generative AI systems.
              </p>
            </div>

            {/* Action Buttons & Social CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={onExploreProjects}
                className="group px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:shadow-[0_0_28px_rgba(139,92,246,0.55)] transition-all flex items-center gap-2 transform active:scale-95"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenResumeSummary}
                className="px-5 py-3 rounded-full text-xs sm:text-sm font-mono text-[#E2E2EC] bg-[#131722]/60 hover:bg-[#131722] border border-white/10 hover:border-[#06B6D4]/40 transition-all flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-[#06B6D4]" />
                <span>Profile & Curriculum</span>
              </button>

              <button
                onClick={copyEmail}
                className="px-4 py-3 rounded-full text-xs font-mono text-[#94A3B8] hover:text-[#67E8F9] bg-[#0E1017] border border-white/10 hover:border-[#06B6D4]/30 transition-all flex items-center gap-1.5"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied Email!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Benchmark Highlights / Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              {PORTFOLIO_OWNER.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#131722]/40 border border-white/5">
                  <div className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-[#F8FAFC] mt-0.5">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Profile Identity Card & 3D Neural Network Manifold (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Profile Avatar Card with Cyan/Violet Ambient Halo */}
            <div className="relative p-5 rounded-2xl bg-[#0E1017]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                {/* Profile Photo Display Frame */}
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#8B5CF6]/50 p-1 bg-[#131722] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Oviya Dhanasekar Profile" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#131722] via-[#1a1f30] to-[#0e1017] rounded-xl flex flex-col items-center justify-center text-center p-2">
                        <span className="font-mono font-bold text-lg text-[#67E8F9]">OD</span>
                        <span className="text-[9px] font-mono text-[#94A3B8] mt-0.5">AI Researcher</span>
                      </div>
                    )}
                  </div>

                  {/* Photo Upload Overlay Button (User requested not replacing actual photo with generated image, so we empower real user upload!) */}
                  <label 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#8B5CF6] text-white hover:bg-[#7C3AED] cursor-pointer shadow-lg transition-transform hover:scale-110"
                    title="Upload or update your actual profile photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>

                {/* Identity Summary Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#F8FAFC]">Oviya Dhanasekar</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" title="Available for AI/ML opportunities" />
                  </div>
                  <div className="text-xs font-mono text-[#A78BFA]">
                    B.Tech AIML Candidate
                  </div>
                  <div className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#06B6D4]" /> Bengaluru, India
                  </div>
                  
                  {/* Social Quick Links */}
                  <div className="flex items-center gap-2 pt-1.5">
                    <a
                      href={PORTFOLIO_OWNER.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={PORTFOLIO_OWNER.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`mailto:${PORTFOLIO_OWNER.email}`}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#67E8F9] transition-colors"
                      title="Direct Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive 3D Neural Network Visual */}
            <div className="relative">
              <NeuralNetworkCanvas interactive={true} />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
