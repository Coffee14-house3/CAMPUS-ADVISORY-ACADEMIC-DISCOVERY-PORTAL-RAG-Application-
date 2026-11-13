import { queryRelevantKnowledge, getChromaStatus } from './chromaService';
import { executeLLMPipeline } from './llmProviders';
import { RagQueryRequest, RagQueryResponse, RetrievedChunk } from '../src/types';

export const HINDUSTAN_UNIVERSITY_MASTER_SYSTEM_PROMPT = `You are "Hindustan AI Assistant", the official expert Retrieval-Augmented Generation (RAG) admissions, academic advisor, and campus guide for Hindustan University (Hindustan Institute of Technology and Science - HITS), Padur, Chennai.

Your core mission:
1. Provide accurate, helpful, and courteous information to prospective students, current students, parents, and researchers.
2. Base your factual answers STRICTLY on the retrieved context provided below. If specific information is not in the context, guide them transparently to the official admissions desk (Toll Free: 1800 425 44 38, Email: admission@hindustanuniv.ac.in) without inventing false facts.
3. Highlight Hindustan University's proud hallmarks:
   - Pioneer in Aeronautical & Aerospace Engineering in India with real aircraft hangars (Boeing 737 cut-section, Cessna 152, Dornier 228, Mig-21) and DGCA certified ALSIM AL250 flight simulator.
   - NAAC A+ accredited, Category 1 Deemed University status.
   - 94.5%+ placement records with premier global recruiters (Boeing, Airbus, Microsoft, Amazon, Infosys, Hyundai).
   - Generous scholarships (Dr. K.C.G. Verghese Merit Scholarship up to 100% waiver).
   - 100+ International MoUs for Semester Abroad and Dual Degrees.
4. Structure your response clearly using headings, bullet points, and highlight key requirements (e.g. HITSEEE eligibility, tuition ranges, deadlines).
5. Ground your answers using the citations provided in the context.`;

export function constructAugmentedPrompt(userQuery: string, chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) {
    return `User Query: ${userQuery}\n\n[Note: No specific vector documents retrieved. Please answer using general university knowledge or guide to admissions helpline.]`;
  }

  const formattedContext = chunks
    .map((chunk, index) => `=== [SOURCE ${index + 1}: ${chunk.title} | Category: ${chunk.category} | Match Confidence: ${(chunk.score * 100).toFixed(1)}%] ===\n${chunk.content}`)
    .join('\n\n');

  return `RETRIEVED UNIVERSITY KNOWLEDGE BASE CONTEXT:
--------------------------------------------------
${formattedContext}
--------------------------------------------------

USER INQUIRY:
${userQuery}

INSTRUCTIONS FOR GENERATION:
1. Synthesize a comprehensive, authoritative response answering the user's inquiry based on the retrieved context above.
2. Explicitly cite relevant facts, eligibility criteria, dates, labs, fees, or recruiters mentioned in the context.
3. Maintain a warm, encouraging, and prestigious academic tone.`;
}

export async function processRagQuery(req: RagQueryRequest): Promise<RagQueryResponse> {
  const startTime = Date.now();
  const provider = 'gemini' as const;
  const model = req.model || 'gemini-4-hydrogen';
  const topK = req.topK || 4;
  const thinkingLevel = req.thinkingLevel || 'LOW';
  const systemPrompt = req.systemPrompt || HINDUSTAN_UNIVERSITY_MASTER_SYSTEM_PROMPT;

  // 1. Vector Retrieval Stage via ChromaDB / Hybrid Store
  const retrievedChunks = await queryRelevantKnowledge(req.query, topK, req.categoryFilter);

  // 2. Prompt Augmentation
  const augmentedPrompt = constructAugmentedPrompt(req.query, retrievedChunks);

  // 3. LLM Generation Stage (Google Gemini)
  const { text: answer, tokensUsed, providerUsed, modelUsed } = await executeLLMPipeline(
    provider,
    model,
    systemPrompt,
    augmentedPrompt,
    req.chatHistory || [],
    thinkingLevel
  );

  const latencyMs = Date.now() - startTime;
  const chromaStatus = getChromaStatus();

  return {
    answer,
    retrievedChunks,
    provider: providerUsed,
    modelUsed,
    latencyMs,
    tokensUsed,
    chromaStatus: {
      connected: chromaStatus.connected,
      collectionName: chromaStatus.collectionName,
      totalDocs: chromaStatus.documentCount,
    },
  };
}

