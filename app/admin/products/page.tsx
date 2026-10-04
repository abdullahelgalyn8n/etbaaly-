"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { ProductsHeader } from "@/components/admin/products/ProductsHeader";
import { ProductsFilterBar } from "@/components/admin/products/ProductsFilterBar";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { DeleteProductModal } from "@/components/admin/products/DeleteProductModal";

export default function AdminProductsListPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products/");
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
      setFeedback({ type: "error", message: "تعذر تحميل قائمة المنتجات من الخادم." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}/`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setFeedback({
          type: "success",
          message: `تم حذف المنتج "${deleteTarget.title}" بنجاح من قاعدة البيانات.`,
        });
        setDeleteTarget(null);
      } else {
        setFeedback({
          type: "error",
          message: data.error || "فشل حذف المنتج من قاعدة البيانات.",
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      setFeedback({ type: "error", message: "حدث خطأ غير متوقع أثناء الحذف." });
    } finally {
      setIsDeleting(false);
    }
  };

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
              : "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-800 dark:text-red-200"
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Quick Actions */}
      <ProductsHeader
        productsCount={products.length}
        loading={loading}
        onRefresh={fetchProducts}
      />

      {/* Filter and Search Bar */}
      <ProductsFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categories={categories}
        totalProductsCount={products.length}
      />

      {/* Products Table */}
      <ProductsTable
        loading={loading}
        filteredProducts={filteredProducts}
        onSelectDeleteTarget={(p) => setDeleteTarget(p)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteProductModal
        deleteTarget={deleteTarget}
        isDeleting={isDeleting}
        onClose={() => setDeleteTarget(null)}
        onConfirmDelete={handleDeleteConfirm}
      />
    </div>
  );
}
