"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, ArrowLeft } from "lucide-react";
import NewConfiguratorGreeting from "@/components/configurator/NewConfiguratorGreeting";
import NewConfiguratorProductSelector from "@/components/configurator/NewConfiguratorProductSelector";

interface NewConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewConfiguratorModal({
  isOpen,
  onClose,
}: NewConfiguratorModalProps) {
  const [name, setName] = useState("");
  const [chosenProduct, setChosenProduct] = useState("");
  const [chosenStyle, setChosenStyle] = useState("style1");
  const [productsList, setProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // For creating a new WooCommerce product right inside the modal
  const [isCreatingNewProduct, setIsCreatingNewProduct] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductBasePrice, setNewProductBasePrice] = useState(150);
  const [newProductCategory, setNewProductCategory] = useState("علب وتغليف");

  useEffect(() => {
    if (isOpen) {
      fetch("/api/admin/products")
        .then((r) => r.json())
        .then((data) => {
          if (data.success && data.products) {
            setProductsList(data.products);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    try {
      const payload: any = {
        name: name.trim(),
        style: chosenStyle,
        productId: chosenProduct === "new" ? undefined : chosenProduct,
      };

      if (chosenProduct === "new" || isCreatingNewProduct) {
        payload.wooProductData = {
          title: newProductTitle.trim() || name.trim(),
          basePrice: Number(newProductBasePrice) || 100,
          category: newProductCategory,
        };
      }

      const res = await fetch("/api/admin/configurators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.configurator) {
        onClose();
        window.open(`/admin/products/configurator?id=${data.configurator.id}`, "_blank");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1e2026] border border-slate-200 dark:border-white/[0.1] rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden animate-fadeIn flex flex-col relative">
        {/* Header Bar */}
        <div className="px-6 py-3.5 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c93b41]" />
            <span>New Configurator • إنشاء وتجهيز مهيئ منتجات بصري</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px]">
          <NewConfiguratorGreeting />

          {/* Right Form Column */}
          <div className="p-8 flex flex-col justify-center">
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">
                  Create Configurator
                </h3>
              </div>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Name a Configurator
                </label>
                <input
                  type="text"
                  placeholder="Enter a configurator title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] focus:ring-2 focus:ring-[#c93b41]/20 transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Choose Product */}
              <NewConfiguratorProductSelector
                chosenProduct={chosenProduct}
                setChosenProduct={setChosenProduct}
                productsList={productsList}
                isCreatingNewProduct={isCreatingNewProduct}
                setIsCreatingNewProduct={setIsCreatingNewProduct}
                newProductTitle={newProductTitle}
                setNewProductTitle={setNewProductTitle}
                newProductBasePrice={newProductBasePrice}
                setNewProductBasePrice={setNewProductBasePrice}
                newProductCategory={newProductCategory}
                setNewProductCategory={setNewProductCategory}
              />

              {/* Choose Style */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Choose Style
                </label>
                <select
                  value={chosenStyle}
                  onChange={(e) => setChosenStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] cursor-pointer"
                >
                  <option value="style1">Style 1 (Classic Split - مساحة المعاينة وخيارات اليمين)</option>
                  <option value="style2">Style 2 (Floating Hotspots - بؤر ونقاط تفاعلية على المجسم)</option>
                  <option value="style3">Style 3 (Step Wizard - خطوات تفاعلية مرحلية)</option>
                  <option value="accordion">Style 4 (Accordion Groups - مجموعات منسدلة قابلة للطي)</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-crimson w-full py-3 text-white font-bold text-xs rounded-xl shadow-md shadow-red-500/20 cursor-pointer flex items-center justify-center gap-2 transition-all"
                >
                  <span>{loading ? "جاري الإنشاء..." : "Create • بدء ضبط وتجهيز المنتج"}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
