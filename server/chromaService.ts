import { CloudClient } from 'chromadb';
import { DEFAULT_UNIVERSITY_DOCS } from '../src/data/universityData';
import { UniversityKnowledgeDoc, RetrievedChunk } from '../src/types';

const CHROMA_API_KEY = process.env.CHROMA_API_KEY || '';
const CHROMA_TENANT = process.env.CHROMA_TENANT || '';
const CHROMA_DATABASE = process.env.CHROMA_DATABASE || 'internship';
const COLLECTION_NAME = process.env.CHROMA_COLLECTION || 'hindustan_university_kb';

let inMemoryKnowledgeBase: UniversityKnowledgeDoc[] = [...DEFAULT_UNIVERSITY_DOCS];
let chromaCloudClient: any = null;
let chromaCollection: any = null;
let isCloudConnected = false;
let lastCloudError: string | null = null;

function formatChunkTitle(id: string, meta: Record<string, any>, fallbackIndex: number): string {
  if (meta?.title && typeof meta.title === 'string') {
    return meta.title;
  }
  if (meta?.source && typeof meta.source === 'string') {
    const cleanSource = meta.source
      .replace(/\.md$/i, '')
      .split('_')
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    const chunkNum = typeof meta.chunk_index === 'number' ? meta.chunk_index + 1 : fallbackIndex + 1;
    return `${cleanSource} (Chunk ${chunkNum})`;
  }
  return id || `University Knowledge Chunk ${fallbackIndex + 1}`;
}

function formatTags(meta: Record<string, any>): string[] {
  if (typeof meta?.tags === 'string' && meta.tags.trim().length > 0) {
    return meta.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
  }
  const tags: string[] = [];
  if (meta?.category) tags.push(String(meta.category));
  if (meta?.source) tags.push(String(meta.source).replace(/\.md$/i, ''));
  return tags.length > 0 ? tags : ['ChromaDB'];
}

function matchesCategoryFilter(docCategory: string, content: string, filter?: string): boolean {
  if (!filter || filter === 'All') return true;
  const normFilter = filter.toLowerCase();
  const normCat = (docCategory || '').toLowerCase();
  if (normCat === normFilter || normCat.includes(normFilter) || normFilter.includes(normCat)) {
    return true;
  }
  const filterTokens = normFilter.split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  if (filterTokens.some((tok) => normCat.includes(tok))) {
    return true;
  }
  const lowerContent = (content || '').toLowerCase();
  return filterTokens.some((tok) => lowerContent.includes(tok));
}

// Simple Vectorizer for local fallback similarity scoring
function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2);
}

function computeSimilarity(query: string, text: string, tags: string[] = []): number {
  const queryTokens = tokenize(query);
  const textTokens = tokenize(text);
  const tagTokens = tags.flatMap(t => tokenize(t));

  if (queryTokens.length === 0 || textTokens.length === 0) return 0;

  const querySet = new Set(queryTokens);
  let termMatches = 0;
  let tagMatches = 0;

  for (const token of textTokens) {
    if (querySet.has(token)) termMatches++;
  }
  for (const token of tagTokens) {
    if (querySet.has(token)) tagMatches += 2.5;
  }

  const lowerQuery = query.toLowerCase().trim();
  const lowerText = text.toLowerCase();
  let phraseBonus = 0;
  if (lowerText.includes(lowerQuery)) {
    phraseBonus = 0.35;
  } else {
    for (let i = 0; i < queryTokens.length - 1; i++) {
      const bigram = `${queryTokens[i]} ${queryTokens[i + 1]}`;
      if (lowerText.includes(bigram)) phraseBonus += 0.15;
    }
  }

  const tokenCoverage = queryTokens.filter(t => textTokens.includes(t) || tagTokens.includes(t)).length / queryTokens.length;
  const rawScore = (termMatches / (textTokens.length + 10)) * 2.0 + (tagMatches * 0.1) + (tokenCoverage * 0.5) + phraseBonus;

  return Math.min(0.99, Math.max(0.12, rawScore));
}

