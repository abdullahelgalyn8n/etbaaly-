import { NextResponse } from "next/server";
import {
  getVisualConfigurators,
  saveVisualConfigurator,
  deleteVisualConfigurator,
  getAdminProducts,
  saveAdminProduct,
  getConfiguratorByProductId,
} from "@/lib/db";
import { guardAdminRoute } from "@/lib/auth/adminGuard";

export async function GET(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const productId = searchParams.get("productId");

    if (productId) {
      const config = await getConfiguratorByProductId(productId);
      return NextResponse.json({ success: true, configurator: config });
    }

    if (id) {
      const config = await getConfiguratorByProductId(id);
      return NextResponse.json({ success: true, configurator: config });
    }

    // Return all configurators with linked products data
    const configurators = await getVisualConfigurators();
    const products = await getAdminProducts("all");
    const enhanced = configurators.map((c) => {
      const prod = products.find((p) => p.id === c.productId || p.slug === c.productId);
      return {
        ...c,
        productTitle: prod?.title || "منتج غير مرتبط",
        productBasePrice: prod?.basePrice || c.basePrice || 0,
        productCategory: prod?.category || "عام",
      };
    });

    return NextResponse.json({
      success: true,
      configurators: enhanced,
    });
  } catch (err: any) {
    console.error("Error fetching configurators:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء جلب بيانات المهيئات." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const body = await request.json();
    const {
      id,
      name,
      productId,
      style,
      canvasWidth,
      canvasHeight,
      basePrice,
      views,
      groups,
      hotspots,
      responsibleViewThumbnail,
      chooseForm,
      contactForm,
      loadConfiguratorIn,
      configuratorTemplate,
      description,
      viewBackground,
      showDetailsPage,
      customCss,
      customJs,
      wooProductData,
    } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "اسم المهيئ مطلوب." },
        { status: 400 }
      );
    }

    let linkedProductId = productId;

    // If new product is to be created simultaneously
    if (wooProductData && (!productId || productId === "create_new")) {
      const newProd = await saveAdminProduct({
        id: `prod-${Date.now()}`,
        title: wooProductData.title || name,
        category: wooProductData.category || "علب وتغليف",
        basePrice: Number(wooProductData.basePrice || basePrice) || 100,
        description: wooProductData.description || `منتج مجهز بمهيئ بصري: ${name}`,
        turnaround: wooProductData.turnaround || "24 - 48 ساعة",
        badge: wooProductData.badge || "تخصيص تفاعلي ⭐",
        status: "published",
        printAreaLabel: "مساحة التخصيص البصري",
      });
      linkedProductId = newProd.id;
    }

    const saved = await saveVisualConfigurator({
      id,
      name,
      productId: linkedProductId || "prod-default",
      style: style || "style1",
      canvasWidth: Number(canvasWidth) || 1000,
      canvasHeight: Number(canvasHeight) || 1000,
      basePrice: basePrice !== undefined ? Number(basePrice) : undefined,
      views: views || [{ id: "v-front", name: "أمامية (Front)", canvasWidth: 1000, canvasHeight: 1000 }],
      groups: groups || [],
      hotspots: hotspots || [],
      responsibleViewThumbnail,
      chooseForm,
      contactForm,
      loadConfiguratorIn,
      configuratorTemplate,
      description,
      viewBackground,
      showDetailsPage,
      customCss,
      customJs,
    });

    // Automatically sync updates back to linked AdminProduct
    if (linkedProductId && linkedProductId !== "create_new" && linkedProductId !== "prod-default") {
      try {
        const allProducts = await getAdminProducts("all");
        const existingProd = allProducts.find((p) => p.id === linkedProductId || p.slug === linkedProductId);
        if (existingProd) {
          const colorGroup = (groups || []).find((g: any) => g.controlType === "color");
          let updatedColors = existingProd.colors;
          if (colorGroup && colorGroup.options && colorGroup.options.length > 0) {
            const colorMap = new Map<string, any>();
            colorGroup.options.forEach((opt: any) => {
              const key = opt.colorHex || opt.name;
              if (!colorMap.has(key)) {
                colorMap.set(key, {
                  id: opt.id?.replace(/^opt-/, "c-") || `c-${Date.now()}`,
                  name: opt.name,
                  hex: opt.colorHex || "#FFFFFF",
                  priceAdd: Number(opt.priceAdd) || 0,
                  mockupOverlay: opt.imageUrl || opt.colorHex || "#FFFFFF",
                  bgStyle: `linear-gradient(135deg, #FFFFFF 65%, ${opt.colorHex || "#FFFFFF"} 100%)`,
                  images: opt.imageUrl ? [opt.imageUrl] : [],
                });
              } else {
                const item = colorMap.get(key);
                if (opt.imageUrl && !item.images.includes(opt.imageUrl)) {
                  item.images.push(opt.imageUrl);
                }
              }
            });
            updatedColors = Array.from(colorMap.values());
          }

          const firstColorImg = updatedColors?.[0]?.images?.[0] || updatedColors?.[0]?.mockupOverlay;

          await saveAdminProduct({
            ...existingProd,
            title: name || existingProd.title,
            basePrice: basePrice !== undefined ? Number(basePrice) : existingProd.basePrice,
            description: description || existingProd.description,
            colors: updatedColors,
            image: firstColorImg?.startsWith("/") ? firstColorImg : (existingProd as any).image,
          });
        }
      } catch (syncErr) {
        console.error("Configurator product sync error:", syncErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ وتجهيز المهيئ البصري ومزامنة بيانات المنتج بنجاح!",
      configurator: saved,
    });
  } catch (err: any) {
    console.error("Error saving configurator:", err);
    return NextResponse.json(
      { success: false, error: "تعذر حفظ إعدادات المهيئ." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const guard = guardAdminRoute(request);
  if (guard) return guard;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "معرّف المهيئ (ID) مطلوب للحذف." },
        { status: 400 }
      );
    }

    await deleteVisualConfigurator(id);
    return NextResponse.json({
      success: true,
      message: "تم حذف المهيئ بنجاح.",
    });
  } catch (err: any) {
    console.error("Error deleting configurator:", err);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء حذف المهيئ." },
      { status: 500 }
    );
  }
}
