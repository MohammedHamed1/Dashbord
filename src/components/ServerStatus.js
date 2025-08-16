import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Space, Typography, Spin } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ReloadOutlined,
  WifiOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import { generalApi } from '../api/apiService';

const { Text, Title } = Typography;

const ServerStatus = ({ showDetails = false }) => {
  const [serverStatus, setServerStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState(null);

  // فحص حالة الخادم
  const checkServerStatus = async () => {
    setLoading(true);
    try {
      const isHealthy = await generalApi.checkHealth();
      setServerStatus(isHealthy);
      setLastCheck(new Date());
    } catch (error) {
      console.error('Server status check failed:', error);
      setServerStatus(false);
      setLastCheck(new Date());
    } finally {
      setLoading(false);
    }
  };

  // فحص حالة الخادم عند تحميل المكون
  useEffect(() => {
    checkServerStatus();
    
    // فحص دوري كل 30 ثانية
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // إذا كان الخادم متصل
  if (serverStatus === true) {
    return (
      <Alert
        message="الخادم متصل"
        description="جميع الخدمات تعمل بشكل طبيعي"
        type="success"
        showIcon
        icon={<CheckCircleOutlined />}
        action={
          <Button 
            size="small" 
            type="text" 
            icon={<ReloadOutlined />}
            onClick={checkServerStatus}
            loading={loading}
          >
            تحديث
          </Button>
        }
      />
    );
  }

  // إذا كان الخادم غير متصل
  if (serverStatus === false) {
    return (
      <Card 
        size="small" 
        style={{ 
          borderColor: '#ff4d4f',
          backgroundColor: '#fff2f0'
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="خطأ في الاتصال بالخادم"
            description={
              <div>
                <Text type="danger">
                  لا يمكن الاتصال بالخادم. يرجى التحقق من:
                </Text>
                <ul style={{ marginTop: 8, marginBottom: 0 }}>
                  <li>اتصال الإنترنت</li>
                  <li>تشغيل الخادم</li>
                  <li>صحة عنوان URL</li>
                  <li>إعدادات الجدار الناري</li>
                </ul>
              </div>
            }
            type="error"
            showIcon
            icon={<CloseCircleOutlined />}
          />
          
          {showDetails && (
            <div style={{ marginTop: 16 }}>
              <Title level={5}>تفاصيل الاتصال:</Title>
              <Text code>URL: {process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}</Text>
              <br />
              <Text code>آخر فحص: {lastCheck?.toLocaleString('ar-SA')}</Text>
            </div>
          )}
          
          <Space>
            <Button 
              type="primary" 
              danger
              icon={<ReloadOutlined />}
              onClick={checkServerStatus}
              loading={loading}
            >
              إعادة المحاولة
            </Button>
            
            <Button 
              icon={<WifiOutlined />}
              onClick={() => {
                // فتح إعدادات الشبكة
                if (navigator.connection) {
                  console.log('Network info:', navigator.connection);
                }
              }}
            >
              فحص الشبكة
            </Button>
          </Space>
        </Space>
      </Card>
    );
  }

  // أثناء التحميل
  return (
    <Alert
      message="جاري فحص حالة الخادم..."
      description="يرجى الانتظار"
      type="info"
      showIcon
      icon={<Spin size="small" />}
    />
  );
};

// مكون مبسط لعرض حالة الخادم
export const SimpleServerStatus = () => {
  const [status, setStatus] = useState(null);
  const [lastCheck, setLastCheck] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // تجنب الفحص المتكرر إذا تم الفحص مؤخراً
        if (lastCheck && Date.now() - lastCheck < 30000) {
          return;
        }
        
        const isHealthy = await generalApi.checkHealth();
        setStatus(isHealthy);
        setLastCheck(Date.now());
      } catch (error) {
        console.log('Server health check failed (expected in development):', error.message);
        setStatus(false);
        setLastCheck(Date.now());
      }
    };

    checkStatus();
    // تقليل الفحص إلى كل 5 دقائق بدلاً من كل دقيقة
    const interval = setInterval(checkStatus, 300000); // 5 دقائق
    
    return () => clearInterval(interval);
  }, [lastCheck]);

  if (status === null) {
    return <Spin size="small" />;
  }

  return status ? (
    <CheckCircleOutlined style={{ color: '#52c41a' }} />
  ) : (
    <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
  );
};

// مكون لإعادة المحاولة التلقائية
export const AutoRetryConnection = ({ children, maxRetries = 3, retryDelay = 5000 }) => {
  const [retryCount, setRetryCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const attemptConnection = async () => {
      try {
        const isHealthy = await generalApi.checkHealth();
        if (isHealthy) {
          setIsConnected(true);
          setRetryCount(0);
        } else {
          throw new Error('Server not healthy');
        }
      } catch (error) {
        console.error(`Connection attempt ${retryCount + 1} failed:`, error);
        
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, retryDelay);
        }
      }
    };

    if (!isConnected && retryCount <= maxRetries) {
      attemptConnection();
    }
  }, [retryCount, isConnected, maxRetries, retryDelay]);

  if (!isConnected) {
    return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        <ExclamationCircleOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
        <Title level={4}>جاري إعادة الاتصال...</Title>
        <Text type="secondary">
          محاولة {retryCount + 1} من {maxRetries + 1}
        </Text>
        <br />
        <Button 
          type="primary" 
          onClick={() => {
            setRetryCount(0);
            setIsConnected(false);
          }}
          style={{ marginTop: 16 }}
        >
          إعادة المحاولة الآن
        </Button>
      </div>
    );
  }

  return children;
};

export default ServerStatus; 