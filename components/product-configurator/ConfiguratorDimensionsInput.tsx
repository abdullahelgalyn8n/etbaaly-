import React from "react";

interface ConfiguratorDimensionsInputProps {
  dimensions: { length: string; width: string; height: string };
  onDimensionChange: (key: "length" | "width" | "height", val: string) => void;
}

export function ConfiguratorDimensionsInput({
  dimensions,
  onDimensionChange,
}: ConfiguratorDimensionsInputProps) {
  const fields: { key: "length" | "width" | "height"; label: string }[] = [
    { key: "length", label: "الطول (Length)" },
    { key: "width", label: "العرض (Width)" },
    { key: "height", label: "الارتفاع / السُمك (Height)" },
  ];

  return (
    <div className="space-y-4">
      {fields.map(({ key, label }) => (
        <div key={key}>
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className="text-slate-800 dark:text-slate-200">{label}</span>
            <button
              type="button"
              className="text-[#c93b41] hover:underline text-[11px] font-medium cursor-pointer"
            >
              (edit)
            </button>
          </div>
          <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#181a1f] focus-within:border-[#c93b41]">
            <input
              type="text"
              value={dimensions[key]}
              onChange={(e) => onDimensionChange(key, e.target.value)}
              className="w-full px-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
            />
            <span className="px-3 py-2 bg-slate-100 dark:bg-white/[0.05] border-r border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 font-bold">
              سم
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConfiguratorDimensionsInput;
