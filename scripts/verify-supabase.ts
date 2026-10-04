import { getAdminProducts, getOrderByTrackingCode, createOrder, getDb } from "../lib/db";

async function verifyAll() {
  console.log("--- 1. Testing getDb() ---");
  const { isLive, sql } = getDb();
  console.log("DB isLive:", isLive);

  console.log("\n--- 2. Testing getAdminProducts() from Supabase ---");
  const products = await getAdminProducts("all");
  console.log(`Fetched ${products.length} products from Supabase!`);
  if (products.length > 0) {
    console.log("Sample product:", products[0].title, "(Price:", products[0].basePrice, "EGP)");
  }

  console.log("\n--- 3. Testing getOrderByTrackingCode() from Supabase ---");
  const order = await getOrderByTrackingCode("ETB-8841");
  console.log("Fetched order ETB-8841:", order?.customer_name, "-", order?.product_name, "-", order?.total_price, "EGP");

  console.log("\n--- 4. Testing createOrder() in Supabase ---");
  const newOrder = await createOrder({
    customer_name: "م. عبد الله الجالي",
    customer_phone: "01022598473",
    customer_email: "abdullah@azagency.online",
    service_type: "طباعة علب وتغليف فاخر",
    product_name: "بوكس هدايا كاستم مع سلوفان مخملي",
    quantity: 100,
    unit_price: 50,
    total_price: 5000,
    shipping_address: "المقر الرئيسي - القاهرة",
  });
  console.log("New order created with code:", newOrder.tracking_code);

  const verifyOrder = await getOrderByTrackingCode(newOrder.tracking_code);
  console.log("Retrieved created order from Supabase:", verifyOrder?.customer_name, "-", verifyOrder?.total_price, "EGP");

  console.log("\n--- 5. Clean up test order ---");
  if (sql) {
    await sql`DELETE FROM orders WHERE tracking_code = ${newOrder.tracking_code}`;
    console.log("Test order cleaned up successfully.");
  }

  console.log("\n>>> ALL TESTS COMPLETED SUCCESSFULLY! <<<");
}

verifyAll().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
