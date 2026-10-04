export interface CanvasElement {
  id: string;
  type: "text" | "image" | "clipart";
  content: string; // text string or image URL
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  scale: number;
  rotation: number;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
}

export const presetCliparts = [
  { label: "شعار النسر الملكي", icon: "🦅" },
  { label: "نجمة التميز الفضية", icon: "⭐" },
  { label: "شعلة الإبداع", icon: "🔥" },
  { label: "رمز التاج الذهبي", icon: "👑" },
  { label: "كوكب ورؤية", icon: "🪐" },
  { label: "صاروخ الإنطلاق", icon: "🚀" },
  { label: "درع الأمان", icon: "🛡️" },
  { label: "قلب نابض", icon: "❤️" },
];
