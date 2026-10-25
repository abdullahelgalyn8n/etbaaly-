import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
  CheckCircle,
  Tag,
  Layers,
  MessageCircle,
  Package,
  CheckCircle2,
  FileText,
  Truck,
  HelpCircle,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { offersData, getOfferBySlug } from "@/data/offersData";
import { servicesData } from "@/data/servicesData";
import { BreadcrumbSchema, OfferProductSchema } from "@/components/JsonLd";
import BrandedImage from "@/components/BrandedImage";

export const dynamic = "force-static";
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return offersData.map((offer) => ({
    slug: offer.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);
  if (!offer) return { title: "العرض غير موجود" };

  return {
    title: `${offer.title} | عروض إطبعلي`,
    description: offer.subtitle,
    alternates: {
      canonical: `${siteConfig.url}/offers/${offer.slug}/`,
    },
    openGraph: {
      title: `${offer.title} - إطبعلي`,
      description: offer.subtitle,
      url: `${siteConfig.url}/offers/${offer.slug}/`,
      type: "website",
      images: offer.heroImage ? [{ url: `${siteConfig.url}${offer.heroImage}` }] : undefined,
    },
  };
}

export default async function OfferDetailPage({ params }: Props) {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);

  if (!offer) {
    notFound();
  }

  // Find parent service
  const parentService = servicesData.find((s) => s.slug === offer.serviceSlug);

  // Other offers
  const otherOffers = offersData.filter((o) => o.id !== offer.id).slice(0, 3);

  const waMessage = encodeURIComponent(
    `مرحباً إطبعلي، أرغب في طلب "${offer.title}" (سعر العرض: ${offer.discountedPrice}) - رابط العرض: ${siteConfig.url}/offers/${offer.slug}/`
  );
  const waUrl = `${siteConfig.social.whatsapp}?text=${waMessage}`;

  return (
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Schemas */}
      <BreadcrumbSchema
        items={[
          { name: "الرئيسية", url: siteConfig.url },
          { name: "العروض والباقات", url: `${siteConfig.url}/offers/` },
          { name: offer.title, url: `${siteConfig.url}/offers/${offer.slug}/` },
        ]}
      />
      <OfferProductSchema
        offer={{
          title: offer.title,
          subtitle: offer.subtitle,
          discountedPrice: offer.discountedPrice,
          originalPrice: offer.originalPrice,
          heroImage: offer.heroImage,
        }}
        url={`${siteConfig.url}/offers/${offer.slug}/`}
      />

      {/* Navigation Breadcrumb / Back Link */}
      <div className="pt-4 flex items-center justify-between flex-wrap gap-2">
        <Link
          href="/offers/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-[#a8abb4] hover:text-[#c93b41] dark:hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          <span>العودة إلى جميع العروض والباقات</span>
        </Link>

        {parentService && (
          <Link
            href={`/services/${parentService.slug}/`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c93b41] hover:underline"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>عرض تفاصيل خدمة: {parentService.title.split("(")[0]}</span>
          </Link>
        )}
      </div>

      {/* Distinction Header Banner: Connecting Offer with its Parent Service */}
      <div className="rounded-2xl p-4 sm:p-5 bg-slate-50 dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center shrink-0">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              هذه باقة ترويجية جاهزة بأسعار تفضيلية تتبع مباشرة لقسم:
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              {offer.serviceName}
            </div>
          </div>
        </div>

        {parentService && (
          <Link
            href={`/services/${parentService.slug}/`}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#111215] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-slate-200 hover:text-[#c93b41] hover:border-[#c93b41]/40 transition-all flex items-center gap-1.5"
          >
            <span>استعراض الإمكانيات العامة للخدمة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Main Hero & Conversion Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Offer Details & Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#c93b41] text-white shadow-sm">
              {offer.badge}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              وفر {offer.savings}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300">
              المدة: {offer.turnaround}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white leading-tight">
            {offer.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {offer.subtitle}
          </p>

          <p className="text-sm text-slate-600 dark:text-[#a8abb4] leading-relaxed">
            {offer.summary}
          </p>

          {/* Pricing Highlight Card */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#15171b] border-2 border-[#c93b41]/30 shadow-lg space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  السعر الإجمالي للباقة بعد الخصم:
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#c93b41]">
                    {offer.discountedPrice}
                  </span>
                  <span className="text-base text-slate-400 line-through font-bold">
                    {offer.originalPrice}
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  الحد الأدنى للكمية:
                </span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {offer.minimumQuantity}
                </span>
              </div>
            </div>

            {offer.unitPrice && (
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-white/[0.08]">
                معدل التكلفة: <strong className="text-slate-900 dark:text-white">{offer.unitPrice}</strong>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl btn-crimson text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all text-center"
              >
                <MessageCircle className="w-5 h-5" />
                <span>طلب هذا العرض فوراً</span>
              </a>

              <Link
                href="/contact/"
                className="w-full py-3.5 px-6 rounded-2xl bg-white dark:bg-[#1a1c20] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all text-center"
              >
                <span>طلب تعديل كمية أو استشارة</span>
              </Link>
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-white/[0.04] text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>ضمان مطابقة 100%</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-white/[0.04] text-xs font-bold flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#c93b41] shrink-0" />
              <span>شحن وتتبع لحظي</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-white/[0.04] text-xs font-bold flex items-center gap-2 col-span-2 sm:col-span-1">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>تسليم خلال {offer.turnaround}</span>
            </div>
          </div>
        </div>

        {/* Right: Visual Artwork Showcase & Target Audience */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#15171b] border border-slate-200 dark:border-white/[0.08] shadow-2xl p-6 flex items-center justify-center">
            <BrandedImage
              src={offer.heroImage}
              alt={offer.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#181a1f] border border-slate-200 dark:border-white/[0.08] space-y-3">
            <span className="text-xs font-black text-[#c93b41] uppercase tracking-wider block">
              الفئة المستهدفة من هذا العرض
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {offer.targetAudience}
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Detailed Deliverables (What's in the Box) */}
      <section className="space-y-6 pt-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c93b41]">
            <Package className="w-4 h-4" />
            <span>محتويات الباقة بالتفصيل</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            ما الذي تحصل عليه تحديداً في هذا العرض؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offer.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 bg-white dark:bg-[#181a1f] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center font-black text-sm">
                  {idx + 1}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200">
                  {item.qty}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#a8abb4] leading-relaxed font-medium">
                {item.specs}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: The Bonus Stack (Alex Hormozi Framework) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500">
            <Sparkles className="w-4 h-4" />
            <span>مزايا وهدايا مجانية ملحقة بالعرض (The Bonus Stack)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            هدايا وخدمات إنتاجية مشمولة مجاناً مع طلبك
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offer.bonusStack.map((bonus, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 bg-amber-500/[0.04] dark:bg-amber-500/[0.08] border border-amber-500/20 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <Sparkles className="w-5 h-5 text-amber-500" />
                {bonus.valueTag && (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[11px] font-black">
                    {bonus.valueTag}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                {bonus.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {bonus.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: The Ironclad Risk-Reversal Guarantee */}
      <section className="rounded-3xl bg-slate-900 text-white dark:bg-[#121417] border border-slate-800 dark:border-white/[0.08] p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black">
            <ShieldCheck className="w-4 h-4" />
            <span>الضمان الذهبي الخالي من المخاطر (Zero-Risk Guarantee)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            {offer.guarantee.headline}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
            {offer.guarantee.details}
          </p>
        </div>
      </section>

      {/* Section 4: Specifications & Workflow Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Technical Specs Table */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#c93b41]" />
            <span>المواصفات الفنية التفصيلية</span>
          </h3>
          <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] overflow-hidden bg-white dark:bg-[#1a1c20]">
            <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {offer.specifications.map((spec, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500 dark:text-slate-400">
                    {spec.label}
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#c93b41]" />
            <span>مراحل وسير تنفيذ طلب هذا العرض</span>
          </h3>
          <div className="space-y-3">
            {[
              {
                step: "01",
                title: "اعتماد الملف والمراجعة الفنية Preflight",
                desc: "يتم فحص أبعاد النزيف، مقاسات السكينة، وتطابق ألوان CMYK وإرسال بروفة رقمية لك لاعتمادها.",
              },
              {
                step: "02",
                title: "تجهيز ألواح CTP وسكاكين الداي-كت",
                desc: "تجهيز خطوط السحب الميكانيكية وتفصيل السكينة المخصصة لقص البوكسات أو المطبوعات.",
              },
              {
                step: "03",
                title: "التشغيل والسحب الآلي والتشطيب الفاخر",
                desc: "سحب أوفست عالي النقاء، تطبيق السلوفان الحامي، البصمة الحرارية أو السبوت UV.",
              },
              {
                step: "04",
                title: "الفحص النهائي والتغليف والتسليم مع التتبع",
                desc: "فحص جودة القطع، تعبئتها بحزم آمنة، وشحنها لك مع إرسال كود التتبع اللحظي للشحنة.",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] flex items-start gap-3"
              >
                <span className="w-7 h-7 rounded-lg bg-red-500/10 text-[#c93b41] flex items-center justify-center font-black text-xs shrink-0">
                  {st.step}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {st.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed font-medium">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Offer FAQs */}
      {offer.faqs.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c93b41]">
              <HelpCircle className="w-4 h-4" />
              <span>الأسئلة المتكررة حول هذا العرض</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
              كل ما تحتاج لمعرفته قبل تأكيد طلبك
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offer.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-slate-50 dark:bg-[#181a1f] border border-slate-200 dark:border-white/[0.08] space-y-2"
              >
                <h3 className="text-xs sm:text-sm font-black text-slate-950 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Parent Service Anchor Box */}
      {parentService && (
        <section className="rounded-3xl p-8 bg-gradient-to-r from-red-50 to-slate-50 dark:from-[#201516] dark:to-[#17181c] border border-red-200 dark:border-red-950/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <span className="text-xs font-black text-[#c93b41]">
              الخدمة الهندسية الأم
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
              هل تبحث عن كميات أضخم أو مواصفات خاصة خارج الباقة؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-xl">
              يمكنك الاطلاع على صفحة خدمة <strong>{parentService.title.split("(")[0]}</strong> للتعرف على كافة الخامات والماكينات وسابقة الأعمال، أو طلب مقايسة تفصيلية.
            </p>
          </div>

          <Link
            href={`/services/${parentService.slug}/`}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shrink-0 shadow-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>انتقل لصفحة الخدمة الكاملة</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </section>
      )}

      {/* Other Offers Section */}
      {otherOffers.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
              عروض وباقات أخرى قد تهمك
            </h3>
            <Link
              href="/offers/"
              className="text-xs font-bold text-[#c93b41] hover:underline flex items-center gap-1"
            >
              <span>مشاهدة كافة العروض</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherOffers.map((o) => (
              <div
                key={o.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#1a1c20] border border-slate-200 dark:border-white/[0.08] hover:border-[#c93b41]/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 text-[#c93b41] border border-red-200/60 dark:border-red-800/40">
                    {o.badge}
                  </span>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white mt-2 leading-snug">
                    <Link href={`/offers/${o.slug}/`}>{o.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#a8abb4] line-clamp-2 mt-1 font-medium">
                    {o.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-base font-black text-[#c93b41]">
                    {o.discountedPrice}
                  </span>
                  <Link
                    href={`/offers/${o.slug}/`}
                    className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#c93b41] flex items-center gap-1"
                  >
                    <span>التفاصيل</span>
                    <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
