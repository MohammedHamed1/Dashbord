import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Switch, 
  Tag, 
  Typography, 
  Row, 
  Col,
  Statistic,
  Tooltip,
  Popconfirm,
  message,
  Spin,
  Alert,
  List,
  Avatar,
  Badge,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  BellOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';
import { usePermissions } from '../context/PermissionContext';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;

const SmartAlerts = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { hasPermission, filterDataByScope } = usePermissions();
  const [alerts, setAlerts] = useState([]);
  const [alertRules, setAlertRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAlerts();
    fetchAlertRules();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAlerts = [
        {
          id: 1,
          type: 'performance',
          title: 'انخفاض في التقييمات',
          message: 'متوسط التقييمات انخفض إلى 3.2/5 في فرع الرياض الرئيسي',
          severity: 'high',
          status: 'active',
          createdAt: '2024-03-03T10:00:00Z',
          resolvedAt: null,
          data: {
            branchId: 1,
            branchName: 'فرع الرياض الرئيسي',
            currentRating: 3.2,
            threshold: 4.0
          }
        },
        {
          id: 2,
          type: 'revenue',
          title: 'انخفاض في الإيرادات',
          message: 'الإيرادات اليومية انخفضت بنسبة 25% مقارنة بالأمس',
          severity: 'medium',
          status: 'active',
          createdAt: '2024-03-03T09:30:00Z',
          resolvedAt: null,
          data: {
            currentRevenue: 1500,
            previousRevenue: 2000,
            percentage: 25
          }
        },
        {
          id: 3,
          type: 'orders',
          title: 'زيادة في الطلبات المعلقة',
          message: 'عدد الطلبات المعلقة وصل إلى 15 طلب',
          severity: 'medium',
          status: 'resolved',
          createdAt: '2024-03-02T16:00:00Z',
          resolvedAt: '2024-03-02T18:00:00Z',
          data: {
            pendingOrders: 15,
            threshold: 10
          }
        }
      ];

      const filteredAlerts = filterDataByScope(mockAlerts, 'alerts');
      setAlerts(filteredAlerts);
    } catch (error) {
      message.error('حدث خطأ أثناء تحميل التنبيهات');
    } finally {
      setLoading(false);
    }
  };

  const fetchAlertRules = async () => {
    try {
      const mockRules = [
        {
          id: 1,
          name: 'تنبيه انخفاض التقييمات',
          type: 'performance',
          condition: 'rating_below',
          threshold: 4.0,
          isActive: true,
          notificationChannels: ['email', 'sms', 'push'],
          message: 'التقييمات انخفضت عن الحد المطلوب'
        },
        {
          id: 2,
          name: 'تنبيه انخفاض الإيرادات',
          type: 'revenue',
          condition: 'revenue_decrease',
          threshold: 20,
          isActive: true,
          notificationChannels: ['email', 'push'],
          message: 'الإيرادات انخفضت بنسبة كبيرة'
        },
        {
          id: 3,
          name: 'تنبيه الطلبات المعلقة',
          type: 'orders',
          condition: 'pending_orders_above',
          threshold: 10,
          isActive: true,
          notificationChannels: ['email', 'sms'],
          message: 'عدد الطلبات المعلقة تجاوز الحد المسموح'
        }
      ];

      setAlertRules(mockRules);
    } catch (error) {
      message.error('حدث خطأ أثناء تحميل قواعد التنبيهات');
    }
  };

  const handleAddRule = () => {
    setEditingRule(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditRule = (record) => {
    setEditingRule(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDeleteRule = async (id) => {
    try {
      setAlertRules(prev => prev.filter(rule => rule.id !== id));
      message.success('تم حذف قاعدة التنبيه بنجاح');
    } catch (error) {
      message.error('حدث خطأ أثناء حذف قاعدة التنبيه');
    }
  };

  const handleSubmitRule = async (values) => {
    try {
      if (editingRule) {
        const updatedRule = { ...editingRule, ...values };
        setAlertRules(prev => prev.map(rule => 
          rule.id === editingRule.id ? updatedRule : rule
        ));
        message.success('تم تحديث قاعدة التنبيه بنجاح');
      } else {
        const newRule = {
          id: Date.now(),
          ...values,
          createdAt: new Date().toISOString()
        };
        setAlertRules(prev => [...prev, newRule]);
        message.success('تم إضافة قاعدة التنبيه بنجاح');
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('حدث خطأ أثناء حفظ قاعدة التنبيه');
    }
  };

  const handleResolveAlert = async (id) => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === id ? { ...alert, status: 'resolved', resolvedAt: new Date().toISOString() } : alert
      ));
      message.success('تم حل التنبيه بنجاح');
    } catch (error) {
      message.error('حدث خطأ أثناء حل التنبيه');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getSeverityText = (severity) => {
    switch (severity) {
      case 'high': return lang === 'ar' ? 'عالية' : 'High';
      case 'medium': return lang === 'ar' ? 'متوسطة' : 'Medium';
      case 'low': return lang === 'ar' ? 'منخفضة' : 'Low';
      default: return severity;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'performance': return lang === 'ar' ? 'الأداء' : 'Performance';
      case 'revenue': return lang === 'ar' ? 'الإيرادات' : 'Revenue';
      case 'orders': return lang === 'ar' ? 'الطلبات' : 'Orders';
      case 'system': return lang === 'ar' ? 'النظام' : 'System';
      default: return type;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'red';
      case 'resolved': return 'green';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return lang === 'ar' ? 'نشط' : 'Active';
      case 'resolved': return lang === 'ar' ? 'تم الحل' : 'Resolved';
      default: return status;
    }
  };

  const alertColumns = [
    {
      title: lang === 'ar' ? 'النوع' : 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color="blue">
          {getTypeText(type)}
        </Tag>
      )
    },
    {
      title: lang === 'ar' ? 'العنوان' : 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => <Text strong>{title}</Text>
    },
    {
      title: lang === 'ar' ? 'الخطورة' : 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => (
        <Tag color={getSeverityColor(severity)}>
          {getSeverityText(severity)}
        </Tag>
      )
    },
    {
      title: lang === 'ar' ? 'الحالة' : 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      )
    },
    {
      title: lang === 'ar' ? 'تاريخ الإنشاء' : 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => moment(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: lang === 'ar' ? 'الإجراءات' : 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'active' && hasPermission('alerts.manage') && (
            <Button 
              type="text" 
              size="small"
              onClick={() => handleResolveAlert(record.id)}
            >
              {lang === 'ar' ? 'حل' : 'Resolve'}
            </Button>
          )}
        </Space>
      )
    }
  ];

  const ruleColumns = [
    {
      title: lang === 'ar' ? 'اسم القاعدة' : 'Rule Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <Text strong>{name}</Text>
    },
    {
      title: lang === 'ar' ? 'النوع' : 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color="blue">
          {getTypeText(type)}
        </Tag>
      )
    },
    {
      title: lang === 'ar' ? 'الحد' : 'Threshold',
      dataIndex: 'threshold',
      key: 'threshold',
      render: (threshold, record) => {
        switch (record.condition) {
          case 'rating_below': return `${threshold}/5`;
          case 'revenue_decrease': return `${threshold}%`;
          case 'pending_orders_above': return `${threshold} طلبات`;
          default: return threshold;
        }
      }
    },
    {
      title: lang === 'ar' ? 'الحالة' : 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Switch 
          checked={isActive} 
          disabled={!hasPermission('alerts.manage')}
        />
      )
    },
    {
      title: lang === 'ar' ? 'الإجراءات' : 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {hasPermission('alerts.manage') && (
            <>
              <Tooltip title={lang === 'ar' ? 'تعديل' : 'Edit'}>
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  onClick={() => handleEditRule(record)}
                />
              </Tooltip>
              <Popconfirm
                title={lang === 'ar' ? 'هل أنت متأكد من حذف هذه القاعدة؟' : 'Are you sure you want to delete this rule?'}
                onConfirm={() => handleDeleteRule(record.id)}
                okText={lang === 'ar' ? 'نعم' : 'Yes'}
                cancelText={lang === 'ar' ? 'لا' : 'No'}
              >
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                />
              </Popconfirm>
            </>
          )}
        </Space>
      )
    }
  ];

  const stats = {
    totalAlerts: alerts.length,
    activeAlerts: alerts.filter(a => a.status === 'active').length,
    highSeverity: alerts.filter(a => a.severity === 'high').length,
    totalRules: alertRules.length,
    activeRules: alertRules.filter(r => r.isActive).length
  };

  return (
    <Layout style={{ padding: 24 }}>
      <Content>
        {/* العنوان والإحصائيات */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>{t('smartAlerts')}</Title>
          <Text type="secondary">
            {lang === 'ar' ? 'نظام التنبيهات الذكية لمراقبة الأداء والمؤشرات' : 'Smart alerts system for monitoring performance and metrics'}
          </Text>
        </div>

        {/* إحصائيات سريعة */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={lang === 'ar' ? 'إجمالي التنبيهات' : 'Total Alerts'}
                value={stats.totalAlerts}
                prefix={<BellOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={lang === 'ar' ? 'التنبيهات النشطة' : 'Active Alerts'}
                value={stats.activeAlerts}
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={lang === 'ar' ? 'خطورة عالية' : 'High Severity'}
                value={stats.highSeverity}
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<WarningOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={lang === 'ar' ? 'قواعد التنبيهات' : 'Alert Rules'}
                value={stats.totalRules}
                prefix={<SettingOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* التنبيهات النشطة */}
        <Card 
          title={lang === 'ar' ? 'التنبيهات النشطة' : 'Active Alerts'}
          style={{ marginBottom: 24 }}
        >
          <Table
            columns={alertColumns}
            dataSource={alerts.filter(a => a.status === 'active')}
            rowKey="id"
            loading={loading}
            pagination={false}
            size="small"
          />
        </Card>

        {/* قواعد التنبيهات */}
        <Card 
          title={lang === 'ar' ? 'قواعد التنبيهات' : 'Alert Rules'}
          extra={
            hasPermission('alerts.manage') && (
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddRule}
              >
                {lang === 'ar' ? 'إضافة قاعدة' : 'Add Rule'}
              </Button>
            )
          }
        >
          <Table
            columns={ruleColumns}
            dataSource={alertRules}
            rowKey="id"
            pagination={false}
          />
        </Card>

        {/* Modal إضافة/تعديل قاعدة التنبيه */}
        <Modal
          title={editingRule ? 
            (lang === 'ar' ? 'تعديل قاعدة التنبيه' : 'Edit Alert Rule') : 
            (lang === 'ar' ? 'إضافة قاعدة تنبيه جديدة' : 'Add New Alert Rule')
          }
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingRule(null);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmitRule}
          >
            <Form.Item
              name="name"
              label={lang === 'ar' ? 'اسم القاعدة' : 'Rule Name'}
              rules={[{ required: true, message: lang === 'ar' ? 'يرجى إدخال اسم القاعدة' : 'Please enter rule name' }]}
            >
              <Input />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label={lang === 'ar' ? 'النوع' : 'Type'}
                  rules={[{ required: true, message: lang === 'ar' ? 'يرجى اختيار النوع' : 'Please select type' }]}
                >
                  <Select>
                    <Select.Option value="performance">{lang === 'ar' ? 'الأداء' : 'Performance'}</Select.Option>
                    <Select.Option value="revenue">{lang === 'ar' ? 'الإيرادات' : 'Revenue'}</Select.Option>
                    <Select.Option value="orders">{lang === 'ar' ? 'الطلبات' : 'Orders'}</Select.Option>
                    <Select.Option value="system">{lang === 'ar' ? 'النظام' : 'System'}</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="condition"
                  label={lang === 'ar' ? 'الشرط' : 'Condition'}
                  rules={[{ required: true, message: lang === 'ar' ? 'يرجى اختيار الشرط' : 'Please select condition' }]}
                >
                  <Select>
                    <Select.Option value="rating_below">{lang === 'ar' ? 'التقييم أقل من' : 'Rating below'}</Select.Option>
                    <Select.Option value="revenue_decrease">{lang === 'ar' ? 'انخفاض الإيرادات' : 'Revenue decrease'}</Select.Option>
                    <Select.Option value="pending_orders_above">{lang === 'ar' ? 'الطلبات المعلقة أكثر من' : 'Pending orders above'}</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="threshold"
              label={lang === 'ar' ? 'الحد' : 'Threshold'}
              rules={[{ required: true, message: lang === 'ar' ? 'يرجى إدخال الحد' : 'Please enter threshold' }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="notificationChannels"
              label={lang === 'ar' ? 'قنوات الإشعارات' : 'Notification Channels'}
              rules={[{ required: true, message: lang === 'ar' ? 'يرجى اختيار قنوات الإشعارات' : 'Please select notification channels' }]}
            >
              <Select mode="multiple">
                <Select.Option value="email">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Select.Option>
                <Select.Option value="sms">{lang === 'ar' ? 'رسالة نصية' : 'SMS'}</Select.Option>
                <Select.Option value="push">{lang === 'ar' ? 'إشعار فوري' : 'Push Notification'}</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="message"
              label={lang === 'ar' ? 'رسالة التنبيه' : 'Alert Message'}
              rules={[{ required: true, message: lang === 'ar' ? 'يرجى إدخال رسالة التنبيه' : 'Please enter alert message' }]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="isActive"
              label={lang === 'ar' ? 'تفعيل القاعدة' : 'Enable Rule'}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={() => {
                  setModalVisible(false);
                  setEditingRule(null);
                  form.resetFields();
                }}>
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingRule ? (lang === 'ar' ? 'تحديث' : 'Update') : (lang === 'ar' ? 'إضافة' : 'Add')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default SmartAlerts; 