import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Select,
  Space,
  Modal,
  Form,
  message,
  Tooltip,
  Badge,
  Divider,
  Typography,
  Tree,
  Checkbox,
  Tag,
  Avatar,
  List,
  Tabs,
  Collapse,
  Alert,
  Switch,
  Transfer
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  LockOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  KeyOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  CopyOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useToast } from '../utils/toastService';
import { getPermissionsData, getRolesData, getUsersData } from '../data/mockData';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const Permissions = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [roleForm] = Form.useForm();
  const [userForm] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rolesData, usersData, permissionsData] = await Promise.all([
        getRolesData(),
        getUsersData(),
        getPermissionsData()
      ]);
      setRoles(rolesData);
      setUsers(usersData);
      setPermissions(permissionsData);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = () => {
    roleForm.resetFields();
    setSelectedRole(null);
    setRoleModalVisible(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    roleForm.setFieldsValue(role);
    setRoleModalVisible(true);
  };

  const handleDeleteRole = async (id) => {
    try {
      // API call would go here
      toast.success('تم حذف الدور بنجاح');
      fetchData();
    } catch (error) {
      toast.error('خطأ في حذف الدور');
    }
  };

  const handleSaveRole = async (values) => {
    try {
      if (selectedRole) {
        // Update existing role
        toast.success('تم تحديث الدور بنجاح');
      } else {
        // Add new role
        toast.success('تم إضافة الدور بنجاح');
      }
      setRoleModalVisible(false);
      fetchData();
    } catch (error) {
      toast.error('خطأ في حفظ الدور');
    }
  };

  const handleAddUser = () => {
    userForm.resetFields();
    setSelectedUser(null);
    setUserModalVisible(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    userForm.setFieldsValue(user);
    setUserModalVisible(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      // API call would go here
      toast.success('تم حذف المستخدم بنجاح');
      fetchData();
    } catch (error) {
      toast.error('خطأ في حذف المستخدم');
    }
  };

  const handleSaveUser = async (values) => {
    try {
      if (selectedUser) {
        // Update existing user
        toast.success('تم تحديث المستخدم بنجاح');
      } else {
        // Add new user
        toast.success('تم إضافة المستخدم بنجاح');
      }
      setUserModalVisible(false);
      fetchData();
    } catch (error) {
      toast.error('خطأ في حفظ المستخدم');
    }
  };

  const handleExport = () => {
    toast.info('سيتم تصدير البيانات قريباً');
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'red',
      manager: 'orange',
      employee: 'blue',
      customer: 'green',
      guest: 'gray'
    };
    return colors[role] || 'default';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'green' : 'red';
  };

  const roleColumns = [
    {
      title: 'اسم الدور',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (name, record) => (
        <Space>
          <Avatar icon={<TeamOutlined />} style={{ backgroundColor: getRoleColor(record.key) }} />
          <span>{name}</span>
        </Space>
      )
    },
    {
      title: 'الوصف',
      dataIndex: 'description',
      key: 'description',
      width: 200
    },
    {
      title: 'عدد المستخدمين',
      dataIndex: 'userCount',
      key: 'userCount',
      width: 120,
      render: (count) => <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
    },
    {
      title: 'الصلاحيات',
      dataIndex: 'permissions',
      key: 'permissions',
      width: 200,
      render: (permissions) => (
        <Space wrap>
          {permissions.slice(0, 3).map(perm => (
            <Tag key={perm} color="blue">{perm}</Tag>
          ))}
          {permissions.length > 3 && (
            <Tag color="blue">+{permissions.length - 3}</Tag>
          )}
        </Space>
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'active' ? 'نشط' : 'غير نشط'}
        </Tag>
      )
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString('ar-SA')
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="عرض التفاصيل">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleEditRole(record)}
            />
          </Tooltip>
          <Tooltip title="تعديل">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditRole(record)}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteRole(record.id)}
              disabled={record.key === 'admin'}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const userColumns = [
    {
      title: 'المستخدم',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (name, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{name}</span>
        </Space>
      )
    },
    {
      title: 'البريد الإلكتروني',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: 'الدور',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {role === 'admin' ? 'مدير' : 
           role === 'manager' ? 'مشرف' : 
           role === 'employee' ? 'موظف' : 
           role === 'customer' ? 'عميل' : role}
        </Tag>
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'active' ? 'نشط' : 'غير نشط'}
        </Tag>
      )
    },
    {
      title: 'آخر تسجيل دخول',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: 150,
      render: (date) => date ? new Date(date).toLocaleString('ar-SA') : 'لم يسجل دخول'
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString('ar-SA')
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="عرض التفاصيل">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleEditUser(record)}
            />
          </Tooltip>
          <Tooltip title="تعديل">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditUser(record)}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record.id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const permissionTreeData = [
    {
      title: 'لوحة التحكم',
      key: 'dashboard',
      children: [
        { title: 'عرض الإحصائيات', key: 'dashboard:view' },
        { title: 'تصدير البيانات', key: 'dashboard:export' }
      ]
    },
    {
      title: 'إدارة الطلبات',
      key: 'orders',
      children: [
        { title: 'عرض الطلبات', key: 'orders:view' },
        { title: 'إنشاء طلب', key: 'orders:create' },
        { title: 'تعديل الطلب', key: 'orders:edit' },
        { title: 'حذف الطلب', key: 'orders:delete' },
        { title: 'تغيير الحالة', key: 'orders:status' }
      ]
    },
    {
      title: 'إدارة العملاء',
      key: 'customers',
      children: [
        { title: 'عرض العملاء', key: 'customers:view' },
        { title: 'إضافة عميل', key: 'customers:create' },
        { title: 'تعديل العميل', key: 'customers:edit' },
        { title: 'حذف العميل', key: 'customers:delete' }
      ]
    },
    {
      title: 'إدارة الموظفين',
      key: 'employees',
      children: [
        { title: 'عرض الموظفين', key: 'employees:view' },
        { title: 'إضافة موظف', key: 'employees:create' },
        { title: 'تعديل الموظف', key: 'employees:edit' },
        { title: 'حذف الموظف', key: 'employees:delete' }
      ]
    },
    {
      title: 'إدارة السيارات',
      key: 'cars',
      children: [
        { title: 'عرض السيارات', key: 'cars:view' },
        { title: 'إضافة سيارة', key: 'cars:create' },
        { title: 'تعديل السيارة', key: 'cars:edit' },
        { title: 'حذف السيارة', key: 'cars:delete' }
      ]
    },
    {
      title: 'إدارة المغاسل',
      key: 'laundries',
      children: [
        { title: 'عرض المغاسل', key: 'laundries:view' },
        { title: 'إضافة مغسلة', key: 'laundries:create' },
        { title: 'تعديل المغسلة', key: 'laundries:edit' },
        { title: 'حذف المغسلة', key: 'laundries:delete' }
      ]
    },
    {
      title: 'التقارير',
      key: 'reports',
      children: [
        { title: 'عرض التقارير', key: 'reports:view' },
        { title: 'إنشاء تقرير', key: 'reports:create' },
        { title: 'تصدير التقارير', key: 'reports:export' }
      ]
    },
    {
      title: 'الإعدادات',
      key: 'settings',
      children: [
        { title: 'عرض الإعدادات', key: 'settings:view' },
        { title: 'تعديل الإعدادات', key: 'settings:edit' },
        { title: 'إدارة الأدوار', key: 'settings:roles' },
        { title: 'إدارة المستخدمين', key: 'settings:users' }
      ]
    }
  ];

  const items = [
    {
      key: 'roles',
      label: (
        <Space>
          <TeamOutlined />
          <span>إدارة الأدوار</span>
        </Space>
      ),
      children: (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddRole}
            >
              إضافة دور جديد
            </Button>
          </div>
          
          <Table
            columns={roleColumns}
            dataSource={roles}
            loading={loading}
            rowKey="id"
            pagination={{
              total: roles.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} من ${total} دور`
            }}
          />
        </div>
      )
    },
    {
      key: 'users',
      label: (
        <Space>
          <UserOutlined />
          <span>إدارة المستخدمين</span>
        </Space>
      ),
      children: (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddUser}
            >
              إضافة مستخدم جديد
            </Button>
          </div>
          
          <Table
            columns={userColumns}
            dataSource={users}
            loading={loading}
            rowKey="id"
            pagination={{
              total: users.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} من ${total} مستخدم`
            }}
          />
        </div>
      )
    },
    {
      key: 'permissions',
      label: (
        <Space>
          <LockOutlined />
          <span>الصلاحيات</span>
        </Space>
      ),
      children: (
        <div>
          <Alert
            message="شجرة الصلاحيات"
            description="يمكنك تحديد الصلاحيات المطلوبة لكل دور من خلال تحديد العناصر المطلوبة في الشجرة أدناه."
            type="info"
            showIcon
            style={{ marginBottom: '16px' }}
          />
          
          <Tree
            checkable
            treeData={permissionTreeData}
            defaultExpandAll
            style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}
          />
        </div>
      )
    }
  ];

  return (
    <div className="permissions-page">
      <div className="page-header">
        <h1>إدارة الصلاحيات والأدوار</h1>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchData}
            loading={loading}
          >
            تحديث
          </Button>
          <Button
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            تصدير
          </Button>
        </Space>
      </div>

      <Tabs
        items={items}
        defaultActiveKey="roles"
        size="large"
        style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px' }}
      />

      {/* Role Modal */}
      <Modal
        title={selectedRole ? 'تعديل الدور' : 'إضافة دور جديد'}
        open={roleModalVisible}
        onCancel={() => setRoleModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={roleForm}
          layout="vertical"
          onFinish={handleSaveRole}
        >
          <Form.Item
            name="name"
            label="اسم الدور"
            rules={[{ required: true, message: 'يرجى إدخال اسم الدور' }]}
          >
            <Input placeholder="مثال: مدير، موظف، عميل" />
          </Form.Item>

          <Form.Item
            name="key"
            label="مفتاح الدور"
            rules={[{ required: true, message: 'يرجى إدخال مفتاح الدور' }]}
          >
            <Input placeholder="مثال: manager, employee, customer" />
          </Form.Item>

          <Form.Item
            name="description"
            label="وصف الدور"
            rules={[{ required: true, message: 'يرجى إدخال وصف الدور' }]}
          >
            <TextArea rows={3} placeholder="وصف مختصر للدور والصلاحيات الممنوحة" />
          </Form.Item>

          <Form.Item
            name="status"
            label="الحالة"
            rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
          >
            <Select placeholder="اختر الحالة">
              <Option value="active">نشط</Option>
              <Option value="inactive">غير نشط</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="permissions"
            label="الصلاحيات"
          >
            <Tree
              checkable
              treeData={permissionTreeData}
              defaultExpandAll
              style={{ maxHeight: '300px', overflow: 'auto' }}
            />
          </Form.Item>

          <div className="form-actions">
            <Button onClick={() => setRoleModalVisible(false)}>
              إلغاء
            </Button>
            <Button type="primary" htmlType="submit">
              {selectedRole ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* User Modal */}
      <Modal
        title={selectedUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
        open={userModalVisible}
        onCancel={() => setUserModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={userForm}
          layout="vertical"
          onFinish={handleSaveUser}
        >
          <Form.Item
            name="name"
            label="اسم المستخدم"
            rules={[{ required: true, message: 'يرجى إدخال اسم المستخدم' }]}
          >
            <Input placeholder="الاسم الكامل" />
          </Form.Item>

          <Form.Item
            name="email"
            label="البريد الإلكتروني"
            rules={[
              { required: true, message: 'يرجى إدخال البريد الإلكتروني' },
              { type: 'email', message: 'يرجى إدخال بريد إلكتروني صحيح' }
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            name="roleId"
            label="الدور"
            rules={[{ required: true, message: 'يرجى اختيار الدور' }]}
          >
            <Select placeholder="اختر الدور">
              {roles.map(role => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="الحالة"
            rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
          >
            <Select placeholder="اختر الحالة">
              <Option value="active">نشط</Option>
              <Option value="inactive">غير نشط</Option>
            </Select>
          </Form.Item>

          {!selectedUser && (
            <Form.Item
              name="password"
              label="كلمة المرور"
              rules={[{ required: true, message: 'يرجى إدخال كلمة المرور' }]}
            >
              <Input.Password placeholder="كلمة المرور" />
            </Form.Item>
          )}

          <div className="form-actions">
            <Button onClick={() => setUserModalVisible(false)}>
              إلغاء
            </Button>
            <Button type="primary" htmlType="submit">
              {selectedUser ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Permissions; 