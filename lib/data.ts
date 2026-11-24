// المحتوى مأخوذ من الموقع الحالي burakdernegi.org/ar (نوفمبر 2026) بعد تنظيفه وتوحيده.
// عند ربط لوحة التحكم (CMS/API) يُستبدل هذا الملف بمصدر البيانات الفعلي.

export type Region = "quds" | "gaza" | "palestine";
export type Kind =
  | "winter"
  | "food"
  | "water"
  | "quran"
  | "education"
  | "zakat"
  | "medical"
  | "rebuild"
  | "support";

export type Project = {
  slug: string;
  title: string;
  region: Region;
  kind: Kind;
  summary: string;
  amounts: number[];
  monthly?: boolean;
  raised?: number;
  goal?: number;
  donors?: number;
  featured?: boolean;
  urgent?: boolean;
};

export const regionLabel: Record<Region, string> = {
  quds: "القدس",
  gaza: "غزة",
  palestine: "فلسطين",
};

export const kindLabel: Record<Kind, string> = {
  winter: "حملات الشتاء",
  food: "إطعام",
  water: "سقيا الماء",
  quran: "القرآن الكريم",
  education: "التعليم",
  zakat: "الزكاة",
  medical: "الرعاية الطبية",
  rebuild: "الترميم والإعمار",
  support: "تثبيت المقدسيين",
};

