import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  // تطبيق إعدادات الوصولية
  useEffect(() => {
    const root = document.documentElement;
    
    // تطبيق التباين العالي
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // تطبيق حجم الخط
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${fontSize}`);

    // تطبيق تقليل الحركة
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // تطبيق مؤشر التركيز المرئي
    if (focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }
  }, [highContrast, fontSize, reducedMotion, focusVisible]);

  // حفظ الإعدادات في localStorage
  useEffect(() => {
    localStorage.setItem('accessibility_settings', JSON.stringify({
      highContrast,
      fontSize,
      reducedMotion,
      focusVisible
    }));
  }, [highContrast, fontSize, reducedMotion, focusVisible]);

  // استرجاع الإعدادات من localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility_settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setHighContrast(settings.highContrast || false);
        setFontSize(settings.fontSize || 'medium');
        setReducedMotion(settings.reducedMotion || false);
        setFocusVisible(settings.focusVisible || false);
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const increaseFontSize = () => {
    const sizes = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };
  const decreaseFontSize = () => {
    const sizes = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };
  const toggleReducedMotion = () => setReducedMotion(!reducedMotion);
  const toggleFocusVisible = () => setFocusVisible(!focusVisible);

  const resetSettings = () => {
    setHighContrast(false);
    setFontSize('medium');
    setReducedMotion(false);
    setFocusVisible(false);
  };

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      fontSize,
      reducedMotion,
      focusVisible,
      toggleHighContrast,
      increaseFontSize,
      decreaseFontSize,
      toggleReducedMotion,
      toggleFocusVisible,
      resetSettings
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}; 