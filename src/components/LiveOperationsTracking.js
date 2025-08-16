import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Tag, Progress, List, Avatar, Button, Modal, Descriptions, Timeline } from 'antd';
import { 
  SyncOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  UserOutlined, 
  CarOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './LiveOperationsTracking.css';

const { Title, Text } = Typography;

const LiveOperationsTracking = () => {
  const { t } = useTranslation();
  const [operations, setOperations] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // بيانات وهمية للعمليات الجارية
  const mockOperations = [
    {
      id: 1,
      orderId: '1234',
      customerName: 'علي محمود',
      customerPhone: '+966505678901',
      carBrand: 'تويوتا',
      carModel: 'كامري',
      plateNumber: 'أ ب ج 1234',
      serviceType: 'غسيل شامل',
      price: 80,
      status: 'processing',
      progress: 65,
      startTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      estimatedEndTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      employeeName: 'محمد حسن',
      employeeId: 'EMP001',
      branchName: 'الفرع الرئيسي',
      currentStep: 'التلميع',
      steps: [
        { name: 'الغسيل الخارجي', completed: true, time: '10:30' },
        { name: 'الغسيل الداخلي', completed: true, time: '10:45' },
        { name: 'التجفيف', completed: true, time: '11:00' },
        { name: 'التلميع', completed: false, time: '11:15' },
        { name: 'التشميع', completed: false, time: '11:30' },
        { name: 'التعطير', completed: false, time: '11:45' }
      ],
      notes: 'العميل يفضل التلميع اليدوي',
      priority: 'normal'
    },
    {
      id: 2,
      orderId: '1235',
      customerName: 'نور الدين',
      customerPhone: '+966506789012',
      carBrand: 'نيسان',
      carModel: 'باترول',
      plateNumber: 'د ه و 5678',
      serviceType: 'غسيل فاخر',
      price: 120,
      status: 'processing',
      progress: 35,
      startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      estimatedEndTime: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
      employeeName: 'أحمد علي',
      employeeId: 'EMP002',
      branchName: 'فرع الرياض',
      currentStep: 'الغسيل الداخلي',
      steps: [
        { name: 'الغسيل الخارجي', completed: true, time: '11:00' },
        { name: 'الغسيل الداخلي', completed: false, time: '11:15' },
        { name: 'التجفيف', completed: false, time: '11:30' },
        { name: 'التلميع', completed: false, time: '11:45' },
        { name: 'التشميع', completed: false, time: '12:00' },
        { name: 'التعطير', completed: false, time: '12:15' }
      ],
      notes: 'سيارة كبيرة تحتاج عناية خاصة',
      priority: 'high'
    },
    {
      id: 3,
      orderId: '1236',
      customerName: 'فاطمة أحمد',
      customerPhone: '+966507890123',
      carBrand: 'هوندا',
      carModel: 'أكورد',
      plateNumber: 'ز ح ط 9012',
      serviceType: 'غسيل أساسي',
      price: 50,
      status: 'pending',
      progress: 0,
      startTime: null,
      estimatedEndTime: null,
      employeeName: 'سارة محمد',
      employeeId: 'EMP003',
      branchName: 'الفرع الرئيسي',
      currentStep: 'في الانتظار',
      steps: [
        { name: 'الغسيل الخارجي', completed: false, time: null },
        { name: 'التجفيف', completed: false, time: null },
        { name: 'التعطير', completed: false, time: null }
      ],
      notes: 'العميل في الطريق',
      priority: 'normal'
    }
  ];

  useEffect(() => {
    setOperations(mockOperations);

    // محاكاة التحديث التلقائي
    if (autoRefresh) {
      const interval = setInterval(() => {
        setOperations(prev => prev.map(op => {
          if (op.status === 'processing') {
            const newProgress = Math.min(op.progress + Math.random() * 5, 100);
            const newStatus = newProgress >= 100 ? 'completed' : op.status;
            return {
              ...op,
              progress: newProgress,
              status: newStatus,
              currentStep: newProgress >= 100 ? 'مكتمل' : op.currentStep
            };
          }
          return op;
        }));
      }, 5000); // تحديث كل 5 ثواني

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'normal': return 'blue';
      default: return 'default';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'normal': return 'عادية';
      default: return 'غير محدد';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'غير محدد';
    const date = new Date(timeString);
    return date.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getRemainingTime = (estimatedEndTime) => {
    if (!estimatedEndTime) return 'غير محدد';
    const now = new Date();
    const end = new Date(estimatedEndTime);
    const diff = Math.max(0, end - now);
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} دقيقة`;
  };

  const showOperationDetails = (operation) => {
    setSelectedOperation(operation);
    setDetailModalVisible(true);
  };

  const startOperation = (operationId) => {
    setOperations(prev => prev.map(op => 
      op.id === operationId 
        ? { ...op, status: 'processing', startTime: new Date().toISOString() }
        : op
    ));
  };

  const pauseOperation = (operationId) => {
    setOperations(prev => prev.map(op => 
      op.id === operationId 
        ? { ...op, status: 'pending' }
        : op
    ));
  };

  const completeOperation = (operationId) => {
    setOperations(prev => prev.map(op => 
      op.id === operationId 
        ? { ...op, status: 'completed', progress: 100, currentStep: 'مكتمل' }
        : op
    ));
  };

  const stats = {
    total: operations.length,
    processing: operations.filter(op => op.status === 'processing').length,
    pending: operations.filter(op => op.status === 'pending').length,
    completed: operations.filter(op => op.status === 'completed').length
  };

  return (
    <div className="live-operations-tracking">
      <Card 
        title={
          <Space>
            <ThunderboltOutlined />
            <span>التتبع المباشر للعمليات</span>
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
            <Tag color="blue">{stats.processing} جارية</Tag>
            <Tag color="orange">{stats.pending} في الانتظار</Tag>
            <Tag color="green">{stats.completed} مكتملة</Tag>
          </Space>
        }
        className="tracking-card"
      >
        <List
          dataSource={operations}
          renderItem={(operation) => (
            <List.Item className="operation-item">
              <List.Item.Meta
                avatar={
                  <Avatar 
                    style={{ backgroundColor: getStatusColor(operation.status) }}
                    icon={<CarOutlined />}
                  />
                }
                title={
                  <Space>
                    <Text strong>طلب #{operation.orderId}</Text>
                    <Tag color={getStatusColor(operation.status)}>
                      {getStatusText(operation.status)}
                    </Tag>
                    <Tag color={getPriorityColor(operation.priority)}>
                      {getPriorityText(operation.priority)}
                    </Tag>
                  </Space>
                }
                description={
                  <div>
                    <Text type="secondary">
                      <UserOutlined /> {operation.customerName} - {operation.customerPhone}
                    </Text>
                    <br />
                    <Text type="secondary">
                      <CarOutlined /> {operation.carBrand} {operation.carModel} - {operation.plateNumber}
                    </Text>
                    <br />
                    <Text type="secondary">
                      الخدمة: {operation.serviceType} - {operation.price} ريال
                    </Text>
                    <br />
                    <Text type="secondary">
                      الموظف: {operation.employeeName} - {operation.branchName}
                    </Text>
                  </div>
                }
              />
              
              <div className="operation-progress">
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary">التقدم: {operation.progress}%</Text>
                </div>
                <Progress 
                  percent={operation.progress} 
                  size="small" 
                  status={operation.status === 'completed' ? 'success' : 'active'}
                  strokeColor={getStatusColor(operation.status)}
                />
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">الخطوة الحالية: {operation.currentStep}</Text>
                </div>
                {operation.status === 'processing' && (
                  <div style={{ marginTop: 4 }}>
                    <Text type="secondary">
                      الوقت المتبقي: {getRemainingTime(operation.estimatedEndTime)}
                    </Text>
                  </div>
                )}
              </div>

              <div className="operation-actions">
                <Space>
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />}
                    onClick={() => showOperationDetails(operation)}
                  >
                    تفاصيل
                  </Button>
                  
                  {operation.status === 'pending' && (
                    <Button 
                      type="primary" 
                      size="small"
                      icon={<PlayCircleOutlined />}
                      onClick={() => startOperation(operation.id)}
                    >
                      بدء
                    </Button>
                  )}
                  
                  {operation.status === 'processing' && (
                    <>
                      <Button 
                        type="default" 
                        size="small"
                        icon={<PauseCircleOutlined />}
                        onClick={() => pauseOperation(operation.id)}
                      >
                        إيقاف
                      </Button>
                      <Button 
                        type="primary" 
                        size="small"
                        icon={<CheckCircleOutlined />}
                        onClick={() => completeOperation(operation.id)}
                      >
                        إكمال
                      </Button>
                    </>
                  )}
                </Space>
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* نافذة تفاصيل العملية */}
      <Modal
        title={
          <Space>
            <CarOutlined />
            <span>تفاصيل العملية</span>
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
        {selectedOperation && (
          <div>
            <Descriptions title="معلومات العملية" bordered>
              <Descriptions.Item label="رقم الطلب" span={2}>
                #{selectedOperation.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="الحالة">
                <Tag color={getStatusColor(selectedOperation.status)}>
                  {getStatusText(selectedOperation.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="اسم العميل" span={2}>
                {selectedOperation.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الهاتف">
                {selectedOperation.customerPhone}
              </Descriptions.Item>
              <Descriptions.Item label="السيارة" span={3}>
                {selectedOperation.carBrand} {selectedOperation.carModel} - {selectedOperation.plateNumber}
              </Descriptions.Item>
              <Descriptions.Item label="الخدمة" span={2}>
                {selectedOperation.serviceType}
              </Descriptions.Item>
              <Descriptions.Item label="السعر">
                {selectedOperation.price} ريال
              </Descriptions.Item>
              <Descriptions.Item label="الموظف المسؤول" span={2}>
                {selectedOperation.employeeName}
              </Descriptions.Item>
              <Descriptions.Item label="الفرع">
                {selectedOperation.branchName}
              </Descriptions.Item>
              <Descriptions.Item label="وقت البدء" span={2}>
                {formatTime(selectedOperation.startTime)}
              </Descriptions.Item>
              <Descriptions.Item label="الوقت المتبقي">
                {getRemainingTime(selectedOperation.estimatedEndTime)}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 24 }}>
              <Title level={5}>مراحل العملية</Title>
              <Timeline>
                {selectedOperation.steps.map((step, index) => (
                  <Timeline.Item
                    key={index}
                    color={step.completed ? 'green' : 'blue'}
                    dot={step.completed ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                  >
                    <div>
                      <Text strong>{step.name}</Text>
                      {step.time && (
                        <Text type="secondary" style={{ marginRight: 8 }}>
                          - {step.time}
                        </Text>
                      )}
                      {step.completed && (
                        <Tag color="green" size="small">مكتمل</Tag>
                      )}
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>

            {selectedOperation.notes && (
              <div style={{ marginTop: 24 }}>
                <Title level={5}>ملاحظات</Title>
                <Text type="secondary">{selectedOperation.notes}</Text>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LiveOperationsTracking; 