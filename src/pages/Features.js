import React from 'react';
import { Layout, Card, Row, Col, Typography, Tag } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  CarOutlined,
  DollarOutlined,
  BellOutlined,
  BarChartOutlined,
  StarOutlined,
  RocketOutlined,
  SettingOutlined,
  AppstoreOutlined,
  WhatsAppOutlined,
  AuditOutlined,
  QrcodeOutlined,
  TeamOutlined,
  BranchesOutlined,
  MessageOutlined,
  AlertOutlined,
  ExportOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;
const { Content } = Layout;

const features = [
  {
    icon: <DashboardOutlined style={{ fontSize: 36, color: '#4e54c8' }} />, title: 'لوحة تحكم شاملة',
    desc: 'نظرة عامة على الأداء، الطلبات، الإيرادات، المستخدمين، الفروع، مع رسوم بيانية تفاعلية.'
  },
  {
    icon: <UserOutlined style={{ fontSize: 36, color: '#1890ff' }} />, title: 'إدارة المستخدمين والأدوار',
    desc: 'نظام صلاحيات متقدم مع تخصيص granular لكل موظف ودعم 4 أدوار رئيسية.'
  },
  {
    icon: <ShoppingCartOutlined style={{ fontSize: 36, color: '#52c41a' }} />, title: 'إدارة الطلبات',
    desc: 'تتبع الطلبات، تحديث الحالة، إدارة المدفوعات، ربط الطلبات بالباقات والعملاء.'
  },
  {
    icon: <GiftOutlined style={{ fontSize: 36, color: '#faad14' }} />, title: 'الباقات وبرامج الولاء',
    desc: 'دعم الباقات، برامج الولاء، النقاط، المكافآت، والدعوات.'
  },
  {
    icon: <CarOutlined style={{ fontSize: 36, color: '#722ed1' }} />, title: 'إدارة السيارات والفئات',
    desc: 'إضافة وتعديل سيارات العملاء، ربط الطلبات بحجم السيارة.'
  },
  {
    icon: <DollarOutlined style={{ fontSize: 36, color: '#3f8600' }} />, title: 'النظام المالي والمدفوعات',
    desc: 'تقارير مالية، دعم جميع طرق الدفع (Apple Pay, Mada, STC Pay, HyperPay)، إدارة الاستردادات.'
  },
  {
    icon: <BellOutlined style={{ fontSize: 36, color: '#ff4d4f' }} />, title: 'نظام الإشعارات الذكي',
    desc: 'إشعارات فورية عبر البريد، SMS، Push، WhatsApp، مع سجل إشعارات متكامل.'
  },
  {
    icon: <BarChartOutlined style={{ fontSize: 36, color: '#13c2c2' }} />, title: 'التقارير والتصدير',
    desc: 'تصدير البيانات والتقارير بصيغ Excel, PDF, CSV، مع سجل تصدير.'
  },
  {
    icon: <QrcodeOutlined style={{ fontSize: 36, color: '#2b3a67' }} />, title: 'نظام QR/Barcode',
    desc: 'توليد ومسح أكواد QR للطلبات، تتبع الطلبات عبر QR.'
  },
  {
    icon: <StarOutlined style={{ fontSize: 36, color: '#faad14' }} />, title: 'نظام التقييمات',
    desc: 'تقييم الخدمة، الرد على التقييمات، تقارير جودة الخدمة.'
  },
  {
    icon: <BranchesOutlined style={{ fontSize: 36, color: '#fa541c' }} />, title: 'إدارة الفروع',
    desc: 'إضافة وتعديل الفروع، تتبع الأداء، إدارة الموظفين في كل فرع.'
  },
  {
    icon: <AlertOutlined style={{ fontSize: 36, color: '#ff4d4f' }} />, title: 'التنبيهات الذكية',
    desc: 'تنبيهات تلقائية عند انخفاض الأداء أو الإيرادات أو زيادة الطلبات المعلقة.'
  },
  {
    icon: <MessageOutlined style={{ fontSize: 36, color: '#722ed1' }} />, title: 'الدعم الفني',
    desc: 'نظام تذاكر دعم فني، الرد على استفسارات العملاء، سجل تواصل.'
  },
  {
    icon: <BulbOutlined style={{ fontSize: 36, color: '#4e54c8' }} />, title: 'دعم الذكاء الاصطناعي',
    desc: 'مساعد ذكي للإجابة على الأسئلة وتحليل البيانات واقتراح الحلول.'
  },
  {
    icon: <SettingOutlined style={{ fontSize: 36, color: '#595959' }} />, title: 'إعدادات متقدمة',
    desc: 'إعدادات النظام، إدارة مزودي SMS، إعدادات الدفع، إعدادات عامة.'
  }
];

const Features = () => {
  const { lang } = useLanguage();
  const { t } = useTranslation();
  return (
    <Layout style={{ padding: 24 }}>
      <Content>
        <Title level={2} style={{ marginBottom: 24 }}>{lang === 'ar' ? 'مميزات النظام' : 'System Features'}</Title>
        <Row gutter={[24, 24]}>
          {features.map((feature, idx) => (
            <Col xs={24} sm={12} md={8} lg={8} key={idx}>
              <Card hoverable style={{ minHeight: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {feature.icon}
                  <div>
                    <Text strong style={{ fontSize: 18 }}>{feature.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 14 }}>{feature.desc}</Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default Features; 