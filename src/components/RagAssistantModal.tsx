import React from 'react';
import { X } from 'lucide-react';
import { RagAssistant } from './RagAssistant';

interface RagAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const RagAssistantModal: React.FC<RagAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuery,
  onClearInitialQuery,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Close Button Top-Right */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 p-2 rounded-xl border border-slate-200 shadow-md transition-colors z-10"
          title="Close AI Assistant"
        >
          <X className="w-5 h-5" />
        </button>

        <RagAssistant
          initialQuery={initialQuery}
          onClearInitialQuery={onClearInitialQuery}
          className="h-[82vh] border-amber-500/40"
        />
      </div>
    </div>
  );
};
