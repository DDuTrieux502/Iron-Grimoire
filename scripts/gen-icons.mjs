// Generates the PWA app icons with zero dependencies (pure Node PNG encoder).
// On-brand: a gold hollow-diamond emblem (the app's E-rank ◇ motif) on the deep
// background, with a faint outer frame. Run: node scripts/gen-icons.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(OUT, { recursive: true });

// ── minimal PNG encoder (RGBA, 8-bit) ──
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
const crc32 = (buf) => { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const u32 = (n) => { const b = Buffer.alloc(4); b.writeUInt32BE(n >>> 0, 0); return b; };
const chunk = (type, data) => { const body = Buffer.concat([Buffer.from(type, "ascii"), data]); return Buffer.concat([u32(data.length), body, u32(crc32(body))]); };
function encodePNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit, RGBA
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) { raw[y * (stride + 1)] = 0; rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride); }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

// ── drawing ──
const BG = [10, 10, 15];      // #0a0a0f
const GOLD = [196, 169, 106]; // #c4a96a
const FRAME = [61, 53, 40];   // faint outer frame
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const mix = (a, b, t) => [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)];

function makeIcon(size, pad, withFrame) {
  const buf = Buffer.alloc(size * size * 4);
  const cx = size / 2, cy = size / 2;
  const r = (size / 2) * (1 - pad);   // diamond half-extent
  const inner = 0.58;                  // hollow cutout (fraction of r)
  const aa = 1.4 / r;                  // antialias band in t-units
  // optional faint square frame near the edge
  const fOuter = size * (1 - pad * 0.55), fInner = fOuter - Math.max(2, size * 0.012);
  const fLo = (size - fOuter) / 2, fHi = (size + fOuter) / 2;
  const fLo2 = (size - fInner) / 2, fHi2 = (size + fInner) / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let col = BG;
      const px = x + 0.5, py = y + 0.5;
      const dx = Math.abs(px - cx), dy = Math.abs(py - cy);
      const t = dx / r + dy / r; // diamond field: 0 center → 1 edge
      if (t <= 1 + aa) {
        const outer = clamp((1 + aa - t) / (2 * aa), 0, 1);
        const innerCov = clamp((t - (inner - aa)) / (2 * aa), 0, 1);
        const cov = Math.min(outer, innerCov);
        if (cov > 0) col = mix(col, GOLD, cov);
      }
      if (withFrame) {
        const onFrame = (px >= fLo && px <= fHi && py >= fLo && py <= fHi) && !(px >= fLo2 && px <= fHi2 && py >= fLo2 && py <= fHi2);
        if (onFrame) col = mix(col, FRAME, 1);
      }
      const o = (y * size + x) * 4;
      buf[o] = col[0]; buf[o + 1] = col[1]; buf[o + 2] = col[2]; buf[o + 3] = 255;
    }
  }
  return encodePNG(size, buf);
}

const files = [
  ["icon-192.png", makeIcon(192, 0.18, true)],
  ["icon-512.png", makeIcon(512, 0.18, true)],
  ["icon-maskable-512.png", makeIcon(512, 0.30, false)], // extra padding for maskable safe zone
  ["apple-touch-icon.png", makeIcon(180, 0.16, false)],
];
for (const [name, data] of files) { writeFileSync(join(OUT, name), data); console.log(`wrote public/${name} (${data.length} bytes)`); }
console.log("done");
