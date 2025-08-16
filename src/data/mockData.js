// استيراد بيانات السيارات
import { 
  carBrands, 
  calculatePrice, 
  getServiceTime, 
  getBrandsList, 
  getModelsList, 
  getSizesList, 
  getServicesList,
  serviceTypes
} from './carModels';

// بيانات تجريبية شاملة
export const mockData = {
  // إحصائيات سريعة
  stats: {
    totalRevenue: 125000,
    totalOrders: 1250,
    totalUsers: 850,
    totalBranches: 12,
    monthlyRevenue: [45000, 52000, 48000, 61000, 58000, 67000, 72000, 68000, 75000, 82000, 78000, 89000],
    orderStatus: [
      { status: 'pending', count: 45, percentage: 15 },
      { status: 'processing', count: 78, percentage: 26 },
      { status: 'completed', count: 156, percentage: 52 },
      { status: 'cancelled', count: 21, percentage: 7 }
    ]
  },

  // الطلبات
  orders: [
    {
      id: 1,
      customerId: 1,
      customerName: 'أحمد محمد',
      customerPhone: '0501234567',
      carId: 1,
      carBrand: 'تويوتا',
      carModel: 'كامري',
      plateNumber: 'أ ب ج 1234',
      serviceType: 'premium',
      serviceName: 'غسيل مميز',
      price: 80,
      status: 'completed',
      createdAt: '2024-01-15T10:00:00',
      completedAt: '2024-01-15T11:30:00',
      branchId: 1,
      branchName: 'الفرع الرئيسي',
      employeeId: 1,
      employeeName: 'محمد علي',
      photos: [
        { id: 1, type: 'before', url: 'https://via.placeholder.com/400x300/1890ff/ffffff?text=قبل+الغسيل' },
        { id: 2, type: 'after', url: 'https://via.placeholder.com/400x300/52c41a/ffffff?text=بعد+الغسيل' }
      ],
      notes: 'السيارة كانت متسخة جداً'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'سارة أحمد',
      customerPhone: '0509876543',
      carId: 2,
      carBrand: 'نيسان',
      carModel: 'باترول',
      plateNumber: 'د ه و 5678',
      serviceType: 'luxury',
      serviceName: 'غسيل فاخر',
      price: 120,
      status: 'processing',
      createdAt: '2024-01-15T11:00:00',
      branchId: 2,
      branchName: 'فرع الرياض',
      employeeId: 2,
      employeeName: 'علي حسن',
      photos: [
        { id: 3, type: 'before', url: 'https://via.placeholder.com/400x300/722ed1/ffffff?text=قبل+الغسيل' }
      ],
      notes: 'طلب خاص للعميل'
    }
  ],

  // العملاء
  customers: [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '0501234567',
      address: 'الرياض، المملكة العربية السعودية',
      registrationDate: '2023-01-15',
      totalOrders: 25,
      totalSpent: 2500,
      loyaltyPoints: 1250,
      status: 'active',
      cars: [
        { id: 1, brand: 'تويوتا', model: 'كامري', plateNumber: 'أ ب ج 1234' }
      ]
    },
    {
      id: 2,
      name: 'سارة أحمد',
      email: 'sara@example.com',
      phone: '0509876543',
      address: 'جدة، المملكة العربية السعودية',
      registrationDate: '2023-03-20',
      totalOrders: 18,
      totalSpent: 1800,
      loyaltyPoints: 900,
      status: 'active',
      cars: [
        { id: 2, brand: 'نيسان', model: 'باترول', plateNumber: 'د ه و 5678' }
      ]
    }
  ],

  // الموظفين
  employees: [
    {
      id: 1,
      name: 'محمد علي',
      email: 'mohammed@example.com',
      phone: '0501111111',
      position: 'مدير فرع',
      branchId: 1,
      branchName: 'الفرع الرئيسي',
      hireDate: '2022-01-15',
      salary: 5000,
      status: 'active',
      performance: 95,
      attendance: 98
    },
    {
      id: 2,
      name: 'علي حسن',
      email: 'ali@example.com',
      phone: '0502222222',
      position: 'موظف غسيل',
      branchId: 2,
      branchName: 'فرع الرياض',
      hireDate: '2022-06-01',
      salary: 3500,
      status: 'active',
      performance: 88,
      attendance: 95
    }
  ],

  // الفروع
  branches: [
    {
      id: 1,
      name: 'الفرع الرئيسي',
      address: 'شارع الملك فهد، الرياض',
      phone: '0111234567',
      email: 'main@carlaundry.com',
      managerId: 1,
      managerName: 'محمد علي',
      status: 'active',
      capacity: 50,
      currentLoad: 35,
      revenue: 45000
    },
    {
      id: 2,
      name: 'فرع الرياض',
      address: 'شارع التحلية، الرياض',
      phone: '0119876543',
      email: 'riyadh@carlaundry.com',
      managerId: 2,
      managerName: 'علي حسن',
      status: 'active',
      capacity: 40,
      currentLoad: 28,
      revenue: 38000
    }
  ],

  // الباقات
  packages: [
    {
      id: 1,
      name: 'الباقة الأساسية',
      description: 'الخيار المثالي لمن يبحث عن نظافة أساسية مع توفير إضافي!',
      price: 150,
      originalPrice: 235,
      duration: 25,
      features: ['4 غسلات + غسلة مجانية', 'صابون إيطالي فاخر', 'غسيل بطبقتين', 'نظافة عميقة', 'لمعان يدوم'],
      status: 'active',
      savings: 85
    },
    {
      id: 2,
      name: 'الباقة المتقدمة',
      description: 'الخيار العملي للنظافة المثالية بسعر تنافسي',
      price: 280,
      originalPrice: 420,
      duration: 35,
      features: ['8 غسلات + غسلتان مجانيتان', 'صابون إيطالي فاخر', 'غسيل بطبقتين', 'نظافة عميقة', 'لمعان يدوم'],
      status: 'active',
      savings: 140
    },
    {
      id: 3,
      name: 'الباقة الشاملة',
      description: 'الخيار الأمثل لمن يريد العناية القصوى بسياراته مع أكبر قدر من التوفير',
      price: 490,
      originalPrice: 770,
      duration: 50,
      features: ['14 غسلة + 4 غسلات مجانية', 'صابون إيطالي فاخر', 'غسيل بطبقتين', 'عناية فائقة', 'حماية طويلة الأمد'],
      status: 'active',
      savings: 280
    },
    {
      id: 4,
      name: 'الباقة الفاخرة',
      description: 'غسيل شامل مع تلميع وتشمع',
      price: 120,
      duration: 75,
      features: ['غسيل خارجي', 'غسيل داخلي', 'تجفيف', 'تنظيف الزجاج', 'تعطير', 'تلميع', 'معالجة البقع', 'تشمع', 'تلميع الإطارات'],
      status: 'active'
    }
  ],

  // السيارات
  cars: [
    {
      id: 1,
      customerId: 1,
      brand: 'تويوتا',
      model: 'كامري',
      year: 2022,
      plateNumber: 'أ ب ج 1234',
      color: 'أبيض',
      vin: '1HGBH41JXMN109186',
      lastService: '2024-01-10',
      totalServices: 15,
      status: 'active'
    },
    {
      id: 2,
      customerId: 2,
      brand: 'نيسان',
      model: 'باترول',
      year: 2021,
      plateNumber: 'د ه و 5678',
      color: 'أسود',
      vin: '5NPE34AF4FH012345',
      lastService: '2024-01-12',
      totalServices: 8,
      status: 'active'
    }
  ],

  // صور السيارات
  carPhotos: [
    {
      id: 1,
      carId: 1,
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
        }
      ],
      customerName: 'محمد أحمد',
      customerPhone: '0501234567',
      orderId: 'ORD001',
      createdAt: '2024-01-15T10:00:00'
    }
  ],

  // الإحالات
  referrals: [
    {
      id: 1,
      customerId: 1,
      customerName: 'أحمد محمد',
      referredCustomerId: 3,
      referredCustomerName: 'فاطمة علي',
      referralCode: 'REF001',
      status: 'completed',
      reward: 50,
      createdAt: '2024-01-10',
      completedAt: '2024-01-15'
    }
  ],

  // برامج الولاء
  loyaltyPrograms: [
    {
      id: 1,
      name: 'برنامج الولاء الذهبي',
      description: 'برنامج مكافآت للعملاء المخلصين',
      pointsPerOrder: 10,
      pointsPerRiyal: 1,
      minPointsForReward: 100,
      rewardValue: 10,
      status: 'active'
    }
  ],

  // التقييمات
  ratings: [
    {
      id: 1,
      orderId: 1,
      customerId: 1,
      customerName: 'أحمد محمد',
      rating: 5,
      comment: 'خدمة ممتازة وسريعة',
      createdAt: '2024-01-15T12:00:00',
      status: 'approved'
    }
  ],

  // المدفوعات
  payments: [
    {
      id: 1,
      orderId: 1,
      amount: 80,
      method: 'card',
      status: 'completed',
      transactionId: 'TXN001',
      createdAt: '2024-01-15T11:30:00'
    }
  ],

  // الإشعارات
  notifications: [
    {
      id: 1,
      type: 'order',
      title: 'طلب جديد',
      message: 'تم استلام طلب جديد من العميل أحمد محمد',
      recipientId: 1,
      recipientType: 'employee',
      read: false,
      createdAt: '2024-01-15T10:00:00'
    }
  ],

  // الشكاوى
  complaints: [
    {
      id: 1,
      customerId: 1,
      customerName: 'أحمد محمد',
      orderId: 1,
      subject: 'مشكلة في الخدمة',
      description: 'السيارة لم يتم غسلها بشكل جيد',
      status: 'pending',
      priority: 'medium',
      createdAt: '2024-01-15T14:00:00'
    }
  ],

  // الدعم
  support: [
    {
      id: 1,
      customerId: 1,
      customerName: 'أحمد محمد',
      subject: 'استفسار عن الخدمات',
      message: 'أريد معرفة أنواع الخدمات المتوفرة',
      status: 'open',
      priority: 'low',
      createdAt: '2024-01-15T09:00:00'
    }
  ],

  // تذاكر الدعم
  supportTickets: [
    {
      id: 1,
      customerId: 1,
      customerName: 'أحمد محمد',
      subject: 'مشكلة في تطبيق الهاتف',
      description: 'لا يمكنني تسجيل الدخول إلى التطبيق',
      status: 'pending',
      priority: 'high',
      category: 'technical',
      channel: 'phone',
      assignedTo: 'محمد علي',
      createdAt: '2024-01-15T10:00:00',
      updatedAt: '2024-01-15T10:30:00'
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'سارة أحمد',
      subject: 'استفسار عن الفواتير',
      description: 'أريد معرفة تفاصيل الفاتورة الأخيرة',
      status: 'in_progress',
      priority: 'medium',
      category: 'billing',
      channel: 'email',
      assignedTo: 'علي حسن',
      createdAt: '2024-01-14T15:00:00',
      updatedAt: '2024-01-15T09:00:00'
    },
    {
      id: 3,
      customerId: 3,
      customerName: 'محمد حسن',
      subject: 'شكوى في جودة الخدمة',
      description: 'السيارة لم يتم غسلها بشكل جيد',
      status: 'resolved',
      priority: 'high',
      category: 'service',
      channel: 'chat',
      assignedTo: 'فاطمة علي',
      createdAt: '2024-01-13T14:00:00',
      updatedAt: '2024-01-14T16:00:00',
      resolvedAt: '2024-01-14T16:00:00'
    }
  ],

  // المخزون
  inventory: [
    {
      id: 1,
      name: 'شامبو غسيل السيارات',
      category: 'مواد غسيل',
      quantity: 50,
      unit: 'لتر',
      minQuantity: 10,
      price: 25,
      supplier: 'شركة المواد الكيميائية',
      lastRestock: '2024-01-10',
      status: 'in_stock'
    }
  ],

  // الصيانة
  maintenance: [
    {
      id: 1,
      equipmentId: 1,
      equipmentName: 'ماكينة غسيل',
      type: 'preventive',
      description: 'صيانة دورية للمعدات',
      scheduledDate: '2024-01-20',
      completedDate: null,
      status: 'scheduled',
      cost: 500,
      technician: 'محمد علي'
    }
  ],

  // الحضور
  attendance: [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'محمد علي',
      date: '2024-01-15',
      checkIn: '08:00',
      checkOut: '17:00',
      totalHours: 9,
      status: 'present'
    }
  ]
};

