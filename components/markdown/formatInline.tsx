import React from "react";
import Link from "next/link";

export function formatInline(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const parseFormattedText = (subText: string, keyPrefix: string): React.ReactNode[] => {
    const boldParts = subText.split(/\*\*([^*]+)\*\*/g);
    return boldParts.map((bPart, bIdx) => {
      if (bIdx % 2 === 1) {
        return (
          <strong key={`${keyPrefix}-b-${bIdx}`} className="font-bold text-slate-950 dark:text-white">
            {bPart}
          </strong>
        );
      }
      const codeParts = bPart.split(/`([^`]+)`/g);
      return codeParts.map((cPart, cIdx) => {
        if (cIdx % 2 === 1) {
          return (
            <code
              key={`${keyPrefix}-c-${cIdx}`}
              className="px-1.5 py-0.5 mx-1 rounded bg-slate-100 dark:bg-black/50 text-[#c93b41] dark:text-[#ff7b80] font-mono text-xs border border-slate-200 dark:border-white/[0.08]"
            >
              {cPart}
            </code>
          );
        }
        return cPart;
      });
    });
  };

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...parseFormattedText(text.substring(lastIndex, match.index), `txt-${lastIndex}`));
    }
    const linkText = match[1];
    const linkHref = match[2];
    const isInternal = linkHref.startsWith("/");

    if (isInternal) {
      parts.push(
        <Link
          key={`lnk-${match.index}`}
          href={linkHref}
          className="text-[#c93b41] hover:underline font-bold inline-flex items-center gap-0.5"
        >
          {linkText}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={`lnk-${match.index}`}
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c93b41] hover:underline font-bold inline-flex items-center gap-0.5"
        >
          {linkText}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(...parseFormattedText(text.substring(lastIndex), `txt-${lastIndex}`));
  }

  return parts.length > 0 ? parts : text;
}

export default formatInline;
