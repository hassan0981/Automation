import React, { useState } from 'react';
import { Sparkles, User, Copy, Check } from 'lucide-react';
import { ChatMessage } from '../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard permission fails
    }
  };

  return (
    <div
      className={`flex items-end gap-2.5 max-w-[85%] sm:max-w-[78%] animate-message-in ${
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full p-[1.5px] shrink-0 shadow-md ${
          isUser
            ? 'bg-gradient-to-tr from-slate-600 to-slate-400'
            : 'bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600'
        }`}
      >
        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
          {isUser ? (
            <User className="w-4 h-4 text-slate-300" />
          ) : (
            <Sparkles className="w-4 h-4 text-cyan-400" />
          )}
        </div>
      </div>

      {/* Bubble Container */}
      <div className="flex flex-col group relative">
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg break-words ${
            isUser
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
              : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-bl-sm backdrop-blur-sm'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Footer: Timestamp & Copy button */}
        <div
          className={`flex items-center gap-1.5 mt-1 px-1 text-[11px] text-slate-400 font-medium ${
            isUser ? 'justify-end' : 'justify-start'
          }`}
        >
          <span>{message.timestamp}</span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-cyan-400 rounded text-slate-400 ml-1"
              title="Copy message"
              aria-label="Copy message"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
