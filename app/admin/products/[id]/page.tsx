import React from "react";
import { notFound } from "next/navigation";
import VisualProductConfiguratorStudio from "@/components/VisualProductConfiguratorStudio";
import { getAdminProducts, getConfiguratorByProductId } from "@/lib/db";

export const metadata = {
  title: "استوديو تخصيص وتعديل المنتج | لوحة تحكم إطبعلي",
  description: "استوديو احترافي لتجهيز وضبط طبقات وصور وزوايا المنتجات.",
};

export default async function EditProductPage({
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
