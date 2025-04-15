export type TranslationKey = 'fr' | 'en' | 'ar';

export interface FormTranslations {
  welcomeTitle: string;
  welcomeText1: string;
  welcomeText2: string;
  welcomeButton: string;
  fullnameTitle: string;
  fullnamePlaceholder: string;
  fullnameError: string;
  fullnameButton: string;
  emailTitle: string;
  emailPlaceholder: string;
  emailError: string;
  emailButton: string;
  phoneTitle: string;
  phonePlaceholder: string;
  phoneError: string;
  phoneButton: string;
  businessTitle: string;
  businessPlaceholder: string;
  businessError: string;
  businessButton: string;
  serviceTitle: string;
  services: {
    webDev: string;
    mobileApp: string;
    aiMl: string;
    ecommerce: string;
    cybersecurity: string;
    cloud: string;
  };
  serviceError: string;
  webObjectiveTitle: string;
  webObjectives: {
    onlinePresence: string;
    onlineSales: string;
    companyInfo: string;
    webOther: string;
  };
  webObjectiveError: string;
  webObjectiveButton: string;
  ecommerceTitle: string;
  ecommercePlaceholder: string;
  ecommerceOptions: {
    fashion: string;
    electronics: string;
    food: string;
    beauty: string;
    home: string;
    books: string;
    sports: string;
    toys: string;
    health: string;
    digital: string;
  };
  ecommerceError: string;
  ecommerceButton: string;
  budgetTitle: string;
  budgetPlaceholder: string;
  budgetError: string;
  budgetButton: string;
  submitSuccess: string;
  // Adding missing translation keys
  optional?: string;
  mobileSubtypeTitle?: string;
  aiSubtypeTitle?: string;
  cybersecuritySubtypeTitle?: string;
  cloudSubtypeTitle?: string;
  descriptionTitle?: string;
  descriptionSubtitle?: string;
  descriptionLabel?: string;
  descriptionPlaceholder?: string;
  descriptionButton?: string;
  // New translation keys for additional services
  additionalServicesTitle?: string;
  additionalServicesSubtitle?: string;
  additionalServicesButton?: string;
  totalAdditionalServices?: string;
  additionalServices?: {
    translationFr?: string;
    translationEn?: string;
    translationAr?: string;
    translationEs?: string;
    paymentDahabia?: string;
    paymentPaypal?: string;
    paymentStripe?: string;
    blog?: string;
    seo?: string;
    socialMedia?: string;
    analytics?: string;
    adminPanel?: string;
    chatbot?: string;
    customEmail?: string;
    responsive?: string;
  };
  // Thank you page
  thankYouTitle?: string;
  thankYouMessage?: string;
  servicesRequestedTitle?: string;
  totalBudgetLabel?: string;
  startNewRequest?: string;
}

