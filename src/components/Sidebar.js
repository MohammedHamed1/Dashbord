import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, Space, Badge, Tooltip, Button, Dropdown } from 'antd';
import { useSafeNavigate, useSafeLocation } from '../utils/withRouter';
import { useSafeTranslation } from '../utils/useSafeTranslation';
import { useLanguage } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';
import { usePermissions } from '../context/PermissionContext';
import { useUser } from '../context/UserContext';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  PlayCircleOutlined,
  ThunderboltOutlined,
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  AppstoreOutlined,
  CarOutlined,
  CameraOutlined,
  CalculatorOutlined,
  SettingOutlined,
  FileTextOutlined,
  BarChartOutlined,
  NotificationOutlined,
  GiftOutlined,
  StarOutlined,
  ExportOutlined,
  QrcodeOutlined,
  MessageOutlined,
  GlobalOutlined,
  ToolOutlined,
  SafetyOutlined,
  HeartOutlined,
  CrownOutlined,
  RocketOutlined,
  BulbOutlined,
  CloudOutlined,
  MobileOutlined,
  DollarOutlined,
  ShopOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ApartmentOutlined,
  ExclamationCircleOutlined,
  CustomerServiceOutlined,
  DatabaseOutlined,
  CalendarOutlined,
  SearchOutlined,
  ApiOutlined,
  LockOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
  BookOutlined,
  TrophyOutlined,
  BellOutlined,
  DownOutlined,
  RobotOutlined,
  BugOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ collapsed, isDarkMode, onToggleDarkMode, direction, isRTL }) => {
  const { lang, toggleLanguage } = useLanguage();
  const { t, i18n } = useTranslation();
  const location = useSafeLocation();
  const navigate = useSafeNavigate();
  const { currentRole, setCurrentRole } = useRole();
  const { hasPermission } = usePermissions();

  const getMenuItems = () => {
    const items = [
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: t('dashboard'),
        path: '/dashboard',
        permission: 'dashboard.view'
      },
      {
        key: 'orders',
        icon: <ShoppingCartOutlined />,
        label: t('orders'),
        path: '/orders',
        permission: 'orders.view'
      },
      {
        key: 'operations',
        icon: <PlayCircleOutlined />,
        label: 'إدارة العمليات',
        path: '/operations',
        permission: 'operations.view'
      },
      {
        key: 'live-tracking',
        icon: <ThunderboltOutlined />,
        label: 'التتبع المباشر',
        path: '/live-tracking',
        permission: 'operations.view'
      },
      {
        key: 'customers',
        icon: <UserOutlined />,
        label: 'إدارة العملاء',
        path: '/customer-management',
        permission: 'customers.view'
      },
      {
        key: 'employees',
        icon: <TeamOutlined />,
        label: 'إدارة الموظفين',
        path: '/employee-management',
        permission: 'employees.view'
      },
      {
        key: 'branches',
        icon: <ApartmentOutlined />,
        label: t('branches'),
        path: '/branches',
        permission: 'branches.view'
      },
      {
        key: 'packages',
        icon: <AppstoreOutlined />,
        label: t('packages'),
        path: '/packages',
        permission: 'packages.view'
      },
      {
        key: 'content-management',
        icon: <FileTextOutlined />,
        label: 'إدارة المحتوى',
        path: '/content-management',
        permission: 'content.view'
      },
      {
        key: 'cars',
        icon: <CarOutlined />,
        label: t('cars'),
        path: '/cars',
        permission: 'cars.view'
      },
      {
        key: 'car-photos',
        icon: <CameraOutlined />,
        label: 'تصوير السيارات',
        path: '/car-photos',
        permission: 'car-photos.view'
      },
      {
        key: 'price-calculator',
        icon: <CalculatorOutlined />,
        label: 'حاسبة الأسعار',
        path: '/price-calculator',
        permission: 'price-calculator.view'
      },
      {
        key: 'qr-codes',
        icon: <QrcodeOutlined />,
        label: t('qrCodes'),
        path: '/qr-code-management',
        permission: 'qr.view'
      },
      {
        key: 'payments',
        icon: <DollarOutlined />,
        label: t('financial'),
        path: '/payments',
        permission: 'financial.view'
      },
      {
        key: 'loyalty',
        icon: <HeartOutlined />,
        label: t('loyalty'),
        path: '/loyalty-programs',
        permission: 'loyalty.view'
      },
      {
        key: 'referrals',
        icon: <TrophyOutlined />,
        label: t('referrals'),
        path: '/referrals',
        permission: 'referrals.view'
      },
      {
        key: 'ratings',
        icon: <StarOutlined />,
        label: 'التقييمات',
        path: '/ratings',
        permission: 'ratings.view'
      },
      {
        key: 'notifications',
        icon: <BellOutlined />,
        label: t('notifications'),
        path: '/notifications',
        permission: 'notifications.view'
      },
      {
        key: 'complaints',
        icon: <ExclamationCircleOutlined />,
        label: 'الشكاوى',
        path: '/complaints',
        permission: 'complaints.view'
      },
      {
        key: 'support',
        icon: <CustomerServiceOutlined />,
        label: 'الدعم الفني',
        path: '/support',
        permission: 'support.view'
      },
      {
        key: 'inventory',
        icon: <DatabaseOutlined />,
        label: 'إدارة المخزون',
        path: '/inventory',
        permission: 'inventory.view'
      },
      {
        key: 'maintenance',
        icon: <ToolOutlined />,
        label: 'إدارة الصيانة',
        path: '/maintenance',
        permission: 'maintenance.view'
      },
      {
        key: 'attendance',
        icon: <CalendarOutlined />,
        label: 'إدارة الحضور',
        path: '/attendance',
        permission: 'attendance.view'
      },
      {
        key: 'smart-search',
        icon: <SearchOutlined />,
        label: 'البحث الذكي',
        path: '/smart-search',
        permission: 'search.view'
      },
      {
        key: 'integrations',
        icon: <ApiOutlined />,
        label: 'التكاملات',
        path: '/integrations',
        permission: 'integrations.view'
      },
      {
        key: 'permissions',
        icon: <LockOutlined />,
        label: 'إدارة الصلاحيات',
        path: '/permissions',
        permission: 'permissions.view'
      },
      {
        key: 'export',
        icon: <ExportOutlined />,
        label: 'تصدير البيانات',
        path: '/export',
        permission: 'export.view'
      },
      {
        key: 'reports',
        icon: <BarChartOutlined />,
        label: 'التقارير',
        path: '/reports',
        permission: 'reports.view'
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'الإعدادات',
        path: '/settings',
        permission: 'settings.view'
      },
      {
        key: 'features',
        icon: <BulbOutlined />,
        label: 'المميزات',
        path: '/features',
        permission: 'features.view'
      },
      {
        key: 'financial',
        icon: <DollarOutlined />,
        label: 'المالية',
        path: '/financial',
        permission: 'financial.view'
      },
      {
        key: 'audit-log',
        icon: <SafetyCertificateOutlined />,
        label: 'سجل التدقيق',
        path: '/audit-log',
        permission: 'audit.view'
      },
      {
        key: 'apps-management',
        icon: <AppstoreOutlined />,
        label: 'إدارة التطبيقات',
        path: '/apps-management',
        permission: 'apps.view'
      },
      {
        key: 'website-management',
        icon: <GlobalOutlined />,
        label: 'إدارة الموقع',
        path: '/website-management',
        permission: 'website.view'
      },
      {
        key: 'marketing-sales',
        icon: <RocketOutlined />,
        label: 'التسويق والمبيعات',
        path: '/marketing-sales',
        permission: 'marketing.view'
      },
      {
        key: 'whatsapp-integration',
        icon: <MobileOutlined />,
        label: 'تكامل واتساب',
        path: '/whatsapp-integration',
        permission: 'whatsapp.view'
      },
      {
        key: 'smart-alerts',
        icon: <BellOutlined />,
        label: 'التنبيهات الذكية',
        path: '/smart-alerts',
        permission: 'alerts.view'
      },
      {
        key: 'users',
        icon: <UserOutlined />,
        label: 'المستخدمين',
        path: '/users',
        permission: 'users.view'
      },
      {
        key: 'laundry-management',
        icon: <ShopOutlined />,
        label: 'إدارة المغاسل',
        path: '/laundry-management',
        permission: 'laundry.view'
      },
      {
        key: 'privacy-policy',
        icon: <InfoCircleOutlined />,
        label: 'سياسة الخصوصية',
        path: '/privacy-policy',
        permission: 'privacy.view'
      },
      {
        key: 'terms-of-service',
        icon: <BookOutlined />,
        label: 'شروط الاستخدام',
        path: '/terms-of-service',
        permission: 'terms.view'
      },
      {
        key: 'terms-and-conditions',
        icon: <BookOutlined />,
        label: 'الشروط والأحكام',
        path: '/terms-and-conditions',
        permission: 'conditions.view'
      },
      {
        key: 'sitemap',
        icon: <GlobalOutlined />,
        label: 'خريطة الموقع',
        path: '/sitemap',
        permission: 'sitemap.view'
      },
      {
        key: 'legal-pages-hub',
        icon: <BookOutlined />,
        label: 'الصفحات القانونية',
        path: '/legal-pages-hub',
        permission: 'legal.view'
      },
      {
        key: 'branch-revenues',
        icon: <DollarOutlined />,
        label: 'إيرادات الفروع',
        path: '/branch-revenues',
        permission: 'revenues.view'
      },
      {
        key: 'app-management',
        icon: <AppstoreOutlined />,
        label: 'إدارة التطبيقات',
        path: '/app-management',
        permission: 'app-management.view'
      },
      {
        key: 'smart-assistant',
        icon: <RobotOutlined />,
        label: 'المساعد الذكي',
        path: '/smart-assistant',
        permission: 'assistant.view'
      },
      {
        key: 'system-monitor',
        icon: <BugOutlined />,
        label: 'مراقبة النظام',
        path: '/system-monitor',
        permission: 'system-monitor.view'
      }
    ];

    return items.filter(item => !item.permission || hasPermission(item.permission));
  };

  const handleMenuClick = ({ key }) => {
    const menuItem = getMenuItems().find(item => item.key === key);
    if (menuItem) {
      navigate(menuItem.path);
    }
  };

  const getCurrentPage = () => {
    const path = location.pathname;
    const menuItem = getMenuItems().find(item => item.path === path);
    return menuItem ? menuItem.key : 'dashboard';
  };

  const roleMenuItems = [
    { key: 'admin', label: 'مدير النظام' },
    { key: 'laundry', label: 'مدير المغسلة' },
    { key: 'employee', label: 'موظف' },
    { key: 'customer', label: 'عميل' },
  ];

  const handleRoleChange = ({ key }) => {
    setCurrentRole(key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      className={`sidebar ${direction}`}
      style={{
        background: 'linear-gradient(180deg, #14532d 0%, #166534 100%)',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        [isRTL ? 'right' : 'left']: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        direction: direction
      }}
    >
      {/* شعار التطبيق */}
      <div className="sidebar-header">
        <div className="logo">
          {collapsed ? (
            <span className="logo-icon">🚗</span>
          ) : (
            <div className="logo-content">
              <span className="logo-icon">🚗</span>
              <span className="logo-text">مغسلة النظافة الذكية</span>
            </div>
          )}
        </div>
      </div>

      {/* قائمة الأدوار */}
      {!collapsed && (
        <div className="role-selector">
          <Dropdown
            menu={{
              items: roleMenuItems,
              onClick: handleRoleChange
            }}
            placement={isRTL ? "bottomLeft" : "bottomRight"}
          >
            <Button 
              type="text" 
              className="role-button"
              icon={<UserOutlined />}
            >
              {roleMenuItems.find(item => item.key === currentRole)?.label}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      )}

      {/* القائمة الرئيسية */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getCurrentPage()]}
        items={getMenuItems()}
        onClick={handleMenuClick}
        className={`sidebar-menu ${direction}`}
        style={{
          background: 'transparent',
          border: 'none',
          direction: direction
        }}
      />

      {/* إعدادات إضافية */}
      {!collapsed && (
        <div className="sidebar-footer">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Button
              type="text"
              icon={<GlobalOutlined />}
              onClick={toggleLanguage}
              className="language-toggle"
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </Button>
            <Button
              type="text"
              icon={isDarkMode ? <DashboardOutlined /> : <DashboardOutlined />}
              onClick={onToggleDarkMode}
              className="theme-toggle"
            >
              {isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
            </Button>
          </Space>
        </div>
      )}
    </Sider>
  );
};

export default Sidebar; 