import { getDb, inMemoryStore } from "./client";
import { createAdminNotification } from "./notifications";

export async function saveUserCustomization(customData: any) {
  const customId = `cst-${Date.now()}`;
  const record = {
    id: customId,
    template_id: customData.template_id,
    template_title: customData.template_title,
    selected_color_name: customData.selected_color_name,
    selected_color_hex: customData.selected_color_hex,
    uploaded_image_preview: customData.uploaded_image_preview,
    custom_text: customData.custom_text || "",
    quantity: customData.quantity || 1,
    unit_price: customData.unit_price,
    total_price: customData.total_price,
    created_at: new Date().toISOString(),
  };

  const { isLive, sql } = getDb();
  if (isLive && sql) {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS user_customizations (
          id VARCHAR(64) PRIMARY KEY,
          template_id VARCHAR(64),
          template_title VARCHAR(255),
          selected_color_name VARCHAR(100),
          selected_color_hex VARCHAR(50),
          uploaded_image_preview TEXT,
          custom_text TEXT,
          quantity INTEGER,
          unit_price NUMERIC(10, 2),
          total_price NUMERIC(12, 2),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        INSERT INTO user_customizations (id, template_id, template_title, selected_color_name, selected_color_hex, uploaded_image_preview, custom_text, quantity, unit_price, total_price)
        VALUES (${record.id}, ${record.template_id}, ${record.template_title}, ${record.selected_color_name}, ${record.selected_color_hex}, ${record.uploaded_image_preview}, ${record.custom_text}, ${record.quantity}, ${record.unit_price}, ${record.total_price})
      `;
    } catch (err) {
      console.error("Error saving customization to Neon:", err);
    }
  }

  inMemoryStore.userCustomizations.unshift(record);
  return record;
}

export async function saveConfiguredProduct(configData: any) {
  const configId = `vpc-${Date.now()}`;
  const record = {
    id: configId,
    user_id: configData.user_id || "guest",
    preset_id: configData.preset_id,
    preset_title: configData.preset_title,
    selected_components: configData.selected_components,
    bill_of_materials: configData.bill_of_materials,
    unit_price: configData.unit_price,
    quantity: configData.quantity,
    total_price: configData.total_price,
    created_at: new Date().toISOString(),
  };
  inMemoryStore.configuredProducts.unshift(record);
  return record;
}

export async function saveUserDesign(designData: any) {
  const designId = `dsg-${Date.now()}`;
  const record = {
    id: designId,
    user_id: designData.user_id || "guest",
    product_id: designData.product_id,
    product_title: designData.product_title,
    selected_color: designData.selected_color,
    selected_size: designData.selected_size,
    canvas_state: designData.canvas_state,
    preview_url: designData.preview_url,
    created_at: new Date().toISOString(),
  };
  inMemoryStore.userDesigns.unshift(record);
  return record;
}

export async function createQuote(quoteData: any) {
  const quoteId = `q-${Date.now()}`;
  const record = {
    id: quoteId,
    ...quoteData,
    status: "pending_review",
    created_at: new Date().toISOString(),
  };
  inMemoryStore.quotes.unshift(record);

  try {
    await createAdminNotification({
      title: `طلب مقايسة B2B: ${quoteData.product_type || "مطبوعات وتغليف"}`,
      message: `طلب عرض أسعار من العميل "${quoteData.customer_name || "عميل تجاري"}" (هاتف: ${quoteData.phone || "غير محدد"}). الكمية المطلوبة: ${quoteData.quantity || "حسب العرض"}.`,
      type: "quote",
      priority: "urgent",
      link: "/admin?tab=quotes",
      metadata: {
        quoteId: record.id,
        customerName: quoteData.customer_name,
        phone: quoteData.phone,
        productType: quoteData.product_type,
        quantity: quoteData.quantity,
      },
    });
  } catch (err) {
    console.error("Failed to notify admin of new quote:", err);
  }

  return record;
}

export async function createSampleRequest(sampleData: any) {
  const sampleId = `smp-${Date.now()}`;
  const record = {
    id: sampleId,
    ...sampleData,
    status: "dispatched",
    created_at: new Date().toISOString(),
  };
  inMemoryStore.sampleRequests.unshift(record);

  try {
    await createAdminNotification({
      title: `طلب عينات مطبوعات: ${sampleData.company_name || sampleData.customer_name || "شركة"}`,
      message: `طلب بوكس عينات خامات لمطبعة إطبعلي موجه إلى ${sampleData.shipping_city || "القاهرة"} (هاتف: ${sampleData.phone || "غير محدد"}).`,
      type: "sample",
      priority: "medium",
      link: "/admin/orders",
      metadata: {
        sampleId: record.id,
        company: sampleData.company_name,
        phone: sampleData.phone,
        city: sampleData.shipping_city,
      },
    });
  } catch (err) {
    console.error("Failed to notify admin of sample request:", err);
  }

  return record;
}
