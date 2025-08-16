import React from 'react';
import { usePermissions } from '../context/PermissionContext';
import { Result, Button } from 'antd';
import { useSafeNavigate } from '../utils/safeHooks';

const PermissionGuard = ({ permission, children, fallback = null }) => {
  const { hasPermission } = usePermissions();
  const navigate = useSafeNavigate();

  if (!hasPermission(permission)) {
    if (fallback) {
      return fallback;
    }

    return (
      <Result
        status="403"
        title="403"
        subTitle="عذراً، ليس لديك صلاحية للوصول إلى هذه الصفحة."
        extra={
          <Button type="primary" onClick={() => navigate('/dashboard')}>
            العودة للوحة التحكم
          </Button>
        }
      />
    );
  }

  return children;
};

export default PermissionGuard; 