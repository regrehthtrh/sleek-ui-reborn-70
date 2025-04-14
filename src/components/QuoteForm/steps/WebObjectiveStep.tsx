
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormTranslations } from '../translations';
import { WebObjective } from '../types';
import { Globe, ShoppingBag, Building, HelpCircle, ArrowRight } from 'lucide-react';

interface WebObjectiveStepProps {
  onNext: (value: WebObjective) => void;
  translation: FormTranslations;
  language: string;
}

export const WebObjectiveStep: React.FC<WebObjectiveStepProps> = ({ 
  onNext, 
  translation,
  language
}) => {
  const [selected, setSelected] = React.useState<WebObjective | null>(null);
  const [error, setError] = React.useState('');
  
  const objectives: Array<{
    id: WebObjective;
    icon: React.ReactNode;
    label: string;
  }> = [
    { 
      id: 'Online presence', 
      icon: <Globe className="h-5 w-5" />, 
      label: translation.webObjectives.onlinePresence
    },
    { 
      id: 'Online sales', 
      icon: <ShoppingBag className="h-5 w-5" />, 
      label: translation.webObjectives.onlineSales
    },
    { 
      id: 'Company information', 
      icon: <Building className="h-5 w-5" />, 
      label: translation.webObjectives.companyInfo
    },
    { 
      id: 'Other', 
      icon: <HelpCircle className="h-5 w-5" />, 
      label: translation.webObjectives.webOther
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setError(translation.webObjectiveError);
      return;
    }
    onNext(selected);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.webObjectiveTitle}</h2>
      </div>
      
      <div className="space-y-3">
        {objectives.map((objective) => (
          <div 
            key={objective.id}
            onClick={() => {
              setSelected(objective.id);
              setError('');
            }}
            className={`option-card flex items-center gap-3 ${selected === objective.id ? 'selected' : ''}`}
          >
            <div className="bg-primary/10 p-2 rounded-full">
              {objective.icon}
            </div>
            <span>{objective.label}</span>
          </div>
        ))}
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <Button 
        type="submit" 
        className="w-full"
        size="lg"
      >
        {translation.webObjectiveButton}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
