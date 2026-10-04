"use client";

import React, { useState } from "react";
import { Tag } from "lucide-react";

interface PostTagsCardProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export function PostTagsCard({ tags, setTags }: PostTagsCardProps) {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 shadow-xs space-y-3">
      <span className="font-bold text-slate-800 dark:text-white text-xs block pb-2 border-b border-slate-100 dark:border-white/[0.06] flex items-center gap-1.5">
        <Tag className="w-3.5 h-3.5 text-amber-500" />
        وسوم المقال (Tags)
      </span>

      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="اكتب الوسم واضغط Enter..."
        className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
      />

      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]"
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-red-500 font-bold ml-0.5 cursor-pointer"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default PostTagsCard;
