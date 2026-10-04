"use client";

import { useState, useEffect } from "react";

export function useAdminPosts(initialTab = "all") {
  const [posts, setPosts] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalPosts: 0,
    published: 0,
    drafts: 0,
    scheduled: 0,
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeStatusTab, setActiveStatusTab] = useState(initialTab);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Quick edit modal state
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/posts?limit=50`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      if (selectedCategory !== "all") url += `&category=${encodeURIComponent(selectedCategory)}`;
      if (activeStatusTab !== "all" && activeStatusTab !== "categories") {
        url += `&status=${activeStatusTab}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, activeStatusTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleToggleStatus = async (slug: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const res = await fetch("/api/admin/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, status: newStatus } : p))
        );
        setStatusNotice(
          newStatus === "published"
            ? "تم تفعيل نشر المقال بنجاح وإتاحته في السيو والمحركات."
            : "تم تحويل المقال إلى مسودة مؤقتة."
        );
        setTimeout(() => setStatusNotice(null), 3500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (slug: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف المقال "${title}" نهائياً؟`)) return;

    try {
      const res = await fetch(`/api/admin/posts?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
        setStatusNotice(`تم حذف المقال "${title}" بنجاح.`);
        setTimeout(() => setStatusNotice(null), 3500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setIsSavingEdit(true);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) => (p.slug === editingPost.slug ? { ...p, ...editingPost } : p))
        );
        setStatusNotice("تم حفظ تعديلات المقال بنجاح!");
        setTimeout(() => setStatusNotice(null), 3500);
        setEditingPost(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingEdit(false);
    }
  };

  return {
    posts,
    stats,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    activeStatusTab,
    setActiveStatusTab,
    statusNotice,
    setStatusNotice,
    editingPost,
    setEditingPost,
    isSavingEdit,
    handleSearchSubmit,
    handleToggleStatus,
    handleDeletePost,
    handleQuickEditSave,
  };
}
