export interface ProductMaterial {
  id: string;
  name: string;
  multiplier: number;
}

export interface ProductFinish {
  id: string;
  name: string;
  addPerUnit: number;
}

export interface ProductPreset {
  id: string;
  name: string;
  category: string;
  basePricePerUnit: number;
  minQty: number;
  materials: ProductMaterial[];
  finishes: ProductFinish[];
  turnaround: string;
}

export const productPresets: ProductPreset[] = [
  {
    id: "business-cards",
    name: "كروت شخصية وبيزنس كاردز فاخرة",
    category: "مطبوعات مكتبية",
    basePricePerUnit: 1.2,
    minQty: 500,
    materials: [
      { id: "c1", name: "كوشيه فاخر 350 جم", multiplier: 1.0 },
      { id: "c2", name: "كوشيه سميك 400 جم مستورد", multiplier: 1.25 },
      { id: "c3", name: "ورق كرافت طبيعي 300 جم", multiplier: 1.15 },
      { id: "c4", name: "ورق لؤلؤي بيرل فاخر 300 جم", multiplier: 1.5 },
    ],
    finishes: [
      { id: "f0", name: "بدون سلوفان (طباعة فقط)", addPerUnit: 0 },
      { id: "f1", name: "سلوفان مطفي فاخر وجهين", addPerUnit: 0.25 },
      { id: "f2", name: "سلوفان مخملي Soft-Touch وجهين", addPerUnit: 0.55 },
      { id: "f3", name: "سلوفان مط + سبوت UV ملمع على الشعار", addPerUnit: 0.85 },
      { id: "f4", name: "سلوفان مط + بصمة ذهبية / فضية حرارية", addPerUnit: 1.1 },
    ],
    turnaround: "24 - 48 ساعة",
  },
  {
    id: "packaging-boxes",
    name: "علب كرتون وتغليف منتجات (Custom Packaging)",
    category: "علب وتغليف",
    basePricePerUnit: 6.5,
    minQty: 1000,
    materials: [
      { id: "p1", name: "كرتون دوبلكس مقوى 350 جم", multiplier: 1.0 },
      { id: "p2", name: "كرتون سوليد فاخر (SBS) 400 جم", multiplier: 1.35 },
      { id: "p3", name: "كرتون كرافت بني معاد تدويره 350 جم", multiplier: 1.15 },
      { id: "p4", name: "كرتون مضلع E-Flute للشحن المقوى", multiplier: 1.5 },
    ],
    finishes: [
      { id: "f1", name: "سلوفان مطفي + تكسير سكينة", addPerUnit: 0.8 },
      { id: "f2", name: "سلوفان لامع + تكسير سكينة", addPerUnit: 0.75 },
      { id: "f3", name: "سلوفان مط + سبوت UV ملمع + سكينة", addPerUnit: 1.4 },
      { id: "f4", name: "سلوفان مط + بصمة فويل ذهبي + سبوت UV", addPerUnit: 2.2 },
    ],
    turnaround: "3 - 5 أيام عمل",
  },
  {
    id: "paper-bags",
    name: "أكياس ورقية فاخرة ومطبوعة للعلامات التجارية",
    category: "أكياس وتغليف",
    basePricePerUnit: 5.0,
    minQty: 500,
    materials: [
      { id: "b1", name: "كوشيه 250 جم مع شريط يد ستان", multiplier: 1.0 },
      { id: "b2", name: "كوشيه 300 جم فخم مقوى", multiplier: 1.2 },
      { id: "b3", name: "كرافت بني طبيعي مع يد قطن مجدولة", multiplier: 0.95 },
      { id: "b4", name: "كرافت أبيض مستورد عالي التحمل", multiplier: 1.1 },
    ],
    finishes: [
      { id: "f1", name: "سلوفان مطفي + يد حبل قطن مبروم", addPerUnit: 0.6 },
      { id: "f2", name: "سلوفان مط + شريط ستان فاخر عريض", addPerUnit: 1.1 },
      { id: "f3", name: "سلوفان مط + بصمة فويل ذهبي للشعار", addPerUnit: 1.7 },
    ],
    turnaround: "3 - 4 أيام عمل",
  },
  {
    id: "stickers-labels",
    name: "ستيكرات وليبل مقصوص داي-كت (Labels & Stickers)",
    category: "ستيكر ومطبوعات",
    basePricePerUnit: 0.45,
    minQty: 1000,
    materials: [
      { id: "s1", name: "ستيكر ورق كوشيه لاصق قوي", multiplier: 1.0 },
      { id: "s2", name: "ستيكر بلاستيك فينيل ضد الماء والتمزق", multiplier: 1.4 },
      { id: "s3", name: "ستيكر شفاف Transparent مقاوم للرطوبة", multiplier: 1.55 },
      { id: "s4", name: "ستيكر هولوجرام أمان ضد التزييف", multiplier: 2.1 },
    ],
    finishes: [
      { id: "f0", name: "قص مربع / مستطيل عادي", addPerUnit: 0.05 },
      { id: "f1", name: "قص داي-كت كاستم مع سلوفان مطفي", addPerUnit: 0.18 },
      { id: "f2", name: "قص داي-كت كاستم مع سلوفان لامع", addPerUnit: 0.16 },
      { id: "f3", name: "قص داي-كت + بصمة فويل ذهبي لامع", addPerUnit: 0.4 },
    ],
    turnaround: "24 - 48 ساعة",
  },
  {
    id: "company-profiles",
    name: "بروفايل شركات وكتالوجات منتجات (Brochures)",
    category: "مطبوعات تسويقية",
    basePricePerUnit: 18.0,
    minQty: 100,
    materials: [
      { id: "cp1", name: "8 صفحات داخلية كوشيه 170جم + غلاف 350جم", multiplier: 1.0 },
      { id: "cp2", name: "16 صفحة داخلية كوشيه 170جم + غلاف 350جم", multiplier: 1.75 },
      { id: "cp3", name: "24 صفحة داخلية كوشيه 170جم + غلاف 350جم", multiplier: 2.45 },
      { id: "cp4", name: "32 صفحة داخلية كوشيه 170جم + غلاف هارد كفر", multiplier: 3.4 },
    ],
    finishes: [
      { id: "f1", name: "سلوفان مط للغلاف + تجليد دبوسين", addPerUnit: 1.5 },
      { id: "f2", name: "سلوفان مط للغلاف + سبوت UV للشعار + دبوس", addPerUnit: 3.2 },
      { id: "f3", name: "سلوفان مط + بصمة ذهبية + خياطة كعب فاخرة", addPerUnit: 5.5 },
    ],
    turnaround: "48 - 72 ساعة",
  },
];
