import os
import json
import re

base_dir = "E:/SEO/عملاء/AZ/Etba3/website/public/images/stickermule"
output_file = "E:/SEO/عملاء/AZ/Etba3/website/lib/db/initialProductsStickerMule.ts"

meta_dict = {
    # Stickers (All 19 from Sticker Mule)
    '01_310_bumperstickers': ('استيكرات سيارات ومصدات (Bumper Stickers)', 'استيكرات فينيل سميكة مقاومة للعوامل الجوية، الشمس، والمياه ومصممة لمصدات وزجاج السيارات والشاحنات.', 15, 'فينيل خارجي 🚗', 'استيكرات', 'سيارات وزجاج وواجهات', 'cars-windows'),
    '02_315_vierkante-stickers': ('استيكرات مربعة كلاسيكية (Square Stickers)', 'استيكرات فينيل مربعة بزوايا 90 درجة حادة وطباعة ألوان ديجيتال كاملة وسلوفان حماية مط.', 8, 'مربع كلاسيك ⬛', 'استيكرات', 'أشكال هندسية وقياسية', 'shapes'),
    '03_316_ronde-stickers': ('استيكرات دائرية كلاسيكية (Circle Stickers)', 'استيكرات فينيل دائرية مقصوصة بدقة تامة مع طبقة عازلة مقاومة للماء والخدش، الأكثر انتشاراً للشعارات.', 8, 'دائري بريميوم ⚪', 'استيكرات', 'أشكال هندسية وقياسية', 'shapes'),
    '04_317_uitgesneden-stickers': ('استيكرات داي-كت مفرغة (Die-Cut Custom Stickers)', 'استيكرات مقصوصة بالمللي على مسار وحدود التصميم مع إطار أبيض جمالي وسهولة فك وسلخ استثنائية.', 10, 'الأكثر طلباً ⭐', 'استيكرات', 'قص مخصص وداي-كت', 'die-cut'),
    '05_318_rechthoekige-stickers': ('استيكرات مستطيلة للمنتجات (Rectangle Stickers)', 'استيكرات مستطيلة تناسب تغليف المنتجات، العلب، وأجهزة اللابتوب والتابلت والمطبوعات.', 8, 'مستطيل قياسي 🔲', 'استيكرات', 'أشكال هندسية وقياسية', 'shapes'),
    '06_319_ovale-stickers': ('استيكرات بيضاوية انسيابية (Oval Stickers)', 'استيكرات بيضاوية بتصميم جذاب للشعارات والعلامات التجارية والعبوات الزجاجية والبرطمانات.', 8, 'بيضاوي ناعم 🔘', 'استيكرات', 'أشكال هندسية وقياسية', 'shapes'),
    '07_320_stickers-ronde-hoek': ('استيكرات بزوايا دائرية (Rounded Corner Stickers)', 'استيكرات أنيقة بزوايا دائرية انسيابية تحمي الأطراف من التقشر أو التلف مع الاستخدام اليومي.', 8, 'زوايا ناعمة 🔲', 'استيكرات', 'أشكال هندسية وقياسية', 'shapes'),
    '08_322_stickervellen': ('شيتات استيكرات مجمعة (Sticker Sheets)', 'صفحة شيت A4/A5 تحتوي على عدة استيكرات بتصاميم وأحجام مختلفة مقصوصة كيس-كت على نفس الورقة.', 25, 'شيت متعدد 📑', 'استيكرات', 'قص مخصص وداي-كت', 'die-cut'),
    '09_323_stickers-met-gestanste-toplaag': ('استيكرات كيس-كت (Kiss-Cut Stickers)', 'استيكرات مقصوصة الطبقة العلوية فقط مع بقاء الورقة الخلفية مربعة لحماية الحواف وسهولة التوزيع.', 9, 'كيس كت ✂️', 'استيكرات', 'قص مخصص وداي-كت', 'die-cut'),
    '10_999_transparante-stickers': ('استيكرات فينيل شفافة نقية (Clear Stickers)', 'استيكرات شفافة 100% مع طباعة حبر أبيض تحتي لإبراز الألوان بوضوح على الزجاج والأسطح الشفافة.', 12, 'شفاف نقي 💎', 'استيكرات', 'خامات خاصة وهولوجرام', 'specialty'),
    '11_economy-stickers_voordelige-stickers': ('استيكرات اقتصادية للكميات (Economy Stickers)', 'أفضل خيار اقتصادي لتوزيعات الفعاليات والحملات الترويجية الكبرى بجودة فينيل ممتازة وتكلفة موفرة.', 5, 'توفير كميات 💰', 'استيكرات', 'باقات وتوفير كميات', 'packs'),
    '12_fabric-stickers_textielstickers': ('استيكرات قماش وملابس (Fabric Stickers)', 'استيكرات من ألياف قماشية مرنة تلتصق بالملابس والمنسوجات والشنط دون ترك أي أثر لاصق بعد النزع.', 18, 'قماش مرن 👕', 'استيكرات', 'خامات خاصة وهولوجرام', 'specialty'),
    '13_glitter-stickers_glitter-stickers': ('استيكرات جليتر لامعة (Glitter Stickers)', 'استيكرات فينيل محببة بجليتر معدني براق يعكس الضوء ببريق جذاب يلفت الأنظار ويبرز جمال التصميم.', 15, 'جليتر براق ✨', 'استيكرات', 'خامات خاصة وهولوجرام', 'specialty'),
    '14_holographic-stickers_hologram-stickers': ('استيكرات هولوجرام ليزرية (Holographic Stickers)', 'استيكرات فينيل هولوجرام تظهر ألوان الطيف وقوس قزح وتأثير ثلاثي الأبعاد ساحر عند تغير زاوية الرؤية.', 16, 'هولوجرام ليزري 🌈', 'استيكرات', 'خامات خاصة وهولوجرام', 'specialty'),
    '15_static-clings_statische-stickers': ('استيكرات استاتيك زجاج بدون غراء (Static Clings)', 'تلتصق بالزجاج عن طريق الكهرباء الاستاتيكية دون أي مادة لاصقة، قابلة للإزالة وإعادة الاستخدام لمرات لا نهائية.', 20, 'بدون صمغ 🪟', 'استيكرات', 'سيارات وزجاج وواجهات', 'cars-windows'),
    '16_sticker-packs_stickersets': ('باقات استيكرات في بوكس مخصص (Sticker Packs)', 'مجموعة استيكرات متنوعة معبأة في أكياس محكمة أو بوكسات كرتونية مخصصة وجاهزة لإعادة البيع أو الهدايا.', 45, 'باكدج هدايا 🎁', 'استيكرات', 'باقات وتوفير كميات', 'packs'),
    '17_transfer_transferstickers': ('استيكرات ترانسفير تفريغ فينيل (Transfer Decals)', 'تفريغ دقيق للشعارات والنصوص الفينيل بدون أي خلفية مع شريط نقل شفاف للتركيب السهل والمتناسق.', 22, 'فينيل مفرغ 🎯', 'استيكرات', 'سيارات وزجاج وواجهات', 'cars-windows'),
    '18_vinyl-lettering_vinylbelettering': ('حروف وأرقام فينيل مقصوصة (Vinyl Lettering)', 'حروف ونصوص فيكتور مفرغة على الفينيل الملون للافتات والمكاتب وزجاج المحلات والسيارات.', 25, 'حروف فيكتور 🔤', 'استيكرات', 'سيارات وزجاج وواجهات', 'cars-windows'),
    '19_window_raamstickers': ('استيكرات واجهات زجاجية ومتاجر (Window Graphics)', 'استيكرات فينيل كبيرة مخصصة لواجهات المحلات والمولات مع لصق داخلي أو خارجي وحماية ضد الشمس.', 35, 'واجهات محلات 🏢', 'استيكرات', 'سيارات وزجاج وواجهات', 'cars-windows'),

    # Packaging
    '01_bubble-mailers_luchtkussen-enveloppen': ('أظرف شحن فقاعية مبطنة بالهواء (Bubble Mailers)', 'أظرف بريدية مبطنة بفقاعات هوائية لحماية المنتجات الهشة مع طباعة الشعار بالكامل.', 14, 'حماية مضاعفة ✉️', 'علب وتغليف', 'أظرف وأكياس شحن', 'mailers'),
    '02_label-dispenser_etiket-dispenser': ('موزع وحامل رول الليبل الأوتوماتيكي (Label Dispenser)', 'جهاز توزيع مكتبي متين وسريع لسحب وفصل ملصقات الرول في خطوط التعبئة والتغليف.', 180, 'تسريع التعبئة ⚙️', 'علب وتغليف', 'أدوات وموزعات', 'tools'),
    '03_pkg-tp_verpakkingstape': ('شريط تغليف كرتون لاصق مطبوع (Custom Packaging Tape)', 'شريط لاصق مقوى بطباعة علامتك التجارية وألوانك لإغلاق كراتين الشحن باحترافية.', 85, 'أمان وشياكة 📦', 'علب وتغليف', 'أشرطة لاصقة وتيب', 'tape'),
    '04_pm_plastic-enveloppen': ('أكياس شحن بولي ميلر ضد التمزق (Poly Mailers)', 'أكياس شحن خفيفة الوزن ومقاومة للماء والتمزق مع شريط إغلاق ذاتي قوي جداً.', 9, 'شحن تجارة إلكترونية 🛍️', 'علب وتغليف', 'أظرف وأكياس شحن', 'mailers'),
    '05_Pouches_stazakken': ('أكياس ستاند باوتش للأغذية والقهوة (Stand Up Pouches)', 'أكياس وقوف عمودية محكمة الإغلاق بسحاب زيبر وصمام نضارة وطباعة كاملة 360 درجة.', 12, 'أغذية وقهوة ☕', 'علب وتغليف', 'أكياس ستاند باوتش', 'pouches'),

    # Acrylics
    '01_acrylic-charms_acryl-bedeltjes': ('تشارمز ودلايات أكريليك شفافة (Acrylic Charms)', 'دلايات صغيرة مقصوصة ليزر بأي شكل مع فتحة تعليق، مثالية للإكسسوارات والميداليات.', 45, 'قص ليزر دقيق 📿', 'تجهيزات مكاتب ويافط', 'ميداليات ودلايات', 'charms'),
    '02_acrylic-magnets_acryl-magneten': ('مغناطيس أكريليك فاخر (Acrylic Magnets)', 'مغناطيس ثلاجات ومكاتب مصنوع من الأكريليك اللامع 3 مم مع طباعة ظهرية واضحة.', 35, 'مغناطيس قوي 🧲', 'هدايا شخصية وحفر ليزر', 'مغناطيس وتذكارات', 'magnets'),
    '03_acrylic-pins_acryl-pins': ('بنز ودبابيس أكريليك للملابس والشنط (Acrylic Pins)', 'دبابيس بروش أنيقة من الأكريليك مع قفل فراشة خلفي متين وطباعة لامعة.', 40, 'بروش كول 📌', 'هدايا شخصية وحفر ليزر', 'بادجات وبروشات', 'pins'),
    '04_acrylic-signs_acryl-borden': ('لوحات ويافط أكريليك للمكاتب (Acrylic Office Signs)', 'لوحات أكريليك للمكاتب والمباني مع حوامل استانلس معدنية بارزة وتفريغ ليزر.', 240, 'تجهيز مكاتب 🏢', 'تجهيزات مكاتب ويافط', 'لوحات إرشادية للمباني', 'signs'),
    '05_custom-keychains_gepersonaliseerde-sleutelhanger': ('ميداليات أكريليك مخصصة (Custom Acrylic Keychains)', 'ميداليات مفاتيح أكريليك شفافة بحواف مصقولة ماسياً مع حلقة وسلسلة معدنية فاخرة.', 50, 'أكريليك كريستال 🔑', 'هدايا شخصية وحفر ليزر', 'ميداليات باركود QR', 'charms'),
    '06_die-cut-acrylic-signs_contourgesneden-acryl-borden': ('لافتات أكريليك مقصوصة ليزر بأشكال حرة (Die-Cut Acrylic Signs)', 'لافتات وديكورات أكريليك مفرغة على شكل اللوجو أو الشخصيات للمعارض والمتاجر.', 290, 'أشكال حرة 🎨', 'تجهيزات مكاتب ويافط', 'يافطات مكاتب 3D', 'signs'),

    # Buttons
    '01_acrylic-pins_acryl-pins': ('دبابيس وبنز أكريليك مخصصة (Custom Acrylic Pins)', 'دبابيس بروش أكريليك أنيقة مقصوصة ليزر بأي شكل مع قفل خلفي متين.', 35, 'أكريليك بريميوم 📌', 'هدايا شخصية وحفر ليزر', 'بادجات وبروشات', 'pins'),
    '02_crb1_ronde-buttons-25-mm': ('بادجات معدنية دائرية 25 مم (1 Inch Custom Buttons)', 'بادجات دبابيس معدنية صغيرة خفيفة ومقاومة للماء والصدأ للتوزيعات والملابس.', 12, 'مقاس 25 مم 🔘', 'هدايا شخصية وحفر ليزر', 'بادجات وبروشات', 'small-buttons'),
    '03_crb125_ronde-buttons-32-mm': ('بادجات معدنية دائرية 32 مم (1.25 Inch Custom Buttons)', 'الحجم المثالي للبادجات المدرسية والجامعية وحملات التوعية مع سيلوفان حماية لامع.', 14, 'مقاس 32 مم 🔘', 'هدايا شخصية وحفر ليزر', 'بادجات وبروشات', 'small-buttons'),
    '04_crb150_ronde-buttons-38-mm': ('بادجات معدنية دائرية 38 مم (1.5 Inch Custom Buttons)', 'بادجات متوسطة واضحة التفاصيل للشعارات والصور الشخصية.', 16, 'مقاس 38 مم 🔘', 'هدايا شخصية وحفر ليزر', 'بادجات وبروشات', 'large-buttons'),
    '05_crb225_ronde-buttons-57-mm': ('بادجات معدنية دائرية كبيرة 57 مم (2.25 Inch Custom Buttons)', 'بادجات كبيرة الحجم ذات تأثير بصري قوي للمؤتمرات والمعارض والنوادي.', 20, 'مقاس 57 مم 🔘', 'هدايا شخصية وحفر ليزر', 'بادجات وبروشات', 'large-buttons'),
}

