import React, { useState } from 'react';
import { Bot, Sparkles, GraduationCap, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAssistant: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAssistant,
  selectedModel,
  setSelectedModel,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'academics', label: 'Academics & Schools' },
    { id: 'admissions', label: 'Admissions 2025' },
    { id: 'aviation', label: 'Aviation Heritage' },
    { id: 'placements', label: 'Placements' },
    { id: 'master-prompt', label: 'Master Prompt Studio' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-slate-950 text-amber-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Admissions 2025</span>
          <span>HITSEEE 2025 Registrations Open • Up to 100% Merit Scholarships Available</span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-xs">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Toll-Free: 1800 425 44 38</span>
          <span className="bg-slate-950/20 px-2 py-0.5 rounded font-medium">NAAC A+ Accredited</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & University Identity */}
          <div 
            id="nav-logo"
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold font-['Outfit'] tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  HINDUSTAN
                </span>
                <span className="text-xs uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                  HITS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium">
                Institute of Technology & Science • Deemed University
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Hub & Model Selector */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Gemini Model Selector */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-1 flex items-center text-xs">
              <span className="text-[10px] text-slate-400 px-2 font-mono uppercase">Gemini:</span>
              <button
                onClick={() => setSelectedModel('gemini-4-hydrogen')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  selectedModel === 'gemini-4-hydrogen' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Gemini 4 Hydrogen"
              >
                4 Hydrogen
              </button>
              <button
                onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  selectedModel === 'gemini-3.1-flash-lite' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Gemini 3.1 Flash Lite"
              >
                Flash Lite
              </button>
            </div>

            {/* Launch RAG Assistant Button */}
            <button
              id="header-launch-assistant-btn"
              onClick={onOpenAssistant}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Hindustan AI</span>
              <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded-lg text-xs"
            >
              <Bot className="w-4 h-4" />
              <span>AI Chat</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-xs font-semibold ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800/60 text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Gemini Model:</span>
            <div className="flex gap-1">
              {[
                { id: 'gemini-4-hydrogen', label: '4 Hydrogen' },
                { id: 'gemini-3.1-flash-lite', label: 'Flash Lite' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`px-2.5 py-1 text-xs rounded font-bold ${
                    selectedModel === m.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
