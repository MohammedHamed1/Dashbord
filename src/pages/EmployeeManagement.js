import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Space, 
  Typography, 
  Table, 
  Tag, 
  Modal, 
  Input, 
  Select, 
  DatePicker, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  Alert, 
  Tabs, 
  Form, 
  message,
  Tooltip,
  Badge,
  Avatar,
  List,
  Divider,
  Switch,
  InputNumber,
  Descriptions,
  Rate,
  Timeline,
  Drawer,
  Calendar,
  TimePicker
} from 'antd';
import { 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  CarOutlined, 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  ExportOutlined,
  SettingOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  GiftOutlined,
  TrophyOutlined,
  MessageOutlined,
  HistoryOutlined,
  TeamOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  ScheduleOutlined,
  DollarOutlined,
  TrophyOutlined as TrophyIcon,
  FireOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Pages.css';
import CrossCheckProvider from '../components/CrossCheck/CrossCheckProvider';

const { Title, Text, Paragraph } = Typography;
// تم إزالة Search لأنه لم يعد مستخدماً في Ant Design v5
// تم إزالة Option لأنه لم يعد مستخدماً في Ant Design v5
// تم إزالة RangePicker لأنه لم يعد مستخدماً
// تم إزالة TabPane لأنه لم يعد مستخدماً في Ant Design v5

const EmployeeManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState('all');

  // تحميل البيانات
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = [
        {
          id: 1,
          name: 'محمد حسن',
          phone: '+966505123456',
          email: 'mohammed@example.com',
          status: 'active',
          role: 'manager',
          branch: 'الفرع الرئيسي',
          department: 'الإدارة',
          hireDate: '2022-01-15T09:00:00Z',
          salary: 8000,
          performance: 4.8,
          attendance: 95,
          completedOrders: 1250,
          customerRating: 4.9,
          skills: ['إدارة الفريق', 'خدمة العملاء', 'إدارة المخزون'],
          certifications: ['شهادة إدارة الجودة', 'شهادة السلامة'],
          schedule: {
            monday: { start: '08:00', end: '17:00', active: true },
            tuesday: { start: '08:00', end: '17:00', active: true },
            wednesday: { start: '08:00', end: '17:00', active: true },
            thursday: { start: '08:00', end: '17:00', active: true },
            friday: { start: '08:00', end: '17:00', active: true },
            saturday: { start: '08:00', end: '17:00', active: true },
            sunday: { start: '08:00', end: '17:00', active: false }
          },
          emergencyContact: {
            name: 'أحمد حسن',
            phone: '+966505654321',
            relationship: 'أخ'
          },
          notes: 'موظف مميز، قائد فريق فعال'
        },
        {
          id: 2,
          name: 'فاطمة علي',
          phone: '+966506234567',
          email: 'fatima@example.com',
          status: 'active',
          role: 'washer',
          branch: 'فرع الرياض',
          department: 'الغسيل',
          hireDate: '2023-03-20T11:30:00Z',
          salary: 4500,
          performance: 4.6,
          attendance: 92,
          completedOrders: 890,
          customerRating: 4.7,
          skills: ['غسيل السيارات', 'استخدام المعدات', 'ضمان الجودة'],
          certifications: ['شهادة السلامة المهنية'],
          schedule: {
            monday: { start: '07:00', end: '16:00', active: true },
            tuesday: { start: '07:00', end: '16:00', active: true },
            wednesday: { start: '07:00', end: '16:00', active: true },
            thursday: { start: '07:00', end: '16:00', active: true },
            friday: { start: '07:00', end: '16:00', active: true },
            saturday: { start: '07:00', end: '16:00', active: true },
            sunday: { start: '07:00', end: '16:00', active: false }
          },
          emergencyContact: {
            name: 'علي محمد',
            phone: '+966506765432',
            relationship: 'زوج'
          },
          notes: 'موظفة مجتهدة، تحرص على الجودة'
        },
        {
          id: 3,
          name: 'أحمد محمود',
          phone: '+966507345678',
          email: 'ahmed@example.com',
          status: 'on_leave',
          role: 'cashier',
          branch: 'الفرع الرئيسي',
          department: 'المبيعات',
          hireDate: '2023-06-10T13:15:00Z',
          salary: 5000,
          performance: 4.3,
          attendance: 88,
          completedOrders: 650,
          customerRating: 4.5,
          skills: ['إدارة النقد', 'خدمة العملاء', 'حفظ السجلات'],
          certifications: ['شهادة إدارة النقد'],
          schedule: {
            monday: { start: '09:00', end: '18:00', active: true },
            tuesday: { start: '09:00', end: '18:00', active: true },
            wednesday: { start: '09:00', end: '18:00', active: true },
            thursday: { start: '09:00', end: '18:00', active: true },
            friday: { start: '09:00', end: '18:00', active: true },
            saturday: { start: '09:00', end: '18:00', active: true },
            sunday: { start: '09:00', end: '18:00', active: false }
          },
          emergencyContact: {
            name: 'مريم أحمد',
            phone: '+966507876543',
            relationship: 'أخت'
          },
          notes: 'موظف جديد، يحتاج تدريب إضافي'
        }
      ];
      
      setEmployees(mockData);
    } catch (error) {
      message.error('فشل في تحميل بيانات الموظفين');
    } finally {
      setLoading(false);
    }
  };

  // إنشاء موظف جديد
  const handleCreateEmployee = async (values) => {
    try {
      const newEmployee = {
        id: employees.length + 1,
        name: values.name,
        phone: values.phone,
        email: values.email,
        status: 'active',
        role: values.role,
        branch: values.branch,
        department: values.department,
        hireDate: new Date().toISOString(),
        salary: values.salary,
        performance: 0,
        attendance: 100,
        completedOrders: 0,
        customerRating: 0,
        skills: values.skills || [],
        certifications: values.certifications || [],
        schedule: {
          monday: { start: '08:00', end: '17:00', active: true },
          tuesday: { start: '08:00', end: '17:00', active: true },
          wednesday: { start: '08:00', end: '17:00', active: true },
          thursday: { start: '08:00', end: '17:00', active: true },
          friday: { start: '08:00', end: '17:00', active: true },
          saturday: { start: '08:00', end: '17:00', active: true },
          sunday: { start: '08:00', end: '17:00', active: false }
        },
        emergencyContact: {
          name: values.emergencyName,
          phone: values.emergencyPhone,
          relationship: values.emergencyRelationship
        },
        notes: values.notes
      };
      
      setEmployees(prev => [newEmployee, ...prev]);
      message.success('تم إنشاء الموظف بنجاح');
      setCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('فشل في إنشاء الموظف');
    }
  };

  // تحديث بيانات الموظف
  const handleUpdateEmployee = async (values) => {
    try {
      setEmployees(prev => prev.map(employee => 
        employee.id === selectedEmployee.id 
          ? { ...employee, ...values }
          : employee
      ));
      message.success('تم تحديث بيانات الموظف بنجاح');
      setEditModalVisible(false);
      setSelectedEmployee(null);
    } catch (error) {
      message.error('فشل في تحديث بيانات الموظف');
    }
  };

  // حذف الموظف
  const handleDeleteEmployee = async (id) => {
    try {
      setEmployees(prev => prev.filter(employee => employee.id !== id));
      message.success('تم حذف الموظف بنجاح');
    } catch (error) {
      message.error('فشل في حذف الموظف');
    }
  };

  // الحصول على لون الحالة
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'on_leave': return 'orange';
      case 'suspended': return 'red';
      default: return 'default';
    }
  };

  // الحصول على نص الحالة
  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'on_leave': return 'في إجازة';
      case 'suspended': return 'معلق';
      default: return status;
    }
  };

  // الحصول على لون الدور
  const getRoleColor = (role) => {
    switch (role) {
      case 'manager': return 'purple';
      case 'supervisor': return 'blue';
      case 'washer': return 'green';
      case 'cashier': return 'orange';
      case 'maintenance': return 'cyan';
      default: return 'default';
    }
  };

  // الحصول على نص الدور
  const getRoleText = (role) => {
    switch (role) {
      case 'manager': return 'مدير';
      case 'supervisor': return 'مشرف';
      case 'washer': return 'غسال';
      case 'cashier': return 'كاشير';
      case 'maintenance': return 'صيانة';
      default: return role;
    }
  };

  // إحصائيات الموظفين
  const getEmployeeStats = () => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'active').length;
    const onLeave = employees.filter(e => e.status === 'on_leave').length;
    const managers = employees.filter(e => e.role === 'manager').length;
    const washers = employees.filter(e => e.role === 'washer').length;
    const cashiers = employees.filter(e => e.role === 'cashier').length;

    return { total, active, onLeave, managers, washers, cashiers };
  };

  const stats = getEmployeeStats();

  // تصفية الموظفين
  const getFilteredEmployees = () => {
    if (!employees || !Array.isArray(employees)) {
      return [];
    }
    
    let filtered = [...employees];
    
    // تصفية حسب الدور
    if (roleFilter !== 'all') {
      filtered = filtered.filter(e => e.role === roleFilter);
    }
    
    // تصفية حسب الفرع
    if (branchFilter !== 'all') {
      filtered = filtered.filter(e => e.branch === branchFilter);
    }
    
    // تصفية حسب الحالة
    if (statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === statusFilter);
    }
    
    // تصفية حسب البحث
    if (searchText) {
      filtered = filtered.filter(e => 
        e.name.includes(searchText) ||
        e.phone.includes(searchText) ||
        e.email.includes(searchText)
      );
    }
    
    return filtered;
  };

  // أعمدة الجدول
  const columns = [
    {
      title: 'الموظف',
      key: 'employee',
      render: (_, record) => {
        if (!record) return null;
        return (
          <div>
            <Avatar 
              size={40} 
              icon={<UserOutlined />} 
              style={{ marginLeft: 8 }}
            />
            <div>
              <Text strong>{record.name}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                <PhoneOutlined /> {record.phone}
              </Text>
            </div>
          </div>
        );
      }
    },
    {
      title: 'الدور',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {getRoleText(role)}
        </Tag>
      )
    },
    {
      title: 'الفرع',
      dataIndex: 'branch',
      key: 'branch'
    },
    {
      title: 'الأداء',
      key: 'performance',
      render: (_, record) => {
        if (!record) return null;
        return (
          <div>
            <Text strong>{record.performance}/5</Text>
            <br />
            <Rate disabled defaultValue={record.performance} size="small" />
          </div>
        );
      }
    },
    {
      title: 'الحضور',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (attendance) => (
        <div>
          <Text strong>{attendance}%</Text>
          <br />
          <Progress 
            percent={attendance} 
            size="small" 
            style={{ marginTop: 4 }}
          />
        </div>
      )
    },
    {
      title: 'الطلبات المكتملة',
      dataIndex: 'completedOrders',
      key: 'completedOrders',
      render: (orders, record) => {
        if (!record) return null;
        return (
          <div>
            <Text strong>{orders}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              تقييم العملاء: {record.customerRating}/5
            </Text>
          </div>
        );
      }
    },
    {
      title: 'الراتب',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => (
        <Text strong>{salary} ريال</Text>
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      )
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => {
        if (!record) return null;
        return (
          <Space>
            <Tooltip title="عرض التفاصيل">
              <Button 
                type="text" 
                icon={<EyeOutlined />} 
                onClick={() => {
                  setSelectedEmployee(record);
                  setDetailsDrawerVisible(true);
                }}
              />
            </Tooltip>
            
            <Tooltip title="تعديل">
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={() => {
                  setSelectedEmployee(record);
                  setEditModalVisible(true);
                }}
              />
            </Tooltip>
            
            <Tooltip title="جدول العمل">
              <Button 
                type="text" 
                icon={<ScheduleOutlined />} 
                onClick={() => {
                  setSelectedEmployee(record);
                  setScheduleModalVisible(true);
                }}
              />
            </Tooltip>
            
            <Tooltip title="حذف">
              <Button 
                type="text" 
                danger
                icon={<DeleteOutlined />} 
                onClick={() => handleDeleteEmployee(record.id)}
              />
            </Tooltip>
          </Space>
        );
      }
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2}>
          <TeamOutlined style={{ marginLeft: 8 }} />
          إدارة الموظفين
        </Title>
        <Text type="secondary">
          إدارة بيانات الموظفين ومتابعة أدائهم
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="إجمالي الموظفين"
              value={stats.total}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="الموظفون النشطون"
              value={stats.active}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="المديرون"
              value={stats.managers}
              valueStyle={{ color: '#722ed1' }}
              prefix={<TrophyIcon />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="في إجازة"
              value={stats.onLeave}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card className="page-card">
        {/* شريط الأدوات */}
        <div style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={6}>
              <Input
                placeholder="البحث في الموظفين..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col xs={24} md={4}>
              <Select
                placeholder="الدور"
                value={roleFilter}
                onChange={setRoleFilter}
                style={{ width: '100%' }}
              >
                <Select.Option value="all">جميع الأدوار</Select.Option>
                <Select.Option value="manager">مدير</Select.Option>
                <Select.Option value="supervisor">مشرف</Select.Option>
                <Select.Option value="washer">غسال</Select.Option>
                <Select.Option value="cashier">كاشير</Select.Option>
                <Select.Option value="maintenance">صيانة</Select.Option>
              </Select>
            </Col>
            <Col xs={24} md={4}>
              <Select
                placeholder="الفرع"
                value={branchFilter}
                onChange={setBranchFilter}
                style={{ width: '100%' }}
              >
                <Select.Option value="all">جميع الفروع</Select.Option>
                <Select.Option value="الفرع الرئيسي">الفرع الرئيسي</Select.Option>
                <Select.Option value="فرع الرياض">فرع الرياض</Select.Option>
                <Select.Option value="فرع جدة">فرع جدة</Select.Option>
              </Select>
            </Col>
            <Col xs={24} md={4}>
              <Select
                placeholder="الحالة"
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: '100%' }}
              >
                <Select.Option value="all">جميع الحالات</Select.Option>
                <Select.Option value="active">نشط</Select.Option>
                <Select.Option value="inactive">غير نشط</Select.Option>
                <Select.Option value="on_leave">في إجازة</Select.Option>
                <Select.Option value="suspended">معلق</Select.Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setCreateModalVisible(true)}
                >
                  إضافة موظف جديد
                </Button>
                <Button
                  icon={<ExportOutlined />}
                >
                  تصدير البيانات
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={loadEmployees}
                  loading={loading}
                >
                  تحديث
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* التبويبات */}
        <Tabs 
          activeKey={currentTab} 
          onChange={setCurrentTab}
          items={[
            {
              key: 'all',
              label: `الكل (${stats.total})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredEmployees()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} موظف`
                  }}
                />
              )
            },
            {
              key: 'active',
              label: `النشطون (${stats.active})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredEmployees()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} موظف`
                  }}
                />
              )
            },
            {
              key: 'managers',
              label: `المديرون (${stats.managers})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredEmployees()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} موظف`
                  }}
                />
              )
            },
            {
              key: 'on_leave',
              label: `في إجازة (${stats.onLeave})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredEmployees()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} موظف`
                  }}
                />
              )
            }
          ]}
        />
      </Card>

      {/* نافذة إضافة موظف جديد */}
      <Modal
        title="إضافة موظف جديد"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateEmployee}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="اسم الموظف"
                rules={[{ required: true, message: 'يرجى إدخال اسم الموظف' }]}
              >
                <Input placeholder="أدخل اسم الموظف" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                label="رقم الهاتف"
                rules={[{ required: true, message: 'يرجى إدخال رقم الهاتف' }]}
              >
                <Input placeholder="أدخل رقم الهاتف" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="البريد الإلكتروني"
                rules={[{ type: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح' }]}
              >
                <Input placeholder="أدخل البريد الإلكتروني" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="role"
                label="الدور الوظيفي"
                rules={[{ required: true, message: 'يرجى اختيار الدور الوظيفي' }]}
              >
                <Select placeholder="اختر الدور">
                  <Select.Option value="manager">مدير</Select.Option>
                  <Select.Option value="supervisor">مشرف</Select.Option>
                  <Select.Option value="washer">غسال</Select.Option>
                  <Select.Option value="cashier">كاشير</Select.Option>
                  <Select.Option value="maintenance">صيانة</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="branch"
                label="الفرع"
                rules={[{ required: true, message: 'يرجى اختيار الفرع' }]}
              >
                <Select placeholder="اختر الفرع">
                  <Select.Option value="الفرع الرئيسي">الفرع الرئيسي</Select.Option>
                  <Select.Option value="فرع الرياض">فرع الرياض</Select.Option>
                  <Select.Option value="فرع جدة">فرع جدة</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="department"
                label="القسم"
                rules={[{ required: true, message: 'يرجى إدخال القسم' }]}
              >
                <Input placeholder="أدخل القسم" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="salary"
                label="الراتب"
                rules={[{ required: true, message: 'يرجى إدخال الراتب' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="emergencyName"
                label="اسم الطوارئ"
                rules={[{ required: true, message: 'يرجى إدخال اسم جهة الاتصال للطوارئ' }]}
              >
                <Input placeholder="أدخل الاسم" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="emergencyPhone"
                label="هاتف الطوارئ"
                rules={[{ required: true, message: 'يرجى إدخال رقم هاتف الطوارئ' }]}
              >
                <Input placeholder="أدخل رقم الهاتف" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="emergencyRelationship"
                label="صلة القرابة"
                rules={[{ required: true, message: 'يرجى إدخال صلة القرابة' }]}
              >
                <Input placeholder="مثل: زوج، أخ، أخت" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="notes"
                label="ملاحظات"
              >
                <Input.TextArea rows={3} placeholder="أدخل أي ملاحظات إضافية" />
              </Form.Item>
            </Col>
          </Row>
          
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Space>
              <Button onClick={() => setCreateModalVisible(false)}>
                إلغاء
              </Button>
              <Button type="primary" htmlType="submit">
                إضافة الموظف
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* نافذة تعديل الموظف */}
      <Modal
        title="تعديل بيانات الموظف"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedEmployee && (
          <Form
            layout="vertical"
            initialValues={selectedEmployee}
            onFinish={handleUpdateEmployee}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="اسم الموظف"
                  rules={[{ required: true, message: 'يرجى إدخال اسم الموظف' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="phone"
                  label="رقم الهاتف"
                  rules={[{ required: true, message: 'يرجى إدخال رقم الهاتف' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="البريد الإلكتروني"
                  rules={[{ type: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="status"
                  label="الحالة"
                  rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
                >
                  <Select>
                    <Select.Option value="active">نشط</Select.Option>
                    <Select.Option value="inactive">غير نشط</Select.Option>
                    <Select.Option value="on_leave">في إجازة</Select.Option>
                    <Select.Option value="suspended">معلق</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="role"
                  label="الدور الوظيفي"
                  rules={[{ required: true, message: 'يرجى اختيار الدور الوظيفي' }]}
                >
                  <Select>
                    <Select.Option value="manager">مدير</Select.Option>
                    <Select.Option value="supervisor">مشرف</Select.Option>
                    <Select.Option value="washer">غسال</Select.Option>
                    <Select.Option value="cashier">كاشير</Select.Option>
                    <Select.Option value="maintenance">صيانة</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="salary"
                  label="الراتب"
                  rules={[{ required: true, message: 'يرجى إدخال الراتب' }]}
                >
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="notes"
                  label="ملاحظات"
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
            
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Space>
                <Button onClick={() => setEditModalVisible(false)}>
                  إلغاء
                </Button>
                <Button type="primary" htmlType="submit">
                  حفظ التغييرات
                </Button>
              </Space>
            </div>
          </Form>
        )}
      </Modal>

      {/* نافذة جدول العمل */}
      <Modal
        title="جدول عمل الموظف"
        open={scheduleModalVisible}
        onCancel={() => setScheduleModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedEmployee && (
          <div>
            <Card title={`جدول عمل ${selectedEmployee.name}`} size="small">
              <List
                dataSource={Object.entries(selectedEmployee.schedule)}
                renderItem={([day, schedule]) => (
                  <List.Item>
                    <List.Item.Meta
                      title={getDayName(day)}
                      description={
                        <div>
                          <Text>
                            {schedule.active ? (
                              <>
                                <ClockCircleOutlined /> {schedule.start} - {schedule.end}
                              </>
                            ) : (
                              <Text type="secondary">إجازة</Text>
                            )}
                          </Text>
                        </div>
                      }
                    />
                    <Tag color={schedule.active ? 'green' : 'red'}>
                      {schedule.active ? 'نشط' : 'إجازة'}
                    </Tag>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        )}
      </Modal>

      {/* درج تفاصيل الموظف */}
      <Drawer
        title="تفاصيل الموظف"
        placement="right"
        width={600}
        onClose={() => setDetailsDrawerVisible(false)}
        open={detailsDrawerVisible}
      >
        {selectedEmployee && (
          <div>
            {/* معلومات أساسية */}
            <Card title="المعلومات الأساسية" size="small" style={{ marginBottom: 16 }}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="الاسم">
                  {selectedEmployee.name}
                </Descriptions.Item>
                <Descriptions.Item label="رقم الهاتف">
                  {selectedEmployee.phone}
                </Descriptions.Item>
                <Descriptions.Item label="البريد الإلكتروني">
                  {selectedEmployee.email}
                </Descriptions.Item>
                <Descriptions.Item label="الحالة">
                  <Tag color={getStatusColor(selectedEmployee.status)}>
                    {getStatusText(selectedEmployee.status)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="الدور الوظيفي">
                  <Tag color={getRoleColor(selectedEmployee.role)}>
                    {getRoleText(selectedEmployee.role)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="الفرع">
                  {selectedEmployee.branch}
                </Descriptions.Item>
                <Descriptions.Item label="القسم">
                  {selectedEmployee.department}
                </Descriptions.Item>
                <Descriptions.Item label="تاريخ التعيين">
                  {new Date(selectedEmployee.hireDate).toLocaleDateString('ar-SA')}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* إحصائيات الأداء */}
            <Card title="إحصائيات الأداء" size="small" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic
                    title="الأداء العام"
                    value={selectedEmployee.performance}
                    suffix="/5"
                    prefix={<StarOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="نسبة الحضور"
                    value={selectedEmployee.attendance}
                    suffix="%"
                    prefix={<CheckCircleOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Statistic
                    title="الطلبات المكتملة"
                    value={selectedEmployee.completedOrders}
                    prefix={<HistoryOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="تقييم العملاء"
                    value={selectedEmployee.customerRating}
                    suffix="/5"
                    prefix={<HeartOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={24}>
                  <Statistic
                    title="الراتب الشهري"
                    value={selectedEmployee.salary}
                    suffix="ريال"
                    prefix={<DollarOutlined />}
                  />
                </Col>
              </Row>
            </Card>

            {/* المهارات والشهادات */}
            <Card title="المهارات والشهادات" size="small" style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <Text strong>المهارات:</Text>
                <div style={{ marginTop: 8 }}>
                  {selectedEmployee.skills.map((skill, index) => (
                    <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
              <div>
                <Text strong>الشهادات:</Text>
                <div style={{ marginTop: 8 }}>
                  {selectedEmployee.certifications.map((cert, index) => (
                    <Tag key={index} color="green" style={{ marginBottom: 4 }}>
                      <SafetyCertificateOutlined /> {cert}
                    </Tag>
                  ))}
                </div>
              </div>
            </Card>

            {/* جهة الاتصال للطوارئ */}
            <Card title="جهة الاتصال للطوارئ" size="small" style={{ marginBottom: 16 }}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="الاسم">
                  {selectedEmployee.emergencyContact.name}
                </Descriptions.Item>
                <Descriptions.Item label="رقم الهاتف">
                  {selectedEmployee.emergencyContact.phone}
                </Descriptions.Item>
                <Descriptions.Item label="صلة القرابة">
                  {selectedEmployee.emergencyContact.relationship}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* سجل النشاط */}
            <Card title="سجل النشاط" size="small">
              <Timeline>
                <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                  <Text>تاريخ التعيين: {new Date(selectedEmployee.hireDate).toLocaleString('ar-SA')}</Text>
                </Timeline.Item>
                <Timeline.Item dot={<StarOutlined style={{ fontSize: '16px' }} />}>
                  <Text>الأداء الحالي: {selectedEmployee.performance}/5</Text>
                </Timeline.Item>
                <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: '16px' }} />}>
                  <Text>نسبة الحضور: {selectedEmployee.attendance}%</Text>
                </Timeline.Item>
                <Timeline.Item dot={<HistoryOutlined style={{ fontSize: '16px' }} />}>
                  <Text>الطلبات المكتملة: {selectedEmployee.completedOrders}</Text>
                </Timeline.Item>
              </Timeline>
            </Card>

            {selectedEmployee.notes && (
              <Card title="ملاحظات" size="small" style={{ marginTop: 16 }}>
                <Text>{selectedEmployee.notes}</Text>
              </Card>
            )}
          </div>
        )}
      </Drawer>

      {/* مكون فحص إدارة الموظفين */}
      <CrossCheckProvider 
        sectionName="employees" 
        position="top"
      />
    </div>
  );
};

// دالة مساعدة للحصول على اسم اليوم
const getDayName = (day) => {
  const days = {
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
    sunday: 'الأحد'
  };
  return days[day] || day;
};

export default EmployeeManagement; 