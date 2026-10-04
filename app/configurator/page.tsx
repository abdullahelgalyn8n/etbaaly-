import { redirect } from "next/navigation";
import { getAdminProducts } from "@/lib/db";

export default async function CustomerConfiguratorPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; productId?: string; product?: string }>;
}) {
  const params = await searchParams;
  const targetId = params.productId || params.product || params.id;
  if (targetId) {
    const products = await getAdminProducts("all");
    const found = products.find(
      (p) => p.id === targetId || p.slug === targetId || `cfg-${p.id}` === targetId
    );
    if (found) {
      redirect(`/products/${found.slug || found.id}/`);
    }
  }
  redirect("/products/");
}
