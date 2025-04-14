
import React, { useState } from 'react';
import { Service } from '../types';
import { FormTranslations } from '../translations';
import { Globe, Smartphone, Brain, ShoppingCart, Shield, Cloud } from 'lucide-react';

interface ServiceStepProps {
  onNext: (value: Service) => void;
  translation: FormTranslations;
  language: string;
}

export const ServiceStep: React.FC<ServiceStepProps> = ({ 
  onNext, 
  translation,
  language
}) => {
  const [error, setError] = useState('');
  
  const services: Array<{
    id: Service;
    icon: React.ReactNode;
    label: string;
  }> = [
    { 
      id: 'Web Development', 
      icon: <Globe className="h-6 w-6" />, 
      label: translation.services.webDev 
    },
    { 
      id: 'Mobile App Development', 
      icon: <Smartphone className="h-6 w-6" />, 
      label: translation.services.mobileApp 
    },
    { 
      id: 'AI & Machine Learning', 
      icon: <Brain className="h-6 w-6" />, 
      label: translation.services.aiMl 
    },
    { 
      id: 'E-Commerce', 
      icon: <ShoppingCart className="h-6 w-6" />, 
      label: translation.services.ecommerce 
    },
    { 
      id: 'Cybersecurity Solutions', 
      icon: <Shield className="h-6 w-6" />, 
      label: translation.services.cybersecurity 
    },
    { 
      id: 'Cloud Services', 
      icon: <Cloud className="h-6 w-6" />, 
      label: translation.services.cloud 
    }
  ];

  const handleSelect = (service: Service) => {
    setError('');
    onNext(service);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.serviceTitle}</h2>
      </div>
      
      <div className="space-y-3">
        {services.map((service) => (
          <div 
            key={service.id}
            onClick={() => handleSelect(service.id)}
            className="option-card flex items-center gap-3 hover:scale-[1.01] transition-all"
          >
            <div className="bg-primary/10 p-3 rounded-full">
              {service.icon}
            </div>
            <span className="flex-1">{service.label}</span>
          </div>
        ))}
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
