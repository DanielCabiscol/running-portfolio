import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Calendar,
  Target,
  Heart,
  Zap,
  MessageCircle,
} from 'lucide-react';

interface ChatSuggestionsProps {
  onSelect: (prompt: string) => void;
  isDark: boolean;
}

const suggestions = [
  {
    label: 'Analiza mi entrenamiento',
    prompt: 'Analiza mi entrenamiento reciente y dame feedback sobre mi progreso.',
    icon: TrendingUp,
  },
  {
    label: 'Resumen semanal',
    prompt: 'Dame un resumen de mi entrenamiento de esta semana y comparalo con semanas anteriores.',
    icon: Calendar,
  },
  {
    label: 'Prediccion de tiempos',
    prompt: 'Basado en mis entrenamientos, que tiempo podria hacer en una carrera de 10K?',
    icon: Target,
  },
  {
    label: 'Estado de forma',
    prompt: 'Como esta mi estado de forma actual? Estoy mejorando o empeorando?',
    icon: Heart,
  },
  {
    label: 'Recomendaciones',
    prompt: 'Que deberia mejorar en mi entrenamiento? Dame recomendaciones especificas.',
    icon: Zap,
  },
  {
    label: 'Siguiente entrenamiento',
    prompt: 'Basado en mis ultimos entrenamientos, que tipo de entrenamiento deberia hacer hoy?',
    icon: MessageCircle,
  },
];

export const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ onSelect, isDark }) => {
  return (
    <div className="space-y-4">
      <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Hola! Soy tu coach de running con IA. Puedo analizar tus datos de Strava
        y darte recomendaciones personalizadas. Prueba una de estas sugerencias:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.label}
            onClick={() => onSelect(suggestion.prompt)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <div className="flex-shrink-0">
              <suggestion.icon size={20} className="text-amber-500" />
            </div>
            <span className="text-sm font-medium">{suggestion.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestions;
