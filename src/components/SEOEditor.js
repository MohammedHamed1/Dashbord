import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Upload,
  message,
  Tabs,
  List,
  Tag,
  Progress,
  Alert,
  Tooltip,
  Switch
} from 'antd';
import {
  CodeOutlined,
  SearchOutlined,
  GlobalOutlined,
  PictureOutlined,
  LinkOutlined,
  SaveOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const SEOEditor = ({ data, onSave }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [seoScore, setSeoScore] = useState(85);

  // تهيئة النموذج بالبيانات
  React.useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  // حفظ إعدادات SEO
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      await onSave(values);
      message.success('تم حفظ إعدادات SEO بنجاح');
    } catch (error) {
      message.error('فشل في حفظ إعدادات SEO');
    } finally {
      setSaving(false);
    }
  };

  // تحليل SEO
  const analyzeSEO = () => {
    const values = form.getFieldsValue();
    let score = 0;
    let issues = [];

    // فحص العنوان
    if (values.metaTitle && values.metaTitle.length >= 30 && values.metaTitle.length <= 60) {
      score += 20;
    } else {
      issues.push('العنوان يجب أن يكون بين 30-60 حرف');
    }

    // فحص الوصف
    if (values.metaDescription && values.metaDescription.length >= 120 && values.metaDescription.length <= 160) {
      score += 20;
    } else {
      issues.push('الوصف يجب أن يكون بين 120-160 حرف');
    }

    // فحص الكلمات المفتاحية
    if (values.keywords && values.keywords.split(',').length >= 3) {
      score += 15;
    } else {
      issues.push('يجب إضافة 3 كلمات مفتاحية على الأقل');
    }

    // فحص الرابط الأساسي
    if (values.canonicalUrl) {
      score += 10;
    } else {
      issues.push('يجب إضافة الرابط الأساسي');
    }

    // فحص صورة Open Graph
    if (values.ogImage) {
      score += 10;
    } else {
      issues.push('يجب إضافة صورة Open Graph');
    }

    // فحص البيانات المنظمة
    if (values.structuredData) {
      score += 15;
    } else {
      issues.push('يجب إضافة البيانات المنظمة');
    }

    // فحص الروابط الداخلية
    if (values.internalLinks && values.internalLinks.length > 0) {
      score += 10;
    } else {
      issues.push('يجب إضافة روابط داخلية');
    }

    setSeoScore(score);
    return issues;
  };

  // معاينة النتيجة في محركات البحث
  const handlePreview = () => {
    const values = form.getFieldsValue();
    message.info('سيتم عرض معاينة النتيجة في محركات البحث');
  };

  return (
    <div className="seo-editor">
      <div className="editor-header">
        <Title level={3}>
          <CodeOutlined /> محرر SEO
        </Title>
        <Text type="secondary">
          تحسين موقع PayPass لمحركات البحث
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* محرر SEO */}
        <Col xs={24} lg={16}>
          <Card title="إعدادات SEO" className="editor-card">
            <Form form={form} layout="vertical">
              <Tabs defaultActiveKey="basic">
                <TabPane tab="الأساسية" key="basic">
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Form.Item 
                        name="metaTitle" 
                        label={
                          <Space>
                            <Text>عنوان الصفحة (Meta Title)</Text>
                            <Tooltip title="يظهر في نتائج محركات البحث">
                              <InfoCircleOutlined />
                            </Tooltip>
                          </Space>
                        }
                        rules={[
                          { required: true, message: 'العنوان مطلوب' },
                          { min: 30, message: 'العنوان يجب أن يكون 30 حرف على الأقل' },
                          { max: 60, message: 'العنوان يجب أن يكون 60 حرف كحد أقصى' }
                        ]}
                      >
                        <Input 
                          placeholder="عنوان جذاب يصف المحتوى"
                          maxLength={60}
                          showCount
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                      <Form.Item 
                        name="metaDescription" 
                        label={
                          <Space>
                            <Text>وصف الصفحة (Meta Description)</Text>
                            <Tooltip title="يظهر تحت العنوان في نتائج البحث">
                              <InfoCircleOutlined />
                            </Tooltip>
                          </Space>
                        }
                        rules={[
                          { required: true, message: 'الوصف مطلوب' },
                          { min: 120, message: 'الوصف يجب أن يكون 120 حرف على الأقل' },
                          { max: 160, message: 'الوصف يجب أن يكون 160 حرف كحد أقصى' }
                        ]}
                      >
                        <TextArea 
                          rows={3}
                          placeholder="وصف مختصر وجذاب للمحتوى"
                          maxLength={160}
                          showCount
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item 
                        name="keywords" 
                        label={
                          <Space>
                            <Text>الكلمات المفتاحية</Text>
                            <Tooltip title="افصل بين الكلمات بفواصل">
                              <InfoCircleOutlined />
                            </Tooltip>
                          </Space>
                        }
                      >
                        <Input 
                          placeholder="غسيل سيارات, غسيل احترافي, PayPass"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item 
                        name="canonicalUrl" 
                        label="الرابط الأساسي (Canonical URL)"
                      >
                        <Input 
                          placeholder="https://paypass.com"
                          prefix={<GlobalOutlined />}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tab="Open Graph" key="og">
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Form.Item name="ogTitle" label="عنوان Open Graph">
                        <Input placeholder="عنوان يظهر عند المشاركة في وسائل التواصل" />
                      </Form.Item>
                    </Col>
                    
                    <Col span={24}>
                      <Form.Item name="ogDescription" label="وصف Open Graph">
                        <TextArea 
                          rows={3}
                          placeholder="وصف يظهر عند المشاركة في وسائل التواصل"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="ogImage" label="صورة Open Graph">
                        <Upload
                          listType="picture-card"
                          maxCount={1}
                          accept="image/*"
                        >
                          <div>
                            <PictureOutlined />
                            <div style={{ marginTop: 8 }}>رفع صورة</div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="ogType" label="نوع المحتوى">
                        <Select defaultValue="website">
                          <Option value="website">موقع إلكتروني</Option>
                          <Option value="article">مقال</Option>
                          <Option value="product">منتج</Option>
                          <Option value="service">خدمة</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="ogLocale" label="اللغة">
                        <Select defaultValue="ar_SA">
                          <Option value="ar_SA">العربية (السعودية)</Option>
                          <Option value="ar_EG">العربية (مصر)</Option>
                          <Option value="en_US">الإنجليزية (الولايات المتحدة)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tab="Twitter Card" key="twitter">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Form.Item name="twitterCard" label="نوع البطاقة">
                        <Select defaultValue="summary_large_image">
                          <Option value="summary">ملخص</Option>
                          <Option value="summary_large_image">ملخص مع صورة كبيرة</Option>
                          <Option value="app">تطبيق</Option>
                          <Option value="player">مشغل</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="twitterSite" label="حساب Twitter">
                        <Input placeholder="@paypass" prefix="@" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="twitterTitle" label="عنوان Twitter">
                        <Input placeholder="عنوان يظهر في Twitter" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="twitterDescription" label="وصف Twitter">
                        <TextArea 
                          rows={3}
                          placeholder="وصف يظهر في Twitter"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tab="متقدم" key="advanced">
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Form.Item name="structuredData" label="البيانات المنظمة (JSON-LD)">
                        <TextArea 
                          rows={8}
                          placeholder='{"@context": "https://schema.org", "@type": "Organization", "name": "PayPass"}'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="robotsTxt" label="Robots.txt">
                        <TextArea 
                          rows={4}
                          placeholder="User-agent: *\nAllow: /\nDisallow: /admin/"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="enableSitemap" label="تفعيل خريطة الموقع" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="enableAnalytics" label="تفعيل التحليلات" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Form>
          </Card>
        </Col>

        {/* تحليل SEO */}
        <Col xs={24} lg={8}>
          <Card title="تحليل SEO" className="analysis-card">
            <div className="seo-score">
              <Progress 
                type="circle" 
                percent={seoScore} 
                format={percent => `${percent}%`}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
              <Text strong style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
                درجة SEO
              </Text>
            </div>

            <Divider />

            <div className="seo-issues">
              <Title level={5}>المشاكل المطلوب إصلاحها:</Title>
              <List
                size="small"
                dataSource={analyzeSEO()}
                renderItem={(issue, index) => (
                  <List.Item>
                    <Space>
                      <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
                      <Text type="secondary">{issue}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </div>

            <Divider />

            <div className="seo-tips">
              <Title level={5}>نصائح لتحسين SEO:</Title>
              <List
                size="small"
                dataSource={[
                  'استخدم كلمات مفتاحية في العنوان والوصف',
                  'أضف صور عالية الجودة مع alt text',
                  'اكتب محتوى مفيد وطويل',
                  'أضف روابط داخلية وخارجية',
                  'حسن سرعة تحميل الموقع'
                ]}
                renderItem={(tip, index) => (
                  <List.Item>
                    <Space>
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      <Text type="secondary">{tip}</Text>
                    </Space>
                  </List.Item>
                )}
              />
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
            حفظ إعدادات SEO
          </Button>
          
          <Button 
            icon={<SearchOutlined />}
            onClick={analyzeSEO}
            size="large"
          >
            تحليل SEO
          </Button>
          
          <Button 
            icon={<EyeOutlined />}
            onClick={handlePreview}
            size="large"
          >
            معاينة النتيجة
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default SEOEditor; 