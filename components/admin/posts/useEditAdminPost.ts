import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useEditAdminPost(initialSlug: string) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Article Base Fields
  const [originalSlug, setOriginalSlug] = useState(initialSlug);
  const [slug, setSlug] = useState(initialSlug);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("السيو والذكاء الاصطناعي (AEO)");
  const [author, setAuthor] = useState("فريق تحرير مطبعة إطبعلي");
  const [readTime, setReadTime] = useState("5 دقائق قراءة");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<"published" | "draft" | "scheduled">("published");
  const [date, setDate] = useState("");

  // Rank Math SEO Fields
  const [focusKeyword, setFocusKeyword] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [schemaType, setSchemaType] = useState<string>("BlogPosting");
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [robotsFollow, setRobotsFollow] = useState(true);
  const [seoScore, setSeoScore] = useState(85);

  useEffect(() => {
    async function loadPost() {
      if (!initialSlug) return;
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(`/api/admin/posts?slug=${encodeURIComponent(initialSlug)}`);
        const data = await res.json();
        if (!res.ok || !data.success || !data.post) {
          setNotFound(true);
          return;
        }

        const p = data.post;
        setTitle(p.title || "");
        setSlug(p.slug || initialSlug);
        setOriginalSlug(p.slug || initialSlug);
        setExcerpt(p.excerpt || "");
        setContent(p.content || "");
        setCategory(p.category || "السيو والذكاء الاصطناعي (AEO)");
        setAuthor(p.author || "فريق تحرير مطبعة إطبعلي");
        setReadTime(p.readTime || "5 دقائق قراءة");
        setImage(p.image || "");
        setTags(Array.isArray(p.tags) ? p.tags : []);
        setStatus(p.status || "published");
        setDate(p.date || "");

        // SEO Fields
        setFocusKeyword(p.focusKeyword || "");
        setSeoTitle(p.seoTitle || p.title || "");
        setMetaDescription(p.metaDescription || p.excerpt || "");
        setCanonicalUrl(p.canonicalUrl || "");
        setSchemaType(p.schemaType || "BlogPosting");
        if (p.robotsMeta) {
          setRobotsIndex(!p.robotsMeta.includes("noindex"));
          setRobotsFollow(!p.robotsMeta.includes("nofollow"));
        }
        if (typeof p.seoScore === "number") {
          setSeoScore(p.seoScore);
        }
      } catch (err: any) {
        console.error("Failed to load post:", err);
        setErrorMessage("حدث خطأ أثناء جلب بيانات المقال.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [initialSlug]);

  const handleSave = async (targetStatus?: "published" | "draft") => {
    if (!title.trim()) {
      setErrorMessage("يرجى إدخال عنوان المقال قبل الحفظ.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setSaveNotice(null);

    const updatedStatus = targetStatus || status;
    const robotsMetaStr = `${robotsIndex ? "index" : "noindex"}, ${robotsFollow ? "follow" : "nofollow"}`;

    try {
      const res = await fetch("/api/admin/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalSlug,
          slug,
          title,
          excerpt,
          content,
          category,
          author,
          readTime,
          image,
          tags,
          status: updatedStatus,
          focusKeyword,
          seoTitle,
          metaDescription,
          canonicalUrl,
          schemaType,
          robotsMeta: robotsMetaStr,
          seoScore,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "فشل تحديث المقال.");
      }

      if (targetStatus) setStatus(targetStatus);
      if (slug !== originalSlug) {
        setOriginalSlug(slug);
        router.replace(`/admin/posts/${encodeURIComponent(slug)}`);
      }

      setSaveNotice(`تم التحديث بنجاح! نتيجة السيو الحالية: ${seoScore}/100 🎯`);
      setTimeout(() => setSaveNotice(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || "فشل الاتصال بالخادم.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    loading,
    notFound,
    isSaving,
    saveNotice,
    errorMessage,
    setErrorMessage,
    title,
    setTitle,
    slug,
    setSlug,
    status,
    setStatus,
    excerpt,
    setExcerpt,
    content,
    setContent,
    category,
    setCategory,
    author,
    setAuthor,
    readTime,
    setReadTime,
    image,
    setImage,
    tags,
    setTags,
    date,
    focusKeyword,
    setFocusKeyword,
    seoTitle,
    setSeoTitle,
    metaDescription,
    setMetaDescription,
    canonicalUrl,
    setCanonicalUrl,
    schemaType,
    setSchemaType,
    robotsIndex,
    setRobotsIndex,
    robotsFollow,
    setRobotsFollow,
    setSeoScore,
    handleSave,
  };
}
