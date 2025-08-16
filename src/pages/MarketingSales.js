import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

const MarketingSales = () => (
  <div style={{ padding: 24 }}>
    <Card title="التسويق والمبيعات">
      <Row gutter={24}>
        <Col span={8}><Statistic title="عدد الحملات" value={12} /></Col>
        <Col span={8}><Statistic title="العملاء الجدد" value={34} /></Col>
        <Col span={8}><Statistic title="العروض النشطة" value={5} /></Col>
      </Row>
    </Card>
  </div>
);

export default MarketingSales; 