// وظائف API محاكية

// إحصائيات عامة
export const getDashboardStats = (role = 'admin') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // حساب الإحصائيات الإضافية
      const totalPayments = mockData.orders.reduce((sum, order) => sum + order.price, 0);
      const averageRating = 4.5; // قيمة افتراضية
      
      const dashboardData = {
        stats: {
          totalUsers: mockData.stats.totalUsers,
          totalOrders: mockData.stats.totalOrders,
          totalRevenue: mockData.stats.totalRevenue,
          monthlyRevenue: mockData.stats.monthlyRevenue[new Date().getMonth()],
          totalPayments: totalPayments,
          averageRating: averageRating
        },
        orderStatusData: [
          { name: 'مكتملة', value: 156, color: '#4CAF50' },
          { name: 'قيد التنفيذ', value: 78, color: '#2196F3' },
          { name: 'في الانتظار', value: 45, color: '#FF9800' },
          { name: 'ملغاة', value: 21, color: '#F44336' }
        ],
        revenueData: [
          { name: 'يناير', revenue: 45000, orders: 250, customers: 180 },
          { name: 'فبراير', revenue: 52000, orders: 316, customers: 220 },
          { name: 'مارس', revenue: 48000, orders: 284, customers: 200 },
          { name: 'أبريل', revenue: 61000, orders: 336, customers: 240 },
          { name: 'مايو', revenue: 58000, orders: 384, customers: 280 },
          { name: 'يونيو', revenue: 67000, orders: 350, customers: 260 },
          { name: 'يوليو', revenue: 72000, orders: 400, customers: 300 },
          { name: 'أغسطس', revenue: 68000, orders: 380, customers: 280 },
          { name: 'سبتمبر', revenue: 75000, orders: 420, customers: 320 },
          { name: 'أكتوبر', revenue: 82000, orders: 450, customers: 350 },
          { name: 'نوفمبر', revenue: 78000, orders: 430, customers: 330 },
          { name: 'ديسمبر', revenue: 89000, orders: 480, customers: 380 }
        ],
        latestActivities: [
          {
            id: 1,
            message: 'تم إنشاء طلب جديد #1234',
            user: 'علي محمود',
            timestamp: '2024-01-15T16:45:00Z',
            type: 'order_created'
          },
          {
            id: 2,
            message: 'تم إكمال الطلب #1230',
            user: 'محمد حسن',
            timestamp: '2024-01-15T14:20:00Z',
            type: 'order_completed'
          },
          {
            id: 3,
            message: 'انضم مستخدم جديد: نور الدين',
            user: 'نور الدين',
            timestamp: '2024-01-15T09:15:00Z',
            type: 'user_registered'
          },
          {
            id: 4,
            message: 'تم استلام دفعة بقيمة 150 ريال',
            user: 'علي محمود',
            timestamp: '2024-01-15T10:30:00Z',
            type: 'payment_received'
          },
          {
            id: 5,
            message: 'تم إلغاء الطلب #1228',
            user: 'نور الدين',
            timestamp: '2024-01-15T13:30:00Z',
            type: 'order_cancelled'
          }
        ]
      };
      
      resolve(dashboardData);
    }, 500);
  });
};

