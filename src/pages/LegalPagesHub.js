import React from 'react';
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Button, 
  Space, 
  Divider,
  Alert,
  Statistic
} from 'antd';
import { 
  SafetyCertificateOutlined, 
  FileTextOutlined,
  BookOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useSafeNavigate } from '../utils/safeHooks';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const { Title, Paragraph, Text } = Typography;

const LegalPagesHub = () => {
  const { t, i18n } = useTranslation();
  const navigate = useSafeNavigate();

  const legalPages = [
    {
      key: 'privacy-policy',
      title: 'سياسة الخصوصية',
      description: 'تعرف على كيفية حمايتنا لبياناتك الشخصية وحقوقك في الخصوصية',
      icon: <SafetyCertificateOutlined />,
      color: '#52c41a',
      path: '/privacy-policy',
      features: ['حماية البيانات', 'حقوق المستخدم', 'إجراءات الأمان', 'الشفافية']
    },
    {
      key: 'terms-of-service',
      title: 'شروط الاستخدام',
      description: 'شروط وأحكام استخدام خدماتنا والالتزامات المتبادلة',
      icon: <FileTextOutlined />,
      color: '#1890ff',
      path: '/terms-of-service',
      features: ['الخدمات المقدمة', 'التزامات الطرفين', 'سياسات الدفع', 'الضمانات']
    },
    {
      key: 'terms-and-conditions',
      title: 'الشروط والأحكام',
      description: 'الشروط والأحكام القانونية التفصيلية والمسؤوليات',
      icon: <BookOutlined />,
      color: '#722ed1',
      path: '/terms-and-conditions',
      features: ['حدود المسؤولية', 'حل النزاعات', 'الملكية الفكرية', 'القوة القاهرة']
    },
    {
      key: 'sitemap',
      title: 'خريطة الموقع',
      description: 'دليل شامل لجميع صفحات الموقع وأقسامه المختلفة',
      icon: <AppstoreOutlined />,
      color: '#fa8c16',
      path: '/sitemap',
      features: ['هيكل الموقع', 'البحث السريع', 'الروابط المهمة', 'التنقل السهل']
    }
  ];

  const stats = [
    {
      title: 'إجمالي الصفحات',
      value: 45,
      suffix: 'صفحة',
      icon: <AppstoreOutlined />
    },
    {
      title: 'آخر تحديث',
      value: '2024',
      suffix: 'يناير',
      icon: <ClockCircleOutlined />
    },
    {
      title: 'مستوى الأمان',
      value: 99,
      suffix: '%',
      icon: <SafetyCertificateOutlined />
    },
    {
      title: 'الامتثال القانوني',
      value: 100,
      suffix: '%',
      icon: <CheckCircleOutlined />
    }
  ];

  const handlePageClick = (path) => {
    navigate(path);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2} className="page-title">
          <InfoCircleOutlined /> مركز المعلومات القانونية
        </Title>
        <Text type="secondary">
          جميع المعلومات القانونية والمعلوماتية المطلوبة في مكان واحد
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Alert
            message="معلومات مهمة"
            description="هذه الصفحات تحتوي على المعلومات القانونية والمعلوماتية المطلوبة لاستخدام خدماتنا. يرجى قراءتها بعناية."
            type="info"
            showIcon
            className="mb-4"
          />
        </Col>

        {/* الإحصائيات */}
        <Col xs={24}>
          <Card className="main-content-card">
            <Title level={3}>إحصائيات سريعة</Title>
            <Row gutter={[16, 16]}>
              {stats.map((stat, index) => (
                <Col xs={12} sm={6} key={index}>
                  <Card size="small" className="stat-card">
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.icon}
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* الصفحات القانونية */}
        {legalPages.map((page, index) => (
          <Col xs={24} lg={12} key={page.key}>
            <Card 
              className="legal-page-card"
              hoverable
              onClick={() => handlePageClick(page.path)}
              style={{ cursor: 'pointer' }}
            >
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div className="page-header-section">
                  <Space align="center">
                    <div 
                      className="page-icon"
                      style={{ 
                        color: page.color,
                        fontSize: '32px'
                      }}
                    >
                      {page.icon}
                    </div>
                    <div>
                      <Title level={4} style={{ margin: 0, color: page.color }}>
                        {page.title}
                      </Title>
                      <Text type="secondary">
                        {page.description}
                      </Text>
                    </div>
                  </Space>
                </div>

                <Divider />

                <div className="page-features">
                  <Title level={5}>المميزات الرئيسية:</Title>
                  <Row gutter={[8, 8]}>
                    {page.features.map((feature, featureIndex) => (
                      <Col xs={12} key={featureIndex}>
                        <div className="feature-item">
                          <CheckCircleOutlined style={{ color: page.color, marginRight: 8 }} />
                          <Text>{feature}</Text>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                <div className="page-action">
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{ 
                      backgroundColor: page.color,
                      borderColor: page.color,
                      width: '100%'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePageClick(page.path);
                    }}
                  >
                    عرض {page.title}
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>
        ))}

        {/* معلومات إضافية */}
        <Col xs={24}>
          <Card className="info-card">
            <Title level={3}>معلومات إضافية</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div className="info-section">
                  <Title level={5}>
                    <InfoCircleOutlined /> أهمية هذه الصفحات
                  </Title>
                  <ul>
                    <li>الامتثال للقوانين واللوائح المحلية والدولية</li>
                    <li>حماية حقوق المستخدمين والشركة</li>
                    <li>تعزيز الثقة والشفافية</li>
                    <li>تحسين تجربة المستخدم</li>
                    <li>تسهيل الوصول للمعلومات المطلوبة</li>
                  </ul>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className="info-section">
                  <Title level={5}>
                    <ClockCircleOutlined /> التحديثات الدورية
                  </Title>
                  <ul>
                    <li>مراجعة سياسات الخصوصية كل 6 أشهر</li>
                    <li>تحديث شروط الاستخدام عند إضافة خدمات جديدة</li>
                    <li>مراجعة الشروط والأحكام سنوياً</li>
                    <li>تحديث خريطة الموقع عند إضافة صفحات جديدة</li>
                    <li>إشعار المستخدمين بالتغييرات المهمة</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LegalPagesHub; 