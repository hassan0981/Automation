import React from 'react';
import { ChatWindow } from './components/ChatWindow';
import { Sparkles, Globe, Layers } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-6 bg-[#0B0F19] text-slate-100 overflow-x-hidden">
      {/* Dynamic Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[15%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] rounded-full bg-purple-600/10 blur-[130px]" />
        
        {/* Subtle Grid overlay for high-tech digital agency feel */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`, 
            backgroundSize: '32px 32px' 
          }} 
        />
      </div>

      {/* Top Brand Banner (Desktop Showcase) */}
      <header className="hidden sm:flex items-center gap-3 mb-5 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-lg text-xs">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bouncy Digital</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1 text-slate-400">
          <Globe className="w-3 h-3 text-slate-500" />
          <span>BouncyDigital.com</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1 text-indigo-300 font-medium">
          <Layers className="w-3 h-3 text-indigo-400" />
          <span>Phase 1 UI Demo</span>
        </div>
      </header>

      {/* Main Interactive Chat Widget */}
      <main className="w-full h-screen sm:h-auto flex items-center justify-center">
        <ChatWindow />
      </main>
    </div>
  );
};

export default App;
