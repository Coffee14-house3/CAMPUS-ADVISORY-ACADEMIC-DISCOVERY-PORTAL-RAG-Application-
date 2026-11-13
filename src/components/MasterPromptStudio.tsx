import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Sparkles, Database, Bot, Download, Layers, ShieldCheck, Cloud } from 'lucide-react';

export const MasterPromptStudio: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'prompt' | 'python' | 'typescript' | 'curl' | 'render'>('prompt');

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const MASTER_PROMPT_TEXT = `### HINDUSTAN UNIVERSITY MASTER RAG SPECIFICATION PROMPT

You are an expert full-stack AI engineer. Your task is to build a modern, high-performance College Website with an integrated Retrieval-Augmented Generation (RAG) assistant for Hindustan University (Hindustan Institute of Technology and Science - HITS), Chennai.

#### 1. UNIVERSITY DOMAIN REQUIREMENTS
- College Name: Hindustan University (Hindustan Institute of Technology and Science - HITS)
- Key Identity: India's premier pioneer in Aeronautical and Aerospace Engineering since 1985.
- Campus: 100+ Acres green campus at Padur, Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu.
- Accreditations: NAAC A+ Grade (3.35 CGPA), Category-1 Deemed-to-be-University, NIRF Ranked.
- Signature Facilities: On-campus Aircraft Hangar with 3 operational aircraft (Boeing 737, Cessna 152, Dornier 228, Mig-21 fighter jet), ALSIM AL250 Flight Simulator, Supersonic Wind Tunnels, ISRO-partnered Satellite Ground Station (HITS-SAT), and DGCA Drone RPTO.
- Programs: B.Tech (Aeronautical, Aerospace, CSE AI-ML, Cyber Security), B.Arch (SPADE), MBA (Aviation Management, FinTech), B.A. LL.B (Hons.), and Ph.D.
- Placements: 94.5% placement rate, ₹42.5 LPA highest package, marquee recruiters (Boeing, Airbus, Microsoft, Amazon, Hyundai, Cognizant, Infosys).
- Admissions: HITSEEE 2025 single-window entrance exams and Dr. K.C.G. Verghese Merit Scholarships (up to 100% waiver).

#### 2. BACKEND RAG & VECTOR PIPELINE
- Vector Database: ChromaDB Cloud Client
  * API Key: YOUR_CHROMA_API_KEY
  * Tenant: YOUR_CHROMA_TENANT
  * Database: internship
  * Collection: hindustan_university_kb
- Gemini Inference Engine:
  * Google Gemini (@google/genai SDK): gemini-4-hydrogen / gemini-3.1-flash-lite
- Execution Flow:
  1. User Query -> Semantic Vector Embedding Retrieval (topK = 4) from ChromaDB Cloud.
  2. Prompt Augmentation: Assemble source context with similarity scores and category tags.
  3. Grounded System Prompt: Enforce strict grounding to prevent hallucination; cite specific requirements, labs, fees, or helpline numbers.
  4. Response Delivery: Return synthesized answer, verified citation chunks, latency metrics, and model tags.

#### 3. FRONTEND INTERFACE REQUIREMENTS
- Responsive, sophisticated university portal with golden amber & deep navy visual palette.
- Interactive RAG Assistant modal and embedded chat with speech synthesis (TTS), citation accordions, and suggested queries.
- Academic Programs & Schools explorer with level filters (UG/PG) and instant "Ask AI about this course" shortcuts.
- Aviation Heritage showcase spotlighting live flight hangars and simulation labs.
- Admissions 2025 Portal with HITSEEE timeline, scholarship matrix, and instant inquiry registration.
`;

  const PYTHON_CODE = `import os
import chromadb
from google import genai
from google.genai import types

# 1. Initialize ChromaDB Cloud Client
chroma_client = chromadb.CloudClient(
    api_key=os.getenv("CHROMA_API_KEY", "YOUR_CHROMA_API_KEY"),
    tenant=os.getenv("CHROMA_TENANT", "YOUR_CHROMA_TENANT"),
    database=os.getenv("CHROMA_DATABASE", "internship")
)

# Get or create the university knowledge collection
collection = chroma_client.get_or_create_collection(
    name="hindustan_university_kb",
    metadata={"description": "Hindustan University RAG Corpus"}
)

# 2. Initialize Google Gemini Client
ai_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def ask_hindustan_rag(query: str, top_k: int = 4):
    """
    Retrieves vector chunks from ChromaDB Cloud and generates
    grounded responses using Google Gemini.
    """
    # A. Vector Retrieval
    search_results = collection.query(
        query_texts=[query],
        n_results=top_k
    )
    
    docs = search_results["documents"][0] if search_results["documents"] else []
    context = "\\n\\n".join([f"[Source {i+1}]: {doc}" for i, doc in enumerate(docs)])
    
    # B. Augmented Prompt Construction
    system_prompt = (
        "You are the official AI Counselor for Hindustan University (HITS Padur, Chennai). "
        "Answer the user query accurately and ground your response strictly on the provided context."
    )
    
    user_prompt = f"""UNIVERSITY CONTEXT:
{context}

USER INQUIRY:
{query}

Please provide a structured, polite, and authoritative answer with citations."""

    # C. Gemini Inference
    response = ai_client.models.generate_content(
        model="gemini-4-hydrogen",
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt
        )
    )
    
    return {
        "answer": response.text,
        "sources": docs
    }

if __name__ == "__main__":
    result = ask_hindustan_rag("What are the lab facilities for Aeronautical Engineering and flight simulators at Hindustan University?")
    print("=== ANSWER ===")
    print(result["answer"])
`;

  const TYPESCRIPT_CODE = `import { CloudClient } from 'chromadb';
import { GoogleGenAI } from '@google/genai';

// 1. Initialize ChromaDB Cloud Client
const chroma = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY || 'YOUR_CHROMA_API_KEY',
  tenant: process.env.CHROMA_TENANT || 'YOUR_CHROMA_TENANT',
  database: process.env.CHROMA_DATABASE || 'internship'
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 2. RAG Query Execution Pipeline
export async function queryHindustanRag(userQuery: string, topK: number = 4) {
  const collection = await chroma.getOrCreateCollection({
    name: 'hindustan_university_kb'
  });

  // Vector similarity retrieval
  const results = await collection.query({
    queryTexts: [userQuery],
    nResults: topK
  });

  const docs = results.documents[0] || [];
  const context = docs.map((d, i) => \`[Source \${i+1}]: \${d}\`).join('\\n\\n');

  // Call Google Gemini via @google/genai
  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: \`Context:\\n\${context}\\n\\nQuestion:\\n\${userQuery}\`,
    config: {
      systemInstruction: 'You are the official Hindustan University RAG Assistant. Ground all answers on the context provided.',
    },
  });

  return {
    answer: response.text,
    retrievedChunks: docs
  };
}
`;

  const CURL_CODE = `curl -X POST http://localhost:3000/api/rag/chat \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What is the eligibility and fee for B.Tech Aeronautical Engineering at Hindustan University?",
    "model": "gemini-4-hydrogen",
    "topK": 4
  }'
`;

  const RENDER_CODE = `# ==========================================================
# HINDUSTAN UNIVERSITY RAG PORTAL - RENDER DEPLOYMENT SPEC
# ==========================================================
# 1. Automatic Blueprint File (render.yaml):

services:
  - type: web
    name: hindustan-univ-rag-api
    runtime: node
    plan: free
    region: oregon
    buildCommand: npm install && npm run build:server
    startCommand: npm start
    healthCheckPath: /api/health
    envVars:
      - key: NODE_ENV
        value: production
      - key: NODE_OPTIONS
        value: --max-old-space-size=384
      - key: ALLOWED_ORIGINS
        sync: false
      - key: GEMINI_API_KEY
        sync: false
      - key: CHROMA_API_KEY
        sync: false
      - key: CHROMA_TENANT
        sync: false
      - key: CHROMA_DATABASE
        value: internship

# ----------------------------------------------------------
# 2. Manual Step-by-Step Render Setup:
# ----------------------------------------------------------
# Step A: Push this repo to your GitHub / GitLab account.
# Step B: In Render Dashboard (https://dashboard.render.com), click "New +" -> "Web Service".
# Step C: Select your repository.
# Step D: Configure settings:
#         - Runtime: Node
#         - Build Command: npm install && npm run build
#         - Start Command: npm start
# Step E: Add the Environment Variables above in the "Environment" tab.
# Step F: Click "Create Web Service". Your portal will go live in 2-3 minutes!
`;

  const getActiveCode = () => {
    switch (selectedLanguage) {
      case 'prompt':
        return MASTER_PROMPT_TEXT;
      case 'python':
        return PYTHON_CODE;
      case 'typescript':
        return TYPESCRIPT_CODE;
      case 'curl':
        return CURL_CODE;
      case 'render':
        return RENDER_CODE;
    }
  };

  const handleDownload = () => {
    const text = getActiveCode();
    const ext = selectedLanguage === 'python' ? 'py' : selectedLanguage === 'typescript' ? 'ts' : selectedLanguage === 'curl' ? 'sh' : selectedLanguage === 'render' ? 'yaml' : 'md';
    const filename = selectedLanguage === 'render' ? 'render.yaml' : `hindustan_rag_${selectedLanguage}.${ext}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Developer & Architect Studio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] mt-3">
            Master Prompt & RAG Pipeline Generator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            The complete system master prompt and production-ready source code integrating ChromaDB Cloud and Google Gemini for Hindustan University.
          </p>
        </div>

        {/* RAG Pipeline Flow Diagram */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-sm uppercase font-mono font-bold text-amber-400 mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4" /> End-to-End RAG Architecture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="bg-amber-500/20 text-amber-400 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                STAGE 1
              </span>
              <h4 className="font-bold text-white text-sm">Natural Query Ingestion</h4>
              <p className="text-slate-400">
                User enters inquiries on admissions, HITSEEE, flight simulators, or hostel fees.
              </p>
            </div>

            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 space-y-2">
              <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                STAGE 2
              </span>
              <h4 className="font-bold text-white text-sm">ChromaDB Vector Retrieval</h4>
              <p className="text-slate-400">
                Queries Chroma Cloud (<code className="text-amber-300">internship</code>) to retrieve top-K relevant chunks with cosine similarity.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="bg-sky-500/20 text-sky-400 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                STAGE 3
              </span>
              <h4 className="font-bold text-white text-sm">Prompt Augmentation</h4>
              <p className="text-slate-400">
                Injects factual university citations and strict academic persona grounding rules into the LLM context.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="bg-purple-500/20 text-purple-400 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                STAGE 4
              </span>
              <h4 className="font-bold text-white text-sm">Gemini RAG Synthesis</h4>
              <p className="text-slate-400">
                Generates authoritative answers via Google Gemini with verified source badges.
              </p>
            </div>
          </div>
        </div>

        {/* Code & Master Prompt Viewer */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Studio Tab Bar */}
          <div className="bg-slate-900/90 border-b border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedLanguage('prompt')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedLanguage === 'prompt'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Master Prompt (Markdown)
              </button>
              <button
                onClick={() => setSelectedLanguage('python')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedLanguage === 'python'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Python (Chroma + Gemini)
              </button>
              <button
                onClick={() => setSelectedLanguage('typescript')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedLanguage === 'typescript'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                TypeScript / Node.js
              </button>
              <button
                onClick={() => setSelectedLanguage('curl')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedLanguage === 'curl'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                cURL API Request
              </button>
              <button
                onClick={() => setSelectedLanguage('render')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedLanguage === 'render'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Cloud className="w-3.5 h-3.5" />
                Render (render.yaml)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export File</span>
              </button>

              <button
                onClick={() => copyToClipboard(getActiveCode(), selectedLanguage)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
              >
                {copiedSection === selectedLanguage ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Window */}
          <div className="p-6 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto max-h-[500px]">
            <pre className="leading-relaxed whitespace-pre-wrap">
              {getActiveCode()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