export const translations: Record<TranslationKey, FormTranslations> = {
  fr: {
    welcomeTitle: "Formulaire De Demande De Devis",
    welcomeText1: "Pour nous permettre de mieux comprendre vos besoins et de vous fournir un devis précis, veuillez répondre aux questions suivantes.",
    welcomeText2: "Cliquez sur le bouton ci-dessous pour commencer.",
    welcomeButton: "Commencer maintenant",
    fullnameTitle: "Nom et Prénom",
    fullnamePlaceholder: "Votre nom complet",
    fullnameError: "Ce champ est requis",
    fullnameButton: "Suivant",
    emailTitle: "Email",
    emailPlaceholder: "Adresse email",
    emailError: "Veuillez entrer un email valide",
    emailButton: "Suivant",
    phoneTitle: "Numéro Téléphone",
    phonePlaceholder: "Numéro de téléphone",
    phoneError: "Numéro de téléphone invalide",
    phoneButton: "Suivant",
    businessTitle: "Nom de votre business",
    businessPlaceholder: "ex: Syntax Agency",
    businessError: "Ce champ est requis",
    businessButton: "Suivant",
    serviceTitle: "Laquelle de nos services souhaitez-vous utiliser pour développer votre entreprise?",
    services: {
      webDev: "Développement Web: Sites web personnalisés, rapides et réactifs",
      mobileApp: "Développement d'Applications Mobiles: Développement d'applications iOS et Android",
      aiMl: "IA et Machine Learning: Solutions d'IA pour l'automatisation et les insights",
      ecommerce: "E-Commerce: Sites e-commerce pour augmenter vos ventes",
      cybersecurity: "Solutions de Cybersécurité: Logiciels sécurisés et protection des données",
      cloud: "Services Cloud: Migration vers le cloud et gestion pour l'évolutivité"
    },
    serviceError: "Veuillez sélectionner un service",
    webObjectiveTitle: "Quel est l'objectif principal de votre site web?",
    webObjectives: {
      onlinePresence: "Présence en ligne",
      onlineSales: "Ventes en ligne",
      companyInfo: "Information sur l'entreprise",
      webOther: "Autre"
    },
    webObjectiveError: "Veuillez sélectionner un objectif",
    webObjectiveButton: "Suivant",
    ecommerceTitle: "Quel type de produits allez-vous vendre?",
    ecommercePlaceholder: "- Sélectionnez -",
    ecommerceOptions: {
      fashion: "Mode et vêtements",
      electronics: "Électronique",
      food: "Aliments et boissons",
      beauty: "Beauté et soins personnels",
      home: "Maison et jardin",
      books: "Livres et médias",
      sports: "Sports et loisirs",
      toys: "Jouets et jeux",
      health: "Santé et bien-être",
      digital: "Produits numériques"
    },
    ecommerceError: "Veuillez sélectionner une catégorie",
    ecommerceButton: "Suivant",
    budgetTitle: "Quel est votre budget approximatif pour ce projet? (En millions de dinars)",
    budgetPlaceholder: "ex: 3",
    budgetError: "Veuillez entrer un budget d'au moins 3 millions",
    budgetButton: "Soumettre",
    submitSuccess: "Formulaire soumis avec succès!",
    // Updated translations
    descriptionTitle: "Description du Projet",
    descriptionSubtitle: "Parlez-nous de votre projet (optionnel)",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Fournissez des détails sur votre projet...",
    descriptionButton: "Continuer",
    // New keys
    additionalServicesTitle: "Services Additionnels",
    additionalServicesSubtitle: "Sélectionnez les services supplémentaires dont vous pourriez avoir besoin :",
    additionalServicesButton: "Continuer",
    totalAdditionalServices: "Total pour les services additionnels :",
    additionalServices: {
      translationFr: "Traduction en Français",
      translationEn: "Traduction en Anglais",
      translationAr: "Traduction en Arabe",
      translationEs: "Traduction en Espagnol",
      paymentDahabia: "Intégration de Paiement Dahabia/CIB",
      paymentPaypal: "Intégration PayPal",
      paymentStripe: "Intégration de Paiement Stripe",
      blog: "Configuration de Blog",
      seo: "Optimisation SEO",
      socialMedia: "Intégration des Médias Sociaux",
      analytics: "Configuration d'Analytiques",
      adminPanel: "Panneau d'Administration Personnalisé",
      chatbot: "Intégration de Chatbot",
      customEmail: "Templates d'Email Personnalisés",
      responsive: "Design Responsive",
    },
    thankYouTitle: "Merci !",
    thankYouMessage: "Votre demande a été soumise avec succès. Nous vous répondrons prochainement.",
    servicesRequestedTitle: "Services Demandés",
    totalBudgetLabel: "Budget Total",
    startNewRequest: "Commencer une Nouvelle Demande"
  },
  en: {
    welcomeTitle: "Quote Request Form",
    welcomeText1: "To help us understand your needs and provide an accurate quote, please answer the following questions.",
    welcomeText2: "Click the button below to start.",
    welcomeButton: "Start Now",
    fullnameTitle: "Full Name",
    fullnamePlaceholder: "Your full name",
    fullnameError: "This field is required",
    fullnameButton: "Next",
    emailTitle: "Email",
    emailPlaceholder: "Email address",
    emailError: "Please enter a valid email",
    emailButton: "Next",
    phoneTitle: "Phone Number",
    phonePlaceholder: "Phone number",
    phoneError: "Invalid phone number",
    phoneButton: "Next",
    businessTitle: "Business Name",
    businessPlaceholder: "ex: Syntax Agency",
    businessError: "This field is required",
    businessButton: "Next",
    serviceTitle: "Which of our services would you like to leverage for your business growth?",
    services: {
      webDev: "Web Development: Custom, fast, and responsive websites",
      mobileApp: "Mobile App Development: iOS and Android app development",
      aiMl: "AI & Machine Learning: AI solutions for automation and insights",
      ecommerce: "E-Commerce: E-commerce websites for higher sales",
      cybersecurity: "Cybersecurity Solutions: Secure software and data protection",
      cloud: "Cloud Services: Cloud migration and management for scalability"
    },
    serviceError: "Please select a service",
    webObjectiveTitle: "What is the primary goal of your website?",
    webObjectives: {
      onlinePresence: "Online presence",
      onlineSales: "Online sales",
      companyInfo: "Company information",
      webOther: "Other"
    },
    webObjectiveError: "Please select a goal",
    webObjectiveButton: "Next",
    ecommerceTitle: "What type of products will you sell?",
    ecommercePlaceholder: "- Select -",
    ecommerceOptions: {
      fashion: "Fashion and clothing",
      electronics: "Electronics",
      food: "Food and beverages",
      beauty: "Beauty and personal care",
      home: "Home and garden",
      books: "Books and media",
      sports: "Sports and leisure",
      toys: "Toys and games",
      health: "Health and wellness",
      digital: "Digital products"
    },
    ecommerceError: "Please select a category",
    ecommerceButton: "Next",
    budgetTitle: "What is your approximate budget for this project? (In millions of dinars)",
    budgetPlaceholder: "ex: 3",
    budgetError: "Please enter a budget of at least 3 million",
    budgetButton: "Submit",
    submitSuccess: "Form submitted successfully!",
    // New keys
    additionalServicesTitle: "Additional Services",
    additionalServicesSubtitle: "Select any additional services you may need:",
    additionalServicesButton: "Continue",
    totalAdditionalServices: "Total for additional services:",
    additionalServices: {
      translationFr: "French Translation",
      translationEn: "English Translation",
      translationAr: "Arabic Translation",
      translationEs: "Spanish Translation",
      paymentDahabia: "Dahabia/CIB Payment Integration",
      paymentPaypal: "PayPal Integration",
      paymentStripe: "Stripe Payment Integration",
      blog: "Blog Setup",
      seo: "SEO Optimization",
      socialMedia: "Social Media Integration",
      analytics: "Analytics Setup",
      adminPanel: "Custom Admin Panel",
      chatbot: "Chatbot Integration",
      customEmail: "Custom Email Templates",
      responsive: "Responsive Design",
    },
    thankYouTitle: "Thank You!",
    thankYouMessage: "Your request has been submitted successfully. We'll get back to you shortly.",
    servicesRequestedTitle: "Services Requested",
    totalBudgetLabel: "Total Budget",
    startNewRequest: "Start New Request"
  },
  ar: {
    welcomeTitle: "نموذج طلب عرض سعر",
    welcomeText1: "لتمكيننا من فهم احتياجاتك وتقديم عرض سعر دقيق، يرجى الإجابة على الأسئلة التالية.",
    welcomeText2: "انقر على الزر أدناه للبدء.",
    welcomeButton: "ابدأ الآن",
    fullnameTitle: "الاسم الكامل",
    fullnamePlaceholder: "اسمك الكامل",
    fullnameError: "هذا الحقل مطلوب",
    fullnameButton: "التالي",
    emailTitle: "البريد الإلكتروني",
    emailPlaceholder: "عنوان البريد الإلكتروني",
    emailError: "يرجى إدخال بريد إلكتروني صالح",
    emailButton: "التالي",
    phoneTitle: "رقم الهاتف",
    phonePlaceholder: "رقم الهاتف",
    phoneError: "رقم هاتف غير صالح",
    phoneButton: "التالي",
    businessTitle: "اسم الشركة",
    businessPlaceholder: "مثال: وكالة سينتاكس",
    businessError: "هذا الحقل مطلوب",
    businessButton: "التالي",
    serviceTitle: "أي من خدماتنا تود الاستفادة منها لنمو أعمالك؟",
    services: {
      webDev: "تطوير الويب: مواقع ويب مخصصة، سريعة، ومتجاوبة",
      mobileApp: "تطوير تطبيقات الهاتف: تطبيقات iOS وAndroid",
      aiMl: "الذكاء الاصطناعي والتعلم الآلي: حلول ذكاء اصطناعي للأتمتة والرؤى",
      ecommerce: "التجارة الإلكترونية: مواقع تجارة إلكترونية لزيادة المبيعات",
      cybersecurity: "حلول الأمن السيبراني: برمجيات وبيانات آمنة",
      cloud: "الخدمات السحابية: الهجرة إلى السحابة وإدارتها للتوسع"
    },
    serviceError: "يرجى اختيار خدمة",
    webObjectiveTitle: "ما هو الهدف الأساسي لموقعك الإلكتروني؟",
    webObjectives: {
      onlinePresence: "وجود على الإنترنت",
      onlineSales: "المبيعات عبر الإنترنت",
      companyInfo: "معلومات الشركة",
      webOther: "أخرى"
    },
    webObjectiveError: "يرجى اختيار هدف",
    webObjectiveButton: "التالي",
    ecommerceTitle: "ما نوع المنتجات التي ستبيعها؟",
    ecommercePlaceholder: "- اختر -",
    ecommerceOptions: {
      fashion: "الأزياء والملابس",
      electronics: "الإلكترونيات",
      food: "الأطعمة والمشروبات",
      beauty: "الجمال والعناية الشخصية",
      home: "المنزل والحديقة",
      books: "الكتب والإعلام",
      sports: "الرياضة والترفيه",
      toys: "الألعاب والألعاب",
      health: "الصحة والعافية",
      digital: "المنتجات الرقمية"
    },
    ecommerceError: "يرجى اختيار فئة",
    ecommerceButton: "التالي",
    budgetTitle: "ما هي ميزانيتك التقريبية لهذا المشروع؟ (بالملايين من الدينار)",
    budgetPlaceholder: "مثال: 3",
    budgetError: "يرجى إدخال ميزانية لا تقل عن 3 ملايين",
    budgetButton: "إرسال",
    submitSuccess: "تم إرسال النموذج بنجاح!",
    // New keys
    additionalServicesTitle: "خدمات إضافية",
    additionalServicesSubtitle: "حدد أي خدمات إضافية قد تحتاجها:",
    additionalServicesButton: "متابعة",
    totalAdditionalServices: "إجمالي الخدمات الإضافية:",
    additionalServices: {
      translationFr: "ترجمة فرنسية",
      translationEn: "ترجمة إنجليزية",
      translationAr: "ترجمة عربية",
      translationEs: "ترجمة إسبانية",
      paymentDahabia: "تكامل الدفع داهابيا/CIB",
      paymentPaypal: "تكامل باي بال",
      paymentStripe: "تكامل الدفع ستريب",
      blog: "إعداد مدونة",
      seo: "تحسين محركات البحث",
      socialMedia: "تكامل وسائل التواصل الاجتماعي",
      analytics: "إعداد التحليلات",
      adminPanel: "لوحة إدارة مخصصة",
      chatbot: "تكامل روبوت الدردشة",
      customEmail: "قوالب بريد إلكتروني مخصصة",
      responsive: "تصميم متجاوب",
    },
    thankYouTitle: "شكراً لك!",
    thankYouMessage: "تم تقديم طلبك بنجاح. سنعود إليك قريباً.",
    servicesRequestedTitle: "الخدمات المطلوبة",
    totalBudgetLabel: "الميزانية الإجمالية",
    startNewRequest: "بدء طلب جديد"
  }
};
