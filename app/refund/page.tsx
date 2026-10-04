import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";
import PolicyHeader from "@/components/legal/PolicyHeader";
import PolicyTabsNav from "@/components/legal/PolicyTabsNav";
import StrictClauseAlert from "@/components/legal/StrictClauseAlert";
import LegalSidebar from "@/components/legal/LegalSidebar";
import PolicyFaqSection, { PolicyFaqItem } from "@/components/legal/PolicyFaqSection";
import {
  RotateCcw,
  Ban,
  Video,
  Palette,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Percent,
} from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الاسترجاع والإلغاء وضمان الجودة وتفاوت التشغيل | إطبعلي - Etbaaly",
  description:
    "سياسة الاسترجاع والإلغاء وضمان جودة تصنيع الطباعة والتغليف لدى إطبعلي. توضح شروط المادة 17 من قانون حماية المستهلك المصري، تفاوت ألوان CMYK، وبروتوكول فحص الـ 48 ساعة بفيديو المعاينة.",
  alternates: {
    canonical: `${siteConfig.url}/refund/`,
  },
  openGraph: {
    title: "سياسة الاسترجاع والإلغاء وضمان الجودة وتفاوت التشغيل | إطبعلي",
    description:
      "الشروط الصارمة للاسترجاع والإلغاء لمنتجات الطباعة والتغليف المخصصة طبقاً لقانون حماية المستهلك المصري، وتفاوت الألوان والكميات.",
    url: `${siteConfig.url}/refund/`,
    type: "website",
  },
};

const refundFaqs: PolicyFaqItem[] = [
  {
    q: "استلمت الشغل ودرجة اللون أغمق بنسبة بسيطة عن شاشة الآيفون، هل يحق لي الاسترجاع؟",
    a: "لا، شاشات الهواتف والكمبيوتر تعمل بنظام الإضاءة الرقمية RGB وتختلف إضاءتها وتباينها من جهاز لآخر، بينما الطباعة تتم بأحبار فيزيائية CMYK تمتصها الألياف الورقية بحسب نوع السلوفان (لامع/مطفي). التفاوت اللوني في حدود 5% إلى 10% هو معيار صناعي دولي معتمد وليس عيباً مصنعياً، ولا يخول العميل استرجاع الشحنة أو رفضها.",
    tag: "تفاوت الألوان",
  },
  {
    q: "لماذا تشترطون فيديو فتح الطرد (Unboxing Video) خلال 48 ساعة فقط؟",
    a: "لأن منتجات المطبوعات والكرتون حساسة للغاية لعوامل التخزين والرطوبة وسوء الاستخدام الخارجي. فيديو فتح الشحنة المتصل يثبت بما لا يدع مجالاً للشك أن التلف أو النقص حدث قبل التسليم وداخل طرد التغليف الأصلي، وهو المعيار المعتمد لدى شركات الشحن والتأمين ولجنة الجودة لدينا.",
    tag: "بروتوكول المعاينة",
  },
  {
    q: "هل يمكنني استرجاع جزء من العربون إذا رغبت بإلغاء الطلب بعد 24 ساعة من تأكيده؟",
    a: "إذا كان الطلب قد دخل مرحلة تجهيز الزنكات أو تقطيع الخامات الورقية المحجوزة بالمصنع، فلا يمكن استرجاع أي جزء من العربون نظراً لأن هذه الخامات أصبحت مقطوعة بمقاسات خاصة وغير قابلة لإعادة التدوير أو الاستخدام لعميل آخر.",
    tag: "مصادرة العربون",
  },
  {
    q: "ماذا يحدث إذا ثبت بالفعل وجود عيب صناعة جوهري صريح من طرف المطبعة؟",
    a: "في حال ثبوت خطأ فني صريح مخالف للبروفة المعتمدة (مثل خطأ تكسير، أو نقص ألوان فادح ناتج عن عطل ماكينة، أو تلف غراء وتقفيل)، تلتزم إطبعلي بإعادة تصنيع وتوريد الكميات المعيبة بالكامل على نفقتها الخاصة خلال أسرع دورة إنتاج ممكنة، بعد استلام وفحص المرتجع المعيب.",
    tag: "إعادة التصنيع",
  },
  {
    q: "هل تتحمل المطبعة أي تعويضات عن إلغاء مؤتمر أو تأخر إطلاق منتج بسبب عيب الصناعة؟",
    a: "ينحصر التزام إطبعلي الأقصى في قيمة أمر الشغل الفعلي المتعاقد عليه أو إعادة تصنيع الكميات المعيبة. لا تتحمل المنصة أي أضرار تبعية، أو خسائر غير مباشرة، أو تفويت أرباح، أو تكاليف تأجير قاعات ومعارض خاصة بالعميل.",
    tag: "حدود المسؤولية",
  },
];

