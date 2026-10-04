export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  image: string;
  result: string;
  description: string;
  tags: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  quantityRange: string;
  pricePerUnit: string;
  totalEstimate?: string;
  fabricSpecs: string;
  printTechnique: string;
  features: string[];
  turnaround: string;
  ctaText?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  categoryTag: string;
  tags: string[];
  features: string[];
  metrics: string;
  deliverables: string[];
  fullOverview: string;
  workflowSteps: { step: string; title: string; desc: string }[];
  portfolio: PortfolioItem[];
  packages?: ServicePackage[];
}

export type Service = ServiceItem;
export type WorkflowStep = { step: string; title: string; desc: string };
