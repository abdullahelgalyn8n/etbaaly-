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
  Shield,
  Lock,
  FileKey,
  CreditCard,
  EyeOff,
  UserCheck,
  Server,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الخصوصية وأمان البيانات وسرية التصاميم | إطبعلي - Etbaaly",
  description:
    "سياسة الخصوصية وحماية البيانات الشخصية وسرية ملفات التصاميم في إطبعلي، وفقاً لقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020. نضمن سرية تصاميمك وقوالبك وعدم مشاركتها مع أي جهة.",
  alternates: {
    canonical: `${siteConfig.url}/privacy/`,
  },
  openGraph: {
    title: "سياسة الخصوصية وأمان البيانات وسرية التصاميم | إطبعلي",
    description:
      "التزامنا بحماية بياناتك الشخصية وسرية ملفات الهوية البصرية وفقاً للقانون المصري رقم 151 لسنة 2020.",
    url: `${siteConfig.url}/privacy/`,
    type: "website",
  },
};

const privacyFaqs: PolicyFaqItem[] = [
  {
    q: "هل يمكن أن تستخدم المطبعة تصميمي أو قالبي (الداي كت) لعميل آخر أو لمتجر منافس؟",
    a: "نلتزم التزاماً قانونياً صارماً بعدم إعادة استخدام، بيع، مشاركة، أو ترخيص أي ملف تصميم، شعار، أو قالب تكسير (Die-cut Knife) خاص بك لأي طرف ثالث أو شركة منافسة تحت أي ظرف. تظل جميع حقوق الملكية الفكرية لتصاميمك ملكاً حصرياً لك.",
    tag: "سرية التصاميم",
  },
  {
    q: "كيف تتم معالجة بيانات بطاقتي البنكية ومعاملات الدفع الإلكتروني؟",
    a: "تتم جميع المعاملات المالية المشفرة عبر بوابات دفع سحابية معتمدة ومرخصة رسمياً من البنك المركزي المصري (CBE) وتلتزم بأعلى معايير الأمان الدولية PCI-DSS. لا نقوم بالاطلاع على أرقام بطاقتك البنكية الكاملة أو رمز CVV السري أو تخزينها على خوادمنا نهائياً.",
    tag: "أمان المدفوعات",
  },
  {
    q: "هل تحتفظ المنصة بملفات التصميم للطلبات المستقبلية؟",
    a: "نحتفظ بنسخة أرشيفية مشفرة من ملفات التصميم وقوالب الشغل المعتمدة على خوادم آمنة لتسهيل إعادة طلب الطباعة السريعة بناءً على رغبتك. ويحق لك في أي وقت مراسلتنا لطلب حذف ملفاتك نهائياً من سجلاتنا بعد تسليم الطلب.",
    tag: "حفظ الملفات",
  },
  {
    q: "ما هي البيانات التي تشاركونها مع شركة الشحن والتوصيل في مصر؟",
    a: "نشارك مع شركة الشحن المعتمدة فقط البيانات الضرورية لتسليم الطرد: الاسم، رقم هاتف المستلم، وعنوان التوصيل التفصيلي. وتلتزم شركات الشحن المتعاقد معها باتفاقيات سرية وعدم إفشاء بيانات العملاء.",
    tag: "الشحن والطرف الثالث",
  },
];

