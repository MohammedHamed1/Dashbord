// أنواع السيارات المتوفرة في السعودية مع أسعار الغسيل

export const carBrands = {
  toyota: {
    name: 'تويوتا',
    nameEn: 'Toyota',
    models: {
      camry: {
        name: 'كامري',
        nameEn: 'Camry',
        sizes: {
          sedan: { name: 'سيدان', price: 50, time: 30 },
          hybrid: { name: 'هجين', price: 60, time: 35 }
        }
      },
      corolla: {
        name: 'كورولا',
        nameEn: 'Corolla',
        sizes: {
          sedan: { name: 'سيدان', price: 45, time: 25 },
          hatchback: { name: 'هاتشباك', price: 40, time: 20 }
        }
      },
      landCruiser: {
        name: 'لاند كروزر',
        nameEn: 'Land Cruiser',
        sizes: {
          suv: { name: 'SUV', price: 80, time: 45 },
          v8: { name: 'V8', price: 100, time: 50 }
        }
      },
      prado: {
        name: 'برادو',
        nameEn: 'Prado',
        sizes: {
          suv: { name: 'SUV', price: 70, time: 40 }
        }
      },
      hilux: {
        name: 'هيلوكس',
        nameEn: 'Hilux',
        sizes: {
          pickup: { name: 'بيك أب', price: 60, time: 35 }
        }
      },
      fortuner: {
        name: 'فورتشنر',
        nameEn: 'Fortuner',
        sizes: {
          suv: { name: 'SUV', price: 75, time: 40 }
        }
      },
      yaris: {
        name: 'يارس',
        nameEn: 'Yaris',
        sizes: {
          hatchback: { name: 'هاتشباك', price: 35, time: 20 }
        }
      }
    }
  },
  nissan: {
    name: 'نيسان',
    nameEn: 'Nissan',
    models: {
      altima: {
        name: 'ألتيما',
        nameEn: 'Altima',
        sizes: {
          sedan: { name: 'سيدان', price: 50, time: 30 }
        }
      },
      sunny: {
        name: 'صني',
        nameEn: 'Sunny',
        sizes: {
          sedan: { name: 'سيدان', price: 40, time: 25 }
        }
      },
      patrol: {
        name: 'باترول',
        nameEn: 'Patrol',
        sizes: {
          suv: { name: 'SUV', price: 90, time: 50 },
          v8: { name: 'V8', price: 110, time: 55 }
        }
      },
      xTrail: {
        name: 'اكس تريل',
        nameEn: 'X-Trail',
        sizes: {
          suv: { name: 'SUV', price: 65, time: 35 }
        }
      },
      navara: {
        name: 'نافارا',
        nameEn: 'Navara',
        sizes: {
          pickup: { name: 'بيك أب', price: 65, time: 35 }
        }
      }
    }
  },
  honda: {
    name: 'هوندا',
    nameEn: 'Honda',
    models: {
      accord: {
        name: 'أكورد',
        nameEn: 'Accord',
        sizes: {
          sedan: { name: 'سيدان', price: 55, time: 30 }
        }
      },
      civic: {
        name: 'سيفيك',
        nameEn: 'Civic',
        sizes: {
          sedan: { name: 'سيدان', price: 45, time: 25 },
          hatchback: { name: 'هاتشباك', price: 40, time: 20 }
        }
      },
      crv: {
        name: 'CR-V',
        nameEn: 'CR-V',
        sizes: {
          suv: { name: 'SUV', price: 70, time: 40 }
        }
      }
    }
  },
  hyundai: {
    name: 'هيونداي',
    nameEn: 'Hyundai',
    models: {
      elantra: {
        name: 'النترا',
        nameEn: 'Elantra',
        sizes: {
          sedan: { name: 'سيدان', price: 45, time: 25 }
        }
      },
      sonata: {
        name: 'سوناتا',
        nameEn: 'Sonata',
        sizes: {
          sedan: { name: 'سيدان', price: 50, time: 30 }
        }
      },
      tucson: {
        name: 'توسان',
        nameEn: 'Tucson',
        sizes: {
          suv: { name: 'SUV', price: 65, time: 35 }
        }
      },
      santaFe: {
        name: 'سانتا في',
        nameEn: 'Santa Fe',
        sizes: {
          suv: { name: 'SUV', price: 75, time: 40 }
        }
      }
    }
  },
  kia: {
    name: 'كيا',
    nameEn: 'Kia',
    models: {
      cerato: {
        name: 'سيراتو',
        nameEn: 'Cerato',
        sizes: {
          sedan: { name: 'سيدان', price: 45, time: 25 }
        }
      },
      optima: {
        name: 'أوبتيما',
        nameEn: 'Optima',
        sizes: {
          sedan: { name: 'سيدان', price: 50, time: 30 }
        }
      },
      sportage: {
        name: 'سبورتاج',
        nameEn: 'Sportage',
        sizes: {
          suv: { name: 'SUV', price: 65, time: 35 }
        }
      },
      sorento: {
        name: 'سورينتو',
        nameEn: 'Sorento',
        sizes: {
          suv: { name: 'SUV', price: 75, time: 40 }
        }
      }
    }
  },
  ford: {
    name: 'فورد',
    nameEn: 'Ford',
    models: {
      focus: {
        name: 'فوكس',
        nameEn: 'Focus',
        sizes: {
          sedan: { name: 'سيدان', price: 45, time: 25 }
        }
      },
      fusion: {
        name: 'فيوجن',
        nameEn: 'Fusion',
        sizes: {
          sedan: { name: 'سيدان', price: 50, time: 30 }
        }
      },
      explorer: {
        name: 'إكسبلورر',
        nameEn: 'Explorer',
        sizes: {
          suv: { name: 'SUV', price: 80, time: 45 }
        }
      },
      f150: {
        name: 'F-150',
        nameEn: 'F-150',
        sizes: {
          pickup: { name: 'بيك أب', price: 85, time: 45 }
        }
      }
    }
  },
  chevrolet: {
    name: 'شيفروليه',
    nameEn: 'Chevrolet',
    models: {
      malibu: {
        name: 'ماليبو',
        nameEn: 'Malibu',
        sizes: {
          sedan: { name: 'سيدان', price: 50, time: 30 }
        }
      },
      cruze: {
        name: 'كروز',
        nameEn: 'Cruze',
        sizes: {
          sedan: { name: 'سيدان', price: 45, time: 25 }
        }
      },
      tahoe: {
        name: 'تاهو',
        nameEn: 'Tahoe',
        sizes: {
          suv: { name: 'SUV', price: 85, time: 45 }
        }
      },
      silverado: {
        name: 'سيلفرادو',
        nameEn: 'Silverado',
        sizes: {
          pickup: { name: 'بيك أب', price: 90, time: 50 }
        }
      }
    }
  },
  bmw: {
    name: 'بي إم دبليو',
    nameEn: 'BMW',
    models: {
      series3: {
        name: 'الفئة الثالثة',
        nameEn: '3 Series',
        sizes: {
          sedan: { name: 'سيدان', price: 80, time: 40 },
          coupe: { name: 'كوبيه', price: 85, time: 45 }
        }
      },
      series5: {
        name: 'الفئة الخامسة',
        nameEn: '5 Series',
        sizes: {
          sedan: { name: 'سيدان', price: 100, time: 50 }
        }
      },
      x3: {
        name: 'X3',
        nameEn: 'X3',
        sizes: {
          suv: { name: 'SUV', price: 95, time: 50 }
        }
      },
      x5: {
        name: 'X5',
        nameEn: 'X5',
        sizes: {
          suv: { name: 'SUV', price: 120, time: 60 }
        }
      }
    }
  },
  mercedes: {
    name: 'مرسيدس',
    nameEn: 'Mercedes',
    models: {
      cClass: {
        name: 'الفئة C',
        nameEn: 'C-Class',
        sizes: {
          sedan: { name: 'سيدان', price: 90, time: 45 },
          coupe: { name: 'كوبيه', price: 95, time: 50 }
        }
      },
      eClass: {
        name: 'الفئة E',
        nameEn: 'E-Class',
        sizes: {
          sedan: { name: 'سيدان', price: 110, time: 55 }
        }
      },
      sClass: {
        name: 'الفئة S',
        nameEn: 'S-Class',
        sizes: {
          sedan: { name: 'سيدان', price: 150, time: 75 }
        }
      },
      gle: {
        name: 'GLE',
        nameEn: 'GLE',
        sizes: {
          suv: { name: 'SUV', price: 130, time: 65 }
        }
      },
      gls: {
        name: 'GLS',
        nameEn: 'GLS',
        sizes: {
          suv: { name: 'SUV', price: 150, time: 75 }
        }
      }
    }
  },
  lexus: {
    name: 'لكزس',
    nameEn: 'Lexus',
    models: {
      es: {
        name: 'ES',
        nameEn: 'ES',
        sizes: {
          sedan: { name: 'سيدان', price: 100, time: 50 }
        }
      },
      ls: {
        name: 'LS',
        nameEn: 'LS',
        sizes: {
          sedan: { name: 'سيدان', price: 140, time: 70 }
        }
      },
      rx: {
        name: 'RX',
        nameEn: 'RX',
        sizes: {
          suv: { name: 'SUV', price: 120, time: 60 }
        }
      },
      lx: {
        name: 'LX',
        nameEn: 'LX',
        sizes: {
          suv: { name: 'SUV', price: 160, time: 80 }
        }
      }
    }
  },
  audi: {
    name: 'أودي',
    nameEn: 'Audi',
    models: {
      a4: {
        name: 'A4',
        nameEn: 'A4',
        sizes: {
          sedan: { name: 'سيدان', price: 85, time: 45 }
        }
      },
      a6: {
        name: 'A6',
        nameEn: 'A6',
        sizes: {
          sedan: { name: 'سيدان', price: 110, time: 55 }
        }
      },
      q5: {
        name: 'Q5',
        nameEn: 'Q5',
        sizes: {
          suv: { name: 'SUV', price: 105, time: 55 }
        }
      },
      q7: {
        name: 'Q7',
        nameEn: 'Q7',
        sizes: {
          suv: { name: 'SUV', price: 130, time: 65 }
        }
      }
    }
  }
};

