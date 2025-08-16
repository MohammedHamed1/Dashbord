import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Button, 
  Space, 
  Typography, 
  Table, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  TimePicker, 
  Upload, 
  message,
  Row,
  Col,
  Statistic,
  Rate,
  Image,
  Switch,
  Drawer,
  Descriptions,
  List
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  StarOutlined,
  UploadOutlined,
  QrcodeOutlined,
  HomeOutlined,
  LocationOutlined,
  TeamOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';
import { useRole } from '../context/RoleContext';
import QRCodeScanner from '../components/QRCodeScanner';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const LaundryManagement = () => {
  const { lang } = useLanguage();
  const { currentRole } = useRole();
  const [laundries, setLaundries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [editingLaundry, setEditingLaundry] = useState(null);
  const [viewingLaundry, setViewingLaundry] = useState(null);
  const [form] = Form.useForm();
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);

  useEffect(() => {
    fetchLaundries();
  }, []);

  const fetchLaundries = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = [
        {
          id: 1,
          name: 'مغسلة النظافة الذكية',
          ownerName: 'فاطمة علي',
          address: 'شارع الملك فهد، الرياض',
          location: { lat: 24.7136, lng: 46.6753 },
          phone: '+966501234567',
          email: 'info@smartlaundry.com',
          status: 'active',
          rating: 4.5,
          totalRatings: 125,
          workingHours: {
            sunday: { open: '08:00', close: '22:00' },
            monday: { open: '08:00', close: '22:00' },
            tuesday: { open: '08:00', close: '22:00' },
            wednesday: { open: '08:00', close: '22:00' },
            thursday: { open: '08:00', close: '22:00' },
            friday: { open: '09:00', close: '23:00' },
            saturday: { open: '08:00', close: '22:00' }
          },
          services: ['car_wash', 'interior_cleaning', 'exterior_cleaning'],
          paymentMethods: ['cash', 'card', 'apple_pay', 'mada', 'stc_pay'],
          images: [
            'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Laundry+1',
            'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Laundry+2'
          ],
          employees: 8,
          totalOrders: 1250,
          monthlyRevenue: 45000,
          createdAt: '2024-01-20'
        }
      ];
      
      setLaundries(mockData);
    } catch (error) {
      console.error('Failed to fetch laundries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingLaundry(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingLaundry(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleView = (record) => {
    setViewingLaundry(record);
    setViewModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      setLaundries(laundries.filter(laundry => laundry.id !== id));
      message.success(lang === 'ar' ? 'تم حذف المغسلة بنجاح' : 'Laundry deleted successfully');
    } catch (error) {
      message.error(lang === 'ar' ? 'فشل في حذف المغسلة' : 'Failed to delete laundry');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingLaundry) {
        const updatedLaundry = { ...editingLaundry, ...values };
        setLaundries(laundries.map(laundry => 
          laundry.id === editingLaundry.id ? updatedLaundry : laundry
        ));
        message.success(lang === 'ar' ? 'تم تحديث المغسلة بنجاح' : 'Laundry updated successfully');
      } else {
        const newLaundry = {
          id: Date.now(),
          ...values,
          status: 'active',
          rating: 0,
          totalRatings: 0,
          employees: 0,
          totalOrders: 0,
          monthlyRevenue: 0,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setLaundries([...laundries, newLaundry]);
        message.success(lang === 'ar' ? 'تم إضافة المغسلة بنجاح' : 'Laundry added successfully');
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(lang === 'ar' ? 'فشل في حفظ المغسلة' : 'Failed to save laundry');
    }
  };

  const handleScan = async (qrData) => {
    try {
      // Simulate processing scanned QR code
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success(lang === 'ar' ? 'تم مسح رمز QR بنجاح' : 'QR code scanned successfully');
      setScannerVisible(false);
    } catch (error) {
      message.error(lang === 'ar' ? 'فشل في مسح رمز QR' : 'Failed to scan QR code');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'maintenance': return 'orange';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return lang === 'ar' ? 'نشط' : 'Active';
      case 'inactive': return lang === 'ar' ? 'غير نشط' : 'Inactive';
      case 'maintenance': return lang === 'ar' ? 'صيانة' : 'Maintenance';
      default: return status;
    }
  };

  const columns = [
    {
      title: lang === 'ar' ? 'اسم المغسلة' : 'Laundry Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.ownerName}
          </Text>
        </div>
      )
    },
    {
      title: lang === 'ar' ? 'العنوان' : 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true
    },
    {
      title: lang === 'ar' ? 'التقييم' : 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating, record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <StarOutlined style={{ color: '#faad14' }} />
            <span style={{ fontWeight: 'bold' }}>{rating}</span>
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>
            ({record.totalRatings} {lang === 'ar' ? 'تقييم' : 'ratings'})
          </div>
        </div>
      )
    },
    {
      title: lang === 'ar' ? 'الموظفون' : 'Employees',
      dataIndex: 'employees',
      key: 'employees',
      render: (employees) => (
        <span style={{ fontWeight: 'bold' }}>
          {employees} {lang === 'ar' ? 'موظف' : 'employees'}
        </span>
      )
    },
    {
      title: lang === 'ar' ? 'الطلبات' : 'Orders',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      render: (orders) => (
        <span style={{ fontWeight: 'bold' }}>
          {orders.toLocaleString()}
        </span>
      )
    },
    {
      title: lang === 'ar' ? 'الإيرادات الشهرية' : 'Monthly Revenue',
      dataIndex: 'monthlyRevenue',
      key: 'monthlyRevenue',
      render: (revenue) => (
        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
          {revenue.toLocaleString()} {lang === 'ar' ? 'ريال' : 'SAR'}
        </span>
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
      title: lang === 'ar' ? 'الإجراءات' : 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            {lang === 'ar' ? 'عرض' : 'View'}
          </Button>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            {lang === 'ar' ? 'تعديل' : 'Edit'}
          </Button>
          <Button
            size="small"
            icon={<QrcodeOutlined />}
            onClick={() => setScannerVisible(true)}
          >
            {lang === 'ar' ? 'مسح QR' : 'Scan QR'}
          </Button>
        </Space>
      )
    }
  ];

  const stats = {
    totalLaundries: laundries.length,
    activeLaundries: laundries.filter(l => l.status === 'active').length,
    totalEmployees: laundries.reduce((sum, l) => sum + l.employees, 0),
    totalRevenue: laundries.reduce((sum, l) => sum + l.monthlyRevenue, 0)
  };

  return (
    <Layout style={{ padding: '24px', background: '#f5f6fa' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          {lang === 'ar' ? 'إدارة المغاسل' : 'Laundry Management'}
        </Title>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={lang === 'ar' ? 'إجمالي المغاسل' : 'Total Laundries'}
              value={stats.totalLaundries}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={lang === 'ar' ? 'المغاسل النشطة' : 'Active Laundries'}
              value={stats.activeLaundries}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={lang === 'ar' ? 'إجمالي الموظفين' : 'Total Employees'}
              value={stats.totalEmployees}
              prefix={<PhoneOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
              value={stats.totalRevenue}
              prefix={<StarOutlined />}
              suffix={lang === 'ar' ? 'ريال' : 'SAR'}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Button
              type="primary"
              icon={<QrcodeOutlined />}
              onClick={() => setScannerVisible(true)}
            >
              {lang === 'ar' ? 'مسح رمز QR' : 'Scan QR Code'}
            </Button>
          </Space>
          {(currentRole === 'admin') && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              {lang === 'ar' ? 'إضافة مغسلة جديدة' : 'Add New Laundry'}
            </Button>
          )}
        </div>

        <Table
          columns={columns}
          dataSource={laundries}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              lang === 'ar' 
                ? `${range[0]}-${range[1]} من ${total} مغسلة`
                : `${range[0]}-${range[1]} of ${total} laundries`
          }}
        />
      </Card>

      {/* Modal for Add/Edit */}
      <Modal
        title={editingLaundry 
          ? (lang === 'ar' ? 'تعديل المغسلة' : 'Edit Laundry')
          : (lang === 'ar' ? 'إضافة مغسلة جديدة' : 'Add New Laundry')
        }
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
                label={lang === 'ar' ? 'اسم المغسلة' : 'Laundry Name'}
                rules={[{ required: true, message: lang === 'ar' ? 'يرجى إدخال اسم المغسلة' : 'Please enter laundry name' }]}
              >
                <Input placeholder={lang === 'ar' ? 'أدخل اسم المغسلة' : 'Enter laundry name'} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ownerName"
                label={lang === 'ar' ? 'اسم المالك' : 'Owner Name'}
                rules={[{ required: true, message: lang === 'ar' ? 'يرجى إدخال اسم المالك' : 'Please enter owner name' }]}
              >
                <Input placeholder={lang === 'ar' ? 'أدخل اسم المالك' : 'Enter owner name'} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label={lang === 'ar' ? 'العنوان' : 'Address'}
            rules={[{ required: true, message: lang === 'ar' ? 'يرجى إدخال العنوان' : 'Please enter address' }]}
          >
            <TextArea rows={2} placeholder={lang === 'ar' ? 'أدخل العنوان الكامل' : 'Enter full address'} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label={lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                rules={[{ required: true, message: lang === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please enter phone number' }]}
              >
                <Input placeholder="+966501234567" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label={lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                rules={[
                  { required: true, message: lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter email' },
                  { type: 'email', message: lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter valid email' }
                ]}
              >
                <Input placeholder="info@laundry.com" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="status"
            label={lang === 'ar' ? 'الحالة' : 'Status'}
            rules={[{ required: true, message: lang === 'ar' ? 'يرجى اختيار الحالة' : 'Please select status' }]}
          >
            <Select placeholder={lang === 'ar' ? 'اختر الحالة' : 'Select status'}>
              <Option value="active">{lang === 'ar' ? 'نشط' : 'Active'}</Option>
              <Option value="inactive">{lang === 'ar' ? 'غير نشط' : 'Inactive'}</Option>
              <Option value="maintenance">{lang === 'ar' ? 'صيانة' : 'Maintenance'}</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingLaundry 
                  ? (lang === 'ar' ? 'تحديث' : 'Update')
                  : (lang === 'ar' ? 'إضافة' : 'Add')
                }
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for View */}
      <Modal
        title={lang === 'ar' ? 'تفاصيل المغسلة' : 'Laundry Details'}
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {viewingLaundry && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>{lang === 'ar' ? 'اسم المغسلة:' : 'Laundry Name:'}</Text>
                <br />
                <Text>{viewingLaundry.name}</Text>
              </Col>
              <Col span={12}>
                <Text strong>{lang === 'ar' ? 'المالك:' : 'Owner:'}</Text>
                <br />
                <Text>{viewingLaundry.ownerName}</Text>
              </Col>
            </Row>
            <br />
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>{lang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}</Text>
                <br />
                <Text>{viewingLaundry.phone}</Text>
              </Col>
              <Col span={12}>
                <Text strong>{lang === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</Text>
                <br />
                <Text>{viewingLaundry.email}</Text>
              </Col>
            </Row>
            <br />
            <Text strong>{lang === 'ar' ? 'العنوان:' : 'Address:'}</Text>
            <br />
            <Text>{viewingLaundry.address}</Text>
            <br />
            <br />
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title={lang === 'ar' ? 'التقييم' : 'Rating'}
                  value={viewingLaundry.rating}
                  prefix={<StarOutlined />}
                  suffix={`(${viewingLaundry.totalRatings})`}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={lang === 'ar' ? 'الموظفون' : 'Employees'}
                  value={viewingLaundry.employees}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={lang === 'ar' ? 'الطلبات' : 'Orders'}
                  value={viewingLaundry.totalOrders}
                />
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      <QRCodeScanner
        open={scannerVisible}
        onScan={handleScan}
        onClose={() => setScannerVisible(false)}
      />

      {/* درج تفاصيل المغسلة */}
      <Drawer
        title="تفاصيل المغسلة"
        placement="right"
        width={600}
        onClose={() => setDetailsDrawerVisible(false)}
        open={detailsDrawerVisible}
      >
        {viewingLaundry && (
          <div>
            {/* معلومات أساسية */}
            <Card title="المعلومات الأساسية" size="small" style={{ marginBottom: 16 }}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="الاسم">
                  {viewingLaundry.name}
                </Descriptions.Item>
                <Descriptions.Item label="العنوان">
                  {viewingLaundry.address}
                </Descriptions.Item>
                <Descriptions.Item label="رقم الهاتف">
                  {viewingLaundry.phone}
                </Descriptions.Item>
                <Descriptions.Item label="البريد الإلكتروني">
                  {viewingLaundry.email}
                </Descriptions.Item>
                <Descriptions.Item label="الحالة">
                  <Tag color={getStatusColor(viewingLaundry.status)}>
                    {getStatusText(viewingLaundry.status)}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* إحصائيات الأداء */}
            <Card title="إحصائيات الأداء" size="small" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic
                    title="التقييم العام"
                    value={viewingLaundry.rating}
                    suffix="/5"
                    prefix={<StarOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="الموظفون"
                    value={viewingLaundry.employees}
                    prefix={<TeamOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Statistic
                    title="الطلبات"
                    value={viewingLaundry.totalOrders}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="الإيرادات الشهرية"
                    value={viewingLaundry.monthlyRevenue}
                    suffix="ريال"
                    prefix={<DollarOutlined />}
                  />
                </Col>
              </Row>
            </Card>

            {/* الخدمات والمرافق */}
            <Card title="الخدمات والمرافق" size="small" style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>الخدمات المتوفرة:</Text>
                <div style={{ marginTop: 8 }}>
                  {viewingLaundry.services.map((service, index) => (
                    <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                      {service}
                    </Tag>
                  ))}
                </div>
              </div>
            </Card>

            {/* ساعات العمل */}
            <Card title="ساعات العمل" size="small" style={{ marginBottom: 16 }}>
              <List
                dataSource={Object.entries(viewingLaundry.workingHours)}
                renderItem={([day, hours]) => (
                  <List.Item>
                    <List.Item.Meta
                      title={getDayName(day)}
                      description={
                        <div>
                          <Text>
                            {hours.active ? (
                              <>
                                <ClockCircleOutlined /> {hours.open} - {hours.close}
                              </>
                            ) : (
                              <Text type="secondary">مغلقة</Text>
                            )}
                          </Text>
                        </div>
                      }
                    />
                    <Tag color={hours.active ? 'green' : 'red'}>
                      {hours.active ? 'مفتوحة' : 'مغلقة'}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        )}
      </Drawer>
    </Layout>
  );
};

// دالة مساعدة للحصول على اسم اليوم
const getDayName = (day) => {
  const days = {
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت'
  };
  return days[day] || day;
};

export default LaundryManagement; 