import React, { useState, useEffect } from 'react';
import { Card, Typography, Badge, Tag, Space, Button, Modal, Descriptions, List, Avatar } from 'antd';
import { 
  EnvironmentOutlined, 
  CarOutlined, 
  UserOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  EyeOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './InteractiveMap.css';

const { Title, Text } = Typography;

const InteractiveMap = ({ laundries = [], operations = [] }) => {
  const { t } = useTranslation();
  const [selectedLaundry, setSelectedLaundry] = useState(null);
  const [mapModalVisible, setMapModalVisible] = useState(false);

  // المغاسل الحقيقية مع الخرائط الصحيحة
  const realLaundries = [
    {
      id: 1,
      name: 'مغسلة النظافة الذكية - الفرع الأول',
      address: 'الرياض، المملكة العربية السعودية',
      lat: 24.7136,
      lng: 46.6753,
      status: 'active',
      currentOperations: 8,
      totalOperations: 15,
      employees: 12,
      rating: 4.9,
      revenue: 65000,
      lastActivity: '2024-03-03T16:30:00Z',
      googleMapsUrl: 'https://maps.app.goo.gl/hD3KYnFEgx9pEXBu6?g_st=iw',
      phone: '+966-11-123-4567',
      workingHours: '24/7',
      services: ['غسيل شامل', 'غسيل داخلي', 'غسيل محرك', 'تلميع']
    },
    {
      id: 2,
      name: 'مغسلة النظافة الذكية - الفرع الثاني',
      address: 'الرياض، المملكة العربية السعودية',
      lat: 24.7236,
      lng: 46.6853,
      status: 'active',
      currentOperations: 6,
      totalOperations: 12,
      employees: 10,
      rating: 4.7,
      revenue: 52000,
      lastActivity: '2024-03-03T15:45:00Z',
      googleMapsUrl: 'https://maps.app.goo.gl/khhqHgaRFZXqELYTA?g_st=iw',
      phone: '+966-11-123-4568',
      workingHours: '24/7',
      services: ['غسيل شامل', 'غسيل داخلي', 'غسيل محرك', 'تلميع', 'معطر']
    },
    {
      id: 3,
      name: 'مغسلة النظافة الذكية - الفرع الثالث',
      address: 'الرياض، المملكة العربية السعودية',
      lat: 24.7336,
      lng: 46.6953,
      status: 'active',
      currentOperations: 4,
      totalOperations: 10,
      employees: 8,
      rating: 4.8,
      revenue: 48000,
      lastActivity: '2024-03-03T14:20:00Z',
      googleMapsUrl: 'https://maps.app.goo.gl/uB82K6Tj8jsPmXFeA?g_st=iw',
      phone: '+966-11-123-4569',
      workingHours: '24/7',
      services: ['غسيل شامل', 'غسيل داخلي', 'غسيل محرك']
    },
    {
      id: 4,
      name: 'مغسلة النظافة الذكية - الفرع الرابع',
      address: 'الرياض، المملكة العربية السعودية',
      lat: 24.7436,
      lng: 46.7053,
      status: 'active',
      currentOperations: 5,
      totalOperations: 11,
      employees: 9,
      rating: 4.6,
      revenue: 45000,
      lastActivity: '2024-03-03T13:15:00Z',
      googleMapsUrl: 'https://maps.app.goo.gl/VY5rRk7oLZ2YpSmb7?g_st=iw',
      phone: '+966-11-123-4570',
      workingHours: '24/7',
      services: ['غسيل شامل', 'غسيل داخلي', 'غسيل محرك', 'تلميع', 'معطر', 'شمع']
    }
  ];

  // إضافة console.log للتأكد من أن البيانات موجودة
  useEffect(() => {
    console.log('InteractiveMap loaded with realLaundries:', realLaundries);
    console.log('Number of laundries:', realLaundries.length);
    console.log('First laundry:', realLaundries[0]);
  }, []);

  // التحقق من أن المكون يتم تحميله
  console.log('InteractiveMap component rendering...');
  console.log('realLaundries length:', realLaundries.length);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#52c41a';
      case 'busy': return '#faad14';
      case 'maintenance': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'busy': return 'مشغول';
      case 'maintenance': return 'صيانة';
      default: return 'غير متاح';
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `قبل ${diffInMinutes} دقيقة`;
    if (diffInMinutes < 1440) return `قبل ${Math.floor(diffInMinutes / 60)} ساعة`;
    return `قبل ${Math.floor(diffInMinutes / 1440)} يوم`;
  };

  const showLaundryDetails = (laundry) => {
    console.log('Showing details for laundry:', laundry);
    setSelectedLaundry(laundry);
    setMapModalVisible(true);
  };

  const openGoogleMaps = (url) => {
    console.log('Opening Google Maps URL:', url);
    window.open(url, '_blank');
  };

  const callPhone = (phoneNumber) => {
    console.log('Calling phone number:', phoneNumber);
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div className="interactive-map-container">
      <Card 
        title={
          <Space>
            <EnvironmentOutlined />
            <span>خريطة المغاسل الحقيقية ({realLaundries.length} مغسلة)</span>
          </Space>
        }
        extra={
          <Space>
            <Badge count={realLaundries.filter(l => l.status === 'active').length} showZero>
              <Tag color="green">نشط</Tag>
            </Badge>
            <Badge count={realLaundries.filter(l => l.status === 'busy').length} showZero>
              <Tag color="orange">مشغول</Tag>
            </Badge>
            <Badge count={realLaundries.filter(l => l.status === 'maintenance').length} showZero>
              <Tag color="red">صيانة</Tag>
            </Badge>
          </Space>
        }
        className="map-card"
      >
        {/* خريطة المغاسل الحقيقية */}
        <div className="map-simulation">
          <div className="map-background">
            {realLaundries.map((laundry, index) => {
              console.log(`Rendering laundry ${laundry.id}:`, laundry.name);
              return (
                <div
                  key={laundry.id}
                  className="map-marker"
                  data-status={laundry.status}
                  style={{
                    left: `${15 + (index * 20)}%`,
                    top: `${25 + (index * 15)}%`,
                    backgroundColor: getStatusColor(laundry.status)
                  }}
                  onClick={() => showLaundryDetails(laundry)}
                >
                  <div className="marker-content">
                    <CarOutlined />
                    <div className="marker-info">
                      <Text strong>{laundry.currentOperations}</Text>
                      <Text type="secondary">عمليات</Text>
                    </div>
                  </div>
                  <div className="marker-tooltip">
                    <Text strong>{laundry.name}</Text>
                    <br />
                    <Text type="secondary">{laundry.address}</Text>
                    <br />
                    <Tag color={getStatusColor(laundry.status)} size="small">
                      {getStatusText(laundry.status)}
                    </Tag>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* قائمة المغاسل الحقيقية */}
        <div className="laundries-list">
          <Title level={5}>المغاسل الحقيقية النشطة ({realLaundries.length})</Title>
          <List
            dataSource={realLaundries}
            renderItem={(laundry) => (
              <List.Item
                className="laundry-item"
                onClick={() => showLaundryDetails(laundry)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      style={{ backgroundColor: getStatusColor(laundry.status) }}
                      icon={<EnvironmentOutlined />}
                    />
                  }
                  title={
                    <Space>
                      <Text strong>{laundry.name}</Text>
                      <Tag color={getStatusColor(laundry.status)} size="small">
                        {getStatusText(laundry.status)}
                      </Tag>
                    </Space>
                  }
                  description={
                    <div>
                      <Text type="secondary">{laundry.address}</Text>
                      <br />
                      <Space size="small">
                        <Text type="secondary">
                          <CarOutlined /> {laundry.currentOperations} عمليات جارية
                        </Text>
                        <Text type="secondary">
                          <UserOutlined /> {laundry.employees} موظفين
                        </Text>
                        <Text type="secondary">
                          <ClockCircleOutlined /> {formatTime(laundry.lastActivity)}
                        </Text>
                        <Text type="secondary">
                          <PhoneOutlined /> {laundry.phone}
                        </Text>
                      </Space>
                    </div>
                  }
                />
                <div className="laundry-stats">
                  <div className="stat-item">
                    <Text strong style={{ color: '#1890ff' }}>
                      {laundry.currentOperations}/{laundry.totalOperations}
                    </Text>
                    <Text type="secondary">عمليات</Text>
                  </div>
                  <div className="stat-item">
                    <Text strong style={{ color: '#52c41a' }}>
                      {laundry.rating}/5
                    </Text>
                    <Text type="secondary">تقييم</Text>
                  </div>
                  <div className="stat-item">
                    <Text strong style={{ color: '#faad14' }}>
                      {laundry.revenue.toLocaleString()}
                    </Text>
                    <Text type="secondary">ريال</Text>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Card>

      {/* نافذة تفاصيل المغسلة */}
      <Modal
        title={
          <Space>
            <EnvironmentOutlined />
            <span>تفاصيل المغسلة الحقيقية</span>
          </Space>
        }
        open={mapModalVisible}
        onCancel={() => setMapModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setMapModalVisible(false)}>
            إغلاق
          </Button>,
          <Button 
            key="call" 
            type="primary" 
            icon={<PhoneOutlined />}
            onClick={() => selectedLaundry && callPhone(selectedLaundry.phone)}
          >
            اتصال
          </Button>,
          <Button 
            key="maps" 
            type="primary" 
            icon={<EnvironmentOutlined />}
            onClick={() => selectedLaundry && openGoogleMaps(selectedLaundry.googleMapsUrl)}
          >
            فتح في الخرائط
          </Button>,
          <Button key="view" type="primary" icon={<EyeOutlined />}>
            عرض العمليات
          </Button>
        ]}
        width={800}
      >
        {selectedLaundry && (
          <div>
            <Descriptions title="معلومات المغسلة الحقيقية" bordered>
              <Descriptions.Item label="اسم المغسلة" span={3}>
                {selectedLaundry.name}
              </Descriptions.Item>
              <Descriptions.Item label="العنوان" span={3}>
                {selectedLaundry.address}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الهاتف">
                {selectedLaundry.phone}
              </Descriptions.Item>
              <Descriptions.Item label="ساعات العمل">
                {selectedLaundry.workingHours}
              </Descriptions.Item>
              <Descriptions.Item label="الحالة">
                <Tag color={getStatusColor(selectedLaundry.status)}>
                  {getStatusText(selectedLaundry.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="العمليات الجارية">
                {selectedLaundry.currentOperations} / {selectedLaundry.totalOperations}
              </Descriptions.Item>
              <Descriptions.Item label="الموظفين">
                {selectedLaundry.employees}
              </Descriptions.Item>
              <Descriptions.Item label="التقييم">
                {selectedLaundry.rating}/5
              </Descriptions.Item>
              <Descriptions.Item label="الإيرادات الشهرية">
                {selectedLaundry.revenue.toLocaleString()} ريال
              </Descriptions.Item>
              <Descriptions.Item label="آخر نشاط">
                {formatTime(selectedLaundry.lastActivity)}
              </Descriptions.Item>
              <Descriptions.Item label="الخدمات المتوفرة" span={3}>
                <Space wrap>
                  {selectedLaundry.services.map((service, index) => (
                    <Tag key={index} color="blue">{service}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="رابط الخرائط الحقيقي" span={3}>
                <Button 
                  type="link" 
                  onClick={() => openGoogleMaps(selectedLaundry.googleMapsUrl)}
                  icon={<EnvironmentOutlined />}
                >
                  فتح في Google Maps
                </Button>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Title level={5}>العمليات الجارية</Title>
              <List
                size="small"
                dataSource={Array.from({ length: selectedLaundry.currentOperations }, (_, i) => ({
                  id: i + 1,
                  customerName: `عميل ${i + 1}`,
                  service: 'غسيل شامل',
                  startTime: new Date(Date.now() - (i * 30 * 60 * 1000)).toISOString(),
                  estimatedEnd: new Date(Date.now() + ((3 - i) * 30 * 60 * 1000)).toISOString(),
                  employee: `موظف ${i + 1}`,
                  progress: 30 + (i * 20)
                }))}
                renderItem={(operation) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<CarOutlined />} />}
                      title={`عملية #${operation.id} - ${operation.customerName}`}
                      description={
                        <div>
                          <Text type="secondary">{operation.service}</Text>
                          <br />
                          <Text type="secondary">الموظف: {operation.employee}</Text>
                        </div>
                      }
                    />
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ marginBottom: 8 }}>
                        <Text type="secondary">التقدم: {operation.progress}%</Text>
                      </div>
                      <div style={{ 
                        width: 100, 
                        height: 6, 
                        backgroundColor: '#f0f0f0', 
                        borderRadius: 3,
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${operation.progress}%`,
                          height: '100%',
                          backgroundColor: '#1890ff',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InteractiveMap; 