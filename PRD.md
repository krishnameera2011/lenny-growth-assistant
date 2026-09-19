# Product Requirements Document (PRD)
## The Lenny Growth Assistant
**Prepared for:** Oogway Labs — Forward Deployed Engineer Take-Home Assessment  
**Author:** Candidate (krishnameera093@gmail.com)  
**Date:** September 2026  
**Status:** Approved for Forward-Deployment  

---

## 1. Executive Summary & Discovery Brief

### 1.1 User and Problem
- **Primary Users**: Product Managers (PMs), Founders, Growth Leads, and Product Marketing Managers.
- **The Job to Complete**: 
  1. Access definitive, world-class advice on retention, pricing, positioning, growth loops, and team leadership without sifting through 150+ hours of podcast audio and disorganized transcripts.
  2. Synthesize grounded answers into high-impact, viral written essays (using the proven **Ship 30 for 30** atomic essay framework) for team alignment, executive proposals, and LinkedIn/newsletter publication.
  3. Generate and interact with live analytical artifacts (e.g. ICE Prioritization matrix, Cohort Retention curve simulator, 40% PMF survey engine) directly in their workflow.
- **Pain Points Removed**:
  - **Information Fragmentation**: Searching through hours of audio/video for specific frameworks (e.g., Shreyas Doshi’s LNO framework or Sean Ellis’s 40% rule).
  - **Hallucination & Generic Advice**: Typical LLMs give generic advice. The Lenny Growth Assistant provides strict source-grounding with exact timestamps, guest names, and quotes.
  - **Context Switching**: Eliminates the need to switch between ChatGPT, Google Docs, and spreadsheets by introducing an in-app Claude-style sandboxed Artifact Viewer.

### 1.2 Success Metrics
- **Product Metrics**:
  - **Grounding Accuracy**: >95% of factual claims cite an indexed transcript chunk with verified timestamp.
  - **Zero-Hallucination Fallback**: 100% acknowledgment rate when user asks queries outside indexed domain material.
  - **Artifact Engagement**: >60% of sessions generate or interact with an in-app artifact.
- **Operational Metrics**:
  - **P95 Latency**: <1,500ms for Cloud LLM (Gemini 2.5 Flash); <2,500ms for Local Ollama (`llama3.2`).
  - **API Availability**: >99.9% uptime on `/api/health` with graceful degraded-mode fallback when external LLM keys or Ollama ports are offline.

---

## 2. Assumptions & Client Brief Disclosures
Because the initial client brief was open-ended, the following key operational assumptions were made:
1. **Transcripts Corpus**: Indexed 8 cornerstone episodes (Brian Chesky, Shreyas Doshi, Elena Verna, Gustaf Alströmer, Marty Cagan, April Dunford, Sean Ellis, Lenny Rachitsky) covering core growth archetypes. Architecture supports automated ingestion of the full Lenny repo via vector embeddings.
2. **Local vs Cloud Hybrid Model**: Evaluators may test the product offline or behind corporate firewalls. Thus, the system includes dual-engine routing: Google Gemini 2.5 Flash for cloud performance and local Ollama (`llama3.2` / `mistral` on `localhost:11434`) for local compliance.
3. **Artifact Security**: Untrusted LLM-generated HTML/JS is isolated within an `iframe` with `sandbox="allow-scripts"`, preventing cross-site scripting (XSS), cookie access, or top-level navigation.

---

## 3. Scope Choices: Included vs. Excluded

| Component | Included in Scope | Intentionally Excluded & Why |
| :--- | :--- | :--- |
| **Ingestion & Retrieval** | Keyword + semantic token indexing, chunk metadata, confidence calculation, out-of-domain rejection. | Heavy external vector database (e.g. Pinecone). *Why*: Avoids external cloud billing dependencies for the evaluator; self-contained in-memory / PostgreSQL vector search is reproducible. |
| **Agent Skill Layer** | Dedicated Ship 30 for 30 skill with 1-3-1 cadence, bold formatting, and ~1,250 words; Claude-style Artifact Generator. | Open-ended agent web-browsing tool. *Why*: Strict grounding mandates answers remain faithful only to Lenny's verified knowledge. |
| **Artifact Viewer** | Side-by-side split screen, sandboxed iframe preview, raw source code viewer, one-click copy, and full-screen toggle. | Remote code execution server (Docker execution sandbox). *Why*: Client-side iframe sandboxing is safe, instant, and has zero server attack surface. |
| **Model Toggle** | UI selector for Cloud (Gemini 2.5 Flash, Claude, OpenAI) and Local Ollama with live port ping and automatic fallback. | Automatic cloud provisioning of GPU clusters. *Why*: Evaluator runs the demo on a personal laptop via `ollama run llama3.2`. |

---

## 4. Key Risks & Mitigation Strategy

1. **Risk: LLM Hallucination on Non-Podcast Topics**  
   *Mitigation*: RAG confidence threshold (<0.35) automatically trips the out-of-domain guardrail: *"The transcripts in our knowledge base do not support an answer to this question..."*
2. **Risk: Local Ollama Unavailability during Evaluation**  
   *Mitigation*: UI pings `http://localhost:11434/api/tags`. If Ollama is offline, the system alerts the user and smoothly falls back to the Cloud Gemini engine or deterministic local RAG synthesizer.
3. **Risk: Unsafe Artifact Execution (XSS / Injection)**  
   *Mitigation*: Rendered in an iframe with strict `sandbox="allow-scripts"` (without `allow-same-origin` or `allow-top-navigation`). The generated artifact cannot access host tokens, local storage, or window context.
4. **Risk: Evaluation Cold-Start Friction**  
   *Mitigation*: Single command startup (`npm run dev` or `docker compose up`), pre-seeded transcript chunks, and preset one-click prompt templates.
