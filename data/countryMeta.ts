export interface CountryMeta {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  phoneCode: string;
}

export const COUNTRY_META: Record<string, CountryMeta> = {
  EG: {
    code: "EG",
    name: "مصر",
    flag: "🇪🇬",
    currency: "EGP",
    currencySymbol: "ج.م",
    phoneCode: "+20",
  },
  SA: {
    code: "SA",
    name: "السعودية",
    flag: "🇸🇦",
    currency: "SAR",
    currencySymbol: "ر.س",
    phoneCode: "+966",
  },
  AE: {
    code: "AE",
    name: "الإمارات",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "د.إ",
    phoneCode: "+971",
  },
  KW: {
    code: "KW",
    name: "الكويت",
    flag: "🇰🇼",
    currency: "KWD",
    currencySymbol: "د.ك",
    phoneCode: "+965",
  },
  QA: {
    code: "QA",
    name: "قطر",
    flag: "🇶🇦",
    currency: "QAR",
    currencySymbol: "ر.ق",
    phoneCode: "+974",
  },
  OM: {
    code: "OM",
    name: "عُمان",
    flag: "🇴🇲",
    currency: "OMR",
    currencySymbol: "ر.ع",
    phoneCode: "+968",
  },
  BH: {
    code: "BH",
    name: "البحرين",
    flag: "🇧🇭",
    currency: "BHD",
    currencySymbol: "د.ب",
    phoneCode: "+973",
  },
  GLOBAL: {
    code: "GLOBAL",
    name: "دولي / Global",
    flag: "🌐",
    currency: "USD",
    currencySymbol: "$",
    phoneCode: "+20",
  },
};

export const DEFAULT_COUNTRY_CODE = "EG";
