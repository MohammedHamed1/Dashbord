// بيانات فحص الأقسام المختلفة
const sectionData = {
  // بيانات فحص الطلبات
  orders: {
    status: 'success',
    issues: 0,
    warnings: 2,
    successRate: 95,
    lastCheck: new Date().toISOString(),
    details: {
      totalOrders: 150,
      pendingOrders: 5,
      completedOrders: 140,
      cancelledOrders: 5,
      ordersWithoutStatus: 2,
      oldPendingOrders: 1
    },
    alerts: [
      {
        type: 'warning',
        message: '2 طلب بدون حالة محددة',
        action: 'مراجعة الطلبات المعلقة'
      }
    ]
  },

  // بيانات فحص العملاء
  customers: {
    status: 'success',
    issues: 0,
    warnings: 1,
    successRate: 98,
    lastCheck: new Date().toISOString(),
    details: {
      totalCustomers: 250,
      activeCustomers: 245,
      inactiveCustomers: 5,
      customersWithoutEmail: 3,
      customersWithoutPhone: 0
    },
    alerts: [
      {
        type: 'warning',
        message: '3 عملاء بدون بريد إلكتروني',
        action: 'تحديث بيانات العملاء'
      }
    ]
  },

  // بيانات فحص الموظفين
  employees: {
    status: 'warning',
    issues: 1,
    warnings: 3,
    successRate: 85,
    lastCheck: new Date().toISOString(),
    details: {
      totalEmployees: 20,
      activeEmployees: 18,
      inactiveEmployees: 2,
      employeesWithoutAttendance: 3,
      employeesWithoutBranch: 1
    },
    alerts: [
      {
        type: 'error',
        message: '1 موظف غير مرتبط بفرع',
        action: 'تخصيص الفروع للموظفين'
      },
      {
        type: 'warning',
        message: '3 موظفين لم يسجلوا الحضور اليوم',
        action: 'متابعة سجلات الحضور'
      }
    ]
  },

  // بيانات فحص الفروع
  branches: {
    status: 'success',
    issues: 0,
    warnings: 1,
    successRate: 92,
    lastCheck: new Date().toISOString(),
    details: {
      totalBranches: 8,
      activeBranches: 8,
      inactiveBranches: 0,
      branchesWithoutManager: 1,
      branchesWithoutEmployees: 0
    },
    alerts: [
      {
        type: 'warning',
        message: '1 فرع بدون مدير',
        action: 'تعيين مدير للفرع'
      }
    ]
  },

  // بيانات فحص الباقات
  packages: {
    status: 'success',
    issues: 0,
    warnings: 0,
    successRate: 100,
    lastCheck: new Date().toISOString(),
    details: {
      totalPackages: 15,
      activePackages: 15,
      inactivePackages: 0,
      packagesWithoutPrice: 0,
      packagesWithoutDuration: 0
    },
    alerts: []
  },

  // بيانات فحص السيارات
  cars: {
    status: 'success',
    issues: 0,
    warnings: 2,
    successRate: 90,
    lastCheck: new Date().toISOString(),
    details: {
      totalCars: 180,
      activeCars: 175,
      inactiveCars: 5,
      carsWithoutQR: 2,
      carsWithoutOwner: 0
    },
    alerts: [
      {
        type: 'warning',
        message: '2 سيارة بدون QR Code',
        action: 'إنشاء QR Codes للسيارات'
      }
    ]
  },

  // بيانات فحص صور السيارات
  'car-photos': {
    status: 'warning',
    issues: 0,
    warnings: 4,
    successRate: 80,
    lastCheck: new Date().toISOString(),
    details: {
      totalPhotos: 500,
      approvedPhotos: 400,
      pendingPhotos: 80,
      rejectedPhotos: 20,
      photosWithoutCar: 4
    },
    alerts: [
      {
        type: 'warning',
        message: '4 صور بدون ربط بسيارة',
        action: 'ربط الصور بالسيارات'
      }
    ]
  },

  // بيانات فحص حاسبة الأسعار
  'price-calculator': {
    status: 'success',
    issues: 0,
    warnings: 0,
    successRate: 100,
    lastCheck: new Date().toISOString(),
    details: {
      totalCalculations: 1000,
      successfulCalculations: 1000,
      failedCalculations: 0,
      averageCalculationTime: '0.5s'
    },
    alerts: []
  },

  // بيانات فحص العمليات
  operations: {
    status: 'success',
    issues: 0,
    warnings: 1,
    successRate: 96,
    lastCheck: new Date().toISOString(),
    details: {
      totalOperations: 200,
      activeOperations: 15,
      completedOperations: 180,
      pendingOperations: 5,
      operationsWithoutAssignment: 1
    },
    alerts: [
      {
        type: 'warning',
        message: '1 عملية بدون تخصيص موظف',
        action: 'تخصيص الموظفين للعمليات'
      }
    ]
  },

  // بيانات فحص التتبع المباشر
  'live-tracking': {
    status: 'success',
    issues: 0,
    warnings: 0,
    successRate: 100,
    lastCheck: new Date().toISOString(),
    details: {
      totalTrackedItems: 25,
      activeTracking: 15,
      completedTracking: 10,
      trackingAccuracy: '99%'
    },
    alerts: []
  },

  // بيانات فحص الداشبورد
  dashboard: {
    status: 'success',
    issues: 0,
    warnings: 2,
    successRate: 94,
    lastCheck: new Date().toISOString(),
    details: {
      totalSections: 12,
      healthySections: 10,
      warningSections: 2,
      errorSections: 0,
      systemUptime: '99.9%'
    },
    alerts: [
      {
        type: 'warning',
        message: '2 أقسام تحتاج مراجعة',
        action: 'فحص الأقسام المحددة'
      }
    ]
  }
};

