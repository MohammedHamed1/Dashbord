import React from 'react';
import { message, notification } from 'antd';
import { useLanguage } from '../context/LanguageContext';

// خدمة Toast موحدة
class ToastService {
  constructor() {
    this.language = 'ar';
    this.direction = 'rtl';
  }

  // تحديث اللغة والاتجاه
  updateLanguage(lang, direction) {
    this.language = lang;
    this.direction = direction;
  }

  // رسائل النجاح
  success(content, duration = 3) {
    message.success({
      content,
      duration,
      style: {
        direction: this.direction,
        textAlign: this.direction === 'rtl' ? 'right' : 'left'
      }
    });
  }

  // رسائل الخطأ
  error(content, duration = 4) {
    message.error({
      content,
      duration,
      style: {
        direction: this.direction,
        textAlign: this.direction === 'rtl' ? 'right' : 'left'
      }
    });
  }

  // رسائل التحذير
  warning(content, duration = 3) {
    message.warning({
      content,
      duration,
      style: {
        direction: this.direction,
        textAlign: this.direction === 'rtl' ? 'right' : 'left'
      }
    });
  }

  // رسائل المعلومات
  info(content, duration = 3) {
    message.info({
      content,
      duration,
      style: {
        direction: this.direction,
        textAlign: this.direction === 'rtl' ? 'right' : 'left'
      }
    });
  }

  // إشعارات متقدمة
  notification(type, title, description, duration = 4.5) {
    const placement = this.direction === 'rtl' ? 'topLeft' : 'topRight';
    
    notification[type]({
      message: title,
      description,
      duration,
      placement,
      style: {
        direction: this.direction,
        textAlign: this.direction === 'rtl' ? 'right' : 'left'
      }
    });
  }

  // إشعار نجاح
  successNotification(title, description) {
    this.notification('success', title, description);
  }

  // إشعار خطأ
  errorNotification(title, description) {
    this.notification('error', title, description);
  }

  // إشعار تحذير
  warningNotification(title, description) {
    this.notification('warning', title, description);
  }

  // إشعار معلومات
  infoNotification(title, description) {
    this.notification('info', title, description);
  }

  // رسائل مخصصة للعمليات
  orderCreated() {
    this.success('تم إنشاء الطلب بنجاح');
  }

  orderUpdated() {
    this.success('تم تحديث الطلب بنجاح');
  }

  orderDeleted() {
    this.success('تم حذف الطلب بنجاح');
  }

  customerCreated() {
    this.success('تم إضافة العميل بنجاح');
  }

  customerUpdated() {
    this.success('تم تحديث بيانات العميل بنجاح');
  }

  customerDeleted() {
    this.success('تم حذف العميل بنجاح');
  }

  employeeCreated() {
    this.success('تم إضافة الموظف بنجاح');
  }

  employeeUpdated() {
    this.success('تم تحديث بيانات الموظف بنجاح');
  }

  employeeDeleted() {
    this.success('تم حذف الموظف بنجاح');
  }

  packageCreated() {
    this.success('تم إنشاء الباقة بنجاح');
  }

  packageUpdated() {
    this.success('تم تحديث الباقة بنجاح');
  }

  packageDeleted() {
    this.success('تم حذف الباقة بنجاح');
  }

  paymentReceived() {
    this.success('تم استلام الدفع بنجاح');
  }

  fileUploaded() {
    this.success('تم رفع الملف بنجاح');
  }

  settingsSaved() {
    this.success('تم حفظ الإعدادات بنجاح');
  }

  // رسائل الأخطاء
  networkError() {
    this.error('خطأ في الاتصال بالخادم، يرجى المحاولة مرة أخرى');
  }

  serverError() {
    this.error('خطأ في الخادم، يرجى المحاولة لاحقاً');
  }

  validationError(field) {
    this.error(`خطأ في ${field}، يرجى التحقق من البيانات`);
  }

  permissionDenied() {
    this.error('ليس لديك صلاحية لتنفيذ هذا الإجراء');
  }

  sessionExpired() {
    this.error('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
  }

  // رسائل التحذير
  confirmDelete(itemName) {
    this.warning(`هل أنت متأكد من حذف ${itemName}؟`);
  }

  unsavedChanges() {
    this.warning('لديك تغييرات غير محفوظة، هل تريد المتابعة؟');
  }

  // رسائل المعلومات
  loadingData() {
    this.info('جاري تحميل البيانات...');
  }

  processingRequest() {
    this.info('جاري معالجة الطلب...');
  }

  exportStarted() {
    this.info('جاري تصدير البيانات...');
  }

  importStarted() {
    this.info('جاري استيراد البيانات...');
  }
}

// إنشاء instance من خدمة Toast
const toastService = new ToastService();

// Hook لاستخدام خدمة Toast مع اللغة الحالية
export const useToast = () => {
  const { lang, direction } = useLanguage();
  
  // تحديث اللغة في خدمة Toast
  React.useEffect(() => {
    toastService.updateLanguage(lang, direction);
  }, [lang, direction]);

  return toastService;
};

// تصدير الخدمة للاستخدام المباشر
export default toastService; 