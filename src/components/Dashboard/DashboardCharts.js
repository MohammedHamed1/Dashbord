import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useSafeNavigate } from '../../utils/withRouter';
import { useSafeTranslation } from '../../utils/useSafeTranslation';
import OrderStatusPie from '../OrderStatusPie';
import RevenueLineChart from '../RevenueLineChart';

const DashboardCharts = ({ orderStatusData = [], revenueData = [] }) => {
  const navigate = useSafeNavigate();
  const { t } = useSafeTranslation();

  return (
    <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
      <Col xs={24} lg={12}>
        <Card 
          title={t('order_status')} 
          className="dashboard-card"
          extra={
            <Button type="link" onClick={() => navigate('/orders')}>
              {t('view_all')}
            </Button>
          }
        >
          <OrderStatusPie data={orderStatusData} />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card 
          title={t('monthly_revenue')} 
          className="dashboard-card"
          extra={
            <Button type="link" onClick={() => navigate('/payments')}>
              {t('view_all')}
            </Button>
          }
        >
          <RevenueLineChart data={revenueData} />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardCharts; 