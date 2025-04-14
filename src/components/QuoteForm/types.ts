
export type Step = 
  | 'welcome'
  | 'fullname'
  | 'email'
  | 'phone'
  | 'business'
  | 'service'
  | 'web-objective'
  | 'ecommerce'
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

export interface FormData {
  fullname: string;
  email: string;
  phone: string;
  business: string;
  service?: Service;
  webObjective?: WebObjective;
  ecommerceCategory?: string;
  budget: number | null;
}
