import React, { useState } from 'react';
import { Card, Table, Input, Tag } from 'antd';

const mockLogs = [
  { id: 1, user: 'أحمد محمد', action: 'إضافة طلب', time: '2024-07-05 10:00', type: 'order' },
  { id: 2, user: 'فاطمة علي', action: 'تعديل باقة', time: '2024-07-05 10:10', type: 'package' },
  { id: 3, user: 'خالد عبدالله', action: 'حذف مستخدم', time: '2024-07-05 10:20', type: 'user' },
  { id: 4, user: 'سارة أحمد', action: 'تسجيل دخول', time: '2024-07-05 10:30', type: 'login' },
];

const columns = [
  { title: 'المستخدم', dataIndex: 'user', key: 'user' },
  { title: 'العملية', dataIndex: 'action', key: 'action' },
  { title: 'الوقت', dataIndex: 'time', key: 'time' },
  { title: 'النوع', dataIndex: 'type', key: 'type', render: t => <Tag color="blue">{t}</Tag> },
];

const AuditLog = () => {
  const [search, setSearch] = useState('');
  const filtered = mockLogs.filter(l => l.user.includes(search) || l.action.includes(search) || l.type.includes(search));
  return (
    <div style={{ padding: 24 }}>
      <Card title="سجل العمليات (Audit Log)">
        <Input placeholder="بحث..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 300, marginBottom: 16 }} />
        <Table columns={columns} dataSource={filtered} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default AuditLog; 