import React, { useState } from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Cpu, CheckCircle2, Layers, BarChart3, Play, Sparkles, AlertCircle, FileText, Check, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive' | 'architecture'>('interactive');

  // SignIQ interactive simulation state
  const [signGesture, setSignGesture] = useState<'hello' | 'thank_you' | 'welcome' | 'help'>('hello');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState<string | null>("Hello / Greetings (Confidence: 97.4%)");

  // TaxNova simulation state
  const [incomeAmount, setIncomeAmount] = useState<number>(850000);
  const [investment80C, setInvestment80C] = useState<number>(150000);
  const [healthInsurance80D, setHealthInsurance80D] = useState<number>(25000);

  // MarketMind simulation state
  const [selectedAsset, setSelectedAsset] = useState<'NVDA' | 'GOOGL' | 'MSFT' | 'TSLA'>('NVDA');

  // ATSPro simulation state
  const [atsScore, setAtsScore] = useState<number>(88);
  const [sampleResumeRole, setSampleResumeRole] = useState<'AI Engineer' | 'Data Scientist' | 'ML Researcher'>('AI Engineer');

  if (!project) return null;

  const triggerSignDetection = (gesture: 'hello' | 'thank_you' | 'welcome' | 'help') => {
    setSignGesture(gesture);
    setIsDetecting(true);
    setDetectionResult(null);

    setTimeout(() => {
      setIsDetecting(false);
      const mappings: Record<string, string> = {
        hello: "Recognized: 'Hello' // Landmark Confidence: 98.2% // Temporal F1: 0.96",
        thank_you: "Recognized: 'Thank You' // Landmark Confidence: 96.8% // Hand Arc: 44.2 deg",
        welcome: "Recognized: 'You are welcome' // Landmark Confidence: 95.1% // Motion Vector: Steady",
        help: "Recognized: 'Need Assistance' // Landmark Confidence: 99.1% // High Priority Flag"
      };
      setDetectionResult(mappings[gesture]);
    }, 450);
  };

  // Tax calculation helper
  const totalDeductions = Math.min(investment80C, 150000) + Math.min(healthInsurance80D, 50000) + 50000; // standard deduction
  const taxableIncome = Math.max(0, incomeAmount - totalDeductions);
  const estimatedSavings = Math.round(totalDeductions * 0.20);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop Dismiss Area */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Main Glass Dialog */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0E1017] border border-[#8B5CF6]/30 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between bg-[#131722]/80 backdrop-blur-xl">
          <div className="space-y-1 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium tracking-wide bg-[#8B5CF6]/20 text-[#D0BCFF] border border-[#8B5CF6]/30">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/5 text-[#94A3B8] border border-white/10">
                {project.status}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]">
              {project.title}
            </h2>
            <p className="text-sm text-[#94A3B8]">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 transition-colors"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#090A0F]/60 px-6">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`py-3 px-4 font-mono text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'interactive'
                ? 'border-[#06B6D4] text-[#67E8F9] bg-[#06B6D4]/5'
                : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Live Concept Simulator
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 font-mono text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#8B5CF6] text-[#D0BCFF] bg-[#8B5CF6]/5'
                : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Problem & Solution
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-4 font-mono text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'architecture'
                ? 'border-[#8B5CF6] text-[#D0BCFF] bg-[#8B5CF6]/5'
                : 'border-transparent text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Architecture Stack
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: INTERACTIVE CONCEPT SIMULATOR */}
          {activeTab === 'interactive' && (
            <div className="space-y-6">
              {project.demoType === 'signiq' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#131722] border border-[#06B6D4]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#06B6D4] uppercase flex items-center gap-1.5 font-semibold">
                        <Cpu className="w-4 h-4" /> Real-Time Hand Landmark Extraction Rig
                      </span>
                      <span className="text-xs font-mono text-[#94A3B8]">
                        Pipeline: MediaPipe ➔ Bi-LSTM Decoder
                      </span>
                    </div>

                    {/* Landmark Spatial Simulation Canvas Viewport */}
                    <div className="relative h-56 rounded-lg bg-[#090A0F] border border-white/10 flex items-center justify-center overflow-hidden">
                      {/* Grid background */}
                      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

                      {/* Mock landmark skeleton visual */}
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full text-[#06B6D4]" viewBox="0 0 200 200">
                          {/* Palm & Wrist */}
                          <circle cx="100" cy="160" r="4" fill="#8B5CF6" />
                          <circle cx="100" cy="115" r="4" fill="#06B6D4" />
                          <line x1="100" y1="160" x2="100" y2="115" stroke="#3B82F6" strokeWidth="2" />
                          
                          {/* Thumb */}
                          <circle cx="70" cy="130" r="3.5" fill="#67E8F9" />
                          <circle cx="50" cy="110" r="3.5" fill="#67E8F9" />
                          <line x1="100" y1="160" x2="70" y2="130" stroke="#06B6D4" strokeWidth="1.5" />
                          <line x1="70" y1="130" x2="50" y2="110" stroke="#06B6D4" strokeWidth="1.5" />

                          {/* Index finger */}
                          <circle cx="75" cy="70" r="3.5" fill="#67E8F9" />
                          <circle cx="65" cy="40" r="3.5" fill="#A78BFA" />
                          <line x1="100" y1="115" x2="75" y2="70" stroke="#8B5CF6" strokeWidth="1.5" />
                          <line x1="75" y1="70" x2="65" y2="40" stroke="#8B5CF6" strokeWidth="1.5" />

                          {/* Middle finger */}
                          <circle cx="100" cy="60" r="3.5" fill="#67E8F9" />
                          <circle cx="100" cy="30" r="3.5" fill="#A78BFA" />
                          <line x1="100" y1="115" x2="100" y2="60" stroke="#8B5CF6" strokeWidth="1.5" />
                          <line x1="100" y1="60" x2="100" y2="30" stroke="#8B5CF6" strokeWidth="1.5" />

                          {/* Ring finger */}
                          <circle cx="125" cy="70" r="3.5" fill="#67E8F9" />
                          <circle cx="135" cy="45" r="3.5" fill="#A78BFA" />
                          <line x1="100" y1="115" x2="125" y2="70" stroke="#8B5CF6" strokeWidth="1.5" />
                          <line x1="125" y1="70" x2="135" y2="45" stroke="#8B5CF6" strokeWidth="1.5" />

                          {/* Pinky */}
                          <circle cx="145" cy="95" r="3.5" fill="#67E8F9" />
                          <circle cx="160" cy="75" r="3.5" fill="#A78BFA" />
                          <line x1="100" y1="115" x2="145" y2="95" stroke="#8B5CF6" strokeWidth="1.5" />
                          <line x1="145" y1="95" x2="160" y2="75" stroke="#8B5CF6" strokeWidth="1.5" />
                        </svg>

                        {/* Landmark tracking pulse */}
                        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-[#090A0F]/80 text-[10px] font-mono text-[#67E8F9] border border-[#06B6D4]/30">
                          21 HAND POINTS TRACKED
                        </div>
                      </div>

                      {/* Inference Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 bg-[#131722]/90 border border-white/10 rounded-lg p-2.5 flex items-center justify-between font-mono text-xs">
                        <span className="text-[#94A3B8]">Active Sign: <strong className="text-white uppercase">{signGesture}</strong></span>
                        <span className="text-[#67E8F9]">
                          {isDetecting ? 'Processing temporal frames...' : (detectionResult || 'Ready for test gesture')}
                        </span>
                      </div>
                    </div>

                    {/* Interactive Gesture Switcher */}
                    <div className="pt-2">
                      <div className="text-xs font-mono text-[#94A3B8] mb-2">Simulate Input Gesture Stream:</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['hello', 'thank_you', 'welcome', 'help'] as const).map((gesture) => (
                          <button
                            key={gesture}
                            onClick={() => triggerSignDetection(gesture)}
                            className={`px-3 py-2 rounded-lg font-mono text-xs uppercase font-medium transition-all flex items-center justify-center gap-1.5 ${
                              signGesture === gesture
                                ? 'bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                                : 'bg-[#090A0F] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/10'
                            }`}
                          >
                            <Play className="w-3 h-3" />
                            {gesture.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.demoType === 'taxnova' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#131722] border border-[#8B5CF6]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#D0BCFF] uppercase flex items-center gap-1.5 font-semibold">
                        <Cpu className="w-4 h-4" /> AI Deduction & Exemption Engine Simulator
                      </span>
                      <span className="text-xs font-mono text-[#06B6D4]">
                        Rule Engine: Sec 80C / 80D / Std Deductions
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#94A3B8]">Annual Gross Income (₹)</label>
                        <input
                          type="number"
                          value={incomeAmount}
                          onChange={(e) => setIncomeAmount(Number(e.target.value) || 0)}
                          className="w-full bg-[#090A0F] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-[#F8FAFC] focus:border-[#8B5CF6] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#94A3B8]">Sec 80C Investments (₹)</label>
                        <input
                          type="number"
                          value={investment80C}
                          onChange={(e) => setInvestment80C(Number(e.target.value) || 0)}
                          className="w-full bg-[#090A0F] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-[#F8FAFC] focus:border-[#8B5CF6] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#94A3B8]">Sec 80D Health Cover (₹)</label>
                        <input
                          type="number"
                          value={healthInsurance80D}
                          onChange={(e) => setHealthInsurance80D(Number(e.target.value) || 0)}
                          className="w-full bg-[#090A0F] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-[#F8FAFC] focus:border-[#8B5CF6] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Calculated Outcome */}
                    <div className="p-4 rounded-lg bg-[#090A0F] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <div className="text-[11px] font-mono text-[#94A3B8]">Deduction Applied</div>
                        <div className="text-lg font-mono font-bold text-[#67E8F9]">₹{totalDeductions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-[#94A3B8]">Net Taxable Base</div>
                        <div className="text-lg font-mono font-bold text-[#F8FAFC]">₹{taxableIncome.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-[#94A3B8]">AI Estimated Tax Saved</div>
                        <div className="text-lg font-mono font-bold text-[#A78BFA]">₹{estimatedSavings.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.demoType === 'marketmind' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#131722] border border-[#06B6D4]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#06B6D4] uppercase flex items-center gap-1.5 font-semibold">
                        <BarChart3 className="w-4 h-4" /> Multi-Modal Sentiment & Forecasting Matrix
                      </span>
                      <div className="flex gap-1.5">
                        {(['NVDA', 'GOOGL', 'MSFT', 'TSLA'] as const).map((ticker) => (
                          <button
                            key={ticker}
                            onClick={() => setSelectedAsset(ticker)}
                            className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                              selectedAsset === ticker
                                ? 'bg-[#06B6D4] text-[#003640]'
                                : 'bg-[#090A0F] text-[#94A3B8] border border-white/10'
                            }`}
                          >
                            {ticker}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-lg bg-[#090A0F] border border-white/10">
                        <div className="text-[11px] font-mono text-[#94A3B8]">FinBERT Stance</div>
                        <div className="text-base font-mono font-bold text-[#67E8F9]">
                          {selectedAsset === 'NVDA' ? 'Bullish (+0.84)' : selectedAsset === 'GOOGL' ? 'Accumulate (+0.68)' : 'Neutral (+0.21)'}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#090A0F] border border-white/10">
                        <div className="text-[11px] font-mono text-[#94A3B8]">TFT Volatility Index</div>
                        <div className="text-base font-mono font-bold text-[#D0BCFF]">
                          {selectedAsset === 'NVDA' ? '28.4% (Moderate)' : '19.2% (Low)'}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#090A0F] border border-white/10">
                        <div className="text-[11px] font-mono text-[#94A3B8]">Model Confidence</div>
                        <div className="text-base font-mono font-bold text-[#F8FAFC]">94.2%</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#090A0F] border border-white/10">
                        <div className="text-[11px] font-mono text-[#94A3B8]">Monte Carlo VaR</div>
                        <div className="text-base font-mono font-bold text-[#ffb4ab]">3.8% (95% CI)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {project.demoType === 'atspro' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#131722] border border-[#8B5CF6]/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#D0BCFF] uppercase flex items-center gap-1.5 font-semibold">
                        <Cpu className="w-4 h-4" /> Semantic Resume Alignment Radar
                      </span>
                      <div className="flex gap-1.5">
                        {(['AI Engineer', 'Data Scientist', 'ML Researcher'] as const).map((role) => (
                          <button
                            key={role}
                            onClick={() => {
                              setSampleResumeRole(role);
                              setAtsScore(role === 'AI Engineer' ? 92 : role === 'Data Scientist' ? 88 : 84);
                            }}
                            className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                              sampleResumeRole === role
                                ? 'bg-[#8B5CF6] text-white'
                                : 'bg-[#090A0F] text-[#94A3B8] border border-white/10'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#090A0F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-xs font-mono text-[#94A3B8]">FAISS Vector Similarity Index</div>
                        <div className="text-2xl font-mono font-bold text-[#67E8F9]">{atsScore}% Match Score</div>
                        <div className="text-xs text-[#94A3B8]">
                          Evaluated against standard {sampleResumeRole} job specification benchmarks.
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 rounded bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-xs font-mono text-[#67E8F9] flex items-center gap-1">
                          <Check className="w-3 h-3" /> PyTorch Matched
                        </span>
                        <span className="px-2 py-1 rounded bg-[#06B6D4]/15 border border-[#06B6D4]/30 text-xs font-mono text-[#67E8F9] flex items-center gap-1">
                          <Check className="w-3 h-3" /> Vector RAG
                        </span>
                        <span className="px-2 py-1 rounded bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono text-[#D0BCFF] flex items-center gap-1">
                          <Check className="w-3 h-3" /> SQL Warehousing
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benchmark Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#131722]/80 border border-white/5">
                    <div className="text-xs font-mono text-[#94A3B8] uppercase">{m.label}</div>
                    <div className="text-xl font-bold font-mono text-[#F8FAFC] mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW & HIGHLIGHTS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-mono text-[#06B6D4] uppercase font-semibold">
                  Executive Summary
                </h4>
                <p className="text-sm sm:text-base text-[#CBC3D7] leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#131722]/60 border border-white/10 space-y-2">
                  <h5 className="text-xs font-mono text-[#ffb4ab] uppercase font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> The Challenge
                  </h5>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#131722]/60 border border-white/10 space-y-2">
                  <h5 className="text-xs font-mono text-[#67E8F9] uppercase font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> The AI Solution
                  </h5>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-sm font-mono text-[#D0BCFF] uppercase font-semibold">
                  Key Technical Highlights
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBC3D7]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-2 shrink-0 shadow-[0_0_6px_#06B6D4]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE STACK */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-mono text-[#06B6D4] uppercase font-semibold flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Subsystem Architecture
                </h4>
                <div className="space-y-2.5">
                  {project.architecture.map((arch, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#131722]/80 border border-white/10 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#8B5CF6]/20 text-[#D0BCFF] text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-[#8B5CF6]/40">
                        0{idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-[#CBC3D7] leading-relaxed">
                        {arch}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-sm font-mono text-[#D0BCFF] uppercase font-semibold">
                  Utilized Toolchains & Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-[#090A0F] border border-[#06B6D4]/30 text-xs font-mono text-[#67E8F9]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#131722]/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-[#94A3B8]">
            AI & Machine Learning Research Artifact
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs font-mono text-[#F8FAFC] bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center gap-1.5"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full text-xs font-mono font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
