import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Table,
  Button,
  Space,
  Tag,
  Statistic,
  Row,
  Col,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Progress,
  Alert,
  Divider,
  Avatar,
  List,
  Descriptions,
  Tabs,
  Badge,
  Switch,
  Timeline,
  notification
} from 'antd';
import {
  BellOutlined,
  MessageOutlined,
  MailOutlined,
  PushpinOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  ReloadOutlined,
  FilterOutlined,
  TrophyOutlined,
  NotificationOutlined,
  SendOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { getNotifications, getUsersData, getOrders, getBranches } from '../data/mockData';
import { useToast } from '../utils/toastService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Notifications = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    priority: 'all',
    dateRange: null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [notificationsData, usersData, ordersData, branchesData] = await Promise.all([
        getNotifications(),
        getUsersData(),
        getOrders(),
        getBranches()
      ]);
      setNotifications(notificationsData);
      setUsers(usersData);
      setOrders(ordersData);
      setBranches(branchesData);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // إحصائيات الإشعارات
  const getNotificationStats = () => {
    const totalNotifications = notifications.length;
    const sentNotifications = notifications.filter(n => n.status === 'sent').length;
    const pendingNotifications = notifications.filter(n => n.status === 'pending').length;
    const failedNotifications = notifications.filter(n => n.status === 'failed').length;
    
    const readNotifications = notifications.filter(n => n.read).length;
    const unreadNotifications = totalNotifications - readNotifications;
    
    const deliveryRate = totalNotifications > 0 ? (sentNotifications / totalNotifications * 100).toFixed(1) : 0;
    const readRate = totalNotifications > 0 ? (readNotifications / totalNotifications * 100).toFixed(1) : 0;

    // توزيع أنواع الإشعارات
    const notificationTypes = {};
    notifications.forEach(notif => {
      const type = notif.type;
      notificationTypes[type] = (notificationTypes[type] || 0) + 1;
    });

    return {
      totalNotifications,
      sentNotifications,
      pendingNotifications,
      failedNotifications,
      readNotifications,
      unreadNotifications,
      deliveryRate,
      readRate,
      notificationTypes
    };
  };

  const stats = getNotificationStats();

  // أعمدة الجدول
  const columns = [
    {
      title: 'المستلم',
      dataIndex: 'recipientId',
      key: 'recipientId',
      render: (recipientId) => {
        const user = users.find(u => u.id === recipientId);
        return (
          <Space>
            <Avatar src={user?.avatar} size="small">
              {user?.name?.charAt(0)}
            </Avatar>
            <div>
              <div>{user?.name}</div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {user?.phone}
              </Text>
            </div>
          </Space>
        );
      }
    },
    {
      title: 'النوع',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeIcons = {
          sms: <MessageOutlined style={{ color: '#1890ff' }} />,
          email: <MailOutlined style={{ color: '#52c41a' }} />,
          push: <BellOutlined style={{ color: '#faad14' }} />,
          whatsapp: <MessageOutlined style={{ color: '#25D366' }} />
        };
        
        const typeNames = {
          sms: 'رسالة نصية',
          email: 'بريد إلكتروني',
          push: 'إشعار تطبيق',
          whatsapp: 'واتساب'
        };
        
        return (
          <Space>
            {typeIcons[type]}
            <Text>{typeNames[type] || type}</Text>
          </Space>
        );
      }
    },
    {
      title: 'الموضوع',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <div>
          <div>{title}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.content?.substring(0, 50)}...
          </Text>
        </div>
      )
    },
    {
      title: 'الأولوية',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const priorityConfig = {
          high: { color: 'red', text: 'عالية' },
          medium: { color: 'orange', text: 'متوسطة' },
          low: { color: 'green', text: 'منخفضة' }
        };
        const config = priorityConfig[priority] || { color: 'default', text: priority };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          sent: { color: 'green', text: 'تم الإرسال', icon: <CheckCircleOutlined /> },
          pending: { color: 'orange', text: 'قيد الانتظار', icon: <ClockCircleOutlined /> },
          failed: { color: 'red', text: 'فشل', icon: <CloseCircleOutlined /> }
        };
        const config = statusConfig[status] || { color: 'default', text: status, icon: null };
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      }
    },
    {
      title: 'القراءة',
      dataIndex: 'read',
      key: 'read',
      render: (read) => (
        <Badge status={read ? 'success' : 'processing'} text={read ? 'مقروء' : 'غير مقروء'} />
      )
    },
    {
      title: 'التاريخ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('ar-SA')
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
              onClick={() => showNotificationDetails(record)}
            />
          </Tooltip>
          <Tooltip title="إعادة الإرسال">
            <Button
              type="text"
              icon={<SendOutlined />}
              onClick={() => resendNotification(record.id)}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteNotification(record.id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const showNotificationDetails = (notif) => {
    setSelectedNotification(notif);
    setModalVisible(true);
  };

  const resendNotification = async (id) => {
    try {
      const updatedNotifications = notifications.map(n =>
        n.id === id ? { ...n, status: 'pending', retryCount: (n.retryCount || 0) + 1 } : n
      );
      setNotifications(updatedNotifications);
      toast.success('تم إعادة إرسال الإشعار');
    } catch (error) {
      toast.error('خطأ في إعادة الإرسال');
    }
  };

  const deleteNotification = async (id) => {
    try {
      setNotifications(notifications.filter(n => n.id !== id));
      toast.success('تم حذف الإشعار بنجاح');
    } catch (error) {
      toast.error('خطأ في حذف الإشعار');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedNotification) {
        const updatedNotifications = notifications.map(n =>
          n.id === selectedNotification.id ? { ...n, ...values } : n
        );
        setNotifications(updatedNotifications);
        toast.success('تم تحديث الإشعار بنجاح');
      }
      setModalVisible(false);
      setSelectedNotification(null);
      form.resetFields();
    } catch (error) {
      toast.error('خطأ في حفظ البيانات');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedNotification(null);
    form.resetFields();
  };

  const exportData = () => {
    toast.success('تم تصدير البيانات بنجاح');
  };

  const sendTestNotification = () => {
    notification.success({
      message: 'إشعار تجريبي',
      description: 'تم إرسال إشعار تجريبي بنجاح',
      placement: 'topRight'
    });
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filters.type !== 'all' && notif.type !== filters.type) return false;
    if (filters.status !== 'all' && notif.status !== filters.status) return false;
    if (filters.priority !== 'all' && notif.priority !== filters.priority) return false;
    if (filters.dateRange) {
      const notifDate = new Date(notif.createdAt);
      const [start, end] = filters.dateRange;
      if (notifDate < start || notifDate > end) return false;
    }
    return true;
  });

  return (
    <Layout style={{ padding: '24px', background: '#f5f6fa' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <NotificationOutlined style={{ marginRight: 8 }} />
          إدارة الإشعارات
        </Title>
        <Text type="secondary">
          إدارة جميع أنواع الإشعارات والرسائل
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي الإشعارات"
              value={stats.totalNotifications}
              prefix={<NotificationOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="تم الإرسال"
              value={stats.sentNotifications}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="قيد الانتظار"
              value={stats.pendingNotifications}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="معدل التسليم"
              value={stats.deliveryRate}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="معدل القراءة"
              value={stats.readRate}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#eb2f96' }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="غير مقروء"
              value={stats.unreadNotifications}
              prefix={<BellOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* توزيع أنواع الإشعارات */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="توزيع أنواع الإشعارات">
            {Object.entries(stats.notificationTypes).map(([type, count]) => {
              const typeNames = {
                sms: 'رسالة نصية',
                email: 'بريد إلكتروني',
                push: 'إشعار تطبيق',
                whatsapp: 'واتساب'
              };
              const colors = {
                sms: '#1890ff',
                email: '#52c41a',
                push: '#faad14',
                whatsapp: '#25D366'
              };
              return (
                <div key={type} style={{ marginBottom: 8 }}>
                  <Space>
                    <Text>{typeNames[type] || type}</Text>
                    <Progress
                      percent={stats.totalNotifications > 0 ? (count / stats.totalNotifications * 100).toFixed(1) : 0}
                      size="small"
                      strokeColor={colors[type]}
                      showInfo={false}
                      style={{ width: 200 }}
                    />
                    <Text>{count}</Text>
                  </Space>
                </div>
              );
            })}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="أحدث الإشعارات">
            <List
              size="small"
              dataSource={notifications.slice(0, 5)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: item.status === 'sent' ? '#52c41a' : '#faad14' }}>
                        {item.status === 'sent' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                      </Avatar>
                    }
                    title={
                      <Space>
                        <Text>{item.title}</Text>
                        <Badge status={item.read ? 'success' : 'processing'} />
                      </Space>
                    }
                    description={
                      <Text type="secondary">
                        {users.find(u => u.id === item.recipientId)?.name} - {new Date(item.createdAt).toLocaleDateString('ar-SA')}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* معلومات سريعة */}
      <Alert
        message="معلومات مهمة"
        description="يتم إرسال الإشعارات تلقائياً عند حدوث أحداث معينة مثل اكتمال الطلب أو وصول موظف جديد. يمكن إعادة إرسال الإشعارات الفاشلة."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* أدوات التحكم */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={4}>
            <Select
              placeholder="نوع الإشعار"
              style={{ width: '100%' }}
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
            >
              <Option value="all">جميع الأنواع</Option>
              <Option value="sms">رسالة نصية</Option>
              <Option value="email">بريد إلكتروني</Option>
              <Option value="push">إشعار تطبيق</Option>
              <Option value="whatsapp">واتساب</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="الحالة"
              style={{ width: '100%' }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="all">جميع الحالات</Option>
              <Option value="sent">تم الإرسال</Option>
              <Option value="pending">قيد الانتظار</Option>
              <Option value="failed">فشل</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="الأولوية"
              style={{ width: '100%' }}
              value={filters.priority}
              onChange={(value) => setFilters({ ...filters, priority: value })}
            >
              <Option value="all">جميع الأولويات</Option>
              <Option value="high">عالية</Option>
              <Option value="medium">متوسطة</Option>
              <Option value="low">منخفضة</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchData}
                loading={loading}
              >
                تحديث
              </Button>
              <Button
                icon={<SendOutlined />}
                onClick={sendTestNotification}
              >
                إشعار تجريبي
              </Button>
              <Button
                icon={<ExportOutlined />}
                onClick={exportData}
              >
                تصدير
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* جدول الإشعارات */}
      <Card title="قائمة الإشعارات">
        <Table
          columns={columns}
          dataSource={filteredNotifications}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredNotifications.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} إشعار`
          }}
        />
      </Card>

      {/* Modal تفاصيل الإشعار */}
      <Modal
        title="تفاصيل الإشعار"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        {selectedNotification ? (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="المستلم" span={2}>
                <Space>
                  <Avatar src={users.find(u => u.id === selectedNotification.recipientId)?.avatar}>
                    {users.find(u => u.id === selectedNotification.recipientId)?.name?.charAt(0)}
                  </Avatar>
                  <Text>{users.find(u => u.id === selectedNotification.recipientId)?.name}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="النوع">
                {selectedNotification.type === 'sms' ? 'رسالة نصية' :
                 selectedNotification.type === 'email' ? 'بريد إلكتروني' :
                 selectedNotification.type === 'push' ? 'إشعار تطبيق' :
                 selectedNotification.type === 'whatsapp' ? 'واتساب' : selectedNotification.type}
              </Descriptions.Item>
              <Descriptions.Item label="الأولوية">
                <Tag color={selectedNotification.priority === 'high' ? 'red' : 
                           selectedNotification.priority === 'medium' ? 'orange' : 'green'}>
                  {selectedNotification.priority === 'high' ? 'عالية' :
                   selectedNotification.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="الحالة">
                <Tag color={selectedNotification.status === 'sent' ? 'green' : 'orange'}>
                  {selectedNotification.status === 'sent' ? 'تم الإرسال' : 'قيد الانتظار'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="القراءة">
                <Badge status={selectedNotification.read ? 'success' : 'processing'} 
                       text={selectedNotification.read ? 'مقروء' : 'غير مقروء'} />
              </Descriptions.Item>
              <Descriptions.Item label="التاريخ">
                {new Date(selectedNotification.createdAt).toLocaleDateString('ar-SA')}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ marginBottom: 16 }}>
              <Text strong>الموضوع:</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {selectedNotification.title}
              </Paragraph>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>المحتوى:</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {selectedNotification.content}
              </Paragraph>
            </div>

            <Timeline>
              <Timeline.Item color="green">
                <Text>تم إنشاء الإشعار</Text>
                <br />
                <Text type="secondary">{new Date(selectedNotification.createdAt).toLocaleString('ar-SA')}</Text>
              </Timeline.Item>
              {selectedNotification.status === 'sent' && (
                <Timeline.Item color="green">
                  <Text>تم إرسال الإشعار</Text>
                  <br />
                  <Text type="secondary">{selectedNotification.sentAt ? new Date(selectedNotification.sentAt).toLocaleString('ar-SA') : '-'}</Text>
                </Timeline.Item>
              )}
              {selectedNotification.read && (
                <Timeline.Item color="blue">
                  <Text>تم قراءة الإشعار</Text>
                  <br />
                  <Text type="secondary">{selectedNotification.readAt ? new Date(selectedNotification.readAt).toLocaleString('ar-SA') : '-'}</Text>
                </Timeline.Item>
              )}
            </Timeline>
          </div>
        ) : null}
      </Modal>
    </Layout>
  );
};

export default Notifications; 