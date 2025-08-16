import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  Alert, 
  Space, 
  Typography, 
  Card,
  Switch,
  InputNumber,
  Select,
  message
} from 'antd';
import { 
  SettingOutlined, 
  WifiOutlined, 
  ReloadOutlined,
  SaveOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import { generalApi } from '../api/apiService';
import ServerStatus from './ServerStatus';

const { Title, Text } = Typography;
const { Option } = Select;

const ConnectionManager = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  // إعدادات الاتصال الافتراضية
  const defaultSettings = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
    retryAttempts: 3,
    retryDelay: 5000,
    autoReconnect: true,
    healthCheckInterval: 30000,
  };

  useEffect(() => {
    if (visible) {
      // تحميل الإعدادات المحفوظة
      const savedSettings = localStorage.getItem('connectionSettings');
      if (savedSettings) {
        form.setFieldsValue(JSON.parse(savedSettings));
      } else {
        form.setFieldsValue(defaultSettings);
      }
      
      // فحص حالة الاتصال
      checkConnectionStatus();
    }
  }, [visible, form]);

  // فحص حالة الاتصال
  const checkConnectionStatus = async () => {
    setLoading(true);
    try {
      const isHealthy = await generalApi.checkHealth();
      setConnectionStatus(isHealthy);
    } catch (error) {
      setConnectionStatus(false);
    } finally {
      setLoading(false);
    }
  };

  // اختبار الاتصال
  const testConnection = async () => {
    const values = await form.validateFields();
    setTesting(true);
    
    try {
      // تحديث إعدادات API مؤقتاً
      const originalBaseUrl = process.env.REACT_APP_API_BASE_URL;
      process.env.REACT_APP_API_BASE_URL = values.apiBaseUrl;
      
      const isHealthy = await generalApi.checkHealth();
      
      if (isHealthy) {
        message.success('تم الاتصال بالخادم بنجاح!');
        setConnectionStatus(true);
      } else {
        message.error('فشل الاتصال بالخادم');
        setConnectionStatus(false);
      }
      
      // إعادة الإعدادات الأصلية
      process.env.REACT_APP_API_BASE_URL = originalBaseUrl;
    } catch (error) {
      message.error('خطأ في الاتصال: ' + error.message);
      setConnectionStatus(false);
    } finally {
      setTesting(false);
    }
  };

  // حفظ الإعدادات
  const saveSettings = async () => {
    try {
      const values = await form.validateFields();
      
      // حفظ الإعدادات في localStorage
      localStorage.setItem('connectionSettings', JSON.stringify(values));
      
      // تحديث متغيرات البيئة
      Object.keys(values).forEach(key => {
        if (key === 'apiBaseUrl') {
          process.env.REACT_APP_API_BASE_URL = values[key];
        } else if (key === 'timeout') {
          process.env.REACT_APP_API_TIMEOUT = values[key];
        }
      });
      
      message.success('تم حفظ الإعدادات بنجاح');
      onClose();
    } catch (error) {
      message.error('خطأ في حفظ الإعدادات');
    }
  };

  // إعادة تعيين الإعدادات
  const resetSettings = () => {
    form.setFieldsValue(defaultSettings);
    localStorage.removeItem('connectionSettings');
    message.info('تم إعادة تعيين الإعدادات');
  };

  return (
    <Modal
      title={
        <Space>
          <SettingOutlined />
          <span>إعدادات الاتصال بالخادم</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key="reset" onClick={resetSettings}>
          إعادة تعيين
        </Button>,
        <Button key="test" 
          type="primary" 
          icon={<ExperimentOutlined />}
          loading={testing}
          onClick={testConnection}
        >
          اختبار الاتصال
        </Button>,
        <Button key="save" 
          type="primary" 
          icon={<SaveOutlined />}
          onClick={saveSettings}
        >
          حفظ الإعدادات
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* حالة الاتصال */}
        <Card size="small">
          <ServerStatus showDetails={true} />
        </Card>

        {/* نموذج الإعدادات */}
        <Form
          form={form}
          layout="vertical"
          initialValues={defaultSettings}
        >
          <Form.Item
            name="apiBaseUrl"
            label="عنوان الخادم"
            rules={[
              { required: true, message: 'يرجى إدخال عنوان الخادم' },
              { type: 'url', message: 'يرجى إدخال عنوان URL صحيح' }
            ]}
          >
            <Input 
              placeholder="http://localhost:3001"
              prefix={<WifiOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="timeout"
            label="مهلة الاتصال (مللي ثانية)"
            rules={[
              { required: true, message: 'يرجى إدخال مهلة الاتصال' },
              { type: 'number', min: 1000, max: 60000, message: 'المهلة يجب أن تكون بين 1000 و 60000' }
            ]}
          >
            <InputNumber 
              style={{ width: '100%' }}
              min={1000}
              max={60000}
              step={1000}
            />
          </Form.Item>

          <Form.Item
            name="retryAttempts"
            label="عدد محاولات إعادة الاتصال"
            rules={[
              { required: true, message: 'يرجى إدخال عدد المحاولات' },
              { type: 'number', min: 1, max: 10, message: 'عدد المحاولات يجب أن يكون بين 1 و 10' }
            ]}
          >
            <InputNumber 
              style={{ width: '100%' }}
              min={1}
              max={10}
            />
          </Form.Item>

          <Form.Item
            name="retryDelay"
            label="فترة الانتظار بين المحاولات (مللي ثانية)"
            rules={[
              { required: true, message: 'يرجى إدخال فترة الانتظار' },
              { type: 'number', min: 1000, max: 30000, message: 'فترة الانتظار يجب أن تكون بين 1000 و 30000' }
            ]}
          >
            <InputNumber 
              style={{ width: '100%' }}
              min={1000}
              max={30000}
              step={1000}
            />
          </Form.Item>

          <Form.Item
            name="healthCheckInterval"
            label="فترة فحص حالة الخادم (مللي ثانية)"
            rules={[
              { required: true, message: 'يرجى إدخال فترة الفحص' },
              { type: 'number', min: 10000, max: 300000, message: 'فترة الفحص يجب أن تكون بين 10000 و 300000' }
            ]}
          >
            <InputNumber 
              style={{ width: '100%' }}
              min={10000}
              max={300000}
              step={10000}
            />
          </Form.Item>

          <Form.Item
            name="autoReconnect"
            label="إعادة الاتصال التلقائي"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>

        {/* نصائح الاتصال */}
        <Alert
          message="نصائح لحل مشاكل الاتصال"
          description={
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>تأكد من تشغيل الخادم على المنفذ المحدد</li>
              <li>تحقق من إعدادات الجدار الناري</li>
              <li>تأكد من صحة عنوان URL</li>
              <li>تحقق من اتصال الإنترنت</li>
              <li>جرب زيادة مهلة الاتصال إذا كان الخادم بطيء</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Space>
    </Modal>
  );
};

export default ConnectionManager; 