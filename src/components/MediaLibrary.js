import React, { useState } from 'react';
import {
  Card,
  Upload,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Input,
  message,
  Modal,
  List,
  Image,
  Tag,
  Tooltip,
  Popconfirm,
  Progress,
  Tabs,
  Empty
} from 'antd';
import {
  FileImageOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SearchOutlined,
  DeleteOutlined,
  CopyOutlined,
  EyeOutlined,
  DownloadOutlined,
  FolderOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Search } = Input;

const MediaLibrary = ({ data, onUpload }) => {
  const { t } = useTranslation();
  const [media, setMedia] = useState(data || []);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // تهيئة البيانات
  React.useEffect(() => {
    if (data) {
      setMedia(data);
    }
  }, [data]);

  // رفع ملف
  const handleUpload = async (file) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      // محاكاة رفع الملف
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // إضافة الملف للمكتبة
      const newMedia = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'video',
        size: (file.size / 1024 / 1024).toFixed(2) + 'MB',
        uploadedAt: new Date().toISOString(),
        tags: []
      };

      setMedia(prev => [newMedia, ...prev]);
      message.success('تم رفع الملف بنجاح');
    } catch (error) {
      message.error('فشل في رفع الملف');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // حذف ملف
  const handleDelete = (id) => {
    const updatedMedia = media.filter(item => item.id !== id);
    setMedia(updatedMedia);
    setSelectedMedia(selectedMedia.filter(item => item !== id));
    message.success('تم حذف الملف بنجاح');
  };

  // نسخ رابط الملف
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    message.success('تم نسخ الرابط');
  };

  // معاينة الملف
  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setPreviewVisible(true);
  };

  // تحميل الملف
  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  // فلترة الملفات
  const filteredMedia = media.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // اختيار/إلغاء اختيار ملف
  const handleSelect = (id) => {
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter(item => item !== id));
    } else {
      setSelectedMedia([...selectedMedia, id]);
    }
  };

  // حذف الملفات المختارة
  const handleDeleteSelected = () => {
    const updatedMedia = media.filter(item => !selectedMedia.includes(item.id));
    setMedia(updatedMedia);
    setSelectedMedia([]);
    message.success(`تم حذف ${selectedMedia.length} ملف`);
  };

  // إعدادات الرفع
  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isImage && !isVideo) {
        message.error('يمكن رفع الصور والفيديوهات فقط!');
        return false;
      }

      if (!isLt10M) {
        message.error('حجم الملف يجب أن يكون أقل من 10MB!');
        return false;
      }

      handleUpload(file);
      return false; // منع الرفع التلقائي
    },
    showUploadList: false,
    accept: 'image/*,video/*'
  };

  // عرض الملف في الشبكة
  const renderGridItem = (item) => (
    <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
      <Card
        hoverable
        className={`media-item ${selectedMedia.includes(item.id) ? 'selected' : ''}`}
        cover={
          <div className="media-preview" onClick={() => handlePreview(item)}>
            {item.type === 'image' ? (
              <img alt={item.name} src={item.url} />
            ) : (
              <div className="video-preview">
                <VideoCameraOutlined />
                <Text>فيديو</Text>
              </div>
            )}
            <div className="media-overlay">
              <Space>
                <Tooltip title="معاينة">
                  <Button 
                    type="text" 
                    icon={<EyeOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(item);
                    }}
                  />
                </Tooltip>
                <Tooltip title="نسخ الرابط">
                  <Button 
                    type="text" 
                    icon={<CopyOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUrl(item.url);
                    }}
                  />
                </Tooltip>
                <Tooltip title="تحميل">
                  <Button 
                    type="text" 
                    icon={<DownloadOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(item);
                    }}
                  />
                </Tooltip>
                <Tooltip title="حذف">
                  <Popconfirm
                    title="هل أنت متأكد من حذف هذا الملف؟"
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button 
                      type="text" 
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Popconfirm>
                </Tooltip>
              </Space>
            </div>
            <div className="media-checkbox">
              <input
                type="checkbox"
                checked={selectedMedia.includes(item.id)}
                onChange={() => handleSelect(item.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        }
        bodyStyle={{ padding: 8 }}
      >
        <div className="media-info">
          <Text ellipsis style={{ display: 'block', fontSize: 12 }}>
            {item.name}
          </Text>
          <Text type="secondary" style={{ fontSize: 10 }}>
            {item.size}
          </Text>
          <div className="media-tags">
            {item.tags.map(tag => (
              <Tag key={tag} size="small">{tag}</Tag>
            ))}
          </div>
        </div>
      </Card>
    </Col>
  );

  // عرض الملف في القائمة
  const renderListItem = (item) => (
    <List.Item
      key={item.id}
      className={`media-list-item ${selectedMedia.includes(item.id) ? 'selected' : ''}`}
      actions={[
        <Tooltip title="معاينة">
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            onClick={() => handlePreview(item)}
          />
        </Tooltip>,
        <Tooltip title="نسخ الرابط">
          <Button 
            type="text" 
            icon={<CopyOutlined />}
            onClick={() => handleCopyUrl(item.url)}
          />
        </Tooltip>,
        <Tooltip title="تحميل">
          <Button 
            type="text" 
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(item)}
          />
        </Tooltip>,
        <Tooltip title="حذف">
          <Popconfirm
            title="هل أنت متأكد من حذف هذا الملف؟"
            onConfirm={() => handleDelete(item.id)}
          >
            <Button 
              type="text" 
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Tooltip>
      ]}
    >
      <List.Item.Meta
        avatar={
          <div className="media-avatar">
            {item.type === 'image' ? (
              <img src={item.url} alt={item.name} />
            ) : (
              <VideoCameraOutlined />
            )}
          </div>
        }
        title={
          <Space>
            <input
              type="checkbox"
              checked={selectedMedia.includes(item.id)}
              onChange={() => handleSelect(item.id)}
            />
            <Text>{item.name}</Text>
          </Space>
        }
        description={
          <Space direction="vertical" size={0}>
            <Text type="secondary">{item.size}</Text>
            <Text type="secondary">
              {new Date(item.uploadedAt).toLocaleDateString('ar-SA')}
            </Text>
            <div>
              {item.tags.map(tag => (
                <Tag key={tag} size="small">{tag}</Tag>
              ))}
            </div>
          </Space>
        }
      />
    </List.Item>
  );

  return (
    <div className="media-library">
      <div className="library-header">
        <Title level={3}>
          <FileImageOutlined /> مكتبة الوسائط
        </Title>
        <Text type="secondary">
          إدارة الصور والفيديوهات في موقع PayPass
        </Text>
      </div>

      {/* شريط الأدوات */}
      <Card className="toolbar-card">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Upload {...uploadProps}>
              <Button 
                type="primary" 
                icon={<UploadOutlined />}
                loading={uploading}
                block
              >
                رفع ملفات
              </Button>
            </Upload>
            {uploading && (
              <Progress percent={uploadProgress} size="small" style={{ marginTop: 8 }} />
            )}
          </Col>
          
          <Col xs={24} sm={8}>
            <Search
              placeholder="البحث في الملفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
            />
          </Col>
          
          <Col xs={24} sm={8}>
            <Space>
              <Select
                value={filterType}
                onChange={setFilterType}
                style={{ width: 120 }}
              >
                <Option value="all">جميع الملفات</Option>
                <Option value="image">الصور</Option>
                <Option value="video">الفيديوهات</Option>
              </Select>
              
              <Button
                type={viewMode === 'grid' ? 'primary' : 'default'}
                icon={<PictureOutlined />}
                onClick={() => setViewMode('grid')}
              />
              <Button
                type={viewMode === 'list' ? 'primary' : 'default'}
                icon={<FolderOutlined />}
                onClick={() => setViewMode('list')}
              />
            </Space>
          </Col>
        </Row>

        {selectedMedia.length > 0 && (
          <>
          <Divider />
          <Space>
            <Text>تم اختيار {selectedMedia.length} ملف</Text>
            <Button 
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
            >
              حذف المحدد
            </Button>
            <Button 
              onClick={() => setSelectedMedia([])}
            >
              إلغاء التحديد
            </Button>
          </Space>
          </>
        )}
      </Card>

      {/* عرض الملفات */}
      <Card className="media-content-card">
        {filteredMedia.length > 0 ? (
          viewMode === 'grid' ? (
            <Row gutter={[16, 16]}>
              {filteredMedia.map(renderGridItem)}
            </Row>
          ) : (
            <List
              dataSource={filteredMedia}
              renderItem={renderListItem}
              pagination={{
                pageSize: 20,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} من ${total} ملف`
              }}
            />
          )
        ) : (
          <Empty
            description="لا توجد ملفات"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>

      {/* معاينة الملف */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={800}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      {/* إحصائيات */}
      <Card className="stats-card" style={{ marginTop: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <div className="stat-item">
              <Title level={4}>{media.length}</Title>
              <Text type="secondary">إجمالي الملفات</Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="stat-item">
              <Title level={4}>{media.filter(m => m.type === 'image').length}</Title>
              <Text type="secondary">الصور</Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="stat-item">
              <Title level={4}>{media.filter(m => m.type === 'video').length}</Title>
              <Text type="secondary">الفيديوهات</Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="stat-item">
              <Title level={4}>
                {media.reduce((acc, m) => acc + parseFloat(m.size), 0).toFixed(1)}MB
              </Title>
              <Text type="secondary">إجمالي الحجم</Text>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MediaLibrary; 