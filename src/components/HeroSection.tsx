import React, { useState } from 'react';
import { Bot, Sparkles, Plane, GraduationCap, Award, Compass, Search, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { UNIVERSITY_INFO } from '../data/universityData';

interface HeroSectionProps {
  onAskAI: (query: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAskAI, onNavigateTab }) => {
  const [heroSearch, setHeroSearch] = useState('');

  const quickPrompts = [
    'HITSEEE 2025 eligibility & dates',
    'Aeronautical Boeing & Cessna labs',
    'B.Tech CSE AI-ML fee structure',
    'Highest placement packages & companies',
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onAskAI(heroSearch.trim());
      setHeroSearch('');
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden pt-8 pb-16 border-b border-slate-800">
      {/* Background Subtle Grid & Aviation Light Orb */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Accreditation Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Award className="w-3.5 h-3.5" /> NAAC A+ Grade (3.35 CGPA)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Category-I Deemed University
          </span>
          <span className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-medium">
            <Plane className="w-3.5 h-3.5 text-sky-400" /> India's Pioneer in Aviation & Aerospace
          </span>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit'] tracking-tight leading-[1.15]">
            Empowering Future Pioneers at{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Hindustan University
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Hindustan Institute of Technology & Science (HITS), Chennai. World-class education in Aeronautical Sciences, AI & Computing, Architecture, Law, and Management backed by intelligent AI Admissions Guidance.
          </p>
        </div>

        {/* Interactive RAG Quick Search Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <form
            onSubmit={handleHeroSubmit}
            className="bg-slate-900/90 border-2 border-amber-500/40 rounded-2xl p-2 sm:p-2.5 shadow-2xl shadow-amber-500/10 flex flex-col sm:flex-row items-center gap-2 backdrop-blur-xl focus-within:border-amber-400 transition-all"
          >
            <div className="flex items-center w-full px-3 gap-2">
              <Bot className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Ask anything (e.g. 'What is the fee for Aeronautical Engineering and hostel?')"
                className="w-full bg-transparent border-none text-sm text-slate-100 placeholder-slate-400 focus:outline-none py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 whitespace-nowrap shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <span>Ask AI RAG</span>
              <Sparkles className="w-4 h-4 text-slate-950" />
            </button>
          </form>

          {/* Quick Click Prompts */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-[11px] text-slate-500">Try asking:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => onAskAI(prompt)}
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-amber-400 px-3 py-1 rounded-full border border-slate-700/60 transition-colors text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigateTab('admissions')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <span>Apply for Admissions 2025</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateTab('academics')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Explore 50+ Programs</span>
          </button>

          <button
            onClick={() => onNavigateTab('aviation')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
          >
            <Plane className="w-4 h-4 text-sky-400" />
            <span>Aircraft Fleet & Labs</span>
          </button>
        </div>

        {/* Key Statistics Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Outfit']">₹42.5 LPA</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Highest Placement Package</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Outfit']">94.5%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Consistent Placement Record</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Outfit']">100+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Global Partner Universities</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Outfit']">100+ Acres</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Lush Green Campus on OMR</div>
          </div>
        </div>
      </div>
    </div>
  );
};