products_list = []

cat_folders = [
    ("02_Stickers_op_maat", "stickers"),
    ("03_Gepersonaliseerde_kleding", "apparel"),
    ("04_Gepersonaliseerde_acrylproducten", "acrylics"),
    ("05_Verpakking_op_maat", "packaging"),
    ("07_Buttons_op_maat", "buttons"),
]

for cat_folder, cat_key in cat_folders:
    cat_path = os.path.join(base_dir, cat_folder, "Products")
    if not os.path.exists(cat_path):
        continue
    
    for sub in sorted(os.listdir(cat_path)):
        sub_path = os.path.join(cat_path, sub)
        if not os.path.isdir(sub_path):
            continue
        
        # Look for images
        files = os.listdir(sub_path)
        index_img = next((f for f in files if "index" in f), None)
        cover_img = next((f for f in files if "cover" in f and not "2x" in f), None)
        galleries = sorted([f for f in files if "gallery" in f])
        
        rel_base = f"/images/stickermule/{cat_folder}/Products/{sub}"
        
        # Primary illustration icon (01_index.png is the clean vector illustration like the screenshot)
        primary_icon = f"{rel_base}/{index_img}" if index_img else (f"{rel_base}/{cover_img}" if cover_img else "")
        cover_photo = f"{rel_base}/{cover_img}" if cover_img else primary_icon
        
        # Ordered images: clean illustration first, then cover mockup, then real-life usage examples
        ordered_images = []
        if primary_icon:
            ordered_images.append(primary_icon)
        if cover_photo and cover_photo != primary_icon:
            ordered_images.append(cover_photo)
        for g in galleries:
            ordered_images.append(f"{rel_base}/{g}")
        
        meta = meta_dict.get(sub)
        if meta:
            title, desc, price, badge, category, sub_cat, sub_cat_slug = meta
        else:
            clean_name = re.sub(r'^\d+_', '', sub).replace('_', ' ').replace('-', ' ').title()
            title = f"{clean_name} (Custom {cat_key.title()})"
            desc = f"منتج {clean_name} فائق الجودة والوضوح مع قص ليزري ومعاينة فورية."
            price = 25
            badge = "جديد ✨"
            category = "استيكرات" if cat_key == "stickers" else "هدايا ومجات"
            sub_cat = "عام"
            sub_cat_slug = "general"
        
        slug_raw = re.sub(r'^\d+_', '', sub).replace('_', '-').lower()
        slug = f"sm-{slug_raw}"
        prod_id = f"sm-prod-{slug_raw}"
        
        prod_obj = {
            "id": prod_id,
            "slug": slug,
            "title": title,
            "category": category,
            "categorySlug": cat_key,
            "subCategory": sub_cat,
            "subCategorySlug": sub_cat_slug,
            "basePrice": price,
            "description": desc,
            "turnaround": "24 - 48 ساعة",
            "badge": badge,
            "status": "published",
            "image": primary_icon,
            "colors": [
                {
                    "id": "c-standard",
                    "name": "الخامة القياسية الأصلية",
                    "hex": "#C93B41",
                    "mockupOverlay": primary_icon,
                    "bgStyle": "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
                    "priceAdd": 0,
                    "images": ordered_images if ordered_images else [primary_icon],
                }
            ],
            "layers": [
                {
                    "id": "l1",
                    "name": "هيكل وخامة المنتج الأساسي",
                    "type": "base_mockup",
                    "imageUrl": primary_icon,
                    "x": 50,
                    "y": 50,
                    "width": 100,
                    "height": 100,
                    "zIndex": 1,
                },
                {
                    "id": "l2",
                    "name": "مساحة رفع الشعار أو التصميم",
                    "type": "customer_photo_slot",
                    "x": 50,
                    "y": 50,
                    "width": 75,
                    "height": 75,
                    "zIndex": 2,
                }
            ],
            "printAreaLabel": "مساحة التصميم المطبوع (دقة 300 DPI)",
            "createdAt": "2026-09-15T12:00:00.000Z",
            "updatedAt": "2026-09-15T12:00:00.000Z",
        }
        products_list.append(prod_obj)

print(f"Generated {len(products_list)} Sticker Mule products.")

ts_content = "import { AdminProduct } from './types';\n\nexport const initialProductsStickerMule: AdminProduct[] = " + json.dumps(products_list, ensure_ascii=False, indent=2) + ";\n"

with open(output_file, "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Written to {output_file} successfully.")