// أنواع السيارات حسب الحجم
export const carSizes = {
  small: {
    name: 'صغيرة',
    nameEn: 'Small',
    multiplier: 0.8
  },
  medium: {
    name: 'متوسطة',
    nameEn: 'Medium',
    multiplier: 1.0
  },
  large: {
    name: 'كبيرة',
    nameEn: 'Large',
    multiplier: 1.3
  },
  xlarge: {
    name: 'كبيرة جداً',
    nameEn: 'Extra Large',
    multiplier: 1.6
  }
};

// أنواع الخدمات
export const serviceTypes = {
  basic: {
    name: 'غسيل أساسي',
    nameEn: 'Basic Wash',
    description: 'غسيل خارجي أساسي',
    basePrice: 30,
    time: 20
  },
  standard: {
    name: 'غسيل قياسي',
    nameEn: 'Standard Wash',
    description: 'غسيل خارجي وداخلي',
    basePrice: 50,
    time: 35
  },
  premium: {
    name: 'غسيل مميز',
    nameEn: 'Premium Wash',
    description: 'غسيل شامل مع تلميع',
    basePrice: 80,
    time: 50
  },
  luxury: {
    name: 'غسيل فاخر',
    nameEn: 'Luxury Wash',
    description: 'غسيل شامل مع تلميع وتشمع',
    basePrice: 120,
    time: 75
  },
  interior: {
    name: 'غسيل داخلي',
    nameEn: 'Interior Wash',
    description: 'تنظيف شامل للداخلية',
    basePrice: 60,
    time: 40
  },
  engine: {
    name: 'غسيل المحرك',
    nameEn: 'Engine Wash',
    description: 'تنظيف المحرك',
    basePrice: 40,
    time: 30
  }
};

