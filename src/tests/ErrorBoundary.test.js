import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

// مكون يسبب خطأ للاختبار
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>Normal component</div>;
};

// Mock للـ localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock للـ console.error لتجنب الضوضاء في الاختبارات
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  beforeEach(() => {
    localStorageMock.clear.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockClear();
  });

  test('يجب أن يعرض المكون العادي عندما لا يوجد خطأ', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('Normal component')).toBeInTheDocument();
  });

  test('يجب أن يعرض شاشة الخطأ عندما يحدث خطأ', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('حدث خطأ غير متوقع')).toBeInTheDocument();
    expect(screen.getByText('عذراً، حدث خطأ في التطبيق. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.')).toBeInTheDocument();
  });

  test('يجب أن يعرض أزرار الإجراءات', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('إعادة تحميل الصفحة')).toBeInTheDocument();
    expect(screen.getByText('العودة للرئيسية')).toBeInTheDocument();
    expect(screen.getByText('الإبلاغ عن الخطأ')).toBeInTheDocument();
  });

  test('يجب أن يحفظ الخطأ في localStorage', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'app_errors',
      expect.stringContaining('Test error message')
    );
  });

  test('يجب أن يعرض معرف الخطأ', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    );

    const errorIdElement = screen.getByText(/معرف الخطأ:/);
    expect(errorIdElement).toBeInTheDocument();
  });

  test('يجب أن يعيد تحميل الصفحة عند النقر على زر إعادة التحميل', () => {
    const reloadMock = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true
    });

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    );

    const reloadButton = screen.getByText('إعادة تحميل الصفحة');
    fireEvent.click(reloadButton);

    expect(reloadMock).toHaveBeenCalled();
  });

  test('يجب أن يعرض تفاصيل الخطأ في بيئة التطوير', () => {
    // محاكاة بيئة التطوير
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('تفاصيل الخطأ (للمطورين)')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();

    // إعادة تعيين بيئة التطوير
    process.env.NODE_ENV = originalEnv;
  });

  test('يجب أن لا يعرض تفاصيل الخطأ في بيئة الإنتاج', () => {
    // محاكاة بيئة الإنتاج
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.queryByText('تفاصيل الخطأ (للمطورين)')).not.toBeInTheDocument();

    // إعادة تعيين بيئة التطوير
    process.env.NODE_ENV = originalEnv;
  });
}); 