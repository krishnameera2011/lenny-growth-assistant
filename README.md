# The Lenny Growth Assistant
> **Forward Deployed Engineer Take-Home Assessment for Oogway Labs**  
> Candidate: krishnameera093@gmail.com | Role: Forward Deployed Engineer Intern  
> **Live App URL**: https://ais-pre-uen6j22s3hxaom3d5x4xp6-947147213249.asia-southeast1.run.app  

A production-grade, full-stack AI-powered conversational web application that turns Lenny’s Podcast transcripts into a reliable internal assistant with strict grounding, Ship 30 for 30 essay generation, and a Claude-style sandboxed Artifact Viewer.

---

## 🌟 Key Features

1. **Strictly Grounded Conversational RAG**:
   - Ingests authentic transcripts from cornerstone episodes (Brian Chesky, Shreyas Doshi, Elena Verna, Gustaf Alströmer, Marty Cagan, April Dunford, Sean Ellis, Lenny Rachitsky).
   - Verifiable source citations with exact episode titles, guest roles, timestamps, and quotes.
   - **Zero-Hallucination Guardrail**: Gracefully acknowledges when the indexed transcripts do not contain material to answer a question.

2. **Ship 30 for 30 Content Skill**:
   - Dedicated engine encoding Nicolas Cole and Dickie Bush's viral essay principles (Hook, 1-3-1 cadence, bold scanning anchors, atomic framework breakdown, actionable 48-hour takeaway, and ~1,250 words).

3. **Claude-Style In-App Artifact Viewer**:
   - Generates and renders live interactive HTML/CSS/JS artifacts (e.g. ICE Prioritization Matrix, Retention Curve Simulator, 40% PMF Test) beside the chat.
   - **Security Sandboxed**: Untrusted HTML rendered inside an isolated `iframe` with `sandbox="allow-scripts"` (blocks `allow-same-origin`, `allow-top-navigation`, preventing XSS and token exfiltration).

4. **Flexible LLM Provider Layer (Cloud & Local)**:
   - **Cloud**: Google Gemini 2.5 Flash / Anthropic Claude / OpenAI.
   - **Local LLM**: Mandatory demo support via **Ollama** running locally on `http://localhost:11434` (e.g., `llama3.2`, `mistral`).
   - Seamless live UI status toggle with automatic fallback.

5. **Operational Observability & Health**:
   - REST API endpoints (`/api/health`, `/api/transcripts`, `/api/chat`, `/api/model-status`).
   - Live telemetry viewer tracking retrieval scores, latency in milliseconds, and model routing.

---

## 🚀 Quickstart & Installation

### Option 1: One-Command Startup (Node / tsx)

```bash
# 1. Clone repository
git clone https://github.com/krishnameera2011/lenny-growth-assistant.git
cd lenny-growth-assistant

# 2. Install dependencies
npm install

# 3. Setup environment variables (optional for local Ollama)
cp .env.example .env

# 4. Start the application
npm run dev
