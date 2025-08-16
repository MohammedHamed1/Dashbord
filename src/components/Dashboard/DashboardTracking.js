import React from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import { 
  ThunderboltOutlined,
  UserOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import InteractiveMap from '../InteractiveMap';
import LiveOperationsTracking from '../LiveOperationsTracking';
import EmployeeLiveTracking from '../EmployeeLiveTracking';

const DashboardTracking = () => {
  const { t } = useTranslation();

  return (
    <Row style={{ marginTop: '24px' }}>
      <Col span={24}>
        <Card className="dashboard-card">
          <Tabs
            defaultActiveKey="live-tracking"
            items={[
              {
                key: 'live-tracking',
                label: (
                  <span>
                    <ThunderboltOutlined />
                    {t('live_operations')}
                  </span>
                ),
                children: <LiveOperationsTracking />
              },
              {
                key: 'employee-tracking',
                label: (
                  <span>
                    <UserOutlined />
                    {t('employee_tracking')}
                  </span>
                ),
                children: <EmployeeLiveTracking />
              },
              {
                key: 'map',
                label: (
                  <span>
                    <EnvironmentOutlined />
                    {t('location_tracking')}
                  </span>
                ),
                children: <InteractiveMap />
              }
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardTracking; 