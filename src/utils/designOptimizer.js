// محسن التصميم والأداء البصري
export const designOptimizer = {
  // تحسين الخطوط العربية
  optimizeArabicFonts: () => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }
      
      .arabic-text {
        font-family: 'Cairo', sans-serif;
        line-height: 1.6;
        text-align: right;
        direction: rtl;
      }
      
      .arabic-numbers {
        font-feature-settings: "tnum";
        font-variant-numeric: tabular-nums;
      }
      
      .anticon {
        direction: ltr;
      }
    `;
    document.head.appendChild(style);
  },
  
  // تحسين الألوان للوضع الداكن
  optimizeDarkMode: () => {
    const darkModeColors = {
      '--primary-color': '#1890ff',
      '--secondary-color': '#52c41a',
      '--accent-color': '#faad14',
      '--background-color': '#141414',
      '--text-color': '#ffffff',
      '--border-color': '#303030'
    };
    
    Object.entries(darkModeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  },
  
  // تحسين التمرير
  optimizeScrolling: () => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // تحسين التمرير للأجهزة المحمولة
    if ('ontouchstart' in window) {
      document.body.style.webkitOverflowScrolling = 'touch';
    }
  },
  
  // تحسين الصور
  optimizeImages: () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  },
  
  // تحسين الجداول
  optimizeTables: () => {
    const tables = document.querySelectorAll('.ant-table');
    tables.forEach(table => {
      table.style.fontSize = '14px';
      table.style.lineHeight = '1.5';
    });
  },
  
  // تحسين النماذج
  optimizeForms: () => {
    const inputs = document.querySelectorAll('.ant-input, .ant-select');
    inputs.forEach(input => {
      input.style.fontSize = '14px';
      input.style.padding = '8px 12px';
    });
  },
  
  // تحسين الأزرار
  optimizeButtons: () => {
    const buttons = document.querySelectorAll('.ant-btn');
    buttons.forEach(button => {
      button.style.fontWeight = '500';
      button.style.borderRadius = '6px';
    });
  },
  
  // تحسين البطاقات
  optimizeCards: () => {
    const cards = document.querySelectorAll('.ant-card');
    cards.forEach(card => {
      card.style.borderRadius = '8px';
      card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    });
  },
  
  // تحسين الشريط الجانبي
  optimizeSidebar: () => {
    const sidebar = document.querySelector('.ant-layout-sider');
    if (sidebar) {
      sidebar.style.boxShadow = '2px 0 8px rgba(0,0,0,0.1)';
    }
  },
  
  // تحسين الهيدر
  optimizeHeader: () => {
    const header = document.querySelector('.ant-layout-header');
    if (header) {
      header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }
  },
  
  // تطبيق جميع التحسينات
  applyAllOptimizations: () => {
    this.optimizeArabicFonts();
    this.optimizeScrolling();
    this.optimizeImages();
    
    // تطبيق التحسينات بعد تحميل الصفحة
    setTimeout(() => {
      this.optimizeTables();
      this.optimizeForms();
      this.optimizeButtons();
      this.optimizeCards();
      this.optimizeSidebar();
      this.optimizeHeader();
    }, 100);
  }
};

// تحسين الأداء البصري
export const visualOptimizer = {
  // تحسين الرسوم البيانية
  optimizeCharts: () => {
    const charts = document.querySelectorAll('.recharts-wrapper');
    charts.forEach(chart => {
      chart.style.transition = 'all 0.3s ease';
    });
  },
  
  // تحسين الرسوم المتحركة
  optimizeAnimations: () => {
    const animatedElements = document.querySelectorAll('.ant-fade-in, .ant-slide-up');
    animatedElements.forEach(element => {
      element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  },
  
  // تحسين التحميل
  optimizeLoading: () => {
    const spinners = document.querySelectorAll('.ant-spin');
    spinners.forEach(spinner => {
      spinner.style.transition = 'opacity 0.3s ease';
    });
  }
}; 