import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    // استرجاع اللغة المحفوظة أو استخدام العربية كافتراضي
    return localStorage.getItem('app_language') || 'ar';
  });

  const [direction, setDirection] = useState(() => {
    return lang === 'ar' ? 'rtl' : 'ltr';
  });

  // تحديث الاتجاه عند تغيير اللغة
  useEffect(() => {
    const newDirection = lang === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    
    // حفظ اللغة في localStorage
    localStorage.setItem('app_language', lang);
    
    // تحديث اتجاه الصفحة
    document.documentElement.dir = newDirection;
    document.documentElement.lang = lang;
    
    // إضافة/إزالة class للـ body
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(newDirection);
    
  }, [lang]);

  const changeLanguage = (newLang) => {
    setLang(newLang);
  };

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ 
      lang, 
      direction,
      setLang: changeLanguage,
      toggleLanguage,
      isRTL: direction === 'rtl',
      isLTR: direction === 'ltr'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 