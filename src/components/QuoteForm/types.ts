
export type Step = 
  | 'welcome'
  | 'fullname'
  | 'email'
  | 'phone'
  | 'business'
  | 'service'
  | 'web-objective'
  | 'ecommerce'
  | 'mobile-subtype'
  | 'ai-subtype'
  | 'cybersecurity-subtype'
  | 'cloud-subtype'
  | 'description'
  | 'budget';

export type Service = 
  | 'Web Development'
  | 'Mobile App Development'
  | 'AI & Machine Learning'
  | 'E-Commerce'
  | 'Cybersecurity Solutions'
  | 'Cloud Services';

export type WebObjective =
  | 'Online presence'
  | 'Online sales'
  | 'Company information'
  | 'Other';

export type EcommerceCategory =
  | 'Fashion'
  | 'Electronics'
  | 'Food'
  | 'Beauty'
  | 'Home'
  | 'Books'
  | 'Sports'
  | 'Toys'
  | 'Health'
  | 'Digital';

export type MobileSubtype =
  | 'iOS App'
  | 'Android App'
  | 'Cross-platform App'
  | 'PWA'
  | 'Other';

export type AiSubtype =
  | 'Machine Learning'
  | 'Natural Language Processing'
  | 'Computer Vision'
  | 'Predictive Analytics'
  | 'Chatbot'
  | 'Other';

export type CybersecuritySubtype =
  | 'Security Audit'
  | 'Penetration Testing'
  | 'Security Implementation'
  | 'Monitoring & Response'
  | 'Data Protection'
  | 'Other';

export type CloudSubtype =
  | 'Cloud Migration'
  | 'Cloud Architecture'
  | 'DevOps Implementation'
  | 'Managed Services'
  | 'Serverless Solutions'
  | 'Other';

export interface FormData {
  fullname: string;
  email: string;
  phone: string;
  business: string;
  service?: Service;
  webObjective?: WebObjective;
  ecommerceCategory?: string;
  mobileSubtype?: MobileSubtype;
  aiSubtype?: AiSubtype;
  cybersecuritySubtype?: CybersecuritySubtype;
  cloudSubtype?: CloudSubtype;
  projectDescription?: string;
  budget: number | null;
}
