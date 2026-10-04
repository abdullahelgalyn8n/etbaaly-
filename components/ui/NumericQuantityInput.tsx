"use client";

import React, { useState, useEffect } from "react";

export interface NumericQuantityInputProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Normalizes numbers: converts Arabic-Indic numerals (٠-٩) to ASCII (0-9)
 * and strips any non-digit characters.
 */
export function sanitizeNumericInput(val: string): string {
  return val
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
    .replace(/\D/g, "");
}

export function NumericQuantityInput({
  value,
  onChange,
  min = 1,
  max = 100000,
  className = "",
  ariaLabel = "الكمية المطلوبة",
}: NumericQuantityInputProps) {
  const [valStr, setValStr] = useState<string>(String(value));

  // Keep internal string in sync when external numeric value changes
  useEffect(() => {
    setValStr(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = sanitizeNumericInput(e.target.value);
    setValStr(cleaned);

    if (cleaned !== "") {
      const num = parseInt(cleaned, 10);
      if (num >= min && num <= max) {
        onChange(num);
      } else if (num > max) {
        onChange(max);
      }
    }
  };

  const handleBlur = () => {
    if (!valStr || parseInt(valStr, 10) < min) {
      setValStr(String(min));
      onChange(min);
    } else {
      const num = Math.min(max, Math.max(min, parseInt(valStr, 10)));
      setValStr(String(num));
      onChange(num);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(max, value + 1));
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(min, value - 1));
      return;
    }

    // Allow control / navigation keys
    if (
      [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Home",
        "End",
      ].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    // Only allow digits (0-9 and Arabic numerals ٠-٩)
    if (!/^[0-9٠-٩]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={valStr}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      title="اكتب الكمية يدوياً (أرقام فقط)"
      className={`select-text text-center font-mono font-black focus:outline-none transition-all ${className}`}
    />
  );
}

export default NumericQuantityInput;
