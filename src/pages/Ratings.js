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
  Rate,
  Tooltip,
  Progress,
  Alert,
  Divider,
  Avatar,
  List,
  Descriptions,
  Tabs,
  Badge,
  Comment,
  Rate as AntRate
} from 'antd';
import {
  StarOutlined,
  StarFilled,
  MessageOutlined,
  LikeOutlined,
  DislikeOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  ReloadOutlined,
  FilterOutlined,
  TrophyOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { getRatings, getUsersData, getOrders, getBranches } from '../data/mockData';
import { useToast } from '../utils/toastService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const Ratings = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    rating: 'all',
    category: 'all',
    branch: 'all',
    dateRange: null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ratingsData, usersData, ordersData, branchesData] = await Promise.all([
        getRatings(),
        getUsersData(),
        getOrders(),
        getBranches()
      ]);
      setRatings(ratingsData);
      setUsers(usersData);
      setOrders(ordersData);
      setBranches(branchesData);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // إحصائيات التقييمات
  const getRatingStats = () => {
    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0 
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(1)
      : 0;
    
    const ratingDistribution = {
      5: ratings.filter(r => r.rating === 5).length,
      4: ratings.filter(r => r.rating === 4).length,
      3: ratings.filter(r => r.rating === 3).length,
      2: ratings.filter(r => r.rating === 2).length,
      1: ratings.filter(r => r.rating === 1).length
    };

    const positiveRatings = ratingDistribution[5] + ratingDistribution[4];
    const neutralRatings = ratingDistribution[3];
    const negativeRatings = ratingDistribution[2] + ratingDistribution[1];
    
    const satisfactionRate = totalRatings > 0 ? (positiveRatings / totalRatings * 100).toFixed(1) : 0;

    return {
      totalRatings,
      averageRating,
      ratingDistribution,
      positiveRatings,
      neutralRatings,
      negativeRatings,
      satisfactionRate
    };
  };

  const stats = getRatingStats();

  // أعمدة الجدول
  const columns = [
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
        <Tag color="blue">#{orderId}</Tag>
      )
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
      title: 'التقييم',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Space>
          <AntRate disabled defaultValue={rating} />
          <Text strong>{rating}/5</Text>
        </Space>
      )
    },
    {
      title: 'الفئة',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryNames = {
          service_quality: 'جودة الخدمة',
          delivery: 'التوصيل',
          cleanliness: 'النظافة',
          speed: 'السرعة',
          price: 'السعر'
        };
        return <Tag color="purple">{categoryNames[category] || category}</Tag>;
      }
    },
    {
      title: 'التعليق',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment) => (
        <Text ellipsis={{ tooltip: comment }}>
          {comment?.substring(0, 50)}...
        </Text>
      )
    },
    {
      title: 'الرد',
      dataIndex: 'response',
      key: 'response',
      render: (response) => (
        response ? (
          <Tag color="green">تم الرد</Tag>
        ) : (
          <Tag color="orange">في انتظار الرد</Tag>
        )
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
              onClick={() => showRatingDetails(record)}
            />
          </Tooltip>
          <Tooltip title="الرد على التقييم">
            <Button
              type="text"
              icon={<MessageOutlined />}
              onClick={() => respondToRating(record)}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteRating(record.id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const showRatingDetails = (rating) => {
    setSelectedRating(rating);
    setModalVisible(true);
  };

  const respondToRating = (rating) => {
    setSelectedRating(rating);
    form.setFieldsValue({
      response: rating.response || ''
    });
    setModalVisible(true);
  };

  const deleteRating = async (id) => {
    try {
      setRatings(ratings.filter(r => r.id !== id));
      toast.success('تم حذف التقييم بنجاح');
    } catch (error) {
      toast.error('خطأ في حذف التقييم');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedRating) {
        const updatedRatings = ratings.map(r =>
          r.id === selectedRating.id ? { 
            ...r, 
            response: values.response,
            responseAt: new Date().toISOString(),
            responseBy: 1 // ID of current user
          } : r
        );
        setRatings(updatedRatings);
        toast.success('تم الرد على التقييم بنجاح');
      }
      setModalVisible(false);
      setSelectedRating(null);
      form.resetFields();
    } catch (error) {
      toast.error('خطأ في حفظ البيانات');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedRating(null);
    form.resetFields();
  };

  const exportData = () => {
    toast.success('تم تصدير البيانات بنجاح');
  };

  const filteredRatings = ratings.filter(rating => {
    if (filters.rating !== 'all' && rating.rating !== parseInt(filters.rating)) return false;
    if (filters.category !== 'all' && rating.category !== filters.category) return false;
    if (filters.branch !== 'all' && rating.branchId !== parseInt(filters.branch)) return false;
    if (filters.dateRange) {
      const ratingDate = new Date(rating.createdAt);
      const [start, end] = filters.dateRange;
      if (ratingDate < start || ratingDate > end) return false;
    }
    return true;
  });

  const getRatingIcon = (rating) => {
    if (rating >= 4) return <SmileOutlined style={{ color: '#52c41a' }} />;
    if (rating >= 3) return <MehOutlined style={{ color: '#faad14' }} />;
    return <FrownOutlined style={{ color: '#ff4d4f' }} />;
  };

  return (
    <Layout style={{ padding: '24px', background: '#f5f6fa' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <StarOutlined style={{ marginRight: 8 }} />
          التقييمات والمراجعات
        </Title>
        <Text type="secondary">
          إدارة تقييمات العملاء وتحليل رضاهم
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي التقييمات"
              value={stats.totalRatings}
              prefix={<StarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="متوسط التقييم"
              value={stats.averageRating}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="/5"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="معدل الرضا"
              value={stats.satisfactionRate}
              prefix={<SmileOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="تقييمات إيجابية"
              value={stats.positiveRatings}
              prefix={<SmileOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="تقييمات محايدة"
              value={stats.neutralRatings}
              prefix={<MehOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="تقييمات سلبية"
              value={stats.negativeRatings}
              prefix={<FrownOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* توزيع التقييمات */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="توزيع التقييمات">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} style={{ marginBottom: 8 }}>
                <Space>
                  <Text>{stars} نجوم</Text>
                  <Progress
                    percent={stats.totalRatings > 0 ? (stats.ratingDistribution[stars] / stats.totalRatings * 100).toFixed(1) : 0}
                    size="small"
                    strokeColor={stars >= 4 ? '#52c41a' : stars >= 3 ? '#faad14' : '#ff4d4f'}
                    showInfo={false}
                    style={{ width: 200 }}
                  />
                  <Text>{stats.ratingDistribution[stars]}</Text>
                </Space>
              </div>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="أحدث التقييمات">
            <List
              size="small"
              dataSource={ratings.slice(0, 5)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={users.find(u => u.id === item.customerId)?.avatar}>
                        {users.find(u => u.id === item.customerId)?.name?.charAt(0)}
                      </Avatar>
                    }
                    title={
                      <Space>
                        <Text>{users.find(u => u.id === item.customerId)?.name}</Text>
                        <AntRate disabled defaultValue={item.rating} size="small" />
                      </Space>
                    }
                    description={
                      <Text ellipsis={{ tooltip: item.comment }}>
                        {item.comment}
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
        description="يتم إرسال إشعار للعميل بعد 30 دقيقة من تسليم الغسلة لتقييم الخدمة. يمكن الرد على التقييمات لتحسين تجربة العملاء."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* أدوات التحكم */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={4}>
            <Select
              placeholder="التقييم"
              style={{ width: '100%' }}
              value={filters.rating}
              onChange={(value) => setFilters({ ...filters, rating: value })}
            >
              <Option value="all">جميع التقييمات</Option>
              <Option value="5">5 نجوم</Option>
              <Option value="4">4 نجوم</Option>
              <Option value="3">3 نجوم</Option>
              <Option value="2">2 نجوم</Option>
              <Option value="1">1 نجمة</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="الفئة"
              style={{ width: '100%' }}
              value={filters.category}
              onChange={(value) => setFilters({ ...filters, category: value })}
            >
              <Option value="all">جميع الفئات</Option>
              <Option value="service_quality">جودة الخدمة</Option>
              <Option value="delivery">التوصيل</Option>
              <Option value="cleanliness">النظافة</Option>
              <Option value="speed">السرعة</Option>
              <Option value="price">السعر</Option>
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

      {/* جدول التقييمات */}
      <Card title="قائمة التقييمات">
        <Table
          columns={columns}
          dataSource={filteredRatings}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredRatings.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} تقييم`
          }}
        />
      </Card>

      {/* Modal تفاصيل التقييم */}
      <Modal
        title="تفاصيل التقييم"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        {selectedRating ? (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="العميل" span={2}>
                <Space>
                  <Avatar src={users.find(u => u.id === selectedRating.customerId)?.avatar}>
                    {users.find(u => u.id === selectedRating.customerId)?.name?.charAt(0)}
                  </Avatar>
                  <Text>{users.find(u => u.id === selectedRating.customerId)?.name}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="رقم الطلب">
                #{selectedRating.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="الفرع">
                {branches.find(b => b.id === selectedRating.branchId)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="التقييم">
                <Space>
                  <AntRate disabled defaultValue={selectedRating.rating} />
                  <Text strong>{selectedRating.rating}/5</Text>
                  {getRatingIcon(selectedRating.rating)}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="الفئة">
                <Tag color="purple">
                  {selectedRating.category === 'service_quality' ? 'جودة الخدمة' :
                   selectedRating.category === 'delivery' ? 'التوصيل' :
                   selectedRating.category === 'cleanliness' ? 'النظافة' :
                   selectedRating.category === 'speed' ? 'السرعة' :
                   selectedRating.category === 'price' ? 'السعر' : selectedRating.category}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="التاريخ">
                {new Date(selectedRating.createdAt).toLocaleDateString('ar-SA')}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ marginBottom: 16 }}>
              <Text strong>تعليق العميل:</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {selectedRating.comment}
              </Paragraph>
            </div>

            {selectedRating.response && (
              <div style={{ marginBottom: 16 }}>
                <Text strong>الرد:</Text>
                <Paragraph style={{ marginTop: 8 }}>
                  {selectedRating.response}
                </Paragraph>
              </div>
            )}

            <Divider />

            <Form form={form} layout="vertical">
              <Form.Item
                name="response"
                label="الرد على التقييم"
              >
                <TextArea
                  rows={4}
                  placeholder="اكتب ردك على تقييم العميل..."
                />
              </Form.Item>
            </Form>
          </div>
        ) : null}
      </Modal>
    </Layout>
  );
};

export default Ratings; 