import React from 'react';
import { useRole } from '../context/RoleContext';
import { Navigate } from 'react-router-dom';

// Hook للتحقق من الصلاحيات
export const useRoleGuard = (allowedRoles) => {
  const { currentRole } = useRole();
  return allowedRoles.includes(currentRole);
};

// مكون للتحقق من الصلاحيات
const RoleGuard = ({ allowedRoles, children }) => {
  const { currentRole } = useRole();
  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RoleGuard; 