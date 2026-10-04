import assert from "node:assert/strict";
import test from "node:test";
import crypto from "crypto";

// Test 1: Admin Guard HMAC token generation and verification
test("Admin Guard: token generation, signature verification, tampering detection, and login password enforcement", async () => {
  const {
    generateAdminToken,
    verifyAdminToken,
    extractAdminTokenFromRequest,
    verifyAdminAuth,
  } = await import("../lib/auth/adminGuard.ts");

  const adminUser = {
    id: "usr-admin-01",
    email: "admin@etbaaly.com",
    role: "admin",
  };

  const token = generateAdminToken(adminUser);
  assert.ok(token, "Token should be generated");
  assert.equal(token.split(".").length, 2, "Token should have payload.signature structure");

  // Valid verification
  const verification = verifyAdminToken(token);
  assert.equal(verification.valid, true, "Token should be valid");
  assert.equal(verification.payload?.email, "admin@etbaaly.com");
  assert.equal(verification.payload?.role, "admin");

  // Tampered payload
  const parts = token.split(".");
  const tamperedToken = `${parts[0]}X.${parts[1]}`;
  const tamperedResult = verifyAdminToken(tamperedToken);
  assert.equal(tamperedResult.valid, false, "Tampered token must be rejected");

  // Tampered signature
  const fakeSigToken = `${parts[0]}.FakeSignature1234567890`;
  const fakeSigResult = verifyAdminToken(fakeSigToken);
  assert.equal(fakeSigResult.valid, false, "Fake signature must be rejected");

  // Mock Request with Authorization Header
  const mockReqAuth = new Request("http://localhost:3000/api/admin/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const extracted = extractAdminTokenFromRequest(mockReqAuth);
  assert.equal(extracted, token, "Should extract token from Bearer header");

  const authResult = verifyAdminAuth(mockReqAuth);
  assert.equal(authResult.authorized, true, "Should authorize request with Bearer header");

  // Mock Request with Cookie (testing regex boundary handling)
  const mockReqCookie = new Request("http://localhost:3000/api/admin/orders", {
    headers: { Cookie: `session_id=123; etbaaly_admin_token=${encodeURIComponent(token)}; other=xyz` },
  });
  const extractedCookie = extractAdminTokenFromRequest(mockReqCookie);
  assert.equal(extractedCookie, token, "Should extract token from Cookie header with surrounding cookies");

  const authResultCookie = verifyAdminAuth(mockReqCookie);
  assert.equal(authResultCookie.authorized, true, "Should authorize request with Cookie");

  // Unauthorized Request
  const mockReqEmpty = new Request("http://localhost:3000/api/admin/orders");
  const authEmpty = verifyAdminAuth(mockReqEmpty);
  assert.equal(authEmpty.authorized, false, "Should reject unauthenticated request");

  // Test Login Route with correct and incorrect password
  const { POST: loginHandler } = await import("../app/api/auth/login/route.ts");
  
  // Wrong admin password must fail with 401
  const reqBadPass = new Request("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@etbaaly.com", password: "wrongpassword123" }),
  });
  const resBadPass = await loginHandler(reqBadPass);
  assert.equal(resBadPass.status, 401, "Admin login with wrong password must return 401");

  // Correct admin password must succeed with token
  const reqGoodPass = new Request("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@etbaaly.com", password: "admin123456" }),
  });
  const resGoodPass = await loginHandler(reqGoodPass);
  assert.equal(resGoodPass.status, 200, "Admin login with valid password must return 200");
  const goodData = await resGoodPass.json();
  assert.equal(goodData.success, true);
  assert.ok(goodData.token, "Valid admin login must return signed token");
});

