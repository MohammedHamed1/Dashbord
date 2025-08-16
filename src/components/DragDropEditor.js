import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TabletOutlined } from '@ant-design/icons';
import {
  Card,
  Button,
  Input,
  Switch,
  Upload,
  message,
  Space,
  Row,
  Col,
  Typography,
  Modal,
  Tooltip,
  Popconfirm,
  Badge,
  Divider,
  Select,
  ColorPicker,
  Slider,
  Tabs,
  Form,
  notification
} from 'antd';
import {
  DragOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  CopyOutlined,
  SettingOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  UploadOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  LinkOutlined,
  CodeOutlined,
  // PaletteOutlined,
  LayoutOutlined,
  MobileOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { contentApiService } from '../api/contentApi';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const DragDropEditor = ({ 
  section, 
  data, 
  onUpdate, 
  onSave, 
  onPreview,
  showPreview = true,
  showSettings = true,
  showVersionHistory = true 
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [versionHistoryVisible, setVersionHistoryVisible] = useState(false);
  const [versionHistory, setVersionHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop, mobile, tablet

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setItems(data.map((item, index) => ({ ...item, order: index })));
    } else if (data && typeof data === 'object') {
      setItems([{ ...data, order: 0 }]);
    }
  }, [data]);

  // معالجة السحب والإفلات
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    // تحديث ترتيب العناصر
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index
    }));

    setItems(updatedItems);
    onUpdate(updatedItems);
  };

  // إضافة عنصر جديد
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      title: 'عنصر جديد',
      description: 'وصف العنصر الجديد',
      active: true,
      order: items.length,
      type: 'text',
      content: '',
      image: '',
      link: '',
      icon: '📝'
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onUpdate(updatedItems);
    setSelectedItem(newItem);
    setEditModalVisible(true);
  };

  // تعديل عنصر
  const handleEditItem = (item) => {
    setSelectedItem(item);
    form.setFieldsValue(item);
    setEditModalVisible(true);
  };

  // حذف عنصر
  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onUpdate(updatedItems);
    message.success('تم حذف العنصر بنجاح');
  };

  // نسخ عنصر
  const handleCopyItem = (item) => {
    const copiedItem = {
      ...item,
      id: Date.now(),
      title: `${item.title} (نسخة)`,
      order: items.length
    };
    const updatedItems = [...items, copiedItem];
    setItems(updatedItems);
    onUpdate(updatedItems);
    message.success('تم نسخ العنصر بنجاح');
  };

  // حفظ التغييرات
  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(items);
      message.success('تم حفظ التغييرات بنجاح');
    } catch (error) {
      message.error('فشل في حفظ التغييرات');
    } finally {
      setSaving(false);
    }
  };

  // معاينة التغييرات
  const handlePreview = () => {
    setPreviewModalVisible(true);
  };

  // جلب تاريخ التعديلات
  const loadVersionHistory = async () => {
    setLoading(true);
    try {
      const history = await contentApiService.getVersionHistory(section);
      setVersionHistory(history);
      setVersionHistoryVisible(true);
    } catch (error) {
      message.error('فشل في تحميل تاريخ التعديلات');
    } finally {
      setLoading(false);
    }
  };

  // استعادة نسخة سابقة
  const handleRestoreVersion = async (versionId) => {
    try {
      const result = await contentApiService.restoreVersion(section, versionId);
      if (result.success) {
        message.success('تم استعادة النسخة بنجاح');
        setVersionHistoryVisible(false);
        // إعادة تحميل البيانات
        window.location.reload();
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('فشل في استعادة النسخة');
    }
  };

  // حفظ التعديلات في النموذج
  const handleFormSave = () => {
    form.validateFields().then(values => {
      const updatedItems = items.map(item =>
        item.id === selectedItem.id ? { ...item, ...values } : item
      );
      setItems(updatedItems);
      onUpdate(updatedItems);
      setEditModalVisible(false);
      message.success('تم حفظ التعديلات');
    });
  };

  // رفع ملف
  const handleFileUpload = async (file) => {
    try {
      const result = await contentApiService.uploadFile(file);
      form.setFieldsValue({ image: result.url });
      message.success('تم رفع الملف بنجاح');
    } catch (error) {
      message.error('فشل في رفع الملف');
    }
  };

  // عرض العنصر حسب نوعه
  const renderItemContent = (item) => {
    switch (item.type) {
      case 'text':
        return (
          <div className="item-content">
            <Text strong>{item.title}</Text>
            <Text type="secondary">{item.description}</Text>
          </div>
        );
      case 'image':
        return (
          <div className="item-content">
            <img src={item.image} alt={item.title} style={{ width: 50, height: 50, objectFit: 'cover' }} />
            <Text strong>{item.title}</Text>
          </div>
        );
      case 'link':
        return (
          <div className="item-content">
            <LinkOutlined />
            <Text strong>{item.title}</Text>
            <Text type="secondary">{item.link}</Text>
          </div>
        );
      case 'icon':
        return (
          <div className="item-content">
            <Text style={{ fontSize: 24 }}>{item.icon}</Text>
            <Text strong>{item.title}</Text>
          </div>
        );
      default:
        return (
          <div className="item-content">
            <Text strong>{item.title}</Text>
            <Text type="secondary">{item.description}</Text>
          </div>
        );
    }
  };

  // تعريف componentTypes إذا لم يكن معرفًا
  const componentTypes = [
    { type: 'text', label: 'نص', icon: '📝', description: 'عنصر نصي' },
    { type: 'image', label: 'صورة', icon: '🖼️', description: 'عنصر صورة' },
    { type: 'link', label: 'رابط', icon: '🔗', description: 'عنصر رابط' },
    { type: 'icon', label: 'أيقونة', icon: '⭐', description: 'عنصر أيقونة' }
  ];

  // تعريف activeTab و setActiveTab إذا لم يكونا معرفين
  const [activeTab, setActiveTab] = useState('components');

  // تعريف handleDragStart إذا لم يكن معرفًا
  const handleDragStart = (e, component) => {
    // منطق السحب (يمكنك تخصيصه حسب الحاجة)
  };

  // تعريف selectedComponent و setSelectedComponent إذا لم يكونا معرفين
  const [selectedComponent, setSelectedComponent] = useState(null);

  // تعريف handleComponentUpdate إذا لم يكن معرفًا
  const handleComponentUpdate = (updatedComponent) => {
    // منطق التحديث (يمكنك تخصيصه حسب الحاجة)
  };

  // تعريف renderPreview إذا لم يكن معرفًا
  const renderPreview = () => {
    // منطق المعاينة (يمكنك تخصيصه حسب الحاجة)
    return <div>Preview</div>;
  };

  // تعريف ComponentProperties إذا لم يكن معرفًا
  const ComponentProperties = ({ component, onUpdate }) => {
    // منطق خصائص المكون (يمكنك تخصيصه حسب الحاجة)
    return <div>خصائص المكون</div>;
  };

  return (
    <div className="drag-drop-editor">
      {/* شريط الأدوات */}
      <div className="editor-toolbar">
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddItem}
          >
            إضافة عنصر
          </Button>
          
          <Button 
            icon={<SaveOutlined />} 
            loading={saving}
            onClick={handleSave}
          >
            حفظ
          </Button>

          {showPreview && (
            <Button 
              icon={<EyeOutlined />} 
              onClick={handlePreview}
            >
              معاينة
            </Button>
          )}

          {showVersionHistory && (
            <Button 
              icon={<UndoOutlined />} 
              onClick={loadVersionHistory}
              loading={loading}
            >
              تاريخ التعديلات
            </Button>
          )}

          {showSettings && (
            <Button 
              icon={<SettingOutlined />} 
              onClick={() => setSettingsModalVisible(true)}
            >
              الإعدادات
            </Button>
          )}
        </Space>

        {/* أزرار معاينة الجهاز */}
        <Space>
          <Tooltip title="معاينة سطح المكتب">
            <Button 
              type={previewMode === 'desktop' ? 'primary' : 'default'}
              icon={<DesktopOutlined />}
              onClick={() => setPreviewMode('desktop')}
            />
          </Tooltip>
          <Tooltip title="معاينة الجهاز اللوحي">
            <Button 
              type={previewMode === 'tablet' ? 'primary' : 'default'}
              icon={<TabletOutlined />}
              onClick={() => setPreviewMode('tablet')}
            />
          </Tooltip>
          <Tooltip title="معاينة الهاتف">
            <Button 
              type={previewMode === 'mobile' ? 'primary' : 'default'}
              icon={<MobileOutlined />}
              onClick={() => setPreviewMode('mobile')}
            />
          </Tooltip>
        </Space>
      </div>

      {/* منطقة السحب والإفلات */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="drag-drop-area"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`drag-item ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <Card
                        size="small"
                        className="item-card"
                        extra={
                          <Space>
                            <Badge 
                              status={item.active ? 'success' : 'default'} 
                              text={item.active ? 'نشط' : 'غير نشط'}
                            />
                            <Space>
                              <Tooltip title="سحب">
                                <DragOutlined {...provided.dragHandleProps} />
                              </Tooltip>
                              <Tooltip title="تعديل">
                                <EditOutlined onClick={() => handleEditItem(item)} />
                              </Tooltip>
                              <Tooltip title="نسخ">
                                <CopyOutlined onClick={() => handleCopyItem(item)} />
                              </Tooltip>
                              <Tooltip title="حذف">
                                <Popconfirm
                                  title="هل أنت متأكد من حذف هذا العنصر؟"
                                  onConfirm={() => handleDeleteItem(index)}
                                >
                                  <DeleteOutlined />
                                </Popconfirm>
                              </Tooltip>
                            </Space>
                          </Space>
                        }
                      >
                        {renderItemContent(item)}
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* نافذة تعديل العنصر */}
      <Modal
        title="تعديل العنصر"
        open={editModalVisible}
        onOk={handleFormSave}
        onCancel={() => setEditModalVisible(false)}
        width={800}
        okText="حفظ"
        cancelText="إلغاء"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="title" label="العنوان" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="النوع">
                <Select>
                  <Option value="text">نص</Option>
                  <Option value="image">صورة</Option>
                  <Option value="link">رابط</Option>
                  <Option value="icon">أيقونة</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="الوصف">
            <TextArea rows={3} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="icon" label="الأيقونة">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="link" label="الرابط">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="image" label="الصورة">
            <Upload
              beforeUpload={handleFileUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>رفع صورة</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="active" label="نشط" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* نافذة المعاينة */}
      <Modal
        title="معاينة المحتوى"
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        width={1200}
        footer={null}
      >
        <div className={`preview-container preview-${previewMode}`}>
          {onPreview && onPreview(items)}
        </div>
      </Modal>

      {/* نافذة تاريخ التعديلات */}
      <Modal
        title="تاريخ التعديلات"
        open={versionHistoryVisible}
        onCancel={() => setVersionHistoryVisible(false)}
        width={800}
        footer={null}
      >
        <div className="version-history">
          {versionHistory.map((version) => (
            <Card key={version.id} size="small" style={{ marginBottom: 8 }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Text strong>الإصدار {version.version}</Text>
                  <br />
                  <Text type="secondary">
                    {new Date(version.timestamp).toLocaleString('ar-SA')}
                  </Text>
                  <br />
                  <Text type="secondary">بواسطة: {version.author}</Text>
                  <br />
                  <Text type="secondary">{version.changes}</Text>
                </Col>
                <Col>
                  <Button 
                    type="primary" 
                    size="small"
                    onClick={() => handleRestoreVersion(version.id)}
                  >
                    استعادة
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </Modal>

      {/* نافذة الإعدادات */}
      <Modal
        title="إعدادات المحرر"
        open={settingsModalVisible}
        onCancel={() => setSettingsModalVisible(false)}
        width={600}
        footer={null}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          size="large"
          items={[
            {
              key: 'components',
              label: (
                <span>
                  <LayoutOutlined />
                  المكونات
                </span>
              ),
              children: (
                <div className="components-panel">
                  <div className="components-grid">
                    {componentTypes.map((component) => (
                      <div
                        key={component.type}
                        className="component-item"
                        draggable
                        onDragStart={(e) => handleDragStart(e, component)}
                      >
                        <div className="component-icon">
                          {component.icon}
                        </div>
                        <div className="component-info">
                          <Text strong>{component.label}</Text>
                          <Text type="secondary" className="component-description">
                            {component.description}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            },
            {
              key: 'properties',
              label: (
                <span>
                  <SettingOutlined />
                  الخصائص
                </span>
              ),
              children: (
                <div className="properties-panel">
                  {selectedComponent ? (
                    <ComponentProperties
                      component={selectedComponent}
                      onUpdate={handleComponentUpdate}
                    />
                  ) : (
                    <div className="no-selection">
                      <Text type="secondary">اختر مكوناً لتعديل خصائصه</Text>
                    </div>
                  )}
                </div>
              )
            },
            {
              key: 'preview',
              label: (
                <span>
                  <EyeOutlined />
                  المعاينة
                </span>
              ),
              children: (
                <div className="preview-panel">
                  <div className="preview-controls">
                    <Space>
                      <Button
                        icon={<DesktopOutlined />}
                        type={previewMode === 'desktop' ? 'primary' : 'default'}
                        onClick={() => setPreviewMode('desktop')}
                      >
                        سطح المكتب
                      </Button>
                      <Button
                        icon={<MobileOutlined />}
                        type={previewMode === 'mobile' ? 'primary' : 'default'}
                        onClick={() => setPreviewMode('mobile')}
                      >
                        الهاتف
                      </Button>
                    </Space>
                  </div>
                  <div className={`preview-container ${previewMode}`}>
                    <div className="preview-content">
                      {renderPreview()}
                    </div>
                  </div>
                </div>
              )
            }
          ]}
        />
      </Modal>
    </div>
  );
};

export default DragDropEditor; 