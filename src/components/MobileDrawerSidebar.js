import React from 'react';
import { Drawer, Menu } from 'antd';
import { useSafeNavigate } from '../utils/safeHooks';
import { useRole } from '../context/RoleContext';
import {
  DashboardOutlined, UserOutlined, ShoppingCartOutlined, GiftOutlined, CarOutlined, DollarOutlined, BellOutlined, BarChartOutlined, HeartOutlined, ShoppingOutlined, SettingOutlined, AppstoreOutlined, RobotOutlined, MessageOutlined
} from '@ant-design/icons';

const getMenuItems = (currentRole) => [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'نظرة عامة', roles: ['admin', 'laundry', 'employee', 'user'] },
  { key: 'users', icon: <UserOutlined />, label: 'المستخدمون', roles: ['admin', 'laundry'] },
  { key: 'orders', icon: <ShoppingCartOutlined />, label: 'الطلبات', roles: ['admin', 'laundry', 'employee'] },
  { key: 'packages', icon: <GiftOutlined />, label: 'الباقات', roles: ['admin', 'laundry'] },
  { key: 'cars', icon: <CarOutlined />, label: 'السيارات والفئات', roles: ['admin', 'laundry', 'user'] },
  { key: 'financial', icon: <DollarOutlined />, label: 'النظام المالي', roles: ['admin', 'laundry'] },
  { key: 'notifications', icon: <BellOutlined />, label: 'الإشعارات', roles: ['admin', 'laundry', 'employee'] },
  { key: 'reports', icon: <BarChartOutlined />, label: 'التقارير', roles: ['admin'] },
  { key: 'loyalty', icon: <HeartOutlined />, label: 'برامج الولاء', roles: ['admin'] },
  { key: 'marketing', icon: <ShoppingOutlined />, label: 'التسويق والمبيعات', roles: ['admin'] },
  { key: 'website', icon: <SettingOutlined />, label: 'إدارة الموقع', roles: ['admin'] },
  { key: 'apps', icon: <AppstoreOutlined />, label: 'إدارة التطبيقات', roles: ['admin'] },
  { key: 'ai-assistant', icon: <RobotOutlined />, label: 'المساعد الذكي', roles: ['admin'] },
  { key: 'whatsapp', icon: <MessageOutlined />, label: 'تكامل WhatsApp', roles: ['admin'] },
];

const MobileDrawerSidebar = ({ visible, onClose, onNavigate }) => {
  const { currentRole } = useRole();
  const navigate = useSafeNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === 'dashboard') {
      navigate('/');
    } else {
      navigate(`/${key}`);
    }
    if (onNavigate) onNavigate(key);
    onClose();
  };

  return (
    <Drawer placement="right" onClose={onClose} open={visible} width={260}>
      <Menu
        mode="inline"
        items={getMenuItems(currentRole).filter(item => item.roles.includes(currentRole))}
        onClick={handleMenuClick}
        style={{ fontSize: 16, fontWeight: 500 }}
      />
    </Drawer>
  );
};

export default MobileDrawerSidebar; 