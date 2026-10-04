import { initialAdminProducts } from "./seed";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dvkbfckmtovvoybnytix.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const inMemoryStore = {
  adminProducts: [...initialAdminProducts],
  users: [
    {
      id: "usr-demo-01",
      username: "ahmed_abdelrahman",
      email: "client@azagency.online",
      password_hash: "demo123456",
      role: "client",
      full_name: "م. أحمد عبد الرحمن",
      phone: "01012345678",
      company_name: "شركة النور للحلول المتكاملة",
      tax_number: "748-291-832",
      address: "التجمع الخامس، القاهرة الجديدة",
      created_at: new Date().toISOString(),
    },
    {
      id: "usr-admin-01",
      username: "assem_admin",
      email: "admin@etbaaly.com",
      password_hash: "admin123456",
      role: "admin",
      full_name: "م. عاصم (مدير منصة إطبعلي)",
      phone: "01099887766",
      company_name: "إدارة إطبعلي المركزية - A.Z",
      tax_number: "990-112-400",
      address: "المقر الرئيسي - مدينة نصر، القاهرة",
      created_at: new Date().toISOString(),
    },
  ],
  orders: [
    {
      id: "ord-8841",
      tracking_code: "ETB-8841",
      user_id: "usr-demo-01",
      customer_name: "م. أحمد عبد الرحمن",
      customer_phone: "01012345678",
      customer_email: "client@azagency.online",
      service_type: "علب وتغليف منتجات فاخرة",
      product_name: "علب كرتون دوبلكس مقوى كاستم مع سبوت UV وسلوفان مط",
      specs: {
        dimensions: "22 x 15 x 8 cm",
        material: "كرتون دوبلكس فاخر 350 جم",
        finishing: "سلوفان مط + سبوت UV ملمع + بصمة ذهبية حرارية",
      },
      quantity: 2500,
      unit_price: 8.5,
      total_price: 21250,
      status: "printing",
      status_label: "جاري الطباعة والسحب",
      shipping_address: "شارع التسعين الشمالي، مجمع البنوك، مبنى 4B",
      shipping_city: "القاهرة الجديدة",
      shipping_method: "شحن سريع مخصص مع حماية مضاعفة",
      estimated_delivery: "خلال 48 ساعة (16 سبتمبر 2026)",
      courier_name: "كابتن محمود فوزي (أسطول توصيل إطبعلي)",
      courier_phone: "01099887766",
      timeline: [
        { step: "تم استلام أمر الشغل وتأكيد الدفعة", date: "12 سبتمبر 2026 - 10:30 ص", completed: true, desc: "تمت مراجعة المواصفات والكمية وتأكيد الدفعة المقدمة." },
        { step: "الفحص الفني واعتماد بروفة الألوان (Preflight)", date: "12 سبتمبر 2026 - 02:15 م", completed: true, desc: "تم فحص ملفات الطباعة CMYK واعتماد البروفة." },
        { step: "جاري سحب الطباعة على ماكينات هايدلبرج أوفست", date: "13 سبتمبر 2026 - 11:00 ص", completed: true, current: true, desc: "الطباعة جارية بدقة 2400 DPI." },
        { step: "مرحلة السلوفان، السكينة، والبصمة الحرارية", date: "متوقع 14 سبتمبر 2026", completed: false, desc: "تطبيق السلوفان والسكينة." },
        { step: "خروج الشحنة مع مندوب التوصيل", date: "متوقع 16 سبتمبر 2026", completed: false, desc: "تسليم الشحنة لمندوب التوصيل." },
      ],
      notes: "تسليم الاستقبال بالدور الثالث مع الفاتورة الأصلية.",
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "ord-7719",
      tracking_code: "ETB-7719",
      user_id: "usr-demo-01",
      customer_name: "م. أحمد عبد الرحمن",
      customer_phone: "01012345678",
      customer_email: "client@azagency.online",
      service_type: "تجهيزات مكاتب وحفر ليزر VIP",
      product_name: "يافطة مكتب 3D خشب زان وأكريليك ميرور ذهبي + طقم أقلام ومج حراري",
      specs: {
        dimensions: "30 x 10 cm (يافطة) + مج 500 مل",
        material: "خشب زان طبيعي معالج + أكريليك ميرور ذهبي بارز",
        custom_text: "م. أحمد عبد الرحمن - الرئيس التنفيذي",
        finishing: "قص وتفريغ ليزر دقيق 3D مع حفر فايبر للأقلام",
      },
      quantity: 5,
      unit_price: 680,
      total_price: 3400,
      status: "preflight",
      status_label: "مرحلة تجهيز خطوط القص والليزر (Preflight)",
      shipping_address: "شارع التسعين الشمالي، مجمع البنوك، مبنى 4B",
      shipping_city: "القاهرة الجديدة",
      shipping_method: "شحن سريع مخصص مع حماية مضاعفة",
      estimated_delivery: "خلال 24 ساعة (16 سبتمبر 2026)",
      courier_name: "كابتن محمود فوزي (أسطول توصيل إطبعلي)",
      courier_phone: "01099887766",
      timeline: [
        { step: "تم استلام الطلب وتأكيد النصوص العربية", date: "14 سبتمبر 2026 - 09:00 ص", completed: true, desc: "تم تأكيد الأسماء والمناصب واللوجو المرفق." },
        { step: "معالجة ملفات الفيكتور ومسار ماكينة الليزر", date: "14 سبتمبر 2026 - 11:30 ص", completed: true, current: true, desc: "ضبط مقاسات القص والتفريغ الليزري بدقة 0.1 ملم." },
        { step: "قص الأكريليك وحفر الخشب الزان بالليزر", date: "متوقع 15 سبتمبر 2026", completed: false, desc: "التنفيذ على ماكينات الليزر الحديثة." },
        { step: "التجميع اليدوي والتلميع والتغليف الفاخر", date: "متوقع 15 سبتمبر 2026", completed: false, desc: "تثبيت الطبقات وفحص الجودة." },
        { step: "تسليم الشحنة لمندوب التوصيل", date: "متوقع 16 سبتمبر 2026", completed: false, desc: "التوصيل لمقر العميل." },
      ],
      notes: "يرجى تغليف كل يافطة داخل كيس قطيفة وبوكس هدايا منفصل.",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "ord-9482",
      tracking_code: "ETB-9482",
      user_id: "usr-other-02",
      customer_name: "م. شريف المنياوي",
      customer_phone: "01122334455",
      customer_email: "sherif@elminyawy-group.com",
      service_type: "كروت شخصية فاخرة ومطبوعات مكتبية",
      product_name: "باقة كروت بزنس كوشيه 400جم مع بصمة فضي + فولدرات رسمية",
      specs: {
        dimensions: "9 x 5.5 cm",
        material: "كوشيه فاخر 400 جم مستورد",
        finishing: "سلوفان حريري مخملي Soft Touch وبصمة ليزرية",
      },
      quantity: 1000,
      unit_price: 1.8,
      total_price: 1800,
      status: "shipped",
      status_label: "في الطريق للتسليم",
      shipping_address: "مكرم عبيد، تقاطع طريق النصر",
      shipping_city: "مدينة نصر - القاهرة",
      shipping_method: "مندوب توصيل إطبعلي إكسبريس",
      estimated_delivery: "اليوم بين 3:00 م و 6:00 م",
      courier_name: "كابتن حسام حسن",
      courier_phone: "01234567890",
      timeline: [
        { step: "تأكيد واستلام ملفات التصميم", date: "10 سبتمبر 2026", completed: true, desc: "اعتماد المقاسات وخطوط القص." },
        { step: "الطباعة والتشطيب الفاخر", date: "11 سبتمبر 2026", completed: true, desc: "تطبيق السلوفان والبصمة الفضية." },
        { step: "التعبئة في علب بلاستيكية أنيقة", date: "12 سبتمبر 2026", completed: true, desc: "فحص الجودة والتغليف." },
        { step: "الشحنة مع مندوب التوصيل", date: "اليوم 14 سبتمبر 2026", completed: true, current: true, desc: "المندوب في طريقه لمقر الشركة." },
      ],
      notes: "الاتصال قبل الوصول بربع ساعة.",
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "ord-5120",
      tracking_code: "ETB-5120",
      user_id: "usr-client-03",
      customer_name: "أ. سارة فهمي",
      customer_phone: "01234567890",
      customer_email: "sarah@creative-hub.com",
      service_type: "كتالوجات وبروفايل شركات",
      product_name: "كتالوج تعريفي سلك لولبي غلاف هارد كفر 32 صفحة",
      specs: {
        pages: "32 صفحة داخلية ملونة",
        paper: "ورق 170 جم كوشيه داخلي + غلاف 350 جم كوشيه مط",
        binding: "تجليد سلك حلزوني مخفي",
      },
      quantity: 500,
      unit_price: 24,
      total_price: 12000,
      status: "delivered",
      status_label: "تم التسليم بنجاح",
      shipping_address: "القرية الذكية، مبنى B12",
      shipping_city: "أكتوبر - الجيزة",
      shipping_method: "شحن أسطول إطبعلي للشركات",
      estimated_delivery: "تم الاستلام 11 سبتمبر 2026",
      courier_name: "كابتن عادل فاروق",
      courier_phone: "01055443322",
      timeline: [
        { step: "استلام وتدقيق محتوى الكتالوج", date: "06 سبتمبر 2026", completed: true, desc: "فحص الفواصل وهوامش التجليد." },
        { step: "الطباعة الرقمية عالية النقاوة", date: "08 سبتمبر 2026", completed: true, desc: "سحب الصفحات والغلاف." },
        { step: "التجليد والتخريم الآلي", date: "09 سبتمبر 2026", completed: true, desc: "تطبيق التجليد والسلك." },
        { step: "تم التسليم للعميل بنجاح", date: "11 سبتمبر 2026", completed: true, current: true, desc: "تم التوقيع على استلام الكمية كاملة." },
      ],
      notes: "تم الفحص والتسليم بنجاح مع الفاتورة الضريبية.",
      created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  quotes: [] as any[],
  sampleRequests: [] as any[],
  userCustomizations: [] as any[],
  userDesigns: [] as any[],
  configuredProducts: [] as any[],
  visualConfigurators: [] as any[],
  mediaAssets: [] as any[],
};

// SQL template tag runner over Supabase REST RPC
export async function executeSql<T = any>(
  strings: TemplateStringsArray,
  ...values: any[]
): Promise<T[]> {
  let query = "";
  for (let i = 0; i < strings.length; i++) {
    query += strings[i];
    if (i < values.length) {
      const val = values[i];
      if (val === null || val === undefined) {
        query += "NULL";
      } else if (typeof val === "number") {
        query += Number.isFinite(val) ? val.toString() : "0";
      } else if (typeof val === "boolean") {
        query += val ? "TRUE" : "FALSE";
      } else if (typeof val === "object") {
        const jsonStr = JSON.stringify(val).replace(/'/g, "''");
        query += `'${jsonStr}'`;
      } else {
        const strVal = String(val).replace(/'/g, "''");
        query += `'${strVal}'`;
      }
    }
  }

  const endpoint = `${supabaseUrl}/rest/v1/rpc/exec_sql`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Supabase SQL Execution failed (${res.status}): ${errorBody}`);
  }

  const data = await res.json();
  return (data || []) as T[];
}

export function getDb() {
  if (supabaseUrl && supabaseKey) {
    return {
      isLive: true,
      sql: executeSql,
    };
  }
  return { isLive: false, sql: null };
}
