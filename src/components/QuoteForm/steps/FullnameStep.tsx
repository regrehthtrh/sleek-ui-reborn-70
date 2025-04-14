
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormTranslations } from '../translations';
import { ArrowRight } from 'lucide-react';

interface FullnameStepProps {
  onNext: (value: string) => void;
  translation: FormTranslations;
  initialValue: string;
  language: string;
}

export const FullnameStep: React.FC<FullnameStepProps> = ({ 
  onNext, 
  translation, 
  initialValue,
  language
}) => {
  const [fullname, setFullname] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim()) {
      setError(translation.fullnameError);
      return;
    }
    onNext(fullname);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.fullnameTitle}</h2>
      </div>
      
      <div className="space-y-2">
        <Input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => {
            setFullname(e.target.value);
            if (e.target.value.trim()) setError('');
          }}
          placeholder={translation.fullnamePlaceholder}
          className={`h-12 text-lg ${error ? 'border-red-500' : ''}`}
          autoComplete="name"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        size="lg"
      >
        {translation.fullnameButton}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
