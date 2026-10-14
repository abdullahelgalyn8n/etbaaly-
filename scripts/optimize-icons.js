const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const outDir = path.join("public", "images", "category-icons");

const icons = [
  { name: "all.webp", src: "public/images/stickermule/02_Stickers_op_maat/Products/16_sticker-packs_stickersets/01_index_sticker-packs.webp" },
  { name: "stickers.webp", src: "public/images/stickermule/02_Stickers_op_maat/Products/04_317_uitgesneden-stickers/01_index_317.webp" },
  { name: "office.webp", src: "public/images/stickermule/04_Gepersonaliseerde_acrylproducten/Products/06_die-cut-acrylic-signs_contourgesneden-acryl-borden/01_index_die-cut-acrylic-signs.webp" },
  { name: "packaging.webp", src: "public/images/stickermule/05_Verpakking_op_maat/Products/03_pkg-tp_verpakkingstape/01_index_pkg-tp.webp" },
  { name: "gifts.webp", src: "public/images/stickermule/07_Buttons_op_maat/Products/01_acrylic-pins_acryl-pins/01_index_acrylic-pins.webp" },
  { name: "apparel.webp", src: "public/images/stickermule/03_Gepersonaliseerde_kleding/Products/03_custom-hoodies_gepersonaliseerde-hoodies/01_index_custom-hoodies-az.webp" },
];

async function run() {
  for (const item of icons) {
    const dest = path.join(outDir, item.name);
    // Write to a temporary buffer first then save
    const buf = await sharp(item.src)
      .resize(112, 112, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    fs.writeFileSync(dest, buf);
    console.log(`Generated ${item.name}: ${buf.length} bytes`);
  }
}
run();
