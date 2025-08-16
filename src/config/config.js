// Application Configuration
export const APP_CONFIG = {
  name: 'مغسلة النظافة الذكية',
  version: '2.0.0',
  environment: process.env.NODE_ENV || 'development',
  
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
  },
  
  // Authentication
  auth: {
    jwtSecret: process.env.REACT_APP_JWT_SECRET || 'your-super-secret-jwt-key-2025',
    jwtExpiresIn: process.env.REACT_APP_JWT_EXPIRES_IN || '7d',
  },
  
  // Database Configuration
  database: {
    host: process.env.REACT_APP_DB_HOST || 'localhost',
    port: parseInt(process.env.REACT_APP_DB_PORT) || 3001,
    name: process.env.REACT_APP_DB_NAME || 'laundry_dashboard',
  },
  
  // External Services
  services: {
    googleMaps: {
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'mock_google_maps_api_key',
    },
    whatsapp: {
      apiKey: process.env.REACT_APP_WHATSAPP_API_KEY || 'mock_whatsapp_api_key',
    },
    twilio: {
      apiKey: process.env.REACT_APP_TWILIO_API_KEY || 'mock_twilio_api_key',
      authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN || 'mock_twilio_auth_token',
      phoneNumber: process.env.REACT_APP_TWILIO_PHONE_NUMBER || '+966501234567',
    },
  },
  
  // Email Configuration
  email: {
    smtp: {
      host: process.env.REACT_APP_SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.REACT_APP_SMTP_PORT) || 587,
      user: process.env.REACT_APP_SMTP_USER || 'your-email@gmail.com',
      pass: process.env.REACT_APP_SMTP_PASS || 'your-app-password',
    },
  },
  
  // Payment Gateway
  payment: {
    stripe: {
      publicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_mock_stripe_public_key',
      secretKey: process.env.REACT_APP_STRIPE_SECRET_KEY || 'sk_test_mock_stripe_secret_key',
    },
  },
  
  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.REACT_APP_MAX_FILE_SIZE) || 5242880, // 5MB
    allowedTypes: process.env.REACT_APP_ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf'
    ],
  },
  
  // Feature Flags
  features: {
    pushNotifications: process.env.REACT_APP_ENABLE_PUSH_NOTIFICATIONS === 'true',
    smsNotifications: process.env.REACT_APP_ENABLE_SMS_NOTIFICATIONS === 'true',
    emailNotifications: process.env.REACT_APP_ENABLE_EMAIL_NOTIFICATIONS === 'true',
    qrCode: process.env.REACT_APP_ENABLE_QR_CODE === 'true',
    loyaltyProgram: process.env.REACT_APP_ENABLE_LOYALTY_PROGRAM === 'true',
    referralSystem: process.env.REACT_APP_ENABLE_REFERRAL_SYSTEM === 'true',
  },
  
  // Analytics
  analytics: {
    googleAnalytics: {
      id: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || 'GA_MEASUREMENT_ID',
    },
    facebookPixel: {
      id: process.env.REACT_APP_FACEBOOK_PIXEL_ID || 'FB_PIXEL_ID',
    },
  },
  
  // Security
  security: {
    corsOrigin: process.env.REACT_APP_CORS_ORIGIN || 'http://localhost:3000',
    rateLimit: {
      windowMs: parseInt(process.env.REACT_APP_RATE_LIMIT_WINDOW) || 900000, // 15 minutes
      max: parseInt(process.env.REACT_APP_RATE_LIMIT_MAX) || 100,
    },
  },
  
  // Localization
  localization: {
    defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || 'ar',
    supportedLanguages: process.env.REACT_APP_SUPPORTED_LANGUAGES?.split(',') || ['ar', 'en'],
  },
  
  // Theme
  theme: {
    default: process.env.REACT_APP_DEFAULT_THEME || 'light',
    primaryColor: process.env.REACT_APP_PRIMARY_COLOR || '#4e54c8',
    secondaryColor: process.env.REACT_APP_SECONDARY_COLOR || '#2b3a67',
  },
};

// Role-based permissions
export const ROLE_PERMISSIONS = {
  admin: [
    'all',
    'manage_users',
    'manage_laundries',
    'manage_branches',
    'manage_employees',
    'view_reports',
    'manage_settings',
    'manage_packages',
    'manage_payments',
    'manage_inventory',
    'manage_maintenance',
    'view_analytics',
    'export_data',
    'manage_integrations'
  ],
  laundry: [
    'manage_employees',
    'view_orders',
    'manage_packages',
    'view_reports',
    'manage_branches',
    'manage_inventory',
    'view_analytics',
    'manage_maintenance'
  ],
  employee: [
    'update_orders',
    'scan_qr',
    'view_customers',
    'view_inventory',
    'report_maintenance'
  ],
  customer: [
    'place_orders',
    'view_orders',
    'rate_service',
    'manage_cars',
    'view_loyalty_points',
    'manage_profile'
  ]
};

// Order statuses
export const ORDER_STATUSES = {
  pending: {
    label: 'في الانتظار',
    color: '#FF9800',
    icon: 'clock-circle'
  },
  in_progress: {
    label: 'قيد التنفيذ',
    color: '#2196F3',
    icon: 'sync'
  },
  completed: {
    label: 'مكتملة',
    color: '#4CAF50',
    icon: 'check-circle'
  },
  cancelled: {
    label: 'ملغاة',
    color: '#F44336',
    icon: 'close-circle'
  }
};

// Payment methods
export const PAYMENT_METHODS = {
  card: {
    label: 'بطاقة ائتمان',
    icon: 'credit-card'
  },
  cash: {
    label: 'نقداً',
    icon: 'dollar'
  },
  apple_pay: {
    label: 'Apple Pay',
    icon: 'apple'
  },
  google_pay: {
    label: 'Google Pay',
    icon: 'google'
  }
};

// Car sizes
export const CAR_SIZES = {
  small: {
    label: 'صغيرة',
    description: 'سيارات صغيرة مثل Yaris, Swift'
  },
  medium: {
    label: 'متوسطة',
    description: 'سيارات متوسطة مثل Camry, Accord'
  },
  large: {
    label: 'كبيرة',
    description: 'سيارات كبيرة مثل Patrol, Land Cruiser'
  }
};

// Service types
export const SERVICE_TYPES = {
  wash: {
    label: 'غسيل',
    description: 'غسيل السيارة'
  },
  dry: {
    label: 'تجفيف',
    description: 'تجفيف السيارة'
  },
  iron: {
    label: 'كوي',
    description: 'كوي الملابس'
  },
  express: {
    label: 'سريع',
    description: 'خدمة سريعة'
  }
};

// Notification types
export const NOTIFICATION_TYPES = {
  order_created: {
    label: 'طلب جديد',
    icon: 'shopping-cart'
  },
  order_completed: {
    label: 'طلب مكتمل',
    icon: 'check-circle'
  },
  order_cancelled: {
    label: 'طلب ملغي',
    icon: 'close-circle'
  },
  payment_received: {
    label: 'دفعة مستلمة',
    icon: 'dollar'
  },
  user_registered: {
    label: 'مستخدم جديد',
    icon: 'user-add'
  },
  loyalty_points: {
    label: 'نقاط ولاء',
    icon: 'star'
  }
};

export default APP_CONFIG; 