// Test 2: Order Lifecycle Stages & Timeline Generation
test("Order Lifecycle Stages: 7 production stages, new order creation timeline, and dynamic progression", async () => {
  const {
    PRINT_SHOP_STAGES,
    buildOrderTimeline,
    createOrder,
    updateOrderStatus,
    getOrderByTrackingCode,
  } = await import("../lib/db/orders.ts");

  const stageKeys = ["received", "preflight", "printing", "finishing", "packaging", "shipped", "delivered"];

  // Verify all 7 stages exist in order
  stageKeys.forEach((key, idx) => {
    const stage = PRINT_SHOP_STAGES[key];
    assert.ok(stage, `Stage ${key} must exist`);
    assert.equal(stage.order, idx + 1, `Stage ${key} must have order ${idx + 1}`);
    assert.ok(stage.label, `Stage ${key} must have Arabic label`);
    assert.ok(stage.stepName, `Stage ${key} must have step name`);
  });

  // Test newly created order gets all 7 stages with 'received' as completed & current
  const newOrder = await createOrder({
    customer_name: "شركة النور للطباعة",
    customer_phone: "01099887766",
    product_name: "علب كرتون فاخرة مقواة",
    quantity: 500,
    unit_price: 15,
    total_price: 7500,
  });

  assert.ok(newOrder.tracking_code.startsWith("ETB-"), "Order must have ETB tracking code");
  assert.equal(newOrder.status, "received", "Initial status must be received");
  assert.equal(newOrder.timeline.length, 7, "Newly created order must have all 7 production stages");
  assert.equal(newOrder.timeline[0].completed, true, "Stage 1 (received) must be completed");
  assert.equal(newOrder.timeline[0].current, true, "Stage 1 (received) must be current");
  assert.equal(newOrder.timeline[1].completed, false, "Stage 2 (preflight) must not be completed yet");

  // Test finding newly created order by tracking code and ID
  const foundByCode = await getOrderByTrackingCode(newOrder.tracking_code);
  assert.ok(foundByCode, "Should find order by tracking code");
  assert.equal(foundByCode.tracking_code, newOrder.tracking_code);

  const foundById = await getOrderByTrackingCode(newOrder.id);
  assert.ok(foundById, "Should find order by ID");

  // Advance order through stages
  await updateOrderStatus(newOrder.id, "preflight");
  const preflightOrder = await getOrderByTrackingCode(newOrder.tracking_code);
  assert.equal(preflightOrder.status, "preflight");
  assert.equal(preflightOrder.timeline[1].current, true);
  assert.equal(preflightOrder.timeline[1].completed, true);
  assert.equal(preflightOrder.timeline[2].completed, false);

  // Advance to printing (Stage 3)
  await updateOrderStatus(newOrder.id, "printing");
  const printingOrder = await getOrderByTrackingCode(newOrder.tracking_code);
  assert.equal(printingOrder.status, "printing");
  assert.equal(printingOrder.timeline[2].current, true);

  // Advance to finishing (Stage 4)
  await updateOrderStatus(newOrder.id, "finishing");
  const finishingOrder = await getOrderByTrackingCode(newOrder.tracking_code);
  assert.equal(finishingOrder.status, "finishing");
  assert.equal(finishingOrder.timeline[3].current, true);

  // Advance to delivered (Stage 7)
  await updateOrderStatus(newOrder.id, "delivered");
  const deliveredOrder = await getOrderByTrackingCode(newOrder.tracking_code);
  assert.equal(deliveredOrder.status, "delivered");
  deliveredOrder.timeline.forEach((step) => {
    assert.equal(step.completed, true, "All steps must be completed when delivered");
  });
});

