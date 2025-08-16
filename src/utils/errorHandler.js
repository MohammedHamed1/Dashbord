// نظام معالجة الأخطاء الشامل
import React from 'react';
import { message, notification } from 'antd';

// أنواع الأخطاء
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTH: 'AUTH_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// معالج الأخطاء الرئيسي
export class ErrorHandler {
  static handle(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    let errorType = ERROR_TYPES.UNKNOWN;
    let userMessage = 'حدث خطأ غير متوقع';
    
    // تحديد نوع الخطأ
    if (error.name === 'NetworkError' || error.message.includes('fetch')) {
      errorType = ERROR_TYPES.NETWORK;
      userMessage = 'خطأ في الاتصال بالشبكة';
    } else if (error.name === 'ValidationError') {
      errorType = ERROR_TYPES.VALIDATION;
      userMessage = 'بيانات غير صحيحة';
    } else if (error.name === 'AuthError') {
      errorType = ERROR_TYPES.AUTH;
      userMessage = 'خطأ في المصادقة';
    } else if (error.name === 'PermissionError') {
      errorType = ERROR_TYPES.PERMISSION;
      userMessage = 'ليس لديك صلاحية لهذا الإجراء';
    } else if (error.status >= 500) {
      errorType = ERROR_TYPES.SERVER;
      userMessage = 'خطأ في الخادم';
    }
    
    // عرض رسالة للمستخدم
    this.showUserMessage(errorType, userMessage, error);
    
    // تسجيل الخطأ
    this.logError(errorType, error, context);
    
    return {
      type: errorType,
      message: userMessage,
      originalError: error
    };
  }
  
  // عرض رسالة للمستخدم
  static showUserMessage(type, message, error) {
    const config = {
      message: 'خطأ',
      description: message,
      duration: 4,
      placement: 'topRight'
    };
    
    switch (type) {
      case ERROR_TYPES.NETWORK:
        notification.error({
          ...config,
          icon: '🌐'
        });
        break;
      case ERROR_TYPES.VALIDATION:
        message.warning(message);
        break;
      case ERROR_TYPES.AUTH:
        notification.error({
          ...config,
          icon: '🔒'
        });
        break;
      case ERROR_TYPES.PERMISSION:
        notification.warning({
          ...config,
          icon: '⚠️'
        });
        break;
      case ERROR_TYPES.SERVER:
        notification.error({
          ...config,
          icon: '🖥️'
        });
        break;
      default:
        message.error(message);
    }
  }
  
  // تسجيل الخطأ
  static logError(type, error, context) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      type,
      context,
      message: error.message,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // في الإنتاج، إرسال إلى خدمة تسجيل الأخطاء
    if (process.env.NODE_ENV === 'production') {
      // إرسال إلى خدمة مثل Sentry أو LogRocket
      console.error('Error logged:', errorLog);
    } else {
      console.error('Development error log:', errorLog);
    }
  }
}

// معالج أخطاء API
export const handleApiError = (error, operation = '') => {
  return ErrorHandler.handle(error, `API_${operation}`);
};

// معالج أخطاء التحقق
export const handleValidationError = (errors) => {
  const errorMessages = Object.values(errors).flat();
  errorMessages.forEach(msg => message.warning(msg));
};

// معالج أخطاء الشبكة
export const handleNetworkError = (error) => {
  return ErrorHandler.handle(error, 'NETWORK');
};

// معالج أخطاء المصادقة
export const handleAuthError = (error) => {
  return ErrorHandler.handle(error, 'AUTH');
};

// معالج أخطاء الصلاحيات
export const handlePermissionError = (error) => {
  return ErrorHandler.handle(error, 'PERMISSION');
};

// HOC لمعالجة الأخطاء في المكونات
export const withErrorHandler = (Component) => {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
      ErrorHandler.handle(error, 'COMPONENT_ERROR');
    }
    
    render() {
      if (this.state.hasError) {
        return (
          <div style={{ padding: 20, textAlign: 'center' }}>
            <h3>حدث خطأ في هذا المكون</h3>
            <button onClick={() => this.setState({ hasError: false })}>
              إعادة المحاولة
            </button>
          </div>
        );
      }
      
      return <Component {...this.props} />;
    }
  };
}; 