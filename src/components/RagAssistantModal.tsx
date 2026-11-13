import React from 'react';
import { X } from 'lucide-react';
import { RagAssistant } from './RagAssistant';

interface RagAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const RagAssistantModal: React.FC<RagAssistantModalProps> = ({
  isOpen,
  onClose,
  selectedModel,
  setSelectedModel,
  initialQuery,
  onClearInitialQuery,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Close Button Top-Right */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 p-2 rounded-xl border border-slate-700 transition-colors z-10"
          title="Close AI Assistant"
        >
          <X className="w-5 h-5" />
        </button>

        <RagAssistant
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          initialQuery={initialQuery}
          onClearInitialQuery={onClearInitialQuery}
          className="h-[82vh] border-amber-500/40"
        />
      </div>
    </div>
  );
};
