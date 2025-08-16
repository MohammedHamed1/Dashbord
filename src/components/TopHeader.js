import React from 'react';
import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const TopHeader = ({ onLogout, notificationsCount, onNotificationsClick }) => {
  const { currentRole } = useRole();
  const languageContext = useLanguage();
  const lang = languageContext?.lang || 'ar';
  const setLang = languageContext?.setLang || (() => {});
  return (
    <div style={{
      width: '100%', height: 64, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid #eee', padding: '0 24px', position: 'sticky', top: 0, zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo192.png" alt="logo" style={{ height: 40, marginRight: 16 }} />
        <span style={{ fontWeight: 700, fontSize: 22, fontFamily: 'Cairo, sans-serif' }}>PayPass Dashboard</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Badge count={notificationsCount} size="small">
          <BellOutlined 
            style={{ fontSize: 22, marginLeft: 24, color: '#1890ff', cursor: 'pointer' }} 
            onClick={onNotificationsClick}
          />
        </Badge>
        <LanguageSwitcher lang={lang} setLang={setLang} />
        <Button icon={<LogoutOutlined />} onClick={onLogout} style={{ marginLeft: 16 }}>
          {lang === 'ar' ? 'تسجيل خروج' : 'Logout'}
        </Button>
      </div>
    </div>
  );
};

export default TopHeader; 