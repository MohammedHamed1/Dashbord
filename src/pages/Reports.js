import React, { useRef } from 'react';
import { Card, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'يناير', orders: 120, revenue: 3000 },
  { name: 'فبراير', orders: 98, revenue: 2500 },
  { name: 'مارس', orders: 150, revenue: 4000 },
  { name: 'أبريل', orders: 80, revenue: 2000 },
];

const Reports = () => {
  const ref = useRef(null);

  return (
    <div style={{ padding: 24 }}>
      <Card title="التقارير المتقدمة">
        <Row gutter={24}>
          <Col span={12}>
            <h4>عدد الطلبات الشهري</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
          <Col span={12}>
            <h4>الإيرادات الشهرية</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Reports; 