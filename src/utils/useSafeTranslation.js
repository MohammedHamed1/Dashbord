import { useTranslation } from 'react-i18next';

// Hook آمن للترجمة
export const useSafeTranslation = () => {
  try {
    return useTranslation();
  } catch (error) {
    // إذا فشل الترجمة، استخدم ترجمة افتراضية
    return {
      t: (key) => key, // إرجاع المفتاح كما هو
      i18n: {
        language: 'ar',
        changeLanguage: () => {},
        dir: () => 'rtl'
      }
    };
  }
}; 