import React from "react";
import VisualProductConfiguratorStudio from "@/components/VisualProductConfiguratorStudio";
import { getConfiguratorByProductId } from "@/lib/db";

export const metadata = {
  title: "استوديو المهيئ البصري التفاعلي | لوحة تحكم إطبعلي",
  description: "استوديو احترافي لتجهيز وضبط طبقات المنتجات والمهيئات البصرية التفاعلية بدقة فندقية.",
};

export default async function AdminConfiguratorStudioPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; productId?: string }>;
}) {
  const params = await searchParams;
  const targetId = params.productId || params.id || "prod-packaging-rigid-box";
  const configurator = await getConfiguratorByProductId(targetId);

  return <VisualProductConfiguratorStudio initialConfigurator={configurator} />;
}
