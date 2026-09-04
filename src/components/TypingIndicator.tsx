import React from 'react';
import { Sparkles } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-2.5 max-w-[85%] animate-message-in">
      {/* Bot Mini Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shrink-0 shadow-md">
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      {/* Typing Bubble */}
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-slate-800/90 border border-slate-700/60 shadow-lg flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce-dot-1" />
        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce-dot-2" />
        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce-dot-3" />
        <span className="text-xs text-slate-400 ml-2 font-medium">Bouncy AI is typing...</span>
      </div>
    </div>
  );
};
