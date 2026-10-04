import React from "react";
import { formatInline } from "./markdown/formatInline";
import MarkdownTable from "./markdown/MarkdownTable";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];
  let listType: "ul" | "ol" = "ul";
  let inTable = false;
  let tableRows: string[][] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-4 space-y-2.5 pr-2 list-none">
            {listItems}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} className="my-4 space-y-2.5 pr-2 list-decimal list-inside text-slate-800 dark:text-slate-200">
            {listItems}
          </ol>
        );
      }
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableRows.length > 0) {
      elements.push(<MarkdownTable key={`table-${elements.length}`} tableRows={tableRows} />);
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList();
      flushTable();
      continue;
    }

    // Check Table Row
    if (line.startsWith("|") && line.endsWith("|")) {
      flushList();
      inTable = true;
      const cells = line.split("|").slice(1, -1);
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }

    // Check Headers
    if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h2 key={`h2-top-${i}`} className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mt-8 mb-4 border-r-4 border-[#c93b41] pr-3 leading-snug">
          {formatInline(line.replace(/^#\s+/, ""))}
        </h2>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mt-8 mb-4 border-r-4 border-[#c93b41] pr-3 leading-snug">
          {formatInline(line.replace(/^##\s+/, ""))}
        </h2>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
          {formatInline(line.replace(/^###\s+/, ""))}
        </h3>
      );
      continue;
    }
    if (line.startsWith("#### ")) {
      flushList();
      elements.push(
        <h4 key={`h4-${i}`} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">
          {formatInline(line.replace(/^####\s+/, ""))}
        </h4>
      );
      continue;
    }

    // Check Horizontal Rule
    if (/^(\-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flushList();
      elements.push(
        <hr key={`hr-${i}`} className="my-8 border-slate-200 dark:border-white/[0.1]" />
      );
      continue;
    }

    // Check Blockquote
    if (line.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote key={`bq-${i}`} className="my-5 p-4 sm:p-5 rounded-2xl bg-[#c93b41]/5 dark:bg-[#c93b41]/10 border-r-4 border-[#c93b41] text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-medium">
          {formatInline(line.replace(/^>\s+/, ""))}
        </blockquote>
      );
      continue;
    }

    // Check Unordered List (- or *)
    if (/^[\*\-]\s+/.test(line)) {
      if (!inList || listType !== "ul") {
        flushList();
        inList = true;
        listType = "ul";
      }
      const itemContent = line.replace(/^[\*\-]\s+/, "");
      listItems.push(
        <li key={`li-${i}`} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c93b41] mt-2.5 shrink-0" />
          <div className="flex-1">{formatInline(itemContent)}</div>
        </li>
      );
      continue;
    }

    // Check Ordered List (1. 2. etc.)
    if (/^\d+\.\s+/.test(line)) {
      if (!inList || listType !== "ol") {
        flushList();
        inList = true;
        listType = "ol";
      }
      const itemContent = line.replace(/^\d+\.\s+/, "");
      listItems.push(
        <li key={`li-${i}`} className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base pr-1">
          {formatInline(itemContent)}
        </li>
      );
      continue;
    }

    // Normal Paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="my-3 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
        {formatInline(line)}
      </p>
    );
  }

  flushList();
  flushTable();

  return <div className="space-y-2 text-right">{elements}</div>;
}
