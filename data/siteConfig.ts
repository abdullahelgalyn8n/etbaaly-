const rawPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "01022598473";
const cleanPhone = rawPhone.replace(/\D/g, "");
const intlPhone = cleanPhone.startsWith("20")
  ? cleanPhone
  : cleanPhone.startsWith("0")
  ? `2${cleanPhone}`
  : `20${cleanPhone}`;

export const siteConfig = {
  name: "إطبعلي | Etbaaly - مطابع وحلول طباعة وتغليف متكاملة (A.Z Agency)",
  shortName: "إطبعلي | Etbaaly",
  description: "المنصة الذكية الرائدة في خدمات الطباعة الرقمية والأوفست، العلب والتغليف الفاخر، الأكياس الورقية، المطبوعات التجارية، والهدايا الدعائية للشركات في مصر والشرق الأوسط، مع تتبع شحنات لحظي وتسليم مباشر.",
  url: "https://etbaaly.azagency.online",
  phone: rawPhone,
  phoneDisplay: `+${intlPhone.slice(0, 2)} ${intlPhone.slice(2, 5)} ${intlPhone.slice(5, 8)} ${intlPhone.slice(8)}`,
  email: "print@azagency.online",
  address: "القاهرة، جمهورية مصر العربية | شحن وتوصيل فوري لكافة المحافظات",
  social: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || `https://wa.me/${intlPhone}`,
    facebook: "https://www.facebook.com/azagency.eg",
    instagram: "https://www.instagram.com/azagency.eg",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  stats: {
    happyClients: "1,850+",
    printedPieces: "12,500,000+",
    coverageGovs: "27 محافظة",
    onTimeDelivery: "99.4%",
  },
};
