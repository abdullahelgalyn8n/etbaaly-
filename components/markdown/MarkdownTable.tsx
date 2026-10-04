import React from "react";
import { formatInline } from "./formatInline";

interface MarkdownTableProps {
  tableRows: string[][];
}

export function MarkdownTable({ tableRows }: MarkdownTableProps) {
  if (!tableRows.length) return null;

  const headerRow = tableRows[0];
  const bodyRows = tableRows.slice(1).filter((r) => !r.every((c) => /^[\s\-:]+$/.test(c)));

  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/[0.1] shadow-sm">
      <table className="w-full text-right border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-slate-100 dark:bg-black/40 border-b border-slate-200 dark:border-white/[0.1] text-slate-950 dark:text-white font-bold">
            {headerRow.map((cell, idx) => (
              <th key={idx} className="p-3.5 whitespace-nowrap">
                {formatInline(cell.trim())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="p-3.5 text-slate-700 dark:text-slate-300">
                  {formatInline(cell.trim())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarkdownTable;
