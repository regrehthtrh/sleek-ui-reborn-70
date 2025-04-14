
import { FormContainer } from '@/components/QuoteForm/FormContainer';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = "Quote Request Form";
  }, []);

  return (
    <FormContainer />
  );
};

export default Index;