export const projects: Project[] = [
  {
    slug: "qudus-winter",
    title: "حملة شتاء القدس",
    region: "quds",
    kind: "winter",
    summary: "دفء البيوت المقدسية في البلدة القديمة: مدافئ وأغطية وكسوة شتوية للأسر الأكثر حاجة.",
    amounts: [100, 200, 500],
    featured: true,
    urgent: true,
  },
  {
    slug: "gaza-winter",
    title: "حملة شتاء غزة",
    region: "gaza",
    kind: "winter",
    summary: "خيام معزولة وأغطية وملابس شتوية للعائلات النازحة في مواجهة البرد والأمطار.",
    amounts: [100, 200, 500],
    featured: true,
    urgent: true,
  },
  {
    slug: "hot-meals-in-gaza",
    title: "الوجبات الساخنة في غزة",
    region: "gaza",
    kind: "food",
    summary: "وجبة ساخنة تُحيي الأمل؛ يُشبع بها طفلٌ جائع ويطمئن قلبُ أم وتجد عائلة قوة الصمود ليوم آخر.",
    amounts: [300, 500, 700],
    monthly: true,
    raised: 19779,
    donors: 895,
    featured: true,
  },
  {
    slug: "reconstruction-of-palestine",
    title: "إحياء فلسطين",
    region: "palestine",
    kind: "rebuild",
    summary: "مساهمة في إعادة الحياة إلى ما دمّرته الحرب: بيوت ومرافق تعود لأهلها.",
    amounts: [100, 200, 500],
    raised: 7117,
    goal: 30000,
    donors: 75,
    featured: true,
  },
  {
    slug: "alquds-supporting-education",
    title: "«شموس الغد» لدعم التعليم في القدس",
    region: "quds",
    kind: "education",
    summary: "رسوم دراسية وحقائب ومستلزمات لطلبة القدس، ليبقى العلم سلاح المقدسيين في وجه التهجير.",
    amounts: [100, 200, 500],
    monthly: true,
    featured: true,
  },
  {
    slug: "jyl-alqran-5",
    title: "جيل القرآن",
    region: "quds",
    kind: "quran",
    summary: "رعاية حفظة كتاب الله في باحات المسجد الأقصى المبارك وإعمار المسجد بحلقات العلم.",
    amounts: [100, 200, 500],
    monthly: true,
    featured: true,
  },
  {
    slug: "hlqat-alqran-alqds",
    title: "حلقات القرآن — القدس",
    region: "quds",
    kind: "quran",
    summary: "دعم معلمي وطلاب حلقات التحفيظ في المسجد الأقصى والبلدة القديمة.",
    amounts: [5, 20, 50, 100],
  },
  {
    slug: "altrwd-alghdayy-alqds",
    title: "الطرود الغذائية — القدس",
    region: "quds",
    kind: "food",
    summary: "سلة غذائية شهرية تسند الأسر المقدسية المرابطة في البلدة القديمة.",
    amounts: [80, 160, 320],
    monthly: true,
  },
  {
    slug: "sqya-alma-alqds",
    title: "سقيا الماء — القدس",
    region: "quds",
    kind: "water",
    summary: "سقيا الماء لروّاد المسجد الأقصى وعُمّاره؛ إكرام للمصلين وصدقة جارية.",
    amounts: [100, 200, 500],
  },
  {
    slug: "quds-homes-restoration",
    title: "ترميم البيوت المقدسية",
    region: "quds",
    kind: "rebuild",
    summary: "ترميم البيوت القديمة في محيط الأقصى لتثبيت أهلها أمام محاولات التهجير.",
    amounts: [500, 1000, 2000],
  },
  {
    slug: "mshrwa-dam-algharmyn-fy-alqds",
    title: "دعم الغارمين في القدس",
    region: "quds",
    kind: "support",
    summary: "فكّ كرب المدينين من أهل القدس ممن أثقلتهم الغرامات والديون.",
    amounts: [5, 20, 50, 100],
  },
  {
    slug: "mdrs-dar-alaytam-alslamy-2",
    title: "مدرسة دار الأيتام الإسلامية",
    region: "quds",
    kind: "education",
    summary: "دعم صرح تعليمي مقدسي عريق يحتضن الأيتام ويحفظ هوية المدينة.",
    amounts: [5, 20, 50, 100],
  },
  {
    slug: "alrka-alqds",
    title: "زكاة المال — القدس",
    region: "quds",
    kind: "zakat",
    summary: "أوصل زكاتك إلى مستحقيها من الأسر المقدسية وفق الضوابط الشرعية.",
    amounts: [1000, 2000, 5000],
  },
  {
    slug: "zakat-gaza",
    title: "زكاة المال — غزة",
    region: "gaza",
    kind: "zakat",
    summary: "زكاتك تصل إلى الأسر المتضررة والنازحة في قطاع غزة.",
    amounts: [1000, 2000, 5000],
  },
  {
    slug: "rabt-alkhbr-ghr",
    title: "ربطة الخبز — غزة",
    region: "gaza",
    kind: "food",
    summary: "تشغيل الأفران وتوزيع الخبز يومياً على العائلات في مراكز الإيواء.",
    amounts: [5, 20, 50, 100],
  },
  {
    slug: "nsha-khym-tby-ghr",
    title: "إنشاء خيمة طبية — غزة",
    region: "gaza",
    kind: "medical",
    summary: "نقطة رعاية طبية ميدانية تقدّم الإسعافات والأدوية للنازحين.",
    amounts: [5, 20, 50, 100],
    urgent: true,
  },
  {
    slug: "sqya-alma-ghr",
    title: "سقيا الماء — غزة",
    region: "gaza",
    kind: "water",
    summary: "مياه شرب نظيفة للعائلات في المخيمات ومراكز الإيواء.",
    amounts: [100, 200, 500],
    monthly: true,
  },
  {
    slug: "trmym-almsajd-ghr",
    title: "ترميم المساجد — غزة",
    region: "gaza",
    kind: "rebuild",
    summary: "إعادة تأهيل بيوت الله المتضررة لتعود منارات للصلاة والعلم.",
    amounts: [100, 200, 500],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const pillars = [
  {
    key: "quds",
    title: "القدس والأقصى",
    text: "إعمار المسجد الأقصى وتثبيت المقدسيين في البلدة القديمة.",
    href: "/projects?region=quds",
  },
  {
    key: "relief",
    title: "الإغاثة العاجلة",
    text: "غذاء وماء ودواء وإيواء لأهلنا في غزة تحت الحصار.",
    href: "/projects?region=gaza",
  },
  {
    key: "zakat",
    title: "زكاة المال",
    text: "احسب زكاتك وأوصلها إلى مستحقيها في القدس وفلسطين.",
    href: "/projects?kind=zakat",
  },
  {
    key: "quran",
    title: "القرآن والتعليم",
    text: "حلقات التحفيظ في باحات الأقصى ودعم طلبة القدس.",
    href: "/projects?kind=quran",
  },
] as const;

export const stats = {
  lifetime: [
    { value: "2011", label: "سنة التأسيس" },
    { value: "+600", label: "مشروع منذ التأسيس" },
    { value: "+1M", label: "أكثر من مليون مستفيد" },
  ],
  annual: [
    { value: 69, label: "مشروعاً هذا العام" },
    { value: 131679, label: "مستفيداً" },
    { value: 125, label: "رعاية وكفالة" },
  ],
};

export const news = [
  {
    slug: "iftar-aqsa",
    title: "تقديم الإفطار لروّاد المسجد الأقصى خلال العشر الأواخر من رمضان",
    tag: "الأقصى",
  },
  {
    slug: "saqya-al-maa-fi-al-aqsa",
    title: "سقيا الماء في المسجد الأقصى — دعم لعُمّاره وإكرام لروّاده",
    tag: "الأقصى",
  },
  {
    slug: "iftar-al-quds-ramadan-support",
    title: "إفطار الصائمين في القدس — دعم ومساندة لأهلنا في رمضان",
    tag: "القدس",
  },
  {
    slug: "visit-sheikh-abdelaziz-sarba-boraq",
    title: "زيارة فضيلة الشيخ عبد العزيز ساربا لمؤسسة البراق وتعزيز التعاون الدعوي والإنساني",
    tag: "أخبار المؤسسة",
  },
];

export const qudsLibrary = [
  { title: "نبذة وتاريخ", href: "/quds#history", desc: "من الإسراء والمعراج إلى اليوم" },
  { title: "معالم الأقصى", href: "/quds#landmarks", desc: "القباب والمصليات والأبواب" },
  { title: "مقالات", href: "/quds#articles", desc: "قراءات في قضية القدس" },
  { title: "كتب", href: "/quds#books", desc: "مكتبة البراق المقدسية" },
  { title: "معرض الصور", href: "/quds#gallery", desc: "القدس بعدسة البراق" },
  { title: "الفيديوهات", href: "/quds#videos", desc: "أفلام ووثائقيات" },
];

export const contact = {
  phone: "+90 531 280 02 17",
  phoneHref: "tel:+905312800217",
  whatsapp: "https://api.whatsapp.com/send?phone=905312800217",
  email: "info@burakdernegi.org",
  facebook: "https://www.facebook.com/alburakorg",
  youtube: "https://www.youtube.com/burakdernegi",
  legalName: "Burak Mukaddes Mekanları Tanıtma ve Kültür Derneği",
};

export const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);
