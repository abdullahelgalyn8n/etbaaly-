import React from "react";
import { WorkflowStep } from "@/data/servicesData";

interface ServiceWorkflowProps {
  workflowSteps: WorkflowStep[];
}

export default function ServiceWorkflow({ workflowSteps }: ServiceWorkflowProps) {
  return (
    <section className="space-y-8">
      <div>
        <span className="text-xs font-bold text-[#c93b41] uppercase tracking-wider">مراحل التنفيذ</span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-1">
          كيف نعمل على مشروعك خطوة بخطوة؟
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowSteps.map((wf, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] relative group hover:border-[#c93b41]/50 transition-all shadow-sm"
          >
            <span className="text-4xl font-mono font-black text-[#c93b41]/20 group-hover:text-[#c93b41]/40 transition-colors block mb-4">
              {wf.step}
            </span>
            <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2">
              {wf.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#a8abb4] leading-relaxed font-medium">
              {wf.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
