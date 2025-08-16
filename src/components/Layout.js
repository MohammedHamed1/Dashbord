import React from 'react';
import { Layout as AntLayout } from 'antd';
import './Layout.css';

const { Header, Sider, Content } = AntLayout;

const Layout = ({ children, sidebar, header, collapsed, onCollapse, isDarkMode }) => {
  const direction = document.documentElement.dir || 'rtl';
  const isRTL = direction === 'rtl';
  return (
    <AntLayout className={`app-layout ${isDarkMode ? 'dark-theme' : ''}`}> 
      {sidebar && (
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          className="app-sider"
          width={260}
          collapsedWidth={80}
          style={{
            background: isDarkMode ? '#1f1f1f' : 'linear-gradient(180deg, #2b3a67 0%, #4e54c8 100%)',
            position: 'fixed',
            [isRTL ? 'right' : 'left']: 0,
            [isRTL ? 'left' : 'right']: 'auto',
            top: 0,
            bottom: 0,
            zIndex: 1000,
            overflow: 'auto'
          }}
        >
          {sidebar}
        </Sider>
      )}
      <AntLayout 
        style={{ 
          [isRTL ? 'marginRight' : 'marginLeft']: collapsed ? 80 : 260,
          [isRTL ? 'marginLeft' : 'marginRight']: 0,
          transition: `margin-${isRTL ? 'right' : 'left'} 0.3s ease`
        }}
      >
        {header && (
          <Header 
            className="app-header"
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
              zIndex: 999
            }}
          >
            {header}
          </Header>
        )}
        <Content 
          className="app-content"
          style={{
            background: isDarkMode ? '#141414' : '#f5f6fa',
            minHeight: 'calc(100vh - 64px)',
            padding: 0
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout; 