import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Space,
  Tag,
  Row,
  Col,
  Switch,
  Typography,
  message
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { useRoleGuard } from '../components/RoleGuard';
import { getBranches } from '../data/mockData';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Branches = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'laundry']);
  
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (allowed) {
      fetchBranches();
    }
  }, [allowed]);

  if (!allowed) return <div>غير مصرح لك بالوصول لهذه الصفحة</div>;

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await getBranches();
      setBranches(data);
    } catch (error) {
      message.error('فشل في تحميل بيانات الفروع');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingBranch(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingBranch(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setBranches(branches.filter(branch => branch.id !== id));
      message.success('تم حذف الفرع بنجاح');
    } catch (error) {
      message.error('فشل في حذف الفرع');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingBranch) {
        const updatedBranch = { ...editingBranch, ...values };
        setBranches(branches.map(branch => branch.id === editingBranch.id ? updatedBranch : branch));
        message.success('تم تحديث الفرع بنجاح');
      } else {
        const newBranch = {
          id: Date.now(),
          ...values,
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0]
        };
        setBranches([...branches, newBranch]);
        message.success('تم إضافة الفرع بنجاح');
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('فشل في حفظ الفرع');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'green',
      inactive: 'red',
      maintenance: 'orange'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      active: 'نشط',
      inactive: 'غير نشط',
      maintenance: 'صيانة'
    };
    return texts[status] || status;
  };

  const columns = [
    {
      title: 'اسم الفرع',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'العنوان',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'رقم الهاتف',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'البريد الإلكتروني',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'السعة',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity) => `${capacity} سيارة/يوم`,
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

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Card
          title="إدارة الفروع"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              إضافة فرع جديد
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={branches}
            loading={loading}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} من ${total} فرع`,
            }}
          />
        </Card>

        <Modal
          title={editingBranch ? 'تعديل الفرع' : 'إضافة فرع جديد'}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
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
                  label="اسم الفرع"
                  rules={[{ required: true, message: 'يرجى إدخال اسم الفرع' }]}
                >
                  <Input prefix={<EnvironmentOutlined />} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="رقم الهاتف"
                  rules={[{ required: true, message: 'يرجى إدخال رقم الهاتف' }]}
                >
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="البريد الإلكتروني"
                  rules={[
                    { required: true, message: 'يرجى إدخال البريد الإلكتروني' },
                    { type: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="capacity"
                  label="السعة"
                  rules={[{ required: true, message: 'يرجى إدخال السعة' }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="العنوان"
              rules={[{ required: true, message: 'يرجى إدخال العنوان' }]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="status"
              label="الحالة"
              rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
            >
              <Select>
                <Option value="active">نشط</Option>
                <Option value="inactive">غير نشط</Option>
                <Option value="maintenance">صيانة</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="services"
              label="الخدمات"
              rules={[{ required: true, message: 'يرجى اختيار الخدمات' }]}
              initialValue={["interior_exterior_wash"]}
            >
              <Select mode="multiple" disabled>
                <Option value="interior_exterior_wash">غسيل داخلي وخارجي</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="paymentMethods"
              label="طرق الدفع"
              rules={[{ required: true, message: 'يرجى اختيار طرق الدفع' }]}
            >
              <Select mode="multiple">
                <Option value="cash">نقداً</Option>
                <Option value="card">بطاقة ائتمان</Option>
                <Option value="apple_pay">Apple Pay</Option>
                <Option value="mada">مدى</Option>
                <Option value="stc_pay">STC Pay</Option>
                <Option value="hyperpay">HyperPay</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="images"
              label="الصور"
            >
              <Upload
                listType="picture-card"
                maxCount={5}
                beforeUpload={() => false}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>رفع</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setModalVisible(false)}>
                  إلغاء
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingBranch ? 'تحديث' : 'إضافة'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Branches; 