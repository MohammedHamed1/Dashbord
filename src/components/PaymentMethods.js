import React, { useState } from 'react';
import { Card, Radio, Button, Space, Typography, Divider, Alert } from 'antd';
import { 
  AppleOutlined, 
  CreditCardOutlined, 
  BankOutlined,
  MobileOutlined,
  SafetyOutlined 
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';

const { Title, Text } = Typography;

const PaymentMethods = ({ 
  selectedMethod, 
  onMethodChange, 
  onPayment, 
  amount,
  loading = false 
}) => {
  const { lang } = useLanguage();
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    {
      key: 'apple_pay',
      name: lang === 'ar' ? 'Apple Pay' : 'Apple Pay',
      icon: <AppleOutlined style={{ fontSize: 24, color: '#000' }} />,
      description: lang === 'ar' ? 'الدفع الآمن عبر Apple Pay' : 'Secure payment via Apple Pay',
      available: true
    },
    {
      key: 'mada',
      name: lang === 'ar' ? 'مدى' : 'Mada',
      icon: <CreditCardOutlined style={{ fontSize: 24, color: '#00A651' }} />,
      description: lang === 'ar' ? 'بطاقة مدى السعودية' : 'Saudi Mada Card',
      available: true
    },
    {
      key: 'stc_pay',
      name: lang === 'ar' ? 'STC Pay' : 'STC Pay',
      icon: <MobileOutlined style={{ fontSize: 24, color: '#00A651' }} />,
      description: lang === 'ar' ? 'محفظة STC الإلكترونية' : 'STC Digital Wallet',
      available: true
    },
    {
      key: 'hyperpay',
      name: lang === 'ar' ? 'HyperPay' : 'HyperPay',
      icon: <BankOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      description: lang === 'ar' ? 'بوابة الدفع الإلكترونية' : 'Electronic Payment Gateway',
      available: true
    },
    {
      key: 'card',
      name: lang === 'ar' ? 'بطاقة ائتمان' : 'Credit Card',
      icon: <CreditCardOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
      description: lang === 'ar' ? 'فيزا أو ماستركارد' : 'Visa or Mastercard',
      available: true
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      return;
    }

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (onPayment) {
        await onPayment(selectedMethod, amount);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const isApplePayAvailable = () => {
    return window.ApplePaySession && ApplePaySession.canMakePayments();
  };

  const isMadaAvailable = () => {
    // Check if user is in Saudi Arabia or has Mada card
    return true;
  };

  return (
    <Card
      title={
        <Space>
          <SafetyOutlined />
          {lang === 'ar' ? 'اختر طريقة الدفع' : 'Select Payment Method'}
        </Space>
      }
      style={{ borderRadius: 12 }}
    >
      <Radio.Group 
        value={selectedMethod} 
        onChange={(e) => onMethodChange(e.target.value)}
        style={{ width: '100%' }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {paymentMethods.map((method) => (
            <Card
              key={method.key}
              size="small"
              style={{
                border: selectedMethod === method.key ? '2px solid #1890ff' : '1px solid #d9d9d9',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={() => onMethodChange(method.key)}
            >
              <Radio value={method.key} style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {method.icon}
                    <div>
                      <Text strong style={{ fontSize: 16 }}>{method.name}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {method.description}
                      </Text>
                    </div>
                  </div>
                  {method.key === 'apple_pay' && !isApplePayAvailable() && (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {lang === 'ar' ? 'غير متاح' : 'Not Available'}
                    </Text>
                  )}
                </div>
              </Radio>
            </Card>
          ))}
        </Space>
      </Radio.Group>

      <Divider />

      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ marginBottom: 8 }}>
          {lang === 'ar' ? 'إجمالي المبلغ:' : 'Total Amount:'}
        </Title>
        <Title level={2} style={{ color: '#1890ff', marginBottom: 24 }}>
          {amount} {lang === 'ar' ? 'ريال' : 'SAR'}
        </Title>

        <Button
          type="primary"
          size="large"
          onClick={handlePayment}
          loading={processing || loading}
          disabled={!selectedMethod}
          style={{ 
            width: '100%', 
            height: 48, 
            fontSize: 16,
            borderRadius: 8
          }}
        >
          {processing 
            ? (lang === 'ar' ? 'جاري المعالجة...' : 'Processing...')
            : (lang === 'ar' ? 'إتمام الدفع' : 'Complete Payment')
          }
        </Button>
      </div>

      <Alert
        message={lang === 'ar' ? 'معلومات الأمان' : 'Security Information'}
        description={
          lang === 'ar' 
            ? 'جميع المدفوعات مشفرة ومؤمنة. لن نشارك معلوماتك مع أي طرف ثالث.'
            : 'All payments are encrypted and secure. We will not share your information with any third party.'
        }
        type="info"
        showIcon
        style={{ marginTop: 16 }}
      />
    </Card>
  );
};

export default PaymentMethods; 