
import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { WelcomeStep } from './steps/WelcomeStep';
import { FullnameStep } from './steps/FullnameStep';
import { EmailStep } from './steps/EmailStep';
import { PhoneStep } from './steps/PhoneStep';
import { BusinessStep } from './steps/BusinessStep';
import { ServiceStep } from './steps/ServiceStep';
import { WebObjectiveStep } from './steps/WebObjectiveStep';
import { EcommerceStep } from './steps/EcommerceStep';
import { BudgetStep } from './steps/BudgetStep';
import { FormData, Service, Step } from './types';
import { TranslationKey, translations } from './translations';

export const FormContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [language, setLanguage] = useState<TranslationKey>('fr');
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
    business: '',
    service: undefined,
    webObjective: undefined,
    ecommerceCategory: undefined,
    budget: null,
  });
  
  const currentTranslation = translations[language];
  
  const nextStep = (step: Step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };
  
  const handleServiceSelection = (service: Service) => {
    setFormData(prev => ({ ...prev, service }));
    
    if (service === 'Web Development') {
      nextStep('web-objective');
    } else if (service === 'E-Commerce') {
      nextStep('ecommerce');
    } else {
      nextStep('budget');
    }
  };
  
  const handleSubmit = () => {
    console.log('Form data:', formData);
    toast.success(currentTranslation.submitSuccess);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep 
          onNext={() => nextStep('fullname')} 
          onLanguageChange={setLanguage}
          currentLanguage={language}
          translation={currentTranslation} 
        />;
      
      case 'fullname':
        return <FullnameStep 
          onNext={(value) => {
            setFormData(prev => ({ ...prev, fullname: value }));
            nextStep('email');
          }}
          translation={currentTranslation}
          initialValue={formData.fullname}
          language={language}
        />;
      
      case 'email':
        return <EmailStep 
          onNext={(value) => {
            setFormData(prev => ({ ...prev, email: value }));
            nextStep('phone');
          }}
          translation={currentTranslation}
          initialValue={formData.email}
          language={language}
        />;
      
      case 'phone':
        return <PhoneStep 
          onNext={(value) => {
            setFormData(prev => ({ ...prev, phone: value }));
            nextStep('business');
          }}
          translation={currentTranslation}
          initialValue={formData.phone}
          language={language}
        />;
      
      case 'business':
        return <BusinessStep 
          onNext={(value) => {
            setFormData(prev => ({ ...prev, business: value }));
            nextStep('service');
          }}
          translation={currentTranslation}
          initialValue={formData.business}
          language={language}
        />;
      
      case 'service':
        return <ServiceStep 
          onNext={handleServiceSelection}
          translation={currentTranslation}
          language={language}
        />;
      
      case 'web-objective':
        return <WebObjectiveStep 
          onNext={(value) => {
            setFormData(prev => ({ ...prev, webObjective: value }));
            nextStep('budget');
          }}
          translation={currentTranslation}
          language={language}
        />;
      
      case 'ecommerce':
        return <EcommerceStep 
          onNext={(value) => {
            setFormData(prev => ({ ...prev, ecommerceCategory: value }));
            nextStep('budget');
          }}
          translation={currentTranslation}
          language={language}
        />;
      
      case 'budget':
        return <BudgetStep 
          onNext={(value) => {
            setFormData(prev => ({ ...prev, budget: value }));
            handleSubmit();
          }}
          translation={currentTranslation}
          language={language}
        />;
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg animate-fade-in">
        {renderStep()}
      </div>
    </div>
  );
};
