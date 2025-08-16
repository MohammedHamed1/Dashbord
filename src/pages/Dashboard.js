import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Progress, Spin, Alert, Button } from 'antd';
import { useSafeNavigate } from '../utils/withRouter';
import { useSafeTranslation } from '../utils/useSafeTranslation';
import { useRole } from '../context/RoleContext';
import { usePermissions } from '../context/PermissionContext';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardCharts from '../components/Dashboard/DashboardCharts';
import DashboardTracking from '../components/Dashboard/DashboardTracking';
import DashboardStats from '../components/Dashboard/DashboardStats';
import StatCards from '../components/StatCards';
import LatestActivity from '../components/LatestActivity';
import CrossCheckProvider from '../components/CrossCheck/CrossCheckProvider';
import { getDashboardData } from '../data/mockData';

const Dashboard = () => {
  const navigate = useSafeNavigate();
  const { t } = useSafeTranslation();
  const { filterDataByScope } = usePermissions();
  const { currentRole } = useRole();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 0,
      totalOrders: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      totalPayments: 0,
      averageRating: 0
    },
    orderStatusData: [],
    revenueData: [],
    latestActivities: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, [currentRole]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // جلب البيانات من mockData.js باستخدام الدالة الجديدة
      const data = await getDashboardData(currentRole);

      setDashboardData(data);
    } catch (err) {
      setError(t('error'));
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          {t('loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message={t('error')}
        description={error}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={fetchDashboardData}>
            {t('retry')}
          </Button>
        }
      />
    );
  }

  return (
    <div className="dashboard-page">
      {/* رأس الصفحة */}
      <DashboardHeader />

      {/* البطاقات الإحصائية */}
      <StatCards data={dashboardData.stats} />

      {/* الرسوم البيانية */}
      <DashboardCharts 
        orderStatusData={dashboardData.orderStatusData}
        revenueData={dashboardData.revenueData}
      />

      {/* التتبع المباشر */}
      <DashboardTracking />

      {/* ميزة فحص النظام - قسم العمليات */}
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginLeft: 8 }}>🔍</span>
                <span>فحص النظام الشامل</span>
              </div>
            }
            className="dashboard-card"
            extra={
              <Button 
                type="primary" 
                size="small"
                onClick={() => navigate('/system-monitor')}
              >
                عرض التفاصيل
              </Button>
            }
          >
            <CrossCheckProvider 
              sectionName="dashboard" 
              position="inline"
              compact={true}
            />
          </Card>
        </Col>
      </Row>

      {/* النشاط الحديث */}
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card 
            title={t('recent_activities')} 
            className="dashboard-card"
            extra={
              <Button type="link">
                {t('view_all')}
              </Button>
            }
          >
            <LatestActivity activities={dashboardData.latestActivities} />
          </Card>
        </Col>
      </Row>

      {/* إحصائيات سريعة */}
      <DashboardStats stats={dashboardData.stats} />
    </div>
  );
};

export default Dashboard; 