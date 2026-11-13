import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { LLMProvider, ModelOption } from '../src/types';

export const DEFAULT_GEMINI_MODEL = 'gemini-4-hydrogen';

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'gemini-4-hydrogen',
    name: 'Gemini 4 Hydrogen',
    provider: 'gemini',
    contextWindow: '1M tokens',
    description: 'High-speed, grounded reasoning model ideal for comprehensive university Q&A and RAG synthesis.',
    recommended: true,
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    provider: 'gemini',
    contextWindow: '1M tokens',
    description: 'Ultra-low latency Gemini model for instant admission and campus inquiries.',
  },
];

let cachedAiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY (or GOOGLE_API_KEY) is not configured. Please check Settings > Secrets.');
  }
  if (!cachedAiClient) {
    cachedAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedAiClient;
}

function mapThinkingLevel(level?: 'LOW' | 'MEDIUM' | 'HIGH'): ThinkingLevel {
  switch (level) {
    case 'LOW':
      return ThinkingLevel.LOW;
    case 'MEDIUM':
      return ThinkingLevel.MEDIUM;
    case 'HIGH':
    default:
      return ThinkingLevel.HIGH;
  }
}

export async function executeLLMPipeline(
  _provider: LLMProvider,
  model: string,
  systemPrompt: string,
  userPrompt: string,
  chatHistory: { role: 'user' | 'assistant'; content: string }[] = [],
  thinkingLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW'
): Promise<{ text: string; tokensUsed: number; providerUsed: LLMProvider; modelUsed: string }> {
  const ai = getGeminiClient();
  const validModelIds = new Set(AVAILABLE_MODELS.map((m) => m.id));
  const targetModel = validModelIds.has(model) ? model : DEFAULT_GEMINI_MODEL;

  const contents = [
    ...chatHistory.slice(-6).map((h) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }],
    })),
    {
      role: 'user',
      parts: [{ text: userPrompt }],
    },
  ];

  const config: Record<string, unknown> = {
    systemInstruction: systemPrompt,
  };

  if (targetModel === 'gemini-4-hydrogen') {
    config.thinkingConfig = {
      thinkingLevel: mapThinkingLevel(thinkingLevel),
    };
  }

  const response = await ai.models.generateContent({
    model: targetModel,
    contents,
    config,
  });

  const text = response.text || 'No response generated from Gemini.';
  const tokensUsed = response.usageMetadata?.totalTokenCount || 0;

  return {
    text,
    tokensUsed,
    providerUsed: 'gemini',
    modelUsed: targetModel,
  };
}
