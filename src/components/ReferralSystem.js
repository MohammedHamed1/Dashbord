import React, { useState } from 'react';
import { Card, Button, Space, Typography, Input, Alert, Modal, List, Avatar, Tag } from 'antd';
import { 
  ShareAltOutlined, 
  GiftOutlined, 
  UserAddOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ReferralSystem = ({ 
  referralCode, 
  loyaltyPoints, 
  referrals = [], 
  onShare,
  onCopyCode 
}) => {
  const { lang } = useLanguage();
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      key: 'whatsapp',
      name: lang === 'ar' ? 'واتساب' : 'WhatsApp',
      icon: '💬',
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(
        lang === 'ar' 
          ? `مرحباً! استخدم رمز الدعوة الخاص بي ${referralCode} واحصل على غسلة مجانية عند شراء باقة!`
          : `Hi! Use my referral code ${referralCode} and get a free wash when you buy a package!`
      )}`
    },
    {
      key: 'instagram',
      name: lang === 'ar' ? 'إنستغرام' : 'Instagram',
      icon: '📷',
      color: '#E4405F',
      url: `https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`
    },
    {
      key: 'snapchat',
      name: lang === 'ar' ? 'سناب شات' : 'Snapchat',
      icon: '👻',
      color: '#FFFC00',
      url: `https://www.snapchat.com/`
    },
    {
      key: 'twitter',
      name: lang === 'ar' ? 'تويتر' : 'Twitter',
      icon: '🐦',
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        lang === 'ar' 
          ? `احصل على غسلة مجانية! استخدم رمز الدعوة: ${referralCode}`
          : `Get a free wash! Use referral code: ${referralCode}`
      )}`
    }
  ];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onCopyCode) onCopyCode();
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleShare = (platform) => {
    const option = shareOptions.find(opt => opt.key === platform);
    if (option) {
      window.open(option.url, '_blank');
      if (onShare) onShare(platform);
    }
  };

  const referralMessage = lang === 'ar' 
    ? `مرحباً! استخدم رمز الدعوة الخاص بي ${referralCode} واحصل على غسلة مجانية عند شراء باقة من مغسلة السيارات الذكية! 🚗✨`
    : `Hi! Use my referral code ${referralCode} and get a free wash when you buy a package from Smart Car Wash! 🚗✨`;

  return (
    <div>
      <Card
        title={
          <Space>
            <GiftOutlined />
            {lang === 'ar' ? 'دعوة الأصدقاء' : 'Invite Friends'}
          </Space>
        }
        style={{ borderRadius: 12, marginBottom: 16 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: '#1890ff' }}>
            {lang === 'ar' ? 'احصل على غسلة مجانية!' : 'Get a Free Wash!'}
          </Title>
          <Paragraph>
            {lang === 'ar' 
              ? 'دع أصدقاءك واستمتع بغسلة مجانية لكل صديق ينضم ويشتري باقة'
              : 'Invite your friends and enjoy a free wash for every friend who joins and buys a package'
            }
          </Paragraph>
        </div>

        <Alert
          message={lang === 'ar' ? 'كيف تعمل الدعوة؟' : 'How it works?'}
          description={
            <div>
              <Text>1. {lang === 'ar' ? 'شارك رمز الدعوة الخاص بك' : 'Share your referral code'}</Text>
              <br />
              <Text>2. {lang === 'ar' ? 'صديقك ينضم ويشتري باقة' : 'Your friend joins and buys a package'}</Text>
              <br />
              <Text>3. {lang === 'ar' ? 'تحصل على غسلة مجانية!' : 'You get a free wash!'}</Text>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <div style={{ marginBottom: 24 }}>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            {lang === 'ar' ? 'رمز الدعوة الخاص بك:' : 'Your Referral Code:'}
          </Text>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            background: '#f5f5f5',
            padding: 12,
            borderRadius: 8,
            border: '1px solid #d9d9d9'
          }}>
            <Text code style={{ fontSize: 18, flex: 1, textAlign: 'center' }}>
              {referralCode}
            </Text>
            <Button
              type={copied ? 'default' : 'primary'}
              icon={copied ? <CheckCircleOutlined /> : <CopyOutlined />}
              onClick={handleCopyCode}
            >
              {copied 
                ? (lang === 'ar' ? 'تم النسخ' : 'Copied')
                : (lang === 'ar' ? 'نسخ' : 'Copy')
              }
            </Button>
          </div>
        </div>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            type="primary"
            size="large"
            icon={<ShareAltOutlined />}
            onClick={() => setShareModalVisible(true)}
            style={{ 
              width: '100%', 
              height: 48,
              borderRadius: 8
            }}
          >
            {lang === 'ar' ? 'مشاركة مع الأصدقاء' : 'Share with Friends'}
          </Button>
        </Space>
      </Card>

      <Card
        title={
          <Space>
            <StarOutlined />
            {lang === 'ar' ? 'نقاط الولاء' : 'Loyalty Points'}
          </Space>
        }
        style={{ borderRadius: 12, marginBottom: 16 }}
      >
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ color: '#722ed1', marginBottom: 8 }}>
            {loyaltyPoints}
          </Title>
          <Text type="secondary">
            {lang === 'ar' ? 'نقطة ولاء' : 'Loyalty Points'}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {lang === 'ar' 
              ? `قيمة ${(loyaltyPoints * 0.1).toFixed(1)} ريال`
              : `Worth ${(loyaltyPoints * 0.1).toFixed(1)} SAR`
            }
          </Text>
        </div>
      </Card>

      {referrals.length > 0 && (
        <Card
          title={
            <Space>
              <UserAddOutlined />
              {lang === 'ar' ? 'الأصدقاء المدعوون' : 'Invited Friends'}
            </Space>
          }
          style={{ borderRadius: 12 }}
        >
          <List
            dataSource={referrals}
            renderItem={(referral) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{referral.name.charAt(0)}</Avatar>}
                  title={referral.name}
                  description={
                    <Space>
                      <Text type="secondary">
                        {lang === 'ar' ? 'انضم في:' : 'Joined:'} {new Date(referral.joinedAt).toLocaleDateString()}
                      </Text>
                      <Tag color={referral.status === 'completed' ? 'green' : 'orange'}>
                        {referral.status === 'completed' 
                          ? (lang === 'ar' ? 'مكتمل' : 'Completed')
                          : (lang === 'ar' ? 'في الانتظار' : 'Pending')
                        }
                      </Tag>
                    </Space>
                  }
                />
                {referral.status === 'completed' && (
                  <Tag color="green" icon={<GiftOutlined />}>
                    {lang === 'ar' ? 'غسلة مجانية' : 'Free Wash'}
                  </Tag>
                )}
              </List.Item>
            )}
          />
        </Card>
      )}

      <Modal
        title={lang === 'ar' ? 'مشاركة مع الأصدقاء' : 'Share with Friends'}
        open={shareModalVisible}
        onCancel={() => setShareModalVisible(false)}
        footer={null}
        width={500}
      >
        <div style={{ marginBottom: 24 }}>
          <TextArea
            value={referralMessage}
            rows={4}
            readOnly
            style={{ marginBottom: 16 }}
          />
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={() => navigator.clipboard.writeText(referralMessage)}
            style={{ width: '100%' }}
          >
            {lang === 'ar' ? 'نسخ الرسالة' : 'Copy Message'}
          </Button>
        </div>

        <Title level={5} style={{ marginBottom: 16 }}>
          {lang === 'ar' ? 'مشاركة عبر:' : 'Share via:'}
        </Title>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {shareOptions.map((option) => (
            <Button
              key={option.key}
              size="large"
              onClick={() => handleShare(option.key)}
              style={{
                height: 60,
                borderRadius: 8,
                border: `2px solid ${option.color}`,
                color: option.color,
                background: 'white'
              }}
            >
              <div>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{option.icon}</div>
                <div style={{ fontSize: 12 }}>{option.name}</div>
              </div>
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ReferralSystem; 