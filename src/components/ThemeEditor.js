import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  ColorPicker,
  Slider,
  Switch,
  Space,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Upload,
  message,
  Tabs,
  Collapse
} from 'antd';
import {
  BgColorsOutlined,
  FontSizeOutlined,
  BorderOutlined,
  ShadowOutlined,
  SaveOutlined,
  EyeOutlined,
  UndoOutlined,
  RedoOutlined,
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
// تم إزالة TabPane لأنه لم يعد مستخدماً في Ant Design v5
const { Panel } = Collapse;
// تم إزالة Option لأنه لم يعد مستخدماً في Ant Design v5

const ThemeEditor = ({ data, onSave }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [previewMode, setPreviewMode] = useState('desktop');
  const [saving, setSaving] = useState(false);

  // تهيئة النموذج بالبيانات
  React.useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  // حفظ التصميم
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await onSave(values);
      message.success('تم حفظ إعدادات التصميم بنجاح');
    } catch (error) {
      message.error('فشل في حفظ إعدادات التصميم');
    } finally {
      setSaving(false);
    }
  };

  // معاينة التصميم
  const handlePreview = () => {
    const values = form.getFieldsValue();
    // هنا يمكن إضافة منطق المعاينة
    message.info('سيتم تطبيق التصميم في المعاينة');
  };

  // إعادة تعيين للتصميم الافتراضي
  const handleReset = () => {
    const defaultTheme = {
      primaryColor: '#4e54c8',
      secondaryColor: '#2b3a67',
      accentColor: '#ff6b6b',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      fontFamily: 'Cairo, sans-serif',
      borderRadius: 8,
      shadow: '0 2px 8px rgba(0,0,0,0.1)',
      animation: true,
      darkMode: false
    };
    form.setFieldsValue(defaultTheme);
  };

  return (
    <div className="theme-editor">
      <div className="editor-header">
        <Title level={3}>
          <BgColorsOutlined /> محرر التصميم
        </Title>
        <Text type="secondary">
          تخصيص ألوان وتصميم موقع PayPass
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* محرر التصميم */}
        <Col xs={24} lg={16}>
          <Card title="إعدادات التصميم" className="editor-card">
            <Form form={form} layout="vertical">
              <Tabs 
                defaultActiveKey="colors"
                items={[
                  {
                    key: 'colors',
                    label: 'الألوان',
                    children: (
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Form.Item name="primaryColor" label="اللون الأساسي">
                            <ColorPicker 
                              defaultValue="#4e54c8"
                              showText
                              format="hex"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="secondaryColor" label="اللون الثانوي">
                            <ColorPicker 
                              defaultValue="#2b3a67"
                              showText
                              format="hex"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="accentColor" label="لون التمييز">
                            <ColorPicker 
                              defaultValue="#ff6b6b"
                              showText
                              format="hex"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="backgroundColor" label="لون الخلفية">
                            <ColorPicker 
                              defaultValue="#ffffff"
                              showText
                              format="hex"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="textColor" label="لون النص">
                            <ColorPicker 
                              defaultValue="#333333"
                              showText
                              format="hex"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    )
                  },
                  {
                    key: 'fonts',
                    label: 'الخطوط',
                    children: (
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Form.Item name="fontFamily" label="نوع الخط">
                            <Select>
                              <Select.Option value="Cairo, sans-serif">Cairo</Select.Option>
                              <Select.Option value="Tajawal, sans-serif">Tajawal</Select.Option>
                              <Select.Option value="Almarai, sans-serif">Almarai</Select.Option>
                              <Select.Option value="Arial, sans-serif">Arial</Select.Option>
                              <Select.Option value="Helvetica, sans-serif">Helvetica</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="headingFontSize" label="حجم العناوين">
                            <Slider min={16} max={48} defaultValue={24} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="bodyFontSize" label="حجم النص الأساسي">
                            <Slider min={12} max={20} defaultValue={16} />
                          </Form.Item>
                        </Col>
                      </Row>
                    )
                  },
                  {
                    key: 'effects',
                    label: 'التأثيرات',
                    children: (
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Form.Item name="borderRadius" label="نصف قطر الحواف">
                            <Slider min={0} max={20} defaultValue={8} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="shadow" label="الظلال">
                            <Select>
                              <Select.Option value="none">بدون ظلال</Select.Option>
                              <Select.Option value="0 2px 8px rgba(0,0,0,0.1)">ظل خفيف</Select.Option>
                              <Select.Option value="0 4px 16px rgba(0,0,0,0.15)">ظل متوسط</Select.Option>
                              <Select.Option value="0 8px 32px rgba(0,0,0,0.2)">ظل قوي</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="animation" label="الحركات" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="darkMode" label="الوضع الداكن" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>
                    )
                  },
                  {
                    key: 'advanced',
                    label: 'متقدم',
                    children: (
                      <Collapse defaultActiveKey={['1']}>
                        <Panel header="إعدادات CSS مخصصة" key="1">
                          <Form.Item name="customCSS" label="CSS مخصص">
                            <Input.TextArea 
                              rows={8} 
                              placeholder="أضف CSS مخصص هنا..."
                            />
                          </Form.Item>
                        </Panel>
                        <Panel header="إعدادات JavaScript" key="2">
                          <Form.Item name="customJS" label="JavaScript مخصص">
                            <Input.TextArea 
                              rows={6} 
                              placeholder="أضف JavaScript مخصص هنا..."
                            />
                          </Form.Item>
                        </Panel>
                      </Collapse>
                    )
                  }
                ]}
              />
            </Form>
          </Card>
        </Col>

        {/* معاينة التصميم */}
        <Col xs={24} lg={8}>
          <Card title="معاينة التصميم" className="preview-card">
            <div className="preview-controls">
              <Space>
                <Button 
                  type={previewMode === 'desktop' ? 'primary' : 'default'}
                  icon={<DesktopOutlined />}
                  onClick={() => setPreviewMode('desktop')}
                >
                  سطح المكتب
                </Button>
                <Button 
                  type={previewMode === 'mobile' ? 'primary' : 'default'}
                  icon={<MobileOutlined />}
                  onClick={() => setPreviewMode('mobile')}
                >
                  الهاتف
                </Button>
              </Space>
            </div>

            <div className={`preview-container preview-${previewMode}`}>
              <div className="preview-header" style={{ 
                backgroundColor: form.getFieldValue('primaryColor') || '#4e54c8',
                color: 'white',
                padding: '16px',
                borderRadius: form.getFieldValue('borderRadius') || 8
              }}>
                <Title level={4} style={{ margin: 0, color: 'white' }}>
                  PayPass
                </Title>
              </div>
              
              <div className="preview-content" style={{ 
                backgroundColor: form.getFieldValue('backgroundColor') || '#ffffff',
                color: form.getFieldValue('textColor') || '#333333',
                padding: '20px',
                fontFamily: form.getFieldValue('fontFamily') || 'Cairo, sans-serif'
              }}>
                <Title level={3}>مرحباً بك في PayPass</Title>
                <Text>هذه معاينة للتصميم الجديد</Text>
                
                <div style={{ marginTop: 16 }}>
                  <Button 
                    type="primary"
                    style={{ 
                      backgroundColor: form.getFieldValue('accentColor') || '#ff6b6b',
                      borderColor: form.getFieldValue('accentColor') || '#ff6b6b'
                    }}
                  >
                    زر تجريبي
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* أزرار الإجراءات */}
      <Card className="actions-card" style={{ marginTop: 24 }}>
        <Space size="large">
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
            size="large"
          >
            حفظ التصميم
          </Button>
          
          <Button 
            icon={<EyeOutlined />}
            onClick={handlePreview}
            size="large"
          >
            معاينة
          </Button>
          
          <Button 
            icon={<UndoOutlined />}
            onClick={handleReset}
            size="large"
          >
            إعادة تعيين
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default ThemeEditor; 