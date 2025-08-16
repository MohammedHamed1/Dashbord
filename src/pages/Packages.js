import React, { useState, useEffect, useCallback } from 'react';
import {
  Layout,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
  message,
  Typography,
  Row,
  Col
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
  GiftOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { useRoleGuard } from '../components/RoleGuard';
import { getPackages } from '../data/mockData';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Packages = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'laundry']);
  
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [form] = Form.useForm();
  
  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPackages();
      setPackages(data);
    } catch (error) {
      message.error('فشل في تحميل بيانات الباقات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) {
      fetchPackages();
    }
  }, [allowed, fetchPackages]);

  if (!allowed) return <div>غير مصرح لك بالوصول لهذه الصفحة</div>;

  const handleAdd = () => {
    setEditingPackage(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingPackage(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setPackages(packages.filter(pkg => pkg.id !== id));
      message.success('تم حذف الباقة بنجاح');
    } catch (error) {
      message.error('خطأ في حذف الباقة');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingPackage) {
        const updatedPackage = { ...editingPackage, ...values };
        setPackages(packages.map(pkg => pkg.id === editingPackage.id ? updatedPackage : pkg));
        message.success('تم تحديث الباقة بنجاح');
      } else {
        const newPackage = {
          id: Date.now(),
          ...values,
          status: 'active',
          laundryId: 1,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setPackages([...packages, newPackage]);
        message.success('تم إضافة الباقة بنجاح');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('خطأ في حفظ البيانات');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'green',
      inactive: 'red',
      expired: 'orange'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      active: 'نشط',
      inactive: 'غير نشط',
      expired: 'منتهي الصلاحية'
    };
    return texts[status] || status;
  };

  const columns = [
    {
      title: 'اسم الباقة',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'الوصف',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'السعر',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) => (
        <div>
          <span style={{ color: '#52c41a', fontWeight: 'bold', fontSize: 16 }}>
            {price} ريال
          </span>
          {record.originalPrice && record.originalPrice > price && (
            <div>
              <span style={{ textDecoration: 'line-through', color: '#999', fontSize: 12 }}>
                {record.originalPrice} ريال
              </span>
              <div style={{ color: '#ff4d4f', fontSize: 12, fontWeight: 'bold' }}>
                خصم {Math.round(((record.originalPrice - price) / record.originalPrice) * 100)}%
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'عدد الغسلات',
      dataIndex: 'washes',
      key: 'washes',
      render: (washes) => (
        <Tag color="blue" icon={<GiftOutlined />}>
          {washes} غسلة
        </Tag>
      ),
    },
    {
      title: 'مدة الصلاحية',
      dataIndex: 'validityDays',
      key: 'validityDays',
      render: (days) => `${days} يوم`,
    },
    {
      title: 'التقييم',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating, record) => (
        <div>
          <div>
            <StarOutlined style={{ color: '#faad14' }} /> {rating}/5
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            ({record.totalRatings} تقييم)
          </div>
        </div>
      ),
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            تعديل
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            حذف
          </Button>
        </Space>
      ),
    },
  ];

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchText.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Card
          title="إدارة الباقات"
          extra={
            <Space>
              <Input.Search
                placeholder="البحث في الباقات..."
                allowClear
                style={{ width: 300 }}
                onSearch={setSearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                إضافة باقة جديدة
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredPackages}
            loading={loading}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} من ${total} باقة`,
            }}
          />
        </Card>

        <Modal
          title={editingPackage ? 'تعديل الباقة' : 'إضافة باقة جديدة'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="اسم الباقة"
                  rules={[{ required: true, message: 'يرجى إدخال اسم الباقة' }]}
                >
                  <Input prefix={<GiftOutlined />} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="السعر"
                  rules={[{ required: true, message: 'يرجى إدخال السعر' }]}
                >
                  <Input type="number" prefix={<DollarOutlined />} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="originalPrice"
                  label="السعر الأصلي"
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="washes"
                  label="عدد الغسلات"
                  rules={[{ required: true, message: 'يرجى إدخال عدد الغسلات' }]}
                >
                  <Input type="number" min={1} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="validityDays"
                  label="مدة الصلاحية (بالأيام)"
                  rules={[{ required: true, message: 'يرجى إدخال مدة الصلاحية' }]}
                >
                  <Input type="number" min={1} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label="الحالة"
                  rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
                >
                  <Select>
                    <Option value="active">نشط</Option>
                    <Option value="inactive">غير نشط</Option>
                    <Option value="expired">منتهي الصلاحية</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="الوصف"
              rules={[{ required: true, message: 'يرجى إدخال الوصف' }]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="features"
              label="المميزات"
            >
              <TextArea rows={3} placeholder="أدخل مميزات الباقة..." />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setIsModalVisible(false)}>
                  إلغاء
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingPackage ? 'تحديث' : 'إضافة'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Packages; 