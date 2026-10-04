"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Search, X } from "lucide-react";
import { MediaAsset } from "@/lib/db/types";
import MediaPickerItem from "./MediaPickerItem";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (asset: { url: string; altText?: string; title?: string }) => void;
  title?: string;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  title = "اختيار صورة من معرض الوسائط",
}: MediaPickerModalProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [storageFilter, setStorageFilter] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const fetchAssets = async () => {
      setLoading(true);
      try {
        let url = `/api/admin/media?storageType=${storageFilter}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setAssets(data.assets || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, [isOpen, storageFilter, search]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selectedAsset) return;
    onSelect({
      url: selectedAsset.url,
      altText: selectedAsset.altText,
      title: selectedAsset.title,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#202124] border border-slate-200 dark:border-white/10 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#c93b41]" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 sm:px-5 bg-slate-50/70 dark:bg-[#18191c] border-b border-slate-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="بحث في الصور..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-3 pr-9 py-1.5 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={storageFilter}
              onChange={(e) => setStorageFilter(e.target.value)}
              className="px-3 py-1.5 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">كل الملفات</option>
              <option value="local">محلي (Local)</option>
              <option value="cloud_db">سحابي (Cloud)</option>
            </select>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-slate-100 dark:bg-white/[0.04] animate-pulse"
                />
              ))}
            </div>
          ) : assets.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold">لا توجد صور مطابقة</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {assets.map((asset) => (
                <MediaPickerItem
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAsset?.id === asset.id}
                  onSelect={setSelectedAsset}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#18191c] border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {selectedAsset ? (
              <span className="font-bold text-slate-900 dark:text-white truncate block max-w-xs">
                تم تحديد: {selectedAsset.title || selectedAsset.filename}
              </span>
            ) : (
              <span>حدد صورة للإدراج</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white dark:bg-[#242424] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
            >
              إلغاء
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedAsset}
              className="px-5 py-2 bg-[#c93b41] hover:bg-[#b03036] text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              استخدام هذه الصورة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
