import React, { useState, useRef, useEffect } from 'react';
import { 
  Modal, 
  Button, 
  Typography, 
  Space, 
  Alert, 
  Spin, 
  Card, 
  Tag, 
  Badge, 
  Tooltip,
  Progress,
  notification,
  Divider,
  Descriptions,
  Avatar,
  Statistic,
  Row,
  Col
} from 'antd';
import {
  CameraOutlined,
  CloseOutlined,
  ScanOutlined,
  SecurityScanOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  UserOutlined,
  CarOutlined,
  ShopOutlined,
  ClockCircleOutlined,
  QrcodeOutlined,
  ReloadOutlined,
  BulbOutlined,
  SettingOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';
import CryptoJS from 'crypto-js';

const { Title, Text, Paragraph } = Typography;

const QRCodeScanner = ({ 
  visible, 
  onClose, 
  onScan, 
  onError,
  // ميزات جديدة
  autoFocus = true,
  continuousScan = true,
  highResolution = true,
  enableTorch = false,
  securityValidation = true,
  showPreview = true,
  maxScanAttempts = 3
}) => {
  const { lang } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [scanAttempts, setScanAttempts] = useState(0);
  const [scanHistory, setScanHistory] = useState([]);
  const [cameraSettings, setCameraSettings] = useState({
    facingMode: 'environment',
    width: { ideal: 1280 },
    height: { ideal: 720 }
  });
  const [securityStatus, setSecurityStatus] = useState('checking');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // فك تشفير البيانات
  const decryptQRData = (encryptedData) => {
    try {
      const secretKey = process.env.REACT_APP_QR_SECRET_KEY || 'default-secret-key';
      const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  };

  // التحقق من التوقيع الرقمي
  const verifyDigitalSignature = (data, signature) => {
    try {
      const expectedSignature = CryptoJS.HmacSHA256(
        JSON.stringify(data),
        process.env.REACT_APP_QR_SIGNATURE_KEY || 'signature-key'
      ).toString();
      return signature === expectedSignature;
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  };

  // التحقق من صحة البيانات
  const validateQRData = (data) => {
    if (!data) return { valid: false, error: 'Invalid QR data' };

    // التحقق من وجود الحقول المطلوبة
    const requiredFields = ['orderId', 'customerName', 'washesRemaining', 'expiresAt'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return { valid: false, error: `Missing required field: ${field}` };
      }
    }

    // التحقق من التوقيع الرقمي
    if (securityValidation && data.signature) {
      const isValidSignature = verifyDigitalSignature(data, data.signature);
      if (!isValidSignature) {
        return { valid: false, error: 'Invalid digital signature' };
      }
    }

    // التحقق من انتهاء الصلاحية
    if (new Date(data.expiresAt) < new Date()) {
      return { valid: false, error: 'QR code has expired' };
    }

    // التحقق من عدد الغسلات المتبقية
    if (data.washesRemaining <= 0) {
      return { valid: false, error: 'No washes remaining' };
    }

    return { valid: true, data };
  };

  // بدء المسح
  const startScanning = async () => {
    try {
      setScanning(true);
      setError(null);
      setSecurityStatus('checking');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          ...cameraSettings,
          facingMode: cameraSettings.facingMode
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      setSecurityStatus('secure');
    } catch (err) {
      setError(lang === 'ar' ? 'فشل في الوصول للكاميرا' : 'Failed to access camera');
      setSecurityStatus('error');
      if (onError) onError(err);
    }
  };

  // إيقاف المسح
  const stopScanning = () => {
    setScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // معالجة المسح
  const handleScan = async (qrData) => {
    try {
      setProcessing(true);
      setScanAttempts(prev => prev + 1);
      
      // فك تشفير البيانات إذا كانت مشفرة
      let decryptedData = qrData;
      if (typeof qrData === 'string' && qrData.length > 100) {
        decryptedData = decryptQRData(qrData);
      }

      // التحقق من صحة البيانات
      const validation = validateQRData(decryptedData);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const validatedData = validation.data;
      setResult(validatedData);

      // إضافة إلى سجل المسح
      const scanRecord = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        data: validatedData,
        status: 'success'
      };
      setScanHistory(prev => [scanRecord, ...prev.slice(0, 9)]);

      // إظهار إشعار نجاح
      notification.success({
        message: lang === 'ar' ? 'تم مسح الرمز بنجاح' : 'QR Code scanned successfully',
        description: lang === 'ar' ? `طلب رقم: ${validatedData.orderId}` : `Order #: ${validatedData.orderId}`,
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
      });

      if (onScan) {
        await onScan(validatedData);
      }

      if (!continuousScan) {
        stopScanning();
      }
    } catch (err) {
      setError(err.message);
      setSecurityStatus('error');
      
      // إظهار إشعار خطأ
      notification.error({
        message: lang === 'ar' ? 'خطأ في مسح الرمز' : 'QR Code scan error',
        description: err.message,
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
      });

      if (onError) onError(err);
    } finally {
      setProcessing(false);
    }
  };

  // تبديل الكاميرا
  const switchCamera = () => {
    setCameraSettings(prev => ({
      ...prev,
      facingMode: prev.facingMode === 'environment' ? 'user' : 'environment'
    }));
  };

  // تبديل الفلاش
  const toggleTorch = () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      if (track && track.getCapabilities().torch) {
        track.applyConstraints({
          advanced: [{ torch: !enableTorch }]
        });
      }
    }
  };

  // إعادة تعيين المسح
  const resetScan = () => {
    setScanAttempts(0);
    setError(null);
    setResult(null);
    setSecurityStatus('checking');
  };

  // محاكاة اكتشاف QR Code (في التطبيق الحقيقي، استخدم مكتبة QR)
  const simulateQRDetection = () => {
    const mockQRData = {
      orderId: '1234',
      customerName: 'علي محمود',
      washesRemaining: 4,
      expiresAt: '2024-04-03T16:45:00Z',
      carInfo: {
        brand: 'تويوتا',
        model: 'كامري',
        plateNumber: 'أ ب ج 1234'
      },
      branchInfo: {
        name: 'الفرع الرئيسي',
        location: 'الرياض'
      },
      packageInfo: {
        type: 'الباقة الأساسية',
        price: 150
      },
      signature: 'valid-signature',
      timestamp: Date.now(),
      version: '2.0'
    };
    handleScan(mockQRData);
  };

  useEffect(() => {
    if (visible && scanning) {
      startScanning();
    } else if (!visible) {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [visible, scanning, cameraSettings]);

  const getSecurityStatusColor = () => {
    switch (securityStatus) {
      case 'secure': return '#52c41a';
      case 'warning': return '#faad14';
      case 'error': return '#ff4d4f';
      default: return '#1890ff';
    }
  };

  const getSecurityStatusText = () => {
    switch (securityStatus) {
      case 'secure': return lang === 'ar' ? 'آمن' : 'Secure';
      case 'warning': return lang === 'ar' ? 'تحذير' : 'Warning';
      case 'error': return lang === 'ar' ? 'خطأ' : 'Error';
      default: return lang === 'ar' ? 'جاري التحقق' : 'Checking';
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <QrcodeOutlined style={{ marginRight: 8, color: getSecurityStatusColor() }} />
            <Title level={4} style={{ margin: 0, display: 'inline' }}>
              {lang === 'ar' ? 'ماسح QR المحسن' : 'Enhanced QR Scanner'}
            </Title>
          </div>
          <Badge 
            status={securityStatus === 'secure' ? 'success' : securityStatus === 'warning' ? 'warning' : 'error'} 
            text={getSecurityStatusText()}
          />
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      destroyOnClose
    >
      <div style={{ textAlign: 'center' }}>
        {/* منطقة المسح */}
        <Card
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 16,
            marginBottom: 16,
            position: 'relative',
            overflow: 'hidden'
          }}
          bodyStyle={{ padding: 24 }}
        >
          {scanning ? (
            <div>
              {/* فيديو الكاميرا */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  maxWidth: 400,
                  height: 300,
                  borderRadius: 12,
                  border: '3px solid rgba(255,255,255,0.3)'
                }}
              />
              
              {/* إطار المسح */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 200,
                height: 200,
                border: '2px solid #52c41a',
                borderRadius: 12,
                pointerEvents: 'none',
                animation: 'scanning 2s infinite'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #52c41a, transparent)',
                  animation: 'scanLine 2s infinite'
                }} />
              </div>
            </div>
          ) : (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ScanOutlined style={{ fontSize: 64, color: 'rgba(255,255,255,0.6)' }} />
            </div>
          )}

          {/* أزرار التحكم */}
          <Space style={{ marginTop: 16 }}>
            {!scanning ? (
              <Button
                type="primary"
                icon={<CameraOutlined />}
                onClick={startScanning}
                size="large"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                {lang === 'ar' ? 'بدء المسح' : 'Start Scanning'}
              </Button>
            ) : (
              <>
                <Button
                  icon={<CloseOutlined />}
                  onClick={stopScanning}
                  size="large"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  {lang === 'ar' ? 'إيقاف' : 'Stop'}
                </Button>
                <Tooltip title={lang === 'ar' ? 'تبديل الكاميرا' : 'Switch Camera'}>
                  <Button
                    icon={<SettingOutlined />}
                    onClick={switchCamera}
                    size="large"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                  />
                </Tooltip>
                <Tooltip title={lang === 'ar' ? 'تبديل الفلاش' : 'Toggle Flash'}>
                  <Button
                    icon={<BulbOutlined />}
                    onClick={toggleTorch}
                    size="large"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
                  />
                </Tooltip>
              </>
            )}
            
            <Tooltip title={lang === 'ar' ? 'محاكاة المسح' : 'Simulate Scan'}>
              <Button
                icon={<ScanOutlined />}
                onClick={simulateQRDetection}
                size="large"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                {lang === 'ar' ? 'محاكاة' : 'Simulate'}
              </Button>
            </Tooltip>
          </Space>
        </Card>

        {/* حالة المعالجة */}
        {processing && (
          <Card style={{ marginBottom: 16 }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>
              <Text>{lang === 'ar' ? 'جاري معالجة الرمز...' : 'Processing QR code...'}</Text>
            </div>
            <Progress percent={75} status="active" />
          </Card>
        )}

        {/* رسائل الخطأ */}
        {error && (
          <Alert
            message={lang === 'ar' ? 'خطأ في المسح' : 'Scan Error'}
            description={error}
            type="error"
            showIcon
            icon={<ExclamationCircleOutlined />}
            style={{ marginBottom: 16 }}
            action={
              <Button size="small" danger onClick={resetScan}>
                {lang === 'ar' ? 'إعادة المحاولة' : 'Retry'}
              </Button>
            }
          />
        )}

        {/* نتائج المسح */}
        {result && showPreview && (
          <Card
            title={
              <div>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                {lang === 'ar' ? 'نتائج المسح' : 'Scan Results'}
              </div>
            }
            style={{ marginBottom: 16 }}
          >
            <Descriptions bordered column={2}>
              <Descriptions.Item label={lang === 'ar' ? 'رقم الطلب' : 'Order ID'}>
                <Text strong>{result.orderId}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={lang === 'ar' ? 'اسم العميل' : 'Customer Name'}>
                <Text>{result.customerName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label={lang === 'ar' ? 'الغسلات المتبقية' : 'Remaining Washes'}>
                <Badge count={result.washesRemaining} style={{ backgroundColor: '#52c41a' }} />
              </Descriptions.Item>
              <Descriptions.Item label={lang === 'ar' ? 'تاريخ انتهاء الصلاحية' : 'Expiry Date'}>
                <Text>{new Date(result.expiresAt).toLocaleDateString()}</Text>
              </Descriptions.Item>
              {result.carInfo && (
                <>
                  <Descriptions.Item label={lang === 'ar' ? 'ماركة السيارة' : 'Car Brand'}>
                    <Text>{result.carInfo.brand}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={lang === 'ar' ? 'موديل السيارة' : 'Car Model'}>
                    <Text>{result.carInfo.model}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label={lang === 'ar' ? 'رقم اللوحة' : 'Plate Number'}>
                    <Text>{result.carInfo.plateNumber}</Text>
                  </Descriptions.Item>
                </>
              )}
              {result.branchInfo && (
                <Descriptions.Item label={lang === 'ar' ? 'الفرع' : 'Branch'}>
                  <Text>{result.branchInfo.name}</Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        )}

        {/* إحصائيات المسح */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Statistic
              title={lang === 'ar' ? 'محاولات المسح' : 'Scan Attempts'}
              value={scanAttempts}
              prefix={<ScanOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={lang === 'ar' ? 'المسح الناجح' : 'Successful Scans'}
              value={scanHistory.filter(scan => scan.status === 'success').length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={lang === 'ar' ? 'مستوى الأمان' : 'Security Level'}
              value={securityValidation ? 'عالي' : 'عادي'}
              prefix={<SecurityScanOutlined />}
              valueStyle={{ color: getSecurityStatusColor() }}
            />
          </Col>
        </Row>

        {/* سجل المسح */}
        {scanHistory.length > 0 && (
          <Card
            title={
              <div>
                <HistoryOutlined style={{ marginRight: 8 }} />
                {lang === 'ar' ? 'سجل المسح' : 'Scan History'}
              </div>
            }
            size="small"
          >
            {scanHistory.slice(0, 5).map((scan, index) => (
              <div key={scan.id} style={{ 
                padding: 8, 
                borderBottom: index < 4 ? '1px solid #f0f0f0' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <Text strong>{scan.data.orderId}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {new Date(scan.timestamp).toLocaleTimeString()}
                  </Text>
                </div>
                <Tag color={scan.status === 'success' ? 'green' : 'red'}>
                  {scan.status === 'success' ? 
                    (lang === 'ar' ? 'نجح' : 'Success') : 
                    (lang === 'ar' ? 'فشل' : 'Failed')
                  }
                </Tag>
              </div>
            ))}
          </Card>
        )}
      </div>

      <style jsx>{`
        @keyframes scanning {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes scanLine {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </Modal>
  );
};

export default QRCodeScanner; 