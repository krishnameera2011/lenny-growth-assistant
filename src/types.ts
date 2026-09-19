export interface TranscriptChunk {
  id: string;
  episodeId: string;
  episodeTitle: string;
  episodeNumber: number;
  guest: string;
  guestRole: string;
  timestamp: string;
  content: string;
  keyTakeaway: string;
  tags: string[];
}

export interface Citation {
  chunkId?: string;
  episodeTitle: string;
  guest: string;
  timestamp: string;
  quoteSnippet: string;
  url?: string;
  relevanceScore?: number;
}

export interface Artifact {
  id: string;
  title: string;
  type: 'html' | 'react' | 'markdown' | 'calculator';
  content: string;
  description: string;
  language: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Citation[];
  artifact?: Artifact | null;
  isShip30?: boolean;
  retrievalConfidence?: number;
  modelUsed?: string;
  latencyMs?: number;
}

export interface Session {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export interface ModelOption {
  id: string;
  name: string;
  provider: 'gemini' | 'ollama' | 'claude' | 'openai';
  modelCode: string;
  contextWindow: string;
  description: string;
  isLocal: boolean;
  isDefault?: boolean;
}

export interface ObservabilityLog {
  id: string;
  timestamp: string;
  category: 'RAG_RETRIEVAL' | 'GUARDRAIL' | 'MODEL_ROUTING' | 'ARTIFACT_RENDER' | 'SESSION';
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  latencyMs?: number;
  details?: Record<string, any>;
}