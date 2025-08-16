import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Tag, Progress, List, Avatar, Button, Modal, Descriptions, Row, Col, Statistic } from 'antd';
import { 
  UserOutlined, 
  CarOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  EyeOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
  StarOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './EmployeeLiveTracking.css';

const { Title, Text } = Typography;

const EmployeeLiveTracking = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // بيانات وهمية للموظفين
  const mockEmployees = [
    {
      id: 1,
      name: 'محمد حسن',
      employeeId: 'EMP001',
      phone: '+966505123456',
      email: 'mohammed@carlaundry.com',
      position: 'مغسل سيارات',
      status: 'active',
      location: 'الفرع الرئيسي',
      currentOperation: {
        orderId: '1234',
        customerName: 'علي محمود',
        carBrand: 'تويوتا',
        carModel: 'كامري',
        progress: 65,
        startTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        estimatedEnd: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      },
      performance: {
        completedToday: 8,
        totalCompleted: 156,
        averageRating: 4.8,
        efficiency: 92,
        onTimeRate: 95
      },
      schedule: {
        shift: 'صباحي',
        startTime: '08:00',
        endTime: '16:00',
        breakTime: '12:00-12:30'
      },
      skills: ['غسيل خارجي', 'غسيل داخلي', 'تلميع', 'تشميع'],
      lastActivity: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      name: 'أحمد علي',
      employeeId: 'EMP002',
      phone: '+966505234567',
      email: 'ahmed@carlaundry.com',
      position: 'مغسل سيارات',
      status: 'active',
      location: 'فرع الرياض',
      currentOperation: {
        orderId: '1235',
        customerName: 'نور الدين',
        carBrand: 'نيسان',
        carModel: 'باترول',
        progress: 35,
        startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        estimatedEnd: new Date(Date.now() + 35 * 60 * 1000).toISOString()
      },
      performance: {
        completedToday: 6,
        totalCompleted: 142,
        averageRating: 4.6,
        efficiency: 88,
        onTimeRate: 92
      },
      schedule: {
        shift: 'مسائي',
        startTime: '16:00',
        endTime: '00:00',
        breakTime: '20:00-20:30'
      },
      skills: ['غسيل خارجي', 'غسيل داخلي', 'تلميع'],
      lastActivity: new Date(Date.now() - 1 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      name: 'سارة محمد',
      employeeId: 'EMP003',
      phone: '+966505345678',
      email: 'sara@carlaundry.com',
      position: 'مغسلة سيارات',
      status: 'break',
      location: 'الفرع الرئيسي',
      currentOperation: null,
      performance: {
        completedToday: 5,
        totalCompleted: 98,
        averageRating: 4.9,
        efficiency: 95,
        onTimeRate: 98
      },
      schedule: {
        shift: 'صباحي',
        startTime: '08:00',
        endTime: '16:00',
        breakTime: '12:00-12:30'
      },
      skills: ['غسيل خارجي', 'غسيل داخلي', 'تلميع', 'تشميع', 'تعطير'],
      lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      name: 'علي محمود',
      employeeId: 'EMP004',
      phone: '+966505456789',
      email: 'ali@carlaundry.com',
      position: 'مغسل سيارات',
      status: 'offline',
      location: 'فرع الخبر',
      currentOperation: null,
      performance: {
        completedToday: 0,
        totalCompleted: 89,
        averageRating: 4.4,
        efficiency: 85,
        onTimeRate: 88
      },
      schedule: {
        shift: 'مسائي',
        startTime: '16:00',
        endTime: '00:00',
        breakTime: '20:00-20:30'
      },
      skills: ['غسيل خارجي', 'غسيل داخلي'],
      lastActivity: new Date(Date.now() - 120 * 60 * 1000).toISOString()
    }
  ];

  useEffect(() => {
    setEmployees(mockEmployees);

    // محاكاة التحديث التلقائي
    if (autoRefresh) {
      const interval = setInterval(() => {
        setEmployees(prev => prev.map(emp => {
          if (emp.status === 'active' && emp.currentOperation) {
            const newProgress = Math.min(emp.currentOperation.progress + Math.random() * 3, 100);
            return {
              ...emp,
              currentOperation: {
                ...emp.currentOperation,
                progress: newProgress
              },
              lastActivity: new Date().toISOString()
            };
          }
          return emp;
        }));
      }, 3000); // تحديث كل 3 ثواني

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#52c41a';
      case 'break': return '#faad14';
      case 'offline': return '#ff4d4f';
      case 'busy': return '#1890ff';
      default: return '#d9d9d9';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'break': return 'استراحة';
      case 'offline': return 'غير متصل';
      case 'busy': return 'مشغول';
      default: return 'غير محدد';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircleOutlined />;
      case 'break': return <ClockCircleOutlined />;
      case 'offline': return <UserOutlined />;
      case 'busy': return <SyncOutlined spin />;
      default: return <UserOutlined />;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'غير محدد';
    const date = new Date(timeString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `قبل ${diffInMinutes} دقيقة`;
    if (diffInMinutes < 1440) return `قبل ${Math.floor(diffInMinutes / 60)} ساعة`;
    return `قبل ${Math.floor(diffInMinutes / 1440)} يوم`;
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return '#52c41a';
    if (efficiency >= 80) return '#faad14';
    return '#ff4d4f';
  };

  const showEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setDetailModalVisible(true);
  };

  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'active').length,
    break: employees.filter(emp => emp.status === 'break').length,
    offline: employees.filter(emp => emp.status === 'offline').length,
    totalCompleted: employees.reduce((sum, emp) => sum + emp.performance.completedToday, 0),
    averageRating: (employees.reduce((sum, emp) => sum + emp.performance.averageRating, 0) / employees.length).toFixed(1)
  };

  return (
    <div className="employee-live-tracking">
      <Card 
        title={
          <Space>
            <UserOutlined />
            <span>تتبع الموظفين المباشر</span>
          </Space>
        }
        extra={
          <Space>
            <Button 
              type={autoRefresh ? 'primary' : 'default'}
              icon={<SyncOutlined spin={autoRefresh} />}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? 'إيقاف التحديث' : 'تشغيل التحديث'}
            </Button>
            <Tag color="green">{stats.active} نشط</Tag>
            <Tag color="orange">{stats.break} استراحة</Tag>
            <Tag color="red">{stats.offline} غير متصل</Tag>
          </Space>
        }
        className="employee-tracking-card"
      >
        {/* إحصائيات سريعة */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="إجمالي الموظفين"
                value={stats.total}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="العمليات اليوم"
                value={stats.totalCompleted}
                prefix={<CarOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="متوسط التقييم"
                value={stats.averageRating}
                prefix={<StarOutlined />}
                suffix="/ 5"
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="الكفاءة العامة"
                value={Math.round(employees.reduce((sum, emp) => sum + emp.performance.efficiency, 0) / employees.length)}
                prefix={<TrophyOutlined />}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        <List
          dataSource={employees}
          renderItem={(employee) => (
            <List.Item className="employee-item">
              <List.Item.Meta
                avatar={
                  <Avatar 
                    size={48}
                    style={{ backgroundColor: getStatusColor(employee.status) }}
                    icon={getStatusIcon(employee.status)}
                  />
                }
                title={
                  <Space>
                    <Text strong>{employee.name}</Text>
                    <Tag color={getStatusColor(employee.status)}>
                      {getStatusText(employee.status)}
                    </Tag>
                    <Text type="secondary">#{employee.employeeId}</Text>
                  </Space>
                }
                description={
                  <div>
                    <Text type="secondary">
                      <EnvironmentOutlined /> {employee.location} - {employee.position}
                    </Text>
                    <br />
                    <Text type="secondary">
                      <PhoneOutlined /> {employee.phone}
                    </Text>
                    <br />
                    <Text type="secondary">
                      <ClockCircleOutlined /> {employee.schedule.shift} ({employee.schedule.startTime}-{employee.schedule.endTime})
                    </Text>
                    <br />
                    <Text type="secondary">
                      آخر نشاط: {formatTime(employee.lastActivity)}
                    </Text>
                  </div>
                }
              />
              
              <div className="employee-performance">
                <div className="performance-stats">
                  <div className="stat-item">
                    <Text strong style={{ color: '#1890ff' }}>
                      {employee.performance.completedToday}
                    </Text>
                    <Text type="secondary">اليوم</Text>
                  </div>
                  <div className="stat-item">
                    <Text strong style={{ color: '#52c41a' }}>
                      {employee.performance.totalCompleted}
                    </Text>
                    <Text type="secondary">إجمالي</Text>
                  </div>
                  <div className="stat-item">
                    <Text strong style={{ color: '#faad14' }}>
                      {employee.performance.averageRating}/5
                    </Text>
                    <Text type="secondary">تقييم</Text>
                  </div>
                  <div className="stat-item">
                    <Text strong style={{ color: getEfficiencyColor(employee.performance.efficiency) }}>
                      {employee.performance.efficiency}%
                    </Text>
                    <Text type="secondary">كفاءة</Text>
                  </div>
                </div>
              </div>

              <div className="employee-current-operation">
                {employee.currentOperation ? (
                  <div className="current-operation">
                    <Text strong>العملية الحالية:</Text>
                    <br />
                    <Text type="secondary">
                      طلب #{employee.currentOperation.orderId} - {employee.currentOperation.customerName}
                    </Text>
                    <br />
                    <Text type="secondary">
                      {employee.currentOperation.carBrand} {employee.currentOperation.carModel}
                    </Text>
                    <div style={{ marginTop: 8 }}>
                      <Progress 
                        percent={employee.currentOperation.progress} 
                        size="small" 
                        status="active"
                        strokeColor={getStatusColor(employee.status)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="no-operation">
                    <Text type="secondary">لا توجد عملية حالية</Text>
                  </div>
                )}
              </div>

              <div className="employee-actions">
                <Button 
                  type="primary" 
                  icon={<EyeOutlined />}
                  onClick={() => showEmployeeDetails(employee)}
                >
                  تفاصيل
                </Button>
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* نافذة تفاصيل الموظف */}
      <Modal
        title={
          <Space>
            <UserOutlined />
            <span>تفاصيل الموظف</span>
          </Space>
        }
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            إغلاق
          </Button>
        ]}
        width={800}
      >
        {selectedEmployee && (
          <div>
            <Descriptions title="معلومات الموظف" bordered>
              <Descriptions.Item label="اسم الموظف" span={2}>
                {selectedEmployee.name}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الموظف">
                #{selectedEmployee.employeeId}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الهاتف" span={2}>
                {selectedEmployee.phone}
              </Descriptions.Item>
              <Descriptions.Item label="البريد الإلكتروني">
                {selectedEmployee.email}
              </Descriptions.Item>
              <Descriptions.Item label="المنصب" span={2}>
                {selectedEmployee.position}
              </Descriptions.Item>
              <Descriptions.Item label="الموقع">
                {selectedEmployee.location}
              </Descriptions.Item>
              <Descriptions.Item label="الحالة" span={2}>
                <Tag color={getStatusColor(selectedEmployee.status)}>
                  {getStatusText(selectedEmployee.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="المناوبة">
                {selectedEmployee.schedule.shift} ({selectedEmployee.schedule.startTime}-{selectedEmployee.schedule.endTime})
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Title level={5}>الأداء والإحصائيات</Title>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Card size="small">
                    <Statistic
                      title="مكتمل اليوم"
                      value={selectedEmployee.performance.completedToday}
                      prefix={<CarOutlined />}
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic
                      title="إجمالي المكتمل"
                      value={selectedEmployee.performance.totalCompleted}
                      prefix={<CheckCircleOutlined />}
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic
                      title="متوسط التقييم"
                      value={selectedEmployee.performance.averageRating}
                      prefix={<StarOutlined />}
                      suffix="/ 5"
                      valueStyle={{ color: '#faad14' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic
                      title="معدل الكفاءة"
                      value={selectedEmployee.performance.efficiency}
                      prefix={<TrophyOutlined />}
                      suffix="%"
                      valueStyle={{ color: getEfficiencyColor(selectedEmployee.performance.efficiency) }}
                    />
                  </Card>
                </Col>
              </Row>
            </div>

            <div style={{ marginTop: 24 }}>
              <Title level={5}>المهارات</Title>
              <Space wrap>
                {selectedEmployee.skills.map((skill, index) => (
                  <Tag key={index} color="blue">{skill}</Tag>
                ))}
              </Space>
            </div>

            {selectedEmployee.currentOperation && (
              <div style={{ marginTop: 24 }}>
                <Title level={5}>العملية الحالية</Title>
                <Card size="small">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="رقم الطلب">
                      #{selectedEmployee.currentOperation.orderId}
                    </Descriptions.Item>
                    <Descriptions.Item label="اسم العميل">
                      {selectedEmployee.currentOperation.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="السيارة">
                      {selectedEmployee.currentOperation.carBrand} {selectedEmployee.currentOperation.carModel}
                    </Descriptions.Item>
                    <Descriptions.Item label="التقدم">
                      <Progress 
                        percent={selectedEmployee.currentOperation.progress} 
                        size="small" 
                        status="active"
                      />
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeLiveTracking; 