import React, { useState } from 'react';
import { Card, Row, Col, Button, Badge, Dropdown, Space, Modal, List, Avatar, Typography } from 'antd';
import { 
  BellOutlined, 
  ExportOutlined, 
  UserOutlined, 
  DownOutlined,
  FileTextOutlined,
  WifiOutlined,
  CheckCircleOutlined,
  MoonOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  QrcodeOutlined,
  StarOutlined,
  DownloadOutlined,
  UserSwitchOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useSafeTranslation } from '../../utils/useSafeTranslation';
import { useRole } from '../../context/RoleContext';
import { useLanguage } from '../../context/LanguageContext';

const { Text, Paragraph, Title } = Typography;

const DashboardHeader = () => {
  const { t } = useSafeTranslation();
  const { lang } = useLanguage();
  const { currentRole, setCurrentRole } = useRole();
  const [notifVisible, setNotifVisible] = useState(false);

  const notifications = [
    { id: 1, type: 'order', message: t('new_order') + ' رقم 1234 ' + t('pending'), time: t('today') },
    { id: 2, type: 'maintenance', message: t('maintenance') + ' مطلوبة للسيارة رقم 5678', time: t('today') },
    { id: 3, type: 'qr', message: t('qr_codes') + ' انتهاء صلاحية للعميل علي محمود', time: t('today') },
    { id: 4, type: 'rating', message: t('new_rating') + ' من عميل: 5 ' + t('stars'), time: t('today') },
  ];

  const roleNames = {
    admin: t('admin'),
    laundry: t('laundry'),
    employee: t('employee'),
    customer: t('customer')
  };

  const roleMenuItems = [
    { key: 'admin', label: t('admin') },
    { key: 'laundry', label: t('laundry') },
    { key: 'employee', label: t('employee') },
    { key: 'customer', label: t('customer') },
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ margin: 0, color: '#262626' }}>
            {t('dashboard')}
          </Title>
          <Text type="secondary">
            {t('welcome_message')}
          </Text>
        </Col>
        <Col>
          <Space>
            <Button icon={<DownloadOutlined />} onClick={() => alert(t('export_report') + ' قريباً!')}>
              {t('export_report')}
            </Button>
            <Dropdown
              menu={{
                items: roleMenuItems,
                onClick: ({ key }) => setCurrentRole(key)
              }}
              placement="bottomRight"
            >
              <Button type="primary" icon={<UserSwitchOutlined />}>
                {roleNames[currentRole]}
              </Button>
            </Dropdown>
            <Badge count={notifications.length} offset={[-2, 2]}>
              <Button
                icon={<BellOutlined style={{ fontSize: 22 }} />}
                shape="circle"
                onClick={() => setNotifVisible(v => !v)}
                style={{ 
                  background: notifVisible ? '#e6f7ff' : '#fff', 
                  border: 'none', 
                  boxShadow: notifVisible ? '0 0 0 2px #1890ff33' : undefined 
                }}
              />
            </Badge>
          </Space>
        </Col>
      </Row>
      
      {/* مركز الإشعارات */}
      {notifVisible && (
        <div style={{
          position: 'absolute',
          top: 80,
          left: lang === 'ar' ? 32 : 'unset',
          right: lang === 'ar' ? 'unset' : 32,
          zIndex: 1000,
          width: 340,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          border: '1px solid #f0f0f0',
          padding: 0
        }}>
          <div style={{ 
            padding: '16px 20px', 
            borderBottom: '1px solid #f0f0f0', 
            fontWeight: 700, 
            fontSize: 16 
          }}>
            {t('notifications')}
            <Button 
              size="small" 
              type="text" 
              style={{ float: 'left' }} 
              onClick={() => setNotifVisible(false)}
            >
              {t('close')}
            </Button>
          </div>
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#aaa' }}>
                {t('no_notifications')}
              </div>
            ) : notifications.map(n => (
              <div 
                key={n.id} 
                style={{ 
                  padding: '14px 20px', 
                  borderBottom: '1px solid #f0f0f0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12 
                }}
              >
                <span style={{ fontSize: 20, color: '#1890ff' }}>
                  {n.type === 'order' && <ShoppingCartOutlined />}
                  {n.type === 'maintenance' && <SettingOutlined />}
                  {n.type === 'qr' && <UserOutlined />}
                  {n.type === 'rating' && <StarOutlined />}
                </span>
                <span style={{ flex: 1 }}>{n.message}</span>
                <span style={{ fontSize: 12, color: '#888' }}>{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader; 