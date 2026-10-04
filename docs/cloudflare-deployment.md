# دليل نشر منصة إطبعلي (Etbaaly) على GitHub و Cloudflare

تم إعداد وضبط المشروع بالكامل ليعمل بأعلى كفاءة على **Cloudflare Workers** باستخدام المحول الرسمي **Cloudflare OpenNext (`@opennextjs/cloudflare`)** مع محاذاة بنية **Next.js 16** و **Supabase**.

---

## 1. الأوامر المتاحة في `package.json`

| الأمر | الوظيفة |
|---|---|
| `npm run dev` | تشغيل سيرفر التطوير المحلي لـ Next.js |
| `npm run build` | بناء تطبيق Next.js والتحقق من الصفحات الثابتة والديناميكية |
| `npm run build:worker` | تحزيم التطبيق للعامل (Cloudflare Worker) وإنتاج مجلد `.open-next` |
| `npm run preview:worker` | معاينة التطبيق محلياً داخل بيئة تحاكي Cloudflare (`wrangler dev`) |
| `npm run deploy:worker` | نشر التطبيق مباشرة إلى شبكة Cloudflare العالمية |
| `npm run typecheck` | فحص أنواع TypeScript والتأكد من خلو المشروع من الأخطاء |

---

## 2. خطوات الرفع على GitHub

1. تهيئة مستودع Git في مجلد الموقع:
```bash
git init
git add .
git commit -m "feat: initial commit - Etbaaly platform ready for Cloudflare Workers"
```

2. إنشاء المستودع على GitHub وربطه:
```bash
# عبر GitHub CLI (gh):
gh repo create etbaaly --public --source=. --remote=origin --push

# أو الربط بمستودع موجود:
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git
git branch -M main
git push -u origin main
```

---

## 3. النشر على Cloudflare

### الطريقة الأولى: النشر المباشر عبر Wrangler CLI (الموصى بها وسريعة)

1. تسجيل الدخول إلى Cloudflare:
```bash
npx wrangler login
```

2. تعيين المتغيرات الحساسة (Secrets) على Cloudflare:
```bash
# 1. مفتاح خدمة Supabase للإدارة والعمليات الخلفية
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# 2. رابط قاعدة البيانات المباشر / الـ Pooler
npx wrangler secret put DATABASE_URL

# 3. كلمة مرور لوحة تحكم الإدارة (/admin)
npx wrangler secret put ADMIN_PASSWORD

# 4. مفتاح تشفير الجلسات الإدارية
npx wrangler secret put ADMIN_AUTH_SECRET

# 5. مفتاح الـ API للطلبات المعتمدة
npx wrangler secret put ADMIN_API_KEY
```

3. بناء ونشر العامل:
```bash
npm run deploy:worker
```

---

### الطريقة الثانية: ربط GitHub بـ Cloudflare Workers Builds (نشر تلقائي مع كل Push)

1. ادخل إلى **Cloudflare Dashboard > Workers & Pages**.
2. اختر **Create > Workers**.
3. اختر تبويب **Connect to Git** وحدد مستودع المشروع من GitHub.
4. اضبط إعدادات البناء (Build Settings):
   - **Build Command:** `npx opennextjs-cloudflare build`
   - **Deploy Command:** `npx wrangler deploy`
5. في تبويب **Environment Variables / Secrets**، أضف المتغيرات السرية المذكورة أعلاه.
6. اضغط **Save and Deploy**.

---

## 4. ربط النطاق المخصص (Custom Domain)

لربط الموقع بنطاق `etbaaly.azagency.online`:

1. من لوحة **Cloudflare Dashboard**، انتقل إلى **Compute (Workers & Pages)**.
2. اختر العامل **`etbaaly`**.
3. توجه إلى **Settings > Domains & Routes**.
4. اضغط **Add > Custom Domain** واكتب `etbaaly.azagency.online`.
5. سيتولى Cloudflare ربط الـ DNS وشهادة SSL تلقائياً.
