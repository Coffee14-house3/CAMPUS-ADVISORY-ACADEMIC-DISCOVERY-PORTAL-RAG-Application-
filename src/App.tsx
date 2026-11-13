import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RagAssistant } from './components/RagAssistant';
import { AcademicsSection } from './components/AcademicsSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { AviationHeritageSection } from './components/AviationHeritageSection';
import { PlacementsSection } from './components/PlacementsSection';
import { RagAssistantModal } from './components/RagAssistantModal';
import { Footer } from './components/Footer';
import { Bot, Sparkles, Plane, GraduationCap, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState<boolean>(false);
  const [pendingQuery, setPendingQuery] = useState<string | undefined>(undefined);

  const handleAskAI = (query: string) => {
    setPendingQuery(query);
    setIsAssistantModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-amber-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAssistant={() => setIsAssistantModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-0">
            {/* Hero Section */}
            <HeroSection
              onAskAI={handleAskAI}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />

            {/* Embedded Live RAG Interactive Terminal Showcase */}
            <div className="py-14 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-mono font-bold border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5" /> Interactive AI Advisor
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] mt-2 text-slate-900">
                    Experience the Hindustan University RAG Assistant
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                  <RagAssistant />
                </div>
              </div>
            </div>

            {/* Quick Links Showcase */}
            <div className="py-12 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div
                    onClick={() => setActiveTab('aviation')}
                    className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-400 rounded-2xl p-5 cursor-pointer transition-all group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Plane className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base font-['Outfit']">Aviation Heritage</h3>
                    <p className="text-xs text-slate-600 mt-1">Real Boeing 737, Cessna 152, MiG-21 & ALSIM AL250 flight simulator.</p>
                    <span className="text-xs text-amber-700 font-semibold mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Labs <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveTab('academics')}
                    className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-400 rounded-2xl p-5 cursor-pointer transition-all group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base font-['Outfit']">Academics & Schools</h3>
                    <p className="text-xs text-slate-600 mt-1">B.Tech, B.Arch, MBA, Law, and Applied Sciences programs.</p>
                    <span className="text-xs text-amber-700 font-semibold mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Catalog <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academics & Aviation Preview */}
            <AcademicsSection onAskAI={handleAskAI} />
            <AviationHeritageSection onAskAI={handleAskAI} />
            <PlacementsSection onAskAI={handleAskAI} />
            <AdmissionsSection onAskAI={handleAskAI} />
          </div>
        )}

        {activeTab === 'academics' && <AcademicsSection onAskAI={handleAskAI} />}
        {activeTab === 'admissions' && <AdmissionsSection onAskAI={handleAskAI} />}
        {activeTab === 'aviation' && <AviationHeritageSection onAskAI={handleAskAI} />}
        {activeTab === 'placements' && <PlacementsSection onAskAI={handleAskAI} />}
      </main>

      {/* Floating Action AI Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-rag-assistant-btn"
          onClick={() => setIsAssistantModalOpen(true)}
          className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold p-3.5 rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center gap-2.5 transition-all hover:scale-110 active:scale-95 group border-2 border-amber-300"
          title="Open Hindustan AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
          </div>
          <span className="text-xs font-extrabold pr-1 hidden sm:inline">Ask Hindustan AI</span>
        </button>
      </div>

      {/* RAG Assistant Modal */}
      <RagAssistantModal
        isOpen={isAssistantModalOpen}
        onClose={() => setIsAssistantModalOpen(false)}
        initialQuery={pendingQuery}
        onClearInitialQuery={() => setPendingQuery(undefined)}
      />

      {/* University Footer */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAssistant={() => setIsAssistantModalOpen(true)}
      />
    </div>
  );
}
