import React from "react";
import { notFound } from "next/navigation";
import VisualProductConfiguratorStudio from "@/components/VisualProductConfiguratorStudio";
import { getConfiguratorByProductId, getAdminProducts } from "@/lib/db";

export const metadata = {
  title: "استوديو المهيئ التفاعلي المتقدم | لوحة تحكم إطبعلي",
};

export default async function ProductStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await getAdminProducts("all");
  const product = products.find((p) => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  const configurator = await getConfiguratorByProductId(product.id);
  return <VisualProductConfiguratorStudio initialConfigurator={configurator} />;
}
