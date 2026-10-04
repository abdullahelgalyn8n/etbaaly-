"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ExternalLink, RefreshCw } from "lucide-react";
import { ConfiguratorView, AdminProduct } from "@/lib/db";
import { StudioGlobalDisplaySettings } from "./StudioGlobalDisplaySettings";
import { useRouter } from "next/navigation";

interface StudioGlobalSettingsTabProps {
  productId: string;
  setProductId: (val: string) => void;
  style: string;
  setStyle: (val: string) => void;
  views: ConfiguratorView[];
  responsibleViewThumbnail: string;
  setResponsibleViewThumbnail: (val: string) => void;
  chooseForm: string;
  setChooseForm: (val: string) => void;
  contactForm: string;
  setContactForm: (val: string) => void;
  basePrice: number;
  setBasePrice: (val: number) => void;
  loadConfiguratorIn: string;
  setLoadConfiguratorIn: (val: string) => void;
  configuratorTemplate: string;
  setConfiguratorTemplate: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  viewBackground: string;
  setViewBackground: (val: string) => void;
  showDetailsPage: string;
  setShowDetailsPage: (val: string) => void;
}

export default function StudioGlobalSettingsTab({
  productId,
  setProductId,
  style,
  setStyle,
  views,
  responsibleViewThumbnail,
  setResponsibleViewThumbnail,
  chooseForm,
  setChooseForm,
  contactForm,
  setContactForm,
  basePrice,
  setBasePrice,
  loadConfiguratorIn,
  setLoadConfiguratorIn,
  configuratorTemplate,
  setConfiguratorTemplate,
  description,
  setDescription,
  viewBackground,
  setViewBackground,
  showDetailsPage,
  setShowDetailsPage,
}: StudioGlobalSettingsTabProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [allProducts, setAllProducts] = useState<AdminProduct[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/products/");
        const data = await res.json();
        if (data.success && data.products) {
          setAllProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to load products list in studio:", err);
      }
    }
    load();
  }, []);

  const handleProductSelectChange = (newProdId: string) => {
    setProductId(newProdId);
    if (newProdId) {
      router.push(`/admin/products/configurator/?productId=${newProdId}`);
    }
  };

  return (
    <div className="space-y-3">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left font-bold text-xs text-slate-300 uppercase tracking-wider hover:text-white cursor-pointer border-b border-[#26282f]"
      >
        <span className="text-[11px] font-bold text-slate-200">GLOBAL SETTINGS</span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="space-y-4 pt-1 text-xs">
          {/* 1. Choose Product */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-bold block">Choose Product</label>
              {productId && (
                <a
                  href={`/products/${productId}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-[11px] flex items-center gap-1 font-mono"
                  title="فتح صفحة هذا المنتج في تبويب جديد"
                >
                  <span>عرض المنتج</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <select
              value={productId}
              onChange={(e) => handleProductSelectChange(e.target.value)}
              className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="">Select Product</option>
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.id})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 leading-snug">
              اختر المنتج المراد ربطه وضبط طبقاته في هذا الاستوديو.
            </p>
          </div>

          {/* 2. Choose Style */}
          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">Choose Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="style1">Style 1</option>
              <option value="style2">Style 2</option>
              <option value="style3">Style 3</option>
              <option value="accordion">Accordion</option>
            </select>
            <p className="text-[11px] text-slate-500">Please choose the control style.</p>
          </div>

          {/* 3. Responsible View Cart Thumbnail */}
          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">Responsible View Cart Thumbnail</label>
            <select
              value={responsibleViewThumbnail}
              onChange={(e) => setResponsibleViewThumbnail(e.target.value)}
              className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="">Select View</option>
              {views.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">Choose the responsible view for cart thumbnail.</p>
          </div>

          {/* 4. Choose Form */}
          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">Choose Form</label>
            <select
              value={chooseForm}
              onChange={(e) => setChooseForm(e.target.value)}
              className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="quote">Get a Quote Form</option>
              <option value="cart">Cart Form</option>
            </select>
            <p className="text-[11px] text-slate-500 leading-snug">
              You chose the `Cart Form` and you dont select any product, Quote Form applies automatically.
            </p>
          </div>

          {/* 5. Contact Form */}
          <div className="space-y-1">
            <label className="text-slate-300 font-bold block">Contact Form</label>
            <select
              value={contactForm}
              onChange={(e) => setContactForm(e.target.value)}
              className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded text-white text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="">Select a Form</option>
              <option value="form-contact-default">Contact Form 7 - Standard</option>
              <option value="form-rfq-custom">Custom RFQ Quotation Form</option>
            </select>
            <p className="text-[11px] text-slate-500">Please choose the contact form</p>
          </div>

          {/* 6 to 11. Additional Display & Template Settings */}
          <StudioGlobalDisplaySettings
            basePrice={basePrice}
            setBasePrice={setBasePrice}
            loadConfiguratorIn={loadConfiguratorIn}
            setLoadConfiguratorIn={setLoadConfiguratorIn}
            configuratorTemplate={configuratorTemplate}
            setConfiguratorTemplate={setConfiguratorTemplate}
            description={description}
            setDescription={setDescription}
            viewBackground={viewBackground}
            setViewBackground={setViewBackground}
            showDetailsPage={showDetailsPage}
            setShowDetailsPage={setShowDetailsPage}
          />
        </div>
      )}
    </div>
  );
}
