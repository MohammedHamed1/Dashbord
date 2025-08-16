import React, { useState } from 'react';
import { Card, Button, Input, Space, Typography } from 'antd';
import { AndroidOutlined, AppleOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AppManagement = () => {
  const [appLinks, setAppLinks] = useState({
    googlePlay: '',
    appStore: ''
  });
  const [editMode, setEditMode] = useState(false);

  const handleSaveLinks = () => {
    setEditMode(false);
    // يمكنك هنا حفظ الروابط في قاعدة البيانات أو API
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 16px' }}>
      <Card className="app-links-card" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderRadius: 16 }}>
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Title level={3} style={{ marginBottom: 24 }}>إدارة التطبيقات</Title>
          {editMode ? (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong><AndroidOutlined /> رابط Google Play:</Text>
                <Input
                  placeholder="https://play.google.com/..."
                  value={appLinks.googlePlay}
                  onChange={e => setAppLinks({ ...appLinks, googlePlay: e.target.value })}
                  style={{ marginTop: 8 }}
                />
              </div>
              <div>
                <Text strong><AppleOutlined /> رابط App Store:</Text>
                <Input
                  placeholder="https://apps.apple.com/..."
                  value={appLinks.appStore}
                  onChange={e => setAppLinks({ ...appLinks, appStore: e.target.value })}
                  style={{ marginTop: 8 }}
                />
              </div>
              <Space style={{ marginTop: 16 }}>
                <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveLinks}>حفظ</Button>
                <Button icon={<CloseOutlined />} onClick={() => setEditMode(false)}>إلغاء</Button>
              </Space>
            </Space>
          ) : (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong><AndroidOutlined /> Google Play:</Text>
                <div style={{ marginTop: 4 }}>
                  {appLinks.googlePlay ? (
                    <a href={appLinks.googlePlay} target="_blank" rel="noopener noreferrer">رابط التطبيق</a>
                  ) : (
                    <Text type="secondary">لم تتم الإضافة بعد</Text>
                  )}
                </div>
              </div>
              <div>
                <Text strong><AppleOutlined /> App Store:</Text>
                <div style={{ marginTop: 4 }}>
                  {appLinks.appStore ? (
                    <a href={appLinks.appStore} target="_blank" rel="noopener noreferrer">رابط التطبيق</a>
                  ) : (
                    <Text type="secondary">لم تتم الإضافة بعد</Text>
                  )}
                </div>
              </div>
              <Button icon={<EditOutlined />} onClick={() => setEditMode(true)}>تعديل الروابط</Button>
            </Space>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppManagement; 