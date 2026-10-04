import { useState, useEffect } from "react";
import { MediaAsset } from "@/lib/db/types";
import { useAddMediaModal } from "./useAddMediaModal";

export function useAdminMedia() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [stats, setStats] = useState({ total: 0, local: 0, cloud: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [storageFilter, setStorageFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  // Edit form state
  const [editAlt, setEditAlt] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("general");
  const [editTags, setEditTags] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };


  const fetchAssets = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/media?storageType=${storageFilter}&category=${categoryFilter}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setAssets(data.assets || []);
        if (data.stats) setStats(data.stats);
        if (selectedAsset) {
          const current = (data.assets || []).find((a: MediaAsset) => a.id === selectedAsset.id);
          if (current) setSelectedAsset(current);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [storageFilter, categoryFilter]);

  const handleSelectAsset = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setEditAlt(asset.altText || "");
    setEditTitle(asset.title || "");
    setEditCaption(asset.caption || "");
    setEditDescription(asset.description || "");
    setEditCategory(asset.category || "general");
    setEditTags(asset.tags?.join(", ") || "");
  };

  const handleSaveMetadata = async () => {
    if (!selectedAsset) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedAsset.id,
          altText: editAlt,
          title: editTitle,
          caption: editCaption,
          description: editDescription,
          category: editCategory,
          tags: editTags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("تم تحديث بيانات وميتا تاج الصورة بنجاح!");
        fetchAssets();
      }
    } catch (err) {
      console.error(err);
      showToast("فشل الحفظ!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الصورة من المعرض وقاعدة البيانات؟")) return;
    try {
      const res = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("تم حذف الصورة بنجاح.");
        if (selectedAsset?.id === id) setSelectedAsset(null);
        fetchAssets();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addModal = useAddMediaModal(fetchAssets, showToast);


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("تم نسخ الرابط للحافظة!");
  };

  return {
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
    ...addModal,
    fetchAssets,
    handleSelectAsset,
    handleSaveMetadata,
    handleDeleteAsset,
    copyToClipboard,
  };
}
