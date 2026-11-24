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

## الهيكل

```
app/
  page.tsx               الرئيسية
  projects/              قائمة المشاريع + صفحة المشروع [slug]
  about/  quds/  contact/
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
- [ ] استبدال الشعار المرسوم `BurakMark` بملف الشعار الرسمي (SVG).
- [ ] إضافة صور المشاريع والأخبار الحقيقية (الأغطية الحالية زخرفية مؤقتة).
- [ ] ربط بوابة الدفع والسلة.
- [ ] النسختان التركية والإنجليزية (i18n).
- [ ] تعبئة الحسابات البنكية ومحتوى «نبذة وتاريخ».
