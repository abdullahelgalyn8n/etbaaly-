export function formatRelativeArabicTime(isoDate: string): string {
  try {
    const then = new Date(isoDate).getTime();
    const now = Date.now();
    const diffSeconds = Math.max(0, Math.floor((now - then) / 1000));

    if (diffSeconds < 45) {
      return "الآن";
    }
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      if (diffMinutes === 1) return "منذ دقيقة";
      if (diffMinutes === 2) return "منذ دقيقتين";
      if (diffMinutes >= 3 && diffMinutes <= 10) return `منذ ${diffMinutes} دقائق`;
      return `منذ ${diffMinutes} دقيقة`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      if (diffHours === 1) return "منذ ساعة";
      if (diffHours === 2) return "منذ ساعتين";
      if (diffHours >= 3 && diffHours <= 10) return `منذ ${diffHours} ساعات`;
      return `منذ ${diffHours} ساعة`;
    }
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "أمس";
    if (diffDays === 2) return "منذ يومين";
    if (diffDays >= 3 && diffDays <= 10) return `منذ ${diffDays} أيام`;
    return `منذ ${diffDays} يوماً`;
  } catch {
    return isoDate;
  }
}
