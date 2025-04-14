
import React from 'react';
import { Button } from '@/components/ui/button';
import { TranslationKey, FormTranslations } from '../translations';
import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
  onLanguageChange: (language: TranslationKey) => void;
  currentLanguage: TranslationKey;
  translation: FormTranslations;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ 
  onNext, 
  onLanguageChange, 
  currentLanguage, 
  translation 
}) => {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{translation.welcomeTitle}</h1>
        <p className="text-muted-foreground">{translation.welcomeText1}</p>
        <p className="text-muted-foreground">{translation.welcomeText2}</p>
      </div>
      
      <div className="flex justify-center space-x-4 language-selector mb-8">
        <Button 
          onClick={() => onLanguageChange('fr')} 
          type="button" 
          variant={currentLanguage === 'fr' ? 'default' : 'outline'}
          className={currentLanguage === 'fr' ? 'active' : ''}
        >
          Français
        </Button>
        <Button 
          onClick={() => onLanguageChange('en')} 
          type="button" 
          variant={currentLanguage === 'en' ? 'default' : 'outline'}
          className={currentLanguage === 'en' ? 'active' : ''}
        >
          English
        </Button>
        <Button 
          onClick={() => onLanguageChange('ar')} 
          type="button" 
          variant={currentLanguage === 'ar' ? 'default' : 'outline'}
          className={currentLanguage === 'ar' ? 'active' : ''}
        >
          العربية
        </Button>
      </div>
      
      <Button 
        onClick={onNext} 
        className="w-full"
        size="lg"
      >
        {translation.welcomeButton}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
