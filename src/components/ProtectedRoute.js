import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import RoleGuard from './RoleGuard';

const ProtectedRoute = ({ allowedRoles, element, ...rest }) => (
  <Route
    {...rest}
    element={
      <RoleGuard allowedRoles={allowedRoles}>
        {element}
      </RoleGuard>
    }
  />
);

export default ProtectedRoute; 