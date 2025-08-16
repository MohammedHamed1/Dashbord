import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Table,
  Button,
  Space,
  Tag,
  Statistic,
  Row,
  Col,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Tooltip,
  Progress,
  Alert,
  Divider,
  Avatar,
  List,
  Descriptions,
  Tabs,
  Badge,
  Switch,
  Timeline,
  Rate
} from 'antd';
import {
  InboxOutlined,
  ShoppingCartOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  ReloadOutlined,
  FilterOutlined,
  TrophyOutlined,
  WarningOutlined,
  PlusOutlined,
  MinusOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRole } from '../context/RoleContext';
import { getInventory, getUsersData, getOrders, getBranches } from '../data/mockData';
import { useToast } from '../utils/toastService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const Inventory = () => {
  const { t } = useTranslation();
  const { currentRole } = useRole();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    branch: 'all',
    lowStock: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inventoryData, usersData, ordersData, branchesData] = await Promise.all([
        getInventory(),
        getUsersData(),
        getOrders(),
        getBranches()
      ]);
      setInventory(inventoryData);
      setUsers(usersData);
      setOrders(ordersData);
      setBranches(branchesData);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // إحصائيات المخزون
  const getInventoryStats = () => {
    const totalItems = inventory.length;
    const lowStockItems = inventory.filter(item => item.quantity <= item.minQuantity).length;
    const outOfStockItems = inventory.filter(item => item.quantity === 0).length;
    const activeItems = inventory.filter(item => item.status === 'active').length;
    
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const lowStockValue = inventory
      .filter(item => item.quantity <= item.minQuantity)
      .reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    const averagePrice = totalItems > 0 ? (inventory.reduce((sum, item) => sum + item.price, 0) / totalItems).toFixed(2) : 0;
    const stockUtilization = totalItems > 0 ? ((activeItems / totalItems) * 100).toFixed(1) : 0;

    // توزيع فئات المخزون
    const inventoryCategories = {};
    inventory.forEach(item => {
      const category = item.category;
      inventoryCategories[category] = (inventoryCategories[category] || 0) + 1;
    });

    // توزيع الحالة
    const inventoryStatus = {};
    inventory.forEach(item => {
      const status = item.status;
      inventoryStatus[status] = (inventoryStatus[status] || 0) + 1;
    });

    return {
      totalItems,
      lowStockItems,
      outOfStockItems,
      activeItems,
      totalValue,
      lowStockValue,
      averagePrice,
      stockUtilization,
      inventoryCategories,
      inventoryStatus
    };
  };

  const stats = getInventoryStats();

  // أعمدة الجدول
  const columns = [
    {
      title: 'الصورة',
      dataIndex: 'image',
      key: 'image',
      render: (image, record) => (
        <Avatar 
          src={image} 
          size={40}
          style={{ backgroundColor: '#f0f0f0' }}
        >
          {record.name?.charAt(0)}
        </Avatar>
      )
    },
    {
      title: 'اسم المنتج',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div>
          <div>{name}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.sku}
          </Text>
        </div>
      )
    },
    {
      title: 'الفئة',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const categoryNames = {
          detergents: 'منظفات',
          softeners: 'منعمات',
          chemicals: 'مواد كيميائية',
          equipment: 'معدات',
          supplies: 'مستلزمات',
          other: 'أخرى'
        };
        return <Tag color="purple">{categoryNames[category] || category}</Tag>;
      }
    },
    {
      title: 'الكمية',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => {
        const isLowStock = quantity <= record.minQuantity;
        const isOutOfStock = quantity === 0;
        
        let color = 'green';
        if (isOutOfStock) color = 'red';
        else if (isLowStock) color = 'orange';
        
        return (
          <Space>
            <Tag color={color}>{quantity}</Tag>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              من {record.maxQuantity}
            </Text>
          </Space>
        );
      }
    },
    {
      title: 'السعر',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <Space>
          <DollarOutlined style={{ color: '#52c41a' }} />
          <Text strong>{price} ريال</Text>
        </Space>
      )
    },
    {
      title: 'القيمة الإجمالية',
      key: 'totalValue',
      render: (_, record) => (
        <Space>
          <DollarOutlined style={{ color: '#1890ff' }} />
          <Text strong>{(record.quantity * record.price).toFixed(2)} ريال</Text>
        </Space>
      )
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
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          active: { color: 'green', text: 'نشط', icon: <CheckCircleOutlined /> },
          inactive: { color: 'red', text: 'غير نشط', icon: <CloseCircleOutlined /> },
          pending: { color: 'orange', text: 'قيد المراجعة', icon: <ClockCircleOutlined /> }
        };
        const config = statusConfig[status] || { color: 'default', text: status, icon: null };
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      }
    },
    {
      title: 'آخر تحديث',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString('ar-SA')
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="عرض التفاصيل">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => showItemDetails(record)}
            />
          </Tooltip>
          <Tooltip title="إضافة كمية">
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => addStock(record)}
            />
          </Tooltip>
          <Tooltip title="سحب كمية">
            <Button
              type="text"
              icon={<MinusOutlined />}
              onClick={() => removeStock(record)}
            />
          </Tooltip>
          <Tooltip title="تعديل">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => editItem(record)}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteItem(record.id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const showItemDetails = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const addStock = (item) => {
    setSelectedItem({ ...item, action: 'add' });
    form.setFieldsValue({
      quantity: 0,
      reason: '',
      notes: ''
    });
    setModalVisible(true);
  };

  const removeStock = (item) => {
    setSelectedItem({ ...item, action: 'remove' });
    form.setFieldsValue({
      quantity: 0,
      reason: '',
      notes: ''
    });
    setModalVisible(true);
  };

  const editItem = (item) => {
    setSelectedItem({ ...item, action: 'edit' });
    form.setFieldsValue({
      name: item.name,
      category: item.category,
      price: item.price,
      minQuantity: item.minQuantity,
      maxQuantity: item.maxQuantity,
      status: item.status
    });
    setModalVisible(true);
  };

  const deleteItem = async (id) => {
    try {
      setInventory(inventory.filter(item => item.id !== id));
      toast.success('تم حذف المنتج بنجاح');
    } catch (error) {
      toast.error('خطأ في حذف المنتج');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (selectedItem.action === 'add') {
        const updatedInventory = inventory.map(item =>
          item.id === selectedItem.id ? { ...item, quantity: item.quantity + values.quantity } : item
        );
        setInventory(updatedInventory);
        toast.success('تم إضافة الكمية بنجاح');
      } else if (selectedItem.action === 'remove') {
        const updatedInventory = inventory.map(item =>
          item.id === selectedItem.id ? { ...item, quantity: Math.max(0, item.quantity - values.quantity) } : item
        );
        setInventory(updatedInventory);
        toast.success('تم سحب الكمية بنجاح');
      } else if (selectedItem.action === 'edit') {
        const updatedInventory = inventory.map(item =>
          item.id === selectedItem.id ? { ...item, ...values } : item
        );
        setInventory(updatedInventory);
        toast.success('تم تحديث المنتج بنجاح');
      }
      
      setModalVisible(false);
      setSelectedItem(null);
      form.resetFields();
    } catch (error) {
      toast.error('خطأ في حفظ البيانات');
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedItem(null);
    form.resetFields();
  };

  const exportData = () => {
    toast.success('تم تصدير البيانات بنجاح');
  };

  const filteredInventory = inventory.filter(item => {
    if (filters.category !== 'all' && item.category !== filters.category) return false;
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.branch !== 'all' && item.branchId !== parseInt(filters.branch)) return false;
    if (filters.lowStock && item.quantity > item.minQuantity) return false;
    return true;
  });

  const getModalTitle = () => {
    if (!selectedItem) return '';
    switch (selectedItem.action) {
      case 'add': return 'إضافة كمية للمخزون';
      case 'remove': return 'سحب كمية من المخزون';
      case 'edit': return 'تعديل المنتج';
      default: return 'تفاصيل المنتج';
    }
  };

  return (
    <Layout style={{ padding: '24px', background: '#f5f6fa' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <InboxOutlined style={{ marginRight: 8 }} />
          إدارة المخزون
        </Title>
        <Text type="secondary">
          إدارة المخزون والمواد والمتابعة
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card>
            <Statistic
              title="إجمالي المنتجات"
              value={stats.totalItems}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="منتجات منخفضة"
              value={stats.lowStockItems}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="نفذت من المخزون"
              value={stats.outOfStockItems}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="القيمة الإجمالية"
              value={stats.totalValue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="ريال"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="متوسط السعر"
              value={stats.averagePrice}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#722ed1' }}
              suffix="ريال"
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="معدل الاستخدام"
              value={stats.stockUtilization}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#eb2f96' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* توزيع البيانات */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="توزيع فئات المخزون">
            {Object.entries(stats.inventoryCategories).map(([category, count]) => {
              const categoryNames = {
                detergents: 'منظفات',
                softeners: 'منعمات',
                chemicals: 'مواد كيميائية',
                equipment: 'معدات',
                supplies: 'مستلزمات',
                other: 'أخرى'
              };
              const colors = {
                detergents: '#1890ff',
                softeners: '#52c41a',
                chemicals: '#faad14',
                equipment: '#722ed1',
                supplies: '#eb2f96',
                other: '#8c8c8c'
              };
              return (
                <div key={category} style={{ marginBottom: 8 }}>
                  <Space>
                    <Text>{categoryNames[category] || category}</Text>
                    <Progress
                      percent={stats.totalItems > 0 ? (count / stats.totalItems * 100).toFixed(1) : 0}
                      size="small"
                      strokeColor={colors[category]}
                      showInfo={false}
                      style={{ width: 200 }}
                    />
                    <Text>{count}</Text>
                  </Space>
                </div>
              );
            })}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="المنتجات منخفضة المخزون">
            <List
              size="small"
              dataSource={inventory.filter(item => item.quantity <= item.minQuantity).slice(0, 5)}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.image} style={{ backgroundColor: '#f0f0f0' }}>
                        {item.name?.charAt(0)}
                      </Avatar>
                    }
                    title={
                      <Space>
                        <Text>{item.name}</Text>
                        <Tag color="orange">{item.quantity}</Tag>
                      </Space>
                    }
                    description={
                      <Text type="secondary">
                        الحد الأدنى: {item.minQuantity} - السعر: {item.price} ريال
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* معلومات سريعة */}
      <Alert
        message="معلومات مهمة"
        description="يتم إرسال تنبيهات تلقائية عند انخفاض المخزون عن الحد الأدنى. يجب مراجعة المخزون بانتظام لتجنب نفاد المواد."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* أدوات التحكم */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={4}>
            <Select
              placeholder="الفئة"
              style={{ width: '100%' }}
              value={filters.category}
              onChange={(value) => setFilters({ ...filters, category: value })}
            >
              <Option value="all">جميع الفئات</Option>
              <Option value="detergents">منظفات</Option>
              <Option value="softeners">منعمات</Option>
              <Option value="chemicals">مواد كيميائية</Option>
              <Option value="equipment">معدات</Option>
              <Option value="supplies">مستلزمات</Option>
              <Option value="other">أخرى</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="الحالة"
              style={{ width: '100%' }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="all">جميع الحالات</Option>
              <Option value="active">نشط</Option>
              <Option value="inactive">غير نشط</Option>
              <Option value="pending">قيد المراجعة</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="الفرع"
              style={{ width: '100%' }}
              value={filters.branch}
              onChange={(value) => setFilters({ ...filters, branch: value })}
            >
              <Option value="all">جميع الفروع</Option>
              {branches.map(branch => (
                <Option key={branch.id} value={branch.id.toString()}>
                  {branch.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Switch
              checked={filters.lowStock}
              onChange={(checked) => setFilters({ ...filters, lowStock: checked })}
              checkedChildren="منخفضة فقط"
              unCheckedChildren="جميع المنتجات"
            />
          </Col>
          <Col span={6}>
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
                onClick={exportData}
              >
                تصدير
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* جدول المخزون */}
      <Card title="قائمة المخزون">
        <Table
          columns={columns}
          dataSource={filteredInventory}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredInventory.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} منتج`
          }}
        />
      </Card>

      {/* Modal تفاصيل/تعديل المنتج */}
      <Modal
        title={getModalTitle()}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        {selectedItem ? (
          <div>
            {selectedItem.action === 'edit' ? (
              <Form form={form} layout="vertical">
                <Form.Item
                  name="name"
                  label="اسم المنتج"
                  rules={[{ required: true, message: 'يرجى إدخال اسم المنتج' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="category"
                  label="الفئة"
                  rules={[{ required: true, message: 'يرجى اختيار الفئة' }]}
                >
                  <Select>
                    <Option value="detergents">منظفات</Option>
                    <Option value="softeners">منعمات</Option>
                    <Option value="chemicals">مواد كيميائية</Option>
                    <Option value="equipment">معدات</Option>
                    <Option value="supplies">مستلزمات</Option>
                    <Option value="other">أخرى</Option>
                  </Select>
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="price"
                      label="السعر"
                      rules={[{ required: true, message: 'يرجى إدخال السعر' }]}
                    >
                      <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        suffix="ريال"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="status"
                      label="الحالة"
                      rules={[{ required: true, message: 'يرجى اختيار الحالة' }]}
                    >
                      <Select>
                        <Option value="active">نشط</Option>
                        <Option value="inactive">غير نشط</Option>
                        <Option value="pending">قيد المراجعة</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="minQuantity"
                      label="الحد الأدنى"
                      rules={[{ required: true, message: 'يرجى إدخال الحد الأدنى' }]}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="maxQuantity"
                      label="الحد الأقصى"
                      rules={[{ required: true, message: 'يرجى إدخال الحد الأقصى' }]}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : selectedItem.action === 'add' || selectedItem.action === 'remove' ? (
              <Form form={form} layout="vertical">
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="المنتج" span={2}>
                    {selectedItem.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="الكمية الحالية">
                    {selectedItem.quantity}
                  </Descriptions.Item>
                  <Descriptions.Item label="الحد الأدنى">
                    {selectedItem.minQuantity}
                  </Descriptions.Item>
                </Descriptions>
                <Divider />
                <Form.Item
                  name="quantity"
                  label={selectedItem.action === 'add' ? 'الكمية المضافة' : 'الكمية المسحوبة'}
                  rules={[{ required: true, message: 'يرجى إدخال الكمية' }]}
                >
                  <InputNumber
                    min={1}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item
                  name="reason"
                  label="السبب"
                  rules={[{ required: true, message: 'يرجى إدخال السبب' }]}
                >
                  <Select>
                    <Option value="purchase">شراء</Option>
                    <Option value="usage">استخدام</Option>
                    <Option value="damage">تلف</Option>
                    <Option value="expiry">انتهاء صلاحية</Option>
                    <Option value="other">أخرى</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="notes"
                  label="ملاحظات"
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Form>
            ) : (
              <Descriptions bordered column={2}>
                <Descriptions.Item label="اسم المنتج" span={2}>
                  {selectedItem.name}
                </Descriptions.Item>
                <Descriptions.Item label="رمز المنتج">
                  {selectedItem.sku}
                </Descriptions.Item>
                <Descriptions.Item label="الفئة">
                  {selectedItem.category === 'detergents' ? 'منظفات' :
                   selectedItem.category === 'softeners' ? 'منعمات' :
                   selectedItem.category === 'chemicals' ? 'مواد كيميائية' :
                   selectedItem.category === 'equipment' ? 'معدات' :
                   selectedItem.category === 'supplies' ? 'مستلزمات' : 'أخرى'}
                </Descriptions.Item>
                <Descriptions.Item label="الكمية">
                  <Tag color={selectedItem.quantity <= selectedItem.minQuantity ? 'orange' : 'green'}>
                    {selectedItem.quantity}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="السعر">
                  {selectedItem.price} ريال
                </Descriptions.Item>
                <Descriptions.Item label="القيمة الإجمالية">
                  {(selectedItem.quantity * selectedItem.price).toFixed(2)} ريال
                </Descriptions.Item>
                <Descriptions.Item label="الحد الأدنى">
                  {selectedItem.minQuantity}
                </Descriptions.Item>
                <Descriptions.Item label="الحد الأقصى">
                  {selectedItem.maxQuantity}
                </Descriptions.Item>
                <Descriptions.Item label="الحالة">
                  <Tag color={selectedItem.status === 'active' ? 'green' : 'red'}>
                    {selectedItem.status === 'active' ? 'نشط' : 'غير نشط'}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="آخر تحديث">
                  {new Date(selectedItem.updatedAt).toLocaleDateString('ar-SA')}
                </Descriptions.Item>
              </Descriptions>
            )}
          </div>
        ) : null}
      </Modal>
    </Layout>
  );
};

export default Inventory; 