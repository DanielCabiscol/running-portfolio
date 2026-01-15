import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatSuggestions } from './ChatSuggestions';
import { useChat } from '../../hooks/useChat';
import type { ChatContext } from '../../types/chat';

interface ChatInterfaceProps {
  context: ChatContext;
  isDark: boolean;
  isDataLoading?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  context,
  isDark,
  isDataLoading = false,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, isLoading, sendMessage, clearMessages } = useChat(context);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleSuggestionSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input after sending
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  if (isDataLoading) {
    return (
      <div
        className={`rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg p-8 text-center`}
      >
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-4" />
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          Cargando datos de entrenamiento...
        </p>
      </div>
    );
  }

  if (context.recentActivities.length === 0) {
    return (
      <div
        className={`rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg p-8 text-center`}
      >
        <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          AI Running Coach
        </h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          No hay datos de entrenamiento disponibles. Conecta con Strava y carga
          tus actividades para poder chatear con el coach IA.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg overflow-hidden`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'} flex justify-between items-center`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="text-amber-500" size={24} />
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              AI Running Coach
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Powered by GPT-4 con tus datos de Strava
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
            title="Limpiar chat"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div
        className={`h-[400px] overflow-y-auto p-4 space-y-4 ${
          isDark ? 'bg-gray-800' : 'bg-gray-50'
        }`}
      >
        {messages.length === 0 ? (
          <ChatSuggestions onSelect={handleSuggestionSelect} isDark={isDark} />
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} isDark={isDark} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-amber-500">
                <Loader2 className="animate-spin" size={20} />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Analizando tus datos...
                </span>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className={`p-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
      >
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre tu entrenamiento..."
            className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              isDark
                ? 'bg-gray-800 text-white placeholder-gray-500'
                : 'bg-gray-100 text-gray-900 placeholder-gray-500'
            }`}
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              isLoading || !input.trim()
                ? isDark
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }`}
            whileHover={!isLoading && input.trim() ? { scale: 1.05 } : {}}
            whileTap={!isLoading && input.trim() ? { scale: 0.95 } : {}}
          >
            <Send size={20} />
          </motion.button>
        </div>
        <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          El coach tiene acceso a tus ultimas {context.recentActivities.length} actividades
        </p>
      </form>
    </div>
  );
};

export default ChatInterface;
