module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // تجاهل التحذيرات المتعلقة بأحداث DOM المهملة
    'no-console': 'off',
    'no-unused-vars': 'warn'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    // تعريف المتغيرات العامة لتجنب التحذيرات
    console: 'readonly',
    window: 'readonly',
    document: 'readonly',
    localStorage: 'readonly',
    sessionStorage: 'readonly'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}; 