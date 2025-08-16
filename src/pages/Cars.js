import React, { useState, useEffect, useContext, useCallback } from 'react';
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
  CarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { useRoleGuard } from '../components/RoleGuard';
import { UserContext } from '../context/UserContext';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Cars = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'laundry', 'user']);
  
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form] = Form.useForm();
  const { currentUser } = useContext(UserContext) || {};
  
  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      // يمكن ربطها ببيانات حقيقية هنا
      // const response = await fetch('http://localhost:3001/cars');
      // const data = await response.json();
      setCars(mockCars);
    } catch (error) {
      message.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) {
      fetchCars();
    }
  }, [allowed, fetchCars]);

  if (!allowed) return <div>غير مصرح لك بالوصول لهذه الصفحة</div>;

  // بيانات وهمية للسيارات
  const mockCars = [
    {
      id: 1,
      plateNumber: 'ABC-123',
      brand: 'تويوتا',
      model: 'كامري',
      year: 2020,
      color: 'أبيض',
      size: 'متوسط',
      ownerName: 'أحمد محمد',
      ownerPhone: '+966501234567',
      ownerEmail: 'ahmed@example.com',
      userId: 1,
      userName: 'أحمد محمد',
      notes: 'سيارة عائلية',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      plateNumber: 'XYZ-789',
      brand: 'هيونداي',
      model: 'سوناتا',
      year: 2019,
      color: 'أسود',
      size: 'متوسط',
      ownerName: 'فاطمة علي',
      ownerPhone: '+966507654321',
      ownerEmail: 'fatima@example.com',
      userId: 2,
      userName: 'فاطمة علي',
      notes: 'سيارة للعمل',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      plateNumber: 'DEF-456',
      brand: 'نيسان',
      model: 'ألتيما',
      year: 2021,
      color: 'أزرق',
      size: 'متوسط',
      ownerName: 'خالد عبدالله',
      ownerPhone: '+966509876543',
      ownerEmail: 'khalid@example.com',
      userId: 3,
      userName: 'خالد عبدالله',
      notes: 'العميل منتظم في الغسيل',
      status: 'active',
      createdAt: '2024-01-25'
    }
  ];

  const handleAdd = () => {
    setEditingCar(null);
    form.resetFields();
    // تعبئة اسم المالك ورقم الهاتف من المستخدم الحالي إذا كان متاحًا
    if (currentUser) {
      form.setFieldsValue({
        ownerName: currentUser.name,
        ownerPhone: currentUser.phone
      });
    }
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCar(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // يمكن ربطها ببيانات حقيقية هنا
      // await fetch(`http://localhost:3001/cars/${id}`, { method: 'DELETE' });
      setCars(cars.filter(car => car.id !== id));
      message.success('تم حذف السيارة بنجاح');
    } catch (error) {
      message.error('خطأ في حذف السيارة');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingCar) {
        // تحديث سيارة موجودة
        const updatedCar = { ...editingCar, ...values };
        setCars(cars.map(car => car.id === editingCar.id ? updatedCar : car));
        message.success('تم تحديث السيارة بنجاح');
      } else {
        // إضافة سيارة جديدة
        const newCar = {
          id: Date.now(),
          ...values,
          userId: currentUser ? currentUser.id : undefined,
          userName: currentUser ? currentUser.name : undefined,
          status: 'active',
          createdAt: new Date().toISOString().split('T')[0]
        };
        setCars([...cars, newCar]);
        message.success('تم إضافة السيارة بنجاح');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('خطأ في حفظ البيانات');
    }
  };

  const columns = [
    {
      title: 'رقم اللوحة',
      dataIndex: 'plateNumber',
      key: 'plateNumber',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'الماركة',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'الموديل',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'السنة',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'اللون',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'الحجم',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'المالك',
      dataIndex: 'ownerName',
      key: 'ownerName',
      render: (name, record) => (
        <div>
          <div><UserOutlined /> {name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <PhoneOutlined /> {record.ownerPhone}
          </div>
        </div>
      ),
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

  const filteredCars = cars.filter(car =>
    car.plateNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchText.toLowerCase()) ||
    car.model.toLowerCase().includes(searchText.toLowerCase()) ||
    car.ownerName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Card
          title="إدارة السيارات"
          extra={
            <Space>
              <Input.Search
                placeholder="البحث في السيارات..."
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
                إضافة سيارة جديدة
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={filteredCars}
            loading={loading}
            rowKey="id"
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} من ${total} سيارة`,
            }}
          />
        </Card>

        <Modal
          title={editingCar ? 'تعديل السيارة' : 'إضافة سيارة جديدة'}
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
                  name="plateNumber"
                  label="رقم اللوحة"
                  rules={[{ required: true, message: 'يرجى إدخال رقم اللوحة' }]}
                >
                  <Input prefix={<CarOutlined />} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="brand"
                  label="الماركة"
                  rules={[{ required: true, message: 'يرجى إدخال الماركة' }]}
                >
                  <Select>
                    <Option value="تويوتا">تويوتا</Option>
                    <Option value="هيونداي">هيونداي</Option>
                    <Option value="نيسان">نيسان</Option>
                    <Option value="هوندا">هوندا</Option>
                    <Option value="فورد">فورد</Option>
                    <Option value="شيفروليه">شيفروليه</Option>
                    <Option value="مرسيدس">مرسيدس</Option>
                    <Option value="بي إم دبليو">بي إم دبليو</Option>
                    <Option value="أودي">أودي</Option>
                    <Option value="فولكس فاجن">فولكس فاجن</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="model"
                  label="الموديل"
                  rules={[{ required: true, message: 'يرجى إدخال الموديل' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="year"
                  label="سنة الصنع"
                  rules={[{ required: true, message: 'يرجى إدخال سنة الصنع' }]}
                >
                  <Select>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                      <Option key={year} value={year}>{year}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="color"
                  label="اللون"
                  rules={[{ required: true, message: 'يرجى إدخال اللون' }]}
                >
                  <Select>
                    <Option value="أبيض">أبيض</Option>
                    <Option value="أسود">أسود</Option>
                    <Option value="أحمر">أحمر</Option>
                    <Option value="أزرق">أزرق</Option>
                    <Option value="أخضر">أخضر</Option>
                    <Option value="أصفر">أصفر</Option>
                    <Option value="رمادي">رمادي</Option>
                    <Option value="فضي">فضي</Option>
                    <Option value="بني">بني</Option>
                    <Option value="برتقالي">برتقالي</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="size"
                  label="الحجم"
                  rules={[{ required: true, message: 'يرجى إدخال الحجم' }]}
                >
                  <Select>
                    <Option value="صغير">صغير</Option>
                    <Option value="متوسط">متوسط</Option>
                    <Option value="كبير">كبير</Option>
                    <Option value="شاحنة صغيرة">شاحنة صغيرة</Option>
                    <Option value="شاحنة كبيرة">شاحنة كبيرة</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="ownerName"
                  label="اسم المالك"
                  rules={[{ required: true, message: 'يرجى إدخال اسم المالك' }]}
                >
                  <Input prefix={<UserOutlined />} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ownerPhone"
                  label="رقم هاتف المالك"
                  rules={[{ required: true, message: 'يرجى إدخال رقم الهاتف' }]}
                >
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="ownerEmail"
              label="البريد الإلكتروني للمالك"
              rules={[
                { required: true, message: 'يرجى إدخال البريد الإلكتروني' },
                { type: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح' }
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
              name="notes"
              label="ملاحظات"
            >
              <TextArea rows={3} placeholder="أي ملاحظات إضافية عن السيارة..." />
            </Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setIsModalVisible(false)}>
                  إلغاء
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingCar ? 'تحديث' : 'إضافة'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Cars; 