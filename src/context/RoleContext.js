import React, { createContext, useContext, useState } from "react";

// الأدوار المتاحة: admin, laundry, employee, user
const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // يمكنك تغيير الدور هنا لتجربة كل صلاحية
  const [currentRole, setCurrentRole] = useState("admin");
  const [userRoles, setUserRoles] = useState(['admin', 'laundry', 'employee', 'customer']);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'admin',
    permissions: ['all'], // المدير له جميع الصلاحيات
    laundryId: null
  });

  return (
    <RoleContext.Provider value={{ 
      currentRole, 
      setCurrentRole, 
      userRoles, 
      setUserRoles,
      currentUser,
      setCurrentUser
    }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const useRoleGuard = (allowedRoles) => {
  const { currentRole } = useRole();
  return allowedRoles.includes(currentRole);
}; 