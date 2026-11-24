# مؤسسة البراق — الموقع الجديد

تصميم وتطوير جديد لموقع [burakdernegi.org](https://burakdernegi.org/ar) بهوية مقدسية معاصرة، مبني على ألوان البراق الأصلية (التركواز والبترولي) مع ذهب قبة الصخرة وحجر القدس.

📄 البحث الكامل قبل التصميم: [`docs/research.md`](docs/research.md)

## التشغيل

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## التقنية

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4 — رموز التصميم في `app/globals.css` (`@theme`)
- خطوط مستضافة ذاتياً: Reem Kufi (عناوين) · IBM Plex Sans Arabic (نصوص) · Amiri (آيات وأحاديث)

## اللغات

الموقع بثلاث لغات عبر المسار: `/ar` (افتراضي، RTL) · `/tr` · `/en`.
النصوص في `lib/dict/{ar,tr,en}.ts`، ومحتوى المشاريع والأخبار والمعالم متعدد اللغات في `lib/data.ts`.

## رحلة التبرع

تبرع سريع ← سلة (`/cart`، محفوظة في المتصفح) ← إتمام التبرع (`/checkout`: بيانات المتبرع، الإهداء مع بطاقة بثلاثة تصاميم، طريقة الدفع) ← صفحة الشكر (`/thank-you` مع رقم مرجعي ومشاركة).
**بوابة الدفع غير مربوطة بعد**: زر التأكيد يُنشئ رقماً مرجعياً محلياً فقط — يُربط لاحقاً بمزوّد الدفع (iyzico / Stripe / PayTR…).

## الهيكل

```
app/[lang]/
  page.tsx               الرئيسية
  projects/[slug]        المشاريع وصفحة المشروع
  quds/[id]              القدس وصفحة كل معلم
  news/[slug]            الأخبار والأنشطة
  media/  reports/  volunteer/  zakat/  about/  contact/
  cart/  checkout/  thank-you/
components/
  Motifs.tsx             الشعار، قبة الصخرة، الأفق، النجمة الثمانية (SVG)
  QuickDonate.tsx        نموذج التبرع السريع (مرة واحدة/شهري، مبالغ مقترحة)
  ProjectCard.tsx        بطاقة المشروع وشريط التقدم
  ProjectsExplorer.tsx   تصفية المشاريع
  Header.tsx  Footer.tsx  PageHero.tsx  Icons.tsx
lib/data.ts              المحتوى (يُستبدل لاحقاً بـ API لوحة التحكم)
docs/research.md         بحث ما قبل التصميم
```

## الخطوات التالية

- [ ] ربط `lib/data.ts` بواجهة لوحة التحكم الحالية (المشاريع، الأخبار، الإحصاءات).
- [x] الشعار الرسمي مُدخل من دليل الهوية 2025.
- [ ] إضافة ملفات خط AwanZaman (woff2) إلى `public/fonts`.
- [x] صور المشاريع والأخبار من الموقع الحالي + فيديوهات القناة.
- [ ] ربط بوابة الدفع والسلة.
- [x] النسختان التركية والإنجليزية (مراجعة لغوية من الفريق مستحسنة).
- [ ] تعبئة الحسابات البنكية ومحتوى «نبذة وتاريخ».
