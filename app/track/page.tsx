import React, { Suspense } from "react";
import OrderTracker from "@/components/OrderTracker";
import { Truck, ShieldCheck, Clock } from "lucide-react";
import { TrackTimelineSkeleton, TrackDetailsSkeleton } from "@/components/Skeleton";

export const metadata = {
  title: "تتبع شحنة وأمر الطباعة مباشرة | إطبعلي - Etbaaly",
  description:
    "تتبع مباشر لحالة أمر شغل الطباعة ومراحل الإنتاج (فحص الملفات، الطباعة الأوفست، التشطيب، والشحن) لجميع محافظات مصر.",
};

export default function TrackPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-crimson text-xs font-bold">
          <Truck className="w-4 h-4 text-[#c93b41]" />
          نظام التتبع الحي لمطابع إطبعلي (Live Order Tracker)
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          تتبع طلبك وخط الإنتاج <span className="text-[#c93b41]">لحظة بلحظة</span>
        </h1>
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          نظام تتبع ذكي يتيح لك متابعة مراحل إنتاج وتجهيز مطبوعاتك، مع الحفاظ الكامل على خصوصية وسرية بيانات الطلبات.
        </p>
      </div>

      {/* Tracker Component with Suspense */}
      <Suspense
        fallback={
          <div className="w-full max-w-5xl mx-auto space-y-6">
            <TrackTimelineSkeleton />
            <TrackDetailsSkeleton />
          </div>
        }
      >
        <OrderTracker />
      </Suspense>

      {/* Why Our Tracking & Delivery Quality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center space-y-2.5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">التزام صارم بالمواعيد</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            خطوط إنتاج أوفست وديجيتال تعمل 24 ساعة لضمان خروج شحنتك في الموعد المحدد دون تأخير.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center space-y-2.5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">حماية وخصوصية تامة 100%</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            بيانات طلباتك وعناوين شحناتك ومواصفات الإنتاج مشفرة ومحمية ولا تظهر إلا للمصرح لهم.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] text-center space-y-2.5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-[#c93b41] flex items-center justify-center mx-auto">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">شحن وتوصيل مصفح</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            أسطول شحن وتوصيل مخصص يغطي القاهرة وكافة المحافظات مع تغليف واقي مقاوم للرطوبة.
          </p>
        </div>
      </div>
    </div>
  );
}
