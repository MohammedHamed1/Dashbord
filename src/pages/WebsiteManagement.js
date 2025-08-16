import React from 'react';
import { Card, Form, Input, Button } from 'antd';

const WebsiteManagement = () => (
  <div style={{ padding: 24 }}>
    <Card title="إدارة الموقع">
      <Form layout="vertical" style={{ maxWidth: 400 }}>
        <Form.Item label="عنوان الموقع">
          <Input placeholder="PayPass Laundry" />
        </Form.Item>
        <Form.Item label="وصف الموقع">
          <Input.TextArea placeholder="وصف مختصر للموقع..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary">حفظ</Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
);

export default WebsiteManagement; 