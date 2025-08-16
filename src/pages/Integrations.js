import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Switch,
  Form,
  message,
  Space,
  Divider,
  Typography,
  Alert,
  Badge,
  Tag,
  Tooltip,
  Modal,
  List,
  Avatar,
  Progress,
  Tabs,
  Collapse,
  Upload,
  Checkbox
} from 'antd';
import {
  MessageOutlined,
  BellOutlined,
  EnvironmentOutlined,
  WhatsAppOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  ExperimentOutlined,
  SaveOutlined,
  KeyOutlined,
  PhoneOutlined,
  MailOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CloudOutlined,
  SecurityScanOutlined,
  ReloadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  DollarOutlined,
  BankOutlined,
  AppleOutlined
} from '@ant-design/icons';
import { useToast } from '../utils/toastService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const Integrations = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [integrations, setIntegrations] = useState({
    sms: {
      enabled: false,
      provider: 'twilio',
      apiKey: '',
      apiSecret: '',
      fromNumber: '',
      testNumber: ''
    },
    push: {
      enabled: false,
      provider: 'firebase',
      serverKey: '',
      projectId: '',
      appId: ''
    },
    maps: {
      enabled: false,
      provider: 'google',
      apiKey: '',
      language: 'ar',
      region: 'SA'
    },
    whatsapp: {
      enabled: false,
      provider: 'twilio',
      accountSid: '',
      authToken: '',
      fromNumber: '',
      webhookUrl: ''
    },
    email: {
      enabled: false,
      provider: 'sendgrid',
      apiKey: '',
      fromEmail: '',
      fromName: ''
    },
    payment: {
      enabled: false,
      provider: 'stripe',
      publishableKey: '',
      secretKey: '',
      webhookSecret: ''
    },
    hyperpay: {
      enabled: false,
      provider: 'hyperpay',
      merchantId: '',
      accessToken: '',
      secretKey: '',
      webhookUrl: '',
      environment: 'test' // test or production
    },
    applepay: {
      enabled: false,
      provider: 'apple',
      merchantId: '',
      merchantName: '',
      merchantDisplayName: '',
      certificatePath: '',
      privateKeyPath: '',
      domainName: '',
      environment: 'sandbox', // sandbox or production
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit'],
      countryCode: 'SA',
      currencyCode: 'SAR'
    }
  });
  const [showSecrets, setShowSecrets] = useState({});
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app, fetch from API
      setIntegrations(integrations);
    } catch (error) {
      toast.error('خطأ في تحميل الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (integrationKey) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (error) {
      toast.error('خطأ في حفظ الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async (integrationKey) => {
    setTestLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('تم إرسال رسالة الاختبار بنجاح');
    } catch (error) {
      toast.error('خطأ في إرسال رسالة الاختبار');
    } finally {
      setTestLoading(false);
    }
  };

  const handleToggleSecret = (key) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleIntegrationChange = (integrationKey, field, value) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationKey]: {
        ...prev[integrationKey],
        [field]: value
      }
    }));
  };

  const renderSMSIntegration = () => (
    <Card title="خدمة الرسائل النصية (SMS)" className="integration-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space align="center">
            <Switch
              checked={integrations.sms.enabled}
              onChange={(checked) => handleIntegrationChange('sms', 'enabled', checked)}
            />
            <Text strong>تفعيل خدمة الرسائل النصية</Text>
          </Space>
        </Col>
        
        {integrations.sms.enabled && (
          <>
            <Col span={12}>
              <Form.Item label="مزود الخدمة">
                <Select
                  value={integrations.sms.provider}
                  onChange={(value) => handleIntegrationChange('sms', 'provider', value)}
                >
                  <Option value="twilio">Twilio</Option>
                  <Option value="nexmo">Nexmo</Option>
                  <Option value="aws">AWS SNS</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="رقم المرسل">
                <Input
                  value={integrations.sms.fromNumber}
                  onChange={(e) => handleIntegrationChange('sms', 'fromNumber', e.target.value)}
                  placeholder="+966501234567"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="مفتاح API">
                <Input
                  type={showSecrets.smsApiKey ? 'text' : 'password'}
                  value={integrations.sms.apiKey}
                  onChange={(e) => handleIntegrationChange('sms', 'apiKey', e.target.value)}
                  placeholder="أدخل مفتاح API"
                  suffix={
                    <Tooltip title={showSecrets.smsApiKey ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.smsApiKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('smsApiKey')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="الرمز السري">
                <Input
                  type={showSecrets.smsApiSecret ? 'text' : 'password'}
                  value={integrations.sms.apiSecret}
                  onChange={(e) => handleIntegrationChange('sms', 'apiSecret', e.target.value)}
                  placeholder="أدخل الرمز السري"
                  suffix={
                    <Tooltip title={showSecrets.smsApiSecret ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.smsApiSecret ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('smsApiSecret')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="رقم الاختبار">
                <Input
                  value={integrations.sms.testNumber}
                  onChange={(e) => handleIntegrationChange('sms', 'testNumber', e.target.value)}
                  placeholder="+966501234567"
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('sms')}
                  loading={loading}
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={() => handleTest('sms')}
                  loading={testLoading}
                  disabled={!integrations.sms.testNumber}
                >
                  اختبار الإرسال
                </Button>
              </Space>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );

  const renderPushIntegration = () => (
    <Card title="الإشعارات الفورية (Push Notifications)" className="integration-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space align="center">
            <Switch
              checked={integrations.push.enabled}
              onChange={(checked) => handleIntegrationChange('push', 'enabled', checked)}
            />
            <Text strong>تفعيل الإشعارات الفورية</Text>
          </Space>
        </Col>
        
        {integrations.push.enabled && (
          <>
            <Col span={12}>
              <Form.Item label="مزود الخدمة">
                <Select
                  value={integrations.push.provider}
                  onChange={(value) => handleIntegrationChange('push', 'provider', value)}
                >
                  <Option value="firebase">Firebase Cloud Messaging</Option>
                  <Option value="onesignal">OneSignal</Option>
                  <Option value="pusher">Pusher</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="معرف المشروع">
                <Input
                  value={integrations.push.projectId}
                  onChange={(e) => handleIntegrationChange('push', 'projectId', e.target.value)}
                  placeholder="project-id-123"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="مفتاح الخادم">
                <Input
                  type={showSecrets.pushServerKey ? 'text' : 'password'}
                  value={integrations.push.serverKey}
                  onChange={(e) => handleIntegrationChange('push', 'serverKey', e.target.value)}
                  placeholder="أدخل مفتاح الخادم"
                  suffix={
                    <Tooltip title={showSecrets.pushServerKey ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.pushServerKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('pushServerKey')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="معرف التطبيق">
                <Input
                  value={integrations.push.appId}
                  onChange={(e) => handleIntegrationChange('push', 'appId', e.target.value)}
                  placeholder="1:123456789:android:abcdef"
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('push')}
                  loading={loading}
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={() => handleTest('push')}
                  loading={testLoading}
                >
                  اختبار الإشعار
                </Button>
              </Space>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );

  const renderMapsIntegration = () => (
    <Card title="خرائط جوجل (Google Maps)" className="integration-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space align="center">
            <Switch
              checked={integrations.maps.enabled}
              onChange={(checked) => handleIntegrationChange('maps', 'enabled', checked)}
            />
            <Text strong>تفعيل خرائط جوجل</Text>
          </Space>
        </Col>
        
        {integrations.maps.enabled && (
          <>
            <Col span={12}>
              <Form.Item label="مفتاح API">
                <Input
                  type={showSecrets.mapsApiKey ? 'text' : 'password'}
                  value={integrations.maps.apiKey}
                  onChange={(e) => handleIntegrationChange('maps', 'apiKey', e.target.value)}
                  placeholder="أدخل مفتاح Google Maps API"
                  suffix={
                    <Tooltip title={showSecrets.mapsApiKey ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.mapsApiKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('mapsApiKey')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={6}>
              <Form.Item label="اللغة">
                <Select
                  value={integrations.maps.language}
                  onChange={(value) => handleIntegrationChange('maps', 'language', value)}
                >
                  <Option value="ar">العربية</Option>
                  <Option value="en">English</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={6}>
              <Form.Item label="المنطقة">
                <Select
                  value={integrations.maps.region}
                  onChange={(value) => handleIntegrationChange('maps', 'region', value)}
                >
                  <Option value="SA">السعودية</Option>
                  <Option value="AE">الإمارات</Option>
                  <Option value="KW">الكويت</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Alert
                message="ملاحظة"
                description="تأكد من تفعيل خدمات Places API و Geocoding API في لوحة تحكم Google Cloud"
                type="info"
                showIcon
                style={{ marginBottom: '16px' }}
              />
            </Col>
            
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('maps')}
                  loading={loading}
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={() => handleTest('maps')}
                  loading={testLoading}
                >
                  اختبار الاتصال
                </Button>
              </Space>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );

  const renderWhatsAppIntegration = () => (
    <Card title="واتساب للأعمال (WhatsApp Business)" className="integration-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space align="center">
            <Switch
              checked={integrations.whatsapp.enabled}
              onChange={(checked) => handleIntegrationChange('whatsapp', 'enabled', checked)}
            />
            <Text strong>تفعيل واتساب للأعمال</Text>
          </Space>
        </Col>
        
        {integrations.whatsapp.enabled && (
          <>
            <Col span={12}>
              <Form.Item label="مزود الخدمة">
                <Select
                  value={integrations.whatsapp.provider}
                  onChange={(value) => handleIntegrationChange('whatsapp', 'provider', value)}
                >
                  <Option value="twilio">Twilio WhatsApp</Option>
                  <Option value="facebook">Facebook Business API</Option>
                  <Option value="360dialog">360dialog</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="رقم الحساب">
                <Input
                  value={integrations.whatsapp.fromNumber}
                  onChange={(e) => handleIntegrationChange('whatsapp', 'fromNumber', e.target.value)}
                  placeholder="+966501234567"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="معرف الحساب (SID)">
                <Input
                  type={showSecrets.whatsappAccountSid ? 'text' : 'password'}
                  value={integrations.whatsapp.accountSid}
                  onChange={(e) => handleIntegrationChange('whatsapp', 'accountSid', e.target.value)}
                  placeholder="أدخل معرف الحساب"
                  suffix={
                    <Tooltip title={showSecrets.whatsappAccountSid ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.whatsappAccountSid ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('whatsappAccountSid')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="رمز المصادقة">
                <Input
                  type={showSecrets.whatsappAuthToken ? 'text' : 'password'}
                  value={integrations.whatsapp.authToken}
                  onChange={(e) => handleIntegrationChange('whatsapp', 'authToken', e.target.value)}
                  placeholder="أدخل رمز المصادقة"
                  suffix={
                    <Tooltip title={showSecrets.whatsappAuthToken ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.whatsappAuthToken ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('whatsappAuthToken')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item label="رابط Webhook">
                <Input
                  value={integrations.whatsapp.webhookUrl}
                  onChange={(e) => handleIntegrationChange('whatsapp', 'webhookUrl', e.target.value)}
                  placeholder="https://your-domain.com/api/whatsapp/webhook"
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('whatsapp')}
                  loading={loading}
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={() => handleTest('whatsapp')}
                  loading={testLoading}
                >
                  اختبار الإرسال
                </Button>
              </Space>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );

  const renderEmailIntegration = () => (
    <Card title="خدمة البريد الإلكتروني" className="integration-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space align="center">
            <Switch
              checked={integrations.email.enabled}
              onChange={(checked) => handleIntegrationChange('email', 'enabled', checked)}
            />
            <Text strong>تفعيل خدمة البريد الإلكتروني</Text>
          </Space>
        </Col>
        
        {integrations.email.enabled && (
          <>
            <Col span={12}>
              <Form.Item label="مزود الخدمة">
                <Select
                  value={integrations.email.provider}
                  onChange={(value) => handleIntegrationChange('email', 'provider', value)}
                >
                  <Option value="sendgrid">SendGrid</Option>
                  <Option value="mailgun">Mailgun</Option>
                  <Option value="aws">AWS SES</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="البريد المرسل">
                <Input
                  value={integrations.email.fromEmail}
                  onChange={(e) => handleIntegrationChange('email', 'fromEmail', e.target.value)}
                  placeholder="noreply@yourcompany.com"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="اسم المرسل">
                <Input
                  value={integrations.email.fromName}
                  onChange={(e) => handleIntegrationChange('email', 'fromName', e.target.value)}
                  placeholder="اسم الشركة"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="مفتاح API">
                <Input
                  type={showSecrets.emailApiKey ? 'text' : 'password'}
                  value={integrations.email.apiKey}
                  onChange={(e) => handleIntegrationChange('email', 'apiKey', e.target.value)}
                  placeholder="أدخل مفتاح API"
                  suffix={
                    <Tooltip title={showSecrets.emailApiKey ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.emailApiKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('emailApiKey')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('email')}
                  loading={loading}
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={() => handleTest('email')}
                  loading={testLoading}
                >
                  اختبار الإرسال
                </Button>
              </Space>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );

  const renderPaymentIntegration = () => (
    <Card title="بوابة الدفع" className="integration-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space align="center">
            <Switch
              checked={integrations.payment.enabled}
              onChange={(checked) => handleIntegrationChange('payment', 'enabled', checked)}
            />
            <Text strong>تفعيل بوابة الدفع</Text>
          </Space>
        </Col>
        
        {integrations.payment.enabled && (
          <>
            <Col span={12}>
              <Form.Item label="مزود الخدمة">
                <Select
                  value={integrations.payment.provider}
                  onChange={(value) => handleIntegrationChange('payment', 'provider', value)}
                >
                  <Option value="stripe">Stripe</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="moyasar">Moyasar</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="المفتاح العام">
                <Input
                  type={showSecrets.paymentPublishableKey ? 'text' : 'password'}
                  value={integrations.payment.publishableKey}
                  onChange={(e) => handleIntegrationChange('payment', 'publishableKey', e.target.value)}
                  placeholder="pk_test_..."
                  suffix={
                    <Tooltip title={showSecrets.paymentPublishableKey ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.paymentPublishableKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('paymentPublishableKey')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="المفتاح السري">
                <Input
                  type={showSecrets.paymentSecretKey ? 'text' : 'password'}
                  value={integrations.payment.secretKey}
                  onChange={(e) => handleIntegrationChange('payment', 'secretKey', e.target.value)}
                  placeholder="sk_test_..."
                  suffix={
                    <Tooltip title={showSecrets.paymentSecretKey ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.paymentSecretKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('paymentSecretKey')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="رمز Webhook">
                <Input
                  type={showSecrets.paymentWebhookSecret ? 'text' : 'password'}
                  value={integrations.payment.webhookSecret}
                  onChange={(e) => handleIntegrationChange('payment', 'webhookSecret', e.target.value)}
                  placeholder="whsec_..."
                  suffix={
                    <Tooltip title={showSecrets.paymentWebhookSecret ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.paymentWebhookSecret ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('paymentWebhookSecret')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('payment')}
                  loading={loading}
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={() => handleTest('payment')}
                  loading={testLoading}
                >
                  اختبار الاتصال
                </Button>
              </Space>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );

  const renderHyperPayIntegration = () => (
    <Card title="HyperPay - بوابة الدفع الإلكترونية" className="integration-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space align="center">
            <Switch
              checked={integrations.hyperpay.enabled}
              onChange={(checked) => handleIntegrationChange('hyperpay', 'enabled', checked)}
            />
            <Text strong>تفعيل HyperPay</Text>
          </Space>
        </Col>
        
        {integrations.hyperpay.enabled && (
          <>
            <Col span={12}>
              <Form.Item label="معرف التاجر (Merchant ID)">
                <Input
                  value={integrations.hyperpay.merchantId}
                  onChange={(e) => handleIntegrationChange('hyperpay', 'merchantId', e.target.value)}
                  placeholder="أدخل معرف التاجر"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="رمز الوصول (Access Token)">
                <Input
                  type={showSecrets.hyperpayAccessToken ? 'text' : 'password'}
                  value={integrations.hyperpay.accessToken}
                  onChange={(e) => handleIntegrationChange('hyperpay', 'accessToken', e.target.value)}
                  placeholder="أدخل رمز الوصول"
                  suffix={
                    <Tooltip title={showSecrets.hyperpayAccessToken ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.hyperpayAccessToken ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('hyperpayAccessToken')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="المفتاح السري">
                <Input
                  type={showSecrets.hyperpaySecretKey ? 'text' : 'password'}
                  value={integrations.hyperpay.secretKey}
                  onChange={(e) => handleIntegrationChange('hyperpay', 'secretKey', e.target.value)}
                  placeholder="أدخل المفتاح السري"
                  suffix={
                    <Tooltip title={showSecrets.hyperpaySecretKey ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.hyperpaySecretKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('hyperpaySecretKey')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="رابط Webhook">
                <Input
                  value={integrations.hyperpay.webhookUrl}
                  onChange={(e) => handleIntegrationChange('hyperpay', 'webhookUrl', e.target.value)}
                  placeholder="https://your-domain.com/webhook/hyperpay"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="البيئة">
                <Select
                  value={integrations.hyperpay.environment}
                  onChange={(value) => handleIntegrationChange('hyperpay', 'environment', value)}
                >
                  <Option value="test">بيئة الاختبار</Option>
                  <Option value="production">بيئة الإنتاج</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Alert
                message="معلومات HyperPay"
                description="HyperPay هي بوابة الدفع الإلكترونية الرائدة في المملكة العربية السعودية. تدعم جميع البطاقات المحلية والدولية مع أمان عالي."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </Col>
            
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('hyperpay')}
                  loading={loading}
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={() => handleTest('hyperpay')}
                  loading={testLoading}
                >
                  اختبار الاتصال
                </Button>
                <Button
                  icon={<BankOutlined />}
                  onClick={() => window.open('https://www.hyperpay.com/', '_blank')}
                >
                  زيارة HyperPay
                </Button>
              </Space>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );

  const renderApplePayIntegration = () => (
    <Card title="Apple Pay - دفع آمن عبر Apple" className="integration-card">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space align="center">
            <Switch
              checked={integrations.applepay.enabled}
              onChange={(checked) => handleIntegrationChange('applepay', 'enabled', checked)}
            />
            <Text strong>تفعيل Apple Pay</Text>
          </Space>
        </Col>
        
        {integrations.applepay.enabled && (
          <>
            <Col span={12}>
              <Form.Item label="معرف التاجر (Merchant ID)">
                <Input
                  value={integrations.applepay.merchantId}
                  onChange={(e) => handleIntegrationChange('applepay', 'merchantId', e.target.value)}
                  placeholder="merchant.com.yourdomain.applepay"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="اسم التاجر">
                <Input
                  value={integrations.applepay.merchantName}
                  onChange={(e) => handleIntegrationChange('applepay', 'merchantName', e.target.value)}
                  placeholder="اسم مغسلة السيارات"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="اسم العرض">
                <Input
                  value={integrations.applepay.merchantDisplayName}
                  onChange={(e) => handleIntegrationChange('applepay', 'merchantDisplayName', e.target.value)}
                  placeholder="اسم يظهر للمستخدم"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="اسم النطاق">
                <Input
                  value={integrations.applepay.domainName}
                  onChange={(e) => handleIntegrationChange('applepay', 'domainName', e.target.value)}
                  placeholder="yourdomain.com"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="مسار الشهادة">
                <Input
                  value={integrations.applepay.certificatePath}
                  onChange={(e) => handleIntegrationChange('applepay', 'certificatePath', e.target.value)}
                  placeholder="/path/to/merchant_id.crt"
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="مسار المفتاح الخاص">
                <Input
                  type={showSecrets.applepayPrivateKey ? 'text' : 'password'}
                  value={integrations.applepay.privateKeyPath}
                  onChange={(e) => handleIntegrationChange('applepay', 'privateKeyPath', e.target.value)}
                  placeholder="/path/to/merchant_id.key"
                  suffix={
                    <Tooltip title={showSecrets.applepayPrivateKey ? 'إخفاء' : 'إظهار'}>
                      <Button
                        type="text"
                        icon={showSecrets.applepayPrivateKey ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        onClick={() => handleToggleSecret('applepayPrivateKey')}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="البيئة">
                <Select
                  value={integrations.applepay.environment}
                  onChange={(value) => handleIntegrationChange('applepay', 'environment', value)}
                >
                  <Option value="sandbox">بيئة الاختبار (Sandbox)</Option>
                  <Option value="production">بيئة الإنتاج (Production)</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="رمز البلد">
                <Select
                  value={integrations.applepay.countryCode}
                  onChange={(value) => handleIntegrationChange('applepay', 'countryCode', value)}
                >
                  <Option value="SA">المملكة العربية السعودية</Option>
                  <Option value="AE">الإمارات العربية المتحدة</Option>
                  <Option value="KW">الكويت</Option>
                  <Option value="BH">البحرين</Option>
                  <Option value="OM">عمان</Option>
                  <Option value="QA">قطر</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item label="العملة">
                <Select
                  value={integrations.applepay.currencyCode}
                  onChange={(value) => handleIntegrationChange('applepay', 'currencyCode', value)}
                >
                  <Option value="SAR">الريال السعودي</Option>
                  <Option value="AED">الدرهم الإماراتي</Option>
                  <Option value="KWD">الدينار الكويتي</Option>
                  <Option value="BHD">الدينار البحريني</Option>
                  <Option value="OMR">الريال العماني</Option>
                  <Option value="QAR">الريال القطري</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item label="شبكات البطاقات المدعومة">
                <Checkbox.Group
                  value={integrations.applepay.supportedNetworks}
                  onChange={(values) => handleIntegrationChange('applepay', 'supportedNetworks', values)}
                >
                  <Row gutter={[16, 8]}>
                    <Col span={8}>
                      <Checkbox value="visa">Visa</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="mastercard">Mastercard</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="amex">American Express</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="mada">مدى</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="discover">Discover</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item label="قدرات التاجر">
                <Checkbox.Group
                  value={integrations.applepay.merchantCapabilities}
                  onChange={(values) => handleIntegrationChange('applepay', 'merchantCapabilities', values)}
                >
                  <Row gutter={[16, 8]}>
                    <Col span={8}>
                      <Checkbox value="supports3DS">دعم 3D Secure</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="supportsCredit">بطاقات الائتمان</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="supportsDebit">بطاقات الخصم</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="supportsEMV">EMV</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Alert
                message="معلومات Apple Pay"
                description="Apple Pay يوفر تجربة دفع آمنة ومريحة للمستخدمين. يتطلب إعداد شهادات خاصة من Apple Developer Program وتكوين النطاق بشكل صحيح."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </Col>
            
            <Col span={24}>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('applepay')}
                  loading={loading}
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  icon={<ExperimentOutlined />}
                  onClick={() => handleTest('applepay')}
                  loading={testLoading}
                >
                  اختبار الاتصال
                </Button>
                <Button
                  icon={<AppleOutlined />}
                  onClick={() => window.open('https://developer.apple.com/apple-pay/', '_blank')}
                >
                  دليل Apple Pay
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => window.open('https://developer.apple.com/documentation/apple_pay_on_the_web', '_blank')}
                >
                  الوثائق الرسمية
                </Button>
              </Space>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );

  const items = [
    {
      key: 'sms',
      label: (
        <Space>
          <MessageOutlined />
          <span>الرسائل النصية</span>
          <Badge status={integrations.sms.enabled ? 'success' : 'default'} />
        </Space>
      ),
      children: renderSMSIntegration()
    },
    {
      key: 'push',
      label: (
        <Space>
          <BellOutlined />
          <span>الإشعارات الفورية</span>
          <Badge status={integrations.push.enabled ? 'success' : 'default'} />
        </Space>
      ),
      children: renderPushIntegration()
    },
    {
      key: 'maps',
      label: (
        <Space>
          <EnvironmentOutlined />
          <span>الخرائط</span>
          <Badge status={integrations.maps.enabled ? 'success' : 'default'} />
        </Space>
      ),
      children: renderMapsIntegration()
    },
    {
      key: 'whatsapp',
      label: (
        <Space>
          <WhatsAppOutlined />
          <span>واتساب للأعمال</span>
          <Badge status={integrations.whatsapp.enabled ? 'success' : 'default'} />
        </Space>
      ),
      children: renderWhatsAppIntegration()
    },
    {
      key: 'email',
      label: (
        <Space>
          <MailOutlined />
          <span>البريد الإلكتروني</span>
          <Badge status={integrations.email.enabled ? 'success' : 'default'} />
        </Space>
      ),
      children: renderEmailIntegration()
    },
    {
      key: 'payment',
      label: (
        <Space>
          <DollarOutlined />
          <span>بوابة الدفع</span>
          <Badge status={integrations.payment.enabled ? 'success' : 'default'} />
        </Space>
      ),
      children: renderPaymentIntegration()
    },
    {
      key: 'hyperpay',
      label: (
        <Space>
          <BankOutlined />
          <span>HyperPay</span>
          <Badge status={integrations.hyperpay.enabled ? 'success' : 'default'} />
        </Space>
      ),
      children: renderHyperPayIntegration()
    },
    {
      key: 'applepay',
      label: (
        <Space>
          <AppleOutlined />
          <span>Apple Pay</span>
          <Badge status={integrations.applepay.enabled ? 'success' : 'default'} />
        </Space>
      ),
      children: renderApplePayIntegration()
    }
  ];

  return (
    <div className="integrations-page">
      <div className="page-header">
        <h1>التكاملات والخدمات الخارجية</h1>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={loadIntegrations}
            loading={loading}
          >
            تحديث
          </Button>
        </Space>
      </div>

      <Alert
        message="معلومات مهمة"
        description="تأكد من إعداد جميع الخدمات المطلوبة بشكل صحيح قبل تفعيلها. يمكنك اختبار كل خدمة للتأكد من عملها بشكل سليم."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Tabs
        items={items}
        defaultActiveKey="sms"
        size="large"
        tabPosition="top"
        style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px' }}
        className="integrations-tabs-scroll vertical-scroll-tabs"
      />

      {/* Test Modal */}
      <Modal
        title="اختبار الخدمة"
        open={testModalVisible}
        onCancel={() => setTestModalVisible(false)}
        footer={null}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <SyncOutlined style={{ fontSize: '48px', color: '#1890ff' }} spin />
          <div style={{ marginTop: '16px' }}>
            جاري إرسال رسالة الاختبار...
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Integrations; 