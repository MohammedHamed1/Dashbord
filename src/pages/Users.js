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
  Popconfirm,
  Card,
  Tag,
  Avatar,
  InputNumber
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UserOutlined,
  SearchOutlined 
} from '@ant-design/icons';
import { getUsersData, createUser, updateUser, deleteUser } from '../data/mockData';
import { useRole, useRoleGuard } from '../context/RoleContext';

// تم إزالة Option لأنه لم يعد مستخدماً في Ant Design v5

const Users = () => {
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'laundry']);
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
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
      const data = await getUsersData();
      setUsers(data);
    } catch (error) {
      message.error('فشل في تحميل بيانات المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success('تم حذف المستخدم بنجاح');
      fetchData();
    } catch (error) {
      message.error('فشل في حذف المستخدم');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, values);
        message.success('تم تحديث المستخدم بنجاح');
      } else {
        await createUser(values);
        message.success('تم إضافة المستخدم بنجاح');
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('فشل في حفظ المستخدم');
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      manager: 'red',
      laundry: 'blue',
      employee: 'green',
      customer: 'orange'
    };
    return colors[role] || 'default';
  };

  const getRoleName = (role) => {
    const names = {
      manager: 'مدير',
      laundry: 'مغسلة',
      employee: 'موظف',
      customer: 'عميل'
    };
    return names[role] || role;
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'green' : 'red';
  };

  const getStatusName = (status) => {
    return status === 'active' ? 'نشط' : 'غير نشط';
  };

  const columns = [
    {
      title: 'المستخدم',
      key: 'user',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={record.avatar} 
            icon={<UserOutlined />}
            style={{ marginRight: 8 }}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'الدور',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {getRoleName(role)}
        </Tag>
      ),
      filters: [
        { text: 'مدير', value: 'manager' },
        { text: 'مغسلة', value: 'laundry' },
        { text: 'موظف', value: 'employee' },
        { text: 'عميل', value: 'customer' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'رقم الهاتف',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusName(status)}
        </Tag>
      ),
      filters: [
        { text: 'نشط', value: 'active' },
        { text: 'غير نشط', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('ar-SA'),
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            تعديل
          </Button>
          <Popconfirm
            title="هل أنت متأكد من حذف هذا المستخدم؟"
            onConfirm={() => handleDelete(record.id)}
            okText="نعم"
            cancelText="لا"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              حذف
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // تقييد الصلاحيات حسب الدور
  const canManageUsers = ['manager', 'laundry'].includes(currentRole);
  const canEditUsers = ['manager', 'laundry'].includes(currentRole);
  const canDeleteUsers = currentRole === 'manager';

  const filteredColumns = columns.filter((col, index) => {
    if (col.key === 'actions') {
      return canManageUsers;
    }
    return true;
  });

  return (
    <Card title="إدارة المستخدمين" style={{ margin: 16 }}>
      {canManageUsers && (
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            إضافة مستخدم جديد
          </Button>
        </div>
      )}

      <Table
        columns={filteredColumns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} من ${total} مستخدم`,
        }}
      />

      <Modal
        title={editingUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="الاسم"
            rules={[{ required: true, message: 'يرجى إدخال الاسم' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="البريد الإلكتروني"
            rules={[
              { required: true, message: 'يرجى إدخال البريد الإلكتروني' },
              { type: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="رقم الهاتف"
            rules={[{ required: true, message: 'يرجى إدخال رقم الهاتف' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="الدور"
            rules={[{ required: true, message: 'يرجى اختيار الدور' }]}
          >
            <Select>
              <Select.Option value="manager">مدير</Select.Option>
              <Select.Option value="laundry">مغسلة</Select.Option>
              <Select.Option value="employee">موظف</Select.Option>
              <Select.Option value="customer">عميل</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="الحالة"
            rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
          >
            <Select>
              <Select.Option value="active">نشط</Select.Option>
              <Select.Option value="inactive">غير نشط</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingUser ? 'تحديث' : 'إضافة'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                إلغاء
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Users; 