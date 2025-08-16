import React, { useState, useEffect, useMemo } from 'react';
import { Card, List, Tag, Avatar, Empty } from 'antd';
import { 
  CheckCircleOutlined, 
  UserAddOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  CloseCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
import { getLatestActivities } from '../data/mockData';

const LatestActivity = ({ activities = [] }) => {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // تجنب إعادة التحميل إذا كانت البيانات موجودة بالفعل
      if (hasInitialized && activityData.length > 0) {
        return;
      }

      setLoading(true);
      try {
        if (activities && activities.length > 0) {
          setActivityData(activities);
        } else {
          const latestActivities = await getLatestActivities();
          setActivityData(latestActivities);
        }
        setHasInitialized(true);
      } catch (error) {
        console.error('Error fetching latest activities:', error);
        setActivityData([
          { id: 1, message: "تم إنشاء طلب جديد #1234", user: "علي محمود", timestamp: "2024-03-03T16:45:00Z", type: "order_created" },
          { id: 2, message: "تم إكمال الطلب #1230", user: "محمد حسن", timestamp: "2024-03-02T14:20:00Z", type: "order_completed" },
          { id: 3, message: "انضم مستخدم جديد: نور الدين", user: "نور الدين", timestamp: "2024-03-02T09:15:00Z", type: "user_registered" },
          { id: 4, message: "تم استلام دفعة بقيمة 150 ريال", user: "علي محمود", timestamp: "2024-03-01T10:30:00Z", type: "payment_received" },
          { id: 5, message: "تم إلغاء الطلب #1228", user: "نور الدين", timestamp: "2024-03-01T13:30:00Z", type: "order_cancelled" }
        ]);
        setHasInitialized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // إزالة activities من dependencies

  const getIcon = (type) => {
    const iconStyle = { fontSize: 16 };
    switch (type) {
      case 'order_created':
        return <ShoppingCartOutlined style={{ ...iconStyle, color: '#1890ff' }} />;
      case 'order_completed':
        return <CheckCircleOutlined style={{ ...iconStyle, color: '#52c41a' }} />;
      case 'order_cancelled':
        return <CloseCircleOutlined style={{ ...iconStyle, color: '#ff4d4f' }} />;
      case 'user_registered':
        return <UserAddOutlined style={{ ...iconStyle, color: '#722ed1' }} />;
      case 'payment_received':
        return <DollarOutlined style={{ ...iconStyle, color: '#faad14' }} />;
      case 'loyalty_points':
        return <StarOutlined style={{ ...iconStyle, color: '#f5222d' }} />;
      default:
        return <CheckCircleOutlined style={{ ...iconStyle, color: '#52c41a' }} />;
    }
  };

  const getTagColor = (type) => {
    switch (type) {
      case 'order_created':
        return 'blue';
      case 'order_completed':
        return 'green';
      case 'order_cancelled':
        return 'red';
      case 'user_registered':
        return 'purple';
      case 'payment_received':
        return 'orange';
      case 'loyalty_points':
        return 'magenta';
      default:
        return 'default';
    }
  };

  const getTagText = (type) => {
    switch (type) {
      case 'order_created':
        return 'طلب جديد';
      case 'order_completed':
        return 'طلب مكتمل';
      case 'order_cancelled':
        return 'طلب ملغي';
      case 'user_registered':
        return 'مستخدم جديد';
      case 'payment_received':
        return 'دفعة';
      case 'loyalty_points':
        return 'نقاط ولاء';
      default:
        return 'نشاط';
    }
  };

  const formatTime = useMemo(() => {
    return (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
    
    return activityTime.toLocaleDateString('ar-SA');
  };
  }, []);

  if (loading) {
    return (
      <Card title="النشاط الأخير" style={{ height: 400 }} loading={true}>
        <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          جاري التحميل...
        </div>
      </Card>
    );
  }

  if (!activityData || activityData.length === 0) {
    return (
      <Card title="النشاط الأخير" style={{ height: 400 }}>
        <Empty description="لا توجد أنشطة حديثة" />
      </Card>
    );
  }

  return (
    <div style={{ height: 400, overflow: 'auto' }}>
      <List
        dataSource={activityData}
        renderItem={item => (
          <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <List.Item.Meta
              avatar={
                <Avatar 
                  style={{ 
                    backgroundColor: getTagColor(item.type) === 'blue' ? '#1890ff' : 
                               getTagColor(item.type) === 'green' ? '#52c41a' :
                               getTagColor(item.type) === 'red' ? '#ff4d4f' :
                               getTagColor(item.type) === 'purple' ? '#722ed1' :
                               getTagColor(item.type) === 'orange' ? '#faad14' :
                               getTagColor(item.type) === 'magenta' ? '#f5222d' : '#1890ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getIcon(item.type)}
                </Avatar>
              }
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 'bold', fontSize: 14 }}>{item.message}</span>
                  <Tag color={getTagColor(item.type)} size="small">
                    {getTagText(item.type)}
                  </Tag>
                </div>
              }
              description={
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ color: '#666', fontSize: 12 }}>
                    <strong>{item.user}</strong>
                  </span>
                  <span style={{ color: '#999', fontSize: 11 }}>
                    {formatTime(item.timestamp)}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default LatestActivity; 