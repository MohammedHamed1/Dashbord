import axios from 'axios';
import { APP_CONFIG } from '../config/config';

// إنشاء instance من axios للـ API
const contentApi = axios.create({
  baseURL: APP_CONFIG.api.baseURL,
  timeout: APP_CONFIG.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  }
});

// إضافة interceptor للـ token
contentApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Content Management API
export const contentApiService = {
  // جلب جميع محتويات الموقع
  getAllContent: async () => {
    try {
      const response = await contentApi.get('/api/content/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching content:', error);
      // Fallback to mock data
      return getMockContent();
    }
  },

  // جلب محتوى قسم معين
  getSectionContent: async (section) => {
    try {
      const response = await contentApi.get(`/api/content/${section}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${section} content:`, error);
      return getMockSectionContent(section);
    }
  },

  // حفظ محتوى قسم معين
  saveSectionContent: async (section, data) => {
    try {
      const response = await contentApi.put(`/api/content/${section}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error saving ${section} content:`, error);
      // Save to localStorage as fallback
      saveToLocalStorage(section, data);
      return { success: true, message: 'تم الحفظ محلياً' };
    }
  },

  // حفظ جميع المحتويات
  saveAllContent: async (content) => {
    try {
      const response = await contentApi.put('/api/content/all', content);
      return response.data;
    } catch (error) {
      console.error('Error saving all content:', error);
      // Save to localStorage as fallback
      saveAllToLocalStorage(content);
      return { success: true, message: 'تم الحفظ محلياً' };
    }
  },

  // رفع ملف
  uploadFile: async (file, type = 'image') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await contentApi.post('/api/content/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      // Return mock URL as fallback
      return { url: URL.createObjectURL(file), filename: file.name };
    }
  },

  // جلب تاريخ التعديلات
  getVersionHistory: async (section) => {
    try {
      const response = await contentApi.get(`/api/content/${section}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching version history:', error);
      return getMockVersionHistory(section);
    }
  },

  // استعادة نسخة سابقة
  restoreVersion: async (section, versionId) => {
    try {
      const response = await contentApi.post(`/api/content/${section}/restore/${versionId}`);
      return response.data;
    } catch (error) {
      console.error('Error restoring version:', error);
      return { success: false, message: 'فشل في استعادة النسخة' };
    }
  },

  // جلب إعدادات التصميم
  getThemeSettings: async () => {
    try {
      const response = await contentApi.get('/api/content/theme');
      return response.data;
    } catch (error) {
      console.error('Error fetching theme settings:', error);
      return getMockThemeSettings();
    }
  },

  // حفظ إعدادات التصميم
  saveThemeSettings: async (theme) => {
    try {
      const response = await contentApi.put('/api/content/theme', theme);
      return response.data;
    } catch (error) {
      console.error('Error saving theme settings:', error);
      saveThemeToLocalStorage(theme);
      return { success: true, message: 'تم حفظ إعدادات التصميم محلياً' };
    }
  },

  // جلب إعدادات SEO
  getSEOSettings: async () => {
    try {
      const response = await contentApi.get('/api/content/seo');
      return response.data;
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      return getMockSEOSettings();
    }
  },

  // حفظ إعدادات SEO
  saveSEOSettings: async (seo) => {
    try {
      const response = await contentApi.put('/api/content/seo', seo);
      return response.data;
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      saveSEOToLocalStorage(seo);
      return { success: true, message: 'تم حفظ إعدادات SEO محلياً' };
    }
  },

  // جلب قائمة الصفحات
  getPages: async () => {
    try {
      const response = await contentApi.get('/api/content/pages');
      return response.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      return getMockPages();
    }
  },

  // حفظ قائمة الصفحات
  savePages: async (pages) => {
    try {
      const response = await contentApi.put('/api/content/pages', pages);
      return response.data;
    } catch (error) {
      console.error('Error saving pages:', error);
      savePagesToLocalStorage(pages);
      return { success: true, message: 'تم حفظ الصفحات محلياً' };
    }
  }
};

// Mock Data Functions
const getMockContent = () => ({
  homepage: {
    hero: {
      title: 'PayPass - غسيل السيارات الذكي',
      subtitle: 'احصل على غسيل احترافي لسيارتك بأسعار منافسة',
      buttonText: 'احجز الآن',
      backgroundImage: '/hero-bg.jpg',
      active: true
    },
    features: [
      {
        id: 1,
        title: 'غسيل سريع',
        description: 'غسيل احترافي في أقل من 30 دقيقة',
        icon: '⚡',
        active: true,
        order: 1
      },
      {
        id: 2,
        title: 'أسعار منافسة',
        description: 'أفضل الأسعار مع ضمان الجودة',
        icon: '💰',
        active: true,
        order: 2
      },
      {
        id: 3,
        title: 'خدمة 24/7',
        description: 'خدمة متاحة على مدار الساعة',
        icon: '🕒',
        active: true,
        order: 3
      }
    ],
    stats: [
      { id: 1, number: '1000+', label: 'عميل راضي', active: true, order: 1 },
      { id: 2, number: '50+', label: 'فرع', active: true, order: 2 },
      { id: 3, number: '24/7', label: 'خدمة متاحة', active: true, order: 3 },
      { id: 4, number: '5⭐', label: 'تقييم', active: true, order: 4 }
    ]
  },
  services: [
    {
      id: 1,
      title: 'الغسيل الأساسي',
      description: 'غسيل خارجي شامل للسيارة',
      price: '25 ريال',
      duration: '15 دقيقة',
      features: ['غسيل خارجي', 'تجفيف', 'تعطير'],
      image: '/service-basic.jpg',
      active: true,
      category: 'basic',
      order: 1
    },
    {
      id: 2,
      title: 'الغسيل الشامل',
      description: 'غسيل داخلي وخارجي شامل',
      price: '45 ريال',
      duration: '30 دقيقة',
      features: ['غسيل داخلي وخارجي', 'تجفيف', 'تعطير', 'تلميع'],
      image: '/service-premium.jpg',
      active: true,
      category: 'premium',
      order: 2
    }
  ],
  packages: [
    {
      id: 1,
      title: 'الباقة الشهرية',
      description: 'غسيل غير محدود لمدة شهر',
      price: '199 ريال',
      originalPrice: '299 ريال',
      features: ['غسيل غير محدود', 'خصم 30%', 'خدمة VIP'],
      image: '/package-monthly.jpg',
      active: true,
      duration: '30 يوم',
      order: 1
    }
  ],
  blog: [
    {
      id: 1,
      title: 'نصائح للحفاظ على نظافة سيارتك',
      excerpt: 'تعرف على أفضل الطرق للحفاظ على نظافة سيارتك',
      content: 'محتوى المقال الكامل...',
      author: 'فريق PayPass',
      date: '2024-01-15',
      image: '/blog-1.jpg',
      tags: ['نصائح', 'صيانة'],
      active: true,
      views: 1250,
      likes: 89,
      order: 1
    }
  ],
  settings: {
    siteName: 'PayPass',
    siteDescription: 'غسيل السيارات الذكي',
    contactEmail: 'info@paypass.com',
    contactPhone: '+966 50 123 4567',
    socialMedia: {
      facebook: 'https://facebook.com/paypass',
      twitter: 'https://twitter.com/paypass',
      instagram: 'https://instagram.com/paypass'
    }
  }
});

const getMockSectionContent = (section) => {
  const content = getMockContent();
  return content[section] || {};
};

const getMockVersionHistory = (section) => [
  {
    id: 1,
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    author: 'أحمد محمد',
    changes: 'تحديث المحتوى الأساسي',
    data: getMockSectionContent(section)
  }
];

const getMockThemeSettings = () => ({
  primaryColor: '#4e54c8',
  secondaryColor: '#2b3a67',
  accentColor: '#ff6b6b',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  fontFamily: 'Cairo, sans-serif',
  borderRadius: '8px',
  shadow: '0 2px 8px rgba(0,0,0,0.1)',
  animation: true,
  darkMode: false
});

const getMockSEOSettings = () => ({
  metaTitle: 'PayPass - غسيل السيارات الذكي',
  metaDescription: 'احصل على غسيل احترافي لسيارتك بأسعار منافسة',
  keywords: 'غسيل سيارات, غسيل احترافي, PayPass',
  ogTitle: 'PayPass - غسيل السيارات الذكي',
  ogDescription: 'احصل على غسيل احترافي لسيارتك بأسعار منافسة',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
  canonicalUrl: 'https://paypass.com'
});

const getMockPages = () => [
  {
    id: 1,
    title: 'الرئيسية',
    slug: '/',
    active: true,
    order: 1,
    showInMenu: true,
    showInFooter: true
  },
  {
    id: 2,
    title: 'الخدمات',
    slug: '/services',
    active: true,
    order: 2,
    showInMenu: true,
    showInFooter: true
  },
  {
    id: 3,
    title: 'الباقات',
    slug: '/packages',
    active: true,
    order: 3,
    showInMenu: true,
    showInFooter: true
  },
  {
    id: 4,
    title: 'من نحن',
    slug: '/about-us',
    active: true,
    order: 4,
    showInMenu: true,
    showInFooter: true
  },
  {
    id: 5,
    title: 'اتصل بنا',
    slug: '/contact-us',
    active: true,
    order: 5,
    showInMenu: true,
    showInFooter: true
  }
];

// Local Storage Functions
const saveToLocalStorage = (section, data) => {
  try {
    localStorage.setItem(`content_${section}`, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const saveAllToLocalStorage = (content) => {
  try {
    localStorage.setItem('content_all', JSON.stringify(content));
  } catch (error) {
    console.error('Error saving all content to localStorage:', error);
  }
};

const saveThemeToLocalStorage = (theme) => {
  try {
    localStorage.setItem('theme_settings', JSON.stringify(theme));
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

const saveSEOToLocalStorage = (seo) => {
  try {
    localStorage.setItem('seo_settings', JSON.stringify(seo));
  } catch (error) {
    console.error('Error saving SEO to localStorage:', error);
  }
};

const savePagesToLocalStorage = (pages) => {
  try {
    localStorage.setItem('pages_settings', JSON.stringify(pages));
  } catch (error) {
    console.error('Error saving pages to localStorage:', error);
  }
};

export default contentApiService; 