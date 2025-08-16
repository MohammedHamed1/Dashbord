import React, { createContext, useContext } from 'react';

// بيانات مستخدم افتراضية (يمكنك ربطها لاحقًا بتسجيل الدخول الفعلي)
const defaultUser = {
  id: 1,
  name: 'أحمد محمد',
  phone: '0501234567',
  email: 'ahmed@example.com',
};

export const UserContext = createContext({ currentUser: defaultUser });

export const UserProvider = ({ children }) => {
  // يمكنك لاحقًا جلب بيانات المستخدم من API أو localStorage
  return (
    <UserContext.Provider value={{ currentUser: defaultUser }}>
      {children}
    </UserContext.Provider>
  );
};

// هوك للاستخدام السريع
export const useUser = () => useContext(UserContext); 