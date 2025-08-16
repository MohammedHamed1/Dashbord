import React from 'react';
import { Button, Card, Typography, Space, Alert, Collapse } from 'antd';
import { ReloadOutlined, HomeOutlined, BugOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

    // تسجيل الخطأ في localStorage
    const errorLog = {
      id: this.state.errorId,
      timestamp: new Date().toISOString(),
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    try {
      const existingErrors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      existingErrors.push(errorLog);
      localStorage.setItem('app_errors', JSON.stringify(existingErrors));
    } catch (e) {
      console.error('Failed to save error to localStorage:', e);
    }

    // إرسال الخطأ إلى خدمة التتبع (في الإنتاج)
    if (process.env.NODE_ENV === 'production') {
      // هنا يمكن إضافة كود لإرسال الخطأ إلى خدمة مثل Sentry
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const errorData = {
      id: this.state.errorId,
      error: this.state.error?.toString(),
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    // في الإنتاج، يمكن إرسال هذا إلى خادم
    console.log('Error report:', errorData);
    
    // محاكاة إرسال التقرير
    alert('تم إرسال تقرير الخطأ بنجاح. شكراً لك!');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: '#f5f5f5'
        }}>
          <Card 
            style={{ 
              maxWidth: '600px', 
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <ExclamationCircleOutlined 
                  style={{ 
                    fontSize: '64px', 
                    color: '#ff4d4f',
                    marginBottom: '16px'
                  }} 
                />
                <Title level={2} style={{ color: '#ff4d4f', margin: 0 }}>
                  حدث خطأ غير متوقع
                </Title>
                <Paragraph style={{ fontSize: '16px', marginTop: '16px' }}>
                  عذراً، حدث خطأ في التطبيق. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.
                </Paragraph>
              </div>

              {this.state.errorId && (
                <Alert
                  message={`معرف الخطأ: ${this.state.errorId}`}
                  type="info"
                  showIcon
                  style={{ textAlign: 'right' }}
                />
              )}

              <Space size="middle">
                <Button 
                  type="primary" 
                  icon={<ReloadOutlined />}
                  onClick={this.handleReload}
                  size="large"
                >
                  إعادة تحميل الصفحة
                </Button>
                <Button 
                  icon={<HomeOutlined />}
                  onClick={this.handleGoHome}
                  size="large"
                >
                  العودة للرئيسية
                </Button>
                <Button 
                  icon={<BugOutlined />}
                  onClick={this.handleReportError}
                  size="large"
                >
                  الإبلاغ عن الخطأ
                </Button>
              </Space>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Collapse style={{ marginTop: '20px' }}>
                  <Panel header="تفاصيل الخطأ (للمطورين)" key="1">
                    <div style={{ textAlign: 'left' }}>
                      <Title level={5}>رسالة الخطأ:</Title>
                      <Text code style={{ display: 'block', marginBottom: '16px' }}>
                        {this.state.error.toString()}
                      </Text>
                      
                      <Title level={5}>Stack Trace:</Title>
                      <pre style={{ 
                        backgroundColor: '#f6f8fa', 
                        padding: '12px', 
                        borderRadius: '6px',
                        overflow: 'auto',
                        fontSize: '12px'
                      }}>
                        {this.state.error.stack}
                      </pre>
                      
                      {this.state.errorInfo && (
                        <>
                          <Title level={5}>Component Stack:</Title>
                          <pre style={{ 
                            backgroundColor: '#f6f8fa', 
                            padding: '12px', 
                            borderRadius: '6px',
                            overflow: 'auto',
                            fontSize: '12px'
                          }}>
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </>
                      )}
                    </div>
                  </Panel>
                </Collapse>
              )}
            </Space>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 