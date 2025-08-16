import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Divider, 
  Space, 
  Button, 
  Row, 
  Col,
  Timeline,
  Alert,
  Tag,
  Descriptions,
  Collapse,
  List,
  Steps
} from 'antd';
import { 
  FileTextOutlined, 
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  CarOutlined,
  CreditCardOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { Step } = Steps;

const TermsOfService = () => {
  const { t, i18n } = useTranslation();
  const [activeKey, setActiveKey] = useState(['1']);

  const termsData = {
    lastUpdated: '2024-01-15',
    version: '3.0',
    effectiveDate: '2024-01-15',
    companyName: 'PayPass Car Laundry',
    contactEmail: 'legal@paypass.com',
    contactPhone: '+966-50-123-4567',
    website: 'www.paypass.com'
  };

  const serviceTypes = [
    {
      name: 'غسيل السيارة الأساسي',
      description: 'غسيل خارجي وداخلي شامل',
      duration: '30-45 دقيقة',
      price: 'يبدأ من 50 ريال'
    },
    {
      name: 'غسيل السيارة المميز',
      description: 'غسيل شامل مع تلميع وتنظيف المحرك',
      duration: '60-90 دقيقة',
      price: 'يبدأ من 100 ريال'
    },
    {
      name: 'خدمة التلميع المتقدمة',
      description: 'تلميع احترافي مع حماية الطلاء',
      duration: '120-180 دقيقة',
      price: 'يبدأ من 200 ريال'
    },
    {
      name: 'خدمة التنظيف الداخلي',
      description: 'تنظيف شامل للمقاعد والسجاد',
      duration: '45-60 دقيقة',
      price: 'يبدأ من 80 ريال'
    }
  ];

  const userObligations = [
    'تقديم معلومات صحيحة ودقيقة عند التسجيل',
    'الحفاظ على سرية بيانات الحساب',
    'عدم استخدام الخدمة لأغراض غير مشروعة',
    'الالتزام بمواعيد الحجز المحددة',
    'دفع الرسوم المطلوبة في الوقت المحدد',
    'العناية بالسيارة قبل وبعد الخدمة',
    'الإبلاغ عن أي مشاكل أو أضرار فوراً',
    'احترام قواعد السلامة في الموقع'
  ];

  const companyObligations = [
    'تقديم خدمات عالية الجودة',
    'الالتزام بمواعيد الخدمة المحددة',
    'حماية بيانات العملاء',
    'تقديم ضمان على الخدمات المقدمة',
    'التعويض عن الأضرار الناتجة عن الإهمال',
    'توفير خدمة عملاء متاحة على مدار الساعة',
    'تحديث الخدمات والتحسين المستمر',
    'الشفافية في الأسعار والخدمات'
  ];

  const paymentTerms = [
    {
      method: 'الدفع الإلكتروني',
      description: 'بطاقات الائتمان والخصم',
      processing: 'فوري',
      security: 'مشفر ومؤمن'
    },
    {
      method: 'الدفع النقدي',
      description: 'في الموقع عند استلام السيارة',
      processing: 'فوري',
      security: 'إيصال رسمي'
    },
    {
      method: 'المحفظة الإلكترونية',
      description: 'STC Pay, Apple Pay, Google Pay',
      processing: 'فوري',
      security: 'مشفر ومؤمن'
    },
    {
      method: 'التحويل البنكي',
      description: 'للحسابات التجارية',
      processing: '1-3 أيام عمل',
      security: 'مؤمن'
    }
  ];

  const cancellationPolicy = [
    'يمكن إلغاء الحجز مجاناً قبل 24 ساعة من الموعد',
    'إلغاء الحجز قبل 12 ساعة: رسوم 25% من قيمة الخدمة',
    'إلغاء الحجز قبل 6 ساعات: رسوم 50% من قيمة الخدمة',
    'إلغاء الحجز قبل ساعتين: رسوم 75% من قيمة الخدمة',
    'عدم الحضور أو التأخير أكثر من 30 دقيقة: رسوم كاملة',
    'في حالة إلغاء الخدمة من قبل الشركة: استرداد كامل للمبلغ'
  ];

  const warrantyTerms = [
    {
      service: 'غسيل السيارة',
      warranty: '24 ساعة',
      coverage: 'ضمان جودة الغسيل والتلميع'
    },
    {
      service: 'تلميع السيارة',
      warranty: '7 أيام',
      coverage: 'ضمان عدم وجود خدوش أو أضرار'
    },
    {
      service: 'تنظيف المحرك',
      warranty: '48 ساعة',
      coverage: 'ضمان عدم تسرب المياه أو الأضرار'
    },
    {
      service: 'تنظيف المقاعد',
      warranty: '24 ساعة',
      coverage: 'ضمان جودة التنظيف والرائحة'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2} className="page-title">
          <FileTextOutlined /> شروط الاستخدام
        </Title>
        <Text type="secondary">
          آخر تحديث: {termsData.lastUpdated} | الإصدار: {termsData.version}
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="main-content-card">
            <Alert
              message="تنبيه مهم"
              description="باستخدام خدماتنا، فإنك توافق على هذه الشروط والأحكام بالكامل."
              type="warning"
              showIcon
              className="mb-4"
            />

            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* نظرة عامة */}
              <div>
                <Title level={3}>نظرة عامة على الخدمات</Title>
                <Row gutter={[16, 16]}>
                  {serviceTypes.map((service, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card size="small" className="service-card">
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Title level={5}>
                            <CarOutlined /> {service.name}
                          </Title>
                          <Text type="secondary">{service.description}</Text>
                          <Space>
                            <Tag icon={<ClockCircleOutlined />} color="blue">
                              {service.duration}
                            </Tag>
                            <Tag icon={<CreditCardOutlined />} color="green">
                              {service.price}
                            </Tag>
                          </Space>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <Divider />

              {/* التزامات المستخدم */}
              <div>
                <Title level={3}>التزامات المستخدم</Title>
                <List
                  dataSource={userObligations}
                  renderItem={(item, index) => (
                    <List.Item>
                      <Space>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        <Text>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>

              <Divider />

              {/* التزامات الشركة */}
              <div>
                <Title level={3}>التزامات الشركة</Title>
                <Timeline>
                  {companyObligations.map((obligation, index) => (
                    <Timeline.Item 
                      key={index}
                      dot={<SafetyOutlined style={{ color: '#1890ff' }} />}
                    >
                      <Text>{obligation}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>

              <Divider />

              {/* شروط الدفع */}
              <div>
                <Title level={3}>شروط الدفع</Title>
                <Descriptions bordered column={1}>
                  {paymentTerms.map((term, index) => (
                    <Descriptions.Item 
                      key={index}
                      label={
                        <Space>
                          <CreditCardOutlined />
                          {term.method}
                        </Space>
                      }
                    >
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                          <Text strong>الوصف:</Text> {term.description}
                        </div>
                        <div>
                          <Text strong>وقت المعالجة:</Text> {term.processing}
                        </div>
                        <div>
                          <Text strong>الأمان:</Text> {term.security}
                        </div>
                      </Space>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </div>

              <Divider />

              {/* سياسة الإلغاء */}
              <div>
                <Title level={3}>سياسة الإلغاء والتأجيل</Title>
                <Steps direction="vertical" size="small">
                  {cancellationPolicy.map((policy, index) => (
                    <Step 
                      key={index}
                      title={policy}
                      status={index === 0 ? "finish" : "process"}
                      icon={index === 0 ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                    />
                  ))}
                </Steps>
              </div>

              <Divider />

              {/* الضمان */}
              <div>
                <Title level={3}>شروط الضمان</Title>
                <Row gutter={[16, 16]}>
                  {warrantyTerms.map((warranty, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card size="small" className="warranty-card">
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Title level={5}>{warranty.service}</Title>
                          <Tag color="orange">{warranty.warranty}</Tag>
                          <Text type="secondary">{warranty.coverage}</Text>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <Divider />

              {/* معلومات الاتصال */}
              <div>
                <Title level={3}>معلومات الاتصال القانونية</Title>
                <Card className="contact-card">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Space direction="vertical">
                        <Text strong>البريد الإلكتروني:</Text>
                        <Text copyable icon={<MailOutlined />}>
                          {termsData.contactEmail}
                        </Text>
                      </Space>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Space direction="vertical">
                        <Text strong>رقم الهاتف:</Text>
                        <Text copyable icon={<PhoneOutlined />}>
                          {termsData.contactPhone}
                        </Text>
                      </Space>
                    </Col>
                    <Col xs={24}>
                      <Space direction="vertical">
                        <Text strong>الموقع الإلكتروني:</Text>
                        <Text copyable icon={<GlobalOutlined />}>
                          {termsData.website}
                        </Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* معلومات سريعة */}
            <Card title="معلومات سريعة" className="info-card">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>تاريخ السريان:</Text>
                  <br />
                  <Text>{termsData.effectiveDate}</Text>
                </div>
                <div>
                  <Text strong>آخر تحديث:</Text>
                  <br />
                  <Text>{termsData.lastUpdated}</Text>
                </div>
                <div>
                  <Text strong>الإصدار:</Text>
                  <br />
                  <Tag color="blue">{termsData.version}</Tag>
                </div>
                <div>
                  <Text strong>الشركة:</Text>
                  <br />
                  <Text>{termsData.companyName}</Text>
                </div>
              </Space>
            </Card>

            {/* الأسئلة الشائعة */}
            <Card title="الأسئلة الشائعة" className="faq-card">
              <Collapse 
                activeKey={activeKey} 
                onChange={setActiveKey}
                ghost
              >
                <Panel header="كيف يمكنني إلغاء حجز؟" key="1">
                  <Text>
                    يمكنك إلغاء الحجز من خلال التطبيق أو الاتصال بنا قبل 24 ساعة من الموعد.
                  </Text>
                </Panel>
                <Panel header="ما هي سياسة الضمان؟" key="2">
                  <Text>
                    نقدم ضمان على جميع خدماتنا لفترات مختلفة حسب نوع الخدمة.
                  </Text>
                </Panel>
                <Panel header="هل يمكنني تغيير موعد الحجز؟" key="3">
                  <Text>
                    نعم، يمكنك تغيير الموعد قبل 24 ساعة من الموعد الأصلي دون رسوم.
                  </Text>
                </Panel>
                <Panel header="ما هي طرق الدفع المتاحة؟" key="4">
                  <Text>
                    نقبل الدفع النقدي، البطاقات، والمحافظ الإلكترونية.
                  </Text>
                </Panel>
              </Collapse>
            </Card>

            {/* الإجراءات السريعة */}
            <Card title="إجراءات سريعة" className="actions-card">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" block icon={<FileTextOutlined />}>
                  تحميل نسخة من الشروط
                </Button>
                <Button block icon={<PhoneOutlined />}>
                  الاتصال بالدعم القانوني
                </Button>
                <Button block icon={<MailOutlined />}>
                  إرسال استفسار قانوني
                </Button>
                <Button block icon={<InfoCircleOutlined />}>
                  طلب توضيح إضافي
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default TermsOfService; 