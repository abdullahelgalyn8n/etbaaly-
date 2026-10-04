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
  FileCheck2,
  FileSpreadsheet,
  Copyright,
  CreditCard,
  Truck,
  Scale,
  Building,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "الشروط والأحكام وعقد خدمات الطباعة والتصنيع | إطبعلي - Etbaaly",
  description:
    "الشروط والأحكام القانونية الملزمة لخدمات الطباعة الرقمية والأوفست وتصنيع العلب والتغليف من إطبعلي. توضح مسؤولية اعتماد البروفات، ملكية التصاميم، شروط السداد، وتخزين البضائع وفقاً للقوانين المصرية.",
  alternates: {
    canonical: `${siteConfig.url}/terms/`,
  },
  openGraph: {
    title: "الشروط والأحكام وعقد خدمات الطباعة والتصنيع | إطبعلي - Etbaaly",
    description:
      "الشروط والأحكام القانونية الملزمة لخدمات الطباعة والتصنيع بمصر: اعتماد البروفات، حقوق الملكية، شروط السداد، وتخزين البضائع.",
    url: `${siteConfig.url}/terms/`,
    type: "website",
  },
};

const termsFaqs: PolicyFaqItem[] = [
  {
    q: "هل يمكن تعديل التصميم أو إلغاء الطلب بعد اعتماده على الموقع أو الواتساب؟",
    a: "بمجرد اعتمادك للبروفة الرقمية وتأكيد أمر الإنتاج، ينتقل الطلب آلياً إلى قسم المونتاج وتجهيز الزنكات وتقطيع الخامات الورقية، وبالتالي لا يمكن بأي حال إجراء أي تعديل على التصميم أو المقاس أو إلغاء الطلب، ويتحمل العميل التكلفة الإجمالية كاملة.",
    tag: "اعتماد البروفة",
  },
  {
    q: "ماذا لو وجدت خطأ في رقم هاتف أو حرف إملائي في المطبوعات بعد استلامها؟",
    a: "اعتماد العميل للبروفة الفنية (Proof Approval) هو إقرار قانوني قاطع ومطلق بصحة وسلامة كافة النصوص والأرقام والبيانات الإملائية. لا تتحمل منصة إطبعلي أي مسؤولية عن الأخطاء المطبعية التي تم اعتمادها مسبقاً، وإعادة الطباعة تتم كطلب جديد تماماً على نفقة العميل.",
    tag: "الأخطاء الإملائية",
  },
  {
    q: "لماذا تشترط المنصة سداد عربون مسبق ولا توفر خيار الدفع عند الاستلام للطباعة المخصصة؟",
    a: "نظراً لأن منتجات الطباعة والتغليف هي منتجات مصنعة خصيصاً وتحمل هوية وبيانات العميل الشخصية أو التجارية، فإنه يستحيل إعادة بيعها لأي طرف آخر وفقاً للمادة 17 من قانون حماية المستهلك المصري. لذا يُلزم سداد عربون لا يقل عن 50% أو 100% للطلبات الرقمية الفورية قبل بدء التشغيل.",
    tag: "السداد والعربون",
  },
  {
    q: "ما هي المهلة المسموحة لاستلام بضاعتي من مخازن المطبعة قبل تطبيق رسوم التخزين؟",
    a: "يُمنح العميل مهلة مجانية مدتها 14 يوماً تقويمياً من تاريخ إخطاره بجاهزية الشحنة. بعد ذلك تُفرض رسوم أرضيات وتخزين يومية. وفي حال مرور 30 يوماً دون استلام، يحق للمطبعة التصرف في البضاعة المهملة أو إعدامها دون سقوط حقها في المطالبة بالمستحقات المالية المتبقية.",
    tag: "رسوم التخزين والأرضيات",
  },
  {
    q: "هل تقبلون طباعة تصاميم تحتوي على علامات تجارية عالمية أو أدوية بدون أوراق رسمية؟",
    a: "نرفض رفضاً قاطعاً طباعة أي علامات تجارية محمية محلياً أو دولياً، أو مستحضرات تجميل/أدوية غير مسجلة بهيئة الدواء المصرية، أو أي أختام ومستندات رسمية دون توكيل أو تفويض رسمي موثق. يتحمل العميل بمفرده كافة المسؤوليات الجنائية والمدنية تجاه أي انتهاك.",
    tag: "الملكية الفكرية",
  },
];

