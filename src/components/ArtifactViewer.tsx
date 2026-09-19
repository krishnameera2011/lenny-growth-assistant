import React from 'react';
import { X } from 'lucide-react';
import { Artifact } from '../types';

interface ArtifactViewerProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifact, onClose }) => {
  if (!artifact) return null;

  return (
    <aside className="w-96 md:w-[480px] lg:w-[540px] border-l border-stone-800 bg-stone-900 flex flex-col h-full shrink-0 shadow-2xl z-20">
      <div className="h-14 border-b border-stone-800 px-4 flex items-center justify-between bg-stone-900/90">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
            Interactive Tool
          </span>
          <h3 className="text-xs font-bold text-stone-100 truncate max-w-[280px] mt-0.5">
            {artifact.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 bg-stone-950 p-2 overflow-hidden flex flex-col">
        <iframe
          srcDoc={artifact.content}
          title={artifact.title}
          sandbox="allow-scripts"
          className="w-full flex-1 rounded-lg border border-stone-800 bg-stone-900 shadow-inner"
        />
      </div>

      <div className="p-3 border-t border-stone-800 bg-stone-900/60 text-[11px] text-stone-400">
        <p>{artifact.description}</p>
      </div>
    </aside>
  );
};