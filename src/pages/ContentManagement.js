import React, { useState, useEffect } from 'react';
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Switch,
  Upload,
  message,
  Space,
  Divider,
  Row,
  Col,
  Typography,
  Select,
  DatePicker,
  Tag,
  List,
  Avatar,
  Modal,
  Table,
  Tooltip,
  Popconfirm,
  Badge,
  Progress,
  Statistic,
  Alert,
  notification,
  Breadcrumb
} from 'antd';
import {
  EditOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  PictureOutlined,
  FileTextOutlined,
  SettingOutlined,
  HomeOutlined,
  CarOutlined,
  GiftOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  DownloadOutlined,
  ImportOutlined,
  ExportOutlined,
  SyncOutlined,
  BgColorsOutlined,
  CodeOutlined,
  GlobalOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  LayoutOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import DragDropEditor from '../components/DragDropEditor';
import ThemeEditor from '../components/ThemeEditor';
import SEOEditor from '../components/SEOEditor';
import PagesEditor from '../components/PagesEditor';
import MediaLibrary from '../components/MediaLibrary';
import { contentApiService } from '../api/contentApi';
import './Pages.css';
import './ContentManagement.css';
import '../components/DragDropEditor.css';
import '../components/AdvancedComponents.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ContentManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('homepage');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [contentData, setContentData] = useState({});
  const [themeSettings, setThemeSettings] = useState({});
  const [seoSettings, setSeoSettings] = useState({});
  const [pagesSettings, setPagesSettings] = useState([]);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [showAdvancedEditor, setShowAdvancedEditor] = useState(false);

  // تحميل البيانات
  useEffect(() => {
    loadContentData();
    loadThemeSettings();
    loadSEOSettings();
    loadPagesSettings();
    loadMediaLibrary();
  }, []);

  // تحميل البيانات
  const loadContentData = async () => {
    setLoading(true);
    try {
      const data = await contentApiService.getAllContent();
      setContentData(data);
      notification.success({
        message: 'تم تحميل البيانات بنجاح',
        description: 'تم جلب جميع محتويات الموقع'
      });
    } catch (error) {
      notification.error({
        message: 'خطأ في تحميل البيانات',
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  // تحميل إعدادات التصميم
  const loadThemeSettings = async () => {
    try {
      const theme = await contentApiService.getThemeSettings();
      setThemeSettings(theme);
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  };

  // تحميل إعدادات SEO
  const loadSEOSettings = async () => {
    try {
      const seo = await contentApiService.getSEOSettings();
      setSeoSettings(seo);
    } catch (error) {
      console.error('Error loading SEO settings:', error);
    }
  };

  // تحميل إعدادات الصفحات
  const loadPagesSettings = async () => {
    try {
      const pages = await contentApiService.getPages();
      setPagesSettings(pages);
    } catch (error) {
      console.error('Error loading pages settings:', error);
    }
  };

  // تحميل مكتبة الوسائط
  const loadMediaLibrary = async () => {
    try {
      // Mock data for media library
      setMediaLibrary([
        { id: 1, name: 'hero-bg.jpg', url: '/hero-bg.jpg', type: 'image', size: '2.5MB' },
        { id: 2, name: 'service-basic.jpg', url: '/service-basic.jpg', type: 'image', size: '1.8MB' },
        { id: 3, name: 'package-monthly.jpg', url: '/package-monthly.jpg', type: 'image', size: '3.2MB' }
      ]);
    } catch (error) {
      console.error('Error loading media library:', error);
    }
  };

  // حفظ البيانات
  const handleSave = async () => {
    setSaving(true);
    try {
      await contentApiService.saveAllContent(contentData);
      notification.success({
        message: 'تم الحفظ بنجاح',
        description: 'تم حفظ جميع التغييرات في الموقع'
      });
    } catch (error) {
      notification.error({
        message: 'خطأ في الحفظ',
        description: error.message
      });
    } finally {
      setSaving(false);
    }
  };

  // حفظ قسم معين
  const handleSaveSection = async (section, data) => {
    try {
      await contentApiService.saveSectionContent(section, data);
      notification.success({
        message: 'تم الحفظ بنجاح',
        description: `تم حفظ قسم ${section}`
      });
    } catch (error) {
      notification.error({
        message: 'خطأ في الحفظ',
        description: error.message
      });
    }
  };

  // حفظ إعدادات التصميم
  const handleSaveTheme = async (theme) => {
    try {
      await contentApiService.saveThemeSettings(theme);
      setThemeSettings(theme);
      notification.success({
        message: 'تم حفظ إعدادات التصميم',
        description: 'تم تطبيق التغييرات على الموقع'
      });
    } catch (error) {
      notification.error({
        message: 'خطأ في حفظ إعدادات التصميم',
        description: error.message
      });
    }
  };

  // حفظ إعدادات SEO
  const handleSaveSEO = async (seo) => {
    try {
      await contentApiService.saveSEOSettings(seo);
      setSeoSettings(seo);
      notification.success({
        message: 'تم حفظ إعدادات SEO',
        description: 'تم تحديث بيانات الموقع'
      });
    } catch (error) {
      notification.error({
        message: 'خطأ في حفظ إعدادات SEO',
        description: error.message
      });
    }
  };

  // حفظ إعدادات الصفحات
  const handleSavePages = async (pages) => {
    try {
      await contentApiService.savePages(pages);
      setPagesSettings(pages);
      notification.success({
        message: 'تم حفظ إعدادات الصفحات',
        description: 'تم تحديث قائمة الصفحات'
      });
    } catch (error) {
      notification.error({
        message: 'خطأ في حفظ إعدادات الصفحات',
        description: error.message
      });
    }
  };

  // رفع ملف
  const handleFileUpload = async (file) => {
    try {
      const result = await contentApiService.uploadFile(file);
      notification.success({
        message: 'تم رفع الملف بنجاح',
        description: result.filename
      });
      return result;
    } catch (error) {
      notification.error({
        message: 'فشل في رفع الملف',
        description: error.message
      });
    }
  };

  // معاينة الصورة
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // تحديث البيانات
  const updateContentData = (section, field, value) => {
    setContentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // تحديث عنصر في المصفوفة
  const updateArrayItem = (section, index, field, value) => {
    setContentData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // إضافة عنصر جديد
  const addNewItem = (section, newItem) => {
    setContentData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() }]
    }));
  };

  // حذف عنصر
  const deleteItem = (section, index) => {
    setContentData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // إحصائيات المحتوى
  const contentStats = {
    totalServices: contentData.services.length,
    activeServices: contentData.services.filter(s => s.active).length,
    totalPackages: contentData.packages.length,
    activePackages: contentData.packages.filter(p => p.active).length,
    totalBlogPosts: contentData.blog.length,
    activeBlogPosts: contentData.blog.filter(b => b.active).length,
    totalViews: contentData.blog.reduce((sum, post) => sum + post.views, 0),
    totalLikes: contentData.blog.reduce((sum, post) => sum + post.likes, 0)
  };

  // أعمدة الجداول
  const serviceColumns = [
    {
      title: 'اسم الخدمة',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <Avatar icon={<CarOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: 'السعر',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <Text type="success" strong>{price}</Text>
    },
    {
      title: 'المدة',
      dataIndex: 'duration',
      key: 'duration'
    },
    {
      title: 'الحالة',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Badge 
          status={active ? 'success' : 'default'} 
          text={active ? 'نشط' : 'غير نشط'} 
        />
      )
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_, record, index) => (
        <Space>
          <Tooltip title="تعديل">
            <Button type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="حذف">
            <Popconfirm
              title="هل أنت متأكد من الحذف؟"
              onConfirm={() => deleteItem('services', index)}
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  const blogColumns = [
    {
      title: 'عنوان المقال',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <Avatar icon={<FileTextOutlined />} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" small>{record.author}</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'المشاهدات',
      dataIndex: 'views',
      key: 'views',
      render: (views) => <Text>{views.toLocaleString()}</Text>
    },
    {
      title: 'الإعجابات',
      dataIndex: 'likes',
      key: 'likes',
      render: (likes) => <Text type="success">{likes}</Text>
    },
    {
      title: 'العلامات',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <Space>
          {tags.map(tag => (
            <Tag key={tag} color="blue">{tag}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Badge 
          status={active ? 'success' : 'default'} 
          text={active ? 'منشور' : 'مسودة'} 
        />
      )
    }
  ];

  return (
    <div className="content-management-page">
      <div className="page-header">
        <Breadcrumb
          items={[
            { title: 'الرئيسية' },
            { title: 'إدارة المحتوى' }
          ]}
        />
        <Title level={2}>
          <EditOutlined /> إدارة محتوى الموقع
        </Title>
        <Text type="secondary">
          تحكم في جميع محتويات موقع PayPass بسهولة مع محرر السحب والإفلات المتقدم
        </Text>
      </div>

      {/* إحصائيات سريعة */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="الخدمات النشطة"
              value={contentStats.activeServices}
              suffix={`/ ${contentStats.totalServices}`}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="الباقات النشطة"
              value={contentStats.activePackages}
              suffix={`/ ${contentStats.totalPackages}`}
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="المقالات المنشورة"
              value={contentStats.activeBlogPosts}
              suffix={`/ ${contentStats.totalBlogPosts}`}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="إجمالي المشاهدات"
              value={contentStats.totalViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* أزرار الإجراءات */}
      <Card className="actions-card">
        <Space size="large">
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
            size="large"
          >
            حفظ جميع التغييرات
          </Button>
          <Button 
            icon={<ReloadOutlined />}
            onClick={loadContentData}
            loading={loading}
            size="large"
          >
            تحديث البيانات
          </Button>
          <Button 
            icon={<EyeOutlined />}
            onClick={() => setPreviewVisible(true)}
            size="large"
          >
            معاينة الموقع
          </Button>
          <Button 
            icon={<LayoutOutlined />}
            onClick={() => setShowAdvancedEditor(!showAdvancedEditor)}
            type={showAdvancedEditor ? 'primary' : 'default'}
            size="large"
          >
            المحرر المتقدم
          </Button>
          <Button 
            icon={<ExportOutlined />}
            size="large"
          >
            تصدير المحتوى
          </Button>
          <Button 
            icon={<ImportOutlined />}
            size="large"
          >
            استيراد المحتوى
          </Button>
        </Space>
      </Card>

      {/* تبويبات المحتوى */}
      <Card className="content-tabs-card">
        <div className="content-tabs-scroll-wrapper">
          <Tabs
            activeKey={activeTab} 
            onChange={setActiveTab}
            type="card"
            size="large"
            className="content-tabs-scroll"
            items={[
              {
                key: 'homepage',
                label: (
                  <span>
                    <HomeOutlined />
                    الصفحة الرئيسية
                  </span>
                ),
                children: (
                  <HomepageEditor 
                    data={contentData.homepage}
                    onUpdate={updateContentData}
                  />
                )
              },
              {
                key: 'services',
                label: (
                  <span>
                    <CarOutlined />
                    الخدمات
                  </span>
                ),
                children: (
                  <ServicesEditor 
                    data={contentData.services}
                    onUpdate={updateArrayItem}
                    onAdd={addNewItem}
                    onDelete={deleteItem}
                    columns={serviceColumns}
                  />
                )
              },
              {
                key: 'packages',
                label: (
                  <span>
                    <GiftOutlined />
                    الباقات
                  </span>
                ),
                children: (
                  <PackagesEditor 
                    data={contentData.packages}
                    onUpdate={updateArrayItem}
                    onAdd={addNewItem}
                    onDelete={deleteItem}
                  />
                )
              },
              {
                key: 'blog',
                label: (
                  <span>
                    <BookOutlined />
                    المدونة
                  </span>
                ),
                children: (
                  <BlogEditor 
                    data={contentData.blog}
                    onUpdate={updateArrayItem}
                    onAdd={addNewItem}
                    onDelete={deleteItem}
                    columns={blogColumns}
                  />
                )
              },
              {
                key: 'theme',
                label: (
                  <span>
                    <BgColorsOutlined />
                    التصميم
                  </span>
                ),
                children: (
                  <ThemeEditor 
                    data={themeSettings} 
                    onSave={handleSaveTheme}
                  />
                )
              },
              {
                key: 'seo',
                label: (
                  <span>
                    <CodeOutlined />
                    SEO
                  </span>
                ),
                children: (
                  <SEOEditor 
                    data={seoSettings} 
                    onSave={handleSaveSEO}
                  />
                )
              },
              {
                key: 'pages',
                label: (
                  <span>
                    <GlobalOutlined />
                    الصفحات
                  </span>
                ),
                children: (
                  <PagesEditor 
                    data={pagesSettings} 
                    onSave={handleSavePages}
                  />
                )
              },
              {
                key: 'media',
                label: (
                  <span>
                    <FileImageOutlined />
                    الوسائط
                  </span>
                ),
                children: (
                  <MediaLibrary 
                    data={mediaLibrary} 
                    onUpload={handleFileUpload}
                  />
                )
              },
              {
                key: 'settings',
                label: (
                  <span>
                    <SettingOutlined />
                    إعدادات الموقع
                  </span>
                ),
                children: (
                  <WebsiteSettings 
                    data={contentData.settings}
                    onUpdate={updateContentData}
                  />
                )
              }
            ]}
          />
        </div>
      </Card>

      {/* معاينة الصورة */}
      <Modal
        open={previewVisible}
        title="معاينة الصورة"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="معاينة" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

// مكونات المحررين
const HomepageEditor = ({ data, onUpdate }) => {
  const [fileList, setFileList] = useState([]);
  
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };
  
  return (
  <div className="homepage-editor">
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <Card title="قسم الترحيب" className="editor-card">
          <Form layout="vertical">
            <Form.Item label="العنوان الرئيسي">
              <Input
                value={data.hero.title}
                onChange={(e) => onUpdate('homepage', 'hero', {
                  ...data.hero,
                  title: e.target.value
                })}
                placeholder="أدخل العنوان الرئيسي"
              />
            </Form.Item>
            <Form.Item label="العنوان الفرعي">
              <TextArea
                value={data.hero.subtitle}
                onChange={(e) => onUpdate('homepage', 'hero', {
                  ...data.hero,
                  subtitle: e.target.value
                })}
                placeholder="أدخل العنوان الفرعي"
                rows={3}
              />
            </Form.Item>
            <Form.Item label="نص الزر">
              <Input
                value={data.hero.buttonText}
                onChange={(e) => onUpdate('homepage', 'hero', {
                  ...data.hero,
                  buttonText: e.target.value
                })}
                placeholder="نص الزر"
              />
            </Form.Item>
            <Form.Item label="صورة الخلفية">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>رفع صورة</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Switch
                checked={data.hero.active}
                onChange={(checked) => onUpdate('homepage', 'hero', {
                  ...data.hero,
                  active: checked
                })}
              />
              <Text style={{ marginRight: 8 }}>تفعيل قسم الترحيب</Text>
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        <Card title="المميزات" className="editor-card">
          <List
            dataSource={data.features}
            renderItem={(feature, index) => (
              <List.Item>
                <Card size="small" style={{ width: '100%' }}>
                  <Form layout="vertical">
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item label="الأيقونة">
                          <Input
                            value={feature.icon}
                            onChange={(e) => onUpdate('features', index, 'icon', e.target.value)}
                            placeholder="⚡"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={16}>
                        <Form.Item label="العنوان">
                          <Input
                            value={feature.title}
                            onChange={(e) => onUpdate('features', index, 'title', e.target.value)}
                            placeholder="عنوان الميزة"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label="الوصف">
                      <TextArea
                        value={feature.description}
                        onChange={(e) => onUpdate('features', index, 'description', e.target.value)}
                        placeholder="وصف الميزة"
                        rows={2}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Switch
                        checked={feature.active}
                        onChange={(checked) => onUpdate('features', index, 'active', checked)}
                      />
                      <Text style={{ marginRight: 8 }}>تفعيل الميزة</Text>
                    </Form.Item>
                  </Form>
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  </div>
  );
};

const ServicesEditor = ({ data, onUpdate, onAdd, onDelete, columns }) => (
  <div className="services-editor">
    <Card 
      title="إدارة الخدمات" 
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          إضافة خدمة جديدة
        </Button>
      }
      className="editor-card"
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="content-table"
      />
    </Card>
  </div>
);

const PackagesEditor = ({ data, onUpdate, onAdd, onDelete }) => (
  <div className="packages-editor">
    <Card 
      title="إدارة الباقات"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          إضافة باقة جديدة
        </Button>
      }
      className="editor-card"
    >
      <List
        dataSource={data}
        renderItem={(pkg, index) => (
          <List.Item>
            <Card size="small" style={{ width: '100%' }}>
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="اسم الباقة">
                      <Input
                        value={pkg.title}
                        onChange={(e) => onUpdate('packages', index, 'title', e.target.value)}
                        placeholder="اسم الباقة"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="المدة">
                      <Input
                        value={pkg.duration}
                        onChange={(e) => onUpdate('packages', index, 'duration', e.target.value)}
                        placeholder="مثال: 30 يوم"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="الوصف">
                  <TextArea
                    value={pkg.description}
                    onChange={(e) => onUpdate('packages', index, 'description', e.target.value)}
                    placeholder="وصف الباقة"
                    rows={3}
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="السعر الحالي">
                      <Input
                        value={pkg.price}
                        onChange={(e) => onUpdate('packages', index, 'price', e.target.value)}
                        placeholder="السعر"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="السعر الأصلي">
                      <Input
                        value={pkg.originalPrice}
                        onChange={(e) => onUpdate('packages', index, 'originalPrice', e.target.value)}
                        placeholder="السعر الأصلي"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="المميزات">
                  <Select
                    mode="tags"
                    value={pkg.features}
                    onChange={(value) => onUpdate('packages', index, 'features', value)}
                    placeholder="أدخل المميزات"
                  />
                </Form.Item>
                <Form.Item>
                  <Switch
                    checked={pkg.active}
                    onChange={(checked) => onUpdate('packages', index, 'active', checked)}
                  />
                  <Text style={{ marginRight: 8 }}>تفعيل الباقة</Text>
                </Form.Item>
              </Form>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  </div>
);

const BlogEditor = ({ data, onUpdate, onAdd, onDelete, columns }) => (
  <div className="blog-editor">
    <Card 
      title="إدارة المدونة"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          إضافة مقال جديد
        </Button>
      }
      className="editor-card"
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="content-table"
      />
    </Card>
  </div>
);

const WebsiteSettings = ({ data, onUpdate }) => (
  <div className="website-settings">
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <Card title="إعدادات عامة" className="editor-card">
          <Form layout="vertical">
            <Form.Item label="اسم الموقع">
              <Input
                value={data.siteName}
                onChange={(e) => onUpdate('settings', 'siteName', e.target.value)}
                placeholder="اسم الموقع"
              />
            </Form.Item>
            <Form.Item label="وصف الموقع">
              <TextArea
                value={data.siteDescription}
                onChange={(e) => onUpdate('settings', 'siteDescription', e.target.value)}
                placeholder="وصف الموقع"
                rows={3}
              />
            </Form.Item>
            <Form.Item label="البريد الإلكتروني">
              <Input
                value={data.contactEmail}
                onChange={(e) => onUpdate('settings', 'contactEmail', e.target.value)}
                placeholder="البريد الإلكتروني"
              />
            </Form.Item>
            <Form.Item label="رقم الهاتف">
              <Input
                value={data.contactPhone}
                onChange={(e) => onUpdate('settings', 'contactPhone', e.target.value)}
                placeholder="رقم الهاتف"
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col xs={24} lg={12}>
        <Card title="إعدادات SEO" className="editor-card">
          <Form layout="vertical">
            <Form.Item label="عنوان الصفحة">
              <Input
                value={data.seo.metaTitle}
                onChange={(e) => onUpdate('settings', 'seo', {
                  ...data.seo,
                  metaTitle: e.target.value
                })}
                placeholder="عنوان الصفحة"
              />
            </Form.Item>
            <Form.Item label="وصف الصفحة">
              <TextArea
                value={data.seo.metaDescription}
                onChange={(e) => onUpdate('settings', 'seo', {
                  ...data.seo,
                  metaDescription: e.target.value
                })}
                placeholder="وصف الصفحة"
                rows={3}
              />
            </Form.Item>
            <Form.Item label="الكلمات المفتاحية">
              <Select
                mode="tags"
                value={data.seo.keywords.split(', ')}
                onChange={(value) => onUpdate('settings', 'seo', {
                  ...data.seo,
                  keywords: value.join(', ')
                })}
                placeholder="أدخل الكلمات المفتاحية"
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
);

export default ContentManagement; 