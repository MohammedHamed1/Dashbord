import { useState } from 'react';
import { APP_CONFIG } from '../config/config';
import { handleApiError, handleNetworkError } from '../utils/errorHandler';

// فئة خدمة API
class ApiService {
  constructor() {
    this.baseURL = APP_CONFIG.api.baseURL;
    this.timeout = APP_CONFIG.api.timeout;
  }

  // إنشاء headers افتراضية
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // إضافة token المصادقة إذا كان موجوداً
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // طلب HTTP عام
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'GET',
      headers: this.getHeaders(),
      timeout: this.timeout,
      ...options,
    };

    // دمج headers
    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers };
    }

    try {
      console.log(`API Request: ${config.method} ${url}`);
      
      const response = await fetch(url, config);
      
      // التحقق من حالة الاستجابة
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`API Response: ${url}`, data);
      
      return data;
    } catch (error) {
      console.error(`API Error: ${url}`, error);
      
      // معالجة أخطاء الشبكة
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return handleNetworkError(error);
      }
      
      return handleApiError(error, endpoint);
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // رفع ملف
  async uploadFile(endpoint, file, onProgress = null) {
    const formData = new FormData();
    formData.append('file', file);

    const headers = {
      'Authorization': this.getHeaders()['Authorization'],
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return handleApiError(error, 'FILE_UPLOAD');
    }
  }

  // فحص حالة الخادم
  async checkServerHealth() {
    try {
      // في وضع التطوير، نتجاهل فحص الخادم إذا لم يكن موجوداً
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Skipping server health check');
        return true; // نعتبر الخادم متصل في وضع التطوير
      }
      
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        timeout: 5000,
      });
      
      return response.ok;
    } catch (error) {
      // في وضع التطوير، لا نطبع الأخطاء
      if (process.env.NODE_ENV !== 'development') {
        console.error('Server health check failed:', error);
      }
      return false;
    }
  }
}

// إنشاء instance من خدمة API
const apiService = new ApiService();

// خدمات API محددة للمحتوى
export const contentApi = {
  // جلب محتوى الصفحة الرئيسية
  getHomepageContent: () => apiService.get('/api/content/homepage'),
  
  // حفظ محتوى الصفحة الرئيسية
  saveHomepageContent: (data) => apiService.post('/api/content/homepage', data),
  
  // جلب الخدمات
  getServices: () => apiService.get('/api/content/services'),
  
  // حفظ الخدمات
  saveServices: (data) => apiService.post('/api/content/services', data),
  
  // جلب الباقات
  getPackages: () => apiService.get('/api/content/packages'),
  
  // حفظ الباقات
  savePackages: (data) => apiService.post('/api/content/packages', data),
  
  // جلب مقالات المدونة
  getBlogPosts: () => apiService.get('/api/content/blog'),
  
  // حفظ مقال مدونة
  saveBlogPost: (data) => apiService.post('/api/content/blog', data),
  
  // جلب إعدادات الموقع
  getWebsiteSettings: () => apiService.get('/api/content/settings'),
  
  // حفظ إعدادات الموقع
  saveWebsiteSettings: (data) => apiService.post('/api/content/settings', data),
  
  // رفع صورة
  uploadImage: (file) => apiService.uploadFile('/api/content/upload-image', file),
};

// خدمات API عامة
export const generalApi = {
  // تسجيل الدخول
  login: (credentials) => apiService.post('/api/auth/login', credentials),
  
  // تسجيل الخروج
  logout: () => apiService.post('/api/auth/logout'),
  
  // تحديث الملف الشخصي
  updateProfile: (data) => apiService.put('/api/user/profile', data),
  
  // جلب الإحصائيات
  getStats: () => apiService.get('/api/stats'),
  
  // فحص حالة الخادم
  checkHealth: () => apiService.checkServerHealth(),
};

// خدمات API للمستخدمين
export const usersApi = {
  getUsers: (params) => apiService.get('/api/users', params),
  getUser: (id) => apiService.get(`/api/users/${id}`),
  createUser: (data) => apiService.post('/api/users', data),
  updateUser: (id, data) => apiService.put(`/api/users/${id}`, data),
  deleteUser: (id) => apiService.delete(`/api/users/${id}`),
};

// خدمات API للطلبات
export const ordersApi = {
  getOrders: (params) => apiService.get('/api/orders', params),
  getOrder: (id) => apiService.get(`/api/orders/${id}`),
  createOrder: (data) => apiService.post('/api/orders', data),
  updateOrder: (id, data) => apiService.put(`/api/orders/${id}`, data),
  deleteOrder: (id) => apiService.delete(`/api/orders/${id}`),
};

// خدمات API للفروع
export const branchesApi = {
  getBranches: (params) => apiService.get('/api/branches', params),
  getBranch: (id) => apiService.get(`/api/branches/${id}`),
  createBranch: (data) => apiService.post('/api/branches', data),
  updateBranch: (id, data) => apiService.put(`/api/branches/${id}`, data),
  deleteBranch: (id) => apiService.delete(`/api/branches/${id}`),
};

// خدمات API للموظفين
export const employeesApi = {
  getEmployees: (params) => apiService.get('/api/employees', params),
  getEmployee: (id) => apiService.get(`/api/employees/${id}`),
  createEmployee: (data) => apiService.post('/api/employees', data),
  updateEmployee: (id, data) => apiService.put(`/api/employees/${id}`, data),
  deleteEmployee: (id) => apiService.delete(`/api/employees/${id}`),
};

// خدمات API للمدفوعات
export const paymentsApi = {
  getPayments: (params) => apiService.get('/api/payments', params),
  getPayment: (id) => apiService.get(`/api/payments/${id}`),
  createPayment: (data) => apiService.post('/api/payments', data),
  updatePayment: (id, data) => apiService.put(`/api/payments/${id}`, data),
  deletePayment: (id) => apiService.delete(`/api/payments/${id}`),
};

// خدمات API للتقارير
export const reportsApi = {
  getSalesReport: (params) => apiService.get('/api/reports/sales', params),
  getCustomerReport: (params) => apiService.get('/api/reports/customers', params),
  getEmployeeReport: (params) => apiService.get('/api/reports/employees', params),
  getFinancialReport: (params) => apiService.get('/api/reports/financial', params),
  exportReport: (type, params) => apiService.get(`/api/reports/export/${type}`, params),
};

// Hook للتعامل مع API
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiCall, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(...args);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};

export default apiService; 