async function syncFromCloudCollection(): Promise<void> {
  if (!chromaCollection) return;
  const existing = await chromaCollection.get({ include: ['documents', 'metadatas'] });
  const ids: string[] = existing?.ids || [];
  const docs: (string | null)[] = existing?.documents || [];
  const metas: (Record<string, any> | null)[] = existing?.metadatas || [];

  if (ids.length === 0) return;

  const today = new Date().toISOString().split('T')[0];
  inMemoryKnowledgeBase = ids.map((id, idx) => {
    const meta = metas[idx] || {};
    return {
      id,
      title: formatChunkTitle(id, meta, idx),
      category: String(meta.category || 'General'),
      content: docs[idx] || meta.preview || '',
      tags: formatTags(meta),
      updatedAt: String(meta.updatedAt || today),
    };
  });
}

export async function initChromaClient() {
  if (!CHROMA_API_KEY || !CHROMA_TENANT) {
    console.warn('[ChromaDB] CHROMA_API_KEY or CHROMA_TENANT not configured — using local verified vector store.');
    isCloudConnected = false;
    lastCloudError = 'Chroma Cloud credentials not configured — using local vector store';
    return;
  }

  try {
    console.log(`[ChromaDB] Initializing CloudClient with tenant: ${CHROMA_TENANT}, database: ${CHROMA_DATABASE}, collection: ${COLLECTION_NAME}`);

    chromaCloudClient = new CloudClient({
      apiKey: CHROMA_API_KEY,
      tenant: CHROMA_TENANT,
      database: CHROMA_DATABASE,
    });

    try {
      chromaCollection = await chromaCloudClient.getOrCreateCollection({
        name: COLLECTION_NAME,
        metadata: { description: 'Hindustan University Official Knowledge Base' },
      });
      isCloudConnected = true;
      lastCloudError = null;
      console.log(`[ChromaDB] Successfully connected to Chroma Cloud collection: ${COLLECTION_NAME}`);

      const count = await chromaCollection.count();
      if (count === 0) {
        console.log('[ChromaDB] Collection is empty, seeding default university documents...');
        await seedChromaCollection();
      } else {
        await syncFromCloudCollection();
        console.log(`[ChromaDB] Loaded ${inMemoryKnowledgeBase.length} chunks from Chroma Cloud collection ${COLLECTION_NAME}.`);
      }
    } catch (collErr: any) {
      console.warn('[ChromaDB] Cloud collection getOrCreate notice:', collErr?.message || collErr);
      isCloudConnected = false;
      lastCloudError = collErr?.message || 'Collection access fallback';
    }
  } catch (err: any) {
    console.warn('[ChromaDB] CloudClient init exception:', err?.message || err);
    isCloudConnected = false;
    lastCloudError = err?.message || 'Chroma connection unavailable';
  }
}

export async function seedChromaCollection(): Promise<number> {
  if (chromaCollection && isCloudConnected) {
    try {
      const count = await chromaCollection.count();
      if (count > 0 && inMemoryKnowledgeBase.length === count) {
        await syncFromCloudCollection();
        return inMemoryKnowledgeBase.length;
      }

      const ids = inMemoryKnowledgeBase.map(d => d.id);
      const documents = inMemoryKnowledgeBase.map(d => `${d.title}\nCategory: ${d.category}\nTags: ${d.tags.join(', ')}\n${d.content}`);
      const metadatas = inMemoryKnowledgeBase.map(d => ({
        title: d.title,
        category: d.category,
        tags: d.tags.join(','),
        updatedAt: d.updatedAt,
      }));

      await chromaCollection.upsert({
        ids,
        documents,
        metadatas,
      });
      console.log(`[ChromaDB] Upserted ${ids.length} documents to Chroma Cloud.`);
      return ids.length;
    } catch (err: any) {
      console.error('[ChromaDB] Failed to sync with Chroma Cloud:', err?.message);
    }
  }
  return inMemoryKnowledgeBase.length;
}

