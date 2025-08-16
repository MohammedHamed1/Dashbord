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
  Timeline
} from 'antd';
import {
  CreditCardOutlined,
  DollarOutlined,
  WalletOutlined,
  BankOutlined,
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
  TransactionOutlined,
  RollbackOutlined,
  PayCircleOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { getPayments, getUsersData, getOrders, getBranches } from '../data/mockData';
import { useToast } from '../utils/toastService';
import { useSafeNavigate } from '../utils/safeHooks';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Payments = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const navigate = useSafeNavigate();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    status: 'all',
    method: 'all',
    branch: 'all',
    dateRange: null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [paymentsData, usersData, ordersData, branchesData] = await Promise.all([
        getPayments(),
        getUsersData(),
        getOrders(),
        getBranches()
      ]);
      setPayments(paymentsData);
      setUsers(usersData);
      setOrders(ordersData);
      setBranches(branchesData);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // إحصائيات المدفوعات
  const getPaymentStats = () => {
    const totalPayments = payments.length;
    const successfulPayments = payments.filter(p => p.status === 'completed').length;
    const pendingPayments = payments.filter(p => p.status === 'pending').length;
    const failedPayments = payments.filter(p => p.status === 'failed').length;
    
    const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const successfulAmount = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    
    const successRate = totalPayments > 0 ? (successfulPayments / totalPayments * 100).toFixed(1) : 0;
    const averageAmount = totalPayments > 0 ? (totalAmount / totalPayments).toFixed(2) : 0;

    // توزيع طرق الدفع
    const paymentMethods = {};
    payments.forEach(payment => {
      const method = payment.method;
      paymentMethods[method] = (paymentMethods[method] || 0) + 1;
    });

    return {
      totalPayments,
      successfulPayments,
      pendingPayments,
      failedPayments,
      totalAmount,
      successfulAmount,
      successRate,
      averageAmount,
      paymentMethods
    };
  };

  const stats = getPaymentStats();

  // أعمدة الجدول
  const columns = [
    {
      title: 'رقم العملية',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Tag color="blue">#{id}</Tag>
      )
    },
    {
      title: 'العميل',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (customerId) => {
        const user = users.find(u => u.id === customerId);
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
      title: 'الطلب',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (orderId) => (
        <Tag color="green">#{orderId}</Tag>
      )
    },
    {
      title: 'المبلغ',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Space>
          <DollarOutlined style={{ color: '#52c41a' }} />
          <Text strong>{amount} ريال</Text>
        </Space>
      )
    },
    {
      title: 'طريقة الدفع',
      dataIndex: 'method',
      key: 'method',
      render: (method) => {
        const methodIcons = {
          card: <CreditCardOutlined style={{ color: '#1890ff' }} />,
          cash: <DollarOutlined style={{ color: '#52c41a' }} />,
          wallet: <WalletOutlined style={{ color: '#faad14' }} />,
          bank: <BankOutlined style={{ color: '#722ed1' }} />
        };
        
        const methodNames = {
          card: 'بطاقة ائتمان',
          cash: 'نقداً',
          wallet: 'محفظة إلكترونية',
          bank: 'تحويل بنكي'
        };
        
        return (
          <Space>
            {methodIcons[method]}
            <Text>{methodNames[method] || method}</Text>
          </Space>
        );
      }
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          completed: { color: 'green', text: 'مكتمل', icon: <CheckCircleOutlined /> },
          pending: { color: 'orange', text: 'قيد الانتظار', icon: <ClockCircleOutlined /> },
          failed: { color: 'red', text: 'فشل', icon: <CloseCircleOutlined /> },
          refunded: { color: 'purple', text: 'مسترد', icon: <RollbackOutlined /> }
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
      title: 'الفرع',
      dataIndex: 'branchId',
      key: 'branchId',
      render: (branchId) => {
        const branch = branches.find(b => b.id === branchId);
        return branch?.name || '-';
      }
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
              onClick={() => showPaymentDetails(record)}
            />
          </Tooltip>
          {record.status === 'pending' && (
            <Tooltip title="تأكيد الدفع">
              <Button
                type="text"
                icon={<CheckCircleOutlined />}
                onClick={() => confirmPayment(record.id)}
              />
            </Tooltip>
          )}
          {record.status === 'completed' && (
            <Tooltip title="استرداد">
              <Button
                type="text"
                icon={<RollbackOutlined />}
                onClick={() => refundPayment(record.id)}
              />
            </Tooltip>
          )}
          <Tooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deletePayment(record.id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const showPaymentDetails = (payment) => {
    setSelectedPayment(payment);
    setModalVisible(true);
  };

  const confirmPayment = async (id) => {
    try {
      const updatedPayments = payments.map(p =>
        p.id === id ? { ...p, status: 'completed', completedAt: new Date().toISOString() } : p
      );
      setPayments(updatedPayments);
      toast.success('تم تأكيد الدفع بنجاح');
    } catch (error) {
      toast.error('خطأ في تأكيد الدفع');
    }
  };

  const refundPayment = async (id) => {
    try {
      const updatedPayments = payments.map(p =>
        p.id === id ? { ...p, status: 'refunded', refundedAt: new Date().toISOString() } : p
      );
      setPayments(updatedPayments);
      toast.success('تم استرداد المبلغ بنجاح');
    } catch (error) {
      toast.error('خطأ في استرداد المبلغ');
    }
  };

  const deletePayment = async (id) => {
    try {
      setPayments(payments.filter(p => p.id !== id));
      toast.success('تم حذف العملية بنجاح');
    } catch (error) {
      toast.error('خطأ في حذف العملية');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedPayment) {
        const updatedPayments = payments.map(p =>
          p.id === selectedPayment.id ? { ...p, ...values } : p
        );
        setPayments(updatedPayments);
        toast.success('تم تحديث العملية بنجاح');
      }
      setModalVisible(false);
      setSelectedPayment(null);
      form.resetFields();
    } catch (error) {
      toast.error('خطأ في حفظ البيانات');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedPayment(null);
    form.resetFields();
  };

  const exportData = () => {
    toast.success('تم تصدير البيانات بنجاح');
  };

  const filteredPayments = payments.filter(payment => {
    if (filters.status !== 'all' && payment.status !== filters.status) return false;
    if (filters.method !== 'all' && payment.method !== filters.method) return false;
    if (filters.branch !== 'all' && payment.branchId !== parseInt(filters.branch)) return false;
    if (filters.dateRange) {
      const paymentDate = new Date(payment.createdAt);
      const [start, end] = filters.dateRange;
      if (paymentDate < start || paymentDate > end) return false;
    }
    return true;
  });

  return (
    <Layout style={{ padding: '24px', background: '#f5f6fa' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <PayCircleOutlined style={{ marginRight: 8 }} />
          إدارة المدفوعات
        </Title>
        <Text type="secondary">
          إدارة جميع عمليات الدفع والمتابعة
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي العمليات"
              value={stats.totalPayments}
              prefix={<TransactionOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="العمليات الناجحة"
              value={stats.successfulPayments}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="قيد الانتظار"
              value={stats.pendingPayments}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي المبالغ"
              value={stats.totalAmount}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="ريال"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="معدل النجاح"
              value={stats.successRate}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="متوسط المبلغ"
              value={stats.averageAmount}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#eb2f96' }}
              suffix="ريال"
            />
          </Card>
        </Col>
      </Row>

      {/* توزيع طرق الدفع */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="توزيع طرق الدفع">
            {Object.entries(stats.paymentMethods).map(([method, count]) => {
              const methodNames = {
                card: 'بطاقة ائتمان',
                cash: 'نقداً',
                wallet: 'محفظة إلكترونية',
                bank: 'تحويل بنكي'
              };
              const colors = {
                card: '#1890ff',
                cash: '#52c41a',
                wallet: '#faad14',
                bank: '#722ed1'
              };
              return (
                <div key={method} style={{ marginBottom: 8 }}>
                  <Space>
                    <Text>{methodNames[method] || method}</Text>
                    <Progress
                      percent={stats.totalPayments > 0 ? (count / stats.totalPayments * 100).toFixed(1) : 0}
                      size="small"
                      strokeColor={colors[method]}
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
          <Card title="أحدث العمليات">
            <List
              size="small"
              dataSource={payments.slice(0, 5)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: item.status === 'completed' ? '#52c41a' : '#faad14' }}>
                        {item.status === 'completed' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                      </Avatar>
                    }
                    title={
                      <Space>
                        <Text>#{item.id}</Text>
                        <Text strong>{item.amount} ريال</Text>
                      </Space>
                    }
                    description={
                      <Text type="secondary">
                        {users.find(u => u.id === item.customerId)?.name} - {new Date(item.createdAt).toLocaleDateString('ar-SA')}
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
        description="يتم تتبع جميع عمليات الدفع تلقائياً. يمكن تأكيد المدفوعات المعلقة أو استرداد المبالغ المدفوعة عند الحاجة."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />



      {/* أدوات التحكم */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={4}>
            <Select
              placeholder="حالة العملية"
              style={{ width: '100%' }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="all">جميع الحالات</Option>
              <Option value="completed">مكتمل</Option>
              <Option value="pending">قيد الانتظار</Option>
              <Option value="failed">فشل</Option>
              <Option value="refunded">مسترد</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="طريقة الدفع"
              style={{ width: '100%' }}
              value={filters.method}
              onChange={(value) => setFilters({ ...filters, method: value })}
            >
              <Option value="all">جميع الطرق</Option>
              <Option value="card">بطاقة ائتمان</Option>
              <Option value="cash">نقداً</Option>
              <Option value="wallet">محفظة إلكترونية</Option>
              <Option value="bank">تحويل بنكي</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="الفرع"
              style={{ width: '100%' }}
              value={filters.branch}
              onChange={(value) => setFilters({ ...filters, branch: value })}
            >
              <Option value="all">جميع الفروع</Option>
              {branches.map(branch => (
                <Option key={branch.id} value={branch.id.toString()}>
                  {branch.name}
                </Option>
              ))}
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
                icon={<ExportOutlined />}
                onClick={exportData}
              >
                تصدير
              </Button>

            </Space>
          </Col>
        </Row>
      </Card>

      {/* جدول المدفوعات */}
      <Card title="قائمة المدفوعات">
        <Table
          columns={columns}
          dataSource={filteredPayments}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredPayments.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} عملية`
          }}
        />
      </Card>

      {/* Modal تفاصيل العملية */}
      <Modal
        title="تفاصيل العملية"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        {selectedPayment ? (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="رقم العملية" span={2}>
                #{selectedPayment.id}
              </Descriptions.Item>
              <Descriptions.Item label="العميل">
                {users.find(u => u.id === selectedPayment.customerId)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الطلب">
                #{selectedPayment.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="المبلغ">
                {selectedPayment.amount} ريال
              </Descriptions.Item>
              <Descriptions.Item label="طريقة الدفع">
                {selectedPayment.method === 'card' ? 'بطاقة ائتمان' :
                 selectedPayment.method === 'cash' ? 'نقداً' :
                 selectedPayment.method === 'wallet' ? 'محفظة إلكترونية' :
                 selectedPayment.method === 'bank' ? 'تحويل بنكي' : selectedPayment.method}
              </Descriptions.Item>
              <Descriptions.Item label="الحالة">
                <Tag color={selectedPayment.status === 'completed' ? 'green' : 'orange'}>
                  {selectedPayment.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="الفرع">
                {branches.find(b => b.id === selectedPayment.branchId)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="التاريخ">
                {new Date(selectedPayment.createdAt).toLocaleDateString('ar-SA')}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Timeline>
              <Timeline.Item color="green">
                <Text>تم إنشاء العملية</Text>
                <br />
                <Text type="secondary">{new Date(selectedPayment.createdAt).toLocaleString('ar-SA')}</Text>
              </Timeline.Item>
              {selectedPayment.status === 'completed' && (
                <Timeline.Item color="green">
                  <Text>تم تأكيد الدفع</Text>
                  <br />
                  <Text type="secondary">{selectedPayment.completedAt ? new Date(selectedPayment.completedAt).toLocaleString('ar-SA') : '-'}</Text>
                </Timeline.Item>
              )}
              {selectedPayment.status === 'refunded' && (
                <Timeline.Item color="red">
                  <Text>تم استرداد المبلغ</Text>
                  <br />
                  <Text type="secondary">{selectedPayment.refundedAt ? new Date(selectedPayment.refundedAt).toLocaleString('ar-SA') : '-'}</Text>
                </Timeline.Item>
              )}
            </Timeline>
          </div>
        ) : null}
      </Modal>
    </Layout>
  );
};

export default Payments; 