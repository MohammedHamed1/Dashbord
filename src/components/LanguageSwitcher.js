import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ size = 'middle', type = 'text', showText = true }) => {
  const { lang, toggleLanguage, isRTL } = useLanguage();
  const { i18n } = useTranslation();

  const languageItems = [
    {
      key: 'ar',
      label: (
        <Space>
          <span>🇸🇦</span>
          <span>العربية</span>
        </Space>
      ),
      onClick: () => {
        i18n.changeLanguage('ar');
        toggleLanguage();
      }
    },
    {
      key: 'en',
      label: (
        <Space>
          <span>🇺🇸</span>
          <span>English</span>
        </Space>
      ),
      onClick: () => {
        i18n.changeLanguage('en');
        toggleLanguage();
      }
    }
  ];

  const getCurrentLanguageLabel = () => {
    if (lang === 'ar') {
      return showText ? 'العربية' : '🇸🇦';
    }
    return showText ? 'English' : '🇺🇸';
  };

  return (
    <Dropdown
      menu={{
        items: languageItems,
        style: {
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left'
        }
      }}
      placement={isRTL ? "bottomLeft" : "bottomRight"}
      trigger={['click']}
    >
      <Button
        type={type}
        icon={<GlobalOutlined />}
        size={size}
        style={{
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left'
        }}
      >
        {getCurrentLanguageLabel()}
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher; 