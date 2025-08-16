import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message, 
  Card,
  Tag,
  Descriptions,
  Steps,
  Timeline,
  Rate,
  Divider,
  Typography
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  PhoneOutlined,
  MessageOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  ClockCircleOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { getSupportTickets, getUsersData } from '../data/mockData';
import { useRole, useRoleGuard } from '../context/RoleContext';
import { useToast } from '../utils/toastService';
import { 
  formatDate, 
  renderCustomer, 
  renderChannel, 
  renderOrderStatus, 
  renderPriority, 
  renderRating, 
  renderActions 
} from '../utils/tableUtils';

const { Option } = Select;
const { TextArea } = Input;
const { Text, Paragraph } = Typography;
const { Step } = Steps;

const Support = () => {
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'support', 'manager']);
  const toast = useToast();
  
  const [supportTickets, setSupportTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (allowed) {
      fetchData();
    }
  }, [allowed]);

  if (!allowed) return <div>غير مصرح لك بالوصول لهذه الصفحة</div>;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ticketsData, usersData] = await Promise.all([
        getSupportTickets(),
        getUsersData()
      ]);
      setSupportTickets(ticketsData);
      setUsers(usersData);
    } catch (error) {
      toast.error('فشل في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedTicket = { ...selectedTicket, ...values };
      
      setSupportTickets(prev => 
        prev.map(t => t.id === selectedTicket.id ? updatedTicket : t)
      );
      
      toast.success('تم تحديث التذكرة بنجاح');
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error('فشل في تحديث التذكرة');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedTicket(null);
    form.resetFields();
  };

  const getCurrentStep = (status) => {
    const steps = {
      pending: 0,
      in_progress: 1,
      resolved: 2,
      closed: 3
    };
    return steps[status] || 0;
  };

  const filteredTickets = supportTickets;

  // أعمدة الجدول
  const columns = [
    {
      title: 'رقم التذكرة',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Tag color="blue">#{id}</Tag>,
      className: 'number-cell'
    },
    {
      title: 'العميل',
      dataIndex: 'customerId',
      key: 'customerId',
      render: (customerId) => renderCustomer(customerId, users),
      className: 'customer-cell'
    },
    {
      title: 'الموضوع',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject, record) => (
        <div>
          <div>{subject}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.description?.substring(0, 50)}...
          </Text>
        </div>
      )
    },
    {
      title: 'القناة',
      dataIndex: 'channel',
      key: 'channel',
      render: renderChannel,
      className: 'channel-cell'
    },
    {
      title: 'الفئة',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryNames = {
          technical: 'مشاكل تقنية',
          billing: 'مشاكل في الفواتير',
          service: 'مشاكل في الخدمة',
          account: 'مشاكل في الحساب',
          general: 'استفسارات عامة'
        };
        return <Tag color="purple">{categoryNames[category] || category}</Tag>;
      }
    },
    {
      title: 'الأولوية',
      dataIndex: 'priority',
      key: 'priority',
      render: renderPriority,
      className: 'priority-cell'
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: renderOrderStatus,
      className: 'status-cell'
    },
    {
      title: 'التقييم',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => renderRating(rating, false),
      className: 'rating-cell'
    },
    {
      title: 'التاريخ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: formatDate,
      className: 'date-cell'
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => renderActions(record, {
        onView: () => showTicketDetails(record),
        onEdit: () => updateTicketStatus(record),
        onDelete: () => deleteTicket(record.id)
      }),
      className: 'actions-cell'
    }
  ];

  const showTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const updateTicketStatus = (ticket) => {
    setSelectedTicket(ticket);
    form.setFieldsValue({
      status: ticket.status,
      resolution: ticket.resolution || '',
      assignedTo: ticket.assignedTo || '',
      priority: ticket.priority
    });
    setModalVisible(true);
  };

  const deleteTicket = async (id) => {
    try {
      setSupportTickets(supportTickets.filter(t => t.id !== id));
      toast.success('تم حذف التذكرة بنجاح');
    } catch (error) {
      toast.error('خطأ في حذف التذكرة');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* إحصائيات سريعة */}
      <div style={{ marginBottom: 24 }}>
        <Space size="large">
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {supportTickets.length}
              </div>
              <div>إجمالي التذاكر</div>
            </div>
          </Card>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
                {supportTickets.filter(t => t.status === 'pending').length}
              </div>
              <div>قيد الانتظار</div>
            </div>
          </Card>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {supportTickets.filter(t => t.status === 'resolved').length}
              </div>
              <div>تم الحل</div>
            </div>
          </Card>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
                {supportTickets.filter(t => t.priority === 'high').length}
              </div>
              <div>عالية الأولوية</div>
            </div>
          </Card>
        </Space>
      </div>

      {/* جدول التذاكر */}
      <Card title="قائمة تذاكر الدعم">
        <Table
          columns={columns}
          dataSource={filteredTickets}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredTickets.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} تذكرة`
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      {/* Modal تفاصيل التذكرة */}
      <Modal
        title="تفاصيل تذكرة الدعم"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        className="details-modal"
      >
        {selectedTicket ? (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="رقم التذكرة" span={2}>
                #{selectedTicket.id}
              </Descriptions.Item>
              <Descriptions.Item label="العميل">
                {users.find(u => u.id === selectedTicket.customerId)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الطلب">
                #{selectedTicket.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="القناة">
                {renderChannel(selectedTicket.channel)}
              </Descriptions.Item>
              <Descriptions.Item label="الفئة">
                <Tag color="purple">
                  {selectedTicket.category === 'technical' ? 'مشاكل تقنية' :
                   selectedTicket.category === 'billing' ? 'مشاكل في الفواتير' :
                   selectedTicket.category === 'service' ? 'مشاكل في الخدمة' :
                   selectedTicket.category === 'account' ? 'مشاكل في الحساب' : 'استفسارات عامة'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="الأولوية">
                {renderPriority(selectedTicket.priority)}
              </Descriptions.Item>
              <Descriptions.Item label="التقييم">
                {selectedTicket.rating ? renderRating(selectedTicket.rating, false) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="التاريخ">
                {formatDate(selectedTicket.createdAt)}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ marginBottom: 16 }}>
              <Text strong>الموضوع:</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {selectedTicket.subject}
              </Paragraph>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>تفاصيل المشكلة:</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {selectedTicket.description}
              </Paragraph>
            </div>

            {selectedTicket.resolution && (
              <div style={{ marginBottom: 16 }}>
                <Text strong>الحل المقدم:</Text>
                <Paragraph style={{ marginTop: 8 }}>
                  {selectedTicket.resolution}
                </Paragraph>
              </div>
            )}

            <Divider />

            <Steps current={getCurrentStep(selectedTicket.status)} size="small">
              <Step title="تم الاستلام" description="قيد الانتظار" />
              <Step title="قيد المعالجة" description="جاري العمل" />
              <Step title="تم الحل" description="تم الحل" />
              <Step title="مغلقة" description="مغلقة" />
            </Steps>

            <Divider />

            <Form form={form} layout="vertical">
              <Form.Item
                name="status"
                label="تحديث الحالة"
              >
                <Select placeholder="اختر الحالة الجديدة">
                  <Option value="pending">قيد الانتظار</Option>
                  <Option value="in_progress">قيد المعالجة</Option>
                  <Option value="resolved">تم الحل</Option>
                  <Option value="closed">مغلقة</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="priority"
                label="الأولوية"
              >
                <Select placeholder="اختر الأولوية">
                  <Option value="low">منخفضة</Option>
                  <Option value="medium">متوسطة</Option>
                  <Option value="high">عالية</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="assignedTo"
                label="تعيين إلى"
              >
                <Select placeholder="اختر الموظف">
                  {users.map(user => (
                    <Option key={user.id} value={user.id}>{user.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="resolution"
                label="الحل أو الرد"
              >
                <TextArea
                  rows={4}
                  placeholder="اكتب الحل أو الرد على المشكلة..."
                />
              </Form.Item>
            </Form>

            <Timeline>
              <Timeline.Item color="blue">
                <Text>تم إنشاء التذكرة</Text>
                <br />
                <Text type="secondary">{formatDate(selectedTicket.createdAt, true)}</Text>
              </Timeline.Item>
              {selectedTicket.status === 'in_progress' && (
                <Timeline.Item color="blue">
                  <Text>تم بدء المعالجة</Text>
                  <br />
                  <Text type="secondary">{selectedTicket.updatedAt ? formatDate(selectedTicket.updatedAt, true) : '-'}</Text>
                </Timeline.Item>
              )}
              {selectedTicket.status === 'resolved' && (
                <Timeline.Item color="green">
                  <Text>تم حل المشكلة</Text>
                  <br />
                  <Text type="secondary">{selectedTicket.resolvedAt ? formatDate(selectedTicket.resolvedAt, true) : '-'}</Text>
                </Timeline.Item>
              )}
            </Timeline>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Support; 