export default function TermsPage() {
  const navItems = [
    { id: "section-preamble", title: "المادة 1: الإطار القانوني والتعاقدي" },
    { id: "section-proofing", title: "المادة 2: اعتماد البروفة الفنية والأخطاء" },
    { id: "section-ip", title: "المادة 3: حقوق الملكية الفكرية والمحظورات" },
    { id: "section-payment", title: "المادة 4: نظام السداد، العربون، والضرائب" },
    { id: "section-shipping", title: "المادة 5: الشحن، الاستلام، ورسوم التخزين" },
    { id: "section-tolerance", title: "المادة 6: التفاوت الصناعي ونسب الهالك" },
    { id: "section-jurisdiction", title: "المادة 7: القانون الواجب والاختصاص القضائي" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "المركز القانوني", url: `${siteConfig.url}/policy/` },
          { name: "الشروط والأحكام", url: `${siteConfig.url}/terms/` },
        ]}
      />
      <FAQSchema
        items={termsFaqs.map((faq) => ({
          question: faq.q,
          answer: faq.a,
        }))}
      />

      {/* Header */}
      <PolicyHeader
        title="الشروط والأحكام وعقد خدمات الطباعة والتصنيع"
        badge="عقد خدمات ملزم - جمهورية مصر العربية"
        description="تنظم هذه الوثيقة العلاقة القانونية والتشغيلية والتجارية بين منصة 'إطبعلي' (التابعة لـ A.Z Agency) وبين العملاء والشركات في مصر. يُعد إتمام الطلب أو سداد العربون أو اعتماد البروفات إقراراً صريحاً ومطلقاً بالموافقة على كافة البنود الواردة أدناه."
        lastUpdated="أكتوبر 2026"
        readTime="8 دقائق"
      />

      {/* Tabs Navigation */}
      <PolicyTabsNav />

      {/* Main Grid: Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Articles Content (Col 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Top Quick Notice Alert */}
          <StrictClauseAlert
            type="danger"
            title="تنبيه قانوني قاطع لجميع العملاء"
            description="جميع خدمات الطباعة والتغليف والتصنيع المقدمة عبر منصة إطبعلي هي أعمال تصنيع مخصصة حسب الطلب (Custom Manufacturing). لا تخضع المنتجات لسياسات الشراء الاستهلاكي النمطي، وتطبق أحكام المادة 17 من قانون حماية المستهلك المصري بشأن البضائع المصنعة وفق مواصفات شخصية."
            points={[
              "اعتماد البروفة هو مسؤولية العميل بنسبة 100% ولا رجعة فيه بعد بدء الإنتاج.",
              "لا يُسمح بإلغاء الطلب أو استرداد العربون بعد دخول مرحلة التجهيز الفني والزنكات.",
              "فحص الشحنة وتوثيقها بفيديو فتح الطرد (Unboxing) شرط إلزامي لقبول أي اعتراض خلال 48 ساعة فقط.",
            ]}
            referenceLaw="قانون حماية المستهلك المصري رقم 181 لسنة 2018 ولائحته التنفيذية"
          />

          {/* Article 1 */}
          <section
            id="section-preamble"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                المادة الأولى: الإطار القانوني ونطاق التعاقد
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>1.1. الأطراف:</strong> ينعقد هذا العقد بين منصة <strong>إطبعلي (Etbaaly)</strong>، وهي العلامة التجارية والمنصة الصناعية التابعة لـ <strong>A.Z Agency</strong> للحلول الرقمية والتسويقية المسجلة رسمياً بجمهورية مصر العربية، وبين أي شخص طبيعي أو اعتباري (شركة، مؤسسة، متجر إلكتروني) يُشار إليه لاحقاً بـ <strong>&quot;العميل&quot;</strong>.
              </p>
              <p>
                <strong>1.2. سريان العقد:</strong> تسري هذه الشروط والأحكام تلقائياً وتكتسب القوة الإلزامية الكاملة بمجرد قيام العميل بأي من الإجراءات الآتية:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pr-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>تسجيل طلب عبر المنصة الإلكترونية أو استخدام أداة التهيئة والمقايسات (Configurator).</li>
                <li>سداد أي دفعة مالية أو عربون نقدي أو تحويل بنكي لصالح المنصة.</li>
                <li>إرسال موافقة كتابية أو رقمية على عرض الأسعار أو البروفة الفنية عبر البريد الإلكتروني أو تطبيق الواتساب المعتمد.</li>
              </ul>
            </div>
          </section>

          {/* Article 2 */}
          <section
            id="section-proofing"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الثانية: اعتماد البروفة الفنية ومسؤولية الأخطاء (Proof Approval)</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                تُعد هذه المادة الركيزة الجوهرية لكافة معاملات الطباعة والتصنيع، وتقضي بما يلي:
              </p>
              <p>
                <strong>2.1. إقرار الاعتماد النهائي:</strong> قبل إرسال أمر الشغل إلى ماكينات الطباعة الأوفست أو الديجيتال، ترسل المنصة للعميل &quot;بروفة رقمية معتمدة&quot; (Digital Proof / Mockup) أو يُعرض نموذج الفحص عبر المنصة. يُعد رد العميل بكلمات مثل (معتمد، تمام، اطبع، توكل على الله، موافق) عبر الواتساب أو البريد أو الضغط على زر الاعتماد، <strong>إقراراً قانونياً باتاً ونهائياً لا رجعة فيه</strong> بصحة التصميم، الأبعاد، خطوط القطع والريجة (Die-cut lines)، ونوع الورق أو الخامات المختارة.
              </p>
              <p>
                <strong>2.2. المسؤولية الحصرية عن الأخطاء الإملائية والبيانات:</strong> يتحمل العميل بمفرده المسؤولية الكاملة عن أي خطأ إملائي، لغوي، خطأ في كتابة أرقام الهواتف، العناوين، الرموز الشريطية (Barcodes & QR Codes)، حسابات السوشيال ميديا، أو السجلات التجارية والبطاقات الضريبية. تخلي منصة إطبعلي مسؤوليتها القانونية والمالية بنسبة 100% عن أي خطأ ورد في التصميم المعتمد من قبل العميل، وتتم أي إعادة طباعة كأمر شغل مستقل وبقيمة كاملة على نفقة العميل.
              </p>
              <p>
                <strong>2.3. دقة الصور والملفات:</strong> يجب على العميل تزويد المنصة بملفات ذات جودة طباعية عالية (لا تقل عن 300 DPI بصيغ PDF أو AI أو TIFF أو PSD) مع تحويل كافة الخطوط إلى منحنيات (Create Outlines). لا تتحمل المطبعة مسؤولية أي تشويش (Pixelation) أو بكسلة ناتجة عن صور منخفضة الجودة مرسلة من العميل أو مأخوذة من لقطات شاشة الهاتف.
              </p>
            </div>

            <StrictClauseAlert
              type="warning"
              title="قاعدة البروفة المعيارية"
              description="راجع تصميمك كلمة كلمة ورقم رقم قبل إرسال كلمة 'معتمد'. ماكينات الأوفست تقوم بسحب آلاف النسخ في دقائق معدودة، وفور بدء الدوران يستحيل سحب الورق أو تصحيح الأخطاء."
            />
          </section>

          {/* Article 3 */}
          <section
            id="section-ip"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Copyright className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الثالثة: حقوق الملكية الفكرية، التراخيص، والمطبوعات المحظورة</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>3.1. إقرار الملكية والتفويض:</strong> يقر العميل ويتعهد بأنه المالك القانوني الحصري لكافة العلامات التجارية، الشعارات، الصور، والرسوم المقدمة للطباعة، أو أنه مفوض تفويضاً رسمياً وموثقاً من صاحب الحق باستخدامها وإعادة إنتاجها.
              </p>
              <p>
                <strong>3.2. حظر التزوير والمطبوعات المقيدة:</strong> يحظر حظراً تاماً طلب طباعة أي من المواد الآتية:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pr-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>أي أختام أو مستندات أو شهادات أو أوراق رسمية تابعة للجهات الحكومية المصرية أو الأجنبية.</li>
                <li>علامات تجارية عالمية أو محلية مشهورة بغرض التقليد أو التدليس التجاري (Counterfeiting).</li>
                <li>عبوات مستحضرات تجميل، مكملات غذائية، أو مستحضرات صيدلية وأدوية بدون تقديم تراخيص هيئة الدواء المصرية ووزارة الصحة والسجل التجاري المطابق للنشاط.</li>
                <li>مطبوعات خادشة للحياء، تحض على العنف أو الكراهية، أو تخالف النظام العام والآداب العامة في مصر.</li>
              </ul>
              <p>
                <strong>3.3. التعويض القانوني:</strong> يلتزم العميل بتعويض منصة إطبعلي وشركة A.Z Agency تعويضاً كاملاً عن أي أضرار مادية أو أدبية أو غرامات أو مطالبات قضائية قد تنشأ نتيجة انتهاكه لحقوق الملكية الفكرية لأي طرف ثالث، وتعتبر مسؤوليته مسؤولية شخصية جنائية ومدنية حصرية.
              </p>
            </div>
          </section>

          {/* Article 4 */}
          <section
            id="section-payment"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الرابعة: نظام السداد، العربون، والفواتير الضريبية</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>4.1. الدفعة المقدمة (العربون):</strong> لا يبدأ تشغيل أي أمر إنتاج أو حجز خامات ورقية ومستلزمات تشغيل إلا بعد سداد دفعة مقدمة لا تقل عن <strong>50% من إجمالي قيمة أمر التوريد</strong> للطلبات التجارية والتصنيعية، أو <strong>100%</strong> للطلبات الرقمية الفورية والسريعة والكميات المحدودة.
              </p>
              <p>
                <strong>4.2. تأكيد استلام المدفوعات:</strong> في حال السداد عبر التحويلات البنكية أو شبكة المدفوعات اللحظية (InstaPay) أو محافظ المحمول الذكية، لا يُعتد بأمر الشغل ولا يبدأ احتساب زمن التسليم إلا بعد <strong>التحقق الفعلي من قيد المبلغ في الحساب البنكي الرسمي للمنصة</strong>. لقطات الشاشة (Screenshots) أو إشعارات الإرسال لا تعد بديلاً عن الإيداع الفعلي المؤكد.
              </p>
              <p>
                <strong>4.3. سداد المتبقي:</strong> يُسدد باقي المبلغ المستحق بالكامل فور إخطار العميل بجاهزية الطلب وقبل خروج الشحنة للشحن، أو بمقر المصنع في حال الاستلام الذاتي. لا يجوز للعميل الامتناع عن سداد المتبقي لمندوب الشحن أو احتجاز المندوب أو فتح الطرد قبل السداد.
              </p>
              <p>
                <strong>4.4. الفواتير وضريبة القيمة المضافة (VAT):</strong> جميع الأسعار المعروضة على المنصة قد تكون صافية أو خاضعة لضريبة القيمة المضافة بنسبة 14% وفقاً لقانون الضريبة المصري رقم 67 لسنة 2016. تصدر الفواتير الإلكترونية المعتمدة للشركات ذات السجل التجاري والبطاقة الضريبية السارية عبر منظومة الفاتورة الإلكترونية لمصلحة الضرائب المصرية.
              </p>
            </div>
          </section>

          {/* Article 5 */}
          <section
            id="section-shipping"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الخامسة: إجراءات الشحن، الاستلام، ورسوم التخزين والأرضيات</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>5.1. دقة بيانات التوصيل:</strong> يلتزم العميل بتزويد المنصة بعنوان تفصيلي واضح ورقمين هاتف يعملان باستمرار لمندوب التوصيل. في حال تعذر تسليم الشحنة لعدم رد العميل، أو إغلاق هاتفه، أو تقديم عنوان غير دقيق، يتحمل العميل تكلفة الشحن كاملة بالإضافة إلى تكلفة إعادة الشحن للمرة الثانية.
              </p>
              <p>
                <strong>5.2. مهلة الاستلام من المخازن:</strong> في حال اختيار العميل الاستلام من مقر مصانعنا أو مخازننا، يُمنح مهلة مجانية أقصاها <strong>14 يوماً تقويمياً</strong> من تاريخ الإخطار بجاهزية البضاعة.
              </p>
              <p>
                <strong>5.3. رسوم الأرضيات ومصادرة البضائع المهملة:</strong> بعد انقضاء مهلة الـ 14 يوماً دون استلام، تُحتسب رسوم تخزين وأرضيات يومية بواقع <strong>50 جنيهاً مصرياً لكل كرتونة/طرد يومياً</strong>. وفي حال مرور <strong>30 يوماً تقويمياً</strong> دون استلام ودون تسوية الحساب، يحق للمطبعة التصرف في البضاعة بالبيع كخامات أو إعدامها لتعويض أضرار وتكاليف التخزين، ولا يسقط حق المنصة في المطالبة بأي مديونيات متبقية في ذمة العميل بكافة الطرق القانونية.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section
            id="section-tolerance"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#c93b41]" />
                <span>المادة السادسة: التفاوت الصناعي ونسب الهالك المقبولة (Tolerances)</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                وفقاً للأعراف الصناعية الدولية والمعايير المتبعة بغرفة صناعات الطباعة والتغليف المصرية:
              </p>
              <p>
                <strong>6.1. تفاوت الكميات (Quantity Tolerance):</strong> تخضع كافة طلبيات التغليف والعلب الكرتون والأوفست لنسبة هالك وضبط ماكينات (Make-Ready Waste) تتراوح بين <strong>±5% إلى ±7%</strong> بالزيادة أو النقصان عن إجمالي الكمية المتعاقد عليها. وتتم المحاسبة على الكمية الفعلية المفرزة والمسلّمة، ولا يحق للعميل رفض الشحنة لعجز طفيف ضمن هذا النطاق المعتمد هندسياً.
              </p>
              <p>
                <strong>6.2. تفاوت الألوان والورق:</strong> تختلف درجات تشرب الورق للأحبار بحسب نوع الورق (كوشيه، دوبلكس، كرافت، فبريانو) ونوع السلوفان (لامع، مطفي، سوفت تاتش). يُعد تفاوت درجة اللون في حدود <strong>5% إلى 10%</strong> عن شاشات العرض الرقمية أمراً هندسياً طبيعياً لا يمثل عيباً صناعياً على الإطلاق.
              </p>
            </div>
          </section>

          {/* Article 7 */}
          <section
            id="section-jurisdiction"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#c93b41]" />
                <span>المادة السابعة: القانون الواجب التطبيق والاختصاص القضائي</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>7.1. القانون الواجب:</strong> تخضع هذه الشروط والأحكام وجميع العلاقات الناشئة عنها وتفسر حصرياً وفقاً للقوانين واللوائح السارية في <strong>جمهورية مصر العربية</strong>.
              </p>
              <p>
                <strong>7.2. الاختصاص القضائي:</strong> في حال نشوء أي نزاع تعاقدي أو قانوني يتعذر حله ودياً بين الطرفين خلال ثلاثين يوماً، ينعقد الاختصاص القضائي الحصري والنهائي لـ <strong>محاكم القاهرة الاقتصادية</strong>، أو المحاكم المختصة الكائن بدائرتها المقر الرئيسي لـ A.Z Agency بمحافظة القاهرة.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <PolicyFaqSection
            title="أسئلة شائعة حول الشروط والأحكام وعقود التوريد"
            description="إيضاحات سريعة ومباشرة لأهم التساؤلات التعاقدية لضمان حقوق كافة الأطراف."
            items={termsFaqs}
          />
        </div>

        {/* Sidebar (Col 4) */}
        <div className="lg:col-span-4">
          <LegalSidebar navItems={navItems} />
        </div>
      </div>
    </div>
  );
}