export default function RefundPage() {
  const navItems = [
    { id: "section-law17", title: "المادة 1: المنتجات المخصصة وقانون حماية المستهلك" },
    { id: "section-cancellation", title: "المادة 2: سياسة الإلغاء ومصادرة العربون" },
    { id: "section-color-tolerance", title: "المادة 3: تفاوت الألوان بين الشاشات والطباعة" },
    { id: "section-quantity-waste", title: "المادة 4: تفاوت الكميات ونسب الهالك الصناعي" },
    { id: "section-inspection-protocol", title: "المادة 5: بروتوكول الـ 48 ساعة وفيديو المعاينة" },
    { id: "section-reproduction", title: "المادة 6: إجراءات التعويض وإعادة التصنيع" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "المركز القانوني", url: `${siteConfig.url}/policy/` },
          { name: "سياسة الاسترجاع والإلغاء", url: `${siteConfig.url}/refund/` },
        ]}
      />
      <FAQSchema
        items={refundFaqs.map((faq) => ({
          question: faq.q,
          answer: faq.a,
        }))}
      />

      {/* Header */}
      <PolicyHeader
        title="سياسة الاسترجاع والإلغاء وضمان الجودة وتفاوت التشغيل"
        badge="لائحة حماية الجودة وضبط الإنتاج - مصر"
        description="توضح هذه الوثيقة المحددة والصارمة معايير قبول المرتجعات، تفاوتات الألوان والكميات المعترف بها صناعياً، شروط مصادرة العربون، وآلية فحص عيوب الصناعة وفقاً لأحكام قانون حماية المستهلك المصري."
        lastUpdated="أكتوبر 2026"
        readTime="7 دقائق"
      />

      {/* Tabs Navigation */}
      <PolicyTabsNav />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Content (Col 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Top Alert */}
          <StrictClauseAlert
            type="danger"
            title="القاعدة الذهبية: المنتجات المطبوعة خصيصاً لا ترد ولا تستبدل"
            description="تنص المادة 17 من قانون حماية المستهلك المصري رقم 181 لسنة 2018 صراحة على أن حق المستهلك في الاسترجاع أو الاستبدال خلال الـ 14 يوماً يسقط تماماً إذا كانت السلع مصنعة بناءً على مواصفات حددها العميل أو مخصصة لاستعماله الشخصي، ما دامت مطابقة لما تم اعتماده."
            points={[
              "العلب، الشنط، المطبوعات، والكروت التي تحمل اسمك أو شعارك لا يمكن إعادة بيعها لأي جهة أخرى.",
              "الاسترجاع أو إعادة التصنيع مشروط حصرياً بوجود عيب صناعة جوهري صريح مثبت بمحضر رسمي وفيديو فتح الشحنة.",
              "أي ادعاء باختلاف درجات ألوان الشاشة (RGB) عن أحبار الطباعة (CMYK) لا يعد عيب صناعة نهائياً.",
            ]}
            referenceLaw="المادة 17 والمادة 18 من قانون حماية المستهلك المصري رقم 181 لسنة 2018"
          />

          {/* Article 1 */}
          <section
            id="section-law17"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Ban className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الأولى: الأساس القانوني لعدم استرجاع المنتجات المخصصة</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>1.1. طبيعة النشاط الصناعي:</strong> إن كافة المنتجات المعروضة أو المصنعة عبر إطبعلي (علب كرتون، أكياس ورقية، ستيكرات، كروت شخصية، مطبوعات شركات، هدايا ترويجية) تندرج قانونياً وهندسياً تحت بند <strong>&quot;السلع المصنعة بمواصفات خاصة غير نمطية&quot;</strong>.
              </p>
              <p>
                <strong>1.2. سقوط حق الاستبدال والاسترجاع:</strong> بموجب أحكام المادة (17) الفقرة (ب) والمادة (18) من قانون حماية المستهلك المصري رقم 181 لسنة 2018 ولائحته التنفيذية، <strong>لا يجوز للعميل ممارسة حق الاسترجاع أو الاستبدال أو طلب رد المبالغ المالية</strong> لمجرد العدول عن الشراء، أو زوال حاجته للمطبوعات، أو انتهاء الفعالية، أو اعتراض العميل على التصميم الذي قام باعتماده بنفسه مسبقاً.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section
            id="section-cancellation"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الثانية: سياسة إلغاء الطلبات ومصادرة العربون</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                يخضع إلغاء أوامر الشغل للمراحل الزمنية والفنية الآتية:
              </p>
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs sm:text-sm">
                  <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">
                    المرحلة الأولى (قبل الاعتماد الفني وقبل حجز الخامات):
                  </strong>
                  يحق للعميل طلب إلغاء الأمر واسترداد العربون المدفوع مخصوماً منه <strong>5% رسوم إدارية وبنكية</strong>، شريطة تقديم طلب الإلغاء كتابياً قبل اعتماد البروفة أو قص أي لوح ورقي.
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 text-xs sm:text-sm">
                  <strong className="text-[#c93b41] dark:text-rose-300 block mb-1">
                    المرحلة الثانية (بعد اعتماد البروفة والبدء بالتجهيز):
                  </strong>
                  بمجرد اعتماد البروفة الفنية وبدء أي من العمليات الفنية (شراء الخامات المخصصة، تجهيز زنكات CTP، تصنيع سكاكين التكسير الليزر، حجز ورديات الماكينات)، <strong>لا يُقبل الإلغاء نهائياً ويُصادر العربون بالكامل بنسبة 100%</strong> لتعويض تكاليف الخامات التالفة وأجور التشغيل التي تم تكبدها فعلياً.
                </div>
              </div>
            </div>
          </section>

          {/* Article 3 */}
          <section
            id="section-color-tolerance"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الثالثة: تفاوت ألوان الطباعة بين الشاشات والورق (RGB vs CMYK)</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>3.1. التناقض البصري بين الشاشات والأحبار:</strong> تعمل شاشات الهواتف والأجهزة الذكية بنظام الضوء المنبعث (RGB Color Gamut) الذي يحتوي على طيف لوني ساطع وعريض جداً، بينما تعتمد الطباعة الأوفست والرقمية على أحبار التراكب الرباعي الفيزيائي (CMYK)، والتي تعتمد على انعكاس الضوء على الألياف الورقية.
              </p>
              <p>
                <strong>3.2. الشاشات ليست مرجعاً لونياً:</strong> لا يجوز للعميل بأي حال من الأحوال مقارنة المطبوعات الورقية بما يظهر على شاشات الموبايل (OLED/Super AMOLED) أو شاشات اللابتوب، حيث تختلف درجات حرارة الألوان من شاشة لأخرى.
              </p>
              <p>
                <strong>3.3. نسبة التفاوت المعتمدة:</strong> يُعد حدوث تفاوت لوني بنسبة <strong>تتراوح بين 5% إلى 10%</strong> بين البروفة الرقمية والمنتج الورقي المطبوع أمراً هندسياً حتمياً ومعياراً صناعياً دولياً (وفقاً للمواصفة القياسية ISO 12647)، ولا يُعد ذلك عيباً صناعياً ولا يبرر طلب إعادة الطباعة أو الاسترجاع.
              </p>
              <p>
                <strong>3.4. ضمان التطابق الدقيق (Hard Proof):</strong> في حال رغبة العميل في الوصول إلى درجة لونية محددة بدقة شديدة لعلامة تجارية كبرى، يُلزم بطلب &quot;بروفة حية مطبوعة&quot; (Hard Color Proof) مدفوعة الأجر ومعايرتها على الماكينة، أو تحديد أرقام ألوان بانتون القياسية (Pantone Solid Coated Codes) في ملفات التصميم الأصلية.
              </p>
            </div>
          </section>

          {/* Article 4 */}
          <section
            id="section-quantity-waste"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الرابعة: تفاوت الكميات ونسب الهالك الصناعي (Setup Waste)</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>4.1. هالك التجهيز وضبط التسجيل (Register):</strong> في عمليات طباعة الأوفست، السلوفان، الورنيش الموضعي (Spot UV)، والتكسير الليزري، تستهلك الماكينات عدداً من الأفرخ الورقية لضبط تطابق الألوان والتسجيل الميكانيكي.
              </p>
              <p>
                <strong>4.2. قاعدة ±5% إلى ±7%:</strong> تُقبل كافة الطلبيات بزيادة أو عجز يصل إلى <strong>±5% إلى ±7%</strong> عن الكمية المطلوبة. وتتم المحاسبة المالية النهائية وفقاً للكمية الفعلية المفرزة والمستلمة، أو تسوية فارق العجز في الفاتورة النهائية، دون أن يترتب على ذلك حق العميل في إلغاء الطلبية بالكامل.
              </p>
            </div>
          </section>

          {/* Article 5 */}
          <section
            id="section-inspection-protocol"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الخامسة: بروتوكول الـ 48 ساعة وإلزامية فيديو المعاينة (Unboxing Video)</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                لحماية حقوق العميل والمطبعة ضد أخطار الشحن وسوء المناولة، يُشترط التزام العميل التام بالبروتوكول الآتي:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>
                  <strong>فيديو فتح الشحنة الإلزامي (Unboxing Video):</strong> يجب على العميل تصوير مقطع فيديو مستمر وواضح دون قطع أو تعديل، يوضح بوليصة الشحن، سلامة شريط التغليف الخارجي للكرتونة، ولحظة فتح الطرد واستخراج العينات الأولى.
                </li>
                <li>
                  <strong>مهلة الـ 48 ساعة الحاسمة:</strong> يجب تقديم أي شكوى أو إخطار بعيب صناعة خلال مهلة أقصاها <strong>48 ساعة تقويمية</strong> من توقيت استلام الشحنة المسجل رسمياً لدى شركة الشحن.
                </li>
                <li>
                  <strong>سقوط حق الشكوى:</strong> يسقط حق العميل في الاعتراض نهائياً، وتعتبر الشحنة مقبولة تماماً وخالية من العيوب في الحالات الآتية:
                  <ol className="list-decimal list-inside mr-4 mt-1 space-y-1 text-slate-500 dark:text-slate-400">
                    <li>انقضاء مهلة الـ 48 ساعة دون إرسال إخطار رسمي مدعوم بالفيديو.</li>
                    <li>استخدام أو توزيع أي جزء من المطبوعات أو العلب في السوق أو المعارض.</li>
                    <li>تعرض المطبوعات لرطوبة أو سوء تخزين لدى العميل بعد الاستلام.</li>
                  </ol>
                </li>
              </ul>
            </div>
          </section>

          {/* Article 6 */}
          <section
            id="section-reproduction"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c93b41]" />
                <span>المادة السادسة: إجراءات التعويض وإعادة التصنيع المعتمدة</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>6.1. فحص المرتجع بلجنة الجودة:</strong> في حال تقديم الشكوى وفق البروتوكول، يلتزم العميل بإعادة شحن الكمية المعيبة إلى مقر فحص الجودة لدى إطبعلي. تقوم اللجنة الفنية بمطابقة المنتج بالبروفة المعتمدة خلال <strong>3 أيام عمل</strong>.
              </p>
              <p>
                <strong>6.2. التزام إعادة التصنيع:</strong> في حال ثبوت مسؤولية المطبعة عن عيب فني جسيم غير مطابق للبروفة المعتمدة، تلتزم إطبعلي بحل من الحلين الآتيين وفقاً لما تراه مناسباً لحالة الشغل:
              </p>
              <ul className="list-disc list-inside space-y-1 pr-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>إعادة تصنيع وطباعة الجزء المعيب فقط وشحنه مجاناً للعميل في أقرب دورة تشغيل.</li>
                <li>إصدار رصيد مالي دائن (Credit Balance) بقيمة الجزء المعيب يُخصم من الطلبيات اللاحقة للعميل، أو رده عبر نفس وسيلة الدفع الأصلية.</li>
              </ul>
              <p>
                <strong>6.3. حدود المسؤولية المالية:</strong> لا تتجاوز المسؤولية المالية والقانونية لإطبعلي وشركة A.Z Agency بأي حال من الأحوال <strong>إجمالي القيمة النقدية الفعلية المسددة من العميل عن أمر الشغل محل النزاع</strong>، ولا تتحمل المطبعة أي تعويضات عن أي أضرار جانبية أو تفويت فرص تسويقية يدعيها العميل.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <PolicyFaqSection
            title="أسئلة شائعة حول الاسترجاع وعيوب الصناعة"
            description="كل ما تحتاج معرفته عن حقوقك وضمانات التشغيل وكيفية حماية استثمارك في الطباعة والتغليف."
            items={refundFaqs}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <LegalSidebar navItems={navItems} />
        </div>
      </div>
    </div>
  );
}
