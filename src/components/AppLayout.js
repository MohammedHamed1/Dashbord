import React, { useState } from 'react';
import { Layout as AntLayout, ConfigProvider, theme } from 'antd';
import { Outlet } from 'react-router-dom';

// Context Providers
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { RoleProvider } from '../context/RoleContext';
import { PermissionProvider } from '../context/PermissionContext';
import { UserProvider } from '../context/UserContext';

// Layout Components
import Sidebar from './Sidebar';
import Header from './Header';
import TopHeader from './TopHeader';

// Locales
import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';

const { Content } = AntLayout;

const AppLayoutContent = () => {
  const { lang, direction, isRTL } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider
      locale={lang === 'ar' ? arEG : enUS}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#667eea',
          borderRadius: 8,
        },
      }}
      direction={direction}
    >
      <AntLayout 
        style={{ 
          minHeight: '100vh',
          direction: direction
        }}
        className={`app-layout ${direction}`}
      >
        <Sidebar 
          collapsed={collapsed} 
          direction={direction}
          isRTL={isRTL}
        />
        <AntLayout 
          style={{ 
            marginLeft: isRTL ? 0 : (collapsed ? 80 : 260),
            marginRight: isRTL ? (collapsed ? 80 : 260) : 0,
            transition: 'all 0.2s ease'
          }}
        >
          <TopHeader 
            onLogout={() => {
              // إضافة منطق تسجيل الخروج هنا
            }}
            notificationsCount={3}
            onNotificationsClick={() => {
              // إضافة منطق الإشعارات هنا
            }}
            direction={direction}
          />
          <Header 
            collapsed={collapsed} 
            onToggle={() => setCollapsed(!collapsed)}
            direction={direction}
          />
          <Content 
            style={{ 
              margin: '24px 16px', 
              padding: 24, 
              minHeight: 280,
              direction: direction
            }}
          >
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    </ConfigProvider>
  );
};

const AppLayout = () => {
  return (
    <LanguageProvider>
      <RoleProvider>
        <PermissionProvider>
          <UserProvider>
            <AppLayoutContent />
          </UserProvider>
        </PermissionProvider>
      </RoleProvider>
    </LanguageProvider>
  );
};

export default AppLayout; 