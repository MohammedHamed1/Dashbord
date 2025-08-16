import { useNavigate, useLocation, useParams } from 'react-router-dom';

/**
 * Safe navigation hook that handles missing Router context
 * @param {Function} fallback - Optional fallback function when navigation is not available
 * @returns {Function} Safe navigate function
 */
export const useSafeNavigate = (fallback = null) => {
  try {
    return useNavigate();
  } catch (error) {
    console.warn('useNavigate called outside Router context:', error.message);
    return (to, options) => {
      if (fallback) {
        fallback(to, options);
      } else {
        console.warn('Navigation attempted but Router context is missing:', to);
      }
    };
  }
};

/**
 * Safe location hook that handles missing Router context
 * @param {Object} fallback - Optional fallback location object
 * @returns {Object} Safe location object
 */
export const useSafeLocation = (fallback = { pathname: '/', search: '', hash: '' }) => {
  try {
    return useLocation();
  } catch (error) {
    console.warn('useLocation called outside Router context:', error.message);
    return fallback;
  }
};

/**
 * Safe params hook that handles missing Router context
 * @param {Object} fallback - Optional fallback params object
 * @returns {Object} Safe params object
 */
export const useSafeParams = (fallback = {}) => {
  try {
    return useParams();
  } catch (error) {
    console.warn('useParams called outside Router context:', error.message);
    return fallback;
  }
};

/**
 * Safe navigation with error handling
 * @param {string} to - Path to navigate to
 * @param {Object} options - Navigation options
 * @param {Function} navigate - Navigate function
 * @param {Function} fallback - Optional fallback function
 */
export const safeNavigate = (to, options = {}, navigate, fallback = null) => {
  try {
    if (navigate && typeof navigate === 'function') {
      navigate(to, options);
    } else if (fallback) {
      fallback(to, options);
    } else {
      console.warn('Navigation attempted but navigate function is not available:', to);
    }
  } catch (error) {
    console.error('Navigation error:', error);
    if (fallback) {
      fallback(to, options);
    }
  }
}; 