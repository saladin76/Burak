// المحتوى مأخوذ من الموقع الحالي burakdernegi.org (ar/en) ومن دليل الهوية 2025، بعد تنظيفه وتوحيده.
// الترجمات التركية والإنجليزية للمشاريع مبنية على أسمائها في النسخة الإنجليزية من الموقع الحالي.
// عند ربط لوحة التحكم (CMS/API) يُستبدل هذا الملف بمصدر البيانات الفعلي.
import type { L } from "./i18n";

export type Region = "quds" | "gaza" | "palestine";
export type Kind = "aqsa" | "winter" | "food" | "water" | "quran" | "education" | "zakat" | "medical" | "rebuild" | "support";

const U = "https://burakdernegi.org/uploads/";

export type Project = {
  slug: string;
  title: L;
  region: Region;
  kind: Kind;
  summary: L;
  amounts: number[];
  image?: string;
  monthly?: boolean;
  raised?: number;
  goal?: number;
  donors?: number;
  featured?: boolean;
  urgent?: boolean;
};

export const regionLabel: Record<Region, L> = {
  quds: { ar: "القدس", tr: "Kudüs", en: "Al-Quds" },
  gaza: { ar: "غزة", tr: "Gazze", en: "Gaza" },
  palestine: { ar: "فلسطين", tr: "Filistin", en: "Palestine" },
};

export const kindLabel: Record<Kind, L> = {
  aqsa: { ar: "خدمة الأقصى", tr: "Aksa'ya hizmet", en: "Serving Al-Aqsa" },
  winter: { ar: "حملات الشتاء", tr: "Kış kampanyaları", en: "Winter appeals" },
  food: { ar: "إطعام", tr: "Gıda", en: "Food" },
  water: { ar: "سقيا الماء", tr: "Su", en: "Water" },
  quran: { ar: "القرآن الكريم", tr: "Kur'an-ı Kerim", en: "Holy Quran" },
  education: { ar: "التعليم", tr: "Eğitim", en: "Education" },
  zakat: { ar: "الزكاة", tr: "Zekât", en: "Zakat" },
  medical: { ar: "الرعاية الطبية", tr: "Sağlık", en: "Medical care" },
  rebuild: { ar: "الترميم والإعمار", tr: "Onarım ve imar", en: "Restoration" },
  support: { ar: "تثبيت المقدسيين", tr: "Kudüslülere destek", en: "Supporting Jerusalemites" },
};

/** محتوى تديره المؤسسة — الأقسام الفارغة تُخفى تلقائياً من الموقع */
export const orgContent: {
  bankAccounts: { currency: string; bank: string; iban: string; name?: string }[];
  annualReports: { year: string; url: string }[];
  /** نص «نبذة وتاريخ» لكل لغة */
  history: Partial<L> | null;
} = {
  bankAccounts: [],
  annualReports: [],
  history: null,
};

/** سعر القنديل المقترح بالدولار — يُعتمد من إدارة المؤسسة */
export const LAMP_PRICE = 10;

