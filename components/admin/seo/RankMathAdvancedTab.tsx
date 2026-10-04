import React from "react";

interface RankMathAdvancedTabProps {
  robotsIndex: boolean;
  setRobotsIndex: (v: boolean) => void;
  robotsFollow: boolean;
  setRobotsFollow: (v: boolean) => void;
  canonicalUrl: string;
  setCanonicalUrl: (v: string) => void;
  slug: string;
}

export function RankMathAdvancedTab({
  robotsIndex,
  setRobotsIndex,
  robotsFollow,
  setRobotsFollow,
  canonicalUrl,
  setCanonicalUrl,
  slug,
}: RankMathAdvancedTabProps) {
  return (
    <div className="space-y-3 bg-[#17181c] border border-[#24262d] rounded-2xl p-4 text-xs">
      <div className="space-y-2">
        <label className="text-slate-300 font-bold block">أوامر عناكب البحث (Robots Meta)</label>
        <div className="flex flex-wrap gap-4 pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={robotsIndex}
              onChange={(e) => setRobotsIndex(e.target.checked)}
              className="rounded border-[#333] bg-[#101114] text-cyan-400 focus:ring-0"
            />
            <span>Index (فهرسة المقال في Google)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={robotsFollow}
              onChange={(e) => setRobotsFollow(e.target.checked)}
              className="rounded border-[#333] bg-[#101114] text-cyan-400 focus:ring-0"
            />
            <span>Follow (تتبع روابط المقال)</span>
          </label>
        </div>
      </div>

      <div className="space-y-1 pt-2">
        <label className="text-slate-300 font-bold block">الرابط القانوني (Canonical URL)</label>
        <input
          type="url"
          value={canonicalUrl}
          onChange={(e) => setCanonicalUrl(e.target.value)}
          placeholder={`https://etbaaly.com/blog/${slug}`}
          className="w-full px-3 py-2 bg-[#101114] border border-[#26282f] rounded-lg text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
        />
        <p className="text-[11px] text-slate-500">
          اتركه فارغاً ليكون الرابط الافتراضي للمقال هو الرابط القانوني الأساسي.
        </p>
      </div>
    </div>
  );
}

export default RankMathAdvancedTab;
