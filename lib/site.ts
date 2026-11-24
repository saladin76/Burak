/** إعدادات النشر — تُضبط من متغيرات البيئة في Vercel */
/** نسخة تجريبية: يظهر شريط التنبيه ويُوسم زر التأكيد بـ«تجريبي» (اضبطها 0 عند ربط بوابة الدفع) */
export const DEMO = process.env.NEXT_PUBLIC_DEMO !== "0";
/** السماح لمحركات البحث بالفهرسة (فقط على النطاق الرسمي) */
export const ALLOW_INDEX = process.env.NEXT_PUBLIC_ALLOW_INDEX === "1";
/** رابط التبرع على الموقع الحالي أثناء الفترة التجريبية */
export const LIVE_DONATE_URL = "https://burakdernegi.org/ar/bagislar";
