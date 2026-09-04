import React, { useState } from 'react';
import { ChatMessage } from '../types/chat';
import { sendMessage } from '../lib/chatApi';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { QuickActions } from './QuickActions';
import { ChatInput } from './ChatInput';
import { Toast } from './Toast';

const getFormattedTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'initial-greeting',
    role: 'assistant',
    content: "Hi! 👋 I'm Bouncy AI. How can I help you today?",
    timestamp: getFormattedTime(),
  },
];

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastOpen(true);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: getFormattedTime(),
    };

    // 1. Append user message to state
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 2. Call isolated API layer
      const assistantReply = await sendMessage(text);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: assistantReply,
        timestamp: getFormattedTime(),
      };

      // 3. Append assistant reply to state
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I couldn't process your request right now. Please try again later.",
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handlePlaceholderClick = (featureName: string) => {
    showToast(`${featureName} is coming in the next phase! 🚀`);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `greeting-${Date.now()}`,
        role: 'assistant',
        content: "Hi! 👋 I'm Bouncy AI. How can I help you today?",
        timestamp: getFormattedTime(),
      },
    ]);
  };

  return (
    <div className="w-full h-full sm:h-[680px] sm:max-w-[480px] flex flex-col rounded-none sm:rounded-3xl glass-panel shadow-2xl overflow-hidden border-slate-800/80 relative">
      {/* Header */}
      <ChatHeader onResetChat={handleResetChat} />

      {/* Message List */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Quick Action Chips */}
      <QuickActions onSelectAction={handleQuickAction} disabled={isLoading} />

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onPlaceholderClick={handlePlaceholderClick}
        isLoading={isLoading}
      />

      {/* Placeholder Toast Notification */}
      <Toast
        message={toastMessage}
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
};
