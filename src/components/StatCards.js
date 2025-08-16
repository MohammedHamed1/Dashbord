import React, { useEffect, useState, useRef } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  ShopOutlined, 
  DollarOutlined, 
  ShoppingCartOutlined, 
  UserOutlined,
  StarOutlined,
  TrophyOutlined
} from '@ant-design/icons';

const StatCards = ({ data = {} }) => {
  const [animatedData, setAnimatedData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    averageRating: 0
  });
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // دالة العداد المتحرك
  const animateCounter = (targetValue, setter, duration = 2000) => {
    const startTime = Date.now();
    const startValue = 0;
    
    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // استخدام دالة easeOutQuart للحصول على حركة طبيعية
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
      
      setter(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  // تشغيل العداد عند ظهور القسم
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // تشغيل العدادات عند ظهور القسم
  useEffect(() => {
    if (isVisible && data) {
      const timer = setTimeout(() => {
        // تشغيل جميع العدادات في نفس الوقت
        animateCounter(
          data?.totalUsers || 0, 
          (value) => setAnimatedData(prev => ({ ...prev, totalUsers: value })), 
          2000
        );
        animateCounter(
          data?.totalOrders || 0, 
          (value) => setAnimatedData(prev => ({ ...prev, totalOrders: value })), 
          2000
        );
        animateCounter(
          data?.totalRevenue || 0, 
          (value) => setAnimatedData(prev => ({ ...prev, totalRevenue: value })), 
          2000
        );
        animateCounter(
          data?.averageRating || 0, 
          (value) => setAnimatedData(prev => ({ ...prev, averageRating: value })), 
          2000
        );
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isVisible, data]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  const cards = [
    {
      title: 'إجمالي المستخدمين',
      value: animatedData.totalUsers,
      icon: UserOutlined,
      color: '#1890ff',
      bg: 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)',
      desc: 'مستخدمين نشطين',
    },
    {
      title: 'إجمالي الطلبات',
      value: animatedData.totalOrders,
      icon: ShoppingCartOutlined,
      color: '#52c41a',
      bg: 'linear-gradient(135deg, #52c41a 0%, #95de64 100%)',
      desc: 'طلب في النظام',
    },
    {
      title: 'إجمالي الإيرادات',
      value: formatCurrency(animatedData.totalRevenue),
      icon: DollarOutlined,
      color: '#faad14',
      bg: 'linear-gradient(135deg, #faad14 0%, #ffd666 100%)',
      desc: 'ريال سعودي',
    },
    {
      title: 'متوسط التقييم',
      value: animatedData.averageRating,
      icon: StarOutlined,
      color: '#722ed1',
      bg: 'linear-gradient(135deg, #722ed1 0%, #b37feb 100%)',
      desc: 'من 5 نجوم',
      suffix: '/ 5'
    },
  ];

  return (
    <div ref={sectionRef}>
    <Row gutter={24} style={{ marginBottom: 32 }}>
      {cards.map((card, idx) => (
        <Col xs={24} sm={12} lg={6} key={idx}>
          <Card
            style={{
              background: card.bg,
              color: '#fff',
              borderRadius: 16,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minHeight: 140,
                border: 'none',
                transition: 'all 0.3s ease',
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0
            }}
            styles={{ body: { padding: 24 } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 36 }}>
                <card.icon style={{ color: card.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>
                  {card.title}
                </div>
                <div style={{ 
                  fontSize: 28, 
                  fontWeight: 'bold', 
                  color: '#fff', 
                  fontFamily: 'Cairo, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                  marginBottom: 4
                }}>
                  {card.value}{card.suffix}
                </div>
                <div style={{ fontSize: 13, color: '#fff', opacity: 0.85 }}>
                  {card.desc}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default StatCards; 