// الطلبات
export const getOrders = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredOrders = [...mockData.orders];
      
      if (filters.status) {
        filteredOrders = filteredOrders.filter(order => order.status === filters.status);
      }
      
      if (filters.branchId) {
        filteredOrders = filteredOrders.filter(order => order.branchId === filters.branchId);
      }
      
      if (filters.dateRange) {
        filteredOrders = filteredOrders.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= filters.dateRange[0] && orderDate <= filters.dateRange[1];
        });
      }
      
      resolve(filteredOrders);
    }, 300);
  });
};

export const createOrder = (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = {
        id: mockData.orders.length + 1,
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      mockData.orders.push(newOrder);
      resolve(newOrder);
    }, 500);
  });
};

export const updateOrder = (orderId, orderData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderIndex = mockData.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        mockData.orders[orderIndex] = {
          ...mockData.orders[orderIndex],
          ...orderData,
          updatedAt: new Date().toISOString()
        };
        resolve(mockData.orders[orderIndex]);
      } else {
        reject(new Error('الطلب غير موجود'));
      }
    }, 300);
  });
};

export const updateOrderStatus = (orderId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = mockData.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
        if (status === 'completed') {
          order.completedAt = new Date().toISOString();
        }
      }
      resolve(order);
    }, 300);
  });
};

