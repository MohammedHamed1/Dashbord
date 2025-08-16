import React, { useState } from 'react';
import { Card, Table, Button, Space } from 'antd';
import { DownloadOutlined, BarChartOutlined } from '@ant-design/icons';
import RevenueLineChart from '../components/RevenueLineChart';
import mockData from '../data/mockData';

const BranchRevenues = () => {
  // بيانات افتراضية للفروع
  const [branches] = useState([
    { id: 1, name: 'مغسلة الرياض', revenue: 120000, orders: 320, rating: 4.7 },
    { id: 2, name: 'مغسلة جدة', revenue: 95000, orders: 210, rating: 4.5 },
    { id: 3, name: 'مغسلة الدمام', revenue: 78000, orders: 180, rating: 4.3 },
    { id: 4, name: 'مغسلة المدينة', revenue: 67000, orders: 140, rating: 4.6 },
  ]);

  const columns = [
    { title: 'اسم المغسلة', dataIndex: 'name', key: 'name' },
    { title: 'الإيرادات (ر.س)', dataIndex: 'revenue', key: 'revenue' },
    { title: 'عدد الطلبات', dataIndex: 'orders', key: 'orders' },
    { title: 'متوسط التقييم', dataIndex: 'rating', key: 'rating' },
    {
      title: 'تصدير',
      key: 'export',
      render: (_, record) => (
        <Button icon={<DownloadOutlined />} onClick={() => handleExport(record)}>
          تصدير
        </Button>
      ),
    },
  ];

  const handleExport = (branch) => {
    // هنا تضع منطق التصدير (Excel/PDF)
    alert(`سيتم تصدير بيانات: ${branch.name}`);
  };

  return (
    <div className="branch-revenues-page">
      <Card title={<span><BarChartOutlined /> إيرادات الفروع</span>}>
        <Table
          columns={columns}
          dataSource={branches}
          rowKey="id"
          pagination={false}
        />
        <div style={{ marginTop: 32 }}>
          <RevenueLineChart branches={branches} />
        </div>
      </Card>
    </div>
  );
};

export default BranchRevenues; 