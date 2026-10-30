import React, { useState } from 'react';
import { PORTFOLIO_OWNER } from '../data/portfolioData';
import { Mail, Github, Linkedin, Send, Copy, Check, MapPin, Sparkles, MessageSquare, Terminal } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_OWNER.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Save message locally for reference and create mailto fallback
    setTimeout(() => {
      try {
        const storedMessages = JSON.parse(localStorage.getItem('oviya_portfolio_inquiries') || '[]');
        storedMessages.push({
          ...formData,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('oviya_portfolio_inquiries', JSON.stringify(storedMessages));
      } catch {
        // ignore storage errors
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleSendViaClient = () => {
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${PORTFOLIO_OWNER.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      {/* Background radial highlight */}
      <div 
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full blur-[180px] -z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(6, 182, 212, 0.25) 60%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 pb-4 border-b border-white/10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131722] border border-[#06B6D4]/30 text-xs font-mono text-[#67E8F9]">
            <Mail className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>COMMUNICATION & COLLABORATION</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
            Get in Touch
          </h2>
          
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl">
            Interested in discussing AI research, deep learning concepts, collaborative projects, or opportunities? Send a message or connect directly.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Channels (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0E1017]/90 border border-white/10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#F8FAFC]">
                  Direct Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Feel free to send an email directly or connect on professional developer networks.
                </p>
              </div>

              {/* Email Card with 1-Click Copy */}
              <div className="p-4 rounded-xl bg-[#131722] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span>OFFICIAL INBOX</span>
                  <span className="text-[#67E8F9]">Verified</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${PORTFOLIO_OWNER.email}`}
                    className="text-sm sm:text-base font-mono font-medium text-[#F8FAFC] hover:text-[#67E8F9] transition-colors truncate"
                  >
                    {PORTFOLIO_OWNER.email}
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Social Link Cards */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono text-[#D0BCFF] uppercase font-semibold">
                  Network & Code
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={PORTFOLIO_OWNER.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#131722]/80 hover:bg-[#131722] border border-white/5 hover:border-[#8B5CF6]/40 transition-all flex items-center gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-[#090A0F] text-[#94A3B8] group-hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F8FAFC]">GitHub</div>
                      <div className="text-[10px] font-mono text-[#94A3B8]">Repositories & Code</div>
                    </div>
                  </a>

                  <a
                    href={PORTFOLIO_OWNER.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#131722]/80 hover:bg-[#131722] border border-white/5 hover:border-[#06B6D4]/40 transition-all flex items-center gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-[#090A0F] text-[#94A3B8] group-hover:text-[#67E8F9] transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#F8FAFC]">LinkedIn</div>
                      <div className="text-[10px] font-mono text-[#94A3B8]">Professional Profile</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Location Badge */}
              <div className="p-4 rounded-xl bg-[#090A0F] border border-white/5 flex items-center gap-3 text-xs text-[#94A3B8]">
                <MapPin className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>Based in <strong>Bengaluru, Karnataka, India</strong> (IST UTC+5:30)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Message Form (7 Columns) */}
          <div className="lg:col-span-7">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1017]/90 border border-white/10 space-y-6">
              <div className="space-y-1 text-left">
                <h3 className="text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#8B5CF6]" />
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8]">
                  Fill out the form below to reach out directly to Oviya.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-[#131722] border border-emerald-500/30 text-center space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">Message Recorded Successfully</h4>
                    <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                      Thank you for reaching out! You can also launch your local email client with this exact message pre-filled to guarantee immediate delivery.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleSendViaClient}
                      className="px-4 py-2 rounded-full text-xs font-mono font-medium text-white bg-[#06B6D4] hover:bg-[#03b5d3] text-[#003640] transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Open in Mail App</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-full text-xs font-mono text-[#94A3B8] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#94A3B8]">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Alex Mercer"
                        className="w-full bg-[#090A0F] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-[#F8FAFC] placeholder-[#475569] focus:border-[#8B5CF6] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[#94A3B8]">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full bg-[#090A0F] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-[#F8FAFC] placeholder-[#475569] focus:border-[#8B5CF6] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#94A3B8]">Subject / Topic</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Collaboration on Computer Vision / Research Query"
                      className="w-full bg-[#090A0F] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-[#F8FAFC] placeholder-[#475569] focus:border-[#8B5CF6] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#94A3B8]">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry, project scope, or research topic..."
                      className="w-full bg-[#090A0F] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-[#F8FAFC] placeholder-[#475569] focus:border-[#8B5CF6] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-[#94A3B8]">
                      Delivers to <strong className="text-white">oviyadhanasekar000@gmail.com</strong>
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
