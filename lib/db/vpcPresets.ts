export const vpcConfiguratorPresets = [
  {
    id: "vpc-luxury-box",
    slug: "luxury-packaging-box",
    title: "علب التغليف الفاخرة المخصصة (Custom Rigid Packaging Box)",
    category: "علب وتغليف منتجات",
    basePrice: 45,
    description: "تجميع وبناء هيكل العلبة الفاخرة خطوة بخطوة: نوع الفتح والإغلاق، خامة الكرتون، السلوفان، السبوت UV، والحشوات الداخلية المخملية.",
    steps: [
      {
        id: "structure",
        title: "1. هيكل وشكل فتح العلبة (Box Structure)",
        options: [
          { id: "magnetic", name: "علبة بغطاء مغناطيسي جانبي (Magnetic Closure)", priceAdd: 12, visualLayer: "magnetic-lid", icon: "🧲" },
          { id: "drawer", name: "علبة درج وسلايدر سحب (Slide Drawer Box)", priceAdd: 8, visualLayer: "slide-drawer", icon: "📦" },
          { id: "top-bottom", name: "علبة قاعدة وغطاء منفصلين (Two-Piece Lid & Base)", priceAdd: 5, visualLayer: "lid-base", icon: "🎁" },
          { id: "mailer", name: "كرتونة شحن وتوصيل إي-فلوت (E-Commerce Mailer Box)", priceAdd: 0, visualLayer: "mailer-lock", icon: "🚚" },
        ],
      },
      {
        id: "material",
        title: "2. خامة وسماكة الكرتون الأساسي (Core Material)",
        options: [
          { id: "sbs-solid", name: "كرتون سوليد مستورد SBS أبيض فاخر (400 جم)", priceAdd: 7, texture: "#FFFFFF", badge: "أعلى نقاوة" },
          { id: "duplex", name: "كرتون دوبلكس مقوى رمادي الظهر (350 جم)", priceAdd: 0, texture: "#F0F0F0", badge: "اقتصادي وقوي" },
          { id: "kraft", name: "كرتون كرافت بني طبيعي معاد تدويره (350 جم)", priceAdd: 3, texture: "#C29B68", badge: "صديق للبيئة" },
          { id: "greyboard", name: "هارد بورد كرتون رمادي صلب سمك 2 مم (Rigid Greyboard)", priceAdd: 15, texture: "#555555", badge: "فخامة فائقة" },
        ],
      },
      {
        id: "lamination",
        title: "3. السلوفان وطبقة الحماية الخارجية (Lamination & Texture)",
        options: [
          { id: "soft-touch", name: "سلوفان مخملي سوفت تاتش Soft-Touch (ملمس حريري)", priceAdd: 4, finishEffect: "velvet-matt" },
          { id: "matt", name: "سلوفان مطفي فاخر مضاد للبصمات (Matt Lamination)", priceAdd: 2, finishEffect: "standard-matt" },
          { id: "gloss", name: "سلوفان لامع عاكس للضوء (High Gloss Lamination)", priceAdd: 2, finishEffect: "gloss-shine" },
          { id: "anti-scratch", name: "سلوفان مصفح مضاد للخدش والتمزق (Anti-Scratch)", priceAdd: 6, finishEffect: "armored" },
        ],
      },
      {
        id: "embellishment",
        title: "4. المعالجة الفنية والتشطيب الذهبي (Luxury Finishing & Foil)",
        options: [
          { id: "gold-foil", name: "بصمة فويل ذهبي حراري للشعار (Gold Foil Stamping)", priceAdd: 8, foilColor: "#D4AF37", icon: "✨" },
          { id: "silver-foil", name: "بصمة فويل فضي ليزري بارد (Silver Laser Foil)", priceAdd: 7, foilColor: "#C0C0C0", icon: "❄️" },
          { id: "spot-uv", name: "سبوت UV بارز وملمع على مناطق محددة (Raised Spot UV)", priceAdd: 6, foilColor: "#00E5FF", icon: "💧" },
          { id: "emboss", name: "كوفراج حفر بارز بدون لون (Blind Debossing/Embossing)", priceAdd: 5, foilColor: "#888888", icon: "🪨" },
          { id: "none", name: "طباعة عادية بدون معالجات بارزة", priceAdd: 0, foilColor: "transparent", icon: "📄" },
        ],
      },
      {
        id: "insert",
        title: "5. الحشوة والتقسيم الداخلي (Interior Cushion & Foam)",
        options: [
          { id: "eva-velvet", name: "إسفنج EVA ليزري مقصوص مع طبقة قطيفة مخملية", priceAdd: 14, insertColor: "#1A1A1A", icon: "🛋️" },
          { id: "cardboard-divider", name: "قواطع كرتون مقواة مقسمة لخانات (Cardboard Grid)", priceAdd: 4, insertColor: "#E5E5E5", icon: "📐" },
          { id: "satin-cloth", name: "قماش ستان حريري مموج فاخر (Satin Drape)", priceAdd: 10, insertColor: "#D4AF37", icon: "🧣" },
          { id: "no-insert", name: "بدون حشوة داخلية (علبة فارغة)", priceAdd: 0, insertColor: "transparent", icon: "🔲" },
        ],
      },
    ],
  },
];

export type VPCConfiguratorPreset = (typeof vpcConfiguratorPresets)[number];
