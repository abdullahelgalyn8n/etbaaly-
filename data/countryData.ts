import { CountryConfig } from "./countries/types";
import { egConfig } from "./countries/northAfrica";
import { gccGroup1 } from "./countries/gccGroup1";
import { gccGroup2 } from "./countries/gccGroup2";

export * from "./countries/types";

export const COUNTRIES: Record<string, CountryConfig> = {
  ...egConfig,
  ...gccGroup1,
  ...gccGroup2,
};

export const DEFAULT_COUNTRY_CODE = "EG";
