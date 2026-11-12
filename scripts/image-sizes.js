// Writes src/data/imageSizes.json: { "/assets/images/x.jpg": [width, height], ... }
// for every product image (main + strength variants). Re-run after changing product images.
// Usage (from the repo root): node scripts/image-sizes.js
const fs = require('fs');
const path = require('path');

const root = process.argv[2] || process.cwd();
const content = JSON.parse(fs.readFileSync(path.join(root, 'src/data/zyventaContent.json'), 'utf8'));

function dims(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89 && b[1] === 0x50) return [b.readUInt32BE(16), b.readUInt32BE(20)]; // PNG
  let i = 2; // JPEG: walk segments to the first SOF marker
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error('no size in ' + file);
}

const srcs = new Set();
for (const p of content.products) {
  if (p.image) srcs.add(p.image);
  for (const v of p.images || []) srcs.add(v.src);
}

const out = {};
for (const s of [...srcs].sort()) {
  const file = path.join(root, 'public', s);
  if (!fs.existsSync(file)) { console.warn('MISSING', s); continue; }
  out[s] = dims(file);
}
fs.writeFileSync(path.join(root, 'src/data/imageSizes.json'), JSON.stringify(out, null, 2) + '\n');
for (const [s, [w, h]] of Object.entries(out)) console.log(s.padEnd(46), `${w}x${h}`, (w / h).toFixed(2));
