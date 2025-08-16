import React, { useState, useEffect } from 'react';
import { Card, Empty } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getOrderStatusData } from '../data/mockData';

const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#F44336'];

const OrderStatusPie = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (data && data.length > 0) {
          setChartData(data);
        } else {
          const orderData = await getOrderStatusData();
          setChartData(orderData);
        }
      } catch (error) {
        console.error('Error fetching order status data:', error);
        setChartData([
          { name: 'مكتملة', value: 2, color: '#4CAF50' },
          { name: 'قيد التنفيذ', value: 1, color: '#2196F3' },
          { name: 'في الانتظار', value: 1, color: '#FF9800' },
          { name: 'ملغاة', value: 1, color: '#F44336' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{data.name}</p>
          <p style={{ margin: 0, color: '#666' }}>العدد: {data.value}</p>
          <p style={{ margin: 0, color: '#666' }}>النسبة: {((data.value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card title="حالة الطلبات" style={{ height: 400 }} loading={true}>
        <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          جاري التحميل...
        </div>
      </Card>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Card title="حالة الطلبات" style={{ height: 400 }}>
        <Empty description="لا توجد بيانات متاحة" />
      </Card>
    );
  }

  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value, percent }) => `${name}: ${value}`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 24, 
        marginTop: 16,
        flexWrap: 'wrap'
      }}>
        {chartData.map((entry, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            padding: '4px 8px',
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.02)'
          }}>
            <span style={{ 
              display: 'inline-block', 
              width: 12, 
              height: 12, 
              borderRadius: 6, 
              background: entry.color || COLORS[idx % COLORS.length]
            }} />
            <span style={{ 
              fontWeight: 'bold', 
              fontSize: 14,
              color: entry.color || COLORS[idx % COLORS.length]
            }}>
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusPie; 