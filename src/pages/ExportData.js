import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Tag, 
  Typography, 
  Row, 
  Col,
  Statistic,
  Tooltip,
  message,
  Spin,
  Progress,
  List,
  Divider,
  Checkbox
} from 'antd';
import { 
  DownloadOutlined, 
  FileExcelOutlined, 
  FilePdfOutlined, 
  FileTextOutlined,
  CalendarOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';
import { usePermissions } from '../context/PermissionContext';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Content } = Layout;

const ExportData = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { hasPermission, filterDataByScope } = usePermissions();
  const [exportHistory, setExportHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchExportHistory();
  }, []);

  const fetchExportHistory = async () => {
    setLoading(true);
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockHistory = [
        {
          id: 1,
          name: 'تقرير الإيرادات الشهرية',
          type: 'revenue_report',
          format: 'excel',
          status: 'completed',
          fileSize: '2.5 MB',
          createdAt: '2024-03-03T10:00:00Z',
          completedAt: '2024-03-03T10:02:00Z',
          downloadUrl: '#',
          filters: {
            dateRange: ['2024-01-01', '2024-03-01'],
            branches: ['all'],
            dataTypes: ['orders', 'payments', 'revenue']
          }
        },
        {
          id: 2,
          name: 'تقرير الطلبات اليومية',
          type: 'orders_report',
          format: 'pdf',
          status: 'completed',
          fileSize: '1.8 MB',
          createdAt: '2024-03-02T15:30:00Z',
          completedAt: '2024-03-02T15:32:00Z',
          downloadUrl: '#',
          filters: {
            dateRange: ['2024-03-01', '2024-03-02'],
            branches: [1],
            dataTypes: ['orders']
          }
        },
        {
          id: 3,
          name: 'تقرير العملاء',
          type: 'customers_report',
          format: 'csv',
          status: 'processing',
          fileSize: null,
          createdAt: '2024-03-03T11:00:00Z',
          completedAt: null,
          downloadUrl: null,
          progress: 65,
          filters: {
            dateRange: ['2024-01-01', '2024-03-03'],
            branches: ['all'],
            dataTypes: ['customers', 'loyalty']
          }
        }
      ];

      setExportHistory(mockHistory);
    } catch (error) {
      message.error('حدث خطأ أثناء تحميل سجل التصدير');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (values) => {
    setExporting(true);
    try {
      // محاكاة عملية التصدير
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newExport = {
        id: Date.now(),
        name: values.reportName,
        type: values.reportType,
        format: values.format,
        status: 'completed',
        fileSize: `${Math.random() * 5 + 1} MB`,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        downloadUrl: '#',
        filters: {
          dateRange: values.dateRange ? [
            values.dateRange[0].format('YYYY-MM-DD'),
            values.dateRange[1].format('YYYY-MM-DD')
          ] : null,
          branches: values.branches || ['all'],
          dataTypes: values.dataTypes || []
        }
      };

      setExportHistory(prev => [newExport, ...prev]);
      message.success('تم تصدير البيانات بنجاح');
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('حدث خطأ أثناء تصدير البيانات');
    } finally {
      setExporting(false);
    }
  };

  const handleDownload = (record) => {
    // محاكاة تحميل الملف
    message.success(`جاري تحميل ${record.name}`);
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'excel': return <FileExcelOutlined style={{ color: '#217346' }} />;
      case 'pdf': return <FilePdfOutlined style={{ color: '#ff0000' }} />;
      case 'csv': return <FileTextOutlined style={{ color: '#1890ff' }} />;
      default: return <FileTextOutlined />;
    }
  };

  const getFormatText = (format) => {
    switch (format) {
      case 'excel': return 'Excel';
      case 'pdf': return 'PDF';
      case 'csv': return 'CSV';
      default: return format;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'processing': return 'blue';
      case 'failed': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return lang === 'ar' ? 'مكتمل' : 'Completed';
      case 'processing': return lang === 'ar' ? 'قيد المعالجة' : 'Processing';
      case 'failed': return lang === 'ar' ? 'فشل' : 'Failed';
      default: return status;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'revenue_report': return lang === 'ar' ? 'تقرير الإيرادات' : 'Revenue Report';
      case 'orders_report': return lang === 'ar' ? 'تقرير الطلبات' : 'Orders Report';
      case 'customers_report': return lang === 'ar' ? 'تقرير العملاء' : 'Customers Report';
      case 'branches_report': return lang === 'ar' ? 'تقرير الفروع' : 'Branches Report';
      case 'loyalty_report': return lang === 'ar' ? 'تقرير الولاء' : 'Loyalty Report';
      default: return type;
    }
  };

  const columns = [
    {
      title: lang === 'ar' ? 'اسم التقرير' : 'Report Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <Text strong>{name}</Text>
    },
    {
      title: lang === 'ar' ? 'النوع' : 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color="blue">
          {getTypeText(type)}
        </Tag>
      )
    },
    {
      title: lang === 'ar' ? 'الصيغة' : 'Format',
      dataIndex: 'format',
      key: 'format',
      render: (format) => (
        <Space>
          {getFormatIcon(format)}
          <Text>{getFormatText(format)}</Text>
        </Space>
      )
    },
    {
      title: lang === 'ar' ? 'الحالة' : 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <div>
          <Tag color={getStatusColor(status)}>
            {getStatusText(status)}
          </Tag>
          {status === 'processing' && record.progress && (
            <Progress percent={record.progress} size="small" style={{ marginTop: 4 }} />
          )}
        </div>
      )
    },
    {
      title: lang === 'ar' ? 'حجم الملف' : 'File Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (fileSize) => fileSize || '-'
    },
    {
      title: lang === 'ar' ? 'تاريخ الإنشاء' : 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => moment(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: lang === 'ar' ? 'الإجراءات' : 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'completed' && (
            <Tooltip title={lang === 'ar' ? 'تحميل' : 'Download'}>
              <Button 
                type="text" 
                icon={<DownloadOutlined />} 
                onClick={() => handleDownload(record)}
              />
            </Tooltip>
          )}
          {record.status === 'processing' && (
            <Tooltip title={lang === 'ar' ? 'قيد المعالجة' : 'Processing'}>
              <Button 
                type="text" 
                icon={<ClockCircleOutlined />} 
                disabled
              />
            </Tooltip>
          )}
        </Space>
      )
    }
  ];

  const stats = {
    totalExports: exportHistory.length,
    completedExports: exportHistory.filter(e => e.status === 'completed').length,
    processingExports: exportHistory.filter(e => e.status === 'processing').length,
    totalFileSize: '15.2 MB'
  };

  const reportTypes = [
    {
      value: 'revenue_report',
      label: lang === 'ar' ? 'تقرير الإيرادات' : 'Revenue Report',
      description: lang === 'ar' ? 'تقرير شامل للإيرادات والمبيعات' : 'Comprehensive revenue and sales report'
    },
    {
      value: 'orders_report',
      label: lang === 'ar' ? 'تقرير الطلبات' : 'Orders Report',
      description: lang === 'ar' ? 'تفاصيل جميع الطلبات وحالاتها' : 'Details of all orders and their status'
    },
    {
      value: 'customers_report',
      label: lang === 'ar' ? 'تقرير العملاء' : 'Customers Report',
      description: lang === 'ar' ? 'بيانات العملاء ونشاطهم' : 'Customer data and activity'
    },
    {
      value: 'branches_report',
      label: lang === 'ar' ? 'تقرير الفروع' : 'Branches Report',
      description: lang === 'ar' ? 'أداء الفروع والإحصائيات' : 'Branch performance and statistics'
    },
    {
      value: 'loyalty_report',
      label: lang === 'ar' ? 'تقرير الولاء' : 'Loyalty Report',
      description: lang === 'ar' ? 'برامج الولاء ونقاط العملاء' : 'Loyalty programs and customer points'
    }
  ];

  return (
    <Layout style={{ padding: 24 }}>
      <Content>
        {/* العنوان والإحصائيات */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>{t('exportData')}</Title>
          <Text type="secondary">
            {lang === 'ar' ? 'تصدير البيانات والتقارير بصيغ مختلفة' : 'Export data and reports in different formats'}
          </Text>
        </div>

        {/* إحصائيات سريعة */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={lang === 'ar' ? 'إجمالي التصدير' : 'Total Exports'}
                value={stats.totalExports}
                prefix={<DatabaseOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={lang === 'ar' ? 'التصدير المكتمل' : 'Completed Exports'}
                value={stats.completedExports}
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={lang === 'ar' ? 'قيد المعالجة' : 'Processing'}
                value={stats.processingExports}
                valueStyle={{ color: '#1890ff' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={lang === 'ar' ? 'إجمالي الحجم' : 'Total Size'}
                value={stats.totalFileSize}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* زر تصدير جديد */}
        <Card 
          title={lang === 'ar' ? 'تصدير جديد' : 'New Export'}
          style={{ marginBottom: 24 }}
        >
          <Button 
            type="primary" 
            size="large"
            icon={<DownloadOutlined />}
            onClick={() => setModalVisible(true)}
            disabled={!hasPermission('reports.export')}
          >
            {lang === 'ar' ? 'بدء تصدير جديد' : 'Start New Export'}
          </Button>
        </Card>

        {/* سجل التصدير */}
        <Card title={lang === 'ar' ? 'سجل التصدير' : 'Export History'}>
          <Table
            columns={columns}
            dataSource={exportHistory}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} من ${total} تصدير`
            }}
          />
        </Card>

        {/* Modal تصدير جديد */}
        <Modal
          title={lang === 'ar' ? 'تصدير بيانات جديد' : 'New Data Export'}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleExport}
          >
            <Form.Item
              name="reportName"
              label={lang === 'ar' ? 'اسم التقرير' : 'Report Name'}
              rules={[{ required: true, message: lang === 'ar' ? 'يرجى إدخال اسم التقرير' : 'Please enter report name' }]}
            >
              <Input placeholder={lang === 'ar' ? 'مثال: تقرير الإيرادات مارس 2024' : 'Example: March 2024 Revenue Report'} />
            </Form.Item>

            <Form.Item
              name="reportType"
              label={lang === 'ar' ? 'نوع التقرير' : 'Report Type'}
              rules={[{ required: true, message: lang === 'ar' ? 'يرجى اختيار نوع التقرير' : 'Please select report type' }]}
            >
              <Select placeholder={lang === 'ar' ? 'اختر نوع التقرير' : 'Select report type'}>
                {reportTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    <div>
                      <div>{type.label}</div>
                      <div style={{ fontSize: 12, color: '#666' }}>{type.description}</div>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="format"
                  label={lang === 'ar' ? 'صيغة التصدير' : 'Export Format'}
                  rules={[{ required: true, message: lang === 'ar' ? 'يرجى اختيار الصيغة' : 'Please select format' }]}
                >
                  <Select placeholder={lang === 'ar' ? 'اختر الصيغة' : 'Select format'}>
                    <Option value="excel">
                      <Space>
                        <FileExcelOutlined style={{ color: '#217346' }} />
                        Excel (.xlsx)
                      </Space>
                    </Option>
                    <Option value="pdf">
                      <Space>
                        <FilePdfOutlined style={{ color: '#ff0000' }} />
                        PDF (.pdf)
                      </Space>
                    </Option>
                    <Option value="csv">
                      <Space>
                        <FileTextOutlined style={{ color: '#1890ff' }} />
                        CSV (.csv)
                      </Space>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateRange"
                  label={lang === 'ar' ? 'الفترة الزمنية' : 'Date Range'}
                >
                  <RangePicker 
                    style={{ width: '100%' }}
                    placeholder={[
                      lang === 'ar' ? 'من تاريخ' : 'From Date',
                      lang === 'ar' ? 'إلى تاريخ' : 'To Date'
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="dataTypes"
              label={lang === 'ar' ? 'أنواع البيانات' : 'Data Types'}
              rules={[{ required: true, message: lang === 'ar' ? 'يرجى اختيار أنواع البيانات' : 'Please select data types' }]}
            >
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox value="orders">{lang === 'ar' ? 'الطلبات' : 'Orders'}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="payments">{lang === 'ar' ? 'المدفوعات' : 'Payments'}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="customers">{lang === 'ar' ? 'العملاء' : 'Customers'}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="revenue">{lang === 'ar' ? 'الإيرادات' : 'Revenue'}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="loyalty">{lang === 'ar' ? 'الولاء' : 'Loyalty'}</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="ratings">{lang === 'ar' ? 'التقييمات' : 'Ratings'}</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={() => {
                  setModalVisible(false);
                  form.resetFields();
                }}>
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={exporting}
                  icon={<DownloadOutlined />}
                >
                  {exporting ? (lang === 'ar' ? 'جاري التصدير...' : 'Exporting...') : (lang === 'ar' ? 'بدء التصدير' : 'Start Export')}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ExportData; 