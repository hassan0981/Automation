import React from 'react';
import { Globe, TrendingUp, Share2, Target, Smartphone } from 'lucide-react';
import { QuickActionItem } from '../types/chat';

interface QuickActionsProps {
  onSelectAction: (query: string) => void;
  disabled?: boolean;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: 'web-dev',
    label: 'Web Development',
    query: 'I want to know about Web Development.',
    iconName: 'Globe',
  },
  {
    id: 'seo',
    label: 'SEO',
    query: 'I want to know about SEO.',
    iconName: 'TrendingUp',
  },
  {
    id: 'social-media',
    label: 'Social Media',
    query: 'I want to know about Social Media.',
    iconName: 'Share2',
  },
  {
    id: 'meta-ads',
    label: 'Meta Ads',
    query: 'I want to know about Meta Ads.',
    iconName: 'Target',
  },
  {
    id: 'app-dev',
    label: 'App Development',
    query: 'I want to know about App Development.',
    iconName: 'Smartphone',
  },
];

const renderIcon = (name?: string) => {
  switch (name) {
    case 'Globe':
      return <Globe className="w-3.5 h-3.5 text-cyan-400" />;
    case 'TrendingUp':
      return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
    case 'Share2':
      return <Share2 className="w-3.5 h-3.5 text-pink-400" />;
    case 'Target':
      return <Target className="w-3.5 h-3.5 text-amber-400" />;
    case 'Smartphone':
      return <Smartphone className="w-3.5 h-3.5 text-indigo-400" />;
    default:
      return null;
  }
};

export const QuickActions: React.FC<QuickActionsProps> = ({ onSelectAction, disabled }) => {
  return (
    <div className="py-2.5 px-3 sm:px-4 border-t border-slate-800/80 bg-slate-900/40">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
        <span>Suggested Services</span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar no-scrollbar">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectAction(action.query)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 border border-slate-700/70 hover:border-cyan-500/50 hover:text-white transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm"
          >
            {renderIcon(action.iconName)}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
