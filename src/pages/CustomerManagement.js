import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message,
  Popconfirm,
  Card,
  Tag,
  Descriptions,
  Badge,
  InputNumber,
  Typography,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CarOutlined,
  StarOutlined
} from '@ant-design/icons';
import { getUsersData, createUser, updateUser } from '../data/mockData';
import { useRole, useRoleGuard } from '../context/RoleContext';
import { 
  formatDate, 
  formatNumber, 
  renderCustomer, 
  renderActions 
} from '../utils/tableUtils';
import CrossCheckProvider from '../components/CrossCheck/CrossCheckProvider';

const { Option } = Select;
const { TextArea } = Input;
const { Text, Title } = Typography;

const CustomerManagement = () => {
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'laundry', 'employee']);
  
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (allowed) {
      fetchCustomers();
    }
  }, [allowed]);

  if (!allowed) return <div>غير مصرح لك بالوصول لهذه الصفحة</div>;

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getUsersData();
      setCustomers(data);
    } catch (error) {
      message.error('فشل في تحميل بيانات العملاء');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCustomer(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCustomer(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleView = (record) => {
    setViewingCustomer(record);
    setViewModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await getUsersData(id);
      message.success('تم حذف العميل بنجاح');
      fetchCustomers();
    } catch (error) {
      message.error('فشل في حذف العميل');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingCustomer) {
        await updateUser(editingCustomer.id, values);
        message.success('تم تحديث العميل بنجاح');
      } else {
        await createUser(values);
        message.success('تم إضافة العميل بنجاح');
      }
      setModalVisible(false);
      fetchCustomers();
    } catch (error) {
      message.error('فشل في حفظ العميل');
    }
  };

  const columns = [
    {
      title: 'رقم العميل',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Text strong>#{id}</Text>,
      className: 'number-cell'
    },
    {
      title: 'الاسم',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <UserOutlined />
          <Text strong>{name}</Text>
        </Space>
      ),
      className: 'name-cell'
    },
    {
      title: 'رقم الهاتف',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          <Text>{phone}</Text>
        </Space>
      ),
      className: 'phone-cell'
    },
    {
      title: 'البريد الإلكتروني',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Space>
          <MailOutlined />
          <Text>{email}</Text>
        </Space>
      ),
      className: 'email-cell'
    },
    {
      title: 'عدد السيارات',
      dataIndex: 'carsCount',
      key: 'carsCount',
      render: (count) => (
        <Space>
          <CarOutlined />
          <Text>{count || 0}</Text>
        </Space>
      ),
      className: 'cars-cell'
    },
    {
      title: 'التقييم',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Space>
          <StarOutlined style={{ color: '#faad14' }} />
          <Text>{rating || 0}/5</Text>
        </Space>
      ),
      className: 'rating-cell'
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'نشط' : 'غير نشط'}
        </Tag>
      ),
      className: 'status-cell',
      filters: [
        { text: 'نشط', value: 'active' },
        { text: 'غير نشط', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'تاريخ التسجيل',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: formatDate,
      className: 'date-cell',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => renderActions(record, {
        onView: () => handleView(record),
        onEdit: () => handleEdit(record),
        onDelete: () => handleDelete(record.id)
      }),
      className: 'actions-cell'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>إدارة العملاء</Title>
        <Text type="secondary">إدارة جميع عملاء مغاسل السيارات</Text>
      </div>

      {/* مكون فحص العملاء */}
      <CrossCheckProvider
        sectionName="customers"
        showDetails={true}
        position="top"
        onRefresh={fetchCustomers}
      />

      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
              onClick={handleAdd}
                >
                  إضافة عميل جديد
                </Button>
              </Space>
        </div>

                <Table
                  columns={columns}
          dataSource={customers}
                  loading={loading}
                  rowKey="id"
                  pagination={{
                    showSizeChanger: true,
                    showQuickJumper: true,
            showTotal: (total, range) => `عرض ${range[0]}-${range[1]} من ${total} عميل`,
            pageSizeOptions: ['10', '20', '50', '100'],
            defaultPageSize: 20
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Modal إضافة/تعديل عميل */}
      <Modal
        title={editingCustomer ? 'تعديل العميل' : 'إضافة عميل جديد'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
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
                label="الاسم الكامل"
                rules={[{ required: true, message: 'يرجى إدخال الاسم الكامل' }]}
              >
                <Input placeholder="الاسم الكامل" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="رقم الهاتف"
                rules={[{ required: true, message: 'يرجى إدخال رقم الهاتف' }]}
              >
                <Input placeholder="رقم الهاتف" />
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
                <Input placeholder="البريد الإلكتروني" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="الحالة"
                rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
              >
                <Select placeholder="اختر الحالة">
                  <Option value="active">نشط</Option>
                  <Option value="inactive">غير نشط</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

              <Form.Item
            name="address"
            label="العنوان"
              >
            <TextArea rows={3} placeholder="عنوان العميل..." />
              </Form.Item>

              <Form.Item
                name="notes"
                label="ملاحظات"
              >
            <TextArea rows={3} placeholder="أي ملاحظات إضافية..." />
              </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingCustomer ? 'تحديث' : 'إضافة'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                إلغاء
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal عرض تفاصيل العميل */}
      <Modal
        title="تفاصيل العميل"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {viewingCustomer && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="رقم العميل" span={2}>
                <Text strong>#{viewingCustomer.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="الاسم الكامل">
                {viewingCustomer.name}
                </Descriptions.Item>
                <Descriptions.Item label="رقم الهاتف">
                <Space>
                  <PhoneOutlined />
                  {viewingCustomer.phone}
                </Space>
                </Descriptions.Item>
                <Descriptions.Item label="البريد الإلكتروني">
                <Space>
                  <MailOutlined />
                  {viewingCustomer.email}
                </Space>
                </Descriptions.Item>
                <Descriptions.Item label="الحالة">
                <Tag color={viewingCustomer.status === 'active' ? 'green' : 'red'}>
                  {viewingCustomer.status === 'active' ? 'نشط' : 'غير نشط'}
                  </Tag>
                </Descriptions.Item>
              <Descriptions.Item label="عدد السيارات">
                <Space>
                  <CarOutlined />
                  {viewingCustomer.carsCount || 0}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="التقييم">
                <Space>
                  <StarOutlined style={{ color: '#faad14' }} />
                  {viewingCustomer.rating || 0}/5
                </Space>
                </Descriptions.Item>
                <Descriptions.Item label="تاريخ التسجيل">
                {formatDate(viewingCustomer.createdAt)}
              </Descriptions.Item>
              {viewingCustomer.address && (
                <Descriptions.Item label="العنوان" span={2}>
                  {viewingCustomer.address}
                </Descriptions.Item>
              )}
              {viewingCustomer.notes && (
                <Descriptions.Item label="ملاحظات" span={2}>
                  {viewingCustomer.notes}
                </Descriptions.Item>
              )}
              </Descriptions>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Space>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={() => {
                    setViewModalVisible(false);
                    handleEdit(viewingCustomer);
                  }}
                >
                  تعديل العميل
                </Button>
                <Button 
                  icon={<CarOutlined />}
                  onClick={() => {
                    message.info('سيتم إضافة إدارة سيارات العميل قريباً');
                  }}
                >
                  سيارات العميل
                </Button>
                <Button 
                  icon={<StarOutlined />}
                  onClick={() => {
                    message.info('سيتم إضافة تقييمات العميل قريباً');
                  }}
                >
                  تقييمات العميل
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomerManagement; 