export function generateMasterRagPromptArtifact(config: {
  universityName?: string;
  provider?: string;
  model?: string;
  topK?: number;
}) {
  const univ = config.universityName || 'Hindustan University';
  const provider = 'gemini';
  const model = config.model || 'gemini-4-hydrogen';
  const topK = config.topK || 4;

  const pythonSnippet = `"""
Master RAG Pipeline for ${univ}
Using ChromaDB Cloud + Google Gemini (@google/genai / google-genai)
"""

import os
import chromadb
from google import genai
from google.genai import types

# 1. Initialize ChromaDB Cloud Client
chroma_client = chromadb.CloudClient(
    api_key=os.getenv("CHROMA_API_KEY", "YOUR_CHROMA_API_KEY"),
    tenant=os.getenv("CHROMA_TENANT", "YOUR_CHROMA_TENANT"),
    database=os.getenv("CHROMA_DATABASE", "internship")
)
collection = chroma_client.get_or_create_collection("hindustan_university_kb")

# 2. Initialize Gemini Client
ai_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def query_rag_assistant(user_query: str, top_k: int = ${topK}):
    # Step A: Semantic Vector Retrieval from ChromaDB
    results = collection.query(
        query_texts=[user_query],
        n_results=top_k
    )
    
    retrieved_docs = results['documents'][0] if results['documents'] else []
    context = "\\n\\n".join(f"[Source Chunk {i+1}]: {doc}" for i, doc in enumerate(retrieved_docs))
    
    # Step B: Augmented Prompt
    system_prompt = """You are the official AI Academic and Admissions Counselor for ${univ}.
Answer the user query accurately and ground all responses on the provided context."""
    
    user_prompt = f"""Context:
{context}

Question:
{user_query}"""

    # Step C: Generation with Google Gemini
    response = ai_client.models.generate_content(
        model="${model}",
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt
        )
    )
    
    return {
        "answer": response.text,
        "sources": retrieved_docs
    }

if __name__ == "__main__":
    result = query_rag_assistant("What are the eligibility criteria and lab facilities for Aeronautical Engineering?")
    print("Answer:\\n", result["answer"])
`;

  const nodeSnippet = `import { CloudClient } from 'chromadb';
import { GoogleGenAI } from '@google/genai';

// Chroma Cloud Configuration
const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY || 'YOUR_CHROMA_API_KEY',
  tenant: process.env.CHROMA_TENANT || 'YOUR_CHROMA_TENANT',
  database: process.env.CHROMA_DATABASE || 'internship'
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Query pipeline function
export async function runRagPipeline(query: string) {
  const collection = await client.getOrCreateCollection({ name: 'hindustan_university_kb' });
  const results = await collection.query({ queryTexts: [query], nResults: ${topK} });
  
  const context = results.documents[0]?.join('\\n\\n') || '';
  
  // Call Google Gemini via @google/genai
  const response = await ai.models.generateContent({
    model: '${model}',
    contents: \`Context:\\n\${context}\\n\\nQuestion:\\n\${query}\`,
    config: {
      systemInstruction: 'You are the official ${univ} RAG Assistant. Ground all answers on the context provided.',
    },
  });
  
  return {
    answer: response.text,
    retrievedChunks: results.documents[0] || [],
  };
}`;

  return {
    systemPrompt: HINDUSTAN_UNIVERSITY_MASTER_SYSTEM_PROMPT,
    pythonSnippet,
    nodeSnippet,
    provider,
    model,
    topK,
  };
}