export const projects: Project[] = [
  {
    slug: "qanadeel-al-aqsa",
    title: { ar: "قناديل الأقصى", tr: "Aksa Kandilleri", en: "The Lamps of Al-Aqsa" },
    region: "quds",
    kind: "aqsa",
    summary: {
      ar: "«فتُهدي له زيتاً يُسرج فيه» — أسرج قنديلاً في الأقصى باسمك أو باسم من تحب، دعماً لخدمة المسجد وروّاده.",
      tr: "«Kandillerinde yakılmak üzere zeytinyağı hediye et» — Aksa'da kendi adınıza veya sevdiğiniz biri adına bir kandil yakın.",
      en: "“Send oil to light its lamps” — light a lamp in Al-Aqsa in your name or a loved one's, supporting the mosque and its worshippers.",
    },
    amounts: [10, 50, 200, 500],
    monthly: true,
    featured: true,
  },
  {
    slug: "qudus-winter",
    title: { ar: "حملة شتاء القدس", tr: "Kudüs Kış Kampanyası", en: "Al-Quds Winter Appeal" },
    region: "quds",
    kind: "winter",
    summary: {
      ar: "دفء البيوت المقدسية في البلدة القديمة: مدافئ وأغطية وكسوة شتوية للأسر الأكثر حاجة.",
      tr: "Eski Şehir'deki Kudüslü evlere sıcaklık: en muhtaç ailelere ısıtıcı, battaniye ve kışlık giysi.",
      en: "Warmth for Jerusalemite homes in the Old City: heaters, blankets and winter clothing for families most in need.",
    },
    amounts: [100, 200, 500],
    image: U + "u3LvBYO580sEj4YBtNsw_1762342538887.png",
    featured: true,
    urgent: true,
  },
  {
    slug: "gaza-winter",
    title: { ar: "حملة شتاء غزة", tr: "Gazze Kış Kampanyası", en: "Gaza Winter Appeal" },
    region: "gaza",
    kind: "winter",
    summary: {
      ar: "خيام معزولة وأغطية وملابس شتوية للعائلات النازحة في مواجهة البرد والأمطار.",
      tr: "Soğuk ve yağmura karşı yerinden edilmiş ailelere yalıtımlı çadır, battaniye ve kışlık giysi.",
      en: "Insulated tents, blankets and winter clothing for displaced families facing the cold and rain.",
    },
    amounts: [100, 200, 500],
    image: U + "YX1kWe2CEEKDjTnMvmDP_1762343661189.png",
    featured: true,
    urgent: true,
  },
  {
    slug: "hot-meals-in-gaza",
    title: { ar: "الوجبات الساخنة في غزة", tr: "Gazze'de Sıcak Yemek", en: "Hot Meals in Gaza" },
    region: "gaza",
    kind: "food",
    summary: {
      ar: "وجبة ساخنة تُحيي الأمل؛ يُشبع بها طفلٌ جائع ويطمئن قلبُ أم وتجد عائلة قوة الصمود ليوم آخر.",
      tr: "Umudu yeşerten sıcak bir yemek: aç bir çocuk doyar, bir annenin kalbi huzur bulur, bir aile bir gün daha direnir.",
      en: "A hot meal that revives hope: a hungry child is fed, a mother's heart is eased, and a family finds strength for another day.",
    },
    amounts: [300, 500, 700],
    image: U + "UKWn6JFNW9PLW8MDh92Q_1750769530404.jpg",
    monthly: true,
    raised: 19779,
    donors: 895,
    featured: true,
  },
  {
    slug: "reconstruction-of-palestine",
    title: { ar: "إحياء فلسطين", tr: "Filistin'i İhya", en: "Reviving Palestine" },
    region: "palestine",
    kind: "rebuild",
    summary: {
      ar: "مساهمة في إعادة الحياة إلى ما دمّرته الحرب: بيوت ومرافق تعود لأهلها.",
      tr: "Savaşın yıktığına yeniden hayat vermek: evler ve tesisler sahiplerine dönsün.",
      en: "Helping bring life back to what war destroyed: homes and facilities returned to their people.",
    },
    amounts: [100, 200, 500],
    image: U + "474591074_122198386340131088_4545272656604960008_n.jpg",
    raised: 7117,
    goal: 30000,
    donors: 75,
    featured: true,
  },
  {
    slug: "alquds-supporting-education",
    title: { ar: "«شموس الغد» لدعم التعليم في القدس", tr: "«Yarının Güneşleri» Kudüs Eğitim Desteği", en: "«Suns of Tomorrow» — Education in Al-Quds" },
    region: "quds",
    kind: "education",
    summary: {
      ar: "رسوم دراسية وحقائب ومستلزمات لطلبة القدس، ليبقى العلم سلاح المقدسيين في وجه التهجير.",
      tr: "Kudüslü öğrencilere okul ücreti, çanta ve kırtasiye; ilim, sürgüne karşı Kudüslülerin silahı olsun.",
      en: "Tuition, school bags and supplies for Jerusalem's students — keeping knowledge their tool against displacement.",
    },
    amounts: [100, 200, 500],
    image: U + "npuqaXxfG09x9QZ61UKK_1751026555644.jpg",
    monthly: true,
    featured: true,
  },
  {
    slug: "jyl-alqran-5",
    title: { ar: "جيل القرآن", tr: "Kur'an Nesli", en: "Quran Generation" },
    region: "quds",
    kind: "quran",
    summary: {
      ar: "رعاية حفظة كتاب الله في باحات المسجد الأقصى المبارك وإعمار المسجد بحلقات العلم.",
      tr: "Mescid-i Aksa avlularındaki hafızları desteklemek ve Aksa'yı ilim halkalarıyla imar etmek.",
      en: "Supporting Quran memorisers in the courtyards of Al-Aqsa and filling the mosque with circles of learning.",
    },
    amounts: [100, 200, 500],
    image: U + "4RB4RefbQ4M3ISO8LJkn_1751026297780.jpg",
    monthly: true,
    featured: true,
  },
  {
    slug: "hlqat-alqran-alqds",
    title: { ar: "حلقات القرآن — القدس", tr: "Kur'an Halkaları — Kudüs", en: "Quran Circles — Al-Quds" },
    region: "quds",
    kind: "quran",
    summary: {
      ar: "دعم معلمي وطلاب حلقات التحفيظ في المسجد الأقصى والبلدة القديمة.",
      tr: "Aksa'da ve Eski Şehir'de hafızlık halkalarının hoca ve öğrencilerine destek.",
      en: "Supporting teachers and students of Quran circles in Al-Aqsa and the Old City.",
    },
    amounts: [5, 20, 50, 100],
    image: U + "JWaCyRlwJgqaskB6Zlvh_1771494661308.jpg",
  },
  {
    slug: "altrwd-alghdayy-alqds",
    title: { ar: "الطرود الغذائية — القدس", tr: "Gıda Kolisi — Kudüs", en: "Food Parcels — Al-Quds" },
    region: "quds",
    kind: "food",
    summary: {
      ar: "سلة غذائية شهرية تسند الأسر المقدسية المرابطة في البلدة القديمة.",
      tr: "Eski Şehir'de direnen Kudüslü ailelere aylık gıda kolisi.",
      en: "A monthly food basket supporting steadfast Jerusalemite families in the Old City.",
    },
    amounts: [80, 160, 320],
    image: U + "J4aNrqssOtxVlcxX8pHL_1751026461749.jpg",
    monthly: true,
  },
  {
    slug: "sqya-alma-alqds",
    title: { ar: "سقيا الماء — القدس", tr: "Su Yardımı — Kudüs", en: "Water Relief — Al-Quds" },
    region: "quds",
    kind: "water",
    summary: {
      ar: "سقيا الماء لروّاد المسجد الأقصى وعُمّاره؛ إكرام للمصلين وصدقة جارية.",
      tr: "Aksa'yı ziyaret edenlere ve imar edenlere su ikramı; sadaka-i câriye.",
      en: "Water for the visitors and worshippers of Al-Aqsa — honouring its guests as ongoing charity.",
    },
    amounts: [100, 200, 500],
    image: U + "QjFvzgrxsEvbqLSeLuXs_1771495221952.jpg",
  },
  {
    slug: "mshrwa-dam-algharmyn-fy-alqds",
    title: { ar: "دعم الغارمين في القدس", tr: "Kudüs'te Borçlulara Destek", en: "Supporting Debtors in Al-Quds" },
    region: "quds",
    kind: "support",
    summary: {
      ar: "فكّ كرب المدينين من أهل القدس ممن أثقلتهم الغرامات والديون.",
      tr: "Ceza ve borç yükü altındaki Kudüslülerin sıkıntısını gidermek.",
      en: "Relieving Jerusalemites weighed down by fines and debts.",
    },
    amounts: [5, 20, 50, 100],
    image: U + "Mx3UoJMQX52fbPrnX0ub_1782332719542.jpg",
  },
  {
    slug: "mdrs-dar-alaytam-alslamy-2",
    title: { ar: "مدرسة دار الأيتام الإسلامية", tr: "Dâru'l-Eytâm İslam Okulu", en: "Dar Al-Aytam Islamic School" },
    region: "quds",
    kind: "education",
    summary: {
      ar: "دعم صرح تعليمي مقدسي عريق يحتضن الأيتام ويحفظ هوية المدينة.",
      tr: "Yetimlere kucak açan ve şehrin kimliğini koruyan köklü bir Kudüs okuluna destek.",
      en: "Supporting a historic Jerusalem school that embraces orphans and preserves the city's identity.",
    },
    amounts: [5, 20, 50, 100],
    image: U + "gOiBST8i09k4608xDbhG_1788166649868.jpg",
  },
  {
    slug: "alrka-alqds",
    title: { ar: "زكاة المال — القدس", tr: "Mal Zekâtı — Kudüs", en: "Zakat Al-Mal — Al-Quds" },
    region: "quds",
    kind: "zakat",
    summary: {
      ar: "أوصل زكاتك إلى مستحقيها من الأسر المقدسية وفق الضوابط الشرعية.",
      tr: "Zekâtınızı şer'i ölçülere göre hak sahibi Kudüslü ailelere ulaştırın.",
      en: "Deliver your Zakat to eligible Jerusalemite families in accordance with Islamic rulings.",
    },
    amounts: [1000, 2000, 5000],
    image: U + "poGigksLUYCWFXVynLAQ_1751026411191.jpg",
  },
  {
    slug: "zakat-gaza",
    title: { ar: "زكاة المال — غزة", tr: "Mal Zekâtı — Gazze", en: "Zakat Al-Mal — Gaza" },
    region: "gaza",
    kind: "zakat",
    summary: {
      ar: "زكاتك تصل إلى الأسر المتضررة والنازحة في قطاع غزة.",
      tr: "Zekâtınız Gazze'deki mağdur ve yerinden edilmiş ailelere ulaşır.",
      en: "Your Zakat reaches affected and displaced families in the Gaza Strip.",
    },
    amounts: [1000, 2000, 5000],
    image: U + "ZdOHeuKdIXbfXNyfW8PL_1750769992836.jpg",
  },
  {
    slug: "rabt-alkhbr-ghr",
    title: { ar: "ربطة الخبز — غزة", tr: "Ekmek Yardımı — Gazze", en: "Bread Bundles — Gaza" },
    region: "gaza",
    kind: "food",
    summary: {
      ar: "تشغيل الأفران وتوزيع الخبز يومياً على العائلات في مراكز الإيواء.",
      tr: "Fırınları çalıştırmak ve barınma merkezlerindeki ailelere her gün ekmek dağıtmak.",
      en: "Running bakeries and distributing bread daily to families in shelters.",
    },
    amounts: [5, 20, 50, 100],
    image: U + "usMREf0B9uL1oU9RkPkw_1772443108955.jpg",
  },
  {
    slug: "nsha-khym-tby-ghr",
    title: { ar: "إنشاء خيمة طبية — غزة", tr: "Sağlık Çadırı — Gazze", en: "Medical Tent — Gaza" },
    region: "gaza",
    kind: "medical",
    summary: {
      ar: "نقطة رعاية طبية ميدانية تقدّم الإسعافات والأدوية للنازحين.",
      tr: "Yerinden edilmişlere ilk yardım ve ilaç sunan saha sağlık noktası.",
      en: "A field medical point providing first aid and medicine to displaced people.",
    },
    amounts: [5, 20, 50, 100],
    image: U + "53gayMENcT13S27ifJZs_1785860891046.jpg",
    urgent: true,
  },
  {
    slug: "sqya-alma-ghr",
    title: { ar: "سقيا الماء — غزة", tr: "Su Yardımı — Gazze", en: "Water Relief — Gaza" },
    region: "gaza",
    kind: "water",
    summary: {
      ar: "مياه شرب نظيفة للعائلات في المخيمات ومراكز الإيواء.",
      tr: "Kamplardaki ve barınma merkezlerindeki ailelere temiz içme suyu.",
      en: "Clean drinking water for families in camps and shelters.",
    },
    amounts: [100, 200, 500],
    image: U + "rleR52wiacNQ3t1Gfab8_1772151888768.jpg",
    monthly: true,
  },
  {
    slug: "trmym-almsajd-ghr",
    title: { ar: "ترميم المساجد — غزة", tr: "Cami Onarımı — Gazze", en: "Mosque Restoration — Gaza" },
    region: "gaza",
    kind: "rebuild",
    summary: {
      ar: "إعادة تأهيل بيوت الله المتضررة لتعود منارات للصلاة والعلم.",
      tr: "Zarar gören camileri yeniden namaz ve ilim merkezi hâline getirmek.",
      en: "Rehabilitating damaged mosques so they shine again as centres of prayer and learning.",
    },
    amounts: [100, 200, 500],
    image: U + "kXG5YejPIdaSU0lA8bft_1772150003270.jpg",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
/** صفحة المشروع (قناديل الأقصى لها صفحة حملة خاصة) */
export const projectPath = (slug: string) => (slug === "qanadeel-al-aqsa" ? "/lamps" : `/projects/${slug}`);

export const pillars: { key: string; kind: Kind; title: L; text: L; href: string }[] = [
  {
    key: "quds",
    kind: "rebuild",
    title: { ar: "القدس والأقصى", tr: "Kudüs ve Aksa", en: "Al-Quds & Al-Aqsa" },
    text: {
      ar: "إعمار المسجد الأقصى وتثبيت المقدسيين في البلدة القديمة.",
      tr: "Mescid-i Aksa'yı imar etmek, Kudüslüleri Eski Şehir'de tutmak.",
      en: "Reviving Al-Aqsa and keeping Jerusalemites in the Old City.",
    },
    href: "/projects?region=quds",
  },
  {
    key: "relief",
    kind: "food",
    title: { ar: "الإغاثة العاجلة", tr: "Acil Yardım", en: "Emergency Relief" },
    text: {
      ar: "غذاء وماء ودواء وإيواء لأهلنا في غزة تحت الحصار.",
      tr: "Abluka altındaki Gazze'ye gıda, su, ilaç ve barınma.",
      en: "Food, water, medicine and shelter for our people in besieged Gaza.",
    },
    href: "/projects?region=gaza",
  },
  {
    key: "zakat",
    kind: "zakat",
    title: { ar: "زكاة المال", tr: "Zekât", en: "Zakat" },
    text: {
      ar: "احسب زكاتك وأوصلها إلى مستحقيها في القدس وفلسطين.",
      tr: "Zekâtınızı hesaplayın, Kudüs ve Filistin'deki hak sahiplerine ulaştırın.",
      en: "Calculate your Zakat and deliver it to those entitled in Al-Quds and Palestine.",
    },
    href: "/zakat",
  },
  {
    key: "quran",
    kind: "quran",
    title: { ar: "القرآن والتعليم", tr: "Kur'an ve Eğitim", en: "Quran & Education" },
    text: {
      ar: "حلقات التحفيظ في باحات الأقصى ودعم طلبة القدس.",
      tr: "Aksa avlularında hafızlık halkaları ve Kudüslü öğrencilere destek.",
      en: "Quran circles in Al-Aqsa's courtyards and support for Jerusalem's students.",
    },
    href: "/projects?kind=quran",
  },
];

export const stats = {
  lifetime: [
    { value: "2011", label: { ar: "سنة التأسيس", tr: "Kuruluş yılı", en: "Founded" } as L },
    { value: "+600", label: { ar: "مشروع منذ التأسيس", tr: "Kuruluştan bu yana proje", en: "Projects since founding" } as L },
    { value: "+1M", label: { ar: "أكثر من مليون مستفيد", tr: "Bir milyonu aşkın faydalanıcı", en: "Over one million beneficiaries" } as L },
  ],
  annual: [
    { value: 69, label: { ar: "مشروعاً هذا العام", tr: "Bu yılki proje", en: "Projects this year" } as L },
    { value: 131679, label: { ar: "مستفيداً", tr: "Faydalanıcı", en: "Beneficiaries" } as L },
    { value: 125, label: { ar: "رعاية وكفالة", tr: "Sponsorluk", en: "Sponsorships" } as L },
  ],
};

export type News = { slug: string; title: L; tag: L; image: string; body: L; project?: string };
export const news: News[] = [
  {
    slug: "iftar-aqsa",
    title: {
      ar: "تقديم الإفطار لروّاد المسجد الأقصى خلال العشر الأواخر من رمضان",
      tr: "Ramazan'ın son on gününde Aksa ziyaretçilerine iftar",
      en: "Iftar for Al-Aqsa's worshippers in the last ten nights of Ramadan",
    },
    tag: { ar: "الأقصى", tr: "Aksa", en: "Al-Aqsa" },
    image: U + "ZkTqRd0lj32uXlvlCYdi_1742931186211.jpg",
    body: {
      ar: "مع ازدياد أعداد المصلين في العشر الأواخر من رمضان داخل المسجد الأقصى المبارك، حرصنا على تقديم وجبات إفطار جاهزة للصائمين من روّاد المسجد وعامريه في تلك الليالي المباركة.\n\nجاءت هذه المبادرة دعمًا لزوار الأقصى وتعزيزًا لوجودهم في رحابه خلال هذا الشهر الفضيل. ومن خلال توزيع وجبات الإفطار، نواصل العمل على تقديم الدعم للمصلين والمرابطين في الأقصى، تأكيدًا على أهمية ارتباط المسلمين بهذا المسجد المبارك وإحياء رمضان فيه.",
      tr: "Ramazan'ın son on gününde Mescid-i Aksa'daki cemaatin artmasıyla, bu mübarek gecelerde Aksa'yı ziyaret eden ve imar eden oruçlulara hazır iftar yemekleri ikram ettik.\n\nBu girişim, Aksa ziyaretçilerini desteklemek ve mübarek ayda oradaki varlıklarını güçlendirmek amacıyla gerçekleştirildi. İftar dağıtımlarıyla Aksa'daki cemaate ve nöbet tutanlara desteğimizi sürdürüyoruz.",
      en: "As the number of worshippers grew in Al-Aqsa during the last ten nights of Ramadan, we provided ready iftar meals to those fasting and praying in the mosque on those blessed nights.\n\nThe initiative supported Al-Aqsa's visitors and strengthened their presence there during the holy month. Through iftar distribution we continue to support the worshippers and those holding steadfast in Al-Aqsa.",
    },
    project: "altrwd-alghdayy-alqds",
  },
  {
    slug: "saqya-al-maa-fi-al-aqsa",
    title: {
      ar: "سقيا الماء في المسجد الأقصى — دعم لعُمّاره وإكرام لروّاده",
      tr: "Mescid-i Aksa'da su ikramı — imar edenlere destek, ziyaretçilere ikram",
      en: "Water for Al-Aqsa — supporting its worshippers, honouring its guests",
    },
    tag: { ar: "الأقصى", tr: "Aksa", en: "Al-Aqsa" },
    image: U + "xPInk5KxtOsYvcwq28no_1742215114951.jpg",
    body: {
      ar: "في مؤسسة البراق، نواصل سقيا الماء في المسجد الأقصى دعمًا لعامريه من المصلين والمعتكفين، وتعزيزًا لأجواء العبادة.\n\nمن خلال حملة «لبيك يا أقصى»، نقدم المياه الباردة للصائمين والزوار، مساهمةً في إكرام ضيوف الأقصى. تبرع الآن وكن جزءًا من هذا العطاء المبارك في أرض الإسراء.",
      tr: "Burak Derneği olarak Mescid-i Aksa'yı imar eden namaz kılanlara ve itikâfa girenlere destek için su ikramını sürdürüyoruz.\n\n«Lebbeyk Ya Aksa» kampanyasıyla oruçlulara ve ziyaretçilere soğuk su ikram ediyor, Aksa'nın misafirlerini ağırlıyoruz.",
      en: "At Burak Foundation we continue providing water in Al-Aqsa to support its worshippers and those in i'tikaf, enriching the atmosphere of worship.\n\nThrough the «Labbayk Ya Aqsa» campaign we offer cold water to those fasting and to visitors, honouring the guests of Al-Aqsa.",
    },
    project: "sqya-alma-alqds",
  },
  {
    slug: "iftar-al-quds-ramadan-support",
    title: {
      ar: "إفطار الصائمين في القدس — دعم ومساندة لأهلنا في رمضان",
      tr: "Kudüs'te oruçlulara iftar — Ramazan'da kardeşlerimize destek",
      en: "Iftar for the fasting in Al-Quds — standing with our people in Ramadan",
    },
    tag: { ar: "القدس", tr: "Kudüs", en: "Al-Quds" },
    image: U + "DueKhPZte7B6sp9mlu44_1742305782058.jpg",
    body: {
      ar: "في شهر رمضان المبارك، نقدم وجبات إفطار ساخنة في المسجد الأقصى وأحياء القدس، دعمًا لصمود أهلنا في ظل الظروف الاقتصادية الصعبة.\n\nتأتي هذه المبادرة ضمن جهودنا الخيرية لتوفير الطعام للصائمين، تعزيزًا للتكافل الاجتماعي ودعمًا لأهل فلسطين في رمضان. ساهم معنا في إفطار صائم وانشر الخير في هذا الشهر الفضيل.",
      tr: "Mübarek Ramazan ayında, zor ekonomik şartlar altındaki kardeşlerimizin direnişine destek olmak için Mescid-i Aksa'da ve Kudüs mahallelerinde sıcak iftar yemekleri sunuyoruz.\n\nBu girişim, oruçlulara yemek sağlama ve toplumsal dayanışmayı güçlendirme çabalarımızın bir parçasıdır.",
      en: "In the blessed month of Ramadan we serve hot iftar meals in Al-Aqsa and the neighbourhoods of Al-Quds, supporting our people's steadfastness amid hard economic conditions.\n\nThe initiative is part of our efforts to feed those fasting and to strengthen solidarity with the people of Palestine in Ramadan.",
    },
    project: "altrwd-alghdayy-alqds",
  },
  {
    slug: "visit-sheikh-abdelaziz-sarba-boraq",
    title: {
      ar: "زيارة فضيلة الشيخ عبد العزيز ساربا لمؤسسة البراق وتعزيز التعاون الدعوي والإنساني",
      tr: "Şeyh Abdulaziz Sarba'nın Burak Derneği'ni ziyareti",
      en: "Sheikh Abdelaziz Sarba visits Burak Foundation",
    },
    tag: { ar: "أخبار المؤسسة", tr: "Dernekten", en: "Foundation news" },
    image: U + "aq3ozYN2v3hM16vcs9J5_1745218453859.jpg",
    body: {
      ar: "في إطار تعزيز أواصر التعاون والعمل الدعوي والخيري المشترك، استقبلت مؤسسة البراق في مقرها فضيلة الشيخ عبد العزيز ساربا، أحد مشايخ دولة ساحل العاج.\n\nوقد جاءت هذه الزيارة بهدف التعارف وتبادل الخبرات، حيث قدّم فريق المؤسسة شرحًا وافيًا عن المشاريع التي تنفذها المؤسسة، خصوصًا في القدس وقطاع غزة، بالإضافة إلى عرض الأوضاع الإنسانية الراهنة التي يعيشها أهلنا هناك.\n\nأبدى فضيلة الشيخ اهتمامه البالغ برسالة المؤسسة وأهدافها، مؤكدًا على أهمية توسيع العمل المشترك بين المؤسسات الإسلامية في مختلف أنحاء العالم، بما يخدم قضايا الأمة، وفي مقدمتها قضية المسجد الأقصى المبارك وفلسطين.",
      tr: "Ortak davet ve hayır çalışmalarını güçlendirmek amacıyla Burak Derneği, Fildişi Sahili'nin âlimlerinden Şeyh Abdulaziz Sarba'yı merkezinde ağırladı.\n\nTanışma ve tecrübe paylaşımı amacıyla gerçekleşen ziyarette dernek ekibi, özellikle Kudüs ve Gazze'de yürütülen projeler ve oradaki insani durum hakkında bilgi verdi. Şeyh Sarba, derneğin misyonuna büyük ilgi gösterdi.",
      en: "To strengthen ties of cooperation in da'wah and charitable work, Burak Foundation welcomed Sheikh Abdelaziz Sarba, a scholar from Côte d'Ivoire, at its headquarters.\n\nDuring the visit the team presented the foundation's projects, especially in Al-Quds and Gaza, and the current humanitarian situation there. The Sheikh expressed great interest in the foundation's mission and stressed the importance of joint work among Islamic organisations worldwide.",
    },
  },
];
export const getNews = (slug: string) => news.find((n) => n.slug === slug);

/* فيديوهات حقيقية من قناة البراق على يوتيوب */
export type Video = { id: string; title: string; group: "school" | "field" };
export const videos: Video[] = [
  { id: "WlGnVeDyhig", title: "Burak Derneği Tanıtım Videosu", group: "field" },
  { id: "5_vgbGVo7Uo", title: "مخيم البراق الصيفي للأطفال في القدس | تعليم وتربية وبناء للجيل المقدسي", group: "field" },
  { id: "qgHKcD_ydGY", title: "Gazze Temiz Su Dağıtımı", group: "field" },
  { id: "VhXNPcNUyX0", title: "Ramazan", group: "field" },
  { id: "aa0IPTVdEQk", title: "Filistin'i Anlamak: Tarih, Gerçekler ve Gelecek — Doç. Dr. Ahmet Özel", group: "school" },
  { id: "_8cuITJkkKk", title: "Batı Şeria; Parçalanmış Haritada Bütün Kalmak — Dr. Ahmet Emin Dağ", group: "school" },
  { id: "lLxq21Zqpxo", title: "Gazze Gerçeğinde Kimlik ve Vatanseverliği Besleyen Dinamikler — Dr. Beşir Süleyman", group: "school" },
  { id: "ntyY09gt9TI", title: "Kudüs: Kısıtlamalar Altındaki Hayatın Gerçekleri — Av. Halid Zabarka", group: "school" },
  { id: "Zv4UMqZUOws", title: "Burak Okulu 2 — Dr. Azzam Temimi: Gazze'de Yaşananlar ve Batı Şeria'ya Etkileri", group: "school" },
  { id: "2WoRWQEmphM", title: "Burak Okulu 2 — Şeyh Kemal Ammara: Filistin Avrupa'nın Vicdanını Nasıl Uyandırdı?", group: "school" },
  { id: "9osPifaBcFI", title: "Burak Okulu 2 — Dr. Abdurrezak Matani: Toprağın Hafızası", group: "school" },
  { id: "EVbYo0rs_u4", title: "Burak Okulu 2 — Ali Hassun: 7 Ekim'in Gölgesinde Kudüs'te Neler Yaşanıyor?", group: "school" },
];
export const introVideo = "WlGnVeDyhig";

/* معالم الأقصى — للخريطة وصفحات المعالم */
export type Landmark = { id: string; x: number; y: number; title: L; text: L; project?: string };
export const landmarks: Landmark[] = [
  {
    id: "dome-of-the-rock",
    x: 292,
    y: 292,
    title: { ar: "قبة الصخرة المشرفة", tr: "Kubbetü's-Sahra", en: "The Dome of the Rock" },
    text: {
      ar: "شيّدها الخليفة الأموي عبد الملك بن مروان نحو سنة 72هـ / 691م، وهي أقدم أثر معماري إسلامي قائم، تتوسط صحن الأقصى فوق مصطبة مرتفعة، بقبتها الذهبية وبلاطها الأزرق الذي استُلهمت منه ألوان هوية البراق.",
      tr: "Emevi halifesi Abdülmelik b. Mervân tarafından 72/691 civarında inşa edildi; ayakta kalan en eski İslam mimari eseridir. Aksa avlusunun ortasında yüksek bir seki üzerinde yer alır; altın kubbesi ve mavi çinileri Burak kimliğinin renklerine ilham vermiştir.",
      en: "Built by the Umayyad caliph Abd al-Malik ibn Marwan around 72 AH / 691 CE, it is the oldest surviving Islamic monument. It stands on a raised platform at the heart of Al-Aqsa; its golden dome and blue tiles inspired Burak's identity colours.",
    },
    project: "jyl-alqran-5",
  },
  {
    id: "dome-of-the-chain",
    x: 350,
    y: 296,
    title: { ar: "قبة السلسلة", tr: "Kubbetü's-Silsile", en: "The Dome of the Chain" },
    text: {
      ar: "قبة صغيرة مفتوحة إلى الشرق من قبة الصخرة، من أقدم قباب المسجد الأقصى.",
      tr: "Kubbetü's-Sahra'nın doğusunda yer alan açık küçük kubbe; Aksa'nın en eski kubbelerindendir.",
      en: "A small open dome east of the Dome of the Rock, one of the oldest domes of Al-Aqsa.",
    },
  },
  {
    id: "qibli-mosque",
    x: 330,
    y: 595,
    title: { ar: "المسجد القبلي", tr: "Kıble Mescidi", en: "Al-Qibli Mosque" },
    text: {
      ar: "المصلى الجامع في الجهة الجنوبية بقبته الرصاصية، وفيه تُقام صلاة الجمعة والجماعات الكبرى.",
      tr: "Güneydeki kurşun kubbeli ana mescit; cuma namazı ve büyük cemaatler burada kılınır.",
      en: "The main congregational prayer hall in the south with its lead-grey dome, where Friday prayers are held.",
    },
    project: "sqya-alma-alqds",
  },
  {
    id: "marwani",
    x: 450,
    y: 585,
    title: { ar: "المصلى المرواني", tr: "Mervânî Mescidi", en: "Al-Marwani Prayer Hall" },
    text: {
      ar: "مصلى واسع تحت مستوى الساحات في الزاوية الجنوبية الشرقية، أُعيد فتحه للصلاة عام 1996م.",
      tr: "Güneydoğu köşesinde avlu seviyesinin altında geniş bir mescit; 1996'da yeniden ibadete açıldı.",
      en: "A vast hall below courtyard level in the south-east corner, reopened for prayer in 1996.",
    },
  },
  {
    id: "bab-al-rahma",
    x: 484,
    y: 330,
    title: { ar: "باب الرحمة", tr: "Bâbü'r-Rahme", en: "Bab Al-Rahma" },
    text: {
      ar: "باب في السور الشرقي، وإلى جواره مصلى باب الرحمة الذي أعاد المقدسيون فتحه للصلاة عام 2019م.",
      tr: "Doğu surundaki kapı; yanındaki Bâbü'r-Rahme mescidi 2019'da Kudüslüler tarafından yeniden ibadete açıldı.",
      en: "A gate in the eastern wall; the prayer hall beside it was reopened for prayer by Jerusalemites in 2019.",
    },
    project: "mshrwa-dam-algharmyn-fy-alqds",
  },
  {
    id: "buraq-wall",
    x: 172,
    y: 560,
    title: { ar: "حائط البراق", tr: "Burak Duvarı", en: "Al-Buraq Wall" },
    text: {
      ar: "الجزء الجنوبي من السور الغربي للأقصى، ارتبط اسمه بما ورد من ربط النبي ﷺ البراق عنده ليلة الإسراء — ومنه استلهمت المؤسسة اسمها.",
      tr: "Aksa'nın batı surunun güney kısmı; adı, İsrâ gecesi Peygamberimiz ﷺ'in Burak'ı buraya bağladığına dair rivayetten gelir — derneğimiz adını buradan alır.",
      en: "The southern part of Al-Aqsa's western wall, named after the narration that the Prophet ﷺ tethered Al-Buraq there on the night of the Isra — the source of our name.",
    },
  },
  {
    id: "bab-al-asbat",
    x: 440,
    y: 64,
    title: { ar: "باب الأسباط", tr: "Bâbü'l-Esbât", en: "Bab Al-Asbat" },
    text: {
      ar: "من أبواب الأقصى الشمالية، ويدخل منه كثير من المصلين القادمين من خارج البلدة القديمة.",
      tr: "Aksa'nın kuzey kapılarından; Eski Şehir dışından gelen pek çok namaz kılan buradan girer.",
      en: "One of Al-Aqsa's northern gates, used by many worshippers coming from outside the Old City.",
    },
  },
  {
    id: "learning-benches",
    x: 230,
    y: 170,
    title: { ar: "مصاطب العلم", tr: "İlim Sekileri", en: "Benches of Learning" },
    text: {
      ar: "تنتشر في ساحات الأقصى مصاطب وحلقات علم وقرآن، يرعى «جيل القرآن» طلابها وحفّاظها.",
      tr: "Aksa avlularına yayılmış ilim ve Kur'an halkaları; «Kur'an Nesli» projesi öğrencilerini ve hafızlarını destekler.",
      en: "Benches and circles of learning spread across Al-Aqsa's courtyards; «Quran Generation» supports their students.",
    },
    project: "hlqat-alqran-alqds",
  },
];
export const getLandmark = (id: string) => landmarks.find((l) => l.id === id);

export const qudsLibrary: { title: L; href: string; desc: L; icon: "book" | "play" | "map" }[] = [
  { title: { ar: "نبذة وتاريخ", tr: "Tarihçe", en: "About & History" }, href: "/quds#history", desc: { ar: "من الإسراء والمعراج إلى اليوم", tr: "İsrâ ve Mi'rac'tan bugüne", en: "From the Night Journey to today" }, icon: "book" },
  { title: { ar: "معالم الأقصى", tr: "Aksa'nın mekânları", en: "Landmarks of Al-Aqsa" }, href: "/quds#landmarks", desc: { ar: "القباب والمصليات والأبواب", tr: "Kubbeler, mescitler, kapılar", en: "Domes, prayer halls and gates" }, icon: "map" },
  { title: { ar: "مقالات", tr: "Makaleler", en: "Articles" }, href: "/news", desc: { ar: "قراءات في قضية القدس", tr: "Kudüs davası üzerine", en: "Readings on the Al-Quds cause" }, icon: "book" },
  { title: { ar: "مدرسة البراق", tr: "Burak Okulu", en: "Burak School" }, href: "/media", desc: { ar: "محاضرات عن القدس وفلسطين", tr: "Kudüs ve Filistin konferansları", en: "Lectures on Al-Quds and Palestine" }, icon: "play" },
  { title: { ar: "معرض الصور", tr: "Fotoğraf galerisi", en: "Photo gallery" }, href: "/media#photos", desc: { ar: "القدس وغزة بعدسة البراق", tr: "Burak objektifinden", en: "Through Burak's lens" }, icon: "book" },
  { title: { ar: "الفيديوهات", tr: "Videolar", en: "Videos" }, href: "/media", desc: { ar: "أفلام ووثائقيات", tr: "Filmler ve belgeseller", en: "Films and documentaries" }, icon: "play" },
];

export const contact = {
  phone: "+90 531 280 02 17", // العربي والإنجليزي
  phoneHref: "tel:+905312800217",
  phoneTr: "+90 507 460 18 41", // التركي
  phoneTrHref: "tel:+905074601841",
  whatsapp: "https://api.whatsapp.com/send?phone=905312800217",
  email: "info@burakdernegi.org",
  website: "www.burakdernegi.org",
  legalName: "Burak Mukaddes Mekanları Tanıtma ve Kültür Derneği",
  address: "Murat Reis Mah. Payanda Sk. No:23 Üsküdar / İstanbul",
  handles: { ar: "alburakorg", tr: "burakdernegi", en: "alburakorgen" },
};

export const socials = (h: string) => [
  { key: "facebook", href: `https://www.facebook.com/${h}` },
  { key: "instagram", href: `https://www.instagram.com/${h}` },
  { key: "x", href: `https://x.com/${h}` },
  { key: "tiktok", href: `https://www.tiktok.com/@${h}` },
  { key: "youtube", href: `https://www.youtube.com/@${h}` },
] as const;
