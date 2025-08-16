import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { 
  ShoppingCartOutlined, 
  DollarOutlined, 
  UserOutlined, 
  StarOutlined 
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const DashboardStats = ({ stats }) => {
  const { t } = useTranslation();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  return (
    <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
      <Col xs={24} sm={12} lg={6}>
        <Card className="dashboard-card">
          <Statistic
            title={t('total_orders')}
            value={stats.totalOrders}
            prefix={<ShoppingCartOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="dashboard-card">
          <Statistic
            title={t('total_revenue')}
            value={stats.totalRevenue}
            prefix={<DollarOutlined />}
            formatter={(value) => formatCurrency(value)}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="dashboard-card">
          <Statistic
            title={t('total_customers')}
            value={stats.totalUsers}
            prefix={<UserOutlined />}
            valueStyle={{ color: '#722ed1' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="dashboard-card">
          <Statistic
            title={t('average_rating')}
            value={stats.averageRating}
            prefix={<StarOutlined />}
            suffix="/ 5"
            precision={1}
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardStats; 