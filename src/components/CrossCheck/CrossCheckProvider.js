import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Space, Alert, Statistic, Progress } from 'antd';
import { 
  CheckCircleOutlined, 
  ExclamationCircleOutlined, 
  WarningOutlined,
  SyncOutlined,
  BugOutlined,
  EyeOutlined
} from '@ant-design/icons';
import CrossCheckWidget from './CrossCheckWidget';
import { generateCrossCheckData } from '../../utils/crossCheckData';

// مكون لعرض فحص قسم واحد
export const CrossCheckProvider = ({ 
  sectionName, 
  position = 'top', 
  compact = false,
  inline = false 
}) => {
  const [crossCheckData, setCrossCheckData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCrossCheckData();
  }, [sectionName]);

  const loadCrossCheckData = () => {
    setCrossCheckData(generateCrossCheckData(sectionName));
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      loadCrossCheckData();
      setLoading(false);
    }, 1000);
  };

  // الوضع المدمج للداشبورد
  if (inline && compact) {
    if (!crossCheckData) return null;

    const { status, issues, warnings, successRate } = crossCheckData;
    
    return (
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="حالة النظام"
              value={status === 'success' ? 'ممتازة' : status === 'warning' ? 'تحتاج مراجعة' : 'مشاكل'}
              prefix={
                status === 'success' ? 
                  <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
                  status === 'warning' ? 
                    <WarningOutlined style={{ color: '#faad14' }} /> : 
                    <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
              }
              valueStyle={{ 
                color: status === 'success' ? '#52c41a' : status === 'warning' ? '#faad14' : '#ff4d4f',
                fontSize: '14px'
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="معدل النجاح"
              value={successRate}
              suffix="%"
              prefix={<BugOutlined />}
              valueStyle={{ color: '#1890ff', fontSize: '16px' }}
            />
            <Progress 
              percent={successRate} 
              size="small" 
              showInfo={false}
              strokeColor={successRate >= 90 ? '#52c41a' : successRate >= 70 ? '#faad14' : '#ff4d4f'}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Space direction="vertical" size="small">
              <div>
                <Statistic
                  title="المشاكل"
                  value={issues}
                  valueStyle={{ color: '#ff4d4f', fontSize: '14px' }}
                />
              </div>
              <div>
                <Statistic
                  title="التحذيرات"
                  value={warnings}
                  valueStyle={{ color: '#faad14', fontSize: '14px' }}
                />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    );
  }

  // الوضع العادي
  return (
    <div style={{ marginBottom: position === 'top' ? 24 : 0 }}>
      <CrossCheckWidget
        sectionName={sectionName}
        sectionData={crossCheckData}
        onRefresh={handleRefresh}
        showDetails={!compact}
        compact={compact}
      />
    </div>
  );
};

// مكون لعرض فحص متعدد الأقسام
export const MultiSectionCrossCheck = ({ sections = [], layout = 'grid' }) => {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllData();
  }, [sections]);

  const loadAllData = () => {
    const data = {};
    sections.forEach(section => {
      data[section] = generateCrossCheckData(section);
    });
    setAllData(data);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      loadAllData();
      setLoading(false);
    }, 1000);
  };

  if (layout === 'list') {
    return (
      <div>
        {sections.map(section => (
          <div key={section} style={{ marginBottom: 16 }}>
            <CrossCheckWidget
              sectionName={section}
              sectionData={allData[section]}
              onRefresh={handleRefresh}
              showDetails={true}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {sections.map(section => (
        <Col xs={24} md={12} lg={8} key={section}>
          <CrossCheckWidget
            sectionName={section}
            sectionData={allData[section]}
            onRefresh={handleRefresh}
            showDetails={false}
            compact={true}
          />
        </Col>
      ))}
    </Row>
  );
};

// مكون للفحص السريع
export const QuickCrossCheck = ({ sections = [] }) => {
  const [data, setData] = useState({});
  const [overallStatus, setOverallStatus] = useState('success');

  useEffect(() => {
    const allData = {};
    let totalIssues = 0;
    let totalWarnings = 0;

    sections.forEach(section => {
      const sectionData = generateCrossCheckData(section);
      allData[section] = sectionData;
      totalIssues += sectionData.issues;
      totalWarnings += sectionData.warnings;
    });

    setData(allData);
    
    if (totalIssues > 0) {
      setOverallStatus('error');
    } else if (totalWarnings > 0) {
      setOverallStatus('warning');
    } else {
      setOverallStatus('success');
    }
  }, [sections]);

  return (
    <Card size="small">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ marginLeft: 8 }}>
            {overallStatus === 'success' ? 
              <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
              overallStatus === 'warning' ? 
                <WarningOutlined style={{ color: '#faad14' }} /> : 
                <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
            }
          </span>
          <span>فحص سريع للنظام</span>
        </div>
        <div>
          <Button size="small" icon={<SyncOutlined />}>
            تحديث
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CrossCheckProvider; 