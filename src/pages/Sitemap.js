import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Divider, 
  Space, 
  Button, 
  Row, 
  Col,
  Tree,
  List,
  Tag,
  Input,
  Collapse,
  Breadcrumb,
  Anchor
} from 'antd';
import { 
  AppstoreOutlined, 
  HomeOutlined,
  UserOutlined,
  CarOutlined,
  CreditCardOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  SearchOutlined,
  FileTextOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Pages.css';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const { Search } = Input;
const { Link } = Anchor;

const Sitemap = () => {
  const { t, i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState(['0-0']);

  const sitemapData = {
    lastUpdated: '2024-01-15',
    totalPages: 45,
    mainCategories: 8,
    subCategories: 37
  };

  const siteStructure = [
    {
      key: '0-0',
      title: 'الصفحة الرئيسية',
      icon: <HomeOutlined />,
      url: '/',
      description: 'الصفحة الرئيسية للموقع',
      children: [
        {
          key: '0-0-0',
          title: 'الرئيسية',
          url: '/',
          description: 'الصفحة الرئيسية مع الخدمات المميزة'
        },
        {
          key: '0-0-1',
          title: 'عن الشركة',
          url: '/about',
          description: 'معلومات عن الشركة وتاريخها'
        },
        {
          key: '0-0-2',
          title: 'الخدمات',
          url: '/services',
          description: 'جميع خدمات غسيل السيارات'
        },
        {
          key: '0-0-3',
          title: 'الأسعار',
          url: '/pricing',
          description: 'أسعار الخدمات المختلفة'
        }
      ]
    },
    {
      key: '0-1',
      title: 'خدمات العملاء',
      icon: <UserOutlined />,
      url: '/customer-services',
      description: 'جميع خدمات العملاء',
      children: [
        {
          key: '0-1-0',
          title: 'حجز موعد',
          url: '/booking',
          description: 'حجز موعد لغسيل السيارة'
        },
        {
          key: '0-1-1',
          title: 'تتبع الطلب',
          url: '/track-order',
          description: 'تتبع حالة الطلب'
        },
        {
          key: '0-1-2',
          title: 'حسابي',
          url: '/my-account',
          description: 'إدارة الحساب الشخصي'
        },
        {
          key: '0-1-3',
          title: 'سجل الطلبات',
          url: '/order-history',
          description: 'عرض سجل الطلبات السابقة'
        },
        {
          key: '0-1-4',
          title: 'المفضلة',
          url: '/favorites',
          description: 'الخدمات المفضلة'
        }
      ]
    },
    {
      key: '0-2',
      title: 'خدمات السيارات',
      icon: <CarOutlined />,
      url: '/car-services',
      description: 'جميع خدمات السيارات',
      children: [
        {
          key: '0-2-0',
          title: 'غسيل خارجي',
          url: '/external-wash',
          description: 'غسيل خارجي شامل للسيارة'
        },
        {
          key: '0-2-1',
          title: 'غسيل داخلي',
          url: '/internal-wash',
          description: 'تنظيف داخلي شامل'
        },
        {
          key: '0-2-2',
          title: 'تلميع السيارة',
          url: '/car-polish',
          description: 'تلميع احترافي للسيارة'
        },
        {
          key: '0-2-3',
          title: 'تنظيف المحرك',
          url: '/engine-clean',
          description: 'تنظيف محرك السيارة'
        },
        {
          key: '0-2-4',
          title: 'تنظيف المقاعد',
          url: '/seat-clean',
          description: 'تنظيف وتلميع المقاعد'
        },
        {
          key: '0-2-5',
          title: 'حماية الطلاء',
          url: '/paint-protection',
          description: 'حماية طلاء السيارة'
        }
      ]
    },
    {
      key: '0-3',
      title: 'المدفوعات',
      icon: <CreditCardOutlined />,
      url: '/payments',
      description: 'خدمات الدفع والمدفوعات',
      children: [
        {
          key: '0-3-0',
          title: 'طرق الدفع',
          url: '/payment-methods',
          description: 'جميع طرق الدفع المتاحة'
        },
        {
          key: '0-3-1',
          title: 'البطاقات',
          url: '/cards',
          description: 'بطاقات الائتمان والخصم'
        },
        {
          key: '0-3-2',
          title: 'المحافظ الإلكترونية',
          url: '/e-wallets',
          description: 'STC Pay, Apple Pay, Google Pay'
        },
        {
          key: '0-3-3',
          title: 'الدفع النقدي',
          url: '/cash-payment',
          description: 'الدفع النقدي في الموقع'
        },
        {
          key: '0-3-4',
          title: 'الفواتير',
          url: '/invoices',
          description: 'عرض وتحميل الفواتير'
        }
      ]
    },
    {
      key: '0-4',
      title: 'الدعم والمساعدة',
      icon: <QuestionCircleOutlined />,
      url: '/support',
      description: 'الدعم الفني والمساعدة',
      children: [
        {
          key: '0-4-0',
          title: 'الأسئلة الشائعة',
          url: '/faq',
          description: 'الأسئلة الشائعة وإجاباتها'
        },
        {
          key: '0-4-1',
          title: 'الدعم الفني',
          url: '/technical-support',
          description: 'الدعم الفني والتقني'
        },
        {
          key: '0-4-2',
          title: 'الشكاوى',
          url: '/complaints',
          description: 'تقديم شكوى أو اقتراح'
        },
        {
          key: '0-4-3',
          title: 'الدردشة المباشرة',
          url: '/live-chat',
          description: 'الدردشة المباشرة مع خدمة العملاء'
        },
        {
          key: '0-4-4',
          title: 'التواصل',
          url: '/contact',
          description: 'معلومات التواصل معنا'
        }
      ]
    },
    {
      key: '0-5',
      title: 'المعلومات القانونية',
      icon: <FileTextOutlined />,
      url: '/legal',
      description: 'المعلومات والوثائق القانونية',
      children: [
        {
          key: '0-5-0',
          title: 'سياسة الخصوصية',
          url: '/privacy-policy',
          description: 'سياسة حماية البيانات والخصوصية'
        },
        {
          key: '0-5-1',
          title: 'شروط الاستخدام',
          url: '/terms-of-service',
          description: 'شروط وأحكام استخدام الخدمات'
        },
        {
          key: '0-5-2',
          title: 'الشروط والأحكام',
          url: '/terms-and-conditions',
          description: 'الشروط والأحكام العامة'
        },
        {
          key: '0-5-3',
          title: 'سياسة الإرجاع',
          url: '/return-policy',
          description: 'سياسة الإرجاع والاسترداد'
        },
        {
          key: '0-5-4',
          title: 'سياسة الضمان',
          url: '/warranty-policy',
          description: 'سياسة الضمان على الخدمات'
        }
      ]
    },
    {
      key: '0-6',
      title: 'الإعدادات',
      icon: <SettingOutlined />,
      url: '/settings',
      description: 'إعدادات الحساب والموقع',
      children: [
        {
          key: '0-6-0',
          title: 'الملف الشخصي',
          url: '/profile',
          description: 'تعديل المعلومات الشخصية'
        },
        {
          key: '0-6-1',
          title: 'كلمة المرور',
          url: '/password',
          description: 'تغيير كلمة المرور'
        },
        {
          key: '0-6-2',
          title: 'إعدادات الإشعارات',
          url: '/notifications',
          description: 'إدارة الإشعارات والتنبيهات'
        },
        {
          key: '0-6-3',
          title: 'الخصوصية',
          url: '/privacy-settings',
          description: 'إعدادات الخصوصية'
        },
        {
          key: '0-6-4',
          title: 'اللغة',
          url: '/language',
          description: 'تغيير لغة الموقع'
        }
      ]
    },
    {
      key: '0-7',
      title: 'معلومات إضافية',
      icon: <InfoCircleOutlined />,
      url: '/additional-info',
      description: 'معلومات إضافية مفيدة',
      children: [
        {
          key: '0-7-0',
          title: 'الأسعار',
          url: '/prices',
          description: 'أسعار جميع الخدمات'
        },
        {
          key: '0-7-1',
          title: 'المواقع',
          url: '/locations',
          description: 'مواقع الفروع'
        },
        {
          key: '0-7-2',
          title: 'المواعيد',
          url: '/working-hours',
          description: 'ساعات العمل'
        },
        {
          key: '0-7-3',
          title: 'البرامج',
          url: '/programs',
          description: 'برامج الولاء والعروض'
        },
        {
          key: '0-7-4',
          title: 'الشهادات',
          url: '/certificates',
          description: 'الشهادات والاعتمادات'
        }
      ]
    }
  ];

  const quickLinks = [
    {
      title: 'حجز سريع',
      url: '/quick-booking',
      icon: <ShoppingCartOutlined />,
      color: 'green'
    },
    {
      title: 'تتبع الطلب',
      url: '/track-order',
      icon: <SearchOutlined />,
      color: 'blue'
    },
    {
      title: 'الأسئلة الشائعة',
      url: '/faq',
      icon: <QuestionCircleOutlined />,
      color: 'orange'
    },
    {
      title: 'تواصل معنا',
      url: '/contact',
      icon: <PhoneOutlined />,
      color: 'purple'
    },
    {
      title: 'سياسة الخصوصية',
      url: '/privacy-policy',
                icon: <SafetyCertificateOutlined />,
      color: 'red'
    },
    {
      title: 'شروط الاستخدام',
      url: '/terms-of-service',
      icon: <FileTextOutlined />,
      color: 'cyan'
    }
  ];

  const contactInfo = [
    {
      type: 'الهاتف',
      value: '+966-50-123-4567',
      icon: <PhoneOutlined />,
      url: 'tel:+966501234567'
    },
    {
      type: 'البريد الإلكتروني',
      value: 'info@paypass.com',
      icon: <MailOutlined />,
      url: 'mailto:info@paypass.com'
    },
    {
      type: 'الموقع الإلكتروني',
      value: 'www.paypass.com',
      icon: <GlobalOutlined />,
      url: 'https://www.paypass.com'
    }
  ];

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <Tree.TreeNode
            key={item.key}
            title={
              <Space>
                {item.icon}
                <span>{item.title}</span>
                <Tag color="blue">{item.url}</Tag>
              </Space>
            }
            dataRef={item}
          >
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return (
        <Tree.TreeNode
          key={item.key}
          title={
            <Space>
              <span>{item.title}</span>
              <Tag color="green">{item.url}</Tag>
            </Space>
          }
          dataRef={item}
        />
      );
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2} className="page-title">
          <AppstoreOutlined /> خريطة الموقع
        </Title>
        <Text type="secondary">
          آخر تحديث: {sitemapData.lastUpdated} | إجمالي الصفحات: {sitemapData.totalPages}
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="main-content-card">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* البحث */}
              <div>
                <Title level={3}>البحث في خريطة الموقع</Title>
                <Search
                  placeholder="ابحث عن صفحة..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="large"
                  onSearch={onSearch}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              <Divider />

              {/* هيكل الموقع */}
              <div>
                <Title level={3}>هيكل الموقع</Title>
                <Tree
                  showLine
                  showIcon
                  defaultExpandAll
                  expandedKeys={expandedKeys}
                  onExpand={onExpand}
                  treeData={siteStructure}
                  className="sitemap-tree"
                />
              </div>

              <Divider />

              {/* الروابط السريعة */}
              <div>
                <Title level={3}>الروابط السريعة</Title>
                <Row gutter={[16, 16]}>
                  {quickLinks.map((link, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                      <Card 
                        size="small" 
                        className="quick-link-card"
                        hoverable
                      >
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                          <div className="quick-link-icon" style={{ color: link.color }}>
                            {link.icon}
                          </div>
                          <Title level={5}>{link.title}</Title>
                          <Button type="link" href={link.url}>
                            {link.url}
                          </Button>
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
                <Row gutter={[16, 16]}>
                  {contactInfo.map((contact, index) => (
                    <Col xs={24} sm={8} key={index}>
                      <Card size="small" className="contact-card">
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                          <div className="contact-icon">{contact.icon}</div>
                          <Text strong>{contact.type}</Text>
                          <Text copyable>
                            <a href={contact.url}>{contact.value}</a>
                          </Text>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
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
                  <Text strong>إجمالي الصفحات:</Text>
                  <br />
                  <Text>{sitemapData.totalPages}</Text>
                </div>
                <div>
                  <Text strong>الفئات الرئيسية:</Text>
                  <br />
                  <Text>{sitemapData.mainCategories}</Text>
                </div>
                <div>
                  <Text strong>الفئات الفرعية:</Text>
                  <br />
                  <Text>{sitemapData.subCategories}</Text>
                </div>
                <div>
                  <Text strong>آخر تحديث:</Text>
                  <br />
                  <Text>{sitemapData.lastUpdated}</Text>
                </div>
              </Space>
            </Card>

            {/* التنقل السريع */}
            <Card title="التنقل السريع" className="navigation-card">
              <Anchor>
                <Link href="#home" title="الصفحة الرئيسية" />
                <Link href="#customer-services" title="خدمات العملاء" />
                <Link href="#car-services" title="خدمات السيارات" />
                <Link href="#payments" title="المدفوعات" />
                <Link href="#support" title="الدعم والمساعدة" />
                <Link href="#legal" title="المعلومات القانونية" />
                <Link href="#settings" title="الإعدادات" />
                <Link href="#additional-info" title="معلومات إضافية" />
              </Anchor>
            </Card>

            {/* الإجراءات السريعة */}
            <Card title="إجراءات سريعة" className="actions-card">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" block icon={<AppstoreOutlined />}>
                  تحميل خريطة الموقع
                </Button>
                <Button block icon={<SearchOutlined />}>
                  البحث المتقدم
                </Button>
                <Button block icon={<QuestionCircleOutlined />}>
                  مساعدة في التنقل
                </Button>
                <Button block icon={<InfoCircleOutlined />}>
                  معلومات إضافية
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Sitemap; 