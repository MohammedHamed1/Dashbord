import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Switch,
  message,
  Table,
  Modal,
  Tooltip,
  Popconfirm,
  Badge,
  List,
  Tag
} from 'antd';
import {
  GlobalOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SaveOutlined,
  CopyOutlined,
  SettingOutlined,
  MenuOutlined,
  FileOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const PagesEditor = ({ data, onSave }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pages, setPages] = useState(data || []);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [saving, setSaving] = useState(false);

  // تهيئة البيانات
  React.useEffect(() => {
    if (data) {
      setPages(data);
    }
  }, [data]);

  // إضافة صفحة جديدة
  const handleAddPage = () => {
    setEditingPage(null);
    form.resetFields();
    setModalVisible(true);
  };

  // تعديل صفحة
  const handleEditPage = (page) => {
    setEditingPage(page);
    form.setFieldsValue(page);
    setModalVisible(true);
  };

  // حذف صفحة
  const handleDeletePage = (id) => {
    const updatedPages = pages.filter(page => page.id !== id);
    setPages(updatedPages);
    message.success('تم حذف الصفحة بنجاح');
  };

  // نسخ صفحة
  const handleCopyPage = (page) => {
    const newPage = {
      ...page,
      id: Date.now(),
      title: `${page.title} (نسخة)`,
      slug: `${page.slug}-copy`,
      order: pages.length + 1
    };
    setPages([...pages, newPage]);
    message.success('تم نسخ الصفحة بنجاح');
  };

  // حفظ صفحة
  const handleSavePage = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingPage) {
        // تحديث صفحة موجودة
        const updatedPages = pages.map(page =>
          page.id === editingPage.id ? { ...page, ...values } : page
        );
        setPages(updatedPages);
        message.success('تم تحديث الصفحة بنجاح');
      } else {
        // إضافة صفحة جديدة
        const newPage = {
          id: Date.now(),
          ...values,
          order: pages.length + 1,
          createdAt: new Date().toISOString()
        };
        setPages([...pages, newPage]);
        message.success('تم إضافة الصفحة بنجاح');
      }
      
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('فشل في حفظ الصفحة');
    }
  };

  // حفظ جميع الصفحات
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await onSave(pages);
      message.success('تم حفظ جميع الصفحات بنجاح');
    } catch (error) {
      message.error('فشل في حفظ الصفحات');
    } finally {
      setSaving(false);
    }
  };

  // تغيير حالة الصفحة
  const handleToggleStatus = (id) => {
    const updatedPages = pages.map(page =>
      page.id === id ? { ...page, active: !page.active } : page
    );
    setPages(updatedPages);
  };

  // تغيير ترتيب الصفحة
  const handleChangeOrder = (id, newOrder) => {
    const updatedPages = pages.map(page =>
      page.id === id ? { ...page, order: newOrder } : page
    );
    setPages(updatedPages.sort((a, b) => a.order - b.order));
  };

  // أعمدة الجدول
  const columns = [
    {
      title: 'العنوان',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <FileOutlined />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: 'الرابط',
      dataIndex: 'slug',
      key: 'slug',
      render: (text) => (
        <Text code>/ {text}</Text>
      )
    },
    {
      title: 'الترتيب',
      dataIndex: 'order',
      key: 'order',
      render: (order, record) => (
        <Select
          value={order}
          onChange={(value) => handleChangeOrder(record.id, value)}
          style={{ width: 80 }}
        >
          {pages.map((_, index) => (
            <Option key={index + 1} value={index + 1}>
              {index + 1}
            </Option>
          ))}
        </Select>
      )
    },
    {
      title: 'القائمة',
      dataIndex: 'showInMenu',
      key: 'showInMenu',
      render: (show, record) => (
        <Switch
          checked={show}
          onChange={() => {
            const updatedPages = pages.map(page =>
              page.id === record.id ? { ...page, showInMenu: !show } : page
            );
            setPages(updatedPages);
          }}
        />
      )
    },
    {
      title: 'التذييل',
      dataIndex: 'showInFooter',
      key: 'showInFooter',
      render: (show, record) => (
        <Switch
          checked={show}
          onChange={() => {
            const updatedPages = pages.map(page =>
              page.id === record.id ? { ...page, showInFooter: !show } : page
            );
            setPages(updatedPages);
          }}
        />
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'active',
      key: 'active',
      render: (active, record) => (
        <Space>
          <Badge 
            status={active ? 'success' : 'default'} 
            text={active ? 'نشطة' : 'غير نشطة'} 
          />
          <Switch
            checked={active}
            onChange={() => handleToggleStatus(record.id)}
          />
        </Space>
      )
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="تعديل">
            <Button 
              type="text" 
              icon={<EditOutlined />}
              onClick={() => handleEditPage(record)}
            />
          </Tooltip>
          <Tooltip title="نسخ">
            <Button 
              type="text" 
              icon={<CopyOutlined />}
              onClick={() => handleCopyPage(record)}
            />
          </Tooltip>
          <Tooltip title="معاينة">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => window.open(`/${record.slug}`, '_blank')}
            />
          </Tooltip>
          <Tooltip title="حذف">
            <Popconfirm
              title="هل أنت متأكد من حذف هذه الصفحة؟"
              onConfirm={() => handleDeletePage(record.id)}
            >
              <Button 
                type="text" 
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div className="pages-editor">
      <div className="editor-header">
        <Title level={3}>
          <GlobalOutlined /> محرر الصفحات
        </Title>
        <Text type="secondary">
          إدارة صفحات موقع PayPass
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* قائمة الصفحات */}
        <Col xs={24} lg={16}>
          <Card 
            title="الصفحات" 
            className="pages-card"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddPage}
              >
                إضافة صفحة
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={pages}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* إحصائيات وإعدادات */}
        <Col xs={24} lg={8}>
          <Card title="إحصائيات الصفحات" className="stats-card">
            <List
              dataSource={[
                { label: 'إجمالي الصفحات', value: pages.length },
                { label: 'الصفحات النشطة', value: pages.filter(p => p.active).length },
                { label: 'في القائمة الرئيسية', value: pages.filter(p => p.showInMenu).length },
                { label: 'في التذييل', value: pages.filter(p => p.showInFooter).length }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <Text>{item.label}:</Text>
                    <Text strong>{item.value}</Text>
                  </Space>
                </List.Item>
              )}
            />
          </Card>

          <Card title="إعدادات سريعة" className="quick-settings-card" style={{ marginTop: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                block
                onClick={() => {
                  const updatedPages = pages.map(page => ({ ...page, active: true }));
                  setPages(updatedPages);
                }}
              >
                تفعيل جميع الصفحات
              </Button>
              <Button 
                block
                onClick={() => {
                  const updatedPages = pages.map(page => ({ ...page, active: false }));
                  setPages(updatedPages);
                }}
              >
                إلغاء تفعيل جميع الصفحات
              </Button>
              <Button 
                block
                onClick={() => {
                  const updatedPages = pages.map(page => ({ ...page, showInMenu: true }));
                  setPages(updatedPages);
                }}
              >
                إظهار جميع الصفحات في القائمة
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* نافذة إضافة/تعديل صفحة */}
      <Modal
        title={editingPage ? 'تعديل صفحة' : 'إضافة صفحة جديدة'}
        open={modalVisible}
        onOk={handleSavePage}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        width={600}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="title" 
                label="عنوان الصفحة"
                rules={[{ required: true, message: 'العنوان مطلوب' }]}
              >
                <Input placeholder="عنوان الصفحة" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="slug" 
                label="الرابط"
                rules={[{ required: true, message: 'الرابط مطلوب' }]}
              >
                <Input placeholder="اسم-الصفحة" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="وصف الصفحة">
            <Input.TextArea rows={3} placeholder="وصف مختصر للصفحة" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="showInMenu" label="في القائمة" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="showInFooter" label="في التذييل" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="active" label="نشطة" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="template" label="قالب الصفحة">
            <Select defaultValue="default">
              <Option value="default">القالب الافتراضي</Option>
              <Option value="landing">صفحة هبوط</Option>
              <Option value="contact">صفحة اتصال</Option>
              <Option value="about">صفحة من نحن</Option>
              <Option value="blog">صفحة مدونة</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* أزرار الإجراءات */}
      <Card className="actions-card" style={{ marginTop: 24 }}>
        <Space size="large">
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSaveAll}
            size="large"
          >
            حفظ جميع الصفحات
          </Button>
          
          <Button 
            icon={<PlusOutlined />}
            onClick={handleAddPage}
            size="large"
          >
            إضافة صفحة جديدة
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default PagesEditor; 