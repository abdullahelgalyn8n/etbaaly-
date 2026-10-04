"use client";

import React from "react";
import { Users } from "lucide-react";

export const defaultMockClients = [
  {
    id: "usr-demo-01",
    company: "شركة النور للحلول المتكاملة",
    name: "م. أحمد عبد الرحمن",
    taxNumber: "748-291-832",
    phone: "01012345678",
    ordersCount: 4,
    totalSpend: 48500,
  },
  {
    id: "usr-demo-02",
    company: "مجموعة الأندلس للتوزيع",
    name: "أ. محمود شاكر",
    taxNumber: "892-104-553",
    phone: "01122334455",
    ordersCount: 7,
    totalSpend: 92300,
  },
  {
    id: "usr-demo-03",
    company: "براند عطور لاروزا",
    name: "سارة فؤاد",
    taxNumber: "650-322-108",
    phone: "01233445566",
    ordersCount: 2,
    totalSpend: 28400,
  },
];

interface AdminClientsTableProps {
  onBack: () => void;
}

export default function AdminClientsTable({ onBack }: AdminClientsTableProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] p-6 shadow-xs space-y-4 rounded-3xl animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06]">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-[#c93b41]" />
          دليل العملاء والشركات المسجلة (B2B Directory)
        </h3>
        <button
          onClick={onBack}
          className="text-xs text-[#c93b41] hover:underline font-bold cursor-pointer"
        >
          العودة للوحة التحكم الرئيسية ↩
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.06] text-slate-500 font-bold">
              <th className="pb-3 pr-2">اسم الشركة</th>
              <th className="pb-3">المسؤول المفوض</th>
              <th className="pb-3">الرقم الضريبي</th>
              <th className="pb-3">رقم الهاتف</th>
              <th className="pb-3">الطلبات</th>
              <th className="pb-3 text-left pl-2">إجمالي المشتريات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {defaultMockClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-slate-50 dark:hover:bg-[#1a1c20] transition-colors"
              >
                <td className="py-3.5 pr-2 font-bold text-slate-900 dark:text-white">
                  {client.company}
                </td>
                <td className="py-3.5 text-slate-600 dark:text-slate-300">{client.name}</td>
                <td className="py-3.5 font-mono text-slate-500 dark:text-slate-400">
                  {client.taxNumber}
                </td>
                <td className="py-3.5 font-mono text-slate-500 dark:text-slate-400">
                  {client.phone}
                </td>
                <td className="py-3.5 font-mono font-bold text-slate-700 dark:text-slate-300">
                  {client.ordersCount} طلبات
                </td>
                <td className="py-3.5 font-mono font-black text-left pl-2 text-[#c93b41]">
                  {client.totalSpend.toLocaleString()} ج.م
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
