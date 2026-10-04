"use client";

import React from "react";
import { AlertTriangle, Trash2, RefreshCw } from "lucide-react";

interface DeleteProductModalProps {
  deleteTarget: any | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export function DeleteProductModal({
  deleteTarget,
  isDeleting,
  onClose,
  onConfirmDelete,
}: DeleteProductModalProps) {
  if (!deleteTarget) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/[0.1] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">تأكيد حذف المنتج</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">هذا الإجراء سيقوم بإزالة المنتج نهائياً</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1b1c20] border border-slate-200/80 dark:border-white/[0.06] space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">اسم المنتج:</span>
            <span className="font-bold text-slate-900 dark:text-white">{deleteTarget.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">التصنيف:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{deleteTarget.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">السعر الأساسي:</span>
            <span className="font-mono font-bold text-[#c93b41]">{deleteTarget.basePrice} ج.م</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">معرّف المنتج (ID):</span>
            <span className="font-mono text-[10px] text-slate-400">{deleteTarget.id}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          هل أنت متأكد من رغبتك في حذف هذا المنتج من قاعدة بيانات <strong>Supabase PostgreSQL</strong> والمهيئات البصرية المرتبطة به؟ لا يمكن التراجع عن هذا الإجراء.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f2126] font-bold text-xs cursor-pointer transition-all disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={onConfirmDelete}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>جاري الحذف من القاعدة...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>تأكيد الحذف النهائي</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
