# Design Document: The Lenny Growth Assistant
## UI/UX Principles, Information Architecture & Design Decisions
**Prepared for:** Oogway Labs — Forward Deployed Engineer Role  

---

## 1. Design Philosophy & Core Aesthetic

The Lenny Growth Assistant is designed as a high-density, mission-critical workspace for Product Managers and Growth Executives. It departs from generic chat interfaces by adopting a two-pane interactive workstation model:

- Left / Center Pane: Conversational intelligence, source citations, Ship 30 for 30 essay reader, and prompt controls.
- Right Split-Pane (Claude-style Artifact Viewer): Live interactive rendering of generated HTML/CSS tools, markdown documents, and sandboxed code.
- Visual Tone: Sophisticated slate-and-navy executive dark theme (#090d16 background, #131d2e card containers, #38bdf8 sky accents, and #10b981 emerald verification badges). High contrast text passes WCAG AA contrast standards.

---

## 2. Information Architecture (IA)

- Top Header Bar:
  - Product Brand & Episode Counter ("The Lenny Growth Assistant")
  - Model Provider Switcher Badge (Cloud Gemini vs. Local Ollama)
  - FDE Candidate Master Guide Modal
  - Deliverables Hub (PRD, Architecture, Design, README, Tests)
  - Observability & System Logs (Live Telemetry Drawer)
  - Transcript Knowledge Base (Episode Browser)

- Left Collapsible Navigation Drawer:
  - New Chat Session Button
  - Mode Selector (Grounded Chat | Ship 30 for 30 | Artifact)
  - Session History List (Persistent with rename & delete)
  - Curated Prompt Quick-Starters (Chesky, Doshi, Verna, Ellis, Alstromer)

- Central Conversation View:
  - Welcome & Discovery Guide (When session is fresh)
  - User Query Bubbles
  - Assistant Grounded Responses
    - Executive Key Takeaways
    - Expandable Source Citations (Timestamp, Guest, Quote Snippet)
    - Ship 30 for 30 Formatted Sections (Hook, 1-3-1, Frameworks)
    - Open Interactive Artifact Action Pill
  - Sticky Message Input Bar (Mode pill, clear button, submit button)

- Right Side Split-Screen: Claude-style Artifact Viewer:
  - Header: Artifact Title + Type Badge + Close / Fullscreen Toggle
  - View Mode Tabs:
    - Preview (Interactive sandboxed execution)
    - Source Code (Raw HTML/JS with syntax highlights & copy)
    - Security Sandbox (Explanation of iframe isolation)
  - Sandboxed Iframe Container

---

## 3. Key Interaction States

1. Initial State (Empty Session):
   - Displays clear welcome guidance, high-impact starter questions (e.g. "How does Brian Chesky define Founder Mode?", "Generate an interactive ICE matrix").
2. Retrieval & Thinking State:
   - Animated pulse indicator displaying: "Searching 8 episodes... Evaluating source confidence..."
   - Latency timer showing milliseconds elapsed.
3. Citation Expansion State:
   - Citations appear as clean pills under the response. Clicking any pill expands the verbatim podcast quote snippet, timestamp marker, and episode title.
4. Ship 30 for 30 Reader State:
   - Distinctive typography with 1-3-1 cadence, bolded scanning words, and dedicated word-count counter badge (~1,250 words).
5. Artifact Inspection State:
   - Automatically slides in the Artifact Viewer without obscuring the chat history. User can switch tabs between Preview and Source Code or click Fullscreen for expanded workspace manipulation.

---

## 4. Responsive Behavior & Accessibility

- Desktop (>= 1024px): Dual-pane side-by-side split view. Chat occupies 50%–60%, and Artifact Viewer occupies 40%–50%.
- Mobile / Tablet (< 1024px): Side drawer collapses into a mobile hamburger menu. When an artifact is opened, the Artifact Viewer functions as a modal sheet with tab navigation.
- Accessibility (WCAG AA):
  - Contrast ratio > 4.5:1 on all interactive text against slate background.
  - Full keyboard accessibility (Enter to submit, Shift+Enter for multiline).
  - Explicit aria-label and descriptive button titles across all icons.
