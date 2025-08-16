import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  TimePicker, 
  Space, 
  Tag, 
  Typography, 
  Row, 
  Col, 
  Progress, 
  Statistic, 
  Alert,
  Tabs,
  List,
  Avatar,
  Badge,
  Tooltip,
  Switch,
  message,
  Divider,
  Descriptions
} from 'antd';
import InteractiveMap from '../components/InteractiveMap';
import LiveOperationsTracking from '../components/LiveOperationsTracking';
import EmployeeLiveTracking from '../components/EmployeeLiveTracking';
import { 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  StopOutlined, 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CarOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { 
  getOrders, 
  getEmployees, 
  getBranches,
  updateOrderStatus 
} from '../data/mockData';
import CrossCheckProvider from '../components/CrossCheck/CrossCheckProvider';
import './Pages.css';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Operations = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [operations, setOperations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [currentView, setCurrentView] = useState('active');

  // تحميل البيانات
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, employeesData, branchesData] = await Promise.all([
        getOrders(),
        getEmployees(),
        getBranches()
      ]);
      
      setOrders(ordersData);
      setEmployees(employeesData);
      setBranches(branchesData);
      
      // تحويل الطلبات إلى عمليات
      const operationsData = ordersData.map(order => ({
        id: order.id,
        orderId: order.id,
        customerName: order.customerName,
        carBrand: order.carBrand,
        carModel: order.carModel,
        plateNumber: order.plateNumber,
        serviceType: order.serviceType,
        serviceName: order.serviceName,
        price: order.price,
        status: order.status,
        employeeId: order.employeeId,
        employeeName: order.employeeName,
        branchId: order.branchId,
        branchName: order.branchName,
        startTime: order.createdAt,
        estimatedEndTime: new Date(new Date(order.createdAt).getTime() + 60 * 60 * 1000).toISOString(),
        actualEndTime: order.completedAt,
        priority: order.status === 'processing' ? 'high' : 'normal',
        notes: order.notes,
        photos: order.photos || [],
        currentStep: getCurrentStep(order.status),
        progress: getProgress(order.status)
      }));
      
      setOperations(operationsData);
    } catch (error) {
      message.error('فشل في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // الحصول على الخطوة الحالية
  const getCurrentStep = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'completed': return 2;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  // الحصول على نسبة التقدم
  const getProgress = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 50;
      case 'completed': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  // بدء العملية
  const startOperation = async (operationId) => {
    try {
      await updateOrderStatus(operationId, 'processing');
      message.success('تم بدء العملية بنجاح');
      loadData();
    } catch (error) {
      message.error('فشل في بدء العملية');
    }
  };

  // إيقاف العملية مؤقتاً
  const pauseOperation = async (operationId) => {
    try {
      await updateOrderStatus(operationId, 'pending');
      message.success('تم إيقاف العملية مؤقتاً');
      loadData();
    } catch (error) {
      message.error('فشل في إيقاف العملية');
    }
  };

  // إكمال العملية
  const completeOperation = async (operationId) => {
    try {
      await updateOrderStatus(operationId, 'completed');
      message.success('تم إكمال العملية بنجاح');
      loadData();
    } catch (error) {
      message.error('فشل في إكمال العملية');
    }
  };

  // إلغاء العملية
  const cancelOperation = async (operationId) => {
    try {
      await updateOrderStatus(operationId, 'cancelled');
      message.success('تم إلغاء العملية');
      loadData();
    } catch (error) {
      message.error('فشل في إلغاء العملية');
    }
  };

  // عرض تفاصيل العملية
  const showOperationDetails = (operation) => {
    setSelectedOperation(operation);
    setIsModalVisible(true);
  };

  // إحصائيات العمليات
  const getOperationStats = () => {
    const total = operations.length;
    const active = operations.filter(op => op.status === 'processing').length;
    const completed = operations.filter(op => op.status === 'completed').length;
    const pending = operations.filter(op => op.status === 'pending').length;
    const cancelled = operations.filter(op => op.status === 'cancelled').length;

    return { total, active, completed, pending, cancelled };
  };

  const stats = getOperationStats();

  // تصفية العمليات حسب الحالة
  const getFilteredOperations = () => {
    switch (currentView) {
      case 'active':
        return operations.filter(op => op.status === 'processing');
      case 'pending':
        return operations.filter(op => op.status === 'pending');
      case 'completed':
        return operations.filter(op => op.status === 'completed');
      case 'cancelled':
        return operations.filter(op => op.status === 'cancelled');
      default:
        return operations;
    }
  };

  // أعمدة الجدول
  const columns = [
    {
      title: 'رقم الطلب',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (id) => <Text strong>#{id}</Text>
    },
    {
      title: 'العميل',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (name) => (
        <div>
          <UserOutlined style={{ marginLeft: 4 }} />
          {name}
        </div>
      )
    },
    {
      title: 'السيارة',
      key: 'car',
      render: (_, record) => (
        <div>
          <CarOutlined style={{ marginLeft: 4 }} />
          {record.carBrand} {record.carModel}
          <br />
          <Text type="secondary">{record.plateNumber}</Text>
        </div>
      )
    },
    {
      title: 'الخدمة',
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (name, record) => (
        <div>
          <Text>{name}</Text>
          <br />
          <Text type="secondary">{record.price} ريال</Text>
        </div>
      )
    },
    {
      title: 'الموظف',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: (name) => (
        <div>
          <Avatar size="small" icon={<UserOutlined />} style={{ marginLeft: 4 }} />
          {name}
        </div>
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          pending: { color: 'orange', text: 'قيد الانتظار', icon: <ClockCircleOutlined /> },
          processing: { color: 'blue', text: 'قيد التنفيذ', icon: <SyncOutlined spin /> },
          completed: { color: 'green', text: 'مكتمل', icon: <CheckCircleOutlined /> },
          cancelled: { color: 'red', text: 'ملغي', icon: <ExclamationCircleOutlined /> }
        };
        
        const config = statusConfig[status];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      }
    },
    {
      title: 'التقدم',
      key: 'progress',
      render: (_, record) => (
        <div style={{ width: 100 }}>
          <Progress 
            percent={record.progress} 
            size="small" 
            status={record.status === 'cancelled' ? 'exception' : 'active'}
          />
        </div>
      )
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="عرض التفاصيل">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => showOperationDetails(record)}
            />
          </Tooltip>
          
          {record.status === 'pending' && (
            <Tooltip title="بدء العملية">
              <Button 
                type="primary" 
                size="small"
                icon={<PlayCircleOutlined />} 
                onClick={() => startOperation(record.id)}
              >
                بدء
              </Button>
            </Tooltip>
          )}
          
          {record.status === 'processing' && (
            <>
              <Tooltip title="إيقاف مؤقت">
                <Button 
                  type="default" 
                  size="small"
                  icon={<PauseCircleOutlined />} 
                  onClick={() => pauseOperation(record.id)}
                >
                  إيقاف
                </Button>
              </Tooltip>
              <Tooltip title="إكمال العملية">
                <Button 
                  type="primary" 
                  size="small"
                  icon={<CheckCircleOutlined />} 
                  onClick={() => completeOperation(record.id)}
                >
                  إكمال
                </Button>
              </Tooltip>
            </>
          )}
          
          {(record.status === 'pending' || record.status === 'processing') && (
            <Tooltip title="إلغاء العملية">
              <Button 
                danger 
                size="small"
                icon={<StopOutlined />} 
                onClick={() => cancelOperation(record.id)}
              >
                إلغاء
              </Button>
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>
          <SettingOutlined style={{ marginLeft: 8 }} />
          إدارة العمليات
        </Title>
        <Text type="secondary">
          إدارة وتتبع عمليات غسيل السيارات في الوقت الفعلي
        </Text>
      </div>

      {/* مكون فحص العمليات */}
      <CrossCheckProvider 
        sectionName="operations" 
        position="top"
      />

      {/* إحصائيات سريعة */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="إجمالي العمليات"
              value={stats.total}
              prefix={<ThunderboltOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="العمليات النشطة"
              value={stats.active}
              valueStyle={{ color: '#1890ff' }}
              prefix={<SyncOutlined spin />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="العمليات المكتملة"
              value={stats.completed}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="قيد الانتظار"
              value={stats.pending}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card className="page-card">
        <Tabs 
          activeKey={currentView} 
          onChange={setCurrentView}
          items={[
            {
              key: 'all',
              label: `الكل (${stats.total})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredOperations()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} عملية`
                  }}
                />
              )
            },
            {
              key: 'active',
              label: `النشطة (${stats.active})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredOperations()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} عملية`
                  }}
                />
              )
            },
            {
              key: 'pending',
              label: `قيد الانتظار (${stats.pending})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredOperations()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} عملية`
                  }}
                />
              )
            },
            {
              key: 'completed',
              label: `المكتملة (${stats.completed})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredOperations()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} عملية`
                  }}
                />
              )
            },
            {
              key: 'cancelled',
              label: `الملغية (${stats.cancelled})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredOperations()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} عملية`
                  }}
                />
              )
            },
            {
              key: 'live-tracking',
              label: 'التتبع المباشر',
              children: <LiveOperationsTracking />
            },
            {
              key: 'employee-tracking',
              label: 'تتبع الموظفين',
              children: <EmployeeLiveTracking />
            },
            {
              key: 'map',
              label: 'خريطة المغاسل',
              children: <InteractiveMap />
            }
          ]}
        />
      </Card>

      {/* نافذة تفاصيل العملية */}
      <Modal
        title="تفاصيل العملية"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedOperation(null);
        }}
        footer={null}
        width={800}
      >
        {selectedOperation && (
          <div>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card title="معلومات الطلب" size="small">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="رقم الطلب">
                      #{selectedOperation.orderId}
                    </Descriptions.Item>
                    <Descriptions.Item label="العميل">
                      {selectedOperation.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="السيارة">
                      {selectedOperation.carBrand} {selectedOperation.carModel}
                    </Descriptions.Item>
                    <Descriptions.Item label="رقم اللوحة">
                      {selectedOperation.plateNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="الخدمة">
                      {selectedOperation.serviceName}
                    </Descriptions.Item>
                    <Descriptions.Item label="السعر">
                      {selectedOperation.price} ريال
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card title="معلومات العملية" size="small">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="الحالة">
                      <Tag color={
                        selectedOperation.status === 'completed' ? 'green' :
                        selectedOperation.status === 'processing' ? 'blue' :
                        selectedOperation.status === 'pending' ? 'orange' : 'red'
                      }>
                        {selectedOperation.status === 'completed' ? 'مكتمل' :
                         selectedOperation.status === 'processing' ? 'قيد التنفيذ' :
                         selectedOperation.status === 'pending' ? 'قيد الانتظار' : 'ملغي'}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="الموظف المسؤول">
                      {selectedOperation.employeeName}
                    </Descriptions.Item>
                    <Descriptions.Item label="الفرع">
                      {selectedOperation.branchName}
                    </Descriptions.Item>
                    <Descriptions.Item label="وقت البدء">
                      {new Date(selectedOperation.startTime).toLocaleString('ar-SA')}
                    </Descriptions.Item>
                    {selectedOperation.actualEndTime && (
                      <Descriptions.Item label="وقت الانتهاء">
                        {new Date(selectedOperation.actualEndTime).toLocaleString('ar-SA')}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="التقدم">
                      <Progress percent={selectedOperation.progress} />
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            {selectedOperation.notes && (
              <Card title="ملاحظات" size="small" style={{ marginTop: 16 }}>
                <Paragraph>{selectedOperation.notes}</Paragraph>
              </Card>
            )}

            {selectedOperation.photos && selectedOperation.photos.length > 0 && (
              <Card title="الصور" size="small" style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]}>
                  {selectedOperation.photos.map((photo, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                      <img 
                        src={photo.url} 
                        alt={`صورة ${index + 1}`}
                        style={{ width: '100%', borderRadius: 8 }}
                      />
                      <div style={{ textAlign: 'center', marginTop: 8 }}>
                        <Tag color={photo.type === 'before' ? 'orange' : 'green'}>
                          {photo.type === 'before' ? 'قبل الغسيل' : 'بعد الغسيل'}
                        </Tag>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Operations; 