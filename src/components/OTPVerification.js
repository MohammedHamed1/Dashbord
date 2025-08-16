import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Typography, Alert, Spin, Input } from 'antd';
import { 
  MobileOutlined, 
  ReloadOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined 
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';

const { Title, Text } = Typography;

const OTPVerification = ({ 
  phone, 
  onVerify, 
  onResend, 
  loading = false,
  maxAttempts = 3 
}) => {
  const { lang } = useLanguage();
  const [otp, setOtp] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      return;
    }

    setAttempts(attempts + 1);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (otp === '123456') { // Demo OTP
        setVerified(true);
        if (onVerify) {
          await onVerify(otp);
        }
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCountdown(60);
      setOtp('');
      setAttempts(0);
      
      if (onResend) {
        await onResend();
      }
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    } finally {
      setResendLoading(false);
    }
  };

  const formatPhone = (phoneNumber) => {
    if (!phoneNumber) return '';
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  };

  if (verified) {
    return (
      <Card style={{ textAlign: 'center', borderRadius: 12 }}>
        <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
        <Title level={3} style={{ color: '#52c41a' }}>
          {lang === 'ar' ? 'تم التحقق بنجاح' : 'Verification Successful'}
        </Title>
        <Text type="secondary">
          {lang === 'ar' ? 'تم التحقق من رقم الهاتف بنجاح' : 'Phone number verified successfully'}
        </Text>
      </Card>
    );
  }

  return (
    <Card
      title={
        <Space>
          <MobileOutlined />
          {lang === 'ar' ? 'التحقق من رقم الهاتف' : 'Phone Verification'}
        </Space>
      }
      style={{ borderRadius: 12 }}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Text>
          {lang === 'ar' ? 'تم إرسال رمز التحقق إلى:' : 'Verification code sent to:'}
        </Text>
        <br />
        <Text strong style={{ fontSize: 16 }}>
          {formatPhone(phone)}
        </Text>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Input
          size="large"
          placeholder={lang === 'ar' ? 'أدخل رمز التحقق (6 أرقام)' : 'Enter verification code (6 digits)'}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          maxLength={6}
          style={{ 
            textAlign: 'center', 
            fontSize: 18, 
            letterSpacing: 8,
            borderRadius: 8
          }}
        />
      </div>

      {attempts >= maxAttempts && (
        <Alert
          message={lang === 'ar' ? 'تم تجاوز الحد الأقصى للمحاولات' : 'Maximum attempts exceeded'}
          description={
            lang === 'ar' 
              ? 'يرجى طلب رمز تحقق جديد'
              : 'Please request a new verification code'
          }
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          type="primary"
          size="large"
          onClick={handleVerify}
          loading={loading}
          disabled={otp.length !== 6 || attempts >= maxAttempts}
          style={{ 
            width: '100%', 
            height: 48,
            borderRadius: 8
          }}
        >
          {loading 
            ? (lang === 'ar' ? 'جاري التحقق...' : 'Verifying...')
            : (lang === 'ar' ? 'تحقق' : 'Verify')
          }
        </Button>

        <div style={{ textAlign: 'center' }}>
          {countdown > 0 ? (
            <Space>
              <ClockCircleOutlined />
              <Text type="secondary">
                {lang === 'ar' 
                  ? `إعادة الإرسال خلال ${countdown} ثانية`
                  : `Resend in ${countdown} seconds`
                }
              </Text>
            </Space>
          ) : (
            <Button
              type="link"
              icon={<ReloadOutlined />}
              onClick={handleResend}
              loading={resendLoading}
              disabled={resendLoading}
            >
              {lang === 'ar' ? 'إعادة إرسال الرمز' : 'Resend Code'}
            </Button>
          )}
        </div>

        {attempts > 0 && attempts < maxAttempts && (
          <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
            {lang === 'ar' 
              ? `المحاولات المتبقية: ${maxAttempts - attempts}`
              : `Attempts remaining: ${maxAttempts - attempts}`
            }
          </Text>
        )}
      </Space>

      <Alert
        message={lang === 'ar' ? 'معلومات مهمة' : 'Important Information'}
        description={
          lang === 'ar' 
            ? 'رمز التحقق صالح لمدة 5 دقائق فقط. تأكد من إدخال الرمز الصحيح.'
            : 'Verification code is valid for 5 minutes only. Make sure to enter the correct code.'
        }
        type="info"
        showIcon
        style={{ marginTop: 16 }}
      />
    </Card>
  );
};

export default OTPVerification; 