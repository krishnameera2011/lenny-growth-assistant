import React, { useState, useRef, useEffect } from 'react';
import { Send, Clock, BookOpen, Wand2, ArrowRight, Sparkles, Check, Copy, Radio, PenTool, ShieldAlert } from 'lucide-react';
import { Message, Artifact } from '../types';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (msg: string) => void;
  onOpenArtifact: (artifact: Artifact) => void;
  selectedMode: 'chat' | 'ship30' | 'artifact';
  onSelectMode: (mode: 'chat' | 'ship30' | 'artifact') => void;
  currentModelName: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onOpenArtifact,
  selectedMode,
  onSelectMode,
  currentModelName
}) => {
  const [inputText, setInputText] = useState('');
  const [expandedCitationId, setExpandedCitationId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#040711] overflow-hidden relative cyber-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6 relative z-10">
        {messages.length === 0 ? (
          /* Exact Zero State Matching Your Screenshot */
          <div className="max-w-4xl mx-auto my-auto text-center space-y-7 py-6">
            {/* Glowing Orb */}
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 opacity-30 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0c1630] via-[#101b3d] to-[#1a1c4b] border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <Radio className="w-10 h-10 animate-pulse text-cyan-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-ping" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>NEURAL ASSISTANT ENGINE • FDE READY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 tracking-tight">
                Lenny Growth AI
              </h2>
              <p className="text-xs sm:text-sm text-slate-300/80 max-w-xl mx-auto leading-relaxed font-sans">
                Next-generation growth intelligence grounded in 8+ verified podcast transcripts. Featuring zero-hallucination guardrails, Ship 30 essay generation, and live interactive artifact synthesis.
              </p>
            </div>

            {/* 3 Holographic Cards (Screenshot exact match) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2">
              {/* Card 1: Grounded Neural Q&A */}
              <div
                onClick={() => onSelectMode('chat')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md ${
                  selectedMode === 'chat'
                    ? 'bg-[#081226]/90 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400'
                    : 'bg-[#070d1e]/70 border-cyan-500/20 hover:border-cyan-500/40 hover:bg-[#0a1329]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-white font-mono">Grounded Neural Q&A</h3>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">RAG</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strict transcript answers with exact episode timestamps and verified guest quotes.
                </p>
              </div>

              {/* Card 2: Ship 30 for 30 Skill */}
              <div
                onClick={() => onSelectMode('ship30')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md ${
                  selectedMode === 'ship30'
                    ? 'bg-[#120f2b]/90 border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.25)] ring-1 ring-indigo-400'
                    : 'bg-[#0c0a21]/70 border-indigo-500/20 hover:border-indigo-500/40 hover:bg-[#110e2d]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                  <PenTool className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-white font-mono">Ship 30 for 30 Skill</h3>
                  <span className="text-[10px] font-mono font-bold text-indigo-400">1-3-1</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Transforms any tactic into an Atomic Essay with Hook, 1 Big Idea, and 3 Pillars.
                </p>
              </div>

              {/* Card 3: Artifact Synthesis */}
              <div
                onClick={() => onSelectMode('artifact')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden backdrop-blur-md ${
                  selectedMode === 'artifact'
                    ? 'bg-[#091a1d]/90 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400'
                    : 'bg-[#061417]/70 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-[#0a1e22]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-white font-mono">Artifact Synthesis</h3>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">LIVE UI</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive calculators and retention curve simulators rendered in real-time.
                </p>
              </div>
            </div>

            {/* Quick Launch Neural Prompts Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-16 bg-cyan-500/30" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/80 font-bold">
                  Quick Launch Neural Prompts
                </span>
                <div className="h-[1px] w-16 bg-cyan-500/30" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-2xl mx-auto">
                <button
                  type="button"
                  onClick={() => onSendMessage("How does Brian Chesky define Founder Mode and why did Airbnb eliminate traditional PMs?")}
                  className="px-4 py-2.5 rounded-full bg-[#081226]/80 hover:bg-[#0d1d3d] border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-100 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
                >
                  <span className="text-amber-400">⚡</span>
                  <span>Brian Chesky on Founder Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectMode('ship30');
                    onSendMessage("Write a Ship 30 atomic essay on Gustaf Alströmer's framework for PMF retention curves.");
                  }}
                  className="px-4 py-2.5 rounded-full bg-[#120f2b]/80 hover:bg-[#1a163d] border border-indigo-500/30 hover:border-indigo-400 text-xs font-mono text-indigo-100 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(99,102,241,0.25)] transition-all cursor-pointer"
                >
                  <span>✍️</span>
                  <span>Ship 30 Essay: Retention & PMF</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectMode('artifact');
                    onSendMessage("Generate an interactive Sean Ellis ICE Prioritization matrix calculator artifact.");
                  }}
                  className="px-4 py-2.5 rounded-full bg-[#081716]/80 hover:bg-[#0c2422] border border-emerald-500/30 hover:border-emerald-400 text-xs font-mono text-emerald-100 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
                >
                  <span className="text-emerald-400">⚡</span>
                  <span>Generate ICE Matrix Artifact</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSendMessage("What is the best recipe for chocolate chip cookies?")}
                  className="px-4 py-2.5 rounded-full bg-[#1c1409]/80 hover:bg-[#2c200e] border border-amber-500/30 hover:border-amber-400 text-xs font-mono text-amber-100 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Test Guardrail (Out of Domain)</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Active Chat Messages */
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.role === 'user' ? (
                <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white px-5 py-3.5 shadow-[0_0_20px_rgba(6,182,212,0.25)] border border-cyan-300/30 text-xs sm:text-sm font-medium">
                  {msg.content}
                </div>
              ) : (
                <div className="w-full max-w-3xl rounded-2xl bg-[#080d1e]/90 border border-cyan-500/25 p-5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-4 backdrop-blur-xl relative">
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 font-bold text-cyan-300">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        Lenny Growth AI
                      </span>
                      {msg.modelUsed && (
                        <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[10px]">
                          {msg.modelUsed}
                        </span>
                      )}
                      {msg.latencyMs && (
                        <span className="flex items-center gap-1 text-slate-400 text-[10px]">
                          <Clock className="w-2.5 h-2.5 text-cyan-400" />
                          {msg.latencyMs}ms
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="p-1.5 rounded-lg hover:bg-cyan-950/60 border border-transparent hover:border-cyan-500/30 text-slate-400 hover:text-cyan-200 transition-all cursor-pointer"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>

                  {msg.artifact && (
                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#0b1c36] to-[#161238] border border-cyan-400/40 flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center font-bold">
                          <Wand2 className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                          <div className="text-xs font-bold font-mono text-cyan-100 flex items-center gap-2">
                            <span>{msg.artifact.title}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 uppercase font-semibold border border-cyan-500/30">
                              {msg.artifact.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300">
                            {msg.artifact.description || 'Interactive tool'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenArtifact(msg.artifact!)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer shrink-0"
                      >
                        <span>Open Tool</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-3 border-t border-cyan-500/15 space-y-1.5">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400/80 flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-cyan-400" />
                        <span>Source Citations ({msg.citations.length})</span>
                      </div>
                      {msg.citations.map((cite, cIdx) => (
                        <div key={cIdx} className="rounded-xl bg-[#060a16] border border-cyan-500/20 p-2.5 text-xs">
                          <div
                            onClick={() => setExpandedCitationId(expandedCitationId === `${msg.id}-${cIdx}` ? null : `${msg.id}-${cIdx}`)}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                                {cite.timestamp}
                              </span>
                              <span className="font-semibold text-cyan-200">{cite.guest}:</span>
                              <span className="text-slate-400 text-[11px] truncate">{cite.episodeTitle}</span>
                            </div>
                            <span className="text-[10px] font-mono text-cyan-300/80">{cite.relevanceScore}% match</span>
                          </div>
                          {expandedCitationId === `${msg.id}-${cIdx}` && (
                            <div className="mt-2 pt-2 border-t border-cyan-500/15 text-[11px] text-slate-200 italic bg-[#081226]/80 p-2.5 rounded-lg">
                              "{cite.quoteSnippet}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#091329]/90 border border-cyan-500/30 max-w-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-[0_0_10px_#22d3ee]" />
            <div className="text-xs font-mono text-slate-300">
              <span className="font-bold text-cyan-300">Searching Neural Transcripts...</span>
              <p className="text-[11px] text-slate-400">Routing to {currentModelName}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bottom Bar (matching screenshot) */}
      <div className="p-4 border-t border-cyan-500/20 bg-[#060914]/95 backdrop-blur-xl relative z-10">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-2.5">
          {/* Active inference pill bar */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400/80">
                ACTIVE INFERENCE:
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                {selectedMode === 'chat' && (
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    💬 Grounded Q&A
                  </span>
                )}
                {selectedMode === 'ship30' && (
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                    ✍️ Ship 30 Essay Mode
                  </span>
                )}
                {selectedMode === 'artifact' && (
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    ⚡ Live Artifact Mode
                  </span>
                )}
              </div>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/60 hidden sm:inline">
              ENTER to execute • SHIFT + ENTER for newline
            </span>
          </div>

          <div className="relative flex items-end rounded-2xl bg-[#091124]/90 border border-cyan-500/30 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all shadow-lg">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a product or growth question grounded in Lenny’s Podcast transcripts..."
              rows={2}
              className="w-full bg-transparent px-4 py-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none font-sans"
            />
            <div className="p-2 shrink-0">
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-30 text-white flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] font-mono text-cyan-400/50">
              Zero-Hallucination Shield • 8 Grounded Episodes • Dual Engine: Cloud Gemini & Local Ollama
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};