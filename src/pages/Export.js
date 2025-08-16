import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  Space,
  Form,
  message,
  Progress,
  List,
  Tag,
  Typography,
  Divider,
  Alert,
  Checkbox,
  Input,
  Modal,
  Tooltip,
  Badge,
  Tabs,
  Collapse,
  Switch,
  TimePicker
} from 'antd';
import {
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  SaveOutlined,
  ScheduleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  CloudDownloadOutlined,
  MailOutlined
} from '@ant-design/icons';

import { getExportData, getExportHistory, scheduleExport } from '../data/mockData';
import { useToast } from '../utils/toastService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Panel } = Collapse;

const Export = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportHistory, setExportHistory] = useState([]);
  const [scheduledExports, setScheduledExports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedExport, setSelectedExport] = useState(null);
  const [form] = Form.useForm();
  const [scheduleForm] = Form.useForm();

  useEffect(() => {
    loadExportHistory();
  }, []);

  const loadExportHistory = async () => {
    try {
      const history = await getExportHistory();
      setExportHistory(history);
    } catch (error) {
      toast.error('خطأ في تحميل سجل التصدير');
    }
  };

  const handleExport = async (values) => {
    setExporting(true);
    setExportProgress(0);
    
    try {
      // Simulate export progress
      const interval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setExportProgress(100);
      
      toast.success('تم تصدير البيانات بنجاح');
      loadExportHistory();
    } catch (error) {
      toast.error('خطأ في تصدير البيانات');
    } finally {
      setExporting(false);
      setExportProgress(0);
    }
  };

  const handleScheduleExport = async (values) => {
    try {
      await scheduleExport(values);
      toast.success('تم جدولة التصدير بنجاح');
      setScheduleModalVisible(false);
      loadExportHistory();
    } catch (error) {
      toast.error('خطأ في جدولة التصدير');
    }
  };

  const handleDeleteExport = async (id) => {
    try {
      // API call would go here
      toast.success('تم حذف التصدير المجدول بنجاح');
      loadExportHistory();
    } catch (error) {
      toast.error('خطأ في حذف التصدير');
    }
  };

  const handleDownload = (exportItem) => {
    // Simulate download
    toast.success('جاري تحميل الملف...');
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'green',
      in_progress: 'blue',
      failed: 'red',
      scheduled: 'orange',
      cancelled: 'gray'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      completed: 'مكتمل',
      in_progress: 'قيد التنفيذ',
      failed: 'فشل',
      scheduled: 'مجدول',
      cancelled: 'ملغي'
    };
    return texts[status] || status;
  };

  const getFormatIcon = (format) => {
    const icons = {
      excel: <FileExcelOutlined style={{ color: '#52c41a' }} />,
      pdf: <FilePdfOutlined style={{ color: '#ff4d4f' }} />,
      csv: <FileTextOutlined style={{ color: '#1890ff' }} />
    };
    return icons[format] || <FileTextOutlined />;
  };

  const exportOptions = [
    {
      title: 'تقرير الطلبات',
      key: 'orders',
      description: 'تصدير جميع الطلبات مع التفاصيل',
      icon: <FileTextOutlined />,
      formats: ['excel', 'pdf', 'csv']
    },
    {
      title: 'تقرير العملاء',
      key: 'customers',
      description: 'تصدير بيانات العملاء',
      icon: <FileTextOutlined />,
      formats: ['excel', 'pdf', 'csv']
    },
    {
      title: 'تقرير الموظفين',
      key: 'employees',
      description: 'تصدير بيانات الموظفين',
      icon: <FileTextOutlined />,
      formats: ['excel', 'pdf', 'csv']
    },
    {
      title: 'تقرير السيارات',
      key: 'cars',
      description: 'تصدير بيانات السيارات',
      icon: <FileTextOutlined />,
      formats: ['excel', 'pdf', 'csv']
    },
    {
      title: 'تقرير المغاسل',
      key: 'laundries',
      description: 'تصدير بيانات المغاسل',
      icon: <FileTextOutlined />,
      formats: ['excel', 'pdf', 'csv']
    },
    {
      title: 'تقرير المدفوعات',
      key: 'payments',
      description: 'تصدير بيانات المدفوعات',
      icon: <FileTextOutlined />,
      formats: ['excel', 'pdf', 'csv']
    },
    {
      title: 'تقرير مالي شامل',
      key: 'financial',
      description: 'تقرير مالي شامل لجميع العمليات',
      icon: <FileTextOutlined />,
      formats: ['excel', 'pdf']
    },
    {
      title: 'تقرير الأداء',
      key: 'performance',
      description: 'تقرير أداء الموظفين والمغاسل',
      icon: <FileTextOutlined />,
      formats: ['excel', 'pdf']
    }
  ];

  const items = [
    {
      key: 'quick',
      label: (
        <Space>
          <DownloadOutlined />
          <span>تصدير سريع</span>
        </Space>
      ),
      children: (
        <div>
          <Alert
            message="التصدير السريع"
            description="اختر نوع التقرير والبيانات المطلوبة للتصدير الفوري"
            type="info"
            showIcon
            style={{ marginBottom: '24px' }}
          />

          <Row gutter={[16, 16]}>
            {exportOptions.map(option => (
              <Col xs={24} sm={12} lg={8} key={option.key}>
                <Card
                  hoverable
                  className="export-option-card"
                  onClick={() => {
                    setSelectedExport(option);
                    setModalVisible(true);
                  }}
                >
                  <Card.Meta
                    avatar={option.icon}
                    title={option.title}
                    description={option.description}
                  />
                  <div style={{ marginTop: '12px' }}>
                    <Space wrap>
                      {option.formats.map(format => (
                        <Tag key={format} color="blue">
                          {format.toUpperCase()}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )
    },
    {
      key: 'scheduled',
      label: (
        <Space>
          <ScheduleOutlined />
          <span>التصدير المجدول</span>
        </Space>
      ),
      children: (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              icon={<ScheduleOutlined />}
              onClick={() => setScheduleModalVisible(true)}
            >
              جدولة تصدير جديد
            </Button>
          </div>

          <List
            dataSource={scheduledExports}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Tooltip title="تعديل">
                    <Button type="text" icon={<EditOutlined />} />
                  </Tooltip>,
                  <Tooltip title="حذف">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteExport(item.id)}
                    />
                  </Tooltip>
                ]}
              >
                <List.Item.Meta
                  avatar={getFormatIcon(item.format)}
                  title={item.name}
                  description={
                    <Space direction="vertical" size="small">
                      <Text>{item.description}</Text>
                      <Space>
                        <Tag color={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Tag>
                        <Text type="secondary">
                          التكرار: {item.frequency}
                        </Text>
                      </Space>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )
    },
    {
      key: 'history',
      label: (
        <Space>
          <ClockCircleOutlined />
          <span>سجل التصدير</span>
        </Space>
      ),
      children: (
        <div>
          <List
            dataSource={exportHistory}
            renderItem={(item) => (
              <List.Item
                actions={[
                  item.status === 'completed' && (
                    <Tooltip title="تحميل">
                      <Button
                        type="text"
                        icon={<CloudDownloadOutlined />}
                        onClick={() => handleDownload(item)}
                      />
                    </Tooltip>
                  ),
                  <Tooltip title="حذف">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteExport(item.id)}
                    />
                  </Tooltip>
                ]}
              >
                <List.Item.Meta
                  avatar={getFormatIcon(item.format)}
                  title={item.name}
                  description={
                    <Space direction="vertical" size="small">
                      <Text>{item.description}</Text>
                      <Space>
                        <Tag color={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Tag>
                        <Text type="secondary">
                          {new Date(item.createdAt).toLocaleString('ar-SA')}
                        </Text>
                        {item.fileSize && (
                          <Text type="secondary">
                            الحجم: {item.fileSize}
                          </Text>
                        )}
                      </Space>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )
    }
  ];

  return (
    <div className="export-page">
      <div className="page-header">
        <h1>تصدير البيانات</h1>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadExportHistory}
            loading={loading}
          >
            تحديث
          </Button>
        </Space>
      </div>

      {exporting && (
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <SyncOutlined spin style={{ fontSize: '24px', marginBottom: '8px' }} />
            <div>جاري تصدير البيانات...</div>
            <Progress percent={exportProgress} status="active" />
          </div>
        </Card>
      )}

      <Tabs
        items={items}
        defaultActiveKey="quick"
        size="large"
        style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px' }}
      />

      {/* Export Modal */}
      <Modal
        title={`تصدير ${selectedExport?.title}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedExport && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleExport}
          >
            <Form.Item
              name="format"
              label="صيغة الملف"
              rules={[{ required: true, message: 'يرجى اختيار صيغة الملف' }]}
            >
              <Select placeholder="اختر صيغة الملف">
                {selectedExport.formats.map(format => (
                  <Option key={format} value={format}>
                    <Space>
                      {getFormatIcon(format)}
                      {format.toUpperCase()}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="dateRange"
              label="نطاق التاريخ"
            >
              <RangePicker
                style={{ width: '100%' }}
                placeholder={['من تاريخ', 'إلى تاريخ']}
              />
            </Form.Item>

            <Form.Item
              name="filters"
              label="فلاتر إضافية"
            >
              <Checkbox.Group>
                <Space direction="vertical">
                  <Checkbox value="includeDeleted">تضمين المحذوفة</Checkbox>
                  <Checkbox value="includeArchived">تضمين المؤرشفة</Checkbox>
                  <Checkbox value="detailed">تفاصيل كاملة</Checkbox>
                </Space>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="email"
              label="إرسال إلى البريد الإلكتروني"
            >
              <Input placeholder="example@email.com" />
            </Form.Item>

            <Form.Item
              name="notes"
              label="ملاحظات"
            >
              <TextArea rows={3} placeholder="ملاحظات إضافية..." />
            </Form.Item>

            <div className="form-actions">
              <Button onClick={() => setModalVisible(false)}>
                إلغاء
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={exporting}
                icon={<DownloadOutlined />}
              >
                تصدير
              </Button>
            </div>
          </Form>
        )}
      </Modal>

      {/* Schedule Modal */}
      <Modal
        title="جدولة تصدير جديد"
        open={scheduleModalVisible}
        onCancel={() => setScheduleModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={scheduleForm}
          layout="vertical"
          onFinish={handleScheduleExport}
        >
          <Form.Item
            name="name"
            label="اسم التصدير"
            rules={[{ required: true, message: 'يرجى إدخال اسم التصدير' }]}
          >
            <Input placeholder="مثال: تقرير الطلبات اليومي" />
          </Form.Item>

          <Form.Item
            name="type"
            label="نوع التقرير"
            rules={[{ required: true, message: 'يرجى اختيار نوع التقرير' }]}
          >
            <Select placeholder="اختر نوع التقرير">
              {exportOptions.map(option => (
                <Option key={option.key} value={option.key}>
                  {option.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="format"
            label="صيغة الملف"
            rules={[{ required: true, message: 'يرجى اختيار صيغة الملف' }]}
          >
            <Select placeholder="اختر صيغة الملف">
              <Option value="excel">Excel</Option>
              <Option value="pdf">PDF</Option>
              <Option value="csv">CSV</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="frequency"
            label="التكرار"
            rules={[{ required: true, message: 'يرجى اختيار التكرار' }]}
          >
            <Select placeholder="اختر التكرار">
              <Option value="daily">يومي</Option>
              <Option value="weekly">أسبوعي</Option>
              <Option value="monthly">شهري</Option>
              <Option value="custom">مخصص</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="time"
            label="وقت التصدير"
            rules={[{ required: true, message: 'يرجى اختيار وقت التصدير' }]}
          >
            <TimePicker
              format="HH:mm"
              placeholder="اختر الوقت"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="إرسال إلى البريد الإلكتروني"
            rules={[
              { required: true, message: 'يرجى إدخال البريد الإلكتروني' },
              { type: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح' }
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="enabled"
            label="تفعيل الجدولة"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <div className="form-actions">
            <Button onClick={() => setScheduleModalVisible(false)}>
              إلغاء
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              حفظ الجدولة
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Export; 