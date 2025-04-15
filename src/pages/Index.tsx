
import { FormContainer } from '@/components/QuoteForm/FormContainer';
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Augment the window object with our custom initialization function
declare global {
  interface Window {
    initSyntaxQuoteForm: () => void;
  }
}

const Index = () => {
  useEffect(() => {
    document.title = "Quote Request Form";
  }, []);

  return (
    <FormContainer />
  );
};

// This function will be called by WordPress to initialize the form
function initSyntaxQuoteForm() {
  const formRoot = document.getElementById('syntax-quote-form-root');
  
  if (formRoot) {
    // Get the language from the data attribute
    const language = formRoot.getAttribute('data-language') || 'en';
    
    // Create a React root and render the form
    const root = ReactDOM.createRoot(formRoot);
    root.render(<Index />);
    
    console.log('Syntax Quote Form initialized with language:', language);
  } else {
    console.error('Syntax Quote Form root element not found');
  }
}

// Make the initialization function available globally for WordPress
if (typeof window !== 'undefined') {
  window.initSyntaxQuoteForm = initSyntaxQuoteForm;
}

export default Index;
