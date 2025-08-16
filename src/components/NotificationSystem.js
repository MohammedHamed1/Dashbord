import React, { useState } from 'react';
import { List, Button, Badge } from 'antd';
import { BellOutlined, DeleteOutlined } from '@ant-design/icons';

const initialNotifications = [
  { id: 1, text: 'طلب جديد من العميل أحمد', read: false },
  { id: 2, text: 'تم تحديث حالة الطلب رقم 123', read: false },
  { id: 3, text: 'تمت إضافة باقة جديدة', read: true },
];

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const markAsRead = id => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const deleteNotification = id => setNotifications(n => n.filter(x => x.id !== id));
  return (
    <div style={{ width: 320 }}>
      <List
        header={<span>الإشعارات</span>}
        dataSource={notifications}
        renderItem={item => (
          <List.Item
            actions={[
              <Button icon={<DeleteOutlined />} size="small" onClick={() => deleteNotification(item.id)} />
            ]}
            style={{ background: item.read ? '#f6f6f6' : '#e6f7ff' }}
            onClick={() => markAsRead(item.id)}
          >
            <Badge dot={!item.read}>
              {item.text}
            </Badge>
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationSystem; 