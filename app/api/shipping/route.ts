import { NextRequest, NextResponse } from "next/server";

export const egyptianGovernorates = [
  { id: "cairo", name: "القاهرة الكبرى (القاهرة، الجيزة، القليوبية)", standardCost: 65, expressCost: 120, standardDays: "24-48 ساعة", expressDays: "نفس اليوم / 24 ساعة" },
  { id: "alex", name: "الإسكندرية والبحيرة", standardCost: 85, expressCost: 160, standardDays: "2-3 أيام", expressDays: "خلال 24-36 ساعة" },
  { id: "delta", name: "محافظات الدلتا (المنوفية، الغربية، الدقهلية، الشرقية، كفر الشيخ)", standardCost: 85, expressCost: 170, standardDays: "2-3 أيام", expressDays: "خلال 48 ساعة" },
  { id: "canal", name: "مدن القناة (السويس، الإسماعيلية، بورسعيد)", standardCost: 95, expressCost: 180, standardDays: "2-3 أيام", expressDays: "خلال 48 ساعة" },
  { id: "upper_north", name: "شمال الصعيد (الفيوم، بني سويف، المنيا)", standardCost: 110, expressCost: 210, standardDays: "3-4 أيام", expressDays: "خلال 48-72 ساعة" },
  { id: "upper_south", name: "وسط وجنوب الصعيد (أسيوط، سوهاج، قنا، الأقصر، أسوان)", standardCost: 140, expressCost: 260, standardDays: "3-5 أيام", expressDays: "خلال 3-4 أيام" },
  { id: "red_sea_sinai", name: "المحافظات الحدودية (البحر الأحمر، جنوب وشمال سيناء، مطروح)", standardCost: 170, expressCost: 320, standardDays: "4-6 أيام", expressDays: "خلال 3-5 أيام" },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    governorates: egyptianGovernorates,
    freeShippingThreshold: 3500, // Free shipping above 3500 EGP for business orders
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { governorateId, weightKg = 2, totalAmount = 0, speed = "standard" } = body;

    const gov = egyptianGovernorates.find((g) => g.id === governorateId) || egyptianGovernorates[0];

    let baseCost = speed === "express" ? gov.expressCost : gov.standardCost;
    let extraWeightCost = 0;

    // Weight penalty for heavy print batches (over 5kg)
    if (weightKg > 5) {
      extraWeightCost = Math.ceil(weightKg - 5) * 8;
    }

    let finalCost = baseCost + extraWeightCost;
    let isFreeShipping = false;

    if (totalAmount >= 3500 && speed === "standard") {
      finalCost = 0;
      isFreeShipping = true;
    }

    return NextResponse.json({
      success: true,
      governorate: gov.name,
      speed,
      deliveryDays: speed === "express" ? gov.expressDays : gov.standardDays,
      shippingCost: finalCost,
      isFreeShipping,
      breakdown: {
        baseCost,
        extraWeightCost,
        weightKg,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "فشل حساب مصاريف الشحن." }, { status: 500 });
  }
}
