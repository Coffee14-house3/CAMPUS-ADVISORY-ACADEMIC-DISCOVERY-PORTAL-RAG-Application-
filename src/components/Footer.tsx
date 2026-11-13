import React from 'react';
import { GraduationCap, Phone, Mail, MapPin, Globe, Shield, Heart, Award, ArrowUp } from 'lucide-react';
import { UNIVERSITY_INFO } from '../data/universityData';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenAssistant }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: University Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold font-['Outfit'] text-white tracking-tight">
                  HINDUSTAN UNIVERSITY
                </span>
                <p className="text-[11px] text-slate-400">
                  Hindustan Institute of Technology & Science (HITS)
                </p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              Deemed-to-be-University under Section 3 of the UGC Act, 1956. NAAC A+ accredited institution pioneering Aeronautical & Aerospace Sciences, AI Computing, Architecture, Law, and Management since 1985.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>1, Rajiv Gandhi Salai (OMR), Padur, Kelambakkam, Chennai - 603 103, Tamil Nadu, India.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Toll Free: <strong>1800 425 44 38</strong> / +91 44 2747 4262</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>admissions@hindustanuniv.ac.in</span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Schools */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-['Outfit'] text-sm uppercase tracking-wider">
              Schools of Study
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateTab('academics')} className="hover:text-amber-400 transition-colors">School of Aeronautical Sciences</button></li>
              <li><button onClick={() => onNavigateTab('academics')} className="hover:text-amber-400 transition-colors">School of Computing Sciences</button></li>
              <li><button onClick={() => onNavigateTab('academics')} className="hover:text-amber-400 transition-colors">School of Mechanical Sciences</button></li>
              <li><button onClick={() => onNavigateTab('academics')} className="hover:text-amber-400 transition-colors">School of Architecture (SPADE)</button></li>
              <li><button onClick={() => onNavigateTab('academics')} className="hover:text-amber-400 transition-colors">School of Management</button></li>
              <li><button onClick={() => onNavigateTab('academics')} className="hover:text-amber-400 transition-colors">HITS School of Law</button></li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-['Outfit'] text-sm uppercase tracking-wider">
              Admissions & RAG
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigateTab('admissions')} className="hover:text-amber-400 transition-colors">HITSEEE 2025 Registration</button></li>
              <li><button onClick={() => onNavigateTab('admissions')} className="hover:text-amber-400 transition-colors">Scholarship Criteria</button></li>
              <li><button onClick={() => onNavigateTab('aviation')} className="hover:text-amber-400 transition-colors">Aviation & Aircraft Labs</button></li>
              <li><button onClick={() => onNavigateTab('placements')} className="hover:text-amber-400 transition-colors">Recruiters & Placements</button></li>
              <li><button onClick={() => onNavigateTab('master-prompt')} className="hover:text-amber-400 transition-colors">Master Prompt Studio</button></li>
            </ul>
          </div>

          {/* Col 5: Accreditations & AI Assistant Status */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-['Outfit'] text-sm uppercase tracking-wider">
              Intelligence Engine
            </h4>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                RAG Pipeline Active
              </div>
              <p className="text-[11px] text-slate-400">
                Vector Storage: <strong>ChromaDB Cloud</strong> (internship)
              </p>
              <p className="text-[11px] text-slate-400">
                Inference: <strong>Google Gemini</strong>
              </p>
              <button
                onClick={onOpenAssistant}
                className="w-full mt-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 rounded-lg text-xs transition-colors"
              >
                Launch AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 border-t border-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Hindustan Institute of Technology and Science (HITS). All rights reserved. Deemed University.
          </p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="text-slate-500">Motto: "To Make Every Man a Success and No Man a Failure"</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
