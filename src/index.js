import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/tableStyles.css'; // تحسينات الجداول
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import './utils/consoleSuppression'; // قمع التحذيرات غير المرغوب فيها

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link); 