// العملاء
export const getCustomers = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredCustomers = [...mockData.customers];
      
      if (filters.status) {
        filteredCustomers = filteredCustomers.filter(customer => customer.status === filters.status);
      }
      
      if (filters.search) {
        filteredCustomers = filteredCustomers.filter(customer => 
          customer.name.includes(filters.search) || 
          customer.phone.includes(filters.search) ||
          customer.email.includes(filters.search)
        );
      }
      
      resolve(filteredCustomers);
    }, 300);
  });
};

export const createCustomer = (customerData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCustomer = {
        id: mockData.customers.length + 1,
        ...customerData,
        registrationDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpent: 0,
        loyaltyPoints: 0,
        status: 'active',
        cars: []
      };
      mockData.customers.push(newCustomer);
      resolve(newCustomer);
    }, 500);
  });
};

// الموظفين
export const getEmployees = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredEmployees = [...mockData.employees];
      
      if (filters.branchId) {
        filteredEmployees = filteredEmployees.filter(employee => employee.branchId === filters.branchId);
      }
      
      if (filters.status) {
        filteredEmployees = filteredEmployees.filter(employee => employee.status === filters.status);
      }
      
      resolve(filteredEmployees);
    }, 300);
  });
};

// الفروع
export const getBranches = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData.branches);
    }, 300);
  });
};

// الباقات
export const getPackages = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData.packages);
    }, 300);
  });
};

// السيارات
export const getCars = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredCars = [...mockData.cars];
      
      if (filters.customerId) {
        filteredCars = filteredCars.filter(car => car.customerId === filters.customerId);
      }
      
      if (filters.brand) {
        filteredCars = filteredCars.filter(car => car.brand === filters.brand);
      }
      
      resolve(filteredCars);
    }, 300);
  });
};

// صور السيارات
export const getCarPhotos = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredPhotos = [...mockData.carPhotos];
      
      if (filters.carId) {
        filteredPhotos = filteredPhotos.filter(photo => photo.carId === filters.carId);
      }
      
      if (filters.status) {
        filteredPhotos = filteredPhotos.filter(photo => 
          photo.photos.some(p => p.status === filters.status)
        );
      }
      
      resolve(filteredPhotos);
    }, 300);
  });
};

export const uploadCarPhoto = (photoData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPhoto = {
        id: Date.now(),
        ...photoData,
        uploadedAt: new Date().toISOString(),
        status: 'pending'
      };
      
      // إضافة الصورة للسيارة المناسبة
      const carPhoto = mockData.carPhotos.find(cp => cp.carId === photoData.carId);
      if (carPhoto) {
        carPhoto.photos.push(newPhoto);
      } else {
        // إنشاء سجل جديد للسيارة
        mockData.carPhotos.push({
          id: mockData.carPhotos.length + 1,
          carId: photoData.carId,
          carBrand: photoData.carBrand,
          carModel: photoData.carModel,
          plateNumber: photoData.plateNumber,
          photos: [newPhoto],
          customerName: photoData.customerName,
          customerPhone: photoData.customerPhone,
          orderId: photoData.orderId,
          createdAt: new Date().toISOString()
        });
      }
      
      resolve(newPhoto);
    }, 500);
  });
};

export const approveCarPhoto = (photoId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (const carPhoto of mockData.carPhotos) {
        const photo = carPhoto.photos.find(p => p.id === photoId);
        if (photo) {
          photo.status = 'approved';
          resolve(photo);
          return;
        }
      }
      resolve(null);
    }, 300);
  });
};

