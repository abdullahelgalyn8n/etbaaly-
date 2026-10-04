"use client";

import React from "react";

interface StudioNewViewModalProps {
  showNewViewModal: boolean;
  setShowNewViewModal: (v: boolean) => void;
  newViewName: string;
  setNewViewName: (n: string) => void;
  handleCreateView: () => void;
}

export default function StudioNewViewModal({
  showNewViewModal,
  setShowNewViewModal,
  newViewName,
  setNewViewName,
  handleCreateView,
}: StudioNewViewModalProps) {
  if (!showNewViewModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e2026] border border-[#2e323e] rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
        <h4 className="font-bold text-white text-sm">إضافة زاوية عرض جديدة (New Angle)</h4>
        <input
          type="text"
          placeholder="مثال: منظور علوي (Top View)"
          value={newViewName}
          onChange={(e) => setNewViewName(e.target.value)}
          className="w-full px-3 py-2 bg-[#141518] border border-[#2e323e] rounded-lg text-white text-xs focus:outline-none focus:border-cyan-400"
          autoFocus
        />
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setShowNewViewModal(false)}
            className="px-3 py-1.5 text-slate-400 hover:text-white text-xs cursor-pointer"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleCreateView}
            className="px-4 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs rounded-lg cursor-pointer"
          >
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
}
