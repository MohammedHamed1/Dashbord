import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Typography, Tag, Modal, Alert, Tooltip, Badge } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import { 
  DownloadOutlined, 
  ShareAltOutlined, 
  EyeOutlined, 
  SecurityScanOutlined,
  CopyOutlined,
  QrcodeOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CarOutlined,
  ShopOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';
import CryptoJS from 'crypto-js';

const { Title, Text, Paragraph } = Typography;

const QRCodeGenerator = ({ 
  qrCode, 
  orderId, 
  customerName, 
  expiresAt, 
  washesRemaining,
  onDownload,
  onShare,
  // بيانات إضافية جديدة
  carInfo = {},
  branchInfo = {},
  packageInfo = {},
  securityLevel = 'high',
  customDesign = false,
  showWatermark = true
}) => {
  const { lang } = useLanguage();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [encryptedData, setEncryptedData] = useState('');
  const [securityStatus, setSecurityStatus] = useState('secure');

  // تشفير البيانات
  const encryptQRData = (data) => {
    const secretKey = process.env.REACT_APP_QR_SECRET_KEY || 'default-secret-key';
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), 
      secretKey
    ).toString();
    return encrypted;
  };

  // إنشاء توقيع رقمي
  const createDigitalSignature = (data) => {
    const signature = CryptoJS.HmacSHA256(
      JSON.stringify(data),
      process.env.REACT_APP_QR_SIGNATURE_KEY || 'signature-key'
    ).toString();
    return signature;
  };

  // إنشاء بيانات QR محسنة
  const generateEnhancedQRData = () => {
    const baseData = {
      orderId,
      customerName,
      washesRemaining,
      expiresAt,
      carInfo,
      branchInfo,
      packageInfo,
      timestamp: Date.now(),
      version: '2.0'
    };

    const signature = createDigitalSignature(baseData);
    const enhancedData = {
      ...baseData,
      signature,
      securityLevel,
      checksum: CryptoJS.MD5(JSON.stringify(baseData)).toString()
    };

    return encryptQRData(enhancedData);
  };

  useEffect(() => {
    const enhancedData = generateEnhancedQRData();
    setEncryptedData(enhancedData);
  }, [qrCode, orderId, customerName, washesRemaining, expiresAt]);

  const isExpired = new Date(expiresAt) < new Date();
  const daysUntilExpiry = Math.ceil((new Date(expiresAt) - new Date()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysUntilExpiry <= 7;

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `qr-code-${orderId}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
    if (onDownload) onDownload();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: lang === 'ar' ? 'رمز QR للطلب' : 'Order QR Code',
          text: lang === 'ar' ? `رمز QR لطلب رقم ${orderId}` : `QR Code for order #${orderId}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // إظهار رسالة نجاح
      }
      if (onShare) onShare();
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrCode);
      // إظهار رسالة نجاح
    } catch (error) {
      console.error('Error copying:', error);
    }
  };

  const getSecurityBadge = () => {
    switch (securityLevel) {
      case 'high':
        return <Badge status="success" text={lang === 'ar' ? 'أمان عالي' : 'High Security'} />;
      case 'medium':
        return <Badge status="warning" text={lang === 'ar' ? 'أمان متوسط' : 'Medium Security'} />;
      case 'low':
        return <Badge status="error" text={lang === 'ar' ? 'أمان منخفض' : 'Low Security'} />;
      default:
        return <Badge status="success" text={lang === 'ar' ? 'أمان عالي' : 'High Security'} />;
    }
  };

  const getExpiryStatus = () => {
    if (isExpired) {
      return <Tag color="red" icon={<ClockCircleOutlined />}>{lang === 'ar' ? 'منتهي الصلاحية' : 'Expired'}</Tag>;
    } else if (isExpiringSoon) {
      return <Tag color="orange" icon={<ClockCircleOutlined />}>{lang === 'ar' ? `ينتهي خلال ${daysUntilExpiry} أيام` : `Expires in ${daysUntilExpiry} days`}</Tag>;
    } else {
      return <Tag color="green" icon={<ClockCircleOutlined />}>{lang === 'ar' ? `صالح لمدة ${daysUntilExpiry} أيام` : `Valid for ${daysUntilExpiry} days`}</Tag>;
    }
  };

  return (
    <Card
      style={{
        background: customDesign 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        borderRadius: 16,
        color: 'white',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}
      styles={{ body: { padding: 24 } }}
    >
      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ color: 'white', marginBottom: 16 }}>
          <QrcodeOutlined style={{ marginRight: 8 }} />
          {lang === 'ar' ? 'رمز QR المحسن' : 'Enhanced QR Code'}
        </Title>
        
        {/* شارة الأمان */}
        <div style={{ marginBottom: 16 }}>
          {getSecurityBadge()}
        </div>

        {/* رمز QR الرئيسي */}
        <div style={{ 
          background: 'white', 
          padding: 20, 
          borderRadius: 12, 
          display: 'inline-block',
          marginBottom: 16,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          <QRCodeSVG
            value={encryptedData || qrCode}
            size={200}
            level="H"
            includeMargin={true}
            style={{ display: 'block' }}
          />
          
          {/* علامة مائية */}
          {showWatermark && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255,255,255,0.9)',
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: 10,
              color: '#666',
              pointerEvents: 'none'
            }}>
              {lang === 'ar' ? 'مغسلة النظافة الذكية' : 'Smart Car Wash'}
            </div>
          )}
        </div>

        {/* معلومات الطلب */}
        <div style={{ marginBottom: 16 }}>
          <Text style={{ color: 'white', fontSize: 16, display: 'block', fontWeight: 'bold' }}>
            {lang === 'ar' ? 'رقم الطلب:' : 'Order #'}: {orderId}
          </Text>
          <Text style={{ color: 'white', fontSize: 14, display: 'block' }}>
            <UserOutlined style={{ marginRight: 4 }} />
            {lang === 'ar' ? 'العميل:' : 'Customer'}: {customerName}
          </Text>
          <Text style={{ color: 'white', fontSize: 14, display: 'block' }}>
            <CarOutlined style={{ marginRight: 4 }} />
            {lang === 'ar' ? 'الغسلات المتبقية:' : 'Remaining washes'}: {washesRemaining}
          </Text>
          {carInfo.brand && (
            <Text style={{ color: 'white', fontSize: 12, display: 'block' }}>
              {carInfo.brand} {carInfo.model} - {carInfo.plateNumber}
            </Text>
          )}
          {branchInfo.name && (
            <Text style={{ color: 'white', fontSize: 12, display: 'block' }}>
              <ShopOutlined style={{ marginRight: 4 }} />
              {branchInfo.name}
            </Text>
          )}
        </div>

        {/* حالة الصلاحية */}
        <div style={{ marginBottom: 16 }}>
          {getExpiryStatus()}
        </div>

        {/* معلومات الأمان */}
        <Alert
          message={lang === 'ar' ? 'معلومات الأمان' : 'Security Info'}
          description={
            <div>
              <Text style={{ color: 'white', fontSize: 12 }}>
                <SafetyCertificateOutlined style={{ marginRight: 4 }} />
                {lang === 'ar' ? 'مشفر ومحمي' : 'Encrypted & Protected'}
              </Text>
              <br />
              <Text style={{ color: 'white', fontSize: 12 }}>
                <InfoCircleOutlined style={{ marginRight: 4 }} />
                {lang === 'ar' ? 'توقيع رقمي صالح' : 'Valid Digital Signature'}
              </Text>
            </div>
          }
          type="info"
          showIcon={false}
          style={{ 
            background: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: 16
          }}
        />

        {/* أزرار التحكم */}
        <Space wrap>
          <Tooltip title={lang === 'ar' ? 'معاينة الرمز' : 'Preview QR Code'}>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => setPreviewVisible(true)}
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              {lang === 'ar' ? 'معاينة' : 'Preview'}
            </Button>
          </Tooltip>
          
          <Tooltip title={lang === 'ar' ? 'تحميل الرمز' : 'Download QR Code'}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              {lang === 'ar' ? 'تحميل' : 'Download'}
            </Button>
          </Tooltip>
          
          <Tooltip title={lang === 'ar' ? 'مشاركة الرمز' : 'Share QR Code'}>
            <Button
              type="primary"
              icon={<ShareAltOutlined />}
              onClick={handleShare}
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              {lang === 'ar' ? 'مشاركة' : 'Share'}
            </Button>
          </Tooltip>
          
          <Tooltip title={lang === 'ar' ? 'نسخ الرمز' : 'Copy QR Code'}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              onClick={copyToClipboard}
              style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              {lang === 'ar' ? 'نسخ' : 'Copy'}
            </Button>
          </Tooltip>
        </Space>
      </div>

      {/* نافذة المعاينة */}
      <Modal
        title={
          <div>
            <QrcodeOutlined style={{ marginRight: 8 }} />
            {lang === 'ar' ? 'معاينة رمز QR المحسن' : 'Enhanced QR Code Preview'}
          </div>
        }
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={500}
      >
        <div style={{ textAlign: 'center' }}>
          <QRCodeSVG
            value={encryptedData || qrCode}
            size={300}
            level="H"
            includeMargin={true}
          />
          
          <div style={{ marginTop: 16 }}>
            <Title level={4}>Order #{orderId}</Title>
            <Text type="secondary">{customerName}</Text>
            <br />
            <Text type="secondary">{lang === 'ar' ? 'الغسلات المتبقية:' : 'Remaining washes'}: {washesRemaining}</Text>
            <br />
            {getExpiryStatus()}
            <br />
            {getSecurityBadge()}
          </div>
          
          {carInfo.brand && (
            <Paragraph style={{ marginTop: 16 }}>
              <CarOutlined style={{ marginRight: 4 }} />
              {carInfo.brand} {carInfo.model} - {carInfo.plateNumber}
            </Paragraph>
          )}
          
          {branchInfo.name && (
            <Paragraph>
              <ShopOutlined style={{ marginRight: 4 }} />
              {branchInfo.name}
            </Paragraph>
          )}
        </div>
      </Modal>
    </Card>
  );
};

export default QRCodeGenerator; 