// حساب أسعار السيارات
export const calculateCarPrice = (brand, model, size, serviceType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const price = calculatePrice(brand, model, size, serviceType);
      const time = getServiceTime(brand, model, size, serviceType);
      
      resolve({
        price,
        time,
        currency: 'SAR',
        details: {
          brand: carBrands[brand]?.name || brand,
          model: carBrands[brand]?.models[model]?.name || model,
          size: carBrands[brand]?.models[model]?.sizes[size]?.name || size,
          service: serviceTypes[serviceType]?.name || serviceType
        }
      });
    }, 200);
  });
};

// الحصول على قوائم السيارات
export const getCarBrands = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getBrandsList());
    }, 100);
  });
};

export const getCarModels = (brand) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getModelsList(brand));
    }, 100);
  });
};

export const getCarSizes = (brand, model) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getSizesList(brand, model));
    }, 100);
  });
};

export const getServiceTypes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
      resolve(getServicesList());
      } catch (error) {
        console.error('خطأ في getServiceTypes:', error);
        // إرجاع قائمة افتراضية في حالة الخطأ
        resolve([
          { key: 'basic', name: 'غسيل أساسي', nameEn: 'Basic Wash', description: 'غسيل خارجي أساسي', basePrice: 30, time: 20 },
          { key: 'standard', name: 'غسيل قياسي', nameEn: 'Standard Wash', description: 'غسيل خارجي وداخلي', basePrice: 50, time: 35 },
          { key: 'premium', name: 'غسيل مميز', nameEn: 'Premium Wash', description: 'غسيل شامل مع تلميع', basePrice: 80, time: 50 },
          { key: 'luxury', name: 'غسيل فاخر', nameEn: 'Luxury Wash', description: 'غسيل شامل مع تلميع وتشمع', basePrice: 120, time: 75 }
        ]);
      }
    }, 100);
  });
};

// الإحالات
export const getReferrals = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredReferrals = [...mockData.referrals];
      
      if (filters.status) {
        filteredReferrals = filteredReferrals.filter(ref => ref.status === filters.status);
      }
      
      resolve(filteredReferrals);
    }, 300);
  });
};

// برامج الولاء
export const getLoyaltyPrograms = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData.loyaltyPrograms);
    }, 300);
  });
};

// التقييمات
export const getRatings = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredRatings = [...mockData.ratings];
      
      if (filters.rating) {
        filteredRatings = filteredRatings.filter(rating => rating.rating === filters.rating);
      }
      
      if (filters.status) {
        filteredRatings = filteredRatings.filter(rating => rating.status === filters.status);
      }
      
      resolve(filteredRatings);
    }, 300);
  });
};

// المدفوعات
export const getPayments = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredPayments = [...mockData.payments];
      
      if (filters.status) {
        filteredPayments = filteredPayments.filter(payment => payment.status === filters.status);
      }
      
      if (filters.method) {
        filteredPayments = filteredPayments.filter(payment => payment.method === filters.method);
      }
      
      resolve(filteredPayments);
    }, 300);
  });
};

// الإشعارات
export const getNotifications = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredNotifications = [...mockData.notifications];
      
      if (filters.read !== undefined) {
        filteredNotifications = filteredNotifications.filter(notification => notification.read === filters.read);
      }
      
      if (filters.type) {
        filteredNotifications = filteredNotifications.filter(notification => notification.type === filters.type);
      }
      
      resolve(filteredNotifications);
    }, 300);
  });
};

// الشكاوى
export const getComplaints = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredComplaints = [...mockData.complaints];
      
      if (filters.status) {
        filteredComplaints = filteredComplaints.filter(complaint => complaint.status === filters.status);
      }
      
      if (filters.priority) {
        filteredComplaints = filteredComplaints.filter(complaint => complaint.priority === filters.priority);
      }
      
      resolve(filteredComplaints);
    }, 300);
  });
};

// الدعم
export const getSupportTickets = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredTickets = [...mockData.supportTickets];
      
      if (filters.status) {
        filteredTickets = filteredTickets.filter(ticket => ticket.status === filters.status);
      }
      
      if (filters.priority) {
        filteredTickets = filteredTickets.filter(ticket => ticket.priority === filters.priority);
      }
      
      if (filters.category) {
        filteredTickets = filteredTickets.filter(ticket => ticket.category === filters.category);
      }
      
      if (filters.channel) {
        filteredTickets = filteredTickets.filter(ticket => ticket.channel === filters.channel);
      }
      
      resolve(filteredTickets);
    }, 300);
  });
};

// المخزون
export const getInventory = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredInventory = [...mockData.inventory];
      
      if (filters.category) {
        filteredInventory = filteredInventory.filter(item => item.category === filters.category);
      }
      
      if (filters.status) {
        filteredInventory = filteredInventory.filter(item => item.status === filters.status);
      }
      
      if (filters.lowStock) {
        filteredInventory = filteredInventory.filter(item => item.quantity <= item.minQuantity);
      }
      
      resolve(filteredInventory);
    }, 300);
  });
};

// الصيانة
export const getMaintenance = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMaintenance = [...mockData.maintenance];
      
      if (filters.status) {
        filteredMaintenance = filteredMaintenance.filter(maintenance => maintenance.status === filters.status);
      }
      
      if (filters.type) {
        filteredMaintenance = filteredMaintenance.filter(maintenance => maintenance.type === filters.type);
      }
      
      resolve(filteredMaintenance);
    }, 300);
  });
};

