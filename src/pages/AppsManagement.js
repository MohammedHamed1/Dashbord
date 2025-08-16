import React from 'react';
import { Card, List, Button } from 'antd';

const apps = [
  { id: 1, name: 'تطبيق العملاء', status: 'مفعل' },
  { id: 2, name: 'تطبيق المغسلة', status: 'مفعل' },
  { id: 3, name: 'تطبيق الموظفين', status: 'قيد التطوير' },
];

const AppsManagement = () => (
  <div style={{ padding: 24 }}>
    <Card title="إدارة التطبيقات">
      <List
        dataSource={apps}
        renderItem={item => (
          <List.Item actions={[<Button type="link">تفاصيل</Button>]}> 
            <List.Item.Meta title={item.name} description={item.status} />
          </List.Item>
        )}
      />
    </Card>
  </div>
);

export default AppsManagement; 