"use client";

import React from "react";
import Link from "next/link";
import { Layers, Eye, Trash2, RefreshCw, Edit3, Image as ImageIcon } from "lucide-react";

interface ProductsTableProps {
  loading: boolean;
  filteredProducts: any[];
  onSelectDeleteTarget: (product: any) => void;
}

export function ProductsTable({
  loading,
  filteredProducts,
  onSelectDeleteTarget,
}: ProductsTableProps) {
  return (
    <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-6 shadow-sm overflow-x-auto">
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-500 font-bold space-y-2">
          <RefreshCw className="w-6 h-6 text-[#c93b41] animate-spin mx-auto" />
          <div>جاري تحميل منتجات وقوالب المعرض...</div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 text-center text-slate-500 dark:text-slate-400 space-y-3">
          <Layers className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
          <div className="font-bold text-sm">لا توجد منتجات مطابقة للبحث أو الفلتر</div>
          <p className="text-xs">جرب تغيير كلمات البحث أو إضافة منتج جديد.</p>
        </div>
      ) : (
        <table className="w-full text-right text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.06] text-slate-400 font-bold">
              <th className="pb-3 pr-2">المنتج والتصنيف</th>
              <th className="pb-3">السعر الأساسي</th>
              <th className="pb-3">الألوان المتاحة</th>
              <th className="pb-3">الصور والزوايا</th>
              <th className="pb-3">الحالة</th>
              <th className="pb-3 text-left pl-2">إجراءات التحكم</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1f2126] transition-colors">
                <td className="py-4 pr-2 font-bold text-slate-900 dark:text-white">
                  <div className="text-sm font-bold flex items-center gap-2">
                    <span>{p.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                    {p.category} • {p.printAreaLabel || "مساحة الطباعة المخصصة"}
                  </span>
                </td>
                <td className="py-4 font-mono font-black text-[#c93b41] text-sm">
                  {p.basePrice} ج.م
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5">
                    {p.colors?.slice(0, 5).map((c: any, idx: number) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-slate-300 dark:border-white/20 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <span className="text-[11px] text-slate-500 font-bold mr-1">
                      ({p.colors?.length || 0} ألوان)
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-slate-100 dark:bg-[#18191d] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 flex items-center gap-1 w-fit">
                    <ImageIcon className="w-3 h-3 text-[#c93b41]" />
                    <span>
                      {p.colors?.[0]?.images?.length || (p.image ? 1 : 1)} صور
                    </span>
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      p.status === "published"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}
                  >
                    {p.status === "published" ? "منشور بالمتجر ✓" : "مسودة"}
                  </span>
                </td>
                <td className="py-4 text-left pl-2">
                  <div className="flex items-center justify-end gap-2">
                    {/* Edit Product Button */}
                    <Link
                      href={`/admin/products/configurator/?productId=${p.id}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      title="تعديل بيانات وصور وألوان المنتج في الاستوديو"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#c93b41]" />
                      <span>تعديل المنتج</span>
                    </Link>

                    {/* View Product Page */}
                    <Link
                      href={`/products/${p.slug || p.id}/`}
                      target="_blank"
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1f2126] dark:hover:bg-[#282a30] text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-white/[0.08] flex items-center gap-1.5 transition-all"
                      title="معاينة صفحة المنتج للعميل"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-500" />
                      <span>صفحة المنتج</span>
                    </Link>

                    {/* Delete Product Button */}
                    <button
                      type="button"
                      onClick={() => onSelectDeleteTarget(p)}
                      className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 text-[#c93b41] dark:text-red-400 border border-red-200 dark:border-red-900/40 transition-colors cursor-pointer"
                      title="حذف هذا المنتج نهائياً من قاعدة البيانات"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
