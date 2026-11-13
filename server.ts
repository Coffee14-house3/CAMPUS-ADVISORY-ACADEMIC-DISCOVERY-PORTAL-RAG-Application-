import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { initChromaClient, getChromaStatus, getAllDocuments, addDocument, seedChromaCollection, queryRelevantKnowledge } from './server/chromaService';
import { processRagQuery, generateMasterRagPromptArtifact } from './server/ragEngine';
import { AVAILABLE_MODELS } from './server/llmProviders';
import { RagQueryRequest } from './src/types';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // CORS middleware for split frontend (GitHub Pages) + backend (Render) deployment
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  app.use((req, res, next) => {
    const requestOrigin = (req.headers.origin || '').replace(/\/+$/, '');
    if (allowedOrigins.length === 0) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
      res.setHeader('Access-Control-Allow-Origin', requestOrigin);
      res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Initialize ChromaDB Cloud Client in background
  initChromaClient().catch(err => {
    console.warn('[Server] Chroma initialization deferred:', err);
  });

  // API Endpoints
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Hindustan University RAG API Gateway',
    });
  });

  app.get('/api/models', (req, res) => {
    res.json({
      models: AVAILABLE_MODELS,
      defaultProvider: 'gemini',
      defaultModel: 'gemini-4-hydrogen',
    });
  });

  // Main RAG Chat endpoint
  app.post('/api/rag/chat', async (req, res) => {
    try {
      const { query, chatHistory, provider, model, topK, thinkingLevel, systemPrompt, categoryFilter } = req.body as RagQueryRequest;

      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        return res.status(400).json({ error: 'Query string is required.' });
      }

      const result = await processRagQuery({
        query: query.trim(),
        chatHistory,
        provider: provider || 'gemini',
        model,
        topK: Number(topK) || 4,
        thinkingLevel,
        systemPrompt,
        categoryFilter,
      });

      res.json(result);
    } catch (err: any) {
      console.error('[API /api/rag/chat Error]:', err);
      res.status(500).json({
        error: err.message || 'Internal server error processing RAG query.',
      });
    }
  });

  // Vector Similarity Testing Endpoint
  app.post('/api/rag/similarity-test', async (req, res) => {
    try {
      const { query, topK, categoryFilter } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'Query is required for similarity test.' });
      }
      const chunks = await queryRelevantKnowledge(query, Number(topK) || 5, categoryFilter);
      res.json({ query, results: chunks });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ChromaDB Cloud Status & Management
  app.get('/api/chroma/status', (req, res) => {
    const status = getChromaStatus();
    res.json(status);
  });

  app.get('/api/chroma/documents', (req, res) => {
    const docs = getAllDocuments();
    res.json({
      total: docs.length,
      documents: docs,
    });
  });

  app.post('/api/chroma/seed', async (req, res) => {
    try {
      const count = await seedChromaCollection();
      res.json({ message: 'Collection seeded successfully', count });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/chroma/add', async (req, res) => {
    try {
      const { title, category, content, tags } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
      }
      const doc = await addDocument({
        title,
        category: category || 'Admissions',
        content,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : []),
      });
      res.json({ success: true, document: doc });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Master Prompt Generation Endpoint
  app.post('/api/prompt/master', (req, res) => {
    try {
      const { universityName, provider, model, topK } = req.body;
      const artifact = generateMasterRagPromptArtifact({
        universityName,
        provider,
        model,
        topK,
      });
      res.json(artifact);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Admission Inquiry Handler
  app.post('/api/admissions/inquiry', (req, res) => {
    const { name, email, phone, course, state, marks } = req.body;
    console.log('[Admission Inquiry Received]:', { name, email, phone, course, state, marks });
    res.json({
      success: true,
      applicationId: `HITS-${Math.floor(100000 + Math.random() * 900000)}`,
      message: 'Admission inquiry registered successfully. Our admissions counselor will contact you shortly.',
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexHtmlPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(indexHtmlPath);
      });
    } else {
      app.get('/', (req, res) => {
        res.json({
          status: 'ok',
          service: 'Hindustan University RAG API Backend',
          health: '/api/health',
        });
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Hindustan University RAG Portal running at http://localhost:${PORT}`);
  });
}

startServer();
