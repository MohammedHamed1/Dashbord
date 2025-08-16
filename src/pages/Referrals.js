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
  Badge,
  Progress,
  Alert,
  Divider,
  Avatar,
  List,
  Descriptions
} from 'antd';
import {
  ShareAltOutlined,
  UserAddOutlined,
  TrophyOutlined,
  DollarOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
  SnapchatOutlined,
  CopyOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExportOutlined,
  FilterOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { getReferrals, getUsersData, getOrders } from '../data/mockData';
import { useToast } from '../utils/toastService';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Referrals = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    status: 'all',
    platform: 'all',
    dateRange: null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [referralsData, usersData, ordersData] = await Promise.all([
        getReferrals(),
        getUsersData(),
        getOrders()
      ]);
      setReferrals(referralsData);
      setUsers(usersData);
      setOrders(ordersData);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // إحصائيات الدعوات
  const getReferralStats = () => {
    const totalReferrals = referrals.length;
    const completedReferrals = referrals.filter(r => r.status === 'completed').length;
    const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
    const totalRewards = referrals.reduce((sum, r) => sum + (r.reward || 0), 0);
    const conversionRate = totalReferrals > 0 ? (completedReferrals / totalReferrals * 100).toFixed(1) : 0;

    return {
      totalReferrals,
      completedReferrals,
      pendingReferrals,
      totalRewards,
      conversionRate
    };
  };

  const stats = getReferralStats();

  // أعمدة الجدول
  const columns = [
    {
      title: 'المدعو',
      dataIndex: 'referredId',
      key: 'referredId',
      render: (referredId) => {
        const user = users.find(u => u.id === referredId);
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
      title: 'المدعو إليه',
      dataIndex: 'referrerId',
      key: 'referrerId',
      render: (referrerId) => {
        const user = users.find(u => u.id === referrerId);
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
      title: 'المنصة',
      dataIndex: 'platform',
      key: 'platform',
      render: (platform) => {
        const platformIcons = {
          whatsapp: <WhatsAppOutlined style={{ color: '#25D366' }} />,
          instagram: <InstagramOutlined style={{ color: '#E4405F' }} />,
          snapchat: <InstagramOutlined style={{ color: '#FFFC00' }} />
        };
        return (
          <Space>
            {platformIcons[platform]}
            <Text style={{ textTransform: 'capitalize' }}>
              {platform === 'whatsapp' ? 'واتساب' : 
               platform === 'instagram' ? 'انستغرام' : 
               platform === 'snapchat' ? 'سناب شات' : platform}
            </Text>
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
          pending: { color: 'orange', text: 'قيد الانتظار' },
          completed: { color: 'green', text: 'مكتمل' },
          cancelled: { color: 'red', text: 'ملغي' }
        };
        const config = statusConfig[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: 'المكافأة',
      dataIndex: 'reward',
      key: 'reward',
      render: (reward, record) => (
        <Space>
          <DollarOutlined style={{ color: '#52c41a' }} />
          <Text strong>{reward} ريال</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.rewardType === 'free_wash' ? '(غسلة مجانية)' : '(خصم)'}
          </Text>
        </Space>
      )
    },
    {
      title: 'تاريخ الدعوة',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('ar-SA')
    },
    {
      title: 'تاريخ الإكمال',
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: (date) => date ? new Date(date).toLocaleDateString('ar-SA') : '-'
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
              onClick={() => showReferralDetails(record)}
            />
          </Tooltip>
          <Tooltip title="تعديل">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => editReferral(record)}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteReferral(record.id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const showReferralDetails = (referral) => {
    setSelectedReferral(referral);
    setModalVisible(true);
  };

  const editReferral = (referral) => {
    setSelectedReferral(referral);
    form.setFieldsValue({
      status: referral.status,
      reward: referral.reward,
      rewardType: referral.rewardType
    });
    setModalVisible(true);
  };

  const deleteReferral = async (id) => {
    try {
      // هنا سيتم إرسال طلب حذف للـ API
      setReferrals(referrals.filter(r => r.id !== id));
      toast.success('تم حذف الدعوة بنجاح');
    } catch (error) {
      toast.error('خطأ في حذف الدعوة');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedReferral) {
        // تحديث الدعوة
        const updatedReferrals = referrals.map(r =>
          r.id === selectedReferral.id ? { ...r, ...values } : r
        );
        setReferrals(updatedReferrals);
        toast.success('تم تحديث الدعوة بنجاح');
      }
      setModalVisible(false);
      setSelectedReferral(null);
      form.resetFields();
    } catch (error) {
      toast.error('خطأ في حفظ البيانات');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedReferral(null);
    form.resetFields();
  };

  const copyReferralCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('تم نسخ كود الدعوة');
  };

  const exportData = () => {
    // تصدير البيانات إلى Excel
    toast.success('تم تصدير البيانات بنجاح');
  };

  const filteredReferrals = referrals.filter(referral => {
    if (filters.status !== 'all' && referral.status !== filters.status) return false;
    if (filters.platform !== 'all' && referral.platform !== filters.platform) return false;
    if (filters.dateRange) {
      const referralDate = new Date(referral.createdAt);
      const [start, end] = filters.dateRange;
      if (referralDate < start || referralDate > end) return false;
    }
    return true;
  });

  return (
    <Layout style={{ padding: '24px', background: '#f5f6fa' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <ShareAltOutlined style={{ marginRight: 8 }} />
          نظام الدعوات
        </Title>
        <Text type="secondary">
          إدارة دعوات الأصدقاء ومتابعة المكافآت
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي الدعوات"
              value={stats.totalReferrals}
              prefix={<ShareAltOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="الدعوات المكتملة"
              value={stats.completedReferrals}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="قيد الانتظار"
              value={stats.pendingReferrals}
              prefix={<UserAddOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي المكافآت"
              value={stats.totalRewards}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="ريال"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="معدل التحويل"
              value={stats.conversionRate}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
            <Progress
              percent={parseFloat(stats.conversionRate)}
              size="small"
              strokeColor="#722ed1"
              showInfo={false}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="المكافأة لكل دعوة"
              value={(stats.totalRewards / stats.totalReferrals || 0).toFixed(0)}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#eb2f96' }}
              suffix="ريال"
            />
          </Card>
        </Col>
      </Row>

      {/* معلومات سريعة */}
      <Alert
        message="معلومات مهمة"
        description="يحصل المدعو على غسلة مجانية عند دعوة صديق عبر Instagram أو Snapchat أو WhatsApp، إذا اشترى المدعو باقة."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* أدوات التحكم */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Select
              placeholder="حالة الدعوة"
              style={{ width: '100%' }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="all">جميع الحالات</Option>
              <Option value="pending">قيد الانتظار</Option>
              <Option value="completed">مكتمل</Option>
              <Option value="cancelled">ملغي</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="المنصة"
              style={{ width: '100%' }}
              value={filters.platform}
              onChange={(value) => setFilters({ ...filters, platform: value })}
            >
              <Option value="all">جميع المنصات</Option>
              <Option value="whatsapp">واتساب</Option>
              <Option value="instagram">انستغرام</Option>
              <Option value="snapchat">سناب شات</Option>
            </Select>
          </Col>
          <Col span={6}>
            <RangePicker
              placeholder={['من تاريخ', 'إلى تاريخ']}
              style={{ width: '100%' }}
              onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
            />
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

      {/* جدول الدعوات */}
      <Card title="قائمة الدعوات">
        <Table
          columns={columns}
          dataSource={filteredReferrals}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredReferrals.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} دعوة`
          }}
        />
      </Card>

      {/* Modal تفاصيل الدعوة */}
      <Modal
        title="تفاصيل الدعوة"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        {selectedReferral ? (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="كود الدعوة" span={2}>
                <Space>
                  <Text code>{selectedReferral.referrerCode}</Text>
                  <Button
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => copyReferralCode(selectedReferral.referrerCode)}
                  >
                    نسخ
                  </Button>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="المنصة">
                {selectedReferral.platform === 'whatsapp' ? 'واتساب' : 
                 selectedReferral.platform === 'instagram' ? 'انستغرام' : 
                 selectedReferral.platform === 'snapchat' ? 'سناب شات' : selectedReferral.platform}
              </Descriptions.Item>
              <Descriptions.Item label="المكافأة">
                {selectedReferral.reward} ريال
              </Descriptions.Item>
              <Descriptions.Item label="نوع المكافأة">
                {selectedReferral.rewardType === 'free_wash' ? 'غسلة مجانية' : 'خصم'}
              </Descriptions.Item>
              <Descriptions.Item label="الحالة">
                <Tag color={selectedReferral.status === 'completed' ? 'green' : 'orange'}>
                  {selectedReferral.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="تاريخ الدعوة">
                {new Date(selectedReferral.createdAt).toLocaleDateString('ar-SA')}
              </Descriptions.Item>
              {selectedReferral.completedAt && (
                <Descriptions.Item label="تاريخ الإكمال">
                  {new Date(selectedReferral.completedAt).toLocaleDateString('ar-SA')}
                </Descriptions.Item>
              )}
            </Descriptions>

            <Divider />

            <Form form={form} layout="vertical">
              <Form.Item
                name="status"
                label="تغيير الحالة"
              >
                <Select>
                  <Option value="pending">قيد الانتظار</Option>
                  <Option value="completed">مكتمل</Option>
                  <Option value="cancelled">ملغي</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="reward"
                label="المكافأة"
              >
                <Input type="number" suffix="ريال" />
              </Form.Item>
              <Form.Item
                name="rewardType"
                label="نوع المكافأة"
              >
                <Select>
                  <Option value="free_wash">غسلة مجانية</Option>
                  <Option value="discount">خصم</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        ) : null}
      </Modal>
    </Layout>
  );
};

export default Referrals; 