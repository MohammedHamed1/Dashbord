import React, { useState, useEffect } from 'react';
import { Card, Empty } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getRevenueData } from '../data/mockData';

const RevenueLineChart = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (data && data.length > 0) {
          setChartData(data);
        } else {
          const revenueData = await getRevenueData();
          setChartData(revenueData);
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setChartData([
          { name: 'يناير', revenue: 12500.00, orders: 250, customers: 180 },
          { name: 'فبراير', revenue: 15800.00, orders: 316, customers: 220 },
          { name: 'مارس', revenue: 14200.00, orders: 284, customers: 200 },
          { name: 'أبريل', revenue: 16800.00, orders: 336, customers: 240 },
          { name: 'مايو', revenue: 19200.00, orders: 384, customers: 280 },
          { name: 'يونيو', revenue: 17500.00, orders: 350, customers: 260 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '4px 0', 
              color: entry.color,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span style={{ 
                display: 'inline-block', 
                width: 8, 
                height: 8, 
                borderRadius: 4, 
                background: entry.color 
              }} />
              {entry.name}: {entry.dataKey === 'revenue' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card title="الإيرادات الشهرية" style={{ height: 400 }} loading={true}>
        <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          جاري التحميل...
        </div>
      </Card>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Card title="الإيرادات الشهرية" style={{ height: 400 }}>
        <Empty description="لا توجد بيانات متاحة" />
      </Card>
    );
  }

  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            style={{ fontSize: '12px' }}
            tick={{ fill: '#666' }}
          />
          <YAxis 
            style={{ fontSize: '12px' }}
            tick={{ fill: '#666' }}
            tickFormatter={formatCurrency}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            name="الإيرادات"
            stroke="#4e54c8" 
            strokeWidth={3} 
            dot={{ r: 5, fill: '#4e54c8' }} 
            activeDot={{ r: 7, stroke: '#4e54c8', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="orders" 
            name="الطلبات"
            stroke="#52c41a" 
            strokeWidth={2} 
            dot={{ r: 4, fill: '#52c41a' }} 
            activeDot={{ r: 6, stroke: '#52c41a', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueLineChart;

export const ordersData = [
  { id: 101, customer: "أحمد علي", status: "قيد التنفيذ", total: "150 ريال", date: "2024-07-01" },
  { id: 102, customer: "سارة محمد", status: "مكتمل", total: "200 ريال", date: "2024-07-02" },
  { id: 103, customer: "محمد سعيد", status: "ملغى", total: "0 ريال", date: "2024-07-03" },
  { id: 104, customer: "منى فهد", status: "قيد التنفيذ", total: "120 ريال", date: "2024-07-04" },
];