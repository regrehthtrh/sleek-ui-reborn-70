
import React from 'react';
import { CloudSubtype } from '../types';
import { FormTranslations } from '../translations';
import { Cloud, ArrowUpCircle, Network, GitMerge, Server, Settings } from 'lucide-react';

interface CloudSubtypeStepProps {
  onNext: (value: CloudSubtype) => void;
  translation: FormTranslations;
  language: string;
}

export const CloudSubtypeStep: React.FC<CloudSubtypeStepProps> = ({ 
  onNext, 
  translation,
  language
}) => {
  const subtypes: Array<{
    id: CloudSubtype;
    icon: React.ReactNode;
    label: string;
  }> = [
    { 
      id: 'Cloud Migration', 
      icon: <ArrowUpCircle className="h-6 w-6" />, 
      label: "Cloud Migration" 
    },
    { 
      id: 'Cloud Architecture', 
      icon: <Network className="h-6 w-6" />, 
      label: "Cloud Architecture" 
    },
    { 
      id: 'DevOps Implementation', 
      icon: <GitMerge className="h-6 w-6" />, 
      label: "DevOps Implementation" 
    },
    { 
      id: 'Managed Services', 
      icon: <Server className="h-6 w-6" />, 
      label: "Managed Services" 
    },
    { 
      id: 'Serverless Solutions', 
      icon: <Cloud className="h-6 w-6" />, 
      label: "Serverless Solutions" 
    },
    { 
      id: 'Other', 
      icon: <Settings className="h-6 w-6" />, 
      label: "Other" 
    }
  ];

  const handleSelect = (subtype: CloudSubtype) => {
    onNext(subtype);
  };

  return (
    <div className="space-y-6 form-appear">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.cloudSubtypeTitle || "What cloud service do you need?"}</h2>
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
