import React from "react";
import { AlertTriangle, ShieldAlert, CheckCircle2, Info } from "lucide-react";

interface StrictClauseAlertProps {
  type?: "danger" | "warning" | "info" | "success";
  title: string;
  description: string | React.ReactNode;
  points?: string[];
  referenceLaw?: string;
}

export default function StrictClauseAlert({
  type = "warning",
  title,
  description,
  points,
  referenceLaw,
}: StrictClauseAlertProps) {
  const configs = {
    danger: {
      container:
        "bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/50 text-rose-950 dark:text-rose-200",
      iconBg: "bg-rose-100 dark:bg-rose-900/40 text-[#c93b41]",
      icon: ShieldAlert,
      badge: "بند قطعي غير قابل للنقاش",
      badgeColor: "bg-rose-200/60 dark:bg-rose-900/60 text-[#c93b41] dark:text-rose-300",
      bulletColor: "bg-[#c93b41]",
    },
    warning: {
      container:
        "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/50 text-amber-950 dark:text-amber-200",
      iconBg: "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
      icon: AlertTriangle,
      badge: "تنبيه تشغيلي حاسم",
      badgeColor: "bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300",
      bulletColor: "bg-amber-500",
    },
    info: {
      container:
        "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-900/50 text-blue-950 dark:text-blue-200",
      iconBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
      icon: Info,
      badge: "إسناد قانوني مصري",
      badgeColor: "bg-blue-200/60 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300",
      bulletColor: "bg-blue-500",
    },
    success: {
      container:
        "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-200",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
      icon: CheckCircle2,
      badge: "التزام وضمان إطبعلي",
      badgeColor: "bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300",
      bulletColor: "bg-emerald-500",
    },
  };

  const current = configs[type];
  const Icon = current.icon;

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all my-6 relative overflow-hidden ${current.container}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${current.iconBg}`}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base sm:text-lg font-bold leading-tight">{title}</h4>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${current.badgeColor}`}
            >
              {current.badge}
            </span>
          </div>

          <div className="text-xs sm:text-sm leading-relaxed opacity-90">{description}</div>

          {points && points.length > 0 && (
            <ul className="mt-3 space-y-2 pt-2 border-t border-current/10">
              {points.map((pt, index) => (
                <li key={index} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${current.bulletColor}`}
                  />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}

          {referenceLaw && (
            <div className="mt-3 pt-2 text-[11px] font-mono tracking-wide opacity-80 flex items-center gap-1.5">
              <span>⚖️ السند القانوني:</span>
              <span className="font-semibold underline underline-offset-2">{referenceLaw}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