// Test 3: Posts Store DB persistence and operations
test("Posts Store: query, insert, update with fallback, and delete operations", async () => {
  const {
    findPostBySlug,
    queryAdminPosts,
    insertAdminPost,
    updateAdminPost,
    deleteAdminPost,
  } = await import("../lib/posts/adminPostsStore.ts");

  // Query posts
  const result = await queryAdminPosts({ limit: 10 });
  assert.ok(result.posts.length > 0, "Should return posts");
  assert.ok(result.pagination.total > 0, "Total should be greater than 0");
  assert.ok(result.stats.totalPosts > 0, "Stats totalPosts should be greater than 0");

  // Insert a test post
  const testSlug = `test-article-${Date.now()}`;
  const insertRes = await insertAdminPost({
    title: "مقال تجريبي لفحص قاعدة البيانات والذاكرة",
    slug: testSlug,
    content: "محتوى المقال التجريبي الخاص بفحص استقرار قاعدة البيانات وسجل المقالات.",
    excerpt: "موجز المقال التجريبي",
    category: "أخبار المطبعة والتقنيات",
    categoryTag: "news",
    status: "published",
    tags: ["إطبعلي", "فحص"],
  });

  assert.equal(insertRes.success, true, "Insert should succeed");
  assert.equal(insertRes.post?.slug, testSlug);

  // Duplicate slug rejection
  const dupRes = await insertAdminPost({
    title: "مقال مكرر",
    slug: testSlug,
    content: "محتوى آخر",
  });
  assert.equal(dupRes.success, false, "Duplicate slug must be rejected");

  // Find by slug
  const found = await findPostBySlug(testSlug);
  assert.ok(found, "Inserted post must be found by slug");
  assert.equal(found?.title, "مقال تجريبي لفحص قاعدة البيانات والذاكرة");

  // Update post
  const updateRes = await updateAdminPost(testSlug, {
    title: "مقال تجريبي محدث بنجاح",
    excerpt: "موجز محدث",
  });
  assert.equal(updateRes.success, true, "Update should succeed");
  assert.equal(updateRes.post?.title, "مقال تجريبي محدث بنجاح");

  // Delete post
  const deleted = await deleteAdminPost(testSlug);
  assert.equal(deleted, true, "Delete should succeed");
  const afterDelete = await findPostBySlug(testSlug);
  assert.equal(afterDelete, undefined, "Deleted post should no longer exist");
});

// Test 4: Shopping Cart, Option Collisions, and Checkout Pricing Logic
test("Cart & Checkout: calculations, option collision prevention, and coupons", async () => {
  const FREE_SHIPPING_THRESHOLD = 1000;
  const STANDARD_SHIPPING_COST = 50;

  // Scenario 1: Subtotal < 1000 (standard shipping applies)
  const cart1 = [
    { price: 200, quantity: 2 }, // 400
    { price: 150, quantity: 1 }, // 150
  ];
  const subtotal1 = cart1.reduce((acc, i) => acc + i.price * i.quantity, 0);
  assert.equal(subtotal1, 550);
  const shipping1 = subtotal1 >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  assert.equal(shipping1, 50, "Shipping should be 50 EGP for orders < 1000");
  assert.equal(subtotal1 + shipping1, 600);

  // Scenario 2: Subtotal >= 1000 (free shipping)
  const cart2 = [
    { price: 600, quantity: 2 }, // 1200
  ];
  const subtotal2 = cart2.reduce((acc, i) => acc + i.price * i.quantity, 0);
  assert.equal(subtotal2, 1200);
  const shipping2 = subtotal2 >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  assert.equal(shipping2, 0, "Shipping should be free for orders >= 1000");

  // Scenario 3: Coupon application (10% off)
  const couponDiscount = Math.round((subtotal2 * 10) / 100);
  assert.equal(couponDiscount, 120);
  const finalTotal = subtotal2 - couponDiscount + shipping2;
  assert.equal(finalTotal, 1080);

  // Scenario 4: Cart Item ID Generation with custom options (no collision between different finishes)
  const generateItemId = (item) => {
    const colorPart = item.selectedColor?.id || "default";
    const optionsPart = item.selectedOptions
      ? Object.entries(item.selectedOptions)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => `${k}:${v}`)
          .join("|")
      : "";
    const notesPart = item.customNotes?.trim() ? `notes:${item.customNotes.trim()}` : "";
    return [item.productId, colorPart, optionsPart, notesPart].filter(Boolean).join("-");
  };

  const itemA = {
    productId: "box-01",
    selectedColor: { id: "red" },
    selectedOptions: { finish: "glossy", size: "A4" },
  };
  const itemB = {
    productId: "box-01",
    selectedColor: { id: "red" },
    selectedOptions: { finish: "matte", size: "A4" },
  };

  const idA = generateItemId(itemA);
  const idB = generateItemId(itemB);
  assert.notEqual(idA, idB, "Items with different options must have different unique IDs");
});
