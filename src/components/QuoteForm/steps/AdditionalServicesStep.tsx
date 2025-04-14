
import React, { useState } from 'react';
import { FormTranslations } from '../translations';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight } from 'lucide-react';

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
}

interface AdditionalServicesStepProps {
  onNext: (selectedServices: AdditionalService[]) => void;
  translation: FormTranslations;
  language: string;
}

export const AdditionalServicesStep: React.FC<AdditionalServicesStepProps> = ({
  onNext,
  translation,
  language
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // List of additional services with prices in Algerian Dinars
  const services: AdditionalService[] = [
    { id: 'translation-fr', name: translation.additionalServices?.translationFr || 'French Translation', price: 5000 },
    { id: 'translation-en', name: translation.additionalServices?.translationEn || 'English Translation', price: 5000 },
    { id: 'translation-ar', name: translation.additionalServices?.translationAr || 'Arabic Translation', price: 5000 },
    { id: 'translation-es', name: translation.additionalServices?.translationEs || 'Spanish Translation', price: 7000 },
    { id: 'payment-dahabia', name: translation.additionalServices?.paymentDahabia || 'Dahabia/CIB Payment Integration', price: 20000 },
    { id: 'payment-paypal', name: translation.additionalServices?.paymentPaypal || 'PayPal Integration', price: 15000 },
    { id: 'payment-stripe', name: translation.additionalServices?.paymentStripe || 'Stripe Payment Integration', price: 18000 },
    { id: 'blog', name: translation.additionalServices?.blog || 'Blog Setup', price: 12000 },
    { id: 'seo', name: translation.additionalServices?.seo || 'SEO Optimization', price: 15000 },  // Lowered from 25000
    { id: 'social-media', name: translation.additionalServices?.socialMedia || 'Social Media Integration', price: 8000 },
    { id: 'analytics', name: translation.additionalServices?.analytics || 'Analytics Setup', price: 10000 },
    { id: 'admin-panel', name: translation.additionalServices?.adminPanel || 'Custom Admin Panel', price: 30000 },
    { id: 'chatbot', name: translation.additionalServices?.chatbot || 'Chatbot Integration', price: 15000 },  // Lowered from 22000
    { id: 'custom-email', name: translation.additionalServices?.customEmail || 'Custom Email Templates', price: 9000 },
    // Removed responsive design option as requested
  ];

  const handleToggleService = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedServices = services.filter(service => selectedIds.includes(service.id));
    onNext(selectedServices);
  };

  // Calculate total price of selected services
  const totalPrice = services
    .filter(service => selectedIds.includes(service.id))
    .reduce((sum, service) => sum + service.price, 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {translation.additionalServicesTitle || "Additional Services"}
        </h2>
        <p className="text-muted-foreground">
          {translation.additionalServicesSubtitle || "Select any additional services you may need:"}
        </p>
      </div>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {services.map((service) => (
          <div key={service.id} className="flex items-start space-x-3 border p-3 rounded-md hover:bg-primary/5">
            <Checkbox 
              id={service.id}
              checked={selectedIds.includes(service.id)}
              onCheckedChange={() => handleToggleService(service.id)}
            />
            <div className="flex-1">
              <label 
                htmlFor={service.id} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex justify-between"
              >
                <span>{service.name}</span>
                <span className="font-bold">{service.price.toLocaleString()} DA</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      
      {selectedIds.length > 0 && (
        <div className="bg-secondary/30 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span>{translation.totalAdditionalServices || "Total for additional services:"}</span>
            <span className="font-bold text-lg">{totalPrice.toLocaleString()} DA</span>
          </div>
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full"
        size="lg"
      >
        {translation.additionalServicesButton || "Continue"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};
