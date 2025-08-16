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
  Rate,
  Divider,
  Typography
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  ClockCircleOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { getComplaints, getUsersData, getOrders, getBranches } from '../data/mockData';
import { useRole, useRoleGuard } from '../context/RoleContext';
import { useToast } from '../utils/toastService';
import { 
  formatDate, 
  renderCustomer, 
  renderOrderStatus, 
  renderPriority, 
  renderRating, 
  renderActions 
} from '../utils/tableUtils';

const { Option } = Select;
const { TextArea } = Input;
const { Text, Paragraph } = Typography;

const Complaints = () => {
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'manager', 'support']);
  const toast = useToast();
  
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
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
      const [complaintsData, usersData, ordersData, branchesData] = await Promise.all([
        getComplaints(),
        getUsersData(),
        getOrders(),
        getBranches()
      ]);
      setComplaints(complaintsData);
      setUsers(usersData);
      setOrders(ordersData);
      setBranches(branchesData);
    } catch (error) {
      toast.error('فشل في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedComplaint = { ...selectedComplaint, ...values };
      
      setComplaints(prev => 
        prev.map(c => c.id === selectedComplaint.id ? updatedComplaint : c)
      );
      
      toast.success('تم تحديث الشكوى بنجاح');
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error('فشل في تحديث الشكوى');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedComplaint(null);
    form.resetFields();
  };

  const filteredComplaints = complaints;

  // أعمدة الجدول
  const columns = [
    {
      title: 'رقم الشكوى',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Tag color="red">#{id}</Tag>,
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
      title: 'الطلب',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (orderId) => <Tag color="blue">#{orderId}</Tag>,
      className: 'number-cell'
    },
    {
      title: 'الفرع',
      dataIndex: 'branchId',
      key: 'branchId',
      render: (branchId) => {
        const branch = branches.find(b => b.id === branchId);
        return branch?.name || '-';
      }
    },
    {
      title: 'الفئة',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryNames = {
          service_quality: 'جودة الخدمة',
          delivery: 'التوصيل',
          cleanliness: 'النظافة',
          pricing: 'الأسعار',
          staff_behavior: 'سلوك الموظفين',
          equipment: 'المعدات',
          other: 'أخرى'
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
        onView: () => showComplaintDetails(record),
        onEdit: () => updateComplaintStatus(record),
        onDelete: () => deleteComplaint(record.id)
      }),
      className: 'actions-cell'
    }
  ];

  const showComplaintDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setModalVisible(true);
  };

  const updateComplaintStatus = (complaint) => {
    setSelectedComplaint(complaint);
    form.setFieldsValue({
      status: complaint.status,
      resolution: complaint.resolution || '',
      assignedTo: complaint.assignedTo || ''
    });
    setModalVisible(true);
  };

  const deleteComplaint = async (id) => {
    try {
      setComplaints(complaints.filter(c => c.id !== id));
      toast.success('تم حذف الشكوى بنجاح');
    } catch (error) {
      toast.error('خطأ في حذف الشكوى');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* إحصائيات سريعة */}
      <div style={{ marginBottom: 24 }}>
        <Space size="large">
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
                {complaints.length}
              </div>
              <div>إجمالي الشكاوى</div>
            </div>
          </Card>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
                {complaints.filter(c => c.status === 'pending').length}
              </div>
              <div>قيد الانتظار</div>
            </div>
          </Card>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                {complaints.filter(c => c.status === 'resolved').length}
              </div>
              <div>تم الحل</div>
            </div>
          </Card>
          <Card size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
                {complaints.filter(c => c.priority === 'high').length}
              </div>
              <div>عالية الأولوية</div>
            </div>
          </Card>
        </Space>
      </div>

      {/* جدول الشكاوى */}
      <Card title="قائمة الشكاوى">
        <Table
          columns={columns}
          dataSource={filteredComplaints}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredComplaints.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} شكوى`
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      {/* Modal تفاصيل الشكوى */}
      <Modal
        title="تفاصيل الشكوى"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
        className="details-modal"
      >
        {selectedComplaint ? (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="رقم الشكوى" span={2}>
                #{selectedComplaint.id}
              </Descriptions.Item>
              <Descriptions.Item label="العميل">
                {users.find(u => u.id === selectedComplaint.customerId)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="رقم الطلب">
                #{selectedComplaint.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="الفرع">
                {branches.find(b => b.id === selectedComplaint.branchId)?.name}
              </Descriptions.Item>
              <Descriptions.Item label="الفئة">
                <Tag color="purple">
                  {selectedComplaint.category === 'service_quality' ? 'جودة الخدمة' :
                   selectedComplaint.category === 'delivery' ? 'التوصيل' :
                   selectedComplaint.category === 'cleanliness' ? 'النظافة' :
                   selectedComplaint.category === 'pricing' ? 'الأسعار' :
                   selectedComplaint.category === 'staff_behavior' ? 'سلوك الموظفين' :
                   selectedComplaint.category === 'equipment' ? 'المعدات' : 'أخرى'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="الأولوية">
                {renderPriority(selectedComplaint.priority)}
              </Descriptions.Item>
              <Descriptions.Item label="التقييم">
                {renderRating(selectedComplaint.rating, false)}
              </Descriptions.Item>
              <Descriptions.Item label="التاريخ">
                {formatDate(selectedComplaint.createdAt)}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div style={{ marginBottom: 16 }}>
              <Text strong>تفاصيل الشكوى:</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {selectedComplaint.description}
              </Paragraph>
            </div>

            {selectedComplaint.resolution && (
              <div style={{ marginBottom: 16 }}>
                <Text strong>الحل المقدم:</Text>
                <Paragraph style={{ marginTop: 8 }}>
                  {selectedComplaint.resolution}
                </Paragraph>
              </div>
            )}

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
                  placeholder="اكتب الحل أو الرد على الشكوى..."
                />
              </Form.Item>
            </Form>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Complaints; 