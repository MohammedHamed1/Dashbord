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
  Collapse
} from 'antd';
import { 
  SafetyCertificateOutlined, 
  LockOutlined, 
  EyeOutlined,
  UserOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const [activeKey, setActiveKey] = useState(['1']);

  const privacyData = {
    lastUpdated: '2024-01-15',
    version: '2.1',
    effectiveDate: '2024-01-15',
    companyName: 'PayPass Car Laundry',
    contactEmail: 'privacy@paypass.com',
    contactPhone: '+966-50-123-4567'
  };

  const privacyPrinciples = [
    {
      icon: <SafetyCertificateOutlined />,
      title: 'حماية البيانات',
      description: 'نحن نحمي بياناتك الشخصية بأحدث تقنيات التشفير والأمان'
    },
    {
      icon: <LockOutlined />,
      title: 'الخصوصية الكاملة',
      description: 'بياناتك تبقى خاصة ولن نشاركها مع أي طرف ثالث دون موافقتك'
    },
    {
      icon: <EyeOutlined />,
      title: 'الشفافية',
      description: 'نوضح لك بالتفصيل كيف نستخدم بياناتك وأين نخزنها'
    },
    {
      icon: <UserOutlined />,
      title: 'التحكم الكامل',
      description: 'يمكنك الوصول لبياناتك وتعديلها أو حذفها في أي وقت'
    }
  ];

  const dataCollection = [
    {
      type: 'البيانات الشخصية',
      examples: ['الاسم، رقم الهاتف، البريد الإلكتروني'],
      purpose: 'تحديد الهوية والتواصل',
      retention: 'طالما الحساب نشط'
    },
    {
      type: 'بيانات السيارة',
      examples: ['رقم اللوحة، النوع، اللون'],
      purpose: 'تتبع الخدمات والطلبات',
      retention: '5 سنوات'
    },
    {
      type: 'بيانات الدفع',
      examples: ['معلومات البطاقة، سجل المعاملات'],
      purpose: 'معالجة المدفوعات',
      retention: '7 سنوات (متطلبات مالية)'
    },
    {
      type: 'بيانات الاستخدام',
      examples: ['سجل التطبيق، التفضيلات'],
      purpose: 'تحسين الخدمة',
      retention: '3 سنوات'
    }
  ];

  const userRights = [
    'الحق في الوصول لبياناتك الشخصية',
    'الحق في تصحيح البيانات غير الدقيقة',
    'الحق في حذف بياناتك الشخصية',
    'الحق في تقييد معالجة البيانات',
    'الحق في نقل البيانات',
    'الحق في الاعتراض على المعالجة',
    'الحق في سحب الموافقة',
    'الحق في تقديم شكوى للجهات المختصة'
  ];

  const securityMeasures = [
    'تشفير البيانات باستخدام SSL/TLS',
    'جدران الحماية المتقدمة',
    'مراقبة الأمان على مدار الساعة',
    'نسخ احتياطية منتظمة',
    'تدريب الموظفين على الأمان',
    'اختبارات الاختراق الدورية',
    'تحديثات الأمان المستمرة',
    'إدارة الوصول والصلاحيات'
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2} className="page-title">
          <SafetyCertificateOutlined /> سياسة الخصوصية
        </Title>
        <Text type="secondary">
          آخر تحديث: {privacyData.lastUpdated} | الإصدار: {privacyData.version}
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="main-content-card">
            <Alert
              message="معلومات مهمة"
              description="هذه السياسة تحكم كيفية جمع واستخدام وحماية بياناتك الشخصية عند استخدام خدماتنا."
              type="info"
              showIcon
              className="mb-4"
            />

            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* المبادئ الأساسية */}
              <div>
                <Title level={3}>المبادئ الأساسية لحماية الخصوصية</Title>
                <Row gutter={[16, 16]}>
                  {privacyPrinciples.map((principle, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card size="small" className="principle-card">
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                          <div className="principle-icon">{principle.icon}</div>
                          <Title level={5}>{principle.title}</Title>
                          <Text type="secondary">{principle.description}</Text>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <Divider />

              {/* جمع البيانات */}
              <div>
                <Title level={3}>البيانات التي نجمعها</Title>
                <Descriptions bordered column={1}>
                  {dataCollection.map((item, index) => (
                    <Descriptions.Item 
                      key={index}
                      label={
                        <Space>
                          <DatabaseOutlined />
                          {item.type}
                        </Space>
                      }
                    >
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                          <Text strong>أمثلة:</Text> {item.examples.join('، ')}
                        </div>
                        <div>
                          <Text strong>الغرض:</Text> {item.purpose}
                        </div>
                        <div>
                          <Text strong>فترة الاحتفاظ:</Text> {item.retention}
                        </div>
                      </Space>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </div>

              <Divider />

              {/* حقوق المستخدم */}
              <div>
                <Title level={3}>حقوقك كعميل</Title>
                <Timeline>
                  {userRights.map((right, index) => (
                    <Timeline.Item 
                      key={index}
                      dot={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    >
                      <Text>{right}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>

              <Divider />

              {/* إجراءات الأمان */}
              <div>
                <Title level={3}>إجراءات الأمان</Title>
                <Row gutter={[16, 16]}>
                  {securityMeasures.map((measure, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card size="small" className="security-card">
                        <Space>
                          <SafetyCertificateOutlined style={{ color: '#1890ff' }} />
                          <Text>{measure}</Text>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <Divider />

              {/* معلومات الاتصال */}
              <div>
                <Title level={3}>معلومات الاتصال</Title>
                <Card className="contact-card">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Space direction="vertical">
                        <Text strong>البريد الإلكتروني:</Text>
                        <Text copyable>{privacyData.contactEmail}</Text>
                      </Space>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Space direction="vertical">
                        <Text strong>رقم الهاتف:</Text>
                        <Text copyable>{privacyData.contactPhone}</Text>
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
                  <Text>{privacyData.effectiveDate}</Text>
                </div>
                <div>
                  <Text strong>آخر تحديث:</Text>
                  <br />
                  <Text>{privacyData.lastUpdated}</Text>
                </div>
                <div>
                  <Text strong>الإصدار:</Text>
                  <br />
                  <Tag color="blue">{privacyData.version}</Tag>
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
                <Panel header="كيف يمكنني الوصول لبياناتي؟" key="1">
                  <Text>
                    يمكنك الوصول لبياناتك من خلال إعدادات الحساب أو التواصل معنا مباشرة.
                  </Text>
                </Panel>
                <Panel header="هل تشاركون بياناتي مع أطراف ثالثة؟" key="2">
                  <Text>
                    لا، نحن لا نشارك بياناتك مع أي طرف ثالث دون موافقتك الصريحة.
                  </Text>
                </Panel>
                <Panel header="كيف تحمون بياناتي؟" key="3">
                  <Text>
                    نستخدم أحدث تقنيات التشفير والأمان لحماية بياناتك من أي اختراق.
                  </Text>
                </Panel>
                <Panel header="هل يمكنني حذف حسابي؟" key="4">
                  <Text>
                    نعم، يمكنك حذف حسابك وبياناتك في أي وقت من إعدادات الحساب.
                  </Text>
                </Panel>
              </Collapse>
            </Card>

            {/* الإجراءات السريعة */}
            <Card title="إجراءات سريعة" className="actions-card">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" block icon={<UserOutlined />}>
                  تحديث البيانات الشخصية
                </Button>
                <Button block icon={<LockOutlined />}>
                  تغيير كلمة المرور
                </Button>
                <Button block icon={<SafetyCertificateOutlined />}>
                  إعدادات الخصوصية
                </Button>
                <Button block icon={<GlobalOutlined />}>
                  تحميل نسخة من بياناتي
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default PrivacyPolicy; 