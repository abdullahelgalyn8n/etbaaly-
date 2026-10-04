import React from "react";

interface NewConfiguratorProductSelectorProps {
  chosenProduct: string;
  setChosenProduct: (val: string) => void;
  productsList: any[];
  isCreatingNewProduct: boolean;
  setIsCreatingNewProduct: (val: boolean) => void;
  newProductTitle: string;
  setNewProductTitle: (val: string) => void;
  newProductBasePrice: number;
  setNewProductBasePrice: (val: number) => void;
  newProductCategory: string;
  setNewProductCategory: (val: string) => void;
}

export function NewConfiguratorProductSelector({
  chosenProduct,
  setChosenProduct,
  productsList,
  isCreatingNewProduct,
  setIsCreatingNewProduct,
  newProductTitle,
  setNewProductTitle,
  newProductBasePrice,
  setNewProductBasePrice,
  newProductCategory,
  setNewProductCategory,
}: NewConfiguratorProductSelectorProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-700 dark:text-slate-300 block">
          Choose Product
        </label>
        <button
          type="button"
          onClick={() => {
            setIsCreatingNewProduct(!isCreatingNewProduct);
            setChosenProduct("new");
          }}
          className="text-[11px] text-[#c93b41] hover:underline font-bold cursor-pointer"
        >
          {isCreatingNewProduct ? "اختر من المنتجات الحالية" : "+ إنشاء منتج ووكومرس جديد"}
        </button>
      </div>

      {!isCreatingNewProduct ? (
        <select
          value={chosenProduct}
          onChange={(e) => setChosenProduct(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#c93b41] cursor-pointer"
        >
          <option value="">Select a Product</option>
          {productsList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} ({p.basePrice} ج.م)
            </option>
          ))}
          <option value="new">+ إنشاء منتج ووكومرس جديد لهذا المهيئ</option>
        </select>
      ) : (
        <div className="p-3 bg-slate-50 dark:bg-[#151619] border border-slate-200 dark:border-white/10 rounded-xl space-y-2">
          <input
            type="text"
            placeholder="اسم المنتج في المتجر..."
            value={newProductTitle}
            onChange={(e) => setNewProductTitle(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/10 rounded-lg text-xs"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="السعر الأساسي (ج.م)"
              value={newProductBasePrice}
              onChange={(e) => setNewProductBasePrice(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/10 rounded-lg text-xs font-mono"
            />
            <input
              type="text"
              placeholder="التصنيف"
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white dark:bg-[#202227] border border-slate-200 dark:border-white/10 rounded-lg text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewConfiguratorProductSelector;
