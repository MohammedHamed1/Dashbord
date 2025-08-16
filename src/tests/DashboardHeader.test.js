import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { RoleProvider } from '../context/RoleContext';
import { PermissionProvider } from '../context/PermissionContext';
import { UserProvider } from '../context/UserContext';
import DashboardHeader from '../components/Dashboard/DashboardHeader';

// Mock للـ i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'dashboard': 'لوحة التحكم',
        'welcome_message': 'مرحباً بك في نظام إدارة مغاسل السيارات',
        'export_report': 'تصدير تقرير',
        'notifications': 'الإشعارات',
        'close': 'إغلاق',
        'no_notifications': 'لا توجد إشعارات جديدة',
        'new_order': 'طلب جديد',
        'pending': 'قيد الانتظار',
        'maintenance': 'صيانة',
        'qr_codes': 'رموز QR',
        'new_rating': 'تقييم جديد',
        'stars': 'نجوم',
        'today': 'اليوم',
        'admin': 'مدير',
        'laundry': 'مغسلة',
        'employee': 'موظف',
        'customer': 'عميل'
      };
      return translations[key] || key;
    }
  })
}));

// Mock للـ alert
global.alert = jest.fn();

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <RoleProvider>
          <PermissionProvider>
            <UserProvider>
              {component}
            </UserProvider>
          </PermissionProvider>
        </RoleProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('DashboardHeader', () => {
  beforeEach(() => {
    global.alert.mockClear();
  });

  test('يجب أن يعرض عنوان لوحة التحكم', () => {
    renderWithProviders(<DashboardHeader />);
    
    expect(screen.getByText('لوحة التحكم')).toBeInTheDocument();
    expect(screen.getByText('مرحباً بك في نظام إدارة مغاسل السيارات')).toBeInTheDocument();
  });

  test('يجب أن يعرض زر تصدير التقرير', () => {
    renderWithProviders(<DashboardHeader />);
    
    const exportButton = screen.getByText('تصدير تقرير');
    expect(exportButton).toBeInTheDocument();
  });

  test('يجب أن يعرض تنبيه عند النقر على زر التصدير', () => {
    renderWithProviders(<DashboardHeader />);
    
    const exportButton = screen.getByText('تصدير تقرير');
    fireEvent.click(exportButton);
    
    expect(global.alert).toHaveBeenCalledWith('تصدير تقرير قريباً!');
  });

  test('يجب أن يعرض زر تبديل الدور', () => {
    renderWithProviders(<DashboardHeader />);
    
    const roleButton = screen.getByText('مدير');
    expect(roleButton).toBeInTheDocument();
  });

  test('يجب أن يعرض زر الإشعارات مع العداد', () => {
    renderWithProviders(<DashboardHeader />);
    
    const notificationButton = screen.getByRole('button', { name: /bell/i });
    expect(notificationButton).toBeInTheDocument();
  });

  test('يجب أن يعرض مركز الإشعارات عند النقر على زر الإشعارات', () => {
    renderWithProviders(<DashboardHeader />);
    
    const notificationButton = screen.getByRole('button', { name: /bell/i });
    fireEvent.click(notificationButton);
    
    expect(screen.getByText('الإشعارات')).toBeInTheDocument();
    expect(screen.getByText('إغلاق')).toBeInTheDocument();
  });

  test('يجب أن يعرض قائمة الإشعارات', () => {
    renderWithProviders(<DashboardHeader />);
    
    const notificationButton = screen.getByRole('button', { name: /bell/i });
    fireEvent.click(notificationButton);
    
    expect(screen.getByText(/طلب جديد رقم 1234/)).toBeInTheDocument();
    expect(screen.getByText(/صيانة مطلوبة للسيارة رقم 5678/)).toBeInTheDocument();
    expect(screen.getByText(/انتهاء صلاحية للعميل علي محمود/)).toBeInTheDocument();
    expect(screen.getByText(/تقييم جديد من عميل: 5 نجوم/)).toBeInTheDocument();
  });

  test('يجب أن يخفي مركز الإشعارات عند النقر على زر الإغلاق', () => {
    renderWithProviders(<DashboardHeader />);
    
    const notificationButton = screen.getByRole('button', { name: /bell/i });
    fireEvent.click(notificationButton);
    
    expect(screen.getByText('الإشعارات')).toBeInTheDocument();
    
    const closeButton = screen.getByText('إغلاق');
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('الإشعارات')).not.toBeInTheDocument();
  });

  test('يجب أن يعرض أيقونات مناسبة لكل نوع إشعار', () => {
    renderWithProviders(<DashboardHeader />);
    
    const notificationButton = screen.getByRole('button', { name: /bell/i });
    fireEvent.click(notificationButton);
    
    // التحقق من وجود الأيقونات (Ant Design Icons)
    const icons = screen.getAllByRole('img', { hidden: true });
    expect(icons.length).toBeGreaterThan(0);
  });

  test('يجب أن يعرض الوقت لكل إشعار', () => {
    renderWithProviders(<DashboardHeader />);
    
    const notificationButton = screen.getByRole('button', { name: /bell/i });
    fireEvent.click(notificationButton);
    
    const timeElements = screen.getAllByText('اليوم');
    expect(timeElements.length).toBeGreaterThan(0);
  });

  test('يجب أن يكون لديه تخطيط صحيح', () => {
    renderWithProviders(<DashboardHeader />);
    
    // التحقق من وجود العناصر الرئيسية
    expect(screen.getByText('لوحة التحكم')).toBeInTheDocument();
    expect(screen.getByText('تصدير تقرير')).toBeInTheDocument();
    expect(screen.getByText('مدير')).toBeInTheDocument();
    
    // التحقق من وجود زر الإشعارات
    const notificationButton = screen.getByRole('button', { name: /bell/i });
    expect(notificationButton).toBeInTheDocument();
  });
}); 