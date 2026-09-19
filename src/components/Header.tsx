import React from 'react';
import { Cpu, BookOpen, Activity, GraduationCap, FileText, Radio, ShieldCheck } from 'lucide-react';
import { ModelOption } from '../types';

interface HeaderProps {
  currentModel: ModelOption;
  onOpenModelModal: () => void;
  onOpenKnowledgeModal: () => void;
  onOpenObservabilityModal: () => void;
  onOpenGuideModal: () => void;
  onOpenDeliverablesModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentModel,
  onOpenModelModal,
  onOpenKnowledgeModal,
  onOpenObservabilityModal,
  onOpenGuideModal,
  onOpenDeliverablesModal
}) => {
  return (
    <header className="h-16 border-b border-cyan-500/20 bg-[#060913]/90 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between z-20 shrink-0 select-none relative shadow-[0_4px_20px_-4px_rgba(6,182,212,0.15)]">
      {/* Top subtle laser line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* Brand & Identity */}
      <div className="flex items-center gap-3.5">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 opacity-70 blur-sm group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c1427] to-[#151c38] border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
            <Radio className="w-5 h-5 animate-pulse text-cyan-300" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 uppercase">
              Lenny Growth AI
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              NEURAL RAG v4.2
            </span>
          </div>
          <p className="text-[11px] font-mono text-cyan-200/50 hidden sm:flex items-center gap-1.5">
            <span>8 Pod Transcripts</span>
            <span className="text-cyan-500/40">•</span>
            <span>Ship 30 Engine</span>
            <span className="text-cyan-500/40">•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              Guardrails Active
            </span>
          </p>
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-2">
        {/* Model Switcher */}
        <button
          onClick={onOpenModelModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b1329]/80 border border-cyan-500/30 hover:border-cyan-400 text-xs text-slate-200 hover:text-white transition-all shadow-[0_0_12px_rgba(6,182,212,0.1)] hover:shadow-[0_0_16px_rgba(6,182,212,0.25)] cursor-pointer"
          title="Switch Model / Configure Ollama"
        >
          <span className={`w-2 h-2 rounded-full ${currentModel.isLocal ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-ping' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'}`} />
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-xs font-medium max-w-[130px] truncate">{currentModel.name}</span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            {currentModel.isLocal ? 'OLLAMA' : 'CLOUD'}
          </span>
        </button>

        {/* Knowledge Base */}
        <button
          onClick={onOpenKnowledgeModal}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-cyan-200 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/30 transition-all cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Knowledge (8)</span>
        </button>

        {/* Telemetry */}
        <button
          onClick={onOpenObservabilityModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-300 hover:text-white bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-500/30 hover:border-emerald-400 transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)] cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Telemetry</span>
        </button>

        {/* Deliverables */}
        <button
          onClick={onOpenDeliverablesModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-violet-300 hover:text-white bg-violet-950/30 hover:bg-violet-900/40 border border-violet-500/30 hover:border-violet-400 transition-all shadow-[0_0_10px_rgba(139,92,246,0.1)] cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-violet-400" />
          <span>Deliverables</span>
        </button>

        {/* FDE Guide */}
        <button
          onClick={onOpenGuideModal}
          className="relative group overflow-hidden flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 group-hover:from-cyan-400 group-hover:to-indigo-500 transition-all" />
          <GraduationCap className="w-4 h-4 relative z-10 text-cyan-100" />
          <span className="relative z-10 tracking-wide">FDE Guide</span>
        </button>
      </div>
    </header>
  );
};