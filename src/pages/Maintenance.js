import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Table,
  Tag,
  Button,
  Input,
  Select,
  DatePicker,
  Space,
  Modal,
  Form,
  message,
  Tooltip as AntdTooltip,
  Badge,
  Divider,
  Descriptions,
  Timeline,
  Upload
} from 'antd';
import {
  ToolOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  CarOutlined,
  UserOutlined,
  DollarOutlined,
  FileTextOutlined,
  CameraOutlined
} from '@ant-design/icons';
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { getMaintenanceData, getMaintenanceStats } from '../data/mockData';
import { useToast } from '../utils/toastService';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

const Maintenance = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    priority: 'all',
    dateRange: null
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [maintenanceData, maintenanceStats] = await Promise.all([
        getMaintenanceData(filters),
        getMaintenanceStats()
      ]);
      setData(maintenanceData);
      setStats(maintenanceStats);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setDetailModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // API call would go here
      toast.success('تم حذف الصيانة بنجاح');
      fetchData();
    } catch (error) {
      toast.error('خطأ في حذف الصيانة');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedRecord) {
        // Update existing record
        toast.success('تم تحديث الصيانة بنجاح');
      } else {
        // Add new record
        toast.success('تم إضافة الصيانة بنجاح');
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {
      toast.error('خطأ في حفظ البيانات');
    }
  };

  const handleExport = () => {
    toast.info('سيتم تصدير البيانات قريباً');
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'blue',
      in_progress: 'orange',
      completed: 'green',
      overdue: 'red',
      cancelled: 'gray'
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'green',
      medium: 'orange',
      high: 'red',
      critical: 'red'
    };
    return colors[priority] || 'default';
  };

  const columns = [
    {
      title: 'رقم الصيانة',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: 'نوع الصيانة',
      dataIndex: 'type',
      key: 'type',
      width: 120
    },
    {
      title: 'السيارة',
      dataIndex: 'car',
      key: 'car',
      width: 150,
      render: (car) => `${car.brand} ${car.model}`
    },
    {
      title: 'الموظف المسؤول',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: 150,
      render: (employee) => employee.name
    },
    {
      title: 'تاريخ الجدولة',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString('ar-SA')
    },
    {
      title: 'الأولوية',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority === 'low' && 'منخفضة'}
          {priority === 'medium' && 'متوسطة'}
          {priority === 'high' && 'عالية'}
          {priority === 'critical' && 'حرجة'}
        </Tag>
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'scheduled' && 'مجدولة'}
          {status === 'in_progress' && 'قيد التنفيذ'}
          {status === 'completed' && 'مكتملة'}
          {status === 'overdue' && 'متأخرة'}
          {status === 'cancelled' && 'ملغية'}
        </Tag>
      )
    },
    {
      title: 'التكلفة',
      dataIndex: 'cost',
      key: 'cost',
      width: 100,
      render: (cost) => `$${cost.toFixed(2)}`
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <AntdTooltip title="عرض التفاصيل">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            />
          </AntdTooltip>
          <AntdTooltip title="تعديل">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </AntdTooltip>
          <AntdTooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </AntdTooltip>
        </Space>
      )
    }
  ];

  const statusData = [
    { type: 'مجدولة', value: stats.scheduled || 0 },
    { type: 'قيد التنفيذ', value: stats.inProgress || 0 },
    { type: 'مكتملة', value: stats.completed || 0 },
    { type: 'متأخرة', value: stats.overdue || 0 },
    { type: 'ملغية', value: stats.cancelled || 0 }
  ];

  const typeData = [
    { type: 'صيانة دورية', value: stats.periodic || 0 },
    { type: 'صيانة طارئة', value: stats.emergency || 0 },
    { type: 'إصلاح', value: stats.repair || 0 },
    { type: 'فحص', value: stats.inspection || 0 }
  ];

  const monthlyData = [
    { month: 'يناير', cost: 2500, count: 15 },
    { month: 'فبراير', cost: 3200, count: 18 },
    { month: 'مارس', cost: 2800, count: 16 },
    { month: 'أبريل', cost: 4100, count: 22 },
    { month: 'مايو', cost: 3600, count: 20 },
    { month: 'يونيو', cost: 3900, count: 21 }
  ];

  return (
    <div className="maintenance-page">
      <div className="page-header">
        <h1>إدارة الصيانة</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          إضافة صيانة جديدة
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-item">
            <div className="ant-statistic">
              <div className="anticon" style={{ color: '#1890ff' }}><ToolOutlined /></div>
              <div className="ant-statistic-content-value">{stats.total || 0}</div>
              <div className="ant-statistic-title">إجمالي الصيانة</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-item">
            <div className="ant-statistic">
              <div className="anticon" style={{ color: '#faad14' }}><ClockCircleOutlined /></div>
              <div className="ant-statistic-content-value">{stats.inProgress || 0}</div>
              <div className="ant-statistic-title">قيد التنفيذ</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-item">
            <div className="ant-statistic">
              <div className="anticon" style={{ color: '#52c41a' }}><CheckCircleOutlined /></div>
              <div className="ant-statistic-content-value">{stats.completedThisMonth || 0}</div>
              <div className="ant-statistic-title">مكتملة هذا الشهر</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-item">
            <div className="ant-statistic">
              <div className="anticon" style={{ color: '#722ed1' }}><DollarOutlined /></div>
              <div className="ant-statistic-content-value">{stats.totalCost || 0} <span style={{fontSize:'24px'}}>$</span></div>
              <div className="ant-statistic-title">إجمالي التكلفة</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="charts-row">
        <Col xs={24} lg={12}>
          <Card title="توزيع الحالات" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#52c41a', '#ff4d4f', '#fa8c16', '#1890ff', '#722ed1'][index % 5]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="توزيع الأنواع" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="value" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="charts-row">
        <Col xs={24}>
          <Card title="التكلفة الشهرية" className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line type="monotone" dataKey="cost" stroke="#1890ff" name="التكلفة" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="filters-card">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="البحث في الصيانة..."
              prefix={<SearchOutlined />}
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="الحالة"
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              style={{ width: '100%' }}
            >
              <Option value="all">جميع الحالات</Option>
              <Option value="scheduled">مجدولة</Option>
              <Option value="in_progress">قيد التنفيذ</Option>
              <Option value="completed">مكتملة</Option>
              <Option value="overdue">متأخرة</Option>
              <Option value="cancelled">ملغية</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="النوع"
              value={filters.type}
              onChange={(value) => handleFilterChange('type', value)}
              style={{ width: '100%' }}
            >
              <Option value="all">جميع الأنواع</Option>
              <Option value="periodic">صيانة دورية</Option>
              <Option value="emergency">صيانة طارئة</Option>
              <Option value="repair">إصلاح</Option>
              <Option value="inspection">فحص</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="الأولوية"
              value={filters.priority}
              onChange={(value) => handleFilterChange('priority', value)}
              style={{ width: '100%' }}
            >
              <Option value="all">جميع الأولويات</Option>
              <Option value="low">منخفضة</Option>
              <Option value="medium">متوسطة</Option>
              <Option value="high">عالية</Option>
              <Option value="critical">حرجة</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker
              placeholder={['من تاريخ', 'إلى تاريخ']}
              value={filters.dateRange}
              onChange={(dates) => handleFilterChange('dateRange', dates)}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Table */}
      <Card
        title="سجل الصيانة"
        extra={
          <Button
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            تصدير
          </Button>
        }
        className="table-card"
      >
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={{
            total: data.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} صيانة`
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={selectedRecord ? 'تعديل الصيانة' : 'إضافة صيانة جديدة'}
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
                name="type"
                label="نوع الصيانة"
                rules={[{ required: true, message: 'يرجى اختيار نوع الصيانة' }]}
              >
                <Select placeholder="اختر نوع الصيانة">
                  <Option value="periodic">صيانة دورية</Option>
                  <Option value="emergency">صيانة طارئة</Option>
                  <Option value="repair">إصلاح</Option>
                  <Option value="inspection">فحص</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="الأولوية"
                rules={[{ required: true, message: 'يرجى اختيار الأولوية' }]}
              >
                <Select placeholder="اختر الأولوية">
                  <Option value="low">منخفضة</Option>
                  <Option value="medium">متوسطة</Option>
                  <Option value="high">عالية</Option>
                  <Option value="critical">حرجة</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="carId"
                label="السيارة"
                rules={[{ required: true, message: 'يرجى اختيار السيارة' }]}
              >
                <Select placeholder="اختر السيارة">
                  <Option value="1">تويوتا كامري 2023</Option>
                  <Option value="2">هوندا سيفيك 2022</Option>
                  <Option value="3">نيسان ألتيما 2023</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="assignedToId"
                label="الموظف المسؤول"
                rules={[{ required: true, message: 'يرجى اختيار الموظف' }]}
              >
                <Select placeholder="اختر الموظف">
                  <Option value="1">أحمد محمد</Option>
                  <Option value="2">علي حسن</Option>
                  <Option value="3">محمد علي</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="scheduledDate"
                label="تاريخ الجدولة"
                rules={[{ required: true, message: 'يرجى اختيار التاريخ' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="estimatedCost"
                label="التكلفة المتوقعة"
                rules={[{ required: true, message: 'يرجى إدخال التكلفة' }]}
              >
                <Input prefix="$" type="number" placeholder="0.00" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="وصف الصيانة"
            rules={[{ required: true, message: 'يرجى إدخال الوصف' }]}
          >
            <TextArea rows={4} placeholder="وصف تفصيلي للصيانة المطلوبة..." />
          </Form.Item>

          <Form.Item
            name="notes"
            label="ملاحظات إضافية"
          >
            <TextArea rows={3} placeholder="ملاحظات إضافية..." />
          </Form.Item>

          <div className="form-actions">
            <Button onClick={() => setModalVisible(false)}>
              إلغاء
            </Button>
            <Button type="primary" htmlType="submit">
              {selectedRecord ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Details Modal */}
      <Modal
        title="تفاصيل الصيانة"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedRecord && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="رقم الصيانة" span={1}>
                {selectedRecord.id}
              </Descriptions.Item>
              <Descriptions.Item label="الحالة" span={1}>
                <Tag color={getStatusColor(selectedRecord.status)}>
                  {selectedRecord.status === 'scheduled' && 'مجدولة'}
                  {selectedRecord.status === 'in_progress' && 'قيد التنفيذ'}
                  {selectedRecord.status === 'completed' && 'مكتملة'}
                  {selectedRecord.status === 'overdue' && 'متأخرة'}
                  {selectedRecord.status === 'cancelled' && 'ملغية'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="نوع الصيانة" span={1}>
                {selectedRecord.type === 'periodic' && 'صيانة دورية'}
                {selectedRecord.type === 'emergency' && 'صيانة طارئة'}
                {selectedRecord.type === 'repair' && 'إصلاح'}
                {selectedRecord.type === 'inspection' && 'فحص'}
              </Descriptions.Item>
              <Descriptions.Item label="الأولوية" span={1}>
                <Tag color={getPriorityColor(selectedRecord.priority)}>
                  {selectedRecord.priority === 'low' && 'منخفضة'}
                  {selectedRecord.priority === 'medium' && 'متوسطة'}
                  {selectedRecord.priority === 'high' && 'عالية'}
                  {selectedRecord.priority === 'critical' && 'حرجة'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="السيارة" span={2}>
                {selectedRecord.car.brand} {selectedRecord.car.model} - {selectedRecord.car.plateNumber}
              </Descriptions.Item>
              <Descriptions.Item label="الموظف المسؤول" span={1}>
                {selectedRecord.assignedTo.name}
              </Descriptions.Item>
              <Descriptions.Item label="تاريخ الجدولة" span={1}>
                {new Date(selectedRecord.scheduledDate).toLocaleDateString('ar-SA')}
              </Descriptions.Item>
              <Descriptions.Item label="التكلفة" span={1}>
                ${selectedRecord.cost.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="تاريخ الإنشاء" span={1}>
                {new Date(selectedRecord.createdAt).toLocaleDateString('ar-SA')}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <h4>وصف الصيانة</h4>
            <p>{selectedRecord.description}</p>

            {selectedRecord.notes && (
              <>
                <Divider />
                <h4>ملاحظات إضافية</h4>
                <p>{selectedRecord.notes}</p>
              </>
            )}

            <Divider />

            <h4>سجل التحديثات</h4>
            <Timeline>
              <Timeline.Item color="green">
                <p>تم إنشاء الصيانة</p>
                <small>{new Date(selectedRecord.createdAt).toLocaleString('ar-SA')}</small>
              </Timeline.Item>
              {selectedRecord.status === 'in_progress' && (
                <Timeline.Item color="blue">
                  <p>تم بدء العمل</p>
                  <small>{new Date(selectedRecord.startedAt).toLocaleString('ar-SA')}</small>
                </Timeline.Item>
              )}
              {selectedRecord.status === 'completed' && (
                <Timeline.Item color="green">
                  <p>تم إكمال الصيانة</p>
                  <small>{new Date(selectedRecord.completedAt).toLocaleString('ar-SA')}</small>
                </Timeline.Item>
              )}
            </Timeline>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Maintenance; 