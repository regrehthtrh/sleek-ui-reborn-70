
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { WelcomeStep } from './steps/WelcomeStep';
import { FullnameStep } from './steps/FullnameStep';
import { EmailStep } from './steps/EmailStep';
import { PhoneStep } from './steps/PhoneStep';
import { BusinessStep } from './steps/BusinessStep';
import { ServiceStep } from './steps/ServiceStep';
import { WebObjectiveStep } from './steps/WebObjectiveStep';
import { EcommerceStep } from './steps/EcommerceStep';
import { MobileSubtypeStep } from './steps/MobileSubtypeStep';
import { AiSubtypeStep } from './steps/AiSubtypeStep';
import { CybersecuritySubtypeStep } from './steps/CybersecuritySubtypeStep';
import { CloudSubtypeStep } from './steps/CloudSubtypeStep';
import { DescriptionStep } from './steps/DescriptionStep';
import { BudgetStep } from './steps/BudgetStep';
import { FormData, Service, Step, MobileSubtype, AiSubtype, CybersecuritySubtype, CloudSubtype } from './types';
import { TranslationKey, translations } from './translations';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FormProgress } from './FormProgress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Order of steps to calculate progress and enable back navigation
const stepOrder: Step[] = [
  'welcome',
  'fullname',
  'email',
  'phone',
  'business',
  'service',
  'web-objective',
  'ecommerce',
  'mobile-subtype',
  'ai-subtype',
  'cybersecurity-subtype',
  'cloud-subtype',
  'description',
  'budget'
];

// Steps that should be conditionally shown based on service selection
const conditionalSteps: Step[] = [
  'web-objective', 
  'ecommerce',
  'mobile-subtype',
  'ai-subtype',
  'cybersecurity-subtype',
  'cloud-subtype'
];