export default function PrivacyPage() {
  const navItems = [
    { id: "section-commitment", title: "المادة 1: التزام الخصوصية والقانون 151 لسنة 2020" },
    { id: "section-design-nda", title: "المادة 2: سرية التصاميم والقوالب والهوية البصرية" },
    { id: "section-data-collected", title: "المادة 3: أنواع البيانات التي نقوم بجمعها" },
    { id: "section-payment-security", title: "المادة 4: أمان المعاملات المالية وبوابات الدفع" },
    { id: "section-cookies", title: "المادة 5: ملفات تعريف الارتباط والتحليلات الرقمية" },
    { id: "section-user-rights", title: "المادة 6: حقوق صاحب البيانات وإجراءات الحذف" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "المركز القانوني", url: `${siteConfig.url}/policy/` },
          { name: "سياسة الخصوصية", url: `${siteConfig.url}/privacy/` },
        ]}
      />
      <FAQSchema
        items={privacyFaqs.map((faq) => ({
          question: faq.q,
          answer: faq.a,
        }))}
      />

      {/* Header */}
      <PolicyHeader
        title="سياسة الخصوصية وأمان البيانات وسرية التصاميم"
        badge="حماية البيانات الشخصية - قانون 151 لسنة 2020"
        description="توضح هذه السياسة كيفية قيام منصة 'إطبعلي' (A.Z Agency) بجمع ومعالجة وحماية بياناتك الشخصية والتجارية، وتعهدنا المطلق بالحفاظ على سرية ملفات الهوية البصرية وقوالب التغليف الخاصة بعلامتك التجارية."
        lastUpdated="أكتوبر 2026"
        readTime="6 دقائق"
      />

      {/* Tabs Navigation */}
      <PolicyTabsNav />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Content (Col 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Top Success Alert */}
          <StrictClauseAlert
            type="success"
            title="ميثاق شرف حماية تصاميم وقوالب العملاء"
            description="نعتبر تصاميمك وقوالب علبك وأسرار علامتك التجارية أمانة مهنية وقانونية عليا. نتعهد بشكل لا لبس فيه بعدم بيع أو إفشاء أو استخدام أي تصميم تم رفعه على المنصة لصالح أي عميل آخر أو منافس في السوق المصري أو الإقليمي."
            points={[
              "تشفير كامل لكافة الملفات الطباعية (Vector & PDFs) على خوادم سحابية محمية.",
              "عدم استخدام صور منتجاتك الخاصة في الدعاية دون إذن كتابي مسبق منك.",
              "تطبيق صارم لبنود قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.",
            ]}
            referenceLaw="قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020 ولائحته التنفيذية"
          />

          {/* Article 1 */}
          <section
            id="section-commitment"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الأولى: التزام الخصوصية والامتثال للقانون المصري رقم 151 لسنة 2020</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                تلتزم منصة <strong>إطبعلي (Etbaaly)</strong>، بصفتها متحكماً ومعالجاً للبيانات، بضمان خصوصية وسرية البيانات الشخصية لكافة مستخدميها وعملائها في جمهورية مصر العربية، وفقاً لأحكام <strong>القانون رقم 151 لسنة 2020 الخاص بحماية البيانات الشخصية</strong> ولائحته التنفيذية.
              </p>
              <p>
                نطبق بروتوكولات حماية تقنية وتنظيمية متقدمة لمنع أي وصول غير مصرح به، أو إتلاف، أو تعديل، أو إفشاء غير قانوني للبيانات المخزنة لدينا.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section
            id="section-design-nda"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileKey className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الثانية: سرية التصاميم والقوالب والهوية البصرية (Design Confidentiality)</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>2.1. الحماية الحصرية للملفات:</strong> تُعامل كافة ملفات التصميم الرقمية (AI, PSD, PDF, CDR) والشعارات والنماذج ثلاثية الأبعاد المرفوعة عبر المنصة باعتبارها معلومات تجارية سرية ومحمية قانونياً بحكم اتفاقية عدم إفشاء ضمنية (NDA).
              </p>
              <p>
                <strong>2.2. حظر استنساخ القوالب:</strong> تلتزم المنصة بعدم استخدام سكاكين التكسير المخصصة (Custom Die-cuts) أو الفورمات الهندسية للعلب والعبوات التي تم تصميمها لحساب العميل لصالح أي طرف آخر دون موافقة كتابية صريحة.
              </p>
              <p>
                <strong>2.3. إتلاف الزنكات المؤقتة:</strong> يتم إتلاف زنكات الطباعة الأوفست المصنوعة من الألومنيوم عقب انتهاء دورة التشغيل المقررة، أو الاحتفاظ بها في مستودع آمن ومغلق للطلبيات الدورية وفق الاتفاق المبرم.
              </p>
            </div>
          </section>

          {/* Article 3 */}
          <section
            id="section-data-collected"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الثالثة: أنواع البيانات التي نقوم بجمعها والغرض منها</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                نقوم بجمع البيانات الضرورية فقط لتنفيذ الخدمة وإتمام التعاقد والشحن:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>
                  <strong>بيانات الاتصال والهوية:</strong> الاسم الكامل، أرقام الهواتف المحمولة للتنسيق، البريد الإلكتروني، واسم الشركة أو المتجر.
                </li>
                <li>
                  <strong>بيانات الشحن والتسليم الجغرافي:</strong> العنوان التفصيلي بجمهورية مصر العربية (المحافظة، الحي، الشارع، المبنى) لتسليم الطرود.
                </li>
                <li>
                  <strong>البيانات الضريبية والتجارية:</strong> رقم السجل التجاري والبطاقة الضريبية للشركات لإصدار الفواتير الإلكترونية المعتمدة لمصلحة الضرائب المصرية.
                </li>
                <li>
                  <strong>البيانات التقنية:</strong> عنوان بروتوكول الإنترنت (IP)، نوع المتصفح، ومعلومات الجلسة لتعزيز أمان الحسابات ومنع الهجمات الإلكترونية.
                </li>
              </ul>
            </div>
          </section>

          {/* Article 4 */}
          <section
            id="section-payment-security"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الرابعة: أمان المعاملات المالية وبوابات الدفع الإلكتروني</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong>4.1. عدم تخزين بيانات البطاقات:</strong> لا تقوم منصة إطبعلي بحفظ أو تخزين أي أرقام بطاقات ائتمانية (Credit/Debit Cards) أو أرقام سرية (CVV) على خوادمها الداخلية.
              </p>
              <p>
                <strong>4.2. التشفير والامتثال لمعايير البنك المركزي:</strong> تتم عمليات التحصيل والدفع عبر بوابات دفع إلكترونية مرخصة رسمياً وخاضعة لرقابة البنك المركزي المصري (CBE) ومعتمدة بشهادات التشفير العالمية PCI-DSS و SSL 256-bit.
              </p>
            </div>
          </section>

          {/* Article 5 */}
          <section
            id="section-cookies"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-[#c93b41]" />
                <span>المادة الخامسة: ملفات تعريف الارتباط والتحليلات الرقمية (Cookies)</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                تستخدم المنصة ملفات تعريف الارتباط الوظيفية والتحليلية لتحسين تجربة المستخدم، وحفظ المنتجات المضافة في سلة المشتريات، وتذكر تفضيلات المظهر (الوضع الليلي والنهاري)، ومتابعة سرعة استجابة المنصة. يحق للمستخدم تعطيل ملفات الكوكيز من إعدادات متصفحه، مع العلم بأن ذلك قد يؤثر على عمل حاسبة الأسعار وسلة التسوق.
              </p>
            </div>
          </section>

          {/* Article 6 */}
          <section
            id="section-user-rights"
            className="rounded-3xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <span className="w-8 h-8 rounded-lg bg-[#c93b41]/10 text-[#c93b41] flex items-center justify-center font-bold text-sm">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-[#c93b41]" />
                <span>المادة السادسة: حقوق صاحب البيانات وإجراءات الحذف والتعديل</span>
              </h2>
            </div>
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>
                يحق لأي عميل بموجب القانون رقم 151 لسنة 2020 ممارسة الحقوق التالية عبر مراسلة مسؤول حماية البيانات على البريد الإلكتروني (
                <a href={`mailto:${siteConfig.email}`} className="text-[#c93b41] font-mono hover:underline">
                  {siteConfig.email}
                </a>
                ):
              </p>
              <ul className="list-disc list-inside space-y-1.5 pr-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>حق الاطلاع على البيانات الشخصية المسجلة وتحديثها في أي وقت.</li>
                <li>حق الاعتراض على معالجة البيانات لأغراض الدعاية المباشرة.</li>
                <li>حق طلب محو البيانات أو سحب الموافقة، وذلك مع عدم الإخلال بالتزامات المنصة القانونية بحفظ السجلات المحاسبية والضريبية المقررة بقوانين الضرائب المصرية لمدة 5 سنوات.</li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <PolicyFaqSection
            title="أسئلة شائعة حول الخصوصية وسرية التصاميم"
            description="إجابات صريحة لضمان راحة بالك وحماية أصولك الإبداعية والرقمية."
            items={privacyFaqs}
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
