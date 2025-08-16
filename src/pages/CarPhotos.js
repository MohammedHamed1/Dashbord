import React, { useState, useRef, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Upload, 
  message, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Space, 
  Row, 
  Col, 
  Image, 
  Tag, 
  Typography, 
  Divider,
  Tabs,
  List,
  Avatar,
  Badge,
  Tooltip,
  Progress,
  Collapse,
  Statistic
} from 'antd';
import { 
  CameraOutlined, 
  UploadOutlined, 
  EyeOutlined, 
  DeleteOutlined, 
  DownloadOutlined,
  PlusOutlined,
  UserOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  ReloadOutlined,
  SettingOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CrossCheckProvider from '../components/CrossCheck/CrossCheckProvider';
import './Pages.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const CarPhotos = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [photos, setPhotos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'أحمد محمد',
    role: 'employee',
    avatar: null
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // بيانات تجريبية للصور
  useEffect(() => {
    const mockPhotos = [
      {
        id: 1,
        carId: 'CAR001',
        carBrand: 'تويوتا',
        carModel: 'كامري',
        plateNumber: 'أ ب ج 1234',
        photos: [
          {
            id: 1,
            url: 'https://via.placeholder.com/400x300/1890ff/ffffff?text=صورة+السيارة+الأمامية',
            type: 'front',
            typeName: 'أمامية',
            uploadedBy: 'أحمد محمد',
            uploadedAt: '2024-01-15T10:30:00',
            status: 'approved'
          },
          {
            id: 2,
            url: 'https://via.placeholder.com/400x300/52c41a/ffffff?text=صورة+السيارة+الخلفية',
            type: 'back',
            typeName: 'خلفية',
            uploadedBy: 'أحمد محمد',
            uploadedAt: '2024-01-15T10:32:00',
            status: 'pending'
          },
          {
            id: 3,
            url: 'https://via.placeholder.com/400x300/fa8c16/ffffff?text=صورة+جانب+السيارة',
            type: 'side',
            typeName: 'جانبية',
            uploadedBy: 'أحمد محمد',
            uploadedAt: '2024-01-15T10:35:00',
            status: 'approved'
          }
        ],
        customerName: 'محمد أحمد',
        customerPhone: '0501234567',
        orderId: 'ORD001',
        createdAt: '2024-01-15T10:00:00'
      },
      {
        id: 2,
        carId: 'CAR002',
        carBrand: 'نيسان',
        carModel: 'باترول',
        plateNumber: 'د ه و 5678',
        photos: [
          {
            id: 4,
            url: 'https://via.placeholder.com/400x300/722ed1/ffffff?text=صورة+السيارة+الأمامية',
            type: 'front',
            typeName: 'أمامية',
            uploadedBy: 'سارة أحمد',
            uploadedAt: '2024-01-15T11:00:00',
            status: 'approved'
          }
        ],
        customerName: 'علي حسن',
        customerPhone: '0509876543',
        orderId: 'ORD002',
        createdAt: '2024-01-15T10:45:00'
      }
    ];
    setPhotos(mockPhotos);
  }, []);

  // تشغيل الكاميرا
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        } 
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      message.error('فشل في تشغيل الكاميرا');
      console.error('Camera error:', error);
    }
  };

  // إيقاف الكاميرا
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  // التقاط صورة
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        let photoUrl = '';
        try {
          photoUrl = URL.createObjectURL(blob);
        } catch (error) {
          console.error('Error creating object URL:', error);
          photoUrl = 'https://via.placeholder.com/400x300/1890ff/ffffff?text=صورة+ملتقطة';
        }
        
        const newPhoto = {
          id: Date.now(),
          url: photoUrl,
          type: 'captured',
          typeName: 'ملتقطة',
          uploadedBy: currentUser.name,
          uploadedAt: new Date().toISOString(),
          status: 'pending',
          blob: blob
        };
        
        setSelectedPhoto(newPhoto);
        setIsModalVisible(true);
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  // رفع صورة
  const handleUpload = (info) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      setUploading(false);
      message.success('تم رفع الصورة بنجاح');
      
      let photoUrl = '';
      if (info.file.response?.url) {
        photoUrl = info.file.response.url;
      } else if (info.file.originFileObj) {
        try {
          photoUrl = URL.createObjectURL(info.file.originFileObj);
        } catch (error) {
          console.error('Error creating object URL:', error);
          photoUrl = 'https://via.placeholder.com/400x300/1890ff/ffffff?text=صورة+مرفوعة';
        }
      } else {
        photoUrl = 'https://via.placeholder.com/400x300/1890ff/ffffff?text=صورة+مرفوعة';
      }
      
      const newPhoto = {
        id: Date.now(),
        url: photoUrl,
        type: 'uploaded',
        typeName: 'مرفوعة',
        uploadedBy: currentUser.name,
        uploadedAt: new Date().toISOString(),
        status: 'pending',
        file: info.file.originFileObj
      };
      
      setSelectedPhoto(newPhoto);
      setIsModalVisible(true);
    }
  };

  // حفظ الصورة
  const handleSavePhoto = async (values) => {
    try {
      // هنا يتم إرسال البيانات للخادم
      const photoData = {
        ...values,
        photo: selectedPhoto,
        uploadedBy: currentUser.id,
        uploadedAt: new Date().toISOString()
      };

      message.success('تم حفظ الصورة بنجاح');
      setIsModalVisible(false);
      setSelectedPhoto(null);
      form.resetFields();
    } catch (error) {
      message.error('فشل في حفظ الصورة');
    }
  };

  // حذف صورة
  const handleDeletePhoto = (photoId) => {
    Modal.confirm({
      title: 'تأكيد الحذف',
      content: 'هل أنت متأكد من حذف هذه الصورة؟',
      onOk: () => {
        setPhotos(prev => prev.map(car => ({
          ...car,
          photos: car.photos.filter(photo => photo.id !== photoId)
        })));
        message.success('تم حذف الصورة بنجاح');
      }
    });
  };

  // تحميل صورة
  const handleDownloadPhoto = (photo) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `car_photo_${photo.id}.jpg`;
    link.click();
  };

  // عرض تفاصيل الصورة
  const handleViewPhoto = (photo) => {
    setSelectedPhoto(photo);
    setIsModalVisible(true);
  };

  // إحصائيات الصور
  const getPhotoStats = () => {
    const totalPhotos = photos.reduce((sum, car) => sum + car.photos.length, 0);
    const approvedPhotos = photos.reduce((sum, car) => 
      sum + car.photos.filter(photo => photo.status === 'approved').length, 0);
    const pendingPhotos = photos.reduce((sum, car) => 
      sum + car.photos.filter(photo => photo.status === 'pending').length, 0);

    return { totalPhotos, approvedPhotos, pendingPhotos };
  };

  const stats = getPhotoStats();

  return (
    <div className="car-photos-page">
      <div className="page-header">
        <h1>تصوير السيارات</h1>
        <p>إدارة صور السيارات قبل وبعد الغسيل</p>
      </div>

      {/* مكون فحص تصوير السيارات */}
      <CrossCheckProvider 
        sectionName="car-photos" 
        position="top"
      />

      {/* إحصائيات سريعة */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={8}>
          <Card className="stat-item">
            <div className="stat-number">{stats.totalPhotos}</div>
            <div className="stat-label">إجمالي الصور</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-item">
            <div className="stat-number" style={{ color: '#52c41a' }}>{stats.approvedPhotos}</div>
            <div className="stat-label">الصور المعتمدة</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="stat-item">
            <div className="stat-number" style={{ color: '#fa8c16' }}>{stats.pendingPhotos}</div>
            <div className="stat-label">الصور قيد المراجعة</div>
          </Card>
        </Col>
      </Row>

      <Tabs 
        defaultActiveKey="camera" 
        className="page-card"
        items={[
          {
            key: 'camera',
            label: 'التقاط الصور',
            children: (
              <Card title="التقاط صور السيارات" className="page-card">
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={12}>
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                      <Title level={4}>كاميرا التصوير</Title>
                      <Text type="secondary">التقاط صور عالية الجودة للسيارات</Text>
                    </div>
                    
                    <div style={{ 
                      border: '2px dashed #d9d9d9', 
                      borderRadius: 8, 
                      padding: 20, 
                      textAlign: 'center',
                      minHeight: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {!isCameraActive ? (
                        <div>
                          <CameraOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
                          <div style={{ marginBottom: 16 }}>
                            <Text>اضغط لبدء الكاميرا</Text>
                          </div>
                          <Button 
                            type="primary" 
                            icon={<CameraOutlined />} 
                            size="large"
                            onClick={startCamera}
                          >
                            تشغيل الكاميرا
                          </Button>
                        </div>
                      ) : (
                        <div style={{ width: '100%' }}>
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={{ width: '100%', maxWidth: 400, borderRadius: 8 }}
                          />
                          <canvas ref={canvasRef} style={{ display: 'none' }} />
                          <div style={{ marginTop: 16 }}>
                            <Space>
                              <Button 
                                type="primary" 
                                icon={<CameraOutlined />}
                                onClick={capturePhoto}
                              >
                                التقاط صورة
                              </Button>
                              <Button 
                                danger
                                onClick={stopCamera}
                              >
                                إيقاف الكاميرا
                              </Button>
                            </Space>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                  
                  <Col xs={24} lg={12}>
                    <div style={{ marginBottom: 16 }}>
                      <Title level={4}>رفع الصور</Title>
                      <Text type="secondary">رفع صور من الجهاز</Text>
                    </div>
                    
                    <Upload
                      name="photo"
                      listType="picture-card"
                      showUploadList={false}
                      action="/api/upload"
                      onChange={handleUpload}
                      beforeUpload={(file) => {
                        const isImage = file.type.startsWith('image/');
                        if (!isImage) {
                          message.error('يمكن رفع ملفات الصور فقط!');
                        }
                        const isLt5M = file.size / 1024 / 1024 < 5;
                        if (!isLt5M) {
                          message.error('حجم الصورة يجب أن يكون أقل من 5MB!');
                        }
                        return isImage && isLt5M;
                      }}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>رفع صورة</div>
                      </div>
                    </Upload>
                    
                    <div style={{ marginTop: 24 }}>
                      <Title level={5}>تعليمات التصوير</Title>
                      <List
                        size="small"
                        dataSource={[
                          'التأكد من إضاءة جيدة',
                          'التقاط صورة واضحة للوحة الأرقام',
                          'تصوير جميع جوانب السيارة',
                          'التأكد من عدم وجود عوائق في الصورة'
                        ]}
                        renderItem={item => (
                          <List.Item>
                            <Text>{item}</Text>
                          </List.Item>
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'gallery',
            label: 'معرض الصور',
            children: (
              <div className="page-card">
                {photos.map(car => (
                  <Card 
                    key={car.id} 
                    title={
                      <div>
                        <CarOutlined style={{ marginLeft: 8 }} />
                        {car.carBrand} {car.carModel} - {car.plateNumber}
                      </div>
                    }
                    style={{ marginBottom: 16 }}
                    extra={
                      <div>
                        <Text type="secondary">العميل: {car.customerName}</Text>
                        <br />
                        <Text type="secondary">رقم الطلب: {car.orderId}</Text>
                      </div>
                    }
                  >
                    <Row gutter={[16, 16]}>
                      {car.photos.map(photo => (
                        <Col xs={24} sm={12} md={8} lg={6} key={photo.id}>
                          <Card
                            hoverable
                            cover={
                              <Image
                                alt={`صورة ${photo.typeName}`}
                                src={photo.url}
                                style={{ height: 200, objectFit: 'cover' }}
                              />
                            }
                            actions={[
                              <Tooltip title="عرض التفاصيل">
                                <EyeOutlined onClick={() => handleViewPhoto(photo)} />
                              </Tooltip>,
                              <Tooltip title="تحميل الصورة">
                                <DownloadOutlined onClick={() => handleDownloadPhoto(photo)} />
                              </Tooltip>,
                              <Tooltip title="حذف الصورة">
                                <DeleteOutlined 
                                  style={{ color: '#ff4d4f' }}
                                  onClick={() => handleDeletePhoto(photo.id)}
                                />
                              </Tooltip>
                            ]}
                          >
                            <div>
                              <div style={{ marginBottom: 8 }}>
                                <Tag color={photo.status === 'approved' ? 'green' : 'orange'}>
                                  {photo.status === 'approved' ? 'معتمدة' : 'قيد المراجعة'}
                                </Tag>
                                <Tag color="blue">{photo.typeName}</Tag>
                              </div>
                              <div>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                  بواسطة: {photo.uploadedBy}
                                </Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                  {new Date(photo.uploadedAt).toLocaleDateString('ar-SA')}
                                </Text>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                ))}
              </div>
            )
          }
        ]}
      />

      {/* نافذة تفاصيل الصورة */}
      <Modal
        title="تفاصيل الصورة"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedPhoto(null);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        {selectedPhoto && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSavePhoto}
            initialValues={{
              carBrand: '',
              carModel: '',
              plateNumber: '',
              photoType: 'front',
              notes: ''
            }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Image
                  src={selectedPhoto.url}
                  alt="صورة السيارة"
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="carBrand"
                  label="علامة السيارة"
                  rules={[{ required: true, message: 'يرجى اختيار علامة السيارة' }]}
                >
                  <Select placeholder="اختر علامة السيارة">
                    <Option value="toyota">تويوتا</Option>
                    <Option value="nissan">نيسان</Option>
                    <Option value="honda">هوندا</Option>
                    <Option value="hyundai">هيونداي</Option>
                    <Option value="kia">كيا</Option>
                    <Option value="ford">فورد</Option>
                    <Option value="chevrolet">شيفروليه</Option>
                    <Option value="bmw">بي إم دبليو</Option>
                    <Option value="mercedes">مرسيدس</Option>
                    <Option value="lexus">لكزس</Option>
                    <Option value="audi">أودي</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="carModel"
                  label="موديل السيارة"
                  rules={[{ required: true, message: 'يرجى إدخال موديل السيارة' }]}
                >
                  <Input placeholder="مثال: كامري، كورولا، إلخ" />
                </Form.Item>

                <Form.Item
                  name="plateNumber"
                  label="رقم اللوحة"
                  rules={[{ required: true, message: 'يرجى إدخال رقم اللوحة' }]}
                >
                  <Input placeholder="مثال: أ ب ج 1234" />
                </Form.Item>

                <Form.Item
                  name="photoType"
                  label="نوع الصورة"
                  rules={[{ required: true, message: 'يرجى اختيار نوع الصورة' }]}
                >
                  <Select placeholder="اختر نوع الصورة">
                    <Option value="front">أمامية</Option>
                    <Option value="back">خلفية</Option>
                    <Option value="side">جانبية</Option>
                    <Option value="interior">داخلية</Option>
                    <Option value="engine">المحرك</Option>
                    <Option value="damage">أضرار</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="notes"
                  label="ملاحظات"
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="أي ملاحظات إضافية حول الصورة"
                  />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      حفظ الصورة
                    </Button>
                    <Button onClick={() => {
                      setIsModalVisible(false);
                      setSelectedPhoto(null);
                      form.resetFields();
                    }}>
                      إلغاء
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default CarPhotos; 