import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import './components/Sidebar.css';
import './components/Header.css';
import './components/Dashboard.css';
import './pages/Pages.css';

// Layout Components
import AppLayout from './components/AppLayout';

// Error Boundary
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Operations from './pages/Operations';
import LiveTracking from './pages/LiveTracking';
import CustomerManagement from './pages/CustomerManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import Branches from './pages/Branches';
import Packages from './pages/Packages';
import Cars from './pages/Cars';
import CarPhotos from './pages/CarPhotos';
import PriceCalculator from './pages/PriceCalculator';
import QRCodeManagement from './pages/QRCodeManagement';
import Payments from './pages/Payments';
import LoyaltyPrograms from './pages/LoyaltyPrograms';
import Referrals from './pages/Referrals';
import Ratings from './pages/Ratings';
import Notifications from './pages/Notifications';
import Complaints from './pages/Complaints';
import Support from './pages/Support';
import Inventory from './pages/Inventory';
import Maintenance from './pages/Maintenance';
import Attendance from './pages/Attendance';
import SmartSearch from './pages/SmartSearch';
import Integrations from './pages/Integrations';
import Permissions from './pages/Permissions';
import Export from './pages/Export';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Features from './pages/Features';
import Financial from './pages/Financial';
import AuditLog from './pages/AuditLog';
import AppsManagement from './pages/AppsManagement';
import WebsiteManagement from './pages/WebsiteManagement';
import MarketingSales from './pages/MarketingSales';
import WhatsAppIntegration from './pages/WhatsAppIntegration';
import SmartAlerts from './pages/SmartAlerts';
import Users from './pages/Users';
import LaundryManagement from './pages/LaundryManagement';
import ContentManagement from './pages/ContentManagement';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TermsAndConditions from './pages/TermsAndConditions';
import Sitemap from './pages/Sitemap';
import LegalPagesHub from './pages/LegalPagesHub';
import BranchRevenues from './pages/BranchRevenues';
import AppManagement from './pages/AppManagement';
import SmartAssistant from './pages/SmartAssistant';
import SystemMonitor from './pages/SystemMonitor';

// استيراد نظام الترجمة
import './i18n';

function App() {
  const [loading, setLoading] = useState(true);

  // إعدادات React Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "operations",
          element: <Operations />,
        },
        {
          path: "live-tracking",
          element: <LiveTracking />,
        },
        {
          path: "customer-management",
          element: <CustomerManagement />,
        },
        {
          path: "employee-management",
          element: <EmployeeManagement />,
        },
        {
          path: "branches",
          element: <Branches />,
        },
        {
          path: "packages",
          element: <Packages />,
        },
        {
          path: "cars",
          element: <Cars />,
        },
        {
          path: "car-photos",
          element: <CarPhotos />,
        },
        {
          path: "price-calculator",
          element: <PriceCalculator />,
        },
        {
          path: "qr-code-management",
          element: <QRCodeManagement />,
        },
        {
          path: "payments",
          element: <Payments />,
        },
        {
          path: "loyalty-programs",
          element: <LoyaltyPrograms />,
        },
        {
          path: "referrals",
          element: <Referrals />,
        },
        {
          path: "ratings",
          element: <Ratings />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "complaints",
          element: <Complaints />,
        },
        {
          path: "support",
          element: <Support />,
        },
        {
          path: "inventory",
          element: <Inventory />,
        },
        {
          path: "maintenance",
          element: <Maintenance />,
        },
        {
          path: "attendance",
          element: <Attendance />,
        },
        {
          path: "smart-search",
          element: <SmartSearch />,
        },
        {
          path: "integrations",
          element: <Integrations />,
        },
        {
          path: "permissions",
          element: <Permissions />,
        },
        {
          path: "export",
          element: <Export />,
        },
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "features",
          element: <Features />,
        },
        {
          path: "financial",
          element: <Financial />,
        },
        {
          path: "audit-log",
          element: <AuditLog />,
        },
        {
          path: "apps-management",
          element: <AppsManagement />,
        },
        {
          path: "website-management",
          element: <WebsiteManagement />,
        },
        {
          path: "marketing-sales",
          element: <MarketingSales />,
        },
        {
          path: "whatsapp-integration",
          element: <WhatsAppIntegration />,
        },
        {
          path: "smart-alerts",
          element: <SmartAlerts />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "laundry-management",
          element: <LaundryManagement />,
        },
        {
          path: "content-management",
          element: <ContentManagement />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "terms-of-service",
          element: <TermsOfService />,
        },
        {
          path: "terms-and-conditions",
          element: <TermsAndConditions />,
        },
        {
          path: "sitemap",
          element: <Sitemap />,
        },
        {
          path: "legal-pages-hub",
          element: <LegalPagesHub />,
        },
        {
          path: "branch-revenues",
          element: <BranchRevenues />,
        },
        {
          path: "app-management",
          element: <AppManagement />,
        },
        {
          path: "smart-assistant",
          element: <SmartAssistant />,
        },
        {
          path: "system-monitor",
          element: <SystemMonitor />,
        },
      ],
    },
  ]);

  useEffect(() => {
    // تحميل سريع
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'Cairo, sans-serif'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <h2 style={{ margin: 0, fontWeight: 600, fontSize: '24px' }}>
          نظام إدارة مغاسل السيارات
        </h2>
        <p style={{ margin: '10px 0 0 0', opacity: 0.8, fontSize: '16px' }}>
          جاري التحميل...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App; 