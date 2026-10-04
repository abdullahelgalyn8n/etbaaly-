export interface TimelineStep {
  step: string;
  date: string;
  completed: boolean;
  current?: boolean;
  desc?: string;
}

export interface OrderData {
  id: string;
  tracking_code: string;
  user_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  service_type: string;
  product_name: string;
  specs: Record<string, string>;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: string;
  status_label: string;
  shipping_address: string;
  shipping_city: string;
  shipping_method: string;
  estimated_delivery: string;
  courier_name: string;
  courier_phone: string;
  timeline: TimelineStep[];
  notes?: string;
  isDemo?: boolean;
}

export { demoSimulationOrders, demoCodes } from "./demoOrders";
