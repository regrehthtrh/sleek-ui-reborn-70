
import React from 'react';
import { CybersecuritySubtype } from '../types';
import { FormTranslations } from '../translations';
import { ShieldCheck, Search, Lock, Activity, Database, Shield } from 'lucide-react';

interface CybersecuritySubtypeStepProps {
  onNext: (value: CybersecuritySubtype) => void;
  translation: FormTranslations;
  language: string;
}

export const CybersecuritySubtypeStep: React.FC<CybersecuritySubtypeStepProps> = ({ 
  onNext, 
  translation,
  language
}) => {
  const subtypes: Array<{
    id: CybersecuritySubtype;
    icon: React.ReactNode;
    label: string;
  }> = [
    { 
      id: 'Security Audit', 
      icon: <ShieldCheck className="h-6 w-6" />, 
      label: "Security Audit" 
    },
    { 
      id: 'Penetration Testing', 
      icon: <Search className="h-6 w-6" />, 
      label: "Penetration Testing" 
    },
    { 
      id: 'Security Implementation', 
      icon: <Lock className="h-6 w-6" />, 
      label: "Security Implementation" 
    },
    { 
      id: 'Monitoring & Response', 
      icon: <Activity className="h-6 w-6" />, 
      label: "Monitoring & Response" 
    },
    { 
      id: 'Data Protection', 
      icon: <Database className="h-6 w-6" />, 
      label: "Data Protection" 
    },
    { 
      id: 'Other', 
      icon: <Shield className="h-6 w-6" />, 
      label: "Other" 
    }
  ];

  const handleSelect = (subtype: CybersecuritySubtype) => {
    onNext(subtype);
  };

  return (
    <div className="space-y-6 form-appear">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.cybersecuritySubtypeTitle || "What cybersecurity service do you need?"}</h2>
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
