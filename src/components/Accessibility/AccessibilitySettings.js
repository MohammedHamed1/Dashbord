import React from 'react';
import { Modal, Switch, Button, Space, Typography, Divider, Row, Col } from 'antd';
import { 
  EyeOutlined, 
  FontSizeOutlined, 
  PlayCircleOutlined, 
  FocusOutlined,
  ResetOutlined,
  AccessibilityOutlined
} from '@ant-design/icons';
import { useAccessibility } from './AccessibilityProvider';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const AccessibilitySettings = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const {
    highContrast,
    fontSize,
    reducedMotion,
    focusVisible,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleReducedMotion,
    toggleFocusVisible,
    resetSettings
  } = useAccessibility();

  const fontSizeLabels = {
    small: t('small'),
    medium: t('medium'),
    large: t('large')
  };

  return (
    <Modal
      title={
        <Space>
          <AccessibilityOutlined />
          {t('accessibility_settings')}
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="reset" icon={<ResetOutlined />} onClick={resetSettings}>
          {t('reset')}
        </Button>,
        <Button key="close" type="primary" onClick={onClose}>
          {t('close')}
        </Button>
      ]}
      width={600}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* التباين العالي */}
        <Row align="middle" justify="space-between">
          <Col>
            <Space>
              <EyeOutlined />
              <div>
                <Text strong>{t('high_contrast')}</Text>
                <br />
                <Text type="secondary">{t('high_contrast_description')}</Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Switch checked={highContrast} onChange={toggleHighContrast} />
          </Col>
        </Row>

        <Divider />

        {/* حجم الخط */}
        <div>
          <Space align="center" style={{ marginBottom: 16 }}>
            <FontSizeOutlined />
            <Text strong>{t('font_size')}</Text>
          </Space>
          <Row align="middle" justify="space-between">
            <Col>
              <Text>{fontSizeLabels[fontSize]}</Text>
            </Col>
            <Col>
              <Space>
                <Button 
                  size="small" 
                  onClick={decreaseFontSize}
                  disabled={fontSize === 'small'}
                  aria-label={t('decrease_font_size')}
                >
                  A-
                </Button>
                <Button 
                  size="small" 
                  onClick={increaseFontSize}
                  disabled={fontSize === 'large'}
                  aria-label={t('increase_font_size')}
                >
                  A+
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* تقليل الحركة */}
        <Row align="middle" justify="space-between">
          <Col>
            <Space>
              <PlayCircleOutlined />
              <div>
                <Text strong>{t('reduced_motion')}</Text>
                <br />
                <Text type="secondary">{t('reduced_motion_description')}</Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Switch checked={reducedMotion} onChange={toggleReducedMotion} />
          </Col>
        </Row>

        <Divider />

        {/* مؤشر التركيز المرئي */}
        <Row align="middle" justify="space-between">
          <Col>
            <Space>
              <FocusOutlined />
              <div>
                <Text strong>{t('focus_indicator')}</Text>
                <br />
                <Text type="secondary">{t('focus_indicator_description')}</Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Switch checked={focusVisible} onChange={toggleFocusVisible} />
          </Col>
        </Row>

        <Divider />

        {/* معلومات إضافية */}
        <div style={{ 
          background: '#f5f5f5', 
          padding: 16, 
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <Text type="secondary">
            {t('accessibility_info')}
          </Text>
        </div>

      </Space>
    </Modal>
  );
};

export default AccessibilitySettings; 