export const FormContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [language, setLanguage] = useState<TranslationKey>('fr');
  const [history, setHistory] = useState<Step[]>(['welcome']);
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
    business: '',
    service: undefined,
    webObjective: undefined,
    ecommerceCategory: undefined,
    mobileSubtype: undefined,
    aiSubtype: undefined,
    cybersecuritySubtype: undefined,
    cloudSubtype: undefined,
    projectDescription: '',
    budget: null,
  });
  
  const currentTranslation = translations[language];
  
  // Calculate the current progress percentage
  const calculateProgress = (): number => {
    // Filter out conditional steps that aren't relevant to the current form flow
    let relevantSteps = stepOrder.filter(step => {
      // If service is selected and it's not relevant to this conditional step
      if (formData.service) {
        if (step === 'web-objective' && formData.service !== 'Web Development') return false;
        if (step === 'ecommerce' && formData.service !== 'E-Commerce') return false;
        if (step === 'mobile-subtype' && formData.service !== 'Mobile App Development') return false;
        if (step === 'ai-subtype' && formData.service !== 'AI & Machine Learning') return false;
        if (step === 'cybersecurity-subtype' && formData.service !== 'Cybersecurity Solutions') return false;
        if (step === 'cloud-subtype' && formData.service !== 'Cloud Services') return false;
      }
      return true;
    });

    const currentIndex = relevantSteps.indexOf(currentStep);
    if (currentIndex === -1) return 0;
    return (currentIndex / (relevantSteps.length - 1)) * 100;
  };

  const nextStep = (step: Step) => {
    setCurrentStep(step);
    setHistory(prev => [...prev, step]);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length > 1) {
      // Remove current step from history
      const newHistory = [...history];
      newHistory.pop();
      // Set the previous step as current
      const previousStep = newHistory[newHistory.length - 1];
      setCurrentStep(previousStep);
      setHistory(newHistory);
      window.scrollTo(0, 0);
    }
  };
  
  const handleServiceSelection = (service: Service) => {
    setFormData(prev => ({ ...prev, service }));
    
    if (service === 'Web Development') {
      nextStep('web-objective');
    } else if (service === 'E-Commerce') {
      nextStep('ecommerce');
    } else if (service === 'Mobile App Development') {
      nextStep('mobile-subtype');
    } else if (service === 'AI & Machine Learning') {
      nextStep('ai-subtype');
    } else if (service === 'Cybersecurity Solutions') {
      nextStep('cybersecurity-subtype');
    } else if (service === 'Cloud Services') {
      nextStep('cloud-subtype');
    } else {
      nextStep('description');
    }
  };
  
  // Skip business name if it's empty
  const handleBusinessStep = (value: string) => {
    setFormData(prev => ({ ...prev, business: value }));
    nextStep('service');
  };
  
  const handleSubmit = () => {
    console.log('Form data:', formData);
    toast.success(currentTranslation.submitSuccess);
    // Reset form after successful submission
    setFormData({
      fullname: '',
      email: '',
      phone: '',
      business: '',
      service: undefined,
      webObjective: undefined,
      ecommerceCategory: undefined,
      mobileSubtype: undefined,
      aiSubtype: undefined,
      cybersecuritySubtype: undefined,
      cloudSubtype: undefined,
      projectDescription: '',
      budget: null,
    });
    setCurrentStep('welcome');
    setHistory(['welcome']);
  };

  const showBackButton = currentStep !== 'welcome' && history.length > 1;

  // Calculate total number of steps for this form path
  const getTotalSteps = () => {
    if (!formData.service) return stepOrder.indexOf('budget') + 1;
    
    const serviceSpecificSteps = stepOrder.filter(step => {
      if (step === 'web-objective' && formData.service !== 'Web Development') return false;
      if (step === 'ecommerce' && formData.service !== 'E-Commerce') return false;
      if (step === 'mobile-subtype' && formData.service !== 'Mobile App Development') return false;
      if (step === 'ai-subtype' && formData.service !== 'AI & Machine Learning') return false;
      if (step === 'cybersecurity-subtype' && formData.service !== 'Cybersecurity Solutions') return false;
      if (step === 'cloud-subtype' && formData.service !== 'Cloud Services') return false;
      return true;
    });
    
    return serviceSpecificSteps.length;
  };

  // Get current step number
  const getCurrentStepNumber = () => {
    const filteredSteps = stepOrder.filter(step => {
      if (formData.service) {
        if (step === 'web-objective' && formData.service !== 'Web Development') return false;
        if (step === 'ecommerce' && formData.service !== 'E-Commerce') return false;
        if (step === 'mobile-subtype' && formData.service !== 'Mobile App Development') return false;
        if (step === 'ai-subtype' && formData.service !== 'AI & Machine Learning') return false;
        if (step === 'cybersecurity-subtype' && formData.service !== 'Cybersecurity Solutions') return false;
        if (step === 'cloud-subtype' && formData.service !== 'Cloud Services') return false;
      }
      return true;
    });
    
    return filteredSteps.indexOf(currentStep) + 1;
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
          onNext={handleBusinessStep}
          translation={currentTranslation}
          initialValue={formData.business}
          language={language}
          isOptional={true}
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
            nextStep('description');
          }}
          translation={currentTranslation}
          language={language}
        />;
      
      case 'ecommerce':
        return <EcommerceStep 
          onNext={(value) => {
            setFormData(prev => ({ ...prev, ecommerceCategory: value }));
            nextStep('description');
          }}
          translation={currentTranslation}
          language={language}
        />;
      
      case 'mobile-subtype':
        return <MobileSubtypeStep
          onNext={(value: MobileSubtype) => {
            setFormData(prev => ({ ...prev, mobileSubtype: value }));
            nextStep('description');
          }}
          translation={currentTranslation}
          language={language}
        />;
        
      case 'ai-subtype':
        return <AiSubtypeStep
          onNext={(value: AiSubtype) => {
            setFormData(prev => ({ ...prev, aiSubtype: value }));
            nextStep('description');
          }}
          translation={currentTranslation}
          language={language}
        />;
        
      case 'cybersecurity-subtype':
        return <CybersecuritySubtypeStep
          onNext={(value: CybersecuritySubtype) => {
            setFormData(prev => ({ ...prev, cybersecuritySubtype: value }));
            nextStep('description');
          }}
          translation={currentTranslation}
          language={language}
        />;
        
      case 'cloud-subtype':
        return <CloudSubtypeStep
          onNext={(value: CloudSubtype) => {
            setFormData(prev => ({ ...prev, cloudSubtype: value }));
            nextStep('description');
          }}
          translation={currentTranslation}
          language={language}
        />;
      
      case 'description':
        return <DescriptionStep
          onNext={(value: string) => {
            setFormData(prev => ({ ...prev, projectDescription: value }));
            nextStep('budget');
          }}
          translation={currentTranslation}
          initialValue={formData.projectDescription}
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
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 py-12 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="w-full max-w-lg mx-auto p-6 bg-card rounded-xl shadow-lg animate-fade-in relative">
        {showBackButton && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 text-muted-foreground hover:bg-primary hover:text-white" 
            onClick={goBack}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        {renderStep()}
      </div>
      <ThemeToggle />
      <FormProgress 
        currentStep={getCurrentStepNumber().toString()} 
        totalSteps={getTotalSteps()} 
        progress={calculateProgress()}
        language={language}
      />
    </div>
  );
};
