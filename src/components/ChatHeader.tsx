import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

interface ChatHeaderProps {
  onResetChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onResetChat }) => {
  return (
    <header className="glass-header px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 z-10">
      <div className="flex items-center gap-3">
        {/* Brand Avatar with Glowing Gradient Border */}
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          {/* Active Online Status Indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        </div>

        {/* Brand Name & Assistant Info */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-white tracking-tight">Bouncy AI</h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Assistant
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Bouncy Digital</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onResetChat}
          title="Restart Conversation"
          aria-label="Restart Conversation"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all duration-200 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
