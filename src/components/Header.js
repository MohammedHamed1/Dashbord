import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Badge, Button, Space, Typography, Divider, Tooltip } from 'antd';
import { 
  BellOutlined, 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GlobalOutlined,
  SunOutlined,
  MoonOutlined,
  WifiOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  BookOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { useSafeNavigate } from '../utils/safeHooks';
import { SimpleServerStatus } from './ServerStatus';
import ConnectionManager from './ConnectionManager';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ collapsed, onToggle, user, isDarkMode, onToggleDarkMode, direction }) => {
  const { t, i18n } = useTranslation();
  const { currentRole } = useRole();
  const { lang, toggleLanguage, isRTL } = useLanguage();
  const navigate = useSafeNavigate();
  const [connectionManagerVisible, setConnectionManagerVisible] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'طلب جديد', message: 'تم استلام طلب جديد من العميل أحمد محمد', time: 'منذ 5 دقائق', read: false },
    { id: 2, title: 'تحديث حالة', message: 'تم تحديث حالة الطلب #1234 إلى "مكتمل"', time: 'منذ 10 دقائق', read: false },
    { id: 3, title: 'تقييم جديد', message: 'تقييم جديد 5 نجوم من العميل سارة أحمد', time: 'منذ ساعة', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'الملف الشخصي',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'الإعدادات',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'تسجيل الخروج',
      danger: true,
    },
  ];

  const notificationItems = [
    ...notifications.map(notification => ({
      key: notification.id,
      label: (
        <div className="notification-item">
          <div className="notification-header">
            <Text strong>{notification.title}</Text>
            <Text type="secondary" className="notification-time">{notification.time}</Text>
          </div>
          <Text className="notification-message">{notification.message}</Text>
          {!notification.read && <div className="notification-unread-indicator" />}
        </div>
      ),
    })),
    {
      type: 'divider',
    },
    {
      key: 'view-all',
      label: 'عرض جميع الإشعارات',
    },
  ];

  const languageItems = [
    {
      key: 'ar',
      label: 'العربية',
      icon: '🇸🇦',
    },
    {
      key: 'en',
      label: 'English',
      icon: '🇺🇸',
    },
  ];

  const legalPagesItems = [
    {
      key: 'privacy-policy',
      icon: <SafetyCertificateOutlined />,
      label: 'سياسة الخصوصية',
      onClick: () => navigate('/privacy-policy')
    },
    {
      key: 'terms-of-service',
      icon: <FileTextOutlined />,
      label: 'شروط الاستخدام',
      onClick: () => navigate('/terms-of-service')
    },
    {
      key: 'terms-and-conditions',
      icon: <BookOutlined />,
      label: 'الشروط والأحكام',
      onClick: () => navigate('/terms-and-conditions')
    },
    {
      key: 'sitemap',
      icon: <AppstoreOutlined />,
      label: 'خريطة الموقع',
      onClick: () => navigate('/sitemap')
    }
  ];

  const getRoleDisplayName = (role) => {
    const roleNames = {
      admin: 'مدير النظام',
      laundry: 'مدير المغسلة',
      employee: 'موظف',
      customer: 'عميل'
    };
    return roleNames[role] || role;
  };

  return (
    <AntHeader 
      className={`app-header ${direction}`}
      style={{
        background: isDarkMode ? '#1f1f1f' : '#fff',
        borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        direction: direction
      }}
    >
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="sidebar-trigger"
          style={{ fontSize: '16px' }}
        />
        <div className="header-title">
          <Text 
            strong 
            style={{ 
              fontSize: '18px',
              color: isDarkMode ? '#fff' : '#262626'
            }}
          >
            {t('dashboard')}
          </Text>
        </div>
      </div>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Space size="middle">
          {/* البحث */}
          <Button
            type="text"
            icon={<SearchOutlined />}
            className="header-action-btn"
            title="بحث"
            style={{ color: isDarkMode ? '#fff' : '#262626' }}
          />

          {/* تبديل اللغة */}
          <Dropdown
            menu={{
              items: languageItems,
              onClick: ({ key }) => handleLanguageChange(key),
            }}
            placement={isRTL ? "bottomLeft" : "bottomRight"}
          >
            <Button
              type="text"
              icon={<GlobalOutlined />}
              className="header-action-btn"
              title="تغيير اللغة"
              style={{ color: isDarkMode ? '#fff' : '#262626' }}
            >
              {lang === 'ar' ? '🇸🇦' : '🇺🇸'}
            </Button>
          </Dropdown>

          {/* تبديل الوضع الداكن */}
          <Button
            type="text"
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={onToggleDarkMode}
            className="header-action-btn"
            title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
            style={{ color: isDarkMode ? '#fff' : '#262626' }}
          />

          {/* حالة الخادم */}
          <SimpleServerStatus />

          {/* إدارة الاتصال */}
          <Tooltip title="إعدادات الاتصال">
            <Button
              type="text"
              icon={<WifiOutlined />}
              onClick={() => setConnectionManagerVisible(true)}
              className="header-action-btn"
              style={{ color: isDarkMode ? '#fff' : '#262626' }}
            />
          </Tooltip>

          {/* الإشعارات */}
          <Dropdown
            menu={{
              items: notificationItems,
              onClick: ({ key }) => {
                if (key === 'view-all') {
                  navigate('/notifications');
                }
              },
            }}
            placement={isRTL ? "bottomLeft" : "bottomRight"}
            trigger={['click']}
          >
            <Badge count={unreadCount} offset={[-2, 2]}>
              <Button
                type="text"
                icon={<BellOutlined />}
                className="header-action-btn"
                title="الإشعارات"
                style={{ color: isDarkMode ? '#fff' : '#262626' }}
              />
            </Badge>
          </Dropdown>

          {/* الصفحات القانونية */}
          <Dropdown
            menu={{
              items: legalPagesItems,
            }}
            placement={isRTL ? "bottomLeft" : "bottomRight"}
          >
            <Button
              type="text"
              icon={<FileTextOutlined />}
              className="header-action-btn"
              title="الصفحات القانونية"
              style={{ color: isDarkMode ? '#fff' : '#262626' }}
            />
          </Dropdown>

          <Divider type="vertical" style={{ height: '24px', margin: '0 8px' }} />

          {/* معلومات المستخدم */}
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: ({ key }) => {
                if (key === 'profile') {
                  navigate('/profile');
                } else if (key === 'settings') {
                  navigate('/settings');
                } else if (key === 'logout') {
                  // إضافة منطق تسجيل الخروج هنا
                }
              },
            }}
            placement={isRTL ? "bottomLeft" : "bottomRight"}
          >
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Avatar 
                size="small" 
                icon={<UserOutlined />}
                style={{ backgroundColor: isDarkMode ? '#1890ff' : '#1890ff' }}
              />
              <div className="user-details" style={{ display: 'flex', flexDirection: 'column', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                <Text 
                  strong 
                  style={{ 
                    fontSize: '14px',
                    color: isDarkMode ? '#fff' : '#262626',
                    lineHeight: '1.2'
                  }}
                >
                  {user?.name || 'المستخدم'}
                </Text>
                <Text 
                  type="secondary" 
                  style={{ 
                    fontSize: '12px',
                    color: isDarkMode ? '#8c8c8c' : '#8c8c8c',
                    lineHeight: '1.2'
                  }}
                >
                  {getRoleDisplayName(currentRole)}
                </Text>
              </div>
            </div>
          </Dropdown>
        </Space>
      </div>

      {/* مدير الاتصال */}
      <ConnectionManager
        visible={connectionManagerVisible}
        onClose={() => setConnectionManagerVisible(false)}
        direction={direction}
      />
    </AntHeader>
  );
};

export default Header; 