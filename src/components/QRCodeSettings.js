import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Switch,
  InputNumber,
  Select,
  Button,
  Space,
  Typography,
  Alert,
  Divider,
  Row,
  Col,
  Upload,
  ColorPicker,
  Slider,
  Tag,
  Badge,
  Tooltip,
  notification,
  Input
} from 'antd';
import {
  SettingOutlined,
  SecurityScanOutlined,
  BgColorsOutlined,
  SaveOutlined,
  ReloadOutlined,
  EyeOutlined,
  LockOutlined,
  QrcodeOutlined,
  CameraOutlined,
  BellOutlined,
  SafetyCertificateOutlined,
  KeyOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const QRCodeSettings = ({ onSettingsChange, initialSettings = {} }) => {
  const { lang } = useLanguage();
  const [form] = Form.useForm();
  const [settings, setSettings] = useState({
    // إعدادات الأمان
    security: {
      encryption: true,
      digitalSignature: true,
      watermark: true,
      antiForgery: true,
      maxUses: 5,
      expiryDays: 30,
      requireVerification: true
    },
    // إعدادات التصميم
    design: {
      customColors: false,
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      logo: null,
      showWatermark: true,
      watermarkText: lang === 'ar' ? 'مغسلة النظافة الذكية' : 'Smart Car Wash',
      customStyle: false
    },
    // إعدادات المسح
    scanning: {
      autoFocus: true,
      continuousScan: true,
      highResolution: true,
      enableTorch: false,
      maxScanAttempts: 3,
      showPreview: true,
      soundEnabled: true
    },
    // إعدادات الإشعارات
    notifications: {
      scanSuccess: true,
      scanError: true,
      expiryWarning: true,
      securityAlert: true,
      emailNotifications: false,
      smsNotifications: false,
      pushNotifications: true
    },
    // إعدادات متقدمة
    advanced: {
      backupCodes: true,
      offlineMode: false,
      analytics: true,
      debugMode: false,
      performanceMode: 'balanced'
    }
  });

  useEffect(() => {
    if (initialSettings) {
      setSettings(prev => ({ ...prev, ...initialSettings }));
      form.setFieldsValue(initialSettings);
    }
  }, [initialSettings, form]);

  const handleSettingsChange = (changedValues, allValues) => {
    const newSettings = { ...settings, ...allValues };
    setSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const newSettings = { ...settings, ...values };
      setSettings(newSettings);
      
      // حفظ الإعدادات في localStorage
      localStorage.setItem('qrCodeSettings', JSON.stringify(newSettings));
      
      notification.success({
        message: lang === 'ar' ? 'تم حفظ الإعدادات' : 'Settings saved',
        description: lang === 'ar' ? 'تم حفظ إعدادات QR Code بنجاح' : 'QR Code settings saved successfully'
      });
      
      if (onSettingsChange) {
        onSettingsChange(newSettings);
      }
    } catch (error) {
      notification.error({
        message: lang === 'ar' ? 'خطأ في حفظ الإعدادات' : 'Settings save error',
        description: error.message
      });
    }
  };

  const handleReset = () => {
    const defaultSettings = {
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
        watermarkText: lang === 'ar' ? 'مغسلة النظافة الذكية' : 'Smart Car Wash',
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
    };
    
    setSettings(defaultSettings);
    form.setFieldsValue(defaultSettings);
    
    notification.info({
      message: lang === 'ar' ? 'تم إعادة تعيين الإعدادات' : 'Settings reset',
      description: lang === 'ar' ? 'تم إعادة تعيين جميع الإعدادات للقيم الافتراضية' : 'All settings reset to default values'
    });
  };

  const getSecurityLevel = () => {
    const securitySettings = settings.security;
    let score = 0;
    
    if (securitySettings.encryption) score += 25;
    if (securitySettings.digitalSignature) score += 25;
    if (securitySettings.watermark) score += 20;
    if (securitySettings.antiForgery) score += 20;
    if (securitySettings.requireVerification) score += 10;
    
    if (score >= 90) return { level: 'high', color: '#52c41a', text: lang === 'ar' ? 'أمان عالي جداً' : 'Very High Security' };
    if (score >= 70) return { level: 'medium', color: '#faad14', text: lang === 'ar' ? 'أمان عالي' : 'High Security' };
    if (score >= 50) return { level: 'low', color: '#ff4d4f', text: lang === 'ar' ? 'أمان متوسط' : 'Medium Security' };
    return { level: 'very-low', color: '#ff7875', text: lang === 'ar' ? 'أمان منخفض' : 'Low Security' };
  };

  const securityLevel = getSecurityLevel();

  return (
    <div>
      <Title level={3}>
        <SettingOutlined style={{ marginRight: 8 }} />
        {lang === 'ar' ? 'إعدادات QR Code المتقدمة' : 'Advanced QR Code Settings'}
      </Title>

      <Form
        form={form}
        layout="vertical"
        initialValues={settings}
        onValuesChange={handleSettingsChange}
        style={{ marginTop: 24 }}
      >
        {/* إعدادات الأمان */}
        <Card
          title={
            <div>
              <SecurityScanOutlined style={{ marginRight: 8, color: securityLevel.color }} />
              {lang === 'ar' ? 'إعدادات الأمان' : 'Security Settings'}
            </div>
          }
          style={{ marginBottom: 16 }}
          extra={
            <Badge 
              status={securityLevel.level === 'high' ? 'success' : securityLevel.level === 'medium' ? 'warning' : 'error'} 
              text={securityLevel.text}
            />
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['security', 'encryption']}
                label={lang === 'ar' ? 'تشفير البيانات' : 'Data Encryption'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['security', 'digitalSignature']}
                label={lang === 'ar' ? 'التوقيع الرقمي' : 'Digital Signature'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['security', 'watermark']}
                label={lang === 'ar' ? 'علامة مائية' : 'Watermark'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['security', 'antiForgery']}
                label={lang === 'ar' ? 'حماية من التزوير' : 'Anti-Forgery Protection'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['security', 'maxUses']}
                label={lang === 'ar' ? 'الحد الأقصى للاستخدام' : 'Maximum Uses'}
              >
                <InputNumber min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['security', 'expiryDays']}
                label={lang === 'ar' ? 'أيام الصلاحية' : 'Expiry Days'}
              >
                <InputNumber min={1} max={365} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* إعدادات التصميم */}
        <Card
          title={
            <div>
                              <BgColorsOutlined style={{ marginRight: 8 }} />
                {lang === 'ar' ? 'إعدادات التصميم' : 'Design Settings'}
            </div>
          }
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['design', 'customColors']}
                label={lang === 'ar' ? 'ألوان مخصصة' : 'Custom Colors'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['design', 'showWatermark']}
                label={lang === 'ar' ? 'إظهار العلامة المائية' : 'Show Watermark'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['design', 'primaryColor']}
                label={lang === 'ar' ? 'اللون الأساسي' : 'Primary Color'}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['design', 'secondaryColor']}
                label={lang === 'ar' ? 'اللون الثانوي' : 'Secondary Color'}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['design', 'watermarkText']}
                label={lang === 'ar' ? 'نص العلامة المائية' : 'Watermark Text'}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* إعدادات المسح */}
        <Card
          title={
            <div>
              <CameraOutlined style={{ marginRight: 8 }} />
              {lang === 'ar' ? 'إعدادات المسح' : 'Scanning Settings'}
            </div>
          }
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['scanning', 'autoFocus']}
                label={lang === 'ar' ? 'تركيز تلقائي' : 'Auto Focus'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['scanning', 'continuousScan']}
                label={lang === 'ar' ? 'مسح مستمر' : 'Continuous Scan'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['scanning', 'highResolution']}
                label={lang === 'ar' ? 'دقة عالية' : 'High Resolution'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['scanning', 'enableTorch']}
                label={lang === 'ar' ? 'تفعيل الفلاش' : 'Enable Flash'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['scanning', 'maxScanAttempts']}
                label={lang === 'ar' ? 'الحد الأقصى للمحاولات' : 'Max Scan Attempts'}
              >
                <InputNumber min={1} max={10} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['scanning', 'soundEnabled']}
                label={lang === 'ar' ? 'تفعيل الصوت' : 'Enable Sound'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* إعدادات الإشعارات */}
        <Card
          title={
            <div>
              <BellOutlined style={{ marginRight: 8 }} />
              {lang === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
            </div>
          }
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['notifications', 'scanSuccess']}
                label={lang === 'ar' ? 'نجاح المسح' : 'Scan Success'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['notifications', 'scanError']}
                label={lang === 'ar' ? 'خطأ المسح' : 'Scan Error'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['notifications', 'expiryWarning']}
                label={lang === 'ar' ? 'تحذير انتهاء الصلاحية' : 'Expiry Warning'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['notifications', 'securityAlert']}
                label={lang === 'ar' ? 'تنبيهات الأمان' : 'Security Alerts'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['notifications', 'pushNotifications']}
                label={lang === 'ar' ? 'إشعارات الدفع' : 'Push Notifications'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['notifications', 'emailNotifications']}
                label={lang === 'ar' ? 'إشعارات البريد' : 'Email Notifications'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* إعدادات متقدمة */}
        <Card
          title={
            <div>
              <SafetyCertificateOutlined style={{ marginRight: 8 }} />
              {lang === 'ar' ? 'إعدادات متقدمة' : 'Advanced Settings'}
            </div>
          }
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={['advanced', 'backupCodes']}
                label={lang === 'ar' ? 'رموز احتياطية' : 'Backup Codes'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['advanced', 'offlineMode']}
                label={lang === 'ar' ? 'الوضع غير المتصل' : 'Offline Mode'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['advanced', 'analytics']}
                label={lang === 'ar' ? 'التحليلات' : 'Analytics'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['advanced', 'debugMode']}
                label={lang === 'ar' ? 'وضع التصحيح' : 'Debug Mode'}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={['advanced', 'performanceMode']}
                label={lang === 'ar' ? 'وضع الأداء' : 'Performance Mode'}
              >
                <Select>
                  <Option value="balanced">{lang === 'ar' ? 'متوازن' : 'Balanced'}</Option>
                  <Option value="performance">{lang === 'ar' ? 'أداء عالي' : 'High Performance'}</Option>
                  <Option value="battery">{lang === 'ar' ? 'توفير البطارية' : 'Battery Saver'}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* أزرار التحكم */}
        <Card style={{ textAlign: 'center' }}>
          <Space size="large">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              size="large"
            >
              {lang === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              size="large"
            >
              {lang === 'ar' ? 'إعادة تعيين' : 'Reset'}
            </Button>
          </Space>
        </Card>
      </Form>
    </div>
  );
};

export default QRCodeSettings; 