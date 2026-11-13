import React, { useState } from 'react';
import { Bot, Sparkles, GraduationCap, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'academics', label: 'Academics & Schools' },
    { id: 'admissions', label: 'Admissions 2025' },
    { id: 'aviation', label: 'Aviation Heritage' },
    { id: 'placements', label: 'Placements' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-4 py-1 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-slate-950 text-amber-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Admissions 2025</span>
          <span>HITSEEE 2025 Registrations Open • Up to 100% Merit Scholarships Available</span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-xs">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Toll-Free: 1800 425 44 38</span>
          <span className="bg-slate-950/15 px-2 py-0.5 rounded font-medium">NAAC A+ Accredited</span>
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 border border-amber-400/40 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold font-['Outfit'] tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  HINDUSTAN
                </span>
                <span className="text-xs uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-mono font-bold">
                  HITS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-wide font-medium">
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
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  activeTab === item.id
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Hub */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Launch RAG Assistant Button */}
            <button
              id="header-launch-assistant-btn"
              onClick={onOpenAssistant}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Hindustan AI</span>
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
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
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-2">
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
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