// الحضور
export const getAttendance = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredAttendance = [...mockData.attendance];
      
      if (filters.employeeId) {
        filteredAttendance = filteredAttendance.filter(attendance => attendance.employeeId === filters.employeeId);
      }
      
      if (filters.date) {
        filteredAttendance = filteredAttendance.filter(attendance => attendance.date === filters.date);
      }
      
      if (filters.status) {
        filteredAttendance = filteredAttendance.filter(attendance => attendance.status === filters.status);
      }
      
      resolve(filteredAttendance);
    }, 300);
  });
};

// البحث الذكي
export const smartSearch = (query, filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = {
        orders: [],
        customers: [],
        cars: [],
        employees: []
      };
      
      if (query) {
        // البحث في الطلبات
        results.orders = mockData.orders.filter(order => 
          order.customerName.includes(query) ||
          order.plateNumber.includes(query) ||
          order.orderId.toString().includes(query)
        );
        
        // البحث في العملاء
        results.customers = mockData.customers.filter(customer => 
          customer.name.includes(query) ||
          customer.phone.includes(query) ||
          customer.email.includes(query)
        );
        
        // البحث في السيارات
        results.cars = mockData.cars.filter(car => 
          car.plateNumber.includes(query) ||
          car.brand.includes(query) ||
          car.model.includes(query)
        );
        
        // البحث في الموظفين
        results.employees = mockData.employees.filter(employee => 
          employee.name.includes(query) ||
          employee.email.includes(query) ||
          employee.phone.includes(query)
        );
      }
      
      resolve(results);
    }, 500);
  });
};

// تصدير البيانات
export const exportData = (type, filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [];
      
      switch (type) {
        case 'orders':
          data = mockData.orders;
          break;
        case 'customers':
          data = mockData.customers;
          break;
        case 'employees':
          data = mockData.employees;
          break;
        case 'cars':
          data = mockData.cars;
          break;
        default:
          data = [];
      }
      
      // تطبيق الفلاتر
      if (filters.status) {
        data = data.filter(item => item.status === filters.status);
      }
      
      if (filters.dateRange) {
        data = data.filter(item => {
          const itemDate = new Date(item.createdAt || item.registrationDate || item.hireDate);
          return itemDate >= filters.dateRange[0] && itemDate <= filters.dateRange[1];
        });
      }
      
      resolve({
        data,
        filename: `${type}_export_${new Date().toISOString().split('T')[0]}.json`,
        count: data.length
      });
    }, 1000);
  });
};

export const getAttendanceData = (filters = {}) => {
  let filteredData = [...mockData.attendance];
  
  if (filters.employeeId) {
    filteredData = filteredData.filter(item => item.employeeId === filters.employeeId);
  }
  
  if (filters.branchId) {
    filteredData = filteredData.filter(item => item.branchId === filters.branchId);
  }
  
  if (filters.date) {
    filteredData = filteredData.filter(item => item.date === filters.date);
  }
  
  if (filters.status) {
    filteredData = filteredData.filter(item => item.status === filters.status);
  }
  
  return filteredData;
};

export const getAttendanceStats = () => {
  const totalEmployees = mockData.employees.length;
  const presentToday = mockData.attendance.filter(item => 
    item.date === new Date().toISOString().split('T')[0] && item.status === 'present'
  ).length;
  const absentToday = mockData.attendance.filter(item => 
    item.date === new Date().toISOString().split('T')[0] && item.status === 'absent'
  ).length;
  const lateToday = mockData.attendance.filter(item => 
    item.date === new Date().toISOString().split('T')[0] && item.status === 'late'
  ).length;
  
  return {
    totalEmployees,
    presentToday,
    absentToday,
    lateToday,
    attendanceRate: Math.round((presentToday / totalEmployees) * 100)
  };
};

export const getPermissionsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const permissions = [
        {
          id: 1,
          name: 'dashboard.view',
          description: 'عرض لوحة التحكم',
          category: 'dashboard',
          status: 'active'
        },
        {
          id: 2,
          name: 'orders.view',
          description: 'عرض الطلبات',
          category: 'orders',
          status: 'active'
        },
        {
          id: 3,
          name: 'orders.create',
          description: 'إنشاء طلبات',
          category: 'orders',
          status: 'active'
        },
        {
          id: 4,
          name: 'orders.edit',
          description: 'تعديل الطلبات',
          category: 'orders',
          status: 'active'
        },
        {
          id: 5,
          name: 'orders.delete',
          description: 'حذف الطلبات',
          category: 'orders',
          status: 'active'
        },
        {
          id: 6,
          name: 'customers.view',
          description: 'عرض العملاء',
          category: 'customers',
          status: 'active'
        },
        {
          id: 7,
          name: 'customers.create',
          description: 'إنشاء عملاء',
          category: 'customers',
          status: 'active'
        },
        {
          id: 8,
          name: 'employees.view',
          description: 'عرض الموظفين',
          category: 'employees',
          status: 'active'
        },
        {
          id: 9,
          name: 'employees.create',
          description: 'إنشاء موظفين',
          category: 'employees',
          status: 'active'
        },
        {
          id: 10,
          name: 'reports.view',
          description: 'عرض التقارير',
          category: 'reports',
          status: 'active'
        }
      ];
      resolve(permissions);
    }, 300);
  });
};