// دالة لحساب السعر النهائي
export const calculatePrice = (brand, model, size, serviceType) => {
  try {
    const brandData = carBrands[brand];
    const modelData = brandData.models[model];
    const sizeData = modelData.sizes[size];
    const serviceData = serviceTypes[serviceType];
    
    const basePrice = sizeData.price;
    const servicePrice = serviceData.basePrice;
    const sizeMultiplier = carSizes[size]?.multiplier || 1.0;
    
    return Math.round((basePrice + servicePrice) * sizeMultiplier);
  } catch (error) {
    console.error('خطأ في حساب السعر:', error);
    return 50; // سعر افتراضي
  }
};

// دالة للحصول على وقت الخدمة
export const getServiceTime = (brand, model, size, serviceType) => {
  try {
    const brandData = carBrands[brand];
    const modelData = brandData.models[model];
    const sizeData = modelData.sizes[size];
    const serviceData = serviceTypes[serviceType];
    
    const baseTime = sizeData.time;
    const serviceTime = serviceData.time;
    
    return baseTime + serviceTime;
  } catch (error) {
    console.error('خطأ في حساب الوقت:', error);
    return 30; // وقت افتراضي
  }
};

// دالة للحصول على قائمة العلامات التجارية
export const getBrandsList = () => {
  return Object.keys(carBrands).map(key => ({
    key,
    name: carBrands[key].name,
    nameEn: carBrands[key].nameEn
  }));
};

// دالة للحصول على قائمة الموديلات
export const getModelsList = (brand) => {
  if (!carBrands[brand]) return [];
  
  return Object.keys(carBrands[brand].models).map(key => ({
    key,
    name: carBrands[brand].models[key].name,
    nameEn: carBrands[brand].models[key].nameEn
  }));
};

// دالة للحصول على قائمة الأحجام
export const getSizesList = (brand, model) => {
  if (!carBrands[brand]?.models[model]) return [];
  
  return Object.keys(carBrands[brand].models[model].sizes).map(key => ({
    key,
    name: carBrands[brand].models[model].sizes[key].name,
    price: carBrands[brand].models[model].sizes[key].price,
    time: carBrands[brand].models[model].sizes[key].time
  }));
};

// دالة للحصول على قائمة الخدمات
export const getServicesList = () => {
  return Object.keys(serviceTypes).map(key => ({
    key,
    name: serviceTypes[key].name,
    nameEn: serviceTypes[key].nameEn,
    description: serviceTypes[key].description,
    basePrice: serviceTypes[key].basePrice,
    time: serviceTypes[key].time
  }));
}; 