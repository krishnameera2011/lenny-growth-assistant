# System Architecture Document
## The Lenny Growth Assistant
**Role:** Forward Deployed Engineer Assignment  
**Company:** Oogway Labs  

---

## 1. High-Level Architecture Topology

+-------------------------------------------------------------------------+
|                           CLIENT BROWSER (UI)                           |
|  +-------------------------+   +-------------------------------------+  |
|  | Chat & Conversation View|   | Claude-Style Artifact Viewer        |  |
|  | - Grounded Chat         |   | - Sandboxed IFrame Preview          |  |
|  | - Ship 30 for 30 Skill  |   | - Raw Code & Markdown Inspector     |  |
|  | - Citation Cards        |   | - Security Sanitization Details     |  |
|  +------------^------------+   +------------------^------------------+  |
|               |                                   |                     |
+---------------+-----------------------------------+---------------------+
                | HTTP REST / SSE JSON              |
                v                                   |
+---------------------------------------------------+---------------------+
|                 FASTAPI / EXPRESS BACKEND SERVER  |                     |
|  +----------------------------------------------+ |                     |
|  | API Endpoints:                               | |                     |
|  |  - GET  /api/health                          | |                     |
|  |  - GET  /api/transcripts                     | |                     |
|  |  - GET  /api/model-status                    | |                     |
|  |  - POST /api/chat                            | |                     |
|  |  - POST /api/search                          | |                     |
|  +----------------------^-----------------------+ |                     |
|                         |                         |                     |
|  +----------------------v-----------------------+ |                     |
|  | RAG Retrieval & Grounding Engine             | |                     |
|  |  - Tokenizer & TF-IDF / Keyword Scorer       | |                     |
|  |  - Out-of-Domain Guardrail Detector          | |                     |
|  |  - Transcript Repository (8 Episodes, Chunks)| |                     |
|  +----------------------^-----------------------+ |                     |
|                         |                         |                     |
|  +----------------------v-----------------------+ |                     |
|  | Dynamic Agent Routing & Skill Dispatcher     | |                     |
|  |  * Grounded Chat Responder                   | |                     |
|  |  * Ship 30 for 30 Essay Skill (~1,250 words) | |                     |
|  |  * Dynamic Artifact Engine ------------------+-+                     |
|  +----------------------^-----------------------+                       |
|                         |                                               |
|  +----------------------v-----------------------+                       |
|  | Flexible LLM Provider Layer                  |                       |
|  |  * Cloud: Google Gemini 2.5 Flash / Claude   |                       |
|  |  * Local: Ollama (http://localhost:11434)    |                       |
|  |  * Fallback: Deterministic RAG Synthesizer   |                       |
|  +----------------------------------------------+                       |
+-------------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------------+
|                      PERSISTENCE & OBSERVABILITY                        |
|  - PostgreSQL / Supabase Schema (Sessions, Messages, Artifacts, Traces) |
|  - Observability Telemetry (RAG Chunk Latency, Confidence, Health)      |
+-------------------------------------------------------------------------+

---

## 2. Ingestion & Retrieval Pipeline

1. **Source Corpus**: Transcripts from Lenny’s Podcast, formatted with episode titles, guests, guest roles, timestamps, content chunks, and core takeaways.
2. **Chunking Strategy**: Semantic paragraph chunking with sliding context (150–300 words per chunk), tagged by thematic categories (e.g., `founder mode`, `retention curve`, `ice score`, `positioning`).
3. **Retrieval Algorithm**:
   - Multi-token inverted index matching against chunk content, guest names, topics, and takeaways.
   - Exact query topic bonus (+15 points), guest match bonus (+12 points), tag match (+8 points), and term frequency bonus (+3 points).
   - Normalized confidence calculation: `(Score / 25) * 100%`.
4. **Out-of-Domain Guardrail**:
   - If maximum retrieval score is less than 5, system flags `isGrounded: false`.
   - The assistant halts generation and issues an explicit statement acknowledging the knowledge base does not support an answer.

---

## 3. Database Schema (PostgreSQL / Supabase)

```sql
-- Sessions Table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_metadata JSONB DEFAULT '{}'::jsonb
);

-- Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  role VARCHAR(32) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  is_ship30 BOOLEAN DEFAULT FALSE,
  retrieval_confidence NUMERIC(4, 2),
  model_used VARCHAR(64),
  latency_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Citations Table (Grounding Links)
CREATE TABLE message_citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  chunk_id VARCHAR(64) NOT NULL,
  episode_title TEXT NOT NULL,
  guest VARCHAR(128) NOT NULL,
  timestamp_marker VARCHAR(32) NOT NULL,
  quote_snippet TEXT NOT NULL,
  relevance_score INTEGER NOT NULL
);

-- Artifacts Table (Claude-style Artifact Storage)
CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(32) NOT NULL CHECK (type IN ('html', 'markdown', 'interactive')),
  language VARCHAR(32) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Observability Audit Logs Table
CREATE TABLE telemetry_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category VARCHAR(64) NOT NULL,
  level VARCHAR(16) NOT NULL,
  message TEXT NOT NULL,
  latency_ms INTEGER,
  details JSONB
);
