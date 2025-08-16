import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// HOC للتعامل مع useNavigate بشكل آمن
export const withRouter = (Component) => {
  const WrappedComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return <Component {...props} navigate={navigate} location={location} />;
  };
  
  WrappedComponent.displayName = `withRouter(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Hook آمن للتنقل
export const useSafeNavigate = () => {
  try {
    return useNavigate();
  } catch (error) {
    return {
      push: (path) => window.location.href = path,
      replace: (path) => window.location.replace(path),
      goBack: () => window.history.back(),
      goForward: () => window.history.forward(),
      go: (n) => window.history.go(n)
    };
  }
};

// Hook آمن للموقع
export const useSafeLocation = () => {
  try {
    return useLocation();
  } catch (error) {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    };
  }
}; 