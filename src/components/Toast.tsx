import React, { useEffect } from 'react';
import { Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md animate-slide-up">
      <Info className="w-4 h-4 text-cyan-400 shrink-0" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
