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
  InputNumber,
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
  ColorPicker
} from 'antd';
import {
  StarOutlined,
  TrophyOutlined,
  GiftOutlined,
  UserOutlined,
  DollarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExportOutlined,
  ReloadOutlined,
  CrownOutlined,
  GiftFilled
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { getLoyaltyPrograms, getUsersData, getOrders } from '../data/mockData';
import { useToast } from '../utils/toastService';

const { Title, Text } = Typography;
// تم إزالة Option لأنه لم يعد مستخدماً في Ant Design v5
// تم إزالة TabPane لأنه لم يعد مستخدماً في Ant Design v5

const LoyaltyPrograms = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loyaltyPrograms, setLoyaltyPrograms] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [loyaltyData, usersData, ordersData] = await Promise.all([
        getLoyaltyPrograms(),
        getUsersData(),
        getOrders()
      ]);
      setLoyaltyPrograms(loyaltyData);
      setUsers(usersData);
      setOrders(ordersData);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // إحصائيات الولاء
  const getLoyaltyStats = () => {
    const totalUsers = users.filter(u => u.role === 'customer').length;
    const activeUsers = users.filter(u => u.role === 'customer' && u.loyaltyPoints > 0).length;
    const totalPoints = users.reduce((sum, u) => sum + (u.loyaltyPoints || 0), 0);
    const averagePoints = totalUsers > 0 ? (totalPoints / totalUsers).toFixed(0) : 0;
    const totalRedemptions = orders.filter(o => o.loyaltyPointsEarned > 0).length;
    const totalRewardsValue = orders.reduce((sum, o) => sum + (o.loyaltyPointsEarned || 0), 0) * 0.01; // 1 نقطة = 0.01 ريال

    return {
      totalUsers,
      activeUsers,
      totalPoints,
      averagePoints,
      totalRedemptions,
      totalRewardsValue
    };
  };

  const stats = getLoyaltyStats();

  // أعمدة جدول برامج الولاء
  const programColumns = [
    {
      title: 'اسم البرنامج',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <CrownOutlined style={{ color: '#FFD700' }} />
          <div>
            <div>{name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.description}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'النقاط لكل ريال',
      dataIndex: 'pointsPerRiyal',
      key: 'pointsPerRiyal',
      render: (points) => (
        <Tag color="blue">{points} نقطة</Tag>
      )
    },
    {
      title: 'معدل الاستبدال',
      dataIndex: 'redemptionRate',
      key: 'redemptionRate',
      render: (rate) => (
        <Text>{(rate * 100).toFixed(1)}%</Text>
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'نشط' : 'غير نشط'}
        </Tag>
      )
    },
    {
      title: 'عدد المستويات',
      dataIndex: 'tiers',
      key: 'tiers',
      render: (tiers) => tiers?.length || 0
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
              onClick={() => showProgramDetails(record)}
            />
          </Tooltip>
          <Tooltip title="تعديل">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => editProgram(record)}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteProgram(record.id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  // أعمدة جدول المستخدمين
  const userColumns = [
    {
      title: 'المستخدم',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <Avatar src={record.avatar} size="small">
            {name?.charAt(0)}
          </Avatar>
          <div>
            <div>{name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.phone}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'النقاط الحالية',
      dataIndex: 'loyaltyPoints',
      key: 'loyaltyPoints',
      render: (points) => (
        <Space>
          <StarOutlined style={{ color: '#FFD700' }} />
          <Text strong>{points || 0}</Text>
        </Space>
      )
    },
    {
      title: 'المستوى',
      key: 'tier',
      render: (_, record) => {
        const points = record.loyaltyPoints || 0;
        let tier = 'برونزي';
        let color = '#CD7F32';
        
        if (points >= 10000) {
          tier = 'بلاتيني';
          color = '#E5E4E2';
        } else if (points >= 5000) {
          tier = 'ذهبي';
          color = '#FFD700';
        } else if (points >= 1000) {
          tier = 'فضي';
          color = '#C0C0C0';
        }
        
        return <Tag color={color}>{tier}</Tag>;
      }
    },
    {
      title: 'قيمة النقاط',
      key: 'pointsValue',
      render: (_, record) => {
        const points = record.loyaltyPoints || 0;
        const value = points * 0.01; // 1 نقطة = 0.01 ريال
        return (
          <Space>
            <DollarOutlined style={{ color: '#52c41a' }} />
            <Text strong>{value.toFixed(2)} ريال</Text>
          </Space>
        );
      }
    },
    {
      title: 'آخر نشاط',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date) => date ? new Date(date).toLocaleDateString('ar-SA') : '-'
    }
  ];

  const showProgramDetails = (program) => {
    setSelectedProgram(program);
    setModalVisible(true);
  };

  const editProgram = (program) => {
    setSelectedProgram(program);
    form.setFieldsValue({
      name: program.name,
      description: program.description,
      pointsPerRiyal: program.pointsPerRiyal,
      redemptionRate: program.redemptionRate,
      status: program.status
    });
    setModalVisible(true);
  };

  const deleteProgram = async (id) => {
    try {
      setLoyaltyPrograms(loyaltyPrograms.filter(p => p.id !== id));
      toast.success('تم حذف البرنامج بنجاح');
    } catch (error) {
      toast.error('خطأ في حذف البرنامج');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedProgram) {
        const updatedPrograms = loyaltyPrograms.map(p =>
          p.id === selectedProgram.id ? { ...p, ...values } : p
        );
        setLoyaltyPrograms(updatedPrograms);
        toast.success('تم تحديث البرنامج بنجاح');
      }
      setModalVisible(false);
      setSelectedProgram(null);
      form.resetFields();
    } catch (error) {
      toast.error('خطأ في حفظ البيانات');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedProgram(null);
    form.resetFields();
  };

  const exportData = () => {
    toast.success('تم تصدير البيانات بنجاح');
  };

  const customerUsers = users.filter(u => u.role === 'customer');

  return (
    <Layout style={{ padding: '24px', background: '#f5f6fa' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <StarOutlined style={{ marginRight: 8 }} />
          برامج الولاء
        </Title>
        <Text type="secondary">
          إدارة نظام النقاط والمكافآت للعملاء
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي العملاء"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="العملاء النشطون"
              value={stats.activeUsers}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي النقاط"
              value={stats.totalPoints}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="متوسط النقاط"
              value={stats.averagePoints}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي الاستبدالات"
              value={stats.totalRedemptions}
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="قيمة المكافآت"
              value={stats.totalRewardsValue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="ريال"
            />
          </Card>
        </Col>
      </Row>

      {/* معلومات سريعة */}
      <Alert
        message="معلومات مهمة"
        description="يحصل العميل على نقاط ولاء مقابل كل ريال ينفقه، ويمكن استبدال النقاط بخصومات أو خدمات مجانية."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* التبويبات */}
      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: '1',
              label: 'برامج الولاء',
              children: (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <Space>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setModalVisible(true)}
                      >
                        إضافة برنامج جديد
                      </Button>
                      <Button
                        icon={<ExportOutlined />}
                        onClick={exportData}
                      >
                        تصدير البيانات
                      </Button>
                      <Button
                        icon={<ReloadOutlined />}
                        onClick={fetchData}
                        loading={loading}
                      >
                        تحديث
                      </Button>
                    </Space>
                  </div>
                  
                  <Table
                    columns={programColumns}
                    dataSource={loyaltyPrograms}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                      total: loyaltyPrograms.length,
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} من ${total} برنامج`
                    }}
                  />
                </>
              )
            },
            {
              key: '2',
              label: 'العملاء والنقاط',
              children: (
                <Table
                  columns={userColumns}
                  dataSource={customerUsers}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    total: customerUsers.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} من ${total} عميل`
                  }}
                />
              )
            },
            {
              key: '3',
              label: 'المكافآت المتاحة',
              children: (
                <Row gutter={16}>
                  {loyaltyPrograms[0]?.rewards?.map((reward, index) => (
                    <Col span={8} key={index}>
                      <Card
                        hoverable
                        style={{ marginBottom: 16 }}
                        cover={
                          <div style={{ 
                            height: 120, 
                            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <GiftFilled style={{ fontSize: 48, color: 'white' }} />
                          </div>
                        }
                      >
                        <Card.Meta
                          title={reward.name}
                          description={
                            <div>
                              <Text>{reward.description}</Text>
                              <br />
                              <Text strong style={{ color: '#52c41a' }}>
                                {reward.pointsRequired} نقطة مطلوبة
                              </Text>
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              )
            }
          ]}
        />
      </Card>

      {/* Modal إضافة/تعديل البرنامج */}
      <Modal
        title={selectedProgram ? "تعديل برنامج الولاء" : "إضافة برنامج جديد"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="اسم البرنامج"
            rules={[{ required: true, message: 'يرجى إدخال اسم البرنامج' }]}
          >
            <Input placeholder="مثال: برنامج الولاء الذهبي" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="وصف البرنامج"
            rules={[{ required: true, message: 'يرجى إدخال وصف البرنامج' }]}
          >
            <Input.TextArea rows={3} placeholder="وصف مختصر للبرنامج" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pointsPerRiyal"
                label="النقاط لكل ريال"
                rules={[{ required: true, message: 'يرجى إدخال عدد النقاط' }]}
              >
                <InputNumber
                  min={0}
                  max={10}
                  style={{ width: '100%' }}
                  placeholder="1"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="redemptionRate"
                label="معدل الاستبدال"
                rules={[{ required: true, message: 'يرجى إدخال معدل الاستبدال' }]}
              >
                <InputNumber
                  min={0}
                  max={1}
                  step={0.01}
                  style={{ width: '100%' }}
                  placeholder="0.01"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="status"
            label="حالة البرنامج"
            rules={[{ required: true, message: 'يرجى اختيار حالة البرنامج' }]}
          >
            <Select>
              <Select.Option value="active">نشط</Select.Option>
              <Select.Option value="inactive">غير نشط</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default LoyaltyPrograms; 