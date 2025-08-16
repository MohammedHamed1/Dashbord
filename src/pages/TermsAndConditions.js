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
  Table,
  Progress
} from 'antd';
import { 
  BookOutlined, 
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
  InfoCircleOutlined,
  WarningOutlined,
  FileProtectOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();
  const [activeKey, setActiveKey] = useState(['1']);

  const termsData = {
    lastUpdated: '2024-01-15',
    version: '2.5',
    effectiveDate: '2024-01-15',
    companyName: 'PayPass Car Laundry',
    contactEmail: 'legal@paypass.com',
    contactPhone: '+966-50-123-4567',
    website: 'www.paypass.com'
  };

  const liabilityLimits = [
    {
      category: 'الأضرار المادية',
      limit: '5000 ريال',
      description: 'الحد الأقصى للمسؤولية عن الأضرار المادية للسيارة',
      coverage: '85%'
    },
    {
      category: 'الأضرار المعنوية',
      limit: '2000 ريال',
      description: 'الحد الأقصى للمسؤولية عن الأضرار المعنوية',
      coverage: '70%'
    },
    {
      category: 'تأخير الخدمة',
      limit: '500 ريال',
      description: 'التعويض عن تأخير الخدمة عن الموعد المحدد',
      coverage: '100%'
    },
    {
      category: 'فقدان الممتلكات',
      limit: '1000 ريال',
      description: 'المسؤولية عن فقدان الممتلكات داخل السيارة',
      coverage: '90%'
    }
  ];

  const disputeResolution = [
    {
      step: 'التواصل المباشر',
      description: 'محاولة حل النزاع من خلال التواصل المباشر مع خدمة العملاء',
      duration: '48 ساعة',
      success: '85%'
    },
    {
      step: 'الوساطة',
      description: 'في حالة عدم التوصل لحل، يتم اللجوء للوساطة',
      duration: '7 أيام',
      success: '70%'
    },
    {
      step: 'التحكيم',
      description: 'اللجوء للتحكيم التجاري في حالة استمرار النزاع',
      duration: '30 يوم',
      success: '95%'
    },
    {
      step: 'المحكمة',
      description: 'كحل أخير، يتم اللجوء للمحاكم المختصة',
      duration: '90 يوم',
      success: '100%'
    }
  ];

  const intellectualProperty = [
    {
      type: 'العلامات التجارية',
      owner: 'PayPass Car Laundry',
      protection: 'مسجلة ومحمية',
      usage: 'لا يجوز الاستخدام دون إذن'
    },
    {
      type: 'براءات الاختراع',
      owner: 'PayPass Car Laundry',
      protection: 'معلقة',
      usage: 'محمية بموجب القانون'
    },
    {
      type: 'حقوق النشر',
      owner: 'PayPass Car Laundry',
      protection: 'محمية تلقائياً',
      usage: 'جميع الحقوق محفوظة'
    },
    {
      type: 'الأسرار التجارية',
      owner: 'PayPass Car Laundry',
      protection: 'محمية بموجب العقد',
      usage: 'معلومات سرية'
    }
  ];

  const forceMajeure = [
    'الكوارث الطبيعية (الفيضانات، الزلازل، العواصف)',
    'الأحداث السياسية (الحروب، الاضطرابات المدنية)',
    'الأمراض الوبائية والحجر الصحي',
    'انقطاع الكهرباء أو المياه لفترات طويلة',
    'الإضرابات العمالية',
    'التغييرات التشريعية المفاجئة',
    'الأعطال التقنية الكبرى',
    'الأحداث الإرهابية'
  ];

  const terminationConditions = [
    {
      party: 'العميل',
      conditions: [
        'انتهاك شروط الاستخدام بشكل متكرر',
        'عدم دفع الرسوم المستحقة',
        'استخدام الخدمة لأغراض غير مشروعة',
        'إلحاق الضرر بالشركة أو موظفيها',
        'تقديم معلومات مزيفة'
      ]
    },
    {
      party: 'الشركة',
      conditions: [
        'إغلاق الشركة نهائياً',
        'تغيير طبيعة النشاط',
        'عدم القدرة على تقديم الخدمة',
        'أمر قضائي بإيقاف النشاط',
        'انتهاء الترخيص التجاري'
      ]
    }
  ];

  const dataProtection = [
    {
      principle: 'الشرعية والشفافية',
      description: 'معالجة البيانات بناءً على أساس قانوني واضح',
      compliance: '100%'
    },
    {
      principle: 'تحديد الغرض',
      description: 'جمع البيانات لغرض محدد ومعلن',
      compliance: '100%'
    },
    {
      principle: 'تقليل البيانات',
      description: 'جمع الحد الأدنى من البيانات المطلوبة',
      compliance: '95%'
    },
    {
      principle: 'الدقة',
      description: 'ضمان دقة وحداثة البيانات',
      compliance: '98%'
    },
    {
      principle: 'تقييد التخزين',
      description: 'حفظ البيانات لفترة محدودة فقط',
      compliance: '100%'
    },
    {
      principle: 'الأمان',
      description: 'حماية البيانات من الوصول غير المصرح به',
      compliance: '99%'
    }
  ];

  const columns = [
    {
      title: 'الفئة',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'الحد الأقصى',
      dataIndex: 'limit',
      key: 'limit',
    },
    {
      title: 'الوصف',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'نسبة التغطية',
      dataIndex: 'coverage',
      key: 'coverage',
      render: (coverage) => (
        <Progress 
          percent={parseInt(coverage)} 
          size="small" 
          status="active"
        />
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2} className="page-title">
          <BookOutlined /> الشروط والأحكام
        </Title>
        <Text type="secondary">
          آخر تحديث: {termsData.lastUpdated} | الإصدار: {termsData.version}
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="main-content-card">
            <Alert
              message="تنبيه قانوني مهم"
              description="هذه الشروط والأحكام تشكل عقداً ملزماً بينك وبين الشركة. يرجى قراءتها بعناية."
              type="warning"
              showIcon
              className="mb-4"
            />

            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* حدود المسؤولية */}
              <div>
                <Title level={3}>
                  <WarningOutlined /> حدود المسؤولية
                </Title>
                <Table 
                  dataSource={liabilityLimits} 
                  columns={columns} 
                  pagination={false}
                  size="small"
                  className="liability-table"
                />
              </div>

              <Divider />

              {/* حل النزاعات */}
              <div>
                <Title level={3}>إجراءات حل النزاعات</Title>
                <Timeline>
                  {disputeResolution.map((step, index) => (
                    <Timeline.Item 
                      key={index}
                      dot={<SafetyOutlined style={{ color: '#1890ff' }} />}
                    >
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Title level={5}>{step.step}</Title>
                        <Text type="secondary">{step.description}</Text>
                        <Space>
                          <Tag color="blue">المدة: {step.duration}</Tag>
                          <Tag color="green">معدل النجاح: {step.success}</Tag>
                        </Space>
                      </Space>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>

              <Divider />

              {/* الملكية الفكرية */}
              <div>
                <Title level={3}>
                  <FileProtectOutlined /> الملكية الفكرية
                </Title>
                <Descriptions bordered column={1}>
                  {intellectualProperty.map((item, index) => (
                    <Descriptions.Item 
                      key={index}
                      label={
                        <Space>
                          <FileProtectOutlined />
                          {item.type}
                        </Space>
                      }
                    >
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                          <Text strong>المالك:</Text> {item.owner}
                        </div>
                        <div>
                          <Text strong>الحماية:</Text> {item.protection}
                        </div>
                        <div>
                          <Text strong>الاستخدام:</Text> {item.usage}
                        </div>
                      </Space>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </div>

              <Divider />

              {/* القوة القاهرة */}
              <div>
                <Title level={3}>أحكام القوة القاهرة</Title>
                <Alert
                  message="تعريف القوة القاهرة"
                  description="الأحداث الاستثنائية التي لا يمكن التنبؤ بها أو منعها والتي تؤثر على قدرة الشركة على تقديم الخدمات."
                  type="info"
                  showIcon
                  className="mb-4"
                />
                <List
                  dataSource={forceMajeure}
                  renderItem={(item, index) => (
                    <List.Item>
                      <Space>
                        <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                        <Text>{item}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>

              <Divider />

              {/* شروط الإنهاء */}
              <div>
                <Title level={3}>شروط إنهاء العقد</Title>
                <Row gutter={[16, 16]}>
                  {terminationConditions.map((condition, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card size="small" className="termination-card">
                        <Title level={5}>
                          <UserOutlined /> {condition.party}
                        </Title>
                        <List
                          size="small"
                          dataSource={condition.conditions}
                          renderItem={(item, index) => (
                            <List.Item>
                              <Space>
                                <CheckCircleOutlined style={{ color: '#ff4d4f' }} />
                                <Text>{item}</Text>
                              </Space>
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <Divider />

              {/* حماية البيانات */}
              <div>
                <Title level={3}>مبادئ حماية البيانات</Title>
                <Row gutter={[16, 16]}>
                  {dataProtection.map((principle, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card size="small" className="protection-card">
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Title level={5}>{principle.principle}</Title>
                          <Text type="secondary">{principle.description}</Text>
                          <Progress 
                            percent={parseInt(principle.compliance)} 
                            size="small" 
                            status="success"
                          />
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <Divider />

              {/* معلومات الاتصال القانونية */}
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
                <Panel header="ما هي حدود مسؤولية الشركة؟" key="1">
                  <Text>
                    تختلف حدود المسؤولية حسب نوع الضرر، ويمكن الاطلاع على التفاصيل في الجدول أعلاه.
                  </Text>
                </Panel>
                <Panel header="كيف يتم حل النزاعات؟" key="2">
                  <Text>
                    نتبع إجراءات متدرجة تبدأ بالتواصل المباشر وتنتهي باللجوء للمحاكم.
                  </Text>
                </Panel>
                <Panel header="ما هي أحكام القوة القاهرة؟" key="3">
                  <Text>
                    في حالة حدوث أحداث استثنائية، قد نضطر لتعليق الخدمات مؤقتاً.
                  </Text>
                </Panel>
                <Panel header="هل يمكن إنهاء العقد؟" key="4">
                  <Text>
                    نعم، يمكن إنهاء العقد من كلا الطرفين وفقاً للشروط المحددة.
                  </Text>
                </Panel>
              </Collapse>
            </Card>

            {/* الإجراءات السريعة */}
            <Card title="إجراءات سريعة" className="actions-card">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" block icon={<BookOutlined />}>
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

export default TermsAndConditions; 