// دالة لتوليد بيانات فحص لقسم معين
export const generateCrossCheckData = (sectionName) => {
  const data = sectionData[sectionName];
  
  if (!data) {
    // بيانات افتراضية إذا لم يتم العثور على القسم
    return {
      status: 'unknown',
      issues: 0,
      warnings: 0,
      successRate: 0,
      lastCheck: new Date().toISOString(),
      details: {},
      alerts: []
    };
  }

  // إضافة بعض العشوائية للبيانات لتكون أكثر واقعية
  const randomFactor = Math.random();
  const updatedData = { ...data };
  
  if (randomFactor > 0.8) {
    // 20% احتمال وجود مشاكل إضافية
    updatedData.issues += Math.floor(Math.random() * 2) + 1;
    updatedData.warnings += Math.floor(Math.random() * 3) + 1;
    updatedData.successRate = Math.max(70, updatedData.successRate - Math.floor(Math.random() * 10));
    updatedData.status = updatedData.issues > 0 ? 'error' : 'warning';
  }

  return updatedData;
};

// دالة لفحص قسم معين (محاكاة فحص حقيقي)
export const checkSection = async (sectionName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = generateCrossCheckData(sectionName);
      resolve(data);
    }, Math.random() * 2000 + 500); // فحص يستغرق 0.5-2.5 ثانية
  });
};

// دالة لفحص جميع الأقسام
export const checkAllSections = async () => {
  const sections = Object.keys(sectionData);
  const results = {};
  
  for (const section of sections) {
    results[section] = await checkSection(section);
  }
  
  return results;
};

// دالة لحساب الإحصائيات الإجمالية
export const calculateOverallStats = (allData) => {
  let totalIssues = 0;
  let totalWarnings = 0;
  let totalSuccessRate = 0;
  let healthySections = 0;
  let warningSections = 0;
  let errorSections = 0;
  
  Object.values(allData).forEach(data => {
    totalIssues += data.issues;
    totalWarnings += data.warnings;
    totalSuccessRate += data.successRate;
    
    if (data.status === 'success') healthySections++;
    else if (data.status === 'warning') warningSections++;
    else if (data.status === 'error') errorSections++;
  });
  
  const totalSections = Object.keys(allData).length;
  
  return {
    totalIssues,
    totalWarnings,
    averageSuccessRate: Math.round(totalSuccessRate / totalSections),
    healthySections,
    warningSections,
    errorSections,
    totalSections,
    overallStatus: errorSections > 0 ? 'error' : warningSections > 0 ? 'warning' : 'success'
  };
}; 