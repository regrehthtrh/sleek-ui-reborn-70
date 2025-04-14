
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormTranslations } from '../translations';
import { ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EcommerceStepProps {
  onNext: (value: string) => void;
  translation: FormTranslations;
  language: string;
}

export const EcommerceStep: React.FC<EcommerceStepProps> = ({ 
  onNext, 
  translation,
  language
}) => {
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const categories = [
    { value: 'Fashion', label: translation.ecommerceOptions.fashion },
    { value: 'Electronics', label: translation.ecommerceOptions.electronics },
    { value: 'Food', label: translation.ecommerceOptions.food },
    { value: 'Beauty', label: translation.ecommerceOptions.beauty },
    { value: 'Home', label: translation.ecommerceOptions.home },
    { value: 'Books', label: translation.ecommerceOptions.books },
    { value: 'Sports', label: translation.ecommerceOptions.sports },
    { value: 'Toys', label: translation.ecommerceOptions.toys },
    { value: 'Health', label: translation.ecommerceOptions.health },
    { value: 'Digital', label: translation.ecommerceOptions.digital }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setError(translation.ecommerceError);
      return;
    }
    onNext(category);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{translation.ecommerceTitle}</h2>
      </div>
      
      <div className="space-y-2">
        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value);
            setError('');
          }}
        >
          <SelectTrigger className={`h-12 text-lg ${error ? 'border-red-500' : ''}`}>
            <SelectValue placeholder={translation.ecommercePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        size="lg"
      >
        {translation.ecommerceButton}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
