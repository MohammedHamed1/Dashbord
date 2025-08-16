import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Button,
  Space,
  Tag,
  List,
  Avatar,
  Divider,
  Tabs,
  Empty,
  Spin,
  Tooltip,
  Badge,
  Typography,
  Collapse,
  Checkbox,
  DatePicker,
  Slider
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ClearOutlined,
  SaveOutlined,
  StarOutlined,
  UserOutlined,
  CarOutlined,
  ShopOutlined,
  FileTextOutlined,
  DollarOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  HistoryOutlined,
  BookOutlined
} from '@ant-design/icons';
import { useToast } from '../utils/toastService';
import { searchAllData, getSearchHistory, saveSearchQuery } from '../data/mockData';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { Panel } = Collapse;

const SmartSearch = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [filters, setFilters] = useState({
    entities: ['orders', 'customers', 'employees', 'cars', 'laundries'],
    dateRange: null,
    status: 'all',
    priceRange: [0, 1000],
    location: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await getSearchHistory();
      setSearchHistory(history);
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.warning('يرجى إدخال نص للبحث');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // محاكاة البحث
      const results = await searchAllData(searchQuery, filters);
      setSearchResults(results);
      
      // حفظ البحث في التاريخ
      await saveSearchQuery(searchQuery, 'general');
      
      toast.success(`تم العثور على ${results.length} نتيجة`);
      
    } catch (err) {
      setError('حدث خطأ أثناء البحث');
      toast.error('حدث خطأ أثناء البحث');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTotalResults = (results) => {
    return Object.values(results).reduce((total, items) => total + items.length, 0);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      entities: ['orders', 'customers', 'employees', 'cars', 'laundries'],
      dateRange: null,
      status: 'all',
      priceRange: [0, 1000],
      location: 'all'
    });
  };

  const handleSaveSearch = async () => {
    try {
      await saveSearchQuery(searchQuery, filters);
      toast.success('تم حفظ البحث بنجاح');
      loadSearchHistory();
    } catch (error) {
      toast.error('خطأ في حفظ البحث');
    }
  };

  const handleLoadSavedSearch = (savedSearch) => {
    setSearchQuery(savedSearch.query);
    setFilters(savedSearch.filters);
    handleSearch(savedSearch.query);
  };

  const handleExport = () => {
    toast.info('سيتم تصدير النتائج قريباً');
  };

  const renderEntityIcon = (entity) => {
    const icons = {
      orders: <FileTextOutlined />,
      customers: <UserOutlined />,
      employees: <UserOutlined />,
      cars: <CarOutlined />,
      laundries: <ShopOutlined />,
      payments: <DollarOutlined />,
      maintenance: <CarOutlined />,
      attendance: <CalendarOutlined />
    };
    return icons[entity] || <FileTextOutlined />;
  };

  const renderEntityName = (entity) => {
    const names = {
      orders: 'الطلبات',
      customers: 'العملاء',
      employees: 'الموظفين',
      cars: 'السيارات',
      laundries: 'المغاسل',
      payments: 'المدفوعات',
      maintenance: 'الصيانة',
      attendance: 'الحضور'
    };
    return names[entity] || entity;
  };

  const renderResultItem = (item, entity) => {
    const renderers = {
      orders: (order) => (
        <List.Item
          actions={[
            <Tooltip title="عرض التفاصيل">
              <Button type="text" icon={<EyeOutlined />} />
            </Tooltip>,
            <Tooltip title="تعديل">
              <Button type="text" icon={<EditOutlined />} />
            </Tooltip>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={renderEntityIcon(entity)} />}
            title={`طلب #${order.id} - ${order.customerName}`}
            description={
              <Space direction="vertical" size="small">
                <Text>{order.serviceName} - ${order.price}</Text>
                <Space>
                  <Tag color={order.status === 'completed' ? 'green' : 'orange'}>
                    {order.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}
                  </Tag>
                  <Text type="secondary">
                    {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                  </Text>
                </Space>
              </Space>
            }
          />
        </List.Item>
      ),
      customers: (customer) => (
        <List.Item
          actions={[
            <Tooltip title="عرض التفاصيل">
              <Button type="text" icon={<EyeOutlined />} />
            </Tooltip>,
            <Tooltip title="تعديل">
              <Button type="text" icon={<EditOutlined />} />
            </Tooltip>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={customer.avatar} icon={<UserOutlined />} />}
            title={customer.name}
            description={
              <Space direction="vertical" size="small">
                <Space>
                  <PhoneOutlined />
                  <Text>{customer.phone}</Text>
                </Space>
                <Space>
                  <MailOutlined />
                  <Text>{customer.email}</Text>
                </Space>
                <Space>
                  <EnvironmentOutlined />
                  <Text>{customer.address}</Text>
                </Space>
              </Space>
            }
          />
        </List.Item>
      ),
      employees: (employee) => (
        <List.Item
          actions={[
            <Tooltip title="عرض التفاصيل">
              <Button type="text" icon={<EyeOutlined />} />
            </Tooltip>,
            <Tooltip title="تعديل">
              <Button type="text" icon={<EditOutlined />} />
            </Tooltip>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={employee.avatar} icon={<UserOutlined />} />}
            title={employee.name}
            description={
              <Space direction="vertical" size="small">
                <Text>{employee.position} - {employee.department}</Text>
                <Space>
                  <PhoneOutlined />
                  <Text>{employee.phone}</Text>
                </Space>
                <Space>
                  <Tag color="blue">{employee.status}</Tag>
                  <Text type="secondary">الراتب: ${employee.salary}</Text>
                </Space>
              </Space>
            }
          />
        </List.Item>
      ),
      cars: (car) => (
        <List.Item
          actions={[
            <Tooltip title="عرض التفاصيل">
              <Button type="text" icon={<EyeOutlined />} />
            </Tooltip>,
            <Tooltip title="تعديل">
              <Button type="text" icon={<EditOutlined />} />
            </Tooltip>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<CarOutlined />} />}
            title={`${car.brand} ${car.model}`}
            description={
              <Space direction="vertical" size="small">
                <Text>رقم اللوحة: {car.plateNumber}</Text>
                <Space>
                  <Tag color={car.status === 'available' ? 'green' : 'red'}>
                    {car.status === 'available' ? 'متاح' : 'غير متاح'}
                  </Tag>
                  <Text type="secondary">السنة: {car.year}</Text>
                </Space>
              </Space>
            }
          />
        </List.Item>
      ),
      laundries: (laundry) => (
        <List.Item
          actions={[
            <Tooltip title="عرض التفاصيل">
              <Button type="text" icon={<EyeOutlined />} />
            </Tooltip>,
            <Tooltip title="تعديل">
              <Button type="text" icon={<EditOutlined />} />
            </Tooltip>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<ShopOutlined />} />}
            title={laundry.name}
            description={
              <Space direction="vertical" size="small">
                <Space>
                  <EnvironmentOutlined />
                  <Text>{laundry.address}</Text>
                </Space>
                <Space>
                  <PhoneOutlined />
                  <Text>{laundry.phone}</Text>
                </Space>
                <Space>
                  <Tag color={laundry.status === 'active' ? 'green' : 'red'}>
                    {laundry.status === 'active' ? 'نشط' : 'غير نشط'}
                  </Tag>
                  <Text type="secondary">التقييم: {laundry.rating}/5</Text>
                </Space>
              </Space>
            }
          />
        </List.Item>
      )
    };

    return renderers[entity] ? renderers[entity](item) : (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar icon={renderEntityIcon(entity)} />}
          title={item.name || item.id}
          description={JSON.stringify(item)}
        />
      </List.Item>
    );
  };

  const items = [
    {
      key: 'results',
      label: 'نتائج البحث',
      children: (
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
              <div style={{ marginTop: '20px' }}>جاري البحث...</div>
            </div>
          ) : searchQuery ? (
            Object.keys(searchResults).length > 0 ? (
              Object.entries(searchResults).map(([entity, items]) => (
                items.length > 0 && (
                  <Card
                    key={entity}
                    title={
                      <Space>
                        {renderEntityIcon(entity)}
                        <span>{renderEntityName(entity)}</span>
                        <Badge count={items.length} style={{ backgroundColor: '#52c41a' }} />
                      </Space>
                    }
                    style={{ marginBottom: '16px' }}
                  >
                    <List
                      dataSource={items}
                      renderItem={(item) => renderResultItem(item, entity)}
                      pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} من ${total}`
                      }}
                    />
                  </Card>
                )
              ))
            ) : (
              <Empty
                description="لا توجد نتائج للبحث"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )
          ) : (
            <Empty
              description="ابدأ بالبحث عن أي شيء"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      )
    },
    {
      key: 'history',
      label: 'سجل البحث',
      children: (
        <div>
          {searchHistory.length > 0 ? (
            <List
              dataSource={searchHistory}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      icon={<SearchOutlined />}
                      onClick={() => handleLoadSavedSearch(item)}
                    >
                      إعادة البحث
                    </Button>,
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                    >
                      حذف
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.query}
                    description={
                      <Space direction="vertical" size="small">
                        <Text type="secondary">
                          {new Date(item.timestamp).toLocaleString('ar-SA')}
                        </Text>
                        <Space>
                          {item.filters?.entities?.map(entity => (
                            <Tag key={entity} color="blue">
                              {renderEntityName(entity)}
                            </Tag>
                          )) || (
                            <Tag color="blue">
                              {item.type ? renderEntityName(item.type) : 'عام'}
                            </Tag>
                          )}
                        </Space>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              description="لا يوجد سجل بحث"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <div className="smart-search-page">
      <div className="page-header">
        <h1>البحث الذكي</h1>
        <Space>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
          </Button>
          <Button
            icon={<SaveOutlined />}
            onClick={handleSaveSearch}
            disabled={!searchQuery}
          >
            حفظ البحث
          </Button>
          <Button
            icon={<ExportOutlined />}
            onClick={handleExport}
            disabled={!searchQuery || Object.keys(searchResults).length === 0}
          >
            تصدير النتائج
          </Button>
        </Space>
      </div>

      {/* Search Bar */}
      <Card className="search-card">
        <Search
          placeholder="ابحث في الطلبات، العملاء، الموظفين، السيارات، المغاسل..."
          enterButton={
            <Button type="primary" icon={<SearchOutlined />}>
              بحث
            </Button>
          }
          size="large"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          loading={loading}
        />
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card title="فلاتر متقدمة" className="filters-card">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div>
                <Text strong>الكيانات المطلوبة:</Text>
                <div style={{ marginTop: '8px' }}>
                  {['orders', 'customers', 'employees', 'cars', 'laundries', 'payments', 'maintenance', 'attendance'].map(entity => (
                    <Checkbox
                      key={entity}
                      checked={filters?.entities?.includes(entity) || false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange('entities', [...(filters?.entities || []), entity]);
                        } else {
                          handleFilterChange('entities', (filters?.entities || []).filter(e => e !== entity));
                        }
                      }}
                      style={{ marginRight: '16px', marginBottom: '8px' }}
                    >
                      {renderEntityName(entity)}
                    </Checkbox>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>نطاق السعر:</Text>
                  <Slider
                    range
                    min={0}
                    max={1000}
                    value={filters.priceRange}
                    onChange={(value) => handleFilterChange('priceRange', value)}
                    style={{ marginTop: '8px' }}
                  />
                  <Text type="secondary">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </Text>
                </div>
                <div>
                  <Text strong>نطاق التاريخ:</Text>
                  <RangePicker
                    value={filters.dateRange}
                    onChange={(dates) => handleFilterChange('dateRange', dates)}
                    style={{ width: '100%', marginTop: '8px' }}
                  />
                </div>
                <div>
                  <Text strong>الحالة:</Text>
                  <Select
                    value={filters.status}
                    onChange={(value) => handleFilterChange('status', value)}
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    <Select.Option value="all">جميع الحالات</Select.Option>
                    <Select.Option value="active">نشط</Select.Option>
                    <Select.Option value="inactive">غير نشط</Select.Option>
                    <Select.Option value="completed">مكتمل</Select.Option>
                    <Select.Option value="pending">قيد الانتظار</Select.Option>
                  </Select>
                </div>
              </Space>
            </Col>
          </Row>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <Button
              icon={<ClearOutlined />}
              onClick={handleClearFilters}
            >
              مسح الفلاتر
            </Button>
          </div>
        </Card>
      )}

      {/* Results */}
      <Card className="results-card">
        <Tabs
          items={items}
          defaultActiveKey="results"
        />
      </Card>
    </div>
  );
};

export default SmartSearch; 