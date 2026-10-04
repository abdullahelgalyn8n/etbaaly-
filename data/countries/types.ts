export interface CountryConfig {
  code: "EG" | "SA" | "AE" | "KW" | "QA" | "OM" | "BH" | "GLOBAL";
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  paymentMethods: string[];
  bannerOffer: {
    title: string;
    badge: string;
    discount: string;
    description: string;
  };
  pricingPackages: {
    id: string;
    name: string;
    targetAudience: string;
    price: string;
    period: string;
    popular?: boolean;
    features: string[];
    ctaText: string;
    whatsappMessage: string;
  }[];
}
