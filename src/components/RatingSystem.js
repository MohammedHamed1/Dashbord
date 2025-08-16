import React, { useState } from 'react';
import { Card, Rate, Button, Space, Typography, Input, Modal, Alert, Avatar, List, Tag } from 'antd';
import { 
  StarOutlined, 
  MessageOutlined, 
  GiftOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const RatingSystem = ({ 
  orderId,
  customerName,
  laundryName,
  onRate,
  onTip,
  existingRating = null,
  showTip = true
}) => {
  const { lang } = useLanguage();
  const [rating, setRating] = useState(existingRating?.rating || 0);
  const [review, setReview] = useState(existingRating?.review || '');
  const [tip, setTip] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [tipModalVisible, setTipModalVisible] = useState(false);

  const tipOptions = [
    { value: 0, label: lang === 'ar' ? 'لا شكراً' : 'No thanks' },
    { value: 5, label: '5 ريال' },
    { value: 10, label: '10 ريال' },
    { value: 15, label: '15 ريال' },
    { value: 20, label: '20 ريال' },
    { value: 'custom', label: lang === 'ar' ? 'مبلغ آخر' : 'Custom amount' }
  ];

  const getRatingEmoji = (rating) => {
    if (rating >= 4) return <SmileOutlined style={{ color: '#52c41a' }} />;
    if (rating >= 3) return <MehOutlined style={{ color: '#faad14' }} />;
    return <FrownOutlined style={{ color: '#ff4d4f' }} />;
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return lang === 'ar' ? 'ممتاز' : 'Excellent';
    if (rating >= 4) return lang === 'ar' ? 'جيد جداً' : 'Very Good';
    if (rating >= 3) return lang === 'ar' ? 'جيد' : 'Good';
    if (rating >= 2) return lang === 'ar' ? 'مقبول' : 'Fair';
    return lang === 'ar' ? 'ضعيف' : 'Poor';
  };

  const handleSubmit = async () => {
    if (rating === 0) return;

    setSubmitting(true);
    try {
      if (onRate) {
        await onRate({
          orderId,
          rating,
          review,
          tip: 0
        });
      }
    } catch (error) {
      console.error('Rating submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTipSubmit = async () => {
    setSubmitting(true);
    try {
      if (onTip) {
        await onTip({
          orderId,
          tip
        });
      }
      setTipModalVisible(false);
    } catch (error) {
      console.error('Tip submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Card
        title={
          <Space>
            <StarOutlined />
            {lang === 'ar' ? 'تقييم الخدمة' : 'Rate Our Service'}
          </Space>
        }
        style={{ borderRadius: 12 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={4}>
            {lang === 'ar' ? 'كيف كانت تجربتك؟' : 'How was your experience?'}
          </Title>
          <Text type="secondary">
            {lang === 'ar' 
              ? `طلب رقم ${orderId} - ${laundryName}`
              : `Order #${orderId} - ${laundryName}`
            }
          </Text>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Rate
            value={rating}
            onChange={setRating}
            size={32}
            style={{ marginBottom: 8 }}
          />
          {rating > 0 && (
            <div style={{ marginTop: 8 }}>
              {getRatingEmoji(rating)}
              <Text strong style={{ marginLeft: 8 }}>
                {getRatingText(rating)}
              </Text>
            </div>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            {lang === 'ar' ? 'أضف تعليقك (اختياري):' : 'Add your comment (optional):'}
          </Text>
          <TextArea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder={
              lang === 'ar' 
                ? 'أخبرنا عن تجربتك مع الخدمة...'
                : 'Tell us about your experience with the service...'
            }
            rows={4}
            maxLength={500}
            showCount
          />
        </div>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            loading={submitting}
            disabled={rating === 0}
            style={{ 
              width: '100%', 
              height: 48,
              borderRadius: 8
            }}
          >
            {submitting 
              ? (lang === 'ar' ? 'جاري الإرسال...' : 'Submitting...')
              : (lang === 'ar' ? 'إرسال التقييم' : 'Submit Rating')
            }
          </Button>

          {showTip && rating >= 4 && (
            <Button
              size="large"
              icon={<GiftOutlined />}
              onClick={() => setTipModalVisible(true)}
              style={{ 
                width: '100%', 
                height: 48,
                borderRadius: 8,
                border: '2px solid #52c41a',
                color: '#52c41a'
              }}
            >
              {lang === 'ar' ? 'إضافة إكرامية للموظف' : 'Add Tip for Employee'}
            </Button>
          )}
        </Space>

        <Alert
          message={lang === 'ar' ? 'معلومات مهمة' : 'Important Information'}
          description={
            lang === 'ar' 
              ? 'تقييمك يساعدنا في تحسين جودة الخدمة. شكراً لك!'
              : 'Your rating helps us improve our service quality. Thank you!'
          }
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>

      <Modal
        title={
          <Space>
            <GiftOutlined />
            {lang === 'ar' ? 'إضافة إكرامية' : 'Add Tip'}
          </Space>
        }
        open={tipModalVisible}
        onCancel={() => setTipModalVisible(false)}
        footer={null}
        width={400}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={4}>
            {lang === 'ar' ? 'أضف إكرامية للموظف' : 'Add Tip for Employee'}
          </Title>
          <Text type="secondary">
            {lang === 'ar' 
              ? 'الإكرامية اختيارية وتذهب مباشرة للموظف'
              : 'Tips are optional and go directly to the employee'
            }
          </Text>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {tipOptions.map((option) => (
              <Button
                key={option.value}
                type={tip === option.value ? 'primary' : 'default'}
                onClick={() => setTip(option.value)}
                style={{ height: 48, borderRadius: 8 }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {tip === 'custom' && (
          <div style={{ marginBottom: 24 }}>
            <Input
              type="number"
              placeholder={lang === 'ar' ? 'أدخل المبلغ' : 'Enter amount'}
              suffix="ريال"
              style={{ height: 48, borderRadius: 8 }}
              onChange={(e) => setTip(parseInt(e.target.value) || 0)}
            />
          </div>
        )}

        <Button
          type="primary"
          size="large"
          onClick={handleTipSubmit}
          loading={submitting}
          style={{ 
            width: '100%', 
            height: 48,
            borderRadius: 8
          }}
        >
          {submitting 
            ? (lang === 'ar' ? 'جاري الإرسال...' : 'Submitting...')
            : (lang === 'ar' ? 'إرسال الإكرامية' : 'Send Tip')
          }
        </Button>
      </Modal>
    </div>
  );
};

export default RatingSystem; 