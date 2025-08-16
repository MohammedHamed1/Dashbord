import { message } from 'antd';

const Toast = {
  success: (msg) => message.success({ content: msg, duration: 2, rtl: true }),
  error: (msg) => message.error({ content: msg, duration: 2, rtl: true }),
  info: (msg) => message.info({ content: msg, duration: 2, rtl: true }),
};

export default Toast; 