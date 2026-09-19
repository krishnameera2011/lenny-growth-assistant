import React from 'react';
import { Plus, MessageSquare, Trash2, Sparkles, Database, PenTool, Wand2 } from 'lucide-react';
import { Session } from '../types';

interface SidebarProps {
  sessions: Session[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string, e: React.MouseEvent) => void;
  onSelectPrompt: (promptText: string) => void;
  selectedMode: 'chat' | 'ship30' | 'artifact';
  onSelectMode: (mode: 'chat' | 'ship30' | 'artifact') => void;
}

const EPISODE_PROMPTS = [
  { guest: "Brian Chesky", title: "Founder Mode & 11-Star Experience", prompt: "How does Brian Chesky define Founder Mode and why did Airbnb eliminate traditional PMs?" },
  { guest: "Shreyas Doshi", title: "The LNO Framework for PMs", prompt: "How should product leaders categorize tasks using Shreyas Doshi's LNO framework?" },
  { guest: "Elena Verna", title: "B2B Product-Led Growth", prompt: "What are growth loops and why are traditional funnels dead according to Elena Verna?" },
  { guest: "Gustaf Alströmer", title: "PMF from Retention Curves", prompt: "How does Gustaf Alströmer evaluate Product-Market Fit from retention curves?" },
  { guest: "Sean Ellis", title: "ICE Prioritization Matrix", prompt: "Calculate ICE score for my growth experiment and explain Sean Ellis 40% PMF rule." },
  { guest: "April Dunford", title: "Product Positioning Framework", prompt: "What is April Dunford's 5-step positioning framework for competitive differentiation?" }
];

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onSelectPrompt,
  selectedMode,
  onSelectMode
}) => {
  return (
    <aside className="w-72 bg-[#060914]/95 backdrop-blur-xl border-r border-cyan-500/15 flex flex-col h-full shrink-0 select-none">
      {/* New AI Discussion Button */}
      <div className="p-3.5 border-b border-cyan-500/15">
        <button
          onClick={onNewSession}
          className="relative group w-full overflow-hidden flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-cyan-200" />
          <span className="tracking-wide">New AI Discussion</span>
        </button>
      </div>

      {/* Inference Skill Mode Selector */}
      <div className="p-3.5 border-b border-cyan-500/15">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400/80 mb-2 px-1 flex items-center justify-between">
          <span>Inference Skill Mode</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
        </div>
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#091124] rounded-xl border border-cyan-500/20 shadow-inner">
          <button
            onClick={() => onSelectMode('chat')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer ${
              selectedMode === 'chat'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 mb-1" />
            <span>Grounded</span>
          </button>
          <button
            onClick={() => onSelectMode('ship30')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer ${
              selectedMode === 'ship30'
                ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.25)]'
                : 'text-slate-400 hover:text-indigo-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 mb-1" />
            <span>Ship 30</span>
          </button>
          <button
            onClick={() => onSelectMode('artifact')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer ${
              selectedMode === 'artifact'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                : 'text-slate-400 hover:text-emerald-200'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 mb-1" />
            <span>Artifact</span>
          </button>
        </div>
      </div>

      {/* Discussions List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        <div className="flex items-center justify-between px-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
            Discussions ({sessions.length})
          </span>
        </div>

        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelectSession(s.id)}
            className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
              s.id === activeSessionId
                ? 'bg-gradient-to-r from-cyan-950/60 to-indigo-950/40 text-cyan-200 font-medium border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${s.id === activeSessionId ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="truncate">{s.title}</span>
            </div>
            {sessions.length > 1 && (
              <button
                onClick={(e) => onDeleteSession(s.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}

        {/* Curated Neural Starters */}
        <div className="pt-4 mt-4 border-t border-cyan-500/15 px-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400/80 mb-2 px-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Curated Neural Starters</span>
          </div>
          <div className="space-y-1.5">
            {EPISODE_PROMPTS.map((ep, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPrompt(ep.prompt)}
                className="w-full text-left p-2.5 rounded-xl bg-[#091124]/70 hover:bg-[#0f1c3d] border border-cyan-500/15 hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-cyan-100 transition-all group shadow-sm hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 font-semibold mb-0.5">
                  <span>{ep.guest}</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <div className="truncate text-slate-300 font-medium group-hover:text-white">
                  {ep.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="p-3 border-t border-cyan-500/15 bg-[#060914]/80">
        <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300/70">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>8 Pod Transcripts</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            100% GROUNDED
          </span>
        </div>
      </div>
    </aside>
  );
};