import { Tag, Space, Avatar, Button, Tooltip, Typography } from 'antd';
import { 
  UserOutlined, 
  CarOutlined, 
  PhoneOutlined, 
  MessageOutlined, 
  FileTextOutlined, 
  VideoCameraOutlined,
  ClockCircleOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
  MailOutlined,
  BellOutlined,
  DollarOutlined
} from '@ant-design/icons';

const { Text } = Typography;

// دالة لتنسيق التواريخ
export const formatDate = (date, includeTime = false) => {
  if (!date) return '-';
  try {
    const dateObj = new Date(date);
    if (includeTime) {
      return dateObj.toLocaleString('ar-SA');
    }
    return dateObj.toLocaleDateString('ar-SA');
  } catch (error) {
    return '-';
  }
};

// دالة لتنسيق الأرقام
export const formatNumber = (number, currency = 'ريال') => {
  if (number === null || number === undefined) return '-';
  try {
    return `${Number(number).toLocaleString('ar-SA')} ${currency}`;
  } catch (error) {
    return '-';
  }
};

// دالة لتنسيق النصوص الطويلة
export const formatText = (text, maxLength = 50) => {
  if (!text) return '-';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// دالة لتنسيق حالة العميل
export const renderCustomer = (customerId, users = []) => {
  const user = users.find(u => u.id === customerId);
  if (!user) return <Text type="secondary">غير محدد</Text>;
  
  return (
    <Space>
      <Avatar src={user.avatar} size="small">
        {user.name?.charAt(0) || <UserOutlined />}
      </Avatar>
      <div>
        <div>{user.name || 'غير محدد'}</div>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {user.phone || 'لا يوجد رقم'}
        </Text>
      </div>
    </Space>
  );
};

// دالة لتنسيق حالة الطلب
export const renderOrderStatus = (status) => {
  const statusConfig = {
    pending: { color: 'orange', text: 'قيد الانتظار', icon: <ClockCircleOutlined /> },
    in_progress: { color: 'blue', text: 'قيد المعالجة', icon: <SolutionOutlined /> },
    completed: { color: 'green', text: 'مكتمل', icon: <CheckCircleOutlined /> },
    cancelled: { color: 'red', text: 'ملغي', icon: <CloseCircleOutlined /> },
    scheduled: { color: 'purple', text: 'مجدول', icon: <ClockCircleOutlined /> },
    overdue: { color: 'red', text: 'متأخر', icon: <ClockCircleOutlined /> }
  };
  
  const config = statusConfig[status] || { color: 'default', text: status, icon: null };
  return (
    <Tag color={config.color} icon={config.icon}>
      {config.text}
    </Tag>
  );
};

// دالة لتنسيق الأولوية
export const renderPriority = (priority) => {
  const priorityConfig = {
    high: { color: 'red', text: 'عالية' },
    medium: { color: 'orange', text: 'متوسطة' },
    low: { color: 'green', text: 'منخفضة' },
    critical: { color: 'red', text: 'حرجة' }
  };
  
  const config = priorityConfig[priority] || { color: 'default', text: priority };
  return <Tag color={config.color}>{config.text}</Tag>;
};

// دالة لتنسيق السيارة
export const renderCar = (car) => {
  if (!car) return <Text type="secondary">غير محدد</Text>;
  
  return (
    <div>
      <CarOutlined style={{ marginLeft: 4 }} />
      {car.brand} {car.model}
      {car.plateNumber && (
        <>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {car.plateNumber}
          </Text>
        </>
      )}
      {car.size && (
        <>
          <br />
          <Tag size="small" color="blue">{car.size}</Tag>
        </>
      )}
    </div>
  );
};

// دالة لتنسيق قناة الاتصال
export const renderChannel = (channel) => {
  const channelIcons = {
    phone: <PhoneOutlined style={{ color: '#1890ff' }} />,
    chat: <MessageOutlined style={{ color: '#52c41a' }} />,
    email: <FileTextOutlined style={{ color: '#faad14' }} />,
    video: <VideoCameraOutlined style={{ color: '#722ed1' }} />,
    whatsapp: <WhatsAppOutlined style={{ color: '#25D366' }} />,
    sms: <MessageOutlined style={{ color: '#1890ff' }} />,
    push: <BellOutlined style={{ color: '#faad14' }} />
  };
  
  const channelNames = {
    phone: 'هاتف',
    chat: 'محادثة',
    email: 'بريد إلكتروني',
    video: 'فيديو',
    whatsapp: 'واتساب',
    sms: 'رسالة نصية',
    push: 'إشعار تطبيق'
  };
  
  return (
    <Space>
      {channelIcons[channel]}
      <Text>{channelNames[channel] || channel}</Text>
    </Space>
  );
};

// دالة لتنسيق الإجراءات
export const renderActions = (record, actions = {}) => {
  return (
    <Space>
      {actions.onView && (
        <Tooltip title="عرض التفاصيل">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => actions.onView(record)}
          />
        </Tooltip>
      )}
      {actions.onEdit && (
        <Tooltip title="تعديل">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => actions.onEdit(record)}
          />
        </Tooltip>
      )}
      {actions.onDelete && (
        <Tooltip title="حذف">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => actions.onDelete(record)}
          />
        </Tooltip>
      )}
    </Space>
  );
};

// دالة لتنسيق التقييم
export const renderRating = (rating, showNumber = true) => {
  if (!rating) return <Text type="secondary">لا يوجد تقييم</Text>;
  
  return (
    <Space>
      <div style={{ color: '#faad14' }}>
        {'★'.repeat(Math.floor(rating))}
        {'☆'.repeat(5 - Math.floor(rating))}
      </div>
      {showNumber && <Text>{rating.toFixed(1)}</Text>}
    </Space>
  );
};

// دالة لتنسيق المبلغ
export const renderAmount = (amount, currency = 'ريال') => {
  if (!amount) return <Text type="secondary">غير محدد</Text>;
  
  return (
    <Text strong style={{ color: '#52c41a' }}>
      {formatNumber(amount, currency)}
    </Text>
  );
};

// دالة لتنسيق المنصة
export const renderPlatform = (platform) => {
  const platformConfig = {
    web: { color: 'blue', text: 'الويب', icon: <FileTextOutlined /> },
    mobile: { color: 'green', text: 'الجوال', icon: <PhoneOutlined /> },
    tablet: { color: 'purple', text: 'التابلت', icon: <FileTextOutlined /> },
    desktop: { color: 'orange', text: 'الحاسوب', icon: <FileTextOutlined /> }
  };
  
  const config = platformConfig[platform] || { color: 'default', text: platform, icon: null };
  return (
    <Tag color={config.color} icon={config.icon}>
      {config.text}
    </Tag>
  );
};

// دالة لإنشاء أعمدة قياسية
export const createStandardColumns = (config = {}) => {
  const {
    showCustomer = true,
    showStatus = true,
    showDate = true,
    showAmount = false,
    showActions = true,
    customActions = null
  } = config;

  const columns = [];

  if (showCustomer) {
    columns.push({
      title: 'العميل',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (customerId) => renderCustomer(customerId, config.users || [])
    });
  }

  if (showStatus) {
    columns.push({
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderOrderStatus(status)
    });
  }

  if (showDate) {
    columns.push({
      title: 'التاريخ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date)
    });
  }

  if (showAmount) {
    columns.push({
      title: 'المبلغ',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => renderAmount(amount)
    });
  }

  if (showActions) {
    columns.push({
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => customActions ? customActions(record) : renderActions(record, config.actions || {})
    });
  }

  return columns;
}; 