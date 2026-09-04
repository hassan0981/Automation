export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  query: string;
  iconName?: string;
}
