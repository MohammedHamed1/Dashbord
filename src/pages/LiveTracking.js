import React, { useState } from 'react';
import { Card, Tabs, Typography, Row, Col, Statistic, Space } from 'antd';
import { 
  ThunderboltOutlined, 
  UserOutlined, 
  EnvironmentOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import InteractiveMap from '../components/InteractiveMap';
import LiveOperationsTracking from '../components/LiveOperationsTracking';
import EmployeeLiveTracking from '../components/EmployeeLiveTracking';
import CrossCheckProvider from '../components/CrossCheck/CrossCheckProvider';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const { Title, Text } = Typography;

const LiveTracking = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('live-tracking');

  // إحصائيات وهمية للتتبع المباشر
  const trackingStats = {
    totalOperations: 15,
    activeOperations: 8,
    completedToday: 12,
    totalEmployees: 6,
    activeEmployees: 4,
    totalBranches: 3,
    activeBranches: 3
  };

  return (
    <div className="live-tracking-page">
      <div className="page-header">
        <h1>التتبع المباشر</h1>
        <p>مراقبة العمليات والموظفين في الوقت الفعلي</p>
      </div>

      {/* مكون فحص التتبع المباشر */}
      <CrossCheckProvider 
        sectionName="live-tracking" 
        position="top"
      />

      {/* إحصائيات سريعة */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic
              title="العمليات الجارية"
              value={trackingStats.activeOperations}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic
              title="مكتمل اليوم"
              value={trackingStats.completedToday}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic
              title="الموظفين النشطين"
              value={trackingStats.activeEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="stat-card">
            <Statistic
              title="المغاسل النشطة"
              value={trackingStats.activeBranches}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* التبويبات الرئيسية */}
      <Card className="page-card">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'live-tracking',
              label: (
                <Space>
                  <ThunderboltOutlined />
                  <span>التتبع المباشر للعمليات</span>
                </Space>
              ),
              children: <LiveOperationsTracking />
            },
            {
              key: 'employee-tracking',
              label: (
                <Space>
                  <UserOutlined />
                  <span>تتبع الموظفين</span>
                </Space>
              ),
              children: <EmployeeLiveTracking />
            },
            {
              key: 'map',
              label: (
                <Space>
                  <EnvironmentOutlined />
                  <span>خريطة المغاسل</span>
                </Space>
              ),
              children: <InteractiveMap />
            }
          ]}
        />
      </Card>

      {/* معلومات إضافية */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card 
            title="معلومات النظام" 
            className="info-card"
            size="small"
          >
            <div style={{ lineHeight: 2 }}>
              <Text type="secondary">
                <ClockCircleOutlined style={{ marginLeft: 4 }} />
                آخر تحديث: {new Date().toLocaleTimeString('ar-SA')}
              </Text>
              <br />
              <Text type="secondary">
                <ThunderboltOutlined style={{ marginLeft: 4 }} />
                التحديث التلقائي: مفعل
              </Text>
              <br />
              <Text type="secondary">
                <CheckCircleOutlined style={{ marginLeft: 4 }} />
                حالة الاتصال: متصل
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card 
            title="إرشادات سريعة" 
            className="info-card"
            size="small"
          >
            <div style={{ lineHeight: 2 }}>
              <Text type="secondary">
                • انقر على أي عملية لعرض التفاصيل
              </Text>
              <br />
              <Text type="secondary">
                • استخدم الأزرار للتحكم في العمليات
              </Text>
              <br />
              <Text type="secondary">
                • يمكنك إيقاف التحديث التلقائي في أي وقت
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LiveTracking; 