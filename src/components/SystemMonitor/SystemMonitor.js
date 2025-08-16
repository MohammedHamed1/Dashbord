import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Progress,
  Alert,
  Badge,
  Space,
  Typography,
  Tabs,
  List,
  Tag,
  Statistic,
  Divider,
  Spin,
  message,
  Tooltip,
  Modal
} from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  BugOutlined,
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  CarOutlined,
  QrcodeOutlined,
  DollarOutlined,
  BellOutlined,
  SettingOutlined,
  FileTextOutlined,
  DashboardOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  MessageOutlined,
  DatabaseOutlined,
  ApiOutlined,
  SearchOutlined,
  ExportOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  RobotOutlined,
  ReloadOutlined,
  EyeOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './SystemMonitor.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const SystemMonitor = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const [lastCheck, setLastCheck] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // محاكاة فحص النظام
  const performSystemCheck = async () => {
    setLoading(true);
    message.info('جاري فحص النظام...');

    try {
      // محاكاة فحص شامل
      await new Promise(resolve => setTimeout(resolve, 3000));

      const mockSystemStatus = {
        overview: {
          totalIssues: 8,
          criticalIssues: 2,
          warnings: 4,
          success: 85,
          lastUpdate: new Date().toISOString()
        },
        sections: {
          dashboard: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              cardsWorking: true,
              numbersValid: true,
              chartsLoading: true
            }
          },
          orders: {
            status: 'warning',
            issues: ['2 طلبات بدون حالة'],
            warnings: ['5 طلبات معلقة منذ أكثر من 3 أيام'],
            data: {
              totalOrders: 150,
              pendingOrders: 5,
              completedOrders: 140,
              cancelledOrders: 5
            }
          },
          operations: {
            status: 'success',
            issues: [],
            warnings: ['3 عمليات قيد التنفيذ'],
            data: {
              activeOperations: 12,
              completedToday: 45,
              pendingOperations: 3
            }
          },
          liveTracking: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              activeBranches: 4,
              onlineEmployees: 15,
              trackingEnabled: true
            }
          },
          customers: {
            status: 'warning',
            issues: ['5 عملاء بدون بيانات أساسية'],
            warnings: [],
            data: {
              totalCustomers: 1200,
              activeCustomers: 1150,
              inactiveCustomers: 50
            }
          },
          employees: {
            status: 'error',
            issues: ['3 موظفين لم يسجلوا الحضور اليوم'],
            warnings: ['2 موظفين متأخرين'],
            data: {
              totalEmployees: 25,
              presentToday: 22,
              absentToday: 3
            }
          },
          branches: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              totalBranches: 8,
              activeBranches: 8,
              totalRevenue: 150000
            }
          },
          packages: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              totalPackages: 12,
              activePackages: 12,
              totalSales: 85000
            }
          },
          cars: {
            status: 'warning',
            issues: ['10 سيارات بدون QR Code'],
            warnings: [],
            data: {
              totalCars: 500,
              withQRCode: 490,
              withoutQRCode: 10
            }
          },
          carPhotos: {
            status: 'success',
            issues: [],
            warnings: ['5 صور بحجم كبير'],
            data: {
              totalPhotos: 1200,
              optimizedPhotos: 1195,
              largePhotos: 5
            }
          },
          priceCalculator: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              formulasWorking: true,
              pricesUpdated: true
            }
          },
          qrCodes: {
            status: 'warning',
            issues: ['15 QR Code منتهي الصلاحية'],
            warnings: ['5 QR Codes قريب من الانتهاء'],
            data: {
              totalQRCodes: 1000,
              activeQRCodes: 980,
              expiredQRCodes: 15,
              expiringSoon: 5
            }
          },
          financial: {
            status: 'error',
            issues: ['8 فواتير غير مدفوعة منذ أكثر من 30 يوم'],
            warnings: ['12 فاتورة متأخرة'],
            data: {
              totalRevenue: 250000,
              unpaidInvoices: 8,
              overdueInvoices: 12,
              monthlyRevenue: 45000
            }
          },
          loyalty: {
            status: 'success',
            issues: [],
            warnings: ['50 نقطة لم تُحتسب'],
            data: {
              totalPoints: 15000,
              activeMembers: 800,
              pointsCalculated: 14950
            }
          },
          referrals: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              totalReferrals: 150,
              successfulReferrals: 120,
              pendingReferrals: 30
            }
          },
          ratings: {
            status: 'warning',
            issues: ['25 تقييم بدون رد'],
            warnings: [],
            data: {
              totalRatings: 500,
              respondedRatings: 475,
              averageRating: 4.6
            }
          },
          notifications: {
            status: 'success',
            issues: [],
            warnings: ['10 إشعارات لم تُفتح'],
            data: {
              totalNotifications: 200,
              readNotifications: 190,
              unreadNotifications: 10
            }
          },
          support: {
            status: 'warning',
            issues: ['5 تذاكر لم تُغلق'],
            warnings: ['3 تذاكر عالية الأولوية'],
            data: {
              totalTickets: 50,
              openTickets: 5,
              closedTickets: 45,
              highPriorityTickets: 3
            }
          },
          inventory: {
            status: 'error',
            issues: ['نقص في المخزون: 3 منتجات'],
            warnings: ['5 منتجات قريب من النفاد'],
            data: {
              totalProducts: 100,
              lowStockProducts: 3,
              outOfStockProducts: 0,
              nearEmptyProducts: 5
            }
          },
          maintenance: {
            status: 'success',
            issues: [],
            warnings: ['2 أعطال تحتاج صيانة'],
            data: {
              totalEquipment: 20,
              workingEquipment: 18,
              maintenanceNeeded: 2
            }
          },
          attendance: {
            status: 'success',
            issues: [],
            warnings: ['2 موظفين متأخرين'],
            data: {
              totalEmployees: 25,
              presentToday: 23,
              lateToday: 2,
              absentToday: 0
            }
          },
          smartSearch: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              searchWorking: true,
              apiConnected: true,
              resultsAccurate: true
            }
          },
          integrations: {
            status: 'warning',
            issues: ['2 API غير متصل'],
            warnings: ['1 تكامل يحتاج تحديث'],
            data: {
              totalIntegrations: 8,
              connectedAPIs: 6,
              disconnectedAPIs: 2
            }
          },
          permissions: {
            status: 'success',
            issues: [],
            warnings: ['5 مستخدمين بدون صلاحيات كاملة'],
            data: {
              totalUsers: 50,
              adminUsers: 3,
              managerUsers: 8,
              staffUsers: 25,
              customerUsers: 14
            }
          },
          export: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              exportWorking: true,
              lastExport: '2024-03-03T10:00:00Z',
              exportFormat: 'Excel, PDF'
            }
          },
          reports: {
            status: 'warning',
            issues: ['3 تقارير تحتاج تحديث'],
            warnings: [],
            data: {
              totalReports: 15,
              updatedReports: 12,
              outdatedReports: 3
            }
          },
          settings: {
            status: 'success',
            issues: [],
            warnings: [],
            data: {
              basicSettings: true,
              workingHours: true,
              taxesConfigured: true,
              notificationsEnabled: true
            }
          },
          appManagement: {
            status: 'warning',
            issues: ['1 تطبيق يحتاج تحديث'],
            warnings: ['2 إضافات غير مفعلة'],
            data: {
              totalApps: 5,
              updatedApps: 4,
              outdatedApps: 1,
              activeAddons: 8,
              inactiveAddons: 2
            }
          },
          smartAssistant: {
            status: 'success',
            issues: [],
            warnings: ['سجل الردود غير مفعل'],
            data: {
              assistantWorking: true,
              suggestionsEnabled: true,
              responseLogging: false
            }
          }
        },
        userTypes: {
          admin: {
            status: 'success',
            issues: [],
            warnings: ['1 صلاحية تحتاج مراجعة'],
            data: {
              totalAdmins: 3,
              activeAdmins: 3,
              permissionsWorking: true,
              reportsAccessible: true
            }
          },
          branchManager: {
            status: 'warning',
            issues: ['2 مديرين بدون موظفين'],
            warnings: ['1 فرع بدون مدير'],
            data: {
              totalManagers: 8,
              activeManagers: 7,
              branchesWithManagers: 7,
              branchesWithoutManagers: 1
            }
          },
          employee: {
            status: 'error',
            issues: ['5 موظفين لم يسجلوا الحضور'],
            warnings: ['3 موظفين بدون صلاحيات كاملة'],
            data: {
              totalEmployees: 25,
              presentToday: 20,
              absentToday: 5,
              withFullPermissions: 22
            }
          },
          customer: {
            status: 'warning',
            issues: ['10 عملاء بدون QR Code'],
            warnings: ['15 عميل بدون باقة نشطة'],
            data: {
              totalCustomers: 1200,
              withQRCode: 1190,
              withoutQRCode: 10,
              withActivePackage: 1185
            }
          }
        }
      };

      setSystemStatus(mockSystemStatus);
      setLastCheck(new Date());
      message.success('تم فحص النظام بنجاح!');
    } catch (error) {
      message.error('حدث خطأ أثناء فحص النظام');
      console.error('System check error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSystemCheck();
  }, []);

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

  const renderSectionCard = (sectionName, sectionData) => {
    const { status, issues, warnings, data } = sectionData;
    
    return (
      <Card
        key={sectionName}
        size="small"
        className={`section-card ${status}`}
        style={{ marginBottom: 16 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {getStatusIcon(status)}
            <Text strong>{t(`sections.${sectionName}`)}</Text>
          </div>
          <Badge 
            count={issues.length + warnings.length} 
            style={{ backgroundColor: getStatusColor(status) }}
          />
        </div>
        
        {issues.length > 0 && (
          <Alert
            message="مشاكل"
            description={
              <ul style={{ margin: 0, paddingRight: 16 }}>
                {issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            }
            type="error"
            showIcon
            style={{ marginTop: 8 }}
          />
        )}
        
        {warnings.length > 0 && (
          <Alert
            message="تحذيرات"
            description={
              <ul style={{ margin: 0, paddingRight: 16 }}>
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            }
            type="warning"
            showIcon
            style={{ marginTop: 8 }}
          />
        )}
      </Card>
    );
  };

  const renderUserTypeCard = (userType, userData) => {
    const { status, issues, warnings, data } = userData;
    
    return (
      <Card
        key={userType}
        size="small"
        className={`user-card ${status}`}
        style={{ marginBottom: 16 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {getStatusIcon(status)}
            <Text strong>{t(`userTypes.${userType}`)}</Text>
          </div>
          <Badge 
            count={issues.length + warnings.length} 
            style={{ backgroundColor: getStatusColor(status) }}
          />
        </div>
        
        {issues.length > 0 && (
          <Alert
            message="مشاكل"
            description={
              <ul style={{ margin: 0, paddingRight: 16 }}>
                {issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            }
            type="error"
            showIcon
            style={{ marginTop: 8 }}
          />
        )}
        
        {warnings.length > 0 && (
          <Alert
            message="تحذيرات"
            description={
              <ul style={{ margin: 0, paddingRight: 16 }}>
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            }
            type="warning"
            showIcon
            style={{ marginTop: 8 }}
          />
        )}
      </Card>
    );
  };

  const generateReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      systemStatus,
      summary: {
        totalIssues: systemStatus.overview?.totalIssues || 0,
        criticalIssues: systemStatus.overview?.criticalIssues || 0,
        warnings: systemStatus.overview?.warnings || 0,
        successRate: systemStatus.overview?.success || 0
      }
    };

    // محاكاة تحميل التقرير
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    message.success('تم تحميل التقرير بنجاح!');
  };

  return (
    <div className="system-monitor">
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <BugOutlined style={{ marginLeft: 8 }} />
              مراقبة النظام
            </Title>
            <Text type="secondary">
              آخر فحص: {lastCheck ? new Date(lastCheck).toLocaleString('ar-SA') : 'لم يتم الفحص بعد'}
            </Text>
          </div>
          
          <Space>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={performSystemCheck}
            >
              فحص النظام الآن
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={generateReport}
            >
              تحميل التقرير
            </Button>
            <Button
              icon={<EyeOutlined />}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
            </Button>
          </Space>
        </div>

        {systemStatus.overview && (
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Statistic
                title="إجمالي المشاكل"
                value={systemStatus.overview.totalIssues}
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="مشاكل حرجة"
                value={systemStatus.overview.criticalIssues}
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<CloseCircleOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="تحذيرات"
                value={systemStatus.overview.warnings}
                valueStyle={{ color: '#faad14' }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="معدل النجاح"
                value={systemStatus.overview.success}
                suffix="%"
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircleOutlined />}
              />
            </Col>
          </Row>
        )}

        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="نظرة عامة" key="overview">
            {systemStatus.overview && (
              <div>
                <Progress
                  percent={systemStatus.overview.success}
                  status={systemStatus.overview.success >= 90 ? 'success' : systemStatus.overview.success >= 70 ? 'normal' : 'exception'}
                  style={{ marginBottom: 24 }}
                />
                
                {systemStatus.overview.totalIssues > 0 && (
                  <Alert
                    message={`تم اكتشاف ${systemStatus.overview.totalIssues} مشكلة في النظام`}
                    description="يرجى مراجعة الأقسام التالية لحل المشاكل المكتشفة"
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                )}
              </div>
            )}
          </TabPane>

          <TabPane tab="الأقسام" key="sections">
            <Row gutter={[16, 16]}>
              {systemStatus.sections && Object.entries(systemStatus.sections).map(([sectionName, sectionData]) => (
                <Col xs={24} sm={12} md={8} lg={6} key={sectionName}>
                  {renderSectionCard(sectionName, sectionData)}
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane tab="أنواع المستخدمين" key="userTypes">
            <Row gutter={[16, 16]}>
              {systemStatus.userTypes && Object.entries(systemStatus.userTypes).map(([userType, userData]) => (
                <Col xs={24} sm={12} key={userType}>
                  {renderUserTypeCard(userType, userData)}
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane tab="التفاصيل التقنية" key="technical">
            <Card title="معلومات النظام" size="small">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>إصدار النظام:</Text> v1.3.4
                </Col>
                <Col span={12}>
                  <Text strong>آخر تحديث:</Text> {new Date().toLocaleDateString('ar-SA')}
                </Col>
                <Col span={12}>
                  <Text strong>حالة قاعدة البيانات:</Text> 
                  <Tag color="green">متصل</Tag>
                </Col>
                <Col span={12}>
                  <Text strong>حالة API:</Text> 
                  <Tag color="green">يعمل</Tag>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title="تفاصيل فحص النظام"
        visible={showDetails}
        onCancel={() => setShowDetails(false)}
        width={800}
        footer={null}
      >
        <pre style={{ maxHeight: 400, overflow: 'auto' }}>
          {JSON.stringify(systemStatus, null, 2)}
        </pre>
      </Modal>
    </div>
  );
};

export default SystemMonitor; 