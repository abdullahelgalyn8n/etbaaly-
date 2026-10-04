"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { MediaHeaderStats } from "@/components/admin/media/MediaHeaderStats";
import { MediaGrid } from "@/components/admin/media/MediaGrid";
import { MediaInspectorSidebar } from "@/components/admin/media/MediaInspectorSidebar";
import { MediaAddModal } from "@/components/admin/media/MediaAddModal";
import { useAdminMedia } from "@/components/admin/media/useAdminMedia";

export default function AdminMediaLibraryPage() {
  const {
    assets,
    stats,
    loading,
    search,
    setSearch,
    storageFilter,
    setStorageFilter,
    categoryFilter,
    setCategoryFilter,
    selectedAsset,
    setSelectedAsset,
    editAlt,
    setEditAlt,
    editTitle,
    setEditTitle,
    editCaption,
    setEditCaption,
    editDescription,
    setEditDescription,
    editCategory,
    setEditCategory,
    editTags,
    setEditTags,
    isSaving,
    toastMessage,
    isAddModalOpen,
    setIsAddModalOpen,
    newUrl,
    setNewUrl,
    newFilename,
    setNewFilename,
    newStorageType,
    setNewStorageType,
    newAlt,
    setNewAlt,
    newTitle,
    setNewTitle,
    newCategory,
    setNewCategory,
    fetchAssets,
    handleSelectAsset,
    handleSaveMetadata,
    handleDeleteAsset,
    handleCreateAsset,
    copyToClipboard,
  } = useAdminMedia();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1d1d1d] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HEADER & STATS */}
      <MediaHeaderStats
        stats={stats}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* 2. MAIN GALLERY GRID + INSPECTOR SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <MediaGrid
            assets={assets}
            loading={loading}
            selectedAsset={selectedAsset}
            onSelectAsset={handleSelectAsset}
            search={search}
            onSearchChange={setSearch}
            storageFilter={storageFilter}
            onStorageFilterChange={setStorageFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            onSearchSubmit={fetchAssets}
          />
        </div>

        <div className="lg:col-span-4">
          <MediaInspectorSidebar
            selectedAsset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
            editAlt={editAlt}
            setEditAlt={setEditAlt}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editCaption={editCaption}
            setEditCaption={setEditCaption}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            editCategory={editCategory}
            setEditCategory={setEditCategory}
            editTags={editTags}
            setEditTags={setEditTags}
            isSaving={isSaving}
            onSave={handleSaveMetadata}
            onDelete={handleDeleteAsset}
            onCopyUrl={copyToClipboard}
          />
        </div>
      </div>

      {/* 3. ADD MEDIA MODAL */}
      <MediaAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateAsset}
        newStorageType={newStorageType}
        setNewStorageType={setNewStorageType}
        newUrl={newUrl}
        setNewUrl={setNewUrl}
        newFilename={newFilename}
        setNewFilename={setNewFilename}
        newAlt={newAlt}
        setNewAlt={setNewAlt}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
      />
    </div>
  );
}
