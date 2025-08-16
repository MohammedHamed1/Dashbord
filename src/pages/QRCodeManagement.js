import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Tag,
  Typography,
  Tooltip,
  Badge,
  Divider,
  Alert,
  Tabs,
  Collapse,
  Upload,
  Switch,
  InputNumber,
  TimePicker,
  message,
  Popconfirm,
  Avatar,
  List,
  Progress,
  Statistic,
  Descriptions,
  Spin,
  Row as AntRow,
  Col as AntCol
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  ScanOutlined,
  QrcodeOutlined,
  CopyOutlined,
  ReloadOutlined,
  SettingOutlined,
  HistoryOutlined,
  BarChartOutlined,
  ExportOutlined,
  ImportOutlined,
  SecurityScanOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  CarOutlined,
  ShopOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  StopOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useToast } from '../utils/toastService';
import QRCodeGenerator from '../components/QRCodeGenerator';
import QRCodeScanner from '../components/QRCodeScanner';
import QRCodeSettings from '../components/QRCodeSettings';
import './Pages.css';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const QRCodeManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState('all');
  const [processing, setProcessing] = useState(false);
  const [qrSettings, setQrSettings] = useState({
    security: {
      encryption: true,
      digitalSignature: true,
      watermark: true,
      antiForgery: true,
      maxUses: 5,
      expiryDays: 30,
      requireVerification: true
    },
    design: {
      customColors: false,
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      logo: null,
      showWatermark: true,
      watermarkText: 'مغسلة النظافة الذكية',
      customStyle: false
    },
    scanning: {
      autoFocus: true,
      continuousScan: true,
      highResolution: true,
      enableTorch: false,
      maxScanAttempts: 3,
      showPreview: true,
      soundEnabled: true
    },
    notifications: {
      scanSuccess: true,
      scanError: true,
      expiryWarning: true,
      securityAlert: true,
      emailNotifications: false,
      smsNotifications: false,
      pushNotifications: true
    },
    advanced: {
      backupCodes: true,
      offlineMode: false,
      analytics: true,
      debugMode: false,
      performanceMode: 'balanced'
    }
  });
  const [usageLogVisible, setUsageLogVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const toast = useToast();

  // تحميل البيانات
  useEffect(() => {
    loadQRCodes();
  }, []);

  const loadQRCodes = async () => {
    setLoading(true);
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = [
        {
          id: 1,
          code: 'QR_ORDER_001',
          orderId: '1234',
          customerName: 'علي محمود',
          customerPhone: '+966505678901',
          customerEmail: 'ali@example.com',
          laundryName: 'مغسلة النظافة الذكية',
          branchName: 'الفرع الرئيسي',
          status: 'used',
          type: 'package',
          washesRemaining: 4,
          totalWashes: 5,
          createdAt: '2024-03-01T10:30:00Z',
          expiresAt: '2024-04-03T16:45:00Z',
          usedAt: '2024-03-02T14:20:00Z',
          scannedBy: 'محمد حسن',
          scannedAt: '2024-03-02T14:20:00Z',
          lastUsed: '2024-03-02T14:20:00Z',
          usageHistory: [
            { date: '2024-03-02T14:20:00Z', employee: 'محمد حسن', service: 'غسيل خارجي' }
          ],
          carInfo: {
            brand: 'تويوتا',
            model: 'كامري',
            plateNumber: 'أ ب ج 1234',
            color: 'أبيض',
            size: 'medium'
          },
          serviceDetails: {
            type: 'غسيل مميز',
            price: 80,
            duration: 45
          },
          packageType: 'basic',
          purchaseDate: '2024-03-01T10:30:00Z',
          packageStatus: 'valid'
        },
        {
          id: 2,
          code: 'QR_ORDER_002',
          orderId: '1235',
          customerName: 'نور الدين',
          customerPhone: '+966506789012',
          customerEmail: 'nour@example.com',
          laundryName: 'مغسلة النظافة الذكية',
          branchName: 'فرع الرياض',
          status: 'active',
          type: 'single',
          washesRemaining: 1,
          totalWashes: 1,
          createdAt: '2024-03-02T09:15:00Z',
          expiresAt: '2024-04-03T09:15:00Z',
          usedAt: null,
          scannedBy: null,
          scannedAt: null,
          lastUsed: null,
          usageHistory: [],
          carInfo: {
            brand: 'نيسان',
            model: 'باترول',
            plateNumber: 'د ه و 5678',
            color: 'أسود',
            size: 'small'
          },
          serviceDetails: {
            type: 'غسيل فاخر',
            price: 120,
            duration: 75
          },
          packageType: 'advanced',
          purchaseDate: '2024-03-02T09:15:00Z',
          packageStatus: 'valid'
        },
        {
          id: 3,
          code: 'QR_ORDER_003',
          orderId: '1236',
          customerName: 'فاطمة أحمد',
          customerPhone: '+966507890123',
          customerEmail: 'fatima@example.com',
          laundryName: 'مغسلة النظافة الذكية',
          branchName: 'الفرع الرئيسي',
          status: 'active',
          type: 'loyalty',
          washesRemaining: 5,
          totalWashes: 5,
          createdAt: '2024-03-03T16:45:00Z',
          expiresAt: '2024-04-03T16:45:00Z',
          usedAt: null,
          scannedBy: null,
          scannedAt: null,
          lastUsed: null,
          usageHistory: [],
          carInfo: {
            brand: 'هوندا',
            model: 'أكورد',
            plateNumber: 'ز ح ط 9012',
            color: 'أزرق',
            size: 'large'
          },
          serviceDetails: {
            type: 'باقة الولاء',
            price: 200,
            duration: 60
          },
          packageType: 'comprehensive',
          purchaseDate: '2024-03-03T16:45:00Z',
          packageStatus: 'valid'
        }
      ];
      
      setQrCodes(mockData);
    } catch (error) {
      message.error('فشل في تحميل رموز QR');
    } finally {
      setLoading(false);
    }
  };

  // معالجة مسح رمز QR
  const handleScan = async (qrData) => {
    try {
      setProcessing(true);
      
      // محاكاة معالجة رمز QR
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // البحث عن رمز QR المطابق
      const qrCode = qrCodes.find(qr => qr.code === qrData || qr.orderId === qrData);
      
      if (!qrCode) {
        message.error('رمز QR غير موجود أو غير صحيح');
        return;
      }
      
      if (qrCode.status === 'expired' || isExpired(qrCode.expiresAt)) {
        message.error('رمز QR منتهي الصلاحية');
        return;
      }
      
      if (qrCode.washesRemaining <= 0) {
        message.error('تم استنفاذ جميع الغسلات في هذه الباقة');
        return;
      }
      
      // إنشاء رقم عملية جديد
      const newOperationNumber = `O${String(Date.now()).slice(-8)}`;
      
      // تحديث حالة رمز QR
      setQrCodes(prev => prev.map(qr => 
        qr.id === qrCode.id
          ? { 
              ...qr, 
              status: qr.washesRemaining - 1 <= 0 ? 'used' : 'active',
              usedAt: qr.washesRemaining - 1 <= 0 ? new Date().toISOString() : qr.usedAt,
              scannedBy: 'المستخدم الحالي',
              scannedAt: new Date().toISOString(),
              lastUsed: new Date().toISOString(),
              washesRemaining: Math.max(0, qr.washesRemaining - 1),
              packageStatus: qr.washesRemaining - 1 <= 0 ? 'consumed' : 'valid',
              usageHistory: [
                ...qr.usageHistory,
                { 
                  operationNumber: newOperationNumber,
                  date: new Date().toISOString(), 
                  employee: 'المستخدم الحالي', 
                  service: qr.serviceDetails.type,
                  carInfo: qr.carInfo,
                  remainingWashes: Math.max(0, qr.washesRemaining - 1),
                  branchName: qr.branchName,
                  branchLocation: qr.branchLocation,
                  packageType: qr.packageType
                }
              ]
            }
          : qr
      ));
      
      // عرض تفاصيل العميل والخدمة
      setSelectedQR(qrCode);
      setPreviewVisible(true);
      
      message.success(`تم خصم غسلة واحدة من الباقة. باقي الغسلات: ${Math.max(0, qrCode.washesRemaining - 1)}`);
      setScannerVisible(false);
    } catch (error) {
      message.error('فشل في معالجة رمز QR');
    } finally {
      setProcessing(false);
    }
  };

  // إنشاء رمز QR جديد
  const handleCreateQR = async (values) => {
    try {
      // إنشاء رقم عملية فريد
      const operationNumber = `O${String(Date.now()).slice(-8)}`;
      
      const newQR = {
        id: qrCodes.length + 1,
        code: `QR_ORDER_${Date.now()}`,
        orderId: values.orderId,
        operationNumber: operationNumber, // رقم العملية المميز
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        customerEmail: values.customerEmail,
        customerIdentifier: values.customerPhone || values.customerEmail, // رقم العميل المميز
        laundryName: 'مغسلة النظافة الذكية',
        branchName: values.branchName,
        branchLocation: values.branchLocation, // موقع المغسلة
        status: 'active',
        type: values.type,
        packageType: values.packageType, // نوع الباقة (ذهبية، فضية، بلاتينية)
        washesRemaining: values.washesRemaining,
        totalWashes: values.washesRemaining,
        createdAt: new Date().toISOString(),
        purchaseDate: new Date().toISOString(), // تاريخ الشراء
        expiresAt: new Date(Date.now() + qrSettings.security.expiryDays * 24 * 60 * 60 * 1000).toISOString(),
        usedAt: null,
        scannedBy: null,
        scannedAt: null,
        lastUsed: null,
        usageHistory: [],
        carInfo: {
          brand: values.carBrand,
          model: values.carModel,
          plateNumber: values.plateNumber,
          color: values.carColor,
          size: values.carSize // حجم السيارة (صغيرة، متوسطة، كبيرة)
        },
        serviceDetails: {
          type: values.serviceType,
          price: values.price,
          duration: values.duration
        },
        packageStatus: 'valid', // حالة الباقة: صالحة، منتهية، مستهلكة
        securityLevel: qrSettings.security.encryption ? 'high' : 'medium',
        designSettings: qrSettings.design,
        scanSettings: qrSettings.scanning
      };
      
      setQrCodes(prev => [newQR, ...prev]);
      message.success('تم إنشاء رمز QR بنجاح');
      setCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('فشل في إنشاء رمز QR');
    }
  };

  // الحصول على لون الحالة
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'used': return 'blue';
      case 'expired': return 'red';
      case 'cancelled': return 'orange';
      default: return 'default';
    }
  };

  // الحصول على نص الحالة
  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'used': return 'مستخدم';
      case 'expired': return 'منتهي الصلاحية';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  // الحصول على لون النوع
  const getTypeColor = (type) => {
    switch (type) {
      case 'package': return 'purple';
      case 'single': return 'blue';
      case 'loyalty': return 'gold';
      default: return 'default';
    }
  };

  // الحصول على نص النوع
  const getTypeText = (type) => {
    switch (type) {
      case 'package': return 'باقة';
      case 'single': return 'خدمة واحدة';
      case 'loyalty': return 'ولاء';
      default: return type;
    }
  };

  // التحقق من انتهاء الصلاحية
  const isExpired = (expiresAt) => {
    return new Date(expiresAt) < new Date();
  };

  // إحصائيات رموز QR
  const getQRStats = () => {
    const total = qrCodes.length;
    const active = qrCodes.filter(qr => qr.status === 'active' && !isExpired(qr.expiresAt)).length;
    const used = qrCodes.filter(qr => qr.status === 'used').length;
    const expired = qrCodes.filter(qr => isExpired(qr.expiresAt)).length;
    const cancelled = qrCodes.filter(qr => qr.status === 'cancelled').length;

    // إحصائيات الغسلات
    const totalWashes = qrCodes.reduce((sum, qr) => sum + qr.totalWashes, 0);
    const usedWashes = qrCodes.reduce((sum, qr) => sum + (qr.totalWashes - qr.washesRemaining), 0);
    const remainingWashes = qrCodes.reduce((sum, qr) => sum + qr.washesRemaining, 0);
    const todayScans = qrCodes.filter(qr => 
      qr.scannedAt && new Date(qr.scannedAt).toDateString() === new Date().toDateString()
    ).length;

    return { 
      total, 
      active, 
      used, 
      expired, 
      cancelled,
      totalWashes,
      usedWashes,
      remainingWashes,
      todayScans
    };
  };

  const stats = getQRStats();

  // تصفية رموز QR
  const getFilteredQRCodes = () => {
    let filtered = [...qrCodes];
    
    // تصفية حسب النوع
    if (typeFilter !== 'all') {
      filtered = filtered.filter(qr => qr.type === typeFilter);
    }
    
    // تصفية حسب الحالة
    if (statusFilter !== 'all') {
      filtered = filtered.filter(qr => {
        if (statusFilter === 'expired') {
          return isExpired(qr.expiresAt);
        }
        return qr.status === statusFilter;
      });
    }
    
    // تصفية حسب البحث
    if (searchText) {
      filtered = filtered.filter(qr => 
        qr.customerName.includes(searchText) ||
        qr.orderId.includes(searchText) ||
        qr.code.includes(searchText) ||
        qr.customerPhone.includes(searchText)
      );
    }
    
    return filtered;
  };

  // أعمدة الجدول
  const columns = [
    {
      title: 'رمز QR',
      dataIndex: 'code',
      key: 'code',
      render: (code) => <Text code>{code}</Text>
    },
    {
      title: 'رقم الطلب',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (orderId) => <Text strong>#{orderId}</Text>
    },
    {
      title: 'رقم العملية',
      dataIndex: 'operationNumber',
      key: 'operationNumber',
      render: (operationNumber) => <Text strong style={{ color: '#1890ff' }}>{operationNumber}</Text>
    },
    {
      title: 'العميل',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.customerPhone}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.customerEmail}</Text>
        </div>
      )
    },
    {
      title: 'السيارة',
      key: 'car',
      render: (_, record) => (
        <div>
          <CarOutlined style={{ marginLeft: 4 }} />
          {record.carInfo.brand} {record.carInfo.model}
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.carInfo.plateNumber}</Text>
          <br />
          <Tag size="small" color="blue">{record.carInfo.size}</Tag>
        </div>
      )
    },
    {
      title: 'نوع الباقة',
      dataIndex: 'packageType',
      key: 'packageType',
      render: (type) => {
        const colors = {
          basic: 'blue',
          advanced: 'green',
          comprehensive: 'purple'
        };
        const labels = {
          basic: 'الباقة الأساسية',
          advanced: 'الباقة المتقدمة',
          comprehensive: 'الباقة الشاملة'
        };
        return <Tag color={colors[type]}>{labels[type]}</Tag>;
      }
    },
    {
      title: 'الفرع',
      key: 'branch',
      render: (_, record) => (
        <div>
          <Text strong>{record.branchName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.branchLocation}</Text>
        </div>
      )
    },
    {
      title: 'الغسلات المتبقية',
      dataIndex: 'washesRemaining',
      key: 'washesRemaining',
      render: (remaining, record) => (
        <div>
          <Text strong>{remaining}</Text>
          <Text type="secondary"> / {record.totalWashes}</Text>
          <Progress 
            percent={((record.totalWashes - remaining) / record.totalWashes) * 100} 
            size="small" 
            style={{ marginTop: 4 }}
          />
        </div>
      )
    },
    {
      title: 'حالة الباقة',
      dataIndex: 'packageStatus',
      key: 'packageStatus',
      render: (status) => {
        const colors = {
          valid: 'green',
          expired: 'red',
          consumed: 'orange'
        };
        const labels = {
          valid: 'صالحة',
          expired: 'منتهية',
          consumed: 'مستهلكة'
        };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      }
    },
    {
      title: 'تاريخ الشراء',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date) => (
        <div>
          <Text>{new Date(date).toLocaleDateString('ar-SA')}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(date).toLocaleTimeString('ar-SA')}
          </Text>
        </div>
      )
    },
    {
      title: 'تاريخ انتهاء الصلاحية',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      render: (date) => (
        <div>
          <Text>{new Date(date).toLocaleDateString('ar-SA')}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date(date).toLocaleTimeString('ar-SA')}
          </Text>
        </div>
      )
    },
    {
      title: 'آخر استخدام',
      dataIndex: 'lastUsed',
      key: 'lastUsed',
      render: (date) => (
        <div>
          {date ? (
            <>
              <Text>{new Date(date).toLocaleDateString('ar-SA')}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {new Date(date).toLocaleTimeString('ar-SA')}
              </Text>
            </>
          ) : (
            <Text type="secondary">لم يستخدم بعد</Text>
          )}
        </div>
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
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showQRDetails(record)}
          >
            تفاصيل
          </Button>
          <Button
            size="small"
            icon={<QrcodeOutlined />}
            onClick={() => handleScanQR(record.code)}
          >
            مسح
          </Button>
        </Space>
      )
    }
  ];

  // تحميل QR Code
  const handleDownload = (qrCode) => {
    // محاكاة تحميل QR Code
    message.success('تم تحميل رمز QR بنجاح');
  };

  // عرض تفاصيل QR Code
  const showQRDetails = (record) => {
    setSelectedQR(record);
    setDetailsModalVisible(true);
  };

  // مسح QR Code
  const handleScanQR = (code) => {
    setScanModalVisible(true);
    setScannedCode(code);
  };

  // حذف QR Code
  const handleDelete = async (id) => {
    try {
      setQrCodes(prev => prev.filter(qr => qr.id !== id));
      message.success('تم حذف رمز QR بنجاح');
    } catch (error) {
      message.error('فشل في حذف رمز QR');
    }
  };

  // حفظ إعدادات QR
  const handleSaveSettings = (values) => {
    setQrSettings(values);
    message.success('تم حفظ الإعدادات بنجاح');
    setSettingsModalVisible(false);
  };

  return (
    <div className="page-container qr-page-container">
      <div className="page-header">
        <Title level={2}>
          <QrcodeOutlined style={{ marginLeft: 8 }} />
          إدارة رموز QR
        </Title>
        <Text type="secondary">
          إدارة وتتبع رموز QR للطلبات والخدمات
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="إجمالي رموز QR"
              value={stats.total}
              prefix={<QrcodeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="النشطة"
              value={stats.active}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="المستخدمة"
              value={stats.used}
              valueStyle={{ color: '#1890ff' }}
              prefix={<SyncOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="منتهية الصلاحية"
              value={stats.expired}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* إحصائيات الغسلات */}
      <Row gutter={[16, 16]} className="stats-row" style={{ marginTop: '16px' }}>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="إجمالي الغسلات"
              value={stats.totalWashes}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="الغسلات المستخدمة"
              value={stats.usedWashes}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="الغسلات المتبقية"
              value={stats.remainingWashes}
              valueStyle={{ color: '#13c2c2' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card className="stat-item">
            <Statistic
              title="مسح اليوم"
              value={stats.todayScans}
              valueStyle={{ color: '#eb2f96' }}
              prefix={<ScanOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card className="page-card">
        {/* شريط الأدوات */}
        <div style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <Search
                placeholder="البحث في رموز QR..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} md={4}>
              <Select
                placeholder="نوع QR"
                value={typeFilter}
                onChange={setTypeFilter}
                style={{ width: '100%' }}
              >
                <Select.Option value="all">جميع الأنواع</Select.Option>
                <Select.Option value="package">باقة</Select.Option>
                <Select.Option value="single">خدمة واحدة</Select.Option>
                <Select.Option value="loyalty">ولاء</Select.Option>
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
                <Select.Option value="used">مستخدم</Select.Option>
                <Select.Option value="expired">منتهي الصلاحية</Select.Option>
                <Select.Option value="cancelled">ملغي</Select.Option>
              </Select>
            </Col>
            <Col xs={24} md={8}>
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setCreateModalVisible(true)}
                >
                  إنشاء QR جديد
                </Button>
                <Button
                  icon={<ScanOutlined />}
                  onClick={() => setScannerVisible(true)}
                >
                  مسح QR
                </Button>
                <Button
                  icon={<SettingOutlined />}
                  onClick={() => setSettingsModalVisible(true)}
                >
                  الإعدادات
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={loadQRCodes}
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
                  dataSource={getFilteredQRCodes()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} رمز QR`
                  }}
                />
              )
            },
            {
              key: 'active',
              label: `النشطة (${stats.active})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredQRCodes()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} رمز QR`
                  }}
                />
              )
            },
            {
              key: 'used',
              label: `المستخدمة (${stats.used})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredQRCodes()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} رمز QR`
                  }}
                />
              )
            },
            {
              key: 'expired',
              label: `منتهية الصلاحية (${stats.expired})`,
              children: (
                <Table
                  columns={columns}
                  dataSource={getFilteredQRCodes()}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => 
                      `${range[0]}-${range[1]} من ${total} رمز QR`
                  }}
                />
              )
            },
          ]}
        />
      </Card>

      {/* نافذة إنشاء QR جديد */}
      <Modal
        title="إنشاء رمز QR جديد"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateQR}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="orderId"
                label="رقم الطلب"
                rules={[{ required: true, message: 'يرجى إدخال رقم الطلب' }]}
              >
                <Input placeholder="أدخل رقم الطلب" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="type"
                label="نوع QR"
                rules={[{ required: true, message: 'يرجى اختيار النوع' }]}
              >
                <Select placeholder="اختر النوع">
                  <Select.Option value="package">باقة</Select.Option>
                  <Select.Option value="single">خدمة واحدة</Select.Option>
                  <Select.Option value="loyalty">ولاء</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="customerName"
                label="اسم العميل"
                rules={[{ required: true, message: 'يرجى إدخال اسم العميل' }]}
              >
                <Input placeholder="أدخل اسم العميل" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="customerPhone"
                label="رقم الهاتف"
                rules={[{ required: true, message: 'يرجى إدخال رقم الهاتف' }]}
              >
                <Input placeholder="أدخل رقم الهاتف" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="customerEmail"
                label="البريد الإلكتروني"
                rules={[{ type: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح' }]}
              >
                <Input placeholder="أدخل البريد الإلكتروني" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="packageType"
                label="نوع الباقة"
                rules={[{ required: true, message: 'يرجى اختيار نوع الباقة' }]}
              >
                <Select placeholder="اختر نوع الباقة">
                  <Select.Option value="basic">الباقة الأساسية - 150 ريال</Select.Option>
                  <Select.Option value="advanced">الباقة المتقدمة - 280 ريال</Select.Option>
                  <Select.Option value="comprehensive">الباقة الشاملة - 490 ريال</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="washesRemaining"
                label="عدد الغسلات"
                rules={[{ required: true, message: 'يرجى إدخال عدد الغسلات' }]}
              >
                <InputNumber min={1} max={50} placeholder="عدد الغسلات" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="branchName"
                label="اسم الفرع"
                rules={[{ required: true, message: 'يرجى إدخال اسم الفرع' }]}
              >
                <Input placeholder="أدخل اسم الفرع" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="branchLocation"
                label="موقع المغسلة"
                rules={[{ required: true, message: 'يرجى إدخال موقع المغسلة' }]}
              >
                <Input placeholder="أدخل موقع المغسلة" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="carBrand"
                label="ماركة السيارة"
                rules={[{ required: true, message: 'يرجى إدخال ماركة السيارة' }]}
              >
                <Input placeholder="أدخل ماركة السيارة" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="carModel"
                label="موديل السيارة"
                rules={[{ required: true, message: 'يرجى إدخال موديل السيارة' }]}
              >
                <Input placeholder="أدخل موديل السيارة" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="plateNumber"
                label="رقم اللوحة"
                rules={[{ required: true, message: 'يرجى إدخال رقم اللوحة' }]}
              >
                <Input placeholder="أدخل رقم اللوحة" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="carColor"
                label="لون السيارة"
                rules={[{ required: true, message: 'يرجى إدخال لون السيارة' }]}
              >
                <Input placeholder="أدخل لون السيارة" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="carSize"
                label="حجم السيارة"
                rules={[{ required: true, message: 'يرجى اختيار حجم السيارة' }]}
              >
                <Select placeholder="اختر حجم السيارة">
                  <Select.Option value="small">صغيرة</Select.Option>
                  <Select.Option value="medium">متوسطة</Select.Option>
                  <Select.Option value="large">كبيرة</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="serviceType"
                label="نوع الخدمة"
                rules={[{ required: true, message: 'يرجى اختيار نوع الخدمة' }]}
              >
                <Select placeholder="اختر نوع الخدمة">
                  <Select.Option value="basic">أساسي</Select.Option>
                  <Select.Option value="standard">قياسي</Select.Option>
                  <Select.Option value="premium">مميز</Select.Option>
                  <Select.Option value="luxury">فاخر</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="price"
                label="السعر"
                rules={[{ required: true, message: 'يرجى إدخال السعر' }]}
              >
                <InputNumber min={0} placeholder="السعر بالريال" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="duration"
                label="مدة الخدمة (دقيقة)"
                rules={[{ required: true, message: 'يرجى إدخال مدة الخدمة' }]}
              >
                <InputNumber min={1} placeholder="المدة بالدقائق" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button type="primary" htmlType="submit" size="large">
              إنشاء رمز QR
            </Button>
          </div>
        </Form>
      </Modal>

      {/* نافذة معاينة QR */}
      <Modal
        title="تفاصيل رمز QR"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={800}
      >
        {selectedQR && (
          <div>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card title="معلومات الطلب" size="small">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="رمز QR">
                      {selectedQR.code}
                    </Descriptions.Item>
                    <Descriptions.Item label="رقم الطلب">
                      #{selectedQR.orderId}
                    </Descriptions.Item>
                    <Descriptions.Item label="رقم العملية">
                      {selectedQR.operationNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="العميل">
                      {selectedQR.customerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="رقم الهاتف">
                      {selectedQR.customerPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="البريد الإلكتروني">
                      {selectedQR.customerEmail}
                    </Descriptions.Item>
                    <Descriptions.Item label="الفرع">
                      {selectedQR.branchName}
                    </Descriptions.Item>
                    <Descriptions.Item label="نوع الباقة">
                      <Tag color={getTypeColor(selectedQR.packageType)}>
                        {getTypeText(selectedQR.packageType)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="حالة الباقة">
                      <Tag color={getStatusColor(selectedQR.packageStatus)}>
                        {getStatusText(selectedQR.packageStatus)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="تاريخ الشراء">
                      {new Date(selectedQR.purchaseDate).toLocaleString('ar-SA')}
                    </Descriptions.Item>
                    <Descriptions.Item label="تاريخ انتهاء الصلاحية">
                      {new Date(selectedQR.expiresAt).toLocaleString('ar-SA')}
                    </Descriptions.Item>
                    <Descriptions.Item label="آخر استخدام">
                      {selectedQR.lastUsed ? new Date(selectedQR.lastUsed).toLocaleString('ar-SA') : 'لم يستخدم بعد'}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card title="معلومات السيارة" size="small">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="العلامة">
                      {selectedQR.carInfo.brand}
                    </Descriptions.Item>
                    <Descriptions.Item label="الموديل">
                      {selectedQR.carInfo.model}
                    </Descriptions.Item>
                    <Descriptions.Item label="رقم اللوحة">
                      {selectedQR.carInfo.plateNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="اللون">
                      {selectedQR.carInfo.color}
                    </Descriptions.Item>
                    <Descriptions.Item label="حجم السيارة">
                      <Tag color="blue">{selectedQR.carInfo.size}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 16 }}>
              <Col xs={24} md={12}>
                <Card title="معلومات الخدمة" size="small">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="نوع الخدمة">
                      {selectedQR.serviceDetails.type}
                    </Descriptions.Item>
                    <Descriptions.Item label="السعر">
                      {selectedQR.serviceDetails.price} ريال
                    </Descriptions.Item>
                    <Descriptions.Item label="المدة">
                      {selectedQR.serviceDetails.duration} دقيقة
                    </Descriptions.Item>
                    <Descriptions.Item label="الغسلات المتبقية">
                      {selectedQR.washesRemaining} / {selectedQR.totalWashes}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card title="معلومات QR" size="small">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="النوع">
                      <Tag color={getTypeColor(selectedQR.type)}>
                        {getTypeText(selectedQR.type)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="الحالة">
                      <Tag color={getStatusColor(selectedQR.status)}>
                        {getStatusText(selectedQR.status)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="تاريخ الإنشاء">
                      {new Date(selectedQR.createdAt).toLocaleString('ar-SA')}
                    </Descriptions.Item>
                    <Descriptions.Item label="تاريخ الانتهاء">
                      {new Date(selectedQR.expiresAt).toLocaleString('ar-SA')}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            {selectedQR.usageHistory.length > 0 && (
              <Card title="سجل الاستخدام" size="small" style={{ marginTop: 16 }}>
                <List
                  dataSource={selectedQR.usageHistory}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={`استخدام ${index + 1}`}
                        description={
                          <div>
                            <Text>الموظف: {item.employee}</Text>
                            <br />
                            <Text type="secondary">
                              التاريخ: {new Date(item.date).toLocaleString('ar-SA')}
                            </Text>
                            <br />
                            <Text type="secondary">الخدمة: {item.service}</Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )}

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Space>
                <Button onClick={() => setPreviewVisible(false)}>
                  إغلاق
                </Button>
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(selectedQR)}
                >
                  تحميل QR
                </Button>
                {selectedQR && selectedQR.washesRemaining > 0 && (
                  <Button 
                    type="primary" 
                    danger
                    icon={<CheckCircleOutlined />}
                    onClick={() => {
                      message.success('تم تأكيد إتمام الغسيل بنجاح!');
                      setPreviewVisible(false);
                    }}
                  >
                    تأكيد إتمام الغسيل
                  </Button>
                )}
              </Space>
            </div>
          </div>
        )}
      </Modal>

      {/* نافذة إعدادات QR */}
      <Modal
        title={
          <div>
            <SettingOutlined style={{ marginRight: 8 }} />
            {t('advanced_qr_code_settings')}
          </div>
        }
        open={settingsModalVisible}
        onCancel={() => setSettingsModalVisible(false)}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <QRCodeSettings
          initialSettings={qrSettings}
          onSettingsChange={setQrSettings}
        />
      </Modal>

      {/* ماسح QR */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ScanOutlined style={{ color: '#1890ff' }} />
            <span>{t('scan_qr_code_for_washing')}</span>
          </div>
        }
        open={scannerVisible}
        onCancel={() => setScannerVisible(false)}
        footer={null}
        width={700}
        centered
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Alert
            message={t('scan_instructions_title')}
            description={t('scan_instructions_description')}
            type="info"
            showIcon
            style={{ marginBottom: '20px' }}
          />
          
          <div style={{ 
            border: '2px dashed #d9d9d9', 
            borderRadius: '8px', 
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#fafafa'
          }}>
      <QRCodeScanner
        open={scannerVisible}
        onScan={handleScan}
        onClose={() => setScannerVisible(false)}
      />
          </div>
          
          {processing && (
            <div style={{ marginTop: '20px' }}>
              <Spin size="large" />
              <p style={{ marginTop: '10px', color: '#1890ff' }}>
                {t('processing_qr_code_message')}
              </p>
            </div>
          )}
          
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <Text type="secondary">
              <InfoCircleOutlined /> {t('when_scanning_will_do')}:
            </Text>
            <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <li>{t('read_customer_and_car_data')}</li>
              <li>{t('deduct_one_wash_from_the_package')}</li>
              <li>{t('confirm_wash_completion')}</li>
              <li>{t('update_usage_history')}</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* سجل استخدام QR */}
      <Modal
        title={
          <span>
            <HistoryOutlined style={{ marginLeft: 8 }} /> {t('usage_log_title')}
          </span>
        }
        open={usageLogVisible}
        onCancel={() => setUsageLogVisible(false)}
        footer={null}
        width={600}
      >
        {selectedQR && (
          <div>
            {selectedQR.usageHistory && selectedQR.usageHistory.length > 0 ? (
              <List
                dataSource={selectedQR.usageHistory}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={`استخدام ${index + 1}`}
                      description={
                        <div>
                          <Text>الموظف: {item.employee}</Text>
                          <br />
                          <Text type="secondary">
                            التاريخ: {new Date(item.date).toLocaleString('ar-SA')}
                          </Text>
                          <br />
                          <Text type="secondary">الخدمة: {item.service}</Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Alert message={t('no_usage_log_message')} type="info" showIcon />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QRCodeManagement; 