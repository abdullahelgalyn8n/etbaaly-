"use client";

import React from "react";
import { FileText, X, ShieldCheck, Printer } from "lucide-react";

interface InvoiceModalProps {
  order: any | null;
  onClose: () => void;
  user: any;
}

export default function InvoiceModal({ order, onClose, user }: InvoiceModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/[0.1] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto space-y-4 sm:space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-5 h-5 text-[#c93b41] shrink-0" />
            <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate sm:whitespace-normal">
              معاينة الفاتورة الضريبية الإلكترونية المعتمدة
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#16171b] shrink-0 transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="border border-slate-200 dark:border-white/[0.1] rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6 bg-slate-50 dark:bg-[#16171b]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 pb-3 sm:pb-0 border-b sm:border-b-0 border-slate-200/80 dark:border-white/[0.06]">
            <div>
              <h4 className="text-lg sm:text-xl font-black text-[#c93b41]">إطبعلي | Etbaaly</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                الشركة المصرية الحديثة لحلول الطباعة والتغليف
              </p>
              <p className="text-[10px] sm:text-[11px] text-slate-500">سجل تجاري: 49201 | ملف ضريبي: 612-884-210</p>
            </div>
            <div className="flex sm:flex-col justify-between items-end sm:items-start text-left font-mono text-xs bg-white/70 dark:bg-white/[0.03] sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-slate-200/60 dark:border-white/[0.06]">
              <div>
                <span className="text-[10px] text-slate-400 block sm:hidden font-sans">كود الفاتورة:</span>
                <div className="font-bold text-slate-900 dark:text-white">
                  INV-{order.tracking_code}
                </div>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-[10px] text-slate-400 block sm:hidden font-sans">تاريخ الإصدار:</span>
                <div className="text-slate-500 text-[11px]">
                  {new Date(order.created_at || Date.now()).toLocaleDateString("ar-EG")}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
            <div className="bg-white/60 dark:bg-white/[0.02] sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-slate-200/60 dark:border-white/[0.06]">
              <span className="text-slate-500 block text-[11px]">العميل / المنشأة:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {user?.company_name || order.customer_name}
              </span>
              <div className="text-slate-500 text-[11px] mt-0.5">
                الملف الضريبي: {user?.tax_number || "748-291-832"}
              </div>
            </div>
            <div className="text-right sm:text-left bg-white/60 dark:bg-white/[0.02] sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-slate-200/60 dark:border-white/[0.06]">
              <span className="text-slate-500 block text-[11px]">العنوان ورقم الهاتف:</span>
              <span className="font-bold text-slate-900 dark:text-white">{order.shipping_city}</span>
              <div className="text-slate-500 text-[11px] mt-0.5 font-mono">{order.customer_phone}</div>
            </div>
          </div>

          {/* Desktop Items Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/[0.08] text-slate-500">
                  <th className="pb-2">البند</th>
                  <th className="pb-2">الكمية</th>
                  <th className="pb-2">سعر الوحدة</th>
                  <th className="pb-2 text-left">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-white/[0.05]">
                <tr>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">
                    {order.product_name}
                  </td>
                  <td className="py-3 font-mono">{Number(order.quantity).toLocaleString()}</td>
                  <td className="py-3 font-mono">
                    {(Number(order.total_price) / Number(order.quantity)).toFixed(2)} ج.م
                  </td>
                  <td className="py-3 font-mono font-bold text-left">
                    {Number(order.total_price).toLocaleString()} ج.م
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Items Card View */}
          <div className="block sm:hidden bg-white dark:bg-[#141518] border border-slate-200/80 dark:border-white/[0.08] rounded-xl p-3 space-y-2.5">
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
              {order.product_name}
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.06] text-center text-xs">
              <div className="bg-slate-50 dark:bg-white/[0.03] p-1.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block mb-0.5">الكمية</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {Number(order.quantity).toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.03] p-1.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block mb-0.5">سعر الوحدة</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {(Number(order.total_price) / Number(order.quantity)).toFixed(2)}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.03] p-1.5 rounded-lg">
                <span className="text-[10px] text-slate-400 block mb-0.5">الإجمالي</span>
                <span className="font-mono font-bold text-[#c93b41]">
                  {Number(order.total_price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex justify-end">
            <div className="w-full sm:w-60 space-y-1.5 text-xs bg-white/60 dark:bg-white/[0.02] sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-slate-200/60 dark:border-white/[0.06]">
              <div className="flex justify-between text-slate-500">
                <span>المجموع الفرعي:</span>
                <span className="font-mono">
                  {(Number(order.total_price) / 1.14).toFixed(2)} ج.م
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>ضريبة القيمة المضافة (14%):</span>
                <span className="font-mono">
                  {(Number(order.total_price) - Number(order.total_price) / 1.14).toFixed(2)} ج.م
                </span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/[0.08]">
                <span>صافي الفاتورة الإجمالي:</span>
                <span className="font-mono text-[#c93b41] text-sm font-black">
                  {Number(order.total_price).toLocaleString()} ج.م
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center sm:justify-start gap-1">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>فاتورة ضريبية رسمية مطابقة للمواصفات</span>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex-1 sm:flex-initial justify-center px-4 py-2.5 rounded-xl btn-crimson text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md active:scale-98 transition-transform"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة أو حفظ PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#141518] dark:hover:bg-[#1a1c22] text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