export const getRolesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const roles = [
        {
          id: 1,
          key: 'admin',
          name: 'مدير النظام',
          description: 'صلاحيات كاملة على النظام',
          userCount: 3,
          permissions: ['dashboard.view', 'orders.view', 'orders.create', 'orders.edit', 'orders.delete', 'customers.view', 'customers.create', 'employees.view', 'employees.create', 'reports.view'],
          status: 'active',
          createdAt: '2023-01-01'
        },
        {
          id: 2,
          key: 'manager',
          name: 'مدير فرع',
          description: 'إدارة فرع واحد أو أكثر',
          userCount: 8,
          permissions: ['dashboard.view', 'orders.view', 'orders.create', 'orders.edit', 'customers.view', 'customers.create', 'employees.view', 'reports.view'],
          status: 'active',
          createdAt: '2023-01-15'
        },
        {
          id: 3,
          key: 'employee',
          name: 'موظف',
          description: 'موظف عادي',
          userCount: 25,
          permissions: ['dashboard.view', 'orders.view', 'orders.create', 'customers.view'],
          status: 'active',
          createdAt: '2023-02-01'
        },
        {
          id: 4,
          key: 'customer',
          name: 'عميل',
          description: 'عميل عادي',
          userCount: 150,
          permissions: ['orders.view'],
          status: 'active',
          createdAt: '2023-03-01'
        }
      ];
      resolve(roles);
    }, 300);
  });
};

export const getUsersData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = [
        {
          id: 1,
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '0501234567',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-15T10:30:00',
          createdAt: '2023-01-01'
        },
        {
          id: 2,
          name: 'فاطمة علي',
          email: 'fatima@example.com',
          phone: '0509876543',
          role: 'manager',
          status: 'active',
          lastLogin: '2024-01-15T09:15:00',
          createdAt: '2023-01-15'
        },
        {
          id: 3,
          name: 'محمد حسن',
          email: 'mohammed@example.com',
          phone: '0501111111',
          role: 'employee',
          status: 'active',
          lastLogin: '2024-01-15T08:45:00',
          createdAt: '2023-02-01'
        },
        {
          id: 4,
          name: 'سارة أحمد',
          email: 'sara@example.com',
          phone: '0502222222',
          role: 'customer',
          status: 'active',
          lastLogin: '2024-01-14T16:20:00',
          createdAt: '2023-03-01'
        }
      ];
      resolve(users);
    }, 300);
  });
};

export const getExportHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const history = [
        {
          id: 1,
          type: 'orders',
          format: 'excel',
          status: 'completed',
          createdAt: '2024-01-15T10:00:00',
          completedAt: '2024-01-15T10:05:00',
          recordsCount: 1250,
          fileSize: '2.5 MB'
        },
        {
          id: 2,
          type: 'customers',
          format: 'pdf',
          status: 'completed',
          createdAt: '2024-01-14T15:30:00',
          completedAt: '2024-01-14T15:35:00',
          recordsCount: 850,
          fileSize: '1.8 MB'
        },
        {
          id: 3,
          type: 'employees',
          format: 'csv',
          status: 'pending',
          createdAt: '2024-01-15T11:00:00',
          recordsCount: 45
        }
      ];
      resolve(history);
    }, 300);
  });
};

export const scheduleExport = (exportData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newExport = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...exportData,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      resolve(newExport);
    }, 300);
  });
};

export const getMaintenanceData = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = [...mockData.maintenance];
      
      if (filters.status) {
        filteredData = filteredData.filter(item => item.status === filters.status);
      }
      
      if (filters.type) {
        filteredData = filteredData.filter(item => item.type === filters.type);
      }
      
      if (filters.branchId) {
        filteredData = filteredData.filter(item => item.branchId === filters.branchId);
      }
      
      resolve(filteredData);
    }, 300);
  });
};

export const getMaintenanceStats = () => {
  const totalMaintenance = mockData.maintenance.length;
  const completedMaintenance = mockData.maintenance.filter(item => item.status === 'completed').length;
  const inProgressMaintenance = mockData.maintenance.filter(item => item.status === 'in_progress').length;
  const scheduledMaintenance = mockData.maintenance.filter(item => item.status === 'scheduled').length;
  const urgentMaintenance = mockData.maintenance.filter(item => item.priority === 'high').length;
  
  return {
    totalMaintenance,
    completedMaintenance,
    inProgressMaintenance,
    scheduledMaintenance,
    urgentMaintenance,
    completionRate: Math.round((completedMaintenance / totalMaintenance) * 100)
  };
};

export const getSearchHistory = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const history = [
        {
          id: 1,
          query: 'أحمد محمد',
          type: 'customer',
          timestamp: '2024-01-15T10:30:00',
          results: 3
        },
        {
          id: 2,
          query: 'تويوتا كامري',
          type: 'car',
          timestamp: '2024-01-15T09:15:00',
          results: 5
        },
        {
          id: 3,
          query: 'طلب #1234',
          type: 'order',
          timestamp: '2024-01-14T16:45:00',
          results: 1
        }
      ];
      resolve(history);
    }, 300);
  });
};

