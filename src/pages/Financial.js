import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  DatePicker, 
  Select, 
  Button, 
  Space,
  Tag,
  Progress
} from 'antd';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  DollarOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  CreditCardOutlined,
  BankOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { useRole, useRoleGuard } from '../context/RoleContext';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Financial = () => {
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'laundry']);
  
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [reportType, setReportType] = useState('monthly');
  
  if (!allowed) return <div>غير مصرح لك بالوصول لهذه الصفحة</div>;

  // بيانات وهمية للتقارير المالية
  const financialData = {
    revenue: 2847392,
    revenueChange: 15,
    expenses: 1250000,
    expensesChange: -8,
    profit: 1597392,
    profitChange: 22,
    pendingPayments: 125000,
    pendingChange: 5
  };

  const monthlyRevenueData = [
    { month: 'يناير', revenue: 250000, expenses: 180000, profit: 70000 },
    { month: 'فبراير', revenue: 300000, expenses: 200000, profit: 100000 },
    { month: 'مارس', revenue: 280000, expenses: 190000, profit: 90000 },
    { month: 'أبريل', revenue: 320000, expenses: 210000, profit: 110000 },
    { month: 'مايو', revenue: 350000, expenses: 220000, profit: 130000 },
    { month: 'يونيو', revenue: 450000, expenses: 250000, profit: 200000 },
  ];

  const paymentMethodsData = [
    { name: 'بطاقة ائتمان', value: 45, color: '#1890ff' },
    { name: 'تحويل بنكي', value: 30, color: '#52c41a' },
    { name: 'نقدي', value: 15, color: '#faad14' },
    { name: 'محفظة إلكترونية', value: 10, color: '#722ed1' },
  ];

  const recentTransactions = [
    {
      id: 1,
      customer: 'أحمد محمد',
      amount: 150,
      method: 'بطاقة ائتمان',
      status: 'completed',
      date: '2024-01-15 14:30',
      orderId: 'ORD-001'
    },
    {
      id: 2,
      customer: 'فاطمة علي',
      amount: 80,
      method: 'تحويل بنكي',
      status: 'pending',
      date: '2024-01-15 13:45',
      orderId: 'ORD-002'
    },
    {
      id: 3,
      customer: 'خالد عبدالله',
      amount: 200,
      method: 'نقدي',
      status: 'completed',
      date: '2024-01-15 12:20',
      orderId: 'ORD-003'
    },
    {
      id: 4,
      customer: 'سارة أحمد',
      amount: 120,
      method: 'محفظة إلكترونية',
      status: 'failed',
      date: '2024-01-15 11:15',
      orderId: 'ORD-004'
    }
  ];

  const transactionColumns = [
    {
      title: 'رقم الطلب',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'العميل',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'المبلغ',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
          {amount} ريال
        </span>
      ),
    },
    {
      title: 'طريقة الدفع',
      dataIndex: 'method',
      key: 'method',
      render: (method) => {
        const colors = {
          'بطاقة ائتمان': 'blue',
          'تحويل بنكي': 'green',
          'نقدي': 'orange',
          'محفظة إلكترونية': 'purple'
        };
        return <Tag color={colors[method]}>{method}</Tag>;
      },
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          completed: 'green',
          pending: 'orange',
          failed: 'red'
        };
        const labels = {
          completed: 'مكتمل',
          pending: 'قيد الانتظار',
          failed: 'فشل'
        };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      },
    },
    {
      title: 'التاريخ',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, color: '#1890ff' }}>النظام المالي</h1>
        <p style={{ color: '#666', margin: '8px 0 0 0' }}>
          إدارة التقارير المالية والمدفوعات
        </p>
      </div>

      {/* فلاتر التقارير */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} lg={8}>
            <label style={{ marginBottom: '8px', display: 'block' }}>الفترة الزمنية:</label>
            <RangePicker 
              style={{ width: '100%' }}
              onChange={setDateRange}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <label style={{ marginBottom: '8px', display: 'block' }}>نوع التقرير:</label>
            <Select 
              value={reportType} 
              onChange={setReportType}
              style={{ width: '100%' }}
            >
              <Option value="daily">يومي</Option>
              <Option value="weekly">أسبوعي</Option>
              <Option value="monthly">شهري</Option>
              <Option value="yearly">سنوي</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} lg={8}>
            <Space>
              <Button type="primary">تحديث التقرير</Button>
              <Button>تصدير PDF</Button>
              <Button>تصدير Excel</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* الإحصائيات الرئيسية */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="إجمالي الإيرادات"
              value={financialData.revenue}
              prefix={<DollarOutlined />}
              suffix="ريال"
              valueStyle={{ color: '#52c41a' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: financialData.revenueChange > 0 ? '#52c41a' : '#ff4d4f' }}>
                {financialData.revenueChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {Math.abs(financialData.revenueChange)}%
              </span>
              <span style={{ color: '#666', marginRight: '8px' }}>من الشهر الماضي</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="إجمالي المصروفات"
              value={financialData.expenses}
              prefix={<DollarOutlined />}
              suffix="ريال"
              valueStyle={{ color: '#faad14' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: financialData.expensesChange > 0 ? '#52c41a' : '#ff4d4f' }}>
                {financialData.expensesChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {Math.abs(financialData.expensesChange)}%
              </span>
              <span style={{ color: '#666', marginRight: '8px' }}>من الشهر الماضي</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="صافي الربح"
              value={financialData.profit}
              prefix={<DollarOutlined />}
              suffix="ريال"
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: financialData.profitChange > 0 ? '#52c41a' : '#ff4d4f' }}>
                {financialData.profitChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {Math.abs(financialData.profitChange)}%
              </span>
              <span style={{ color: '#666', marginRight: '8px' }}>من الشهر الماضي</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="المدفوعات المعلقة"
              value={financialData.pendingPayments}
              prefix={<DollarOutlined />}
              suffix="ريال"
              valueStyle={{ color: '#722ed1' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: financialData.pendingChange > 0 ? '#52c41a' : '#ff4d4f' }}>
                {financialData.pendingChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                {Math.abs(financialData.pendingChange)}%
              </span>
              <span style={{ color: '#666', marginRight: '8px' }}>من الشهر الماضي</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* الرسوم البيانية */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="الإيرادات والمصروفات الشهرية">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()} ريال`} />
                <Legend />
                <Bar dataKey="revenue" fill="#52c41a" name="الإيرادات" />
                <Bar dataKey="expenses" fill="#faad14" name="المصروفات" />
                <Bar dataKey="profit" fill="#1890ff" name="الربح" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="طرق الدفع">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '16px' }}>
              {paymentMethodsData.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>
                    <span style={{ 
                      display: 'inline-block', 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      background: item.color, 
                      marginLeft: '8px' 
                    }} />
                    {item.name}
                  </span>
                  <span style={{ fontWeight: 'bold' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* جدول المعاملات الأخيرة */}
      <Card title="المعاملات الأخيرة">
        <Table
          columns={transactionColumns}
          dataSource={recentTransactions}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} من ${total} معاملة`,
          }}
        />
      </Card>
    </div>
  );
};

export default Financial; 