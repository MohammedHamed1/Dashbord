import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

// مكون اختباري لاختبار السياق
const TestComponent = () => {
  const { lang, direction, isRTL, toggleLanguage } = useLanguage();
  
  return (
    <div>
      <div data-testid="language">{lang}</div>
      <div data-testid="direction">{direction}</div>
      <div data-testid="isRTL">{isRTL.toString()}</div>
      <button onClick={toggleLanguage} data-testid="toggle-btn">
        Toggle Language
      </button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    // تنظيف localStorage قبل كل اختبار
    localStorage.clear();
    // إعادة تعيين اتجاه الصفحة
    document.documentElement.dir = '';
    document.documentElement.lang = '';
  });

  test('يجب أن يوفر اللغة العربية كافتراضي', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('ar');
    expect(screen.getByTestId('direction')).toHaveTextContent('rtl');
    expect(screen.getByTestId('isRTL')).toHaveTextContent('true');
  });

  test('يجب أن يغير اللغة عند النقر على زر التبديل', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const toggleButton = screen.getByTestId('toggle-btn');
    
    // النقر على زر التبديل
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('direction')).toHaveTextContent('ltr');
    expect(screen.getByTestId('isRTL')).toHaveTextContent('false');
  });

  test('يجب أن يحفظ اللغة في localStorage', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const toggleButton = screen.getByTestId('toggle-btn');
    fireEvent.click(toggleButton);

    expect(localStorage.getItem('app_language')).toBe('en');
  });

  test('يجب أن يسترجع اللغة من localStorage', () => {
    // تعيين اللغة الإنجليزية في localStorage
    localStorage.setItem('app_language', 'en');

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('direction')).toHaveTextContent('ltr');
  });

  test('يجب أن يحدث اتجاه الصفحة عند تغيير اللغة', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const toggleButton = screen.getByTestId('toggle-btn');
    
    // التحقق من الاتجاه الافتراضي
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');

    // تغيير اللغة
    fireEvent.click(toggleButton);

    // التحقق من الاتجاه الجديد
    expect(document.documentElement.dir).toBe('ltr');
    expect(document.documentElement.lang).toBe('en');
  });

  test('يجب أن يضيف/يزيل classes من body', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // التحقق من class الافتراضي
    expect(document.body.classList.contains('rtl')).toBe(true);
    expect(document.body.classList.contains('ltr')).toBe(false);

    const toggleButton = screen.getByTestId('toggle-btn');
    fireEvent.click(toggleButton);

    // التحقق من class الجديد
    expect(document.body.classList.contains('rtl')).toBe(false);
    expect(document.body.classList.contains('ltr')).toBe(true);
  });
}); 