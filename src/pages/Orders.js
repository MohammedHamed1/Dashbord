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
  Descriptions,
  Badge,
  InputNumber,
  Typography,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  QrcodeOutlined,
  StarOutlined,
  GiftOutlined
} from '@ant-design/icons';
import { getOrders, createOrder, updateOrder, getUsersData } from '../data/mockData';
import { useRole, useRoleGuard } from '../context/RoleContext';
import QRCodeGenerator from '../components/QRCodeGenerator';
import RatingSystem from '../components/RatingSystem';
import { 
  formatDate, 
  formatNumber, 
  renderCustomer, 
  renderOrderStatus, 
  renderActions 
} from '../utils/tableUtils';
import CrossCheckWidget from '../components/CrossCheck/CrossCheckWidget';
import { generateCrossCheckData } from '../utils/crossCheckData';

const { Option } = Select;
const { TextArea } = Input;
const { Text, Title } = Typography;

const Orders = () => {
  const { currentRole } = useRole();
  const allowed = useRoleGuard(['admin', 'laundry', 'employee']);
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [form] = Form.useForm();
  const [crossCheckData, setCrossCheckData] = useState(null);
  
  useEffect(() => {
    if (allowed) {
      fetchOrders();
      // تحميل بيانات الفحص
      setCrossCheckData(generateCrossCheckData('orders'));
    }
  }, [allowed]);

  if (!allowed) return <div>غير مصرح لك بالوصول لهذه الصفحة</div>;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      message.error('فشل في تحميل بيانات الطلبات');
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshCrossCheck = () => {
    setCrossCheckData(generateCrossCheckData('orders'));
  };

  const handleAdd = () => {
    setEditingOrder(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingOrder(record);
    form.setFieldsValue({
      ...record,
      branchName: record.branchName,
      items: record.items ? record.items.map(item => `${item.name} - ${item.quantity} قطعة - ${item.price} ريال`).join('\n') : ''
    });
    setModalVisible(true);
  };

  const handleView = (record) => {
    setViewingOrder(record);
    setViewModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await getUsersData(id); // Using getUsersData for orders temporarily
      message.success('تم حذف الطلب بنجاح');
      fetchOrders();
    } catch (error) {
      message.error('فشل في حذف الطلب');
    }
  };

  const handleSubmit = async (values) => {
    try {
      // Parse items from text
      const items = values.items.split('\n').map(item => {
        const [name, quantity, price] = item.split(' - ');
        return {
          name: name.trim(),
          quantity: parseInt(quantity.split(' ')[0]),
          price: parseFloat(price.split(' ')[0])
        };
      });

      const orderData = {
        ...values,
        branchName: values.branchName,
        items,
        totalAmount: items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
      };

      if (editingOrder) {
        await updateOrder(editingOrder.id, orderData);
        message.success('تم تحديث الطلب بنجاح');
      } else {
        await createOrder(orderData);
        message.success('تم إضافة الطلب بنجاح');
      }
      setModalVisible(false);
      fetchOrders();
    } catch (error) {
      message.error('فشل في حفظ الطلب');
    }
  };

  const columns = [
    {
      title: 'رقم الطلب',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Text strong>#{id}</Text>,
      className: 'number-cell'
    },
    {
      title: 'العميل',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (name, record) => renderCustomer(record.customerId, []),
      className: 'customer-cell'
    },
    {
      title: 'المغسلة',
      dataIndex: 'branchName',
      key: 'branchName',
      render: (branchName) => (
        <Tag color="blue">
          {branchName || 'غير محدد'}
        </Tag>
      ),
      filters: [
        { text: 'الفرع الرئيسي', value: 'الفرع الرئيسي' },
        { text: 'فرع الرياض', value: 'فرع الرياض' },
      ],
      onFilter: (value, record) => record.branchName === value,
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: renderOrderStatus,
      className: 'status-cell',
      filters: [
        { text: 'مكتمل', value: 'completed' },
        { text: 'قيد التنفيذ', value: 'in_progress' },
        { text: 'في الانتظار', value: 'pending' },
        { text: 'ملغي', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'المبلغ الإجمالي',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => formatNumber(amount),
      className: 'amount-cell',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'تاريخ الطلب',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: formatDate,
      className: 'date-cell',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => renderActions(record, {
        onView: () => handleView(record),
        onEdit: () => handleEdit(record),
        onDelete: () => handleDelete(record.id)
      }),
      className: 'actions-cell'
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>إدارة الطلبات</Title>
        <Text type="secondary">إدارة جميع طلبات غسيل السيارات</Text>
      </div>

      {/* مكون فحص الطلبات */}
      {crossCheckData && (
        <div style={{ marginBottom: 24 }}>
          <CrossCheckWidget
            sectionName="orders"
            sectionData={crossCheckData}
            onRefresh={handleRefreshCrossCheck}
            showDetails={true}
          />
        </div>
      )}

      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd}
            >
              إضافة طلب جديد
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={orders}
          loading={loading}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `عرض ${range[0]}-${range[1]} من ${total} طلب`,
            pageSizeOptions: ['10', '20', '50', '100'],
            defaultPageSize: 20
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Modal إضافة/تعديل طلب */}
      <Modal
        title={editingOrder ? 'تعديل الطلب' : 'إضافة طلب جديد'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerName"
                label="اسم العميل"
                rules={[{ required: true, message: 'يرجى إدخال اسم العميل' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="branchName"
                label="المغسلة"
                rules={[{ required: true, message: 'يرجى اختيار المغسلة' }]}
              >
                <Select placeholder="اختر المغسلة">
                  <Option value="الفرع الرئيسي">الفرع الرئيسي</Option>
                  <Option value="فرع الرياض">فرع الرياض</Option>
                  <Option value="فرع جدة">فرع جدة</Option>
                  <Option value="فرع الدمام">فرع الدمام</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="حالة الطلب"
                rules={[{ required: true, message: 'يرجى اختيار حالة الطلب' }]}
              >
                <Select placeholder="اختر الحالة">
                  <Option value="pending">قيد الانتظار</Option>
                  <Option value="in_progress">قيد المعالجة</Option>
                  <Option value="completed">مكتمل</Option>
                  <Option value="cancelled">ملغي</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="الأولوية"
                rules={[{ required: true, message: 'يرجى اختيار الأولوية' }]}
              >
                <Select placeholder="اختر الأولوية">
                  <Option value="low">منخفضة</Option>
                  <Option value="medium">متوسطة</Option>
                  <Option value="high">عالية</Option>
                  <Option value="critical">حرجة</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="items"
            label="الخدمات المطلوبة"
            rules={[{ required: true, message: 'يرجى إدخال الخدمات المطلوبة' }]}
            extra="اكتب كل خدمة في سطر منفصل بالشكل: اسم الخدمة - الكمية - السعر"
          >
            <TextArea 
              rows={4} 
              placeholder="مثال: غسيل خارجي - 1 قطعة - 50 ريال"
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label="ملاحظات"
          >
            <TextArea rows={3} placeholder="أي ملاحظات إضافية..." />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingOrder ? 'تحديث الطلب' : 'إضافة الطلب'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                إلغاء
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal عرض تفاصيل الطلب */}
      <Modal
        title="تفاصيل الطلب"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {viewingOrder && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="رقم الطلب">
                <Text strong>#{viewingOrder.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="اسم العميل">
                {viewingOrder.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="المغسلة">
                <Tag color="blue">{viewingOrder.branchName}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="حالة الطلب">
                {renderOrderStatus(viewingOrder.status)}
              </Descriptions.Item>
              <Descriptions.Item label="المبلغ الإجمالي">
                <Text strong style={{ color: '#52c41a' }}>
                  {formatNumber(viewingOrder.totalAmount)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="تاريخ الطلب">
                {formatDate(viewingOrder.createdAt, true)}
              </Descriptions.Item>
              <Descriptions.Item label="الملاحظات" span={2}>
                {viewingOrder.notes || 'لا توجد ملاحظات'}
              </Descriptions.Item>
            </Descriptions>

            {viewingOrder.items && viewingOrder.items.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <Title level={5}>الخدمات المطلوبة</Title>
                <Table
                  dataSource={viewingOrder.items}
                  columns={[
                    {
                      title: 'الخدمة',
                      dataIndex: 'name',
                      key: 'name'
                    },
                    {
                      title: 'الكمية',
                      dataIndex: 'quantity',
                      key: 'quantity',
                      render: (quantity) => `${quantity} قطعة`
                    },
                    {
                      title: 'السعر',
                      dataIndex: 'price',
                      key: 'price',
                      render: (price) => formatNumber(price)
                    },
                    {
                      title: 'الإجمالي',
                      key: 'total',
                      render: (_, record) => formatNumber(record.quantity * record.price)
                    }
                  ]}
                  pagination={false}
                  size="small"
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders; 