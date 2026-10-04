# منصة إطبعلي للطباعة والتغليف الفاخر | Etbaaly Platform
> الذراع الإنتاجي والطباعي لـ **A.Z Agency** - منصة متكاملة للطباعة التجارية، التغليف الفاخر، وتصنيع الملابس للغير (Private Label & Custom Merchandise).

---

## 📌 نبذة عامة (Overview)

منصة **إطبعلي (Etbaaly)** هي نظام ويب تجاري متكامل مبني بتقنيات الويب الحديثة (Next.js 16 App Router و React 19)، مصمم خصيصاً للشركات، البراندات، والوكالات الإعلانية في جمهورية مصر العربية والشرق الأوسط.

توفر المنصة تجربة مستخدم عربية أصيلة (RTL-First) بالتعاون مع خط **Lateef** وتصميم واجهات متقدم يدعم النمطين الليلي والنهاري (Dark/Light Mode)، مع محرك حساب أسعار وتخصيص فوري، وتتبع مباشر للشحنات، ولوحة تحكم إدارية شاملة.

---

## 🚀 الترسانة التقنية (Tech Stack)

| الطبقة | التقنية المستخدمة |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org) |
| **Frontend UI** | [React 19](https://react.dev) + [Tailwind CSS v4](https://tailwindcss.com) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) (Strict Mode) |
| **Database & Auth** | [Supabase](https://supabase.com) (PostgreSQL + RLS + Storage) |
| **Icons & UI Utilities** | [Lucide React](https://lucide.dev), `clsx`, `tailwind-merge`, `next-themes` |
| **Tracking & Analytics** | Meta / Facebook Pixel, Webhooks Integration (n8n ready) |

---

## 🛠️ المميزات الرئيسية (Core Features)

1. **كتالوج منتجات تفاعلي (Interactive Catalog):**
   - أكثر من 50 منتج طباعة وتغليف جاهز ومفصل بالمواصفات والأسعار ومحددات الكمية.
   - خيارات تخصيص فورية (مقاسات، خامات، تشطيبات سلوفان وسبوت يو في وبصمة فويل).
2. **محرك تتبع الشحنات والطلبات (`/track`):**
   - تتبع لحظي لحالة الطلب ومراحل الإنتاج (قيد المراجعة، في المطبعة، قيد التجهيز، خرج للشحن، تم التسليم).
3. **لوحة تحكم إدارية كاملة (`/admin`):**
   - إدارة الطلبات ومراحل الإنتاج مع إحصائيات بصرية سريعة.
   - إدارة الكتالوج والمنتجات والمقالات ومكتبة الوسائط.
4. **أداء وسرعة قياسية (Performance & SEO):**
   - Pre-rendering ثابت وديناميكي هجين (SSG + SSR) لـ 130+ مسار مع توليد Sitemap و Robots تلقائي.
   - ترويسات أمان برودكشن متقدمة (HSTS, CSP, X-Frame-Options, NoSniff).

---

## ⚙️ متطلبات التشغيل والتثبيت (Setup & Installation)

### 1. تثبيت الحزم:
```bash
npm install
```

### 2. إعداد المتغيرات البيئية (Environment Variables):
انسخ ملف الإعدادات وقم بملء البيانات الخاصة بك:
```bash
cp .env.example .env.local
```

| المتغير | الوصف |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | رابط مشروع Supabase الخاص بك |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | المفتاح العام (Anon/Public Key) |
| `SUPABASE_SERVICE_ROLE_KEY` | المفتاح السري للعمليات الإدارية (Server-Side Only) |
| `ADMIN_PASSWORD` | كلمة سر الدخول للوحة التحكم `/admin` |
| `ADMIN_AUTH_SECRET` | رمز أمان تشفير جلسات الإدارة |
| `ADMIN_API_KEY` | مفتاح الـ API للربط البرمجي الداخلي |
| `NEXT_PUBLIC_FB_PIXEL_ID` | معرّف بيكسل فيسبوك |

---

## 💻 أوامر التشغيل والبناء (Available Scripts)

```bash
# تشغيل خادم التطوير المحلي
npm run dev

# فحص أنواع TypeScript بدقة
npm run typecheck

# فحص وتدقيق الكود (Linting)
npm run lint

# بناء نسخة الإنتاج المحسّنة (Production Build)
npm run build

# تشغيل خادم الإنتاج محلياً
npm run start
```

---

## 🔒 قائمة التحقق للإنتاج (Production Checklist)

- [x] **Strict Security Headers:** تفعيل ترويسات الأمان الصارمة في `next.config.ts`.
- [x] **Robots & Sitemap Protection:** حجب مسارات الإدارة والـ API من العناكب في `app/robots.ts`.
- [x] **Admin Authentication:** تعيين `ADMIN_PASSWORD` و `ADMIN_AUTH_SECRET` في بيئة الاستضافة.
- [x] **Zero TypeScript Errors:** التأكد من اجتياز `npm run typecheck` و `npm run build` بنجاح كامل.
- [x] **Asset Optimization:** ضغط وتحسين مسارات الصور والأصول الثابتة.

---

## 🏢 الترخيص والحقوق (License & Rights)
جميع الحقوق محفوظة © لصالح **A.Z Agency** - منصة إطبعلي (Etbaaly).
