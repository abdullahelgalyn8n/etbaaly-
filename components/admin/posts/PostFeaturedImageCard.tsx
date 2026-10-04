"use client";

import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import MediaPickerModal from "@/components/admin/media/MediaPickerModal";

interface PostFeaturedImageCardProps {
  image: string;
  setImage: (img: string) => void;
}

export function PostFeaturedImageCard({ image, setImage }: PostFeaturedImageCardProps) {
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#18191f] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
        <span className="font-bold text-slate-800 dark:text-white text-xs flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-cyan-500" />
          الصورة البارزة (Featured Image)
        </span>
        <button
          type="button"
          onClick={() => setIsMediaPickerOpen(true)}
          className="text-[11px] font-bold text-[#c93b41] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <ImageIcon className="w-3 h-3" />
          <span>المعرض</span>
        </button>
      </div>

      {image && (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Featured" className="w-full h-full object-cover" />
        </div>
      )}

      <div>
        <label className="text-slate-500 font-bold block mb-1 text-[11px]">رابط الصورة (URL):</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://... أو /images/..."
          className="w-full px-3 py-2 bg-slate-50 dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#c93b41]"
        />
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(selected) => {
          setImage(selected.url);
        }}
      />
    </div>
  );
}

export default PostFeaturedImageCard;
