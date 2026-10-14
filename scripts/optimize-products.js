const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.startsWith("01_index_") && file.endsWith(".webp")) {
      results.push(full);
    }
  });
  return results;
}

async function run() {
  const files = walk("public/images/stickermule");
  let totalSaved = 0;
  for (const f of files) {
    const inputBuf = fs.readFileSync(f);
    const metadata = await sharp(inputBuf).metadata();
    if (metadata.width > 480) {
      const buf = await sharp(inputBuf)
        .resize({ width: 480, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toBuffer();
      if (buf.length < inputBuf.length) {
        fs.writeFileSync(f, buf);
        totalSaved += (inputBuf.length - buf.length);
        console.log(`Optimized ${path.basename(f)}: ${inputBuf.length} -> ${buf.length} bytes`);
      }
    }
  }
  console.log(`Total saved: ${(totalSaved / 1024).toFixed(1)} KiB`);
}
run();
