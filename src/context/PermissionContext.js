import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRole } from './RoleContext';

const PermissionContext = createContext();

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};

export const PermissionProvider = ({ children }) => {
  const { currentRole, currentUser } = useRole();
  const [permissions, setPermissions] = useState([]);
  const [userScope, setUserScope] = useState(null);

  // تعريف جميع الصلاحيات المتاحة في النظام
  const allPermissions = {
    // لوحة التحكم
    'dashboard.view': 'عرض لوحة التحكم',
    'dashboard.analytics': 'عرض التحليلات',

    // إدارة المستخدمين
    'users.view': 'عرض المستخدمين',
    'users.create': 'إضافة مستخدمين',
    'users.edit': 'تعديل المستخدمين',
    'users.delete': 'حذف المستخدمين',
    'users.manage_roles': 'إدارة الأدوار والصلاحيات',

    // إدارة الطلبات
    'orders.view': 'عرض الطلبات',
    'orders.create': 'إنشاء طلبات',
    'orders.edit': 'تعديل الطلبات',
    'orders.delete': 'حذف الطلبات',
    'orders.update_status': 'تحديث حالة الطلبات',
    'orders.assign': 'تعيين الطلبات للموظفين',
    'orders.export': 'تصدير الطلبات',

    // إدارة العمليات
    'operations.view': 'عرض العمليات',
    'operations.manage': 'إدارة العمليات',
    'operations.monitor': 'مراقبة العمليات',

    // إدارة الباقات
    'packages.view': 'عرض الباقات',
    'packages.create': 'إنشاء باقات',
    'packages.edit': 'تعديل الباقات',
    'packages.delete': 'حذف الباقات',
    'packages.manage_pricing': 'إدارة الأسعار',

    // إدارة السيارات
    'cars.view': 'عرض السيارات',
    'cars.create': 'إضافة سيارات',
    'cars.edit': 'تعديل السيارات',
    'cars.delete': 'حذف السيارات',

    // تصوير السيارات
    'car-photos.view': 'عرض صور السيارات',
    'car-photos.upload': 'رفع صور السيارات',
    'car-photos.approve': 'الموافقة على الصور',

    // حاسبة الأسعار
    'price-calculator.view': 'عرض حاسبة الأسعار',
    'price-calculator.use': 'استخدام حاسبة الأسعار',

    // إدارة الفروع
    'branches.view': 'عرض الفروع',
    'branches.create': 'إضافة فروع',
    'branches.edit': 'تعديل الفروع',
    'branches.delete': 'حذف الفروع',
    'branches.manage_employees': 'إدارة موظفي الفروع',

    // إدارة الموظفين
    'employees.view': 'عرض الموظفين',
    'employees.create': 'إضافة موظفين',
    'employees.edit': 'تعديل الموظفين',
    'employees.delete': 'حذف الموظفين',
    'employees.manage_permissions': 'إدارة صلاحيات الموظفين',
    'employees.manage_attendance': 'إدارة الحضور',

    // النظام المالي
    'financial.view': 'عرض التقارير المالية',
    'financial.manage_payments': 'إدارة المدفوعات',
    'financial.view_revenue': 'عرض الإيرادات',
    'financial.manage_refunds': 'إدارة الاستردادات',

    // التقارير
    'reports.view': 'عرض التقارير',
    'reports.create': 'إنشاء تقارير',
    'reports.export': 'تصدير التقارير',

    // برامج الولاء
    'loyalty.view': 'عرض برامج الولاء',
    'loyalty.manage': 'إدارة برامج الولاء',
    'loyalty.view_points': 'عرض نقاط العملاء',

    // التسويق والمبيعات
    'marketing.view': 'عرض التسويق',
    'marketing.manage_campaigns': 'إدارة الحملات',
    'marketing.manage_promotions': 'إدارة العروض',

    // إدارة الموقع
    'website.view': 'عرض إدارة الموقع',
    'website.manage_content': 'إدارة المحتوى',
    'website.manage_pages': 'إدارة الصفحات',

    // إدارة التطبيقات
    'apps.view': 'عرض إدارة التطبيقات',
    'apps.manage': 'إدارة التطبيقات',

    // تكامل واتساب
    'whatsapp.view': 'عرض تكامل واتساب',
    'whatsapp.manage': 'إدارة تكامل واتساب',

    // سجل التدقيق
    'audit.view': 'عرض سجل التدقيق',

    // الإعدادات
    'settings.view': 'عرض الإعدادات',
    'settings.edit': 'تعديل الإعدادات',

    // أكواد QR
    'qr.view': 'عرض أكواد QR',
    'qr.create': 'إنشاء أكواد QR',
    'qr.scan': 'مسح أكواد QR',
    'qr.manage': 'إدارة أكواد QR',

    // الإشعارات
    'notifications.view': 'عرض الإشعارات',
    'notifications.send': 'إرسال إشعارات',
    'notifications.manage': 'إدارة الإشعارات',

    // التقييمات
    'ratings.view': 'عرض التقييمات',
    'ratings.respond': 'الرد على التقييمات',
    'ratings.manage': 'إدارة التقييمات',

    // الدعوات والإحالة
    'referrals.view': 'عرض الدعوات',
    'referrals.manage': 'إدارة الدعوات',

    // الدعم الفني
    'support.view': 'عرض تذاكر الدعم',
    'support.manage': 'إدارة تذاكر الدعم',
    'support.respond': 'الرد على تذاكر الدعم',

    // التنبيهات الذكية
    'alerts.view': 'عرض التنبيهات',
    'alerts.manage': 'إدارة التنبيهات',

    // المساعد الذكي
    'ai.view': 'عرض المساعد الذكي',
    'ai.use': 'استخدام المساعد الذكي',

    // إدارة العملاء
    'customers.view': 'عرض العملاء',
    'customers.create': 'إضافة عملاء',
    'customers.edit': 'تعديل العملاء',
    'customers.delete': 'حذف العملاء',
    'customers.manage_loyalty': 'إدارة ولاء العملاء',

    // إدارة المخزون
    'inventory.view': 'عرض المخزون',
    'inventory.manage': 'إدارة المخزون',
    'inventory.alerts': 'تنبيهات المخزون',

    // إدارة الصيانة
    'maintenance.view': 'عرض الصيانة',
    'maintenance.schedule': 'جدولة الصيانة',
    'maintenance.manage': 'إدارة الصيانة',

    // إدارة الحضور
    'attendance.view': 'عرض الحضور',
    'attendance.manage': 'إدارة الحضور',
    'attendance.reports': 'تقارير الحضور',

    // البحث الذكي
    'search.view': 'عرض البحث الذكي',
    'search.use': 'استخدام البحث الذكي',

    // التكاملات
    'integrations.view': 'عرض التكاملات',
    'integrations.manage': 'إدارة التكاملات',

    // إدارة الصلاحيات
    'permissions.view': 'عرض الصلاحيات',
    'permissions.manage': 'إدارة الصلاحيات',

    // نظام التصدير
    'export.view': 'عرض نظام التصدير',
    'export.use': 'استخدام نظام التصدير'
  };

  // تعريف الأدوار والصلاحيات الافتراضية
  const rolePermissions = {
    admin: Object.keys(allPermissions), // المدير له جميع الصلاحيات
    laundry: [
      'dashboard.view', 'dashboard.analytics',
      'orders.view', 'orders.edit', 'orders.update_status', 'orders.assign', 'orders.export',
      'operations.view', 'operations.manage', 'operations.monitor',
      'packages.view', 'packages.create', 'packages.edit', 'packages.delete', 'packages.manage_pricing',
      'cars.view', 'cars.create', 'cars.edit',
      'car-photos.view', 'car-photos.upload', 'car-photos.approve',
      'price-calculator.view', 'price-calculator.use',
      'branches.view', 'branches.create', 'branches.edit', 'branches.manage_employees',
      'employees.view', 'employees.create', 'employees.edit', 'employees.delete', 'employees.manage_attendance',
      'customers.view', 'customers.create', 'customers.edit', 'customers.manage_loyalty',
      'financial.view', 'financial.view_revenue', 'financial.manage_payments',
      'reports.view', 'reports.export',
      'loyalty.view', 'loyalty.manage', 'loyalty.view_points',
      'notifications.view', 'notifications.send', 'notifications.manage',
      'ratings.view', 'ratings.respond', 'ratings.manage',
      'qr.view', 'qr.create', 'qr.scan', 'qr.manage',
      'inventory.view', 'inventory.manage', 'inventory.alerts',
      'maintenance.view', 'maintenance.schedule', 'maintenance.manage',
      'attendance.view', 'attendance.manage', 'attendance.reports',
      'search.view', 'search.use',
      'integrations.view', 'integrations.manage',
      'export.view', 'export.use',
      'settings.view', 'settings.edit'
    ],
    employee: [
      'dashboard.view',
      'orders.view', 'orders.update_status',
      'operations.view',
      'cars.view',
      'car-photos.view', 'car-photos.upload',
      'price-calculator.view', 'price-calculator.use',
      'customers.view',
      'qr.scan',
      'notifications.view',
      'ratings.view',
      'attendance.view',
      'search.view', 'search.use'
    ],
    customer: [
      'dashboard.view',
      'orders.view', 'orders.create',
      'cars.view', 'cars.create', 'cars.edit', 'cars.delete',
      'loyalty.view',
      'notifications.view',
      'ratings.view',
      'search.view', 'search.use'
    ]
  };

  // تحديث الصلاحيات عند تغيير الدور
  useEffect(() => {
    const userPermissions = rolePermissions[currentRole] || [];
    setPermissions(userPermissions);
    
    // تحديد نطاق المستخدم
    if (currentRole === 'admin') {
      setUserScope('all');
    } else if (currentRole === 'laundry') {
      setUserScope(currentUser.laundryId);
    } else {
      setUserScope(currentUser.id);
    }
  }, [currentRole, currentUser]);

  const hasPermission = (permission) => {
    return permissions.includes(permission) || permissions.includes('all');
  };

  const hasAnyPermission = (requiredPermissions) => {
    return requiredPermissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (requiredPermissions) => {
    return requiredPermissions.every(permission => hasPermission(permission));
  };

  const filterDataByScope = (data, dataType) => {
    if (userScope === 'all') return data;
    
    switch (dataType) {
      case 'orders':
        return data.filter(item => item.laundryId === userScope);
      case 'employees':
        return data.filter(item => item.branchId === userScope);
      case 'customers':
        return data.filter(item => item.createdBy === userScope);
      default:
        return data;
    }
  };

  const getAllPermissions = () => {
    return allPermissions;
  };

  const getRolePermissions = (role) => {
    return rolePermissions[role] || [];
  };

  const addPermission = (permission) => {
    if (!permissions.includes(permission)) {
      setPermissions([...permissions, permission]);
    }
  };

  const removePermission = (permission) => {
    setPermissions(permissions.filter(p => p !== permission));
  };

  const updateRolePermissions = (role, newPermissions) => {
    rolePermissions[role] = newPermissions;
  };

  return (
    <PermissionContext.Provider value={{
      permissions,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      filterDataByScope,
      getAllPermissions,
      getRolePermissions,
      addPermission,
      removePermission,
      updateRolePermissions,
      userScope,
      allPermissions
    }}>
      {children}
    </PermissionContext.Provider>
  );
}; 