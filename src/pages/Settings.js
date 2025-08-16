import React from 'react';
import { Card, Form, Input, Button } from 'antd';

const Settings = () => (
  <div style={{ padding: 24 }}>
    <Card title="الإعدادات العامة">
      <Form layout="vertical" style={{ maxWidth: 400 }}>
        <Form.Item label="الاسم">
          <Input placeholder="اسم المستخدم" />
        </Form.Item>
        <Form.Item label="البريد الإلكتروني">
          <Input placeholder="البريد الإلكتروني" />
        </Form.Item>
        <Form.Item label="تغيير كلمة المرور">
          <Input.Password placeholder="كلمة المرور الجديدة" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">حفظ التغييرات</Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
);

export default Settings; 