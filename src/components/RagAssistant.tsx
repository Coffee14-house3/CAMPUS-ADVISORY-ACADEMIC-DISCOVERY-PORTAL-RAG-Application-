import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Database, CheckCircle2, Copy, Trash2, Volume2, VolumeX, ChevronDown, ChevronUp, RefreshCw, Cpu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';
import { apiUrl, API_BASE_URL } from '../lib/api';

interface RagAssistantProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  className?: string;
}

const SAMPLE_QUESTIONS = [
  'What is the eligibility & exam pattern for HITSEEE 2025?',
  'Tell me about the Aeronautical Engineering labs and aircraft fleet on campus.',
  'What are the annual tuition and hostel fee structures?',
  'Which top aerospace and IT companies recruit at Hindustan University?',
  'What scholarships are available under Dr. K.C.G. Verghese Merit Scheme?',
  'Does Hindustan University have international semester exchange programs?',
];

export const RagAssistant: React.FC<RagAssistantProps> = ({
  selectedModel,
  setSelectedModel,
  initialQuery,
  onClearInitialQuery,
  className = '',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### Welcome to Hindustan AI Assistant 🎓✈️\n\nI am your intelligent **Retrieval-Augmented Generation (RAG)** advisor for **Hindustan Institute of Technology and Science (HITS)**.\n\nI can answer questions regarding **Admissions 2025**, **HITSEEE entrance exams**, **Aeronautical & Aerospace aircraft labs**, **Tuition & Hostels**, **Placements (Boeing, Microsoft, Amazon)**, and **International Exchange programs** by retrieving factual vector embeddings from our verified ChromaDB cloud index.\n\nHow may I help you explore Hindustan University today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: 'gemini',
      grounded: true,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedChunkMsgId, setExpandedChunkMsgId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [topK, setTopK] = useState<number>(4);
  const [thinkingLevel, setThinkingLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (API_BASE_URL) {
      fetch(apiUrl('/api/health')).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0) {
      handleSendQuery(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const handleSendQuery = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome-msg')
        .slice(-6)
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

      const response = await fetch(apiUrl('/api/rag/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          chatHistory: history,
          provider: 'gemini',
          model: selectedModel,
          topK,
          thinkingLevel,
          categoryFilter: activeCategory !== 'All' ? activeCategory : undefined,
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => null);
        throw new Error(errBody?.error || `Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: data.provider,
        modelUsed: data.modelUsed,
        latencyMs: data.latencyMs,
        retrievedChunks: data.retrievedChunks,
        tokensUsed: data.tokensUsed,
        grounded: (data.retrievedChunks && data.retrievedChunks.length > 0) || false,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('RAG Error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `**⚠️ Assistance Notice:** We encountered a momentary network or Gemini API connectivity issue: \`${err.message}\`.\n\nYou can still query admissions directly at **1800 425 44 38** or retry your question shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        grounded: false,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingMsgId === id) {
        window.speechSynthesis.cancel();
        setSpeakingMsgId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const plainText = text.replace(/[*#_`\[\]]/g, '');
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);
      setSpeakingMsgId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-msg-cleared',
        role: 'assistant',
        content: 'Conversation history reset. Ask any question about Hindustan University admissions, courses, aeronautical labs, or placements!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: 'gemini',
      },
    ]);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingMsgId(null);
  };

  const categories = ['All', 'Admissions', 'Academics', 'Aeronautical & Labs', 'Fees & Scholarships', 'Placements', 'Hostels & Transport', 'International Programs'];

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${className}`}>
      {/* Assistant Header & Diagnostic Controls */}
      <div className="bg-slate-950/80 border-b border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm font-['Outfit']">Hindustan RAG Assistant</h3>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono font-semibold">
                ChromaDB Cloud Grounded
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Gemini RAG Pipeline • Real-time Citation Verifier
            </p>
          </div>
        </div>

        {/* Engine Switcher & Tools */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-1 flex items-center text-xs">
            <span className="text-[10px] text-slate-500 px-2 font-mono uppercase">Model:</span>
            {[
              { id: 'gemini-4-hydrogen', label: 'Gemini 4' },
              { id: 'gemini-3.1-flash-lite', label: 'Flash Lite' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  selectedModel === m.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
              showAdvancedSettings
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Adjust RAG Hyperparameters"
          >
            <Cpu className="w-4 h-4" />
          </button>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 text-slate-400 transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Settings Bar */}
      {showAdvancedSettings && (
        <div className="bg-slate-950/90 border-b border-slate-800 p-3 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Top-K Context Chunks ({topK}):</label>
            <input
              type="range"
              min="2"
              max="7"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1 font-mono text-[11px]">Reasoning Depth ({thinkingLevel}):</label>
            <div className="flex gap-1.5">
              {(['LOW', 'MEDIUM', 'HIGH'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setThinkingLevel(lvl)}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold border transition-colors ${
                    thinkingLevel === lvl
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Database:</span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded font-mono text-[11px] text-amber-400">
              internship (Cloud)
            </span>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-[10px] uppercase font-mono text-slate-500 whitespace-nowrap">Topic Focus:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] font-medium transition-all ${
              activeCategory === cat
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Conversation Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[500px] min-h-[380px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Badge */}
            <div className="flex items-center space-x-2 mb-1 text-[11px] text-slate-400">
              {msg.role === 'user' ? (
                <span>You</span>
              ) : (
                <div className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-slate-300">Hindustan RAG Advisor</span>
                  {msg.provider && (
                    <span className="bg-slate-800 text-amber-400/90 text-[10px] px-1.5 py-0.2 rounded uppercase font-mono">
                      {msg.provider}
                    </span>
                  )}
                  {msg.latencyMs && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      {msg.latencyMs}ms
                    </span>
                  )}
                </div>
              )}
              <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
            </div>

            {/* Bubble */}
            <div
              className={`relative max-w-[90%] md:max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-amber-500/10'
                  : 'bg-slate-800/90 border border-slate-700/70 text-slate-100 rounded-tl-none shadow-md'
              }`}
            >
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-amber-400 prose-headings:font-['Outfit'] prose-a:text-amber-400 prose-strong:text-amber-300">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}

              {/* Retrieved Sources Accordion for Assistant */}
              {msg.role === 'assistant' && msg.retrievedChunks && msg.retrievedChunks.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700/60">
                  <button
                    onClick={() => setExpandedChunkMsgId(expandedChunkMsgId === msg.id ? null : msg.id)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-amber-400/90 hover:text-amber-300 transition-colors py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-amber-400" />
                      Grounded via {msg.retrievedChunks.length} ChromaDB Vector Chunks
                    </span>
                    {expandedChunkMsgId === msg.id ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {expandedChunkMsgId === msg.id && (
                    <div className="mt-2 space-y-2">
                      {msg.retrievedChunks.map((chunk, idx) => (
                        <div
                          key={chunk.id || idx}
                          className="bg-slate-900/90 border border-slate-700/70 rounded-lg p-2.5 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-amber-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Chunk #{idx + 1}: {chunk.title}
                            </span>
                            <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-mono text-[10px]">
                              {(chunk.score * 100).toFixed(1)}% Match
                            </span>
                          </div>
                          <p className="text-slate-300 text-[11px] line-clamp-3 font-sans">
                            {chunk.content}
                          </p>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Category: {chunk.category} • Source: {chunk.sourceTag}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Message Action Bar */}
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-end space-x-2 mt-2 pt-2 text-slate-400 text-xs border-t border-slate-700/40">
                  <button
                    onClick={() => handleSpeak(msg.id, msg.content)}
                    className="p-1 hover:text-amber-400 transition-colors"
                    title={speakingMsgId === msg.id ? 'Stop Speech' : 'Listen via TTS'}
                  >
                    {speakingMsgId === msg.id ? (
                      <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleCopyText(msg.id, msg.content)}
                    className="p-1 hover:text-amber-400 transition-colors"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <span className="text-emerald-400 text-[10px]">Copied!</span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2 mb-1 text-[11px] text-slate-400">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
              <span>Retrieving & synthesizing RAG response...</span>
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl rounded-tl-none p-4 max-w-[80%] text-xs space-y-2">
              <div className="flex items-center space-x-2 text-amber-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="font-semibold">Querying Chroma Cloud Vector Embeddings...</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-slate-700 rounded-full animate-pulse w-3/4"></div>
                <div className="h-2 bg-slate-700 rounded-full animate-pulse w-full"></div>
                <div className="h-2 bg-slate-700 rounded-full animate-pulse w-5/6"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Pills */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-slate-500 uppercase font-mono whitespace-nowrap">Suggested:</span>
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(q)}
              disabled={loading}
              className="bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-amber-400 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-slate-700/50 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-slate-950/90 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            id="rag-query-input"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about admissions, HITSEEE, aeronautical labs, hostel fees, scholarships..."
            disabled={loading}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
          />
          <button
            type="submit"
            id="rag-query-submit-btn"
            disabled={loading || !inputQuery.trim()}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold p-3 rounded-xl transition-transform active:scale-95 shadow-md shadow-amber-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Vector Database: <strong className="text-slate-400">ChromaDB Cloud (internship)</strong></span>
          <span>Active Model: <strong className="text-amber-400 uppercase">{selectedModel}</strong></span>
        </div>
      </div>
    </div>
  );
};
