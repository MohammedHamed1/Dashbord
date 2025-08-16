import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Space,
  Alert,
  Badge,
  Typography,
  Collapse,
  List,
  Tag,
  Progress,
  Tooltip,
  Modal,
  Statistic,
  Row,
  Col,
  Divider,
  Descriptions
} from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  BugOutlined,
  EyeOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  DatabaseOutlined,
  ApiOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  FileTextOutlined,
  SettingOutlined,
  CarOutlined,
  QrcodeOutlined,
  HeartOutlined,
  TrophyOutlined,
  StarOutlined,
  BellOutlined,
  CustomerServiceOutlined,
  ToolOutlined,
  SearchOutlined,
  LockOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  RobotOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './CrossCheckWidget.css';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const CrossCheckWidget = ({ 
  sectionName, 
  sectionData, 
  onRefresh, 
  showDetails = false,
  compact = false 
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastCheck, setLastCheck] = useState(null);

  const performCheck = async () => {
    setLoading(true);
    try {
      // محاكاة فحص القسم
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastCheck(new Date());
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Cross check error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sectionData) {
      setLastCheck(new Date());
    }
  }, [sectionData]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <SyncOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return '#52c41a';
      case 'warning':
        return '#faad14';
      case 'error':
        return '#ff4d4f';
      default:
        return '#1890ff';
    }
  };

  const getSectionIcon = (sectionName) => {
    const iconMap = {
      'dashboard': <DatabaseOutlined />,
      'orders': <ShoppingCartOutlined />,
      'operations': <SyncOutlined />,
      'live-tracking': <EyeOutlined />,
      'live_tracking': <EyeOutlined />,
      'customers': <UserOutlined />,
      'employees': <TeamOutlined />,
      'branches': <SettingOutlined />,
      'packages': <FileTextOutlined />,
      'cars': <CarOutlined />,
      'car-photos': <FileTextOutlined />,
      'car_photos': <FileTextOutlined />,
      'price-calculator': <DollarOutlined />,
      'price_calculator': <DollarOutlined />,
      'qr-codes': <QrcodeOutlined />,
      'qr_codes': <QrcodeOutlined />,
      'financial': <DollarOutlined />,
      'loyalty': <HeartOutlined />,
      'referrals': <TrophyOutlined />,
      'ratings': <StarOutlined />,
      'notifications': <BellOutlined />,
      'support': <CustomerServiceOutlined />,
      'inventory': <DatabaseOutlined />,
      'maintenance': <ToolOutlined />,
      'attendance': <ClockCircleOutlined />,
      'smart-search': <SearchOutlined />,
      'smart_search': <SearchOutlined />,
      'integrations': <ApiOutlined />,
      'permissions': <LockOutlined />,
      'export': <DownloadOutlined />,
      'reports': <BarChartOutlined />,
      'settings': <SettingOutlined />,
      'app-management': <AppstoreOutlined />,
      'app_management': <AppstoreOutlined />,
      'smart-assistant': <RobotOutlined />,
      'smart_assistant': <RobotOutlined />
    };
    return iconMap[sectionName] || <BugOutlined />;
  };

  if (!sectionData) {
    return null;
  }

  const { status, issues, warnings, successRate, details, alerts } = sectionData;
  const totalIssues = (issues || 0) + (warnings || 0);

  if (compact) {
    return (
      <Card size="small" className={`cross-check-compact ${status}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {getStatusIcon(status)}
            <Text strong>{t(`sections.${sectionName}`) || sectionName}</Text>
          </div>
          <Space>
            {totalIssues > 0 && (
              <Badge 
                count={totalIssues} 
                style={{ backgroundColor: getStatusColor(status) }}
              />
            )}
            <Button
              size="small"
              icon={<SyncOutlined spin={loading} />}
              onClick={performCheck}
              loading={loading}
            />
          </Space>
        </div>
        
        {totalIssues > 0 && (
          <Alert
            message={`${totalIssues} مشكلة مكتشفة`}
            type={status === 'error' ? 'error' : 'warning'}
            showIcon
            style={{ marginTop: 8 }}
          />
        )}
      </Card>
    );
  }

  return (
    <>
      <Card 
        className={`cross-check-widget ${status}`}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {getSectionIcon(sectionName)}
            <span>فحص {t(`sections.${sectionName}`) || sectionName}</span>
          </div>
        }
        extra={
          <Space>
            {lastCheck && (
              <Text type="secondary" style={{ fontSize: '12px' }}>
                آخر فحص: {lastCheck.toLocaleTimeString('ar-SA')}
              </Text>
            )}
            <Button
              type="primary"
              icon={<SyncOutlined spin={loading} />}
              onClick={performCheck}
              loading={loading}
              size="small"
            >
              فحص الآن
            </Button>
          </Space>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="الحالة"
                value={status === 'success' ? 'ممتازة' : status === 'warning' ? 'تحتاج مراجعة' : 'مشاكل'}
                prefix={getStatusIcon(status)}
                valueStyle={{ 
                  color: getStatusColor(status),
                  fontSize: '14px'
                }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="معدل النجاح"
                value={successRate || 0}
                suffix="%"
                prefix={<BugOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="المشاكل"
                value={totalIssues}
                valueStyle={{ color: totalIssues > 0 ? '#ff4d4f' : '#52c41a' }}
              />
            </Col>
          </Row>
        </div>

        {successRate !== undefined && (
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary">معدل النجاح</Text>
            <Progress 
              percent={successRate} 
              status={successRate >= 90 ? 'success' : successRate >= 70 ? 'normal' : 'exception'}
              strokeColor={successRate >= 90 ? '#52c41a' : successRate >= 70 ? '#faad14' : '#ff4d4f'}
            />
          </div>
        )}

        {alerts && alerts.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {alerts.map((alert, index) => (
              <Alert
                key={index}
                message={alert.message}
                description={alert.action}
                type={alert.type}
                showIcon
                style={{ marginBottom: 8 }}
              />
            ))}
          </div>
        )}

        {showDetails && details && Object.keys(details).length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Title level={5}>التفاصيل</Title>
            <Row gutter={[16, 8]}>
              {Object.entries(details).map(([key, value]) => (
                <Col span={12} key={key}>
                  <Text type="secondary">{key}: </Text>
                  <Text strong>{value}</Text>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {showDetails && (
          <div style={{ textAlign: 'center' }}>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => setShowModal(true)}
            >
              عرض التفاصيل الكاملة
            </Button>
          </div>
        )}
      </Card>

      <Modal
        title={`تفاصيل فحص ${t(`sections.${sectionName}`) || sectionName}`}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={800}
      >
        <div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card size="small">
                <Statistic
                  title="الحالة العامة"
                  value={status === 'success' ? 'ممتازة' : status === 'warning' ? 'تحتاج مراجعة' : 'مشاكل'}
                  prefix={getStatusIcon(status)}
                  valueStyle={{ color: getStatusColor(status) }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small">
                <Statistic
                  title="معدل النجاح"
                  value={successRate || 0}
                  suffix="%"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
          </Row>

          {details && Object.keys(details).length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Title level={5}>إحصائيات مفصلة</Title>
              <Descriptions bordered size="small" column={2}>
                {Object.entries(details).map(([key, value]) => (
                  <Descriptions.Item key={key} label={key}>
                    {value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          )}

          {alerts && alerts.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Title level={5}>التنبيهات والإجراءات المطلوبة</Title>
              <List
                dataSource={alerts}
                renderItem={(alert, index) => (
                  <List.Item>
                    <Alert
                      message={alert.message}
                      description={alert.action}
                      type={alert.type}
                      showIcon
                      style={{ width: '100%' }}
                    />
                  </List.Item>
                )}
              />
            </div>
          )}

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Text type="secondary">
              آخر فحص: {lastCheck ? lastCheck.toLocaleString('ar-SA') : 'غير محدد'}
            </Text>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CrossCheckWidget; 