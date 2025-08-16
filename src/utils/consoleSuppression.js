// قمع التحذيرات غير المرغوب فيها في وحدة التحكم
export const suppressConsoleWarnings = () => {
  // حفظ console.warn الأصلي
  const originalWarn = console.warn;
  
  // استبدال console.warn لتصفية التحذيرات المحددة
  console.warn = (...args) => {
    const message = args.join(' ');
    
    // تجاهل التحذيرات المتعلقة بأحداث DOM المهملة
    if (
      message.includes('DOMNodeInserted') ||
      message.includes('DOMNodeRemoved') ||
      message.includes('DOMCharacterDataModified') ||
      message.includes('DOMSubtreeModified') ||
      message.includes('inj_1.js') ||
      message.includes('Deprecation')
    ) {
      return; // تجاهل هذه التحذيرات
    }
    
    // عرض التحذيرات الأخرى بشكل طبيعي
    originalWarn.apply(console, args);
  };
  
  // قمع تحذيرات MutationObserver المهملة
  if (typeof window !== 'undefined') {
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
      // تجاهل إضافة مستمعي الأحداث المهملة
      if (
        type === 'DOMNodeInserted' ||
        type === 'DOMNodeRemoved' ||
        type === 'DOMCharacterDataModified' ||
        type === 'DOMSubtreeModified'
      ) {
        console.log(`تم تجاهل إضافة مستمع الأحداث المهمل: ${type}`);
        return;
      }
      
      return originalAddEventListener.call(this, type, listener, options);
    };
  }
};

// تطبيق القمع عند تحميل الملف
if (typeof window !== 'undefined') {
  suppressConsoleWarnings();
} 