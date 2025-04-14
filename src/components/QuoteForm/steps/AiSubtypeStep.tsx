
import React from 'react';
import { AiSubtype } from '../types';
import { FormTranslations } from '../translations';
import { Brain, MessageSquare, Eye, BarChart2, Bot, Sparkles } from 'lucide-react';

interface AiSubtypeStepProps {
  onNext: (value: AiSubtype) => void;
  translation: FormTranslations;
  language: string;
}

export const AiSubtypeStep: React.FC<AiSubtypeStepProps> = ({ 
  onNext, 
  translation,
  language
}) => {
  const subtypes: Array<{
    id: AiSubtype;
    icon: React.ReactNode;
    label: string;
  }> = [
    { 
      id: 'Machine Learning', 
      icon: <Brain className="h-6 w-6" />, 
      label: "Machine Learning" 
    },
    { 
      id: 'Natural Language Processing', 
      icon: <MessageSquare className="h-6 w-6" />, 
      label: "Natural Language Processing" 
    },
    { 
      id: 'Computer Vision', 
      icon: <Eye className="h-6 w-6" />, 
      label: "Computer Vision" 
    },
    { 
      id: 'Predictive Analytics', 
      icon: <BarChart2 className="h-6 w-6" />, 
      label: "Predictive Analytics" 
    },
    { 
      id: 'Chatbot', 
      icon: <Bot className="h-6 w-6" />, 
      label: "Chatbot" 
    },
    { 
      id: 'Other', 
      icon: <Sparkles className="h-6 w-6" />, 
      label: "Other" 
    }
  ];

  const handleSelect = (subtype: AiSubtype) => {
    onNext(subtype);
  };

  return (
    <div className="space-y-6 form-appear">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.aiSubtypeTitle || "What AI & ML solution are you looking for?"}</h2>
      </div>
      
      <div className="space-y-3">
        {subtypes.map((subtype) => (
          <div 
            key={subtype.id}
            onClick={() => handleSelect(subtype.id)}
            className="option-card flex items-center gap-3 hover:scale-[1.01] transition-all"
          >
            <div className="bg-primary/10 p-3 rounded-full">
              {subtype.icon}
            </div>
            <span className="flex-1">{subtype.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
