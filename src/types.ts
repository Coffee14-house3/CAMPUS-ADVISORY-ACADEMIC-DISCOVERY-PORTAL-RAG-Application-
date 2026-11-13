export type LLMProvider = 'gemini';

export interface ModelOption {
  id: string;
  name: string;
  provider: LLMProvider;
  contextWindow: string;
  description: string;
  recommended?: boolean;
}

export interface UniversityKnowledgeDoc {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

export interface RetrievedChunk {
  id: string;
  title: string;
  category: string;
  content: string;
  score: number; // 0 to 1 similarity
  sourceTag: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  provider?: LLMProvider;
  modelUsed?: string;
  latencyMs?: number;
  retrievedChunks?: RetrievedChunk[];
  grounded?: boolean;
  tokensUsed?: number;
}

export interface RagQueryRequest {
  query: string;
  chatHistory?: { role: 'user' | 'assistant'; content: string }[];
  provider?: LLMProvider;
  model?: string;
  topK?: number;
  thinkingLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  systemPrompt?: string;
  categoryFilter?: string;
}

export interface RagQueryResponse {
  answer: string;
  retrievedChunks: RetrievedChunk[];
  provider: LLMProvider;
  modelUsed: string;
  latencyMs: number;
  tokensUsed?: number;
  chromaStatus: {
    connected: boolean;
    collectionName: string;
    totalDocs: number;
  };
}

export interface ChromaStatusResponse {
  connected: boolean;
  tenant: string;
  database: string;
  collectionName: string;
  documentCount: number;
  documents: UniversityKnowledgeDoc[];
  latencyMs: number;
  error?: string;
}

export interface CourseInfo {
  id: string;
  name: string;
  school: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Doctoral' | 'Diploma';
  duration: string;
  eligibility: string;
  annualFee: string;
  seats: number;
  specializations?: string[];
  highlights: string[];
  careerProspects: string[];
}

export interface DepartmentInfo {
  id: string;
  name: string;
  shortCode: string;
  dean: string;
  description: string;
  laboratories: string[];
  studentCount: number;
  image: string;
  coursesCount: number;
}
