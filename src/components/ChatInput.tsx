import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onPlaceholderClick: (featureName: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onPlaceholderClick,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    onSendMessage(trimmed);
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass-input-area p-3 sm:p-4 border-t border-slate-800">
      <div className="flex items-end gap-2 bg-slate-900/90 border border-slate-700/80 focus-within:border-cyan-500/60 focus-within:ring-1 focus-within:ring-cyan-500/30 rounded-2xl px-3 py-2 transition-all shadow-inner">
        {/* Attachment Placeholder Button */}
        <button
          type="button"
          onClick={() => onPlaceholderClick('File Attachment')}
          className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-xl transition-colors shrink-0 mb-0.5"
          title="Attach document or image (Coming in Phase 2)"
          aria-label="Attach document or image"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        {/* Microphone Placeholder Button */}
        <button
          type="button"
          onClick={() => onPlaceholderClick('Voice Input')}
          className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 rounded-xl transition-colors shrink-0 mb-0.5"
          title="Voice input (Coming in Phase 2)"
          aria-label="Voice input"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Text Input Area */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Bouncy AI anything..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-slate-100 text-sm placeholder-slate-500 focus:outline-none resize-none max-h-28 py-1.5 leading-relaxed custom-scrollbar disabled:opacity-50"
        />

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-md hover:shadow-cyan-500/20 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none shrink-0 mb-0.5"
          title="Send message (Enter)"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2 text-center">
        <span className="text-[11px] text-slate-400">
          Powered by <span className="text-slate-300 font-medium">Bouncy Digital</span> • Press <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-mono">Enter ↵</kbd> to send
        </span>
      </div>
    </div>
  );
};