export const searchAllData = (query, filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = {
        orders: [],
        customers: [],
        cars: [],
        employees: []
      };
      
      if (query) {
        // البحث في الطلبات
        results.orders = mockData.orders.filter(order => 
          order.customerName.includes(query) ||
          order.plateNumber.includes(query) ||
          order.id.toString().includes(query)
        );
        
        // البحث في العملاء
        results.customers = mockData.customers.filter(customer => 
          customer.name.includes(query) ||
          customer.phone.includes(query) ||
          customer.email.includes(query)
        );
        
        // البحث في السيارات
        results.cars = mockData.cars.filter(car => 
          car.plateNumber.includes(query) ||
          car.brand.includes(query) ||
          car.model.includes(query)
        );
        
        // البحث في الموظفين
        results.employees = mockData.employees.filter(employee => 
          employee.name.includes(query) ||
          employee.email.includes(query) ||
          employee.phone.includes(query)
        );
      }
      
      resolve(results);
    }, 500);
  });
};

export const saveSearchQuery = (query, type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSearch = {
        id: Math.floor(Math.random() * 1000) + 1,
        query,
        type,
        timestamp: new Date().toISOString()
      };
      resolve(newSearch);
    }, 300);
  });
};

// دوال إضافية مطلوبة للمكونات
export const getRevenueData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const revenueData = [
        { name: 'يناير', revenue: 45000, orders: 250, customers: 180 },
        { name: 'فبراير', revenue: 52000, orders: 316, customers: 220 },
        { name: 'مارس', revenue: 48000, orders: 284, customers: 200 },
        { name: 'أبريل', revenue: 61000, orders: 336, customers: 240 },
        { name: 'مايو', revenue: 58000, orders: 384, customers: 280 },
        { name: 'يونيو', revenue: 67000, orders: 350, customers: 260 },
        { name: 'يوليو', revenue: 72000, orders: 400, customers: 300 },
        { name: 'أغسطس', revenue: 68000, orders: 380, customers: 280 },
        { name: 'سبتمبر', revenue: 75000, orders: 420, customers: 320 },
        { name: 'أكتوبر', revenue: 82000, orders: 450, customers: 350 },
        { name: 'نوفمبر', revenue: 78000, orders: 430, customers: 330 },
        { name: 'ديسمبر', revenue: 89000, orders: 480, customers: 380 }
      ];
      resolve(revenueData);
    }, 300);
  });
};

export const getOrderStatusData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const statusData = [
        { name: 'مكتملة', value: 156, color: '#4CAF50' },
        { name: 'قيد التنفيذ', value: 78, color: '#2196F3' },
        { name: 'في الانتظار', value: 45, color: '#FF9800' },
        { name: 'ملغاة', value: 21, color: '#F44336' }
      ];
      resolve(statusData);
    }, 300);
  });
};

export const getLatestActivities = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const activities = [
        {
          id: 1,
          message: 'تم إنشاء طلب جديد #1234',
          user: 'علي محمود',
          timestamp: '2024-01-15T16:45:00Z',
          type: 'order_created'
        },
        {
          id: 2,
          message: 'تم إكمال الطلب #1230',
          user: 'محمد حسن',
          timestamp: '2024-01-15T14:20:00Z',
          type: 'order_completed'
        },
        {
          id: 3,
          message: 'انضم مستخدم جديد: نور الدين',
          user: 'نور الدين',
          timestamp: '2024-01-15T09:15:00Z',
          type: 'user_registered'
        },
        {
          id: 4,
          message: 'تم استلام دفعة بقيمة 150 ريال',
          user: 'علي محمود',
          timestamp: '2024-01-15T10:30:00Z',
          type: 'payment_received'
        },
        {
          id: 5,
          message: 'تم إلغاء الطلب #1228',
          user: 'نور الدين',
          timestamp: '2024-01-15T13:30:00Z',
          type: 'order_cancelled'
        }
      ];
      resolve(activities);
    }, 300);
  });
};

// دالة رئيسية لجلب بيانات لوحة التحكم
export const getDashboardData = async (role = 'admin') => {
  try {
    const [stats, orderStatusData, revenueData, latestActivities] = await Promise.all([
      getDashboardStats(role),
      getOrderStatusData(),
      getRevenueData(),
      getLatestActivities()
    ]);

    return {
      stats,
      orderStatusData,
      revenueData,
      latestActivities
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// دوال المستخدمين
export const createUser = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: mockData.users.length + 1,
        ...userData,
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      mockData.users.push(newUser);
      resolve(newUser);
    }, 500);
  });
};

export const updateUser = (userId, userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockData.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        mockData.users[userIndex] = {
          ...mockData.users[userIndex],
          ...userData,
          updatedAt: new Date().toISOString()
        };
        resolve(mockData.users[userIndex]);
      } else {
        reject(new Error('المستخدم غير موجود'));
      }
    }, 300);
  });
};

export const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockData.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        const deleted = mockData.users.splice(userIndex, 1);
        resolve(deleted[0]);
      } else {
        reject(new Error('المستخدم غير موجود'));
      }
    }, 300);
  });
}; 