export async function queryRelevantKnowledge(query: string, topK: number = 4, categoryFilter?: string): Promise<RetrievedChunk[]> {
  // Try Chroma Cloud retrieval first if active
  if (chromaCollection && isCloudConnected) {
    try {
      const fetchCount = categoryFilter && categoryFilter !== 'All'
        ? Math.min(20, Math.max(topK * 3, 12))
        : Math.min(topK, Math.max(inMemoryKnowledgeBase.length, topK));

      const results = await chromaCollection.query({
        queryTexts: [query],
        nResults: fetchCount,
      });

      if (results && results.documents && results.documents[0] && results.documents[0].length > 0) {
        const docs: (string | null)[] = results.documents[0];
        const metadatas: (Record<string, any> | null)[] = results.metadatas?.[0] || [];
        const distances: (number | null)[] = results.distances?.[0] || [];
        const ids: string[] = results.ids?.[0] || [];

        const allCloudChunks: RetrievedChunk[] = docs.map((docText, i) => {
          const meta = metadatas[i] || {};
          const distance = typeof distances[i] === 'number' ? distances[i]! : 0.8;
          // L2 distance over unit-normalized vectors: cos_sim = 1 - d / 2
          const score = Math.min(0.99, Math.max(0.15, 1 - distance / 2));
          return {
            id: ids[i] || `chroma-chunk-${i}`,
            title: formatChunkTitle(ids[i] || '', meta, i),
            category: String(meta.category || 'General'),
            content: docText || '',
            score: Number(score.toFixed(3)),
            sourceTag: 'ChromaDB Cloud Vector Index',
          };
        });

        const filtered = categoryFilter && categoryFilter !== 'All'
          ? allCloudChunks.filter((c) => matchesCategoryFilter(c.category, c.content, categoryFilter))
          : allCloudChunks;

        if (filtered.length > 0) {
          return filtered.slice(0, topK);
        }
        return allCloudChunks.slice(0, topK);
      }
    } catch (err: any) {
      console.warn('[ChromaDB] Chroma Cloud query error, switching to hybrid vector ranker:', err?.message);
    }
  }

  // Fallback to local semantic vectorizer & hybrid ranker
  const filteredDocs = inMemoryKnowledgeBase.filter(doc =>
    matchesCategoryFilter(doc.category, doc.content, categoryFilter)
  );
  const pool = filteredDocs.length > 0 ? filteredDocs : inMemoryKnowledgeBase;

  const scoredDocs = pool
    .map(doc => {
      const score = computeSimilarity(query, `${doc.title} ${doc.content}`, doc.tags);
      return {
        id: doc.id,
        title: doc.title,
        category: doc.category,
        content: doc.content,
        score: Number(score.toFixed(3)),
        sourceTag: 'University Verified Vector Base',
      };
    })
    .sort((a, b) => b.score - a.score);

  return scoredDocs.slice(0, topK);
}

export function getAllDocuments(): UniversityKnowledgeDoc[] {
  return inMemoryKnowledgeBase;
}

export async function addDocument(doc: Omit<UniversityKnowledgeDoc, 'id' | 'updatedAt'>): Promise<UniversityKnowledgeDoc> {
  const newDoc: UniversityKnowledgeDoc = {
    id: `hits-custom-${Date.now()}`,
    title: doc.title,
    category: doc.category,
    content: doc.content,
    tags: doc.tags || ['Custom', 'Knowledge'],
    updatedAt: new Date().toISOString().split('T')[0],
  };

  inMemoryKnowledgeBase.push(newDoc);

  if (chromaCollection && isCloudConnected) {
    try {
      await chromaCollection.upsert({
        ids: [newDoc.id],
        documents: [`${newDoc.title}\nCategory: ${newDoc.category}\nTags: ${newDoc.tags.join(', ')}\n${newDoc.content}`],
        metadatas: [{
          title: newDoc.title,
          category: newDoc.category,
          tags: newDoc.tags.join(','),
          updatedAt: newDoc.updatedAt,
        }],
      });
    } catch (err: any) {
      console.warn('[ChromaDB] Cloud sync for new doc failed:', err?.message);
    }
  }

  return newDoc;
}

export function getChromaStatus() {
  return {
    connected: isCloudConnected,
    tenant: CHROMA_TENANT,
    database: CHROMA_DATABASE,
    collectionName: COLLECTION_NAME,
    documentCount: inMemoryKnowledgeBase.length,
    error: lastCloudError,
  };
}
