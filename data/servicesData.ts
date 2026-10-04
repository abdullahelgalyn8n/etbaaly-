import { servicesPart1 } from "./services/servicesPart1";
import { servicesPart2 } from "./services/servicesPart2";
import { ServiceItem } from "./services/types";

export * from "./services/types";
export const servicesData: ServiceItem[] = [...servicesPart1, ...servicesPart2];
