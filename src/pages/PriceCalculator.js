import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Select, 
  Button, 
  Row, 
  Col, 
  Typography, 
  Divider, 
  Space, 
  Alert, 
  Tag, 
  Descriptions,
  Result,
  Steps,
  message
} from 'antd';
import { 
  CalculatorOutlined, 
  CarOutlined, 
  DollarOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { 
  getCarBrands, 
  getCarModels, 
  getCarSizes, 
  getServiceTypes, 
  calculateCarPrice 
} from '../data/mockData';
import CrossCheckProvider from '../components/CrossCheck/CrossCheckProvider';
import './Pages.css';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

const PriceCalculator = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [priceResult, setPriceResult] = useState(null);
  
  // بيانات القوائم
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [services, setServices] = useState([]);
  
  // القيم المحددة
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // تحميل البيانات الأولية
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [brandsData, servicesData] = await Promise.all([
        getCarBrands(),
        getServiceTypes()
      ]);
      setBrands(brandsData);
      setServices(servicesData);
    } catch (error) {
      message.error('فشل في تحميل البيانات');
    }
  };

  // تحميل الموديلات عند اختيار العلامة
  const handleBrandChange = async (brandKey) => {
    setSelectedBrand(brandKey);
    setSelectedModel(null);
    setSelectedSize(null);
    form.setFieldsValue({ model: undefined, size: undefined });
    
    if (brandKey) {
      try {
        const modelsData = await getCarModels(brandKey);
        setModels(modelsData);
      } catch (error) {
        message.error('فشل في تحميل الموديلات');
      }
    } else {
      setModels([]);
    }
  };

  // تحميل الأحجام عند اختيار الموديل
  const handleModelChange = async (modelKey) => {
    setSelectedModel(modelKey);
    setSelectedSize(null);
    form.setFieldsValue({ size: undefined });
    
    if (modelKey && selectedBrand) {
      try {
        const sizesData = await getCarSizes(selectedBrand, modelKey);
        setSizes(sizesData);
      } catch (error) {
        message.error('فشل في تحميل الأحجام');
      }
    } else {
      setSizes([]);
    }
  };

  // حساب السعر
  const calculatePrice = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      const result = await calculateCarPrice(
        values.brand,
        values.model,
        values.size,
        values.service
      );
      
      setPriceResult(result);
      setCurrentStep(2);
      message.success('تم حساب السعر بنجاح!');
    } catch (error) {
      message.error('يرجى التأكد من إدخال جميع البيانات المطلوبة');
    } finally {
      setLoading(false);
    }
  };

  // إعادة تعيين الحاسبة
  const resetCalculator = () => {
    form.resetFields();
    setPriceResult(null);
    setCurrentStep(0);
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedSize(null);
    setSelectedService(null);
    setModels([]);
    setSizes([]);
  };

  // الحصول على معلومات الخدمة المحددة
  const getSelectedServiceInfo = () => {
    return services.find(service => service.key === selectedService);
  };

  // الحصول على معلومات الحجم المحدد
  const getSelectedSizeInfo = () => {
    return sizes.find(size => size.key === selectedSize);
  };

  const steps = [
    {
      title: 'اختيار السيارة',
      description: 'حدد علامة وموديل السيارة'
    },
    {
      title: 'اختيار الخدمة',
      description: 'حدد نوع وحجم الخدمة'
    },
    {
      title: 'النتيجة',
      description: 'عرض السعر والتفاصيل'
    }
  ];

  return (
    <div className="price-calculator-page">
      <div className="page-header">
        <h1>حاسبة الأسعار</h1>
        <p>احسب سعر غسيل السيارة حسب النوع والحجم والخدمة</p>
      </div>

      {/* مكون فحص حاسبة الأسعار */}
      <CrossCheckProvider 
        sectionName="price-calculator" 
        position="top"
      />

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="page-card">
            <Steps current={currentStep} style={{ marginBottom: 32 }}>
              {steps.map((step, index) => (
                <Step
                  key={index}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </Steps>

            {currentStep === 0 && (
              <div>
                <Title level={4}>الخطوة الأولى: اختيار السيارة</Title>
                <Paragraph>
                  اختر علامة السيارة والموديل للحصول على الأسعار المناسبة
                </Paragraph>
                
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={() => setCurrentStep(1)}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="brand"
                        label="علامة السيارة"
                        rules={[{ required: true, message: 'يرجى اختيار علامة السيارة' }]}
                      >
                        <Select
                          placeholder="اختر علامة السيارة"
                          onChange={handleBrandChange}
                          showSearch
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {brands.map(brand => (
                            <Select.Option key={brand.key} value={brand.key}>
                              {brand.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="model"
                        label="موديل السيارة"
                        rules={[{ required: true, message: 'يرجى اختيار موديل السيارة' }]}
                      >
                        <Select
                          placeholder="اختر موديل السيارة"
                          onChange={handleModelChange}
                          disabled={!selectedBrand}
                          showSearch
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {models.map(model => (
                            <Select.Option key={model.key} value={model.key}>
                              {model.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Button 
                      type="primary" 
                      size="large"
                      onClick={() => setCurrentStep(1)}
                      disabled={!selectedBrand || !selectedModel}
                    >
                      التالي
                    </Button>
                  </div>
                </Form>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <Title level={4}>الخطوة الثانية: اختيار الخدمة</Title>
                <Paragraph>
                  اختر نوع وحجم الخدمة المطلوبة
                </Paragraph>
                
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={calculatePrice}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="size"
                        label="حجم السيارة"
                        rules={[{ required: true, message: 'يرجى اختيار حجم السيارة' }]}
                      >
                        <Select
                          placeholder="اختر حجم السيارة"
                          onChange={(value) => setSelectedSize(value)}
                          disabled={!selectedModel}
                        >
                          {sizes.map(size => (
                            <Select.Option key={size.key} value={size.key}>
                              {size.name} - {size.price} ريال
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="service"
                        label="نوع الخدمة"
                        rules={[{ required: true, message: 'يرجى اختيار نوع الخدمة' }]}
                      >
                        <Select
                          placeholder="اختر نوع الخدمة"
                          onChange={(value) => setSelectedService(value)}
                          showSearch
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {services.map(service => (
                            <Select.Option key={service.key} value={service.key}>
                              {service.name} - {service.basePrice} ريال
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* معلومات إضافية */}
                  {(selectedSize || selectedService) && (
                    <Card 
                      size="small" 
                      style={{ marginTop: 16, background: '#f6f8fa' }}
                    >
                      <Row gutter={[16, 16]}>
                        {selectedSize && (
                          <Col xs={24} md={12}>
                            <div>
                              <Text strong>الحجم المحدد:</Text>
                              <br />
                              <Text>{getSelectedSizeInfo()?.name}</Text>
                              <br />
                              <Text type="secondary">
                                السعر الأساسي: {getSelectedSizeInfo()?.price} ريال
                              </Text>
                            </div>
                          </Col>
                        )}
                        
                        {selectedService && (
                          <Col xs={24} md={12}>
                            <div>
                              <Text strong>الخدمة المحددة:</Text>
                              <br />
                              <Text>{getSelectedServiceInfo()?.name}</Text>
                              <br />
                              <Text type="secondary">
                                {getSelectedServiceInfo()?.description}
                              </Text>
                            </div>
                          </Col>
                        )}
                      </Row>
                    </Card>
                  )}
                  
                  <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Space>
                      <Button onClick={() => setCurrentStep(0)}>
                        السابق
                      </Button>
                      <Button 
                        type="primary" 
                        size="large"
                        onClick={calculatePrice}
                        loading={loading}
                        disabled={!selectedSize || !selectedService}
                      >
                        حساب السعر
                      </Button>
                    </Space>
                  </div>
                </Form>
              </div>
            )}

            {currentStep === 2 && priceResult && (
              <div>
                <Result
                  status="success"
                  icon={<CheckCircleOutlined />}
                  title="تم حساب السعر بنجاح!"
                  subTitle={`السعر الإجمالي: ${priceResult.price} ريال سعودي`}
                  extra={[
                    <Button type="primary" key="reset" onClick={resetCalculator}>
                      حساب جديد
                    </Button>
                  ]}
                />
                
                <Card style={{ marginTop: 24 }}>
                  <Descriptions title="تفاصيل الحساب" bordered>
                    <Descriptions.Item label="علامة السيارة" span={2}>
                      {priceResult.details.brand}
                    </Descriptions.Item>
                    <Descriptions.Item label="موديل السيارة" span={2}>
                      {priceResult.details.model}
                    </Descriptions.Item>
                    <Descriptions.Item label="حجم السيارة" span={2}>
                      {priceResult.details.size}
                    </Descriptions.Item>
                    <Descriptions.Item label="نوع الخدمة" span={2}>
                      {priceResult.details.service}
                    </Descriptions.Item>
                    <Descriptions.Item label="السعر الإجمالي" span={2}>
                      <Text strong style={{ fontSize: 18, color: '#52c41a' }}>
                        {priceResult.price} ريال سعودي
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="الوقت المتوقع" span={2}>
                      <Text>
                        <ClockCircleOutlined style={{ marginLeft: 4 }} />
                        {priceResult.time} دقيقة
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* معلومات مساعدة */}
          <Card title="معلومات مساعدة" className="page-card">
            <div style={{ marginBottom: 16 }}>
              <Title level={5}>
                <InfoCircleOutlined style={{ marginLeft: 4 }} />
                كيفية الاستخدام
              </Title>
              <Paragraph>
                1. اختر علامة السيارة من القائمة
                <br />
                2. اختر موديل السيارة المناسب
                <br />
                3. حدد حجم السيارة
                <br />
                4. اختر نوع الخدمة المطلوبة
                <br />
                5. اضغط على "حساب السعر"
              </Paragraph>
            </div>

            <Divider />

            <div style={{ marginBottom: 16 }}>
              <Title level={5}>
                <CarOutlined style={{ marginLeft: 4 }} />
                أنواع السيارات المدعومة
              </Title>
              <div>
                <Tag color="blue">تويوتا</Tag>
                <Tag color="green">نيسان</Tag>
                <Tag color="orange">هوندا</Tag>
                <Tag color="purple">هيونداي</Tag>
                <Tag color="cyan">كيا</Tag>
                <Tag color="magenta">فورد</Tag>
                <Tag color="red">شيفروليه</Tag>
                <Tag color="volcano">بي إم دبليو</Tag>
                <Tag color="geekblue">مرسيدس</Tag>
                <Tag color="lime">لكزس</Tag>
                <Tag color="gold">أودي</Tag>
              </div>
            </div>

            <Divider />

            <div>
              <Title level={5}>
                <DollarOutlined style={{ marginLeft: 4 }} />
                أنواع الخدمات
              </Title>
              <ul style={{ paddingLeft: 20 }}>
                <li>غسيل أساسي - 30 ريال</li>
                <li>غسيل قياسي - 50 ريال</li>
                <li>غسيل مميز - 80 ريال</li>
                <li>غسيل فاخر - 120 ريال</li>
                <li>غسيل داخلي - 60 ريال</li>
                <li>غسيل المحرك - 40 ريال</li>
              </ul>
            </div>
          </Card>

          {/* إحصائيات سريعة */}
          <Card title="إحصائيات سريعة" className="page-card" style={{ marginTop: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
                  {brands.length}
                </Text>
                <br />
                <Text type="secondary">علامة سيارة</Text>
              </div>
              
              <div style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#52c41a' }}>
                  {services.length}
                </Text>
                <br />
                <Text type="secondary">نوع خدمة</Text>
              </div>
              
              <div>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fa8c16' }}>
                  متوفر
                </Text>
                <br />
                <Text type="secondary">حاسبة الأسعار</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PriceCalculator; 