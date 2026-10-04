import { useState } from "react";

export function useAddMediaModal(onSuccess: () => void, showToast: (msg: string) => void) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newFilename, setNewFilename] = useState("");
  const [newStorageType, setNewStorageType] = useState<"local" | "cloud_db">("cloud_db");
  const [newAlt, setNewAlt] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("products");

  const resetForm = () => {
    setNewUrl("");
    setNewFilename("");
    setNewAlt("");
    setNewTitle("");
  };

  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newFilename.trim()) {
      showToast("يرجى إدخال الرابط واسم الملف");
      return;
    }
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: newUrl,
          filename: newFilename,
          storageType: newStorageType,
          altText: newAlt || newTitle,
          title: newTitle || newFilename,
          category: newCategory,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("تمت إضافة الصورة بنجاح!");
        setIsAddModalOpen(false);
        resetForm();
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
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
    handleCreateAsset,
  };
}
