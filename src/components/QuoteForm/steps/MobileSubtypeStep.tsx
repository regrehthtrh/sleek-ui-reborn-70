
import React from 'react';
import { MobileSubtype } from '../types';
import { FormTranslations } from '../translations';
import { Smartphone, Apple, Android, Globe, Boxes } from 'lucide-react';

interface MobileSubtypeStepProps {
  onNext: (value: MobileSubtype) => void;
  translation: FormTranslations;
  language: string;
}

export const MobileSubtypeStep: React.FC<MobileSubtypeStepProps> = ({ 
  onNext, 
  translation,
  language
}) => {
  const subtypes: Array<{
    id: MobileSubtype;
    icon: React.ReactNode;
    label: string;
  }> = [
    { 
      id: 'iOS App', 
      icon: <Apple className="h-6 w-6" />, 
      label: "iOS App" 
    },
    { 
      id: 'Android App', 
      icon: <Android className="h-6 w-6" />, 
      label: "Android App" 
    },
    { 
      id: 'Cross-platform App', 
      icon: <Smartphone className="h-6 w-6" />, 
      label: "Cross-platform App" 
    },
    { 
      id: 'PWA', 
      icon: <Globe className="h-6 w-6" />, 
      label: "Progressive Web App (PWA)" 
    },
    { 
      id: 'Other', 
      icon: <Boxes className="h-6 w-6" />, 
      label: "Other" 
    }
  ];

  const handleSelect = (subtype: MobileSubtype) => {
    onNext(subtype);
  };

  return (
    <div className="space-y-6 form-appear">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.mobileSubtypeTitle || "What type of mobile app do you need?"}</h2>
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
