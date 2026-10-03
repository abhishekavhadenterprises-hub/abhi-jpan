import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';

async function generatePipeCloud() {
  const inputPath = path.resolve('public/products/jpan_pipe_component.png');
  const img = await Jimp.read(inputPath);
  const width = img.bitmap.width;
  const height = img.bitmap.height;
  const data = img.bitmap.data;

  // 1. Gather all pixels with alpha > 40
  const validPixels = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a > 40) {
        validPixels.push({ x, y, r, g, b });
      }
    }
  }

  console.log(`Found ${validPixels.length} valid pixels.`);

  // 2. Deterministic shuffle and sample 40,000 points
  const targetCount = 40000;
  // Seeded PRNG for perfect determinism
  let seed = 123456789;
  function random() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }

  const sampled = [];
  const pool = [...validPixels];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  for (let i = 0; i < targetCount; i++) {
    // If pool has more than 40k, take first 40k. If less, cycle.
    sampled.push(pool[i % pool.length]);
  }

  // 3. Compute bounding box to normalize to 14 world units tall centered at (0, 9, 0)
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of sampled) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  const origWidth = maxX - minX;
  const origHeight = maxY - minY;
  const targetHeight = 14.0;
  const scale = targetHeight / origHeight;
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  // Helper RGB <-> HSL
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h, s, l };
  }

  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  // Shortest arc hue distance & rotation
  function shortestArcLerp(h1, h2, t) {
    let diff = (h2 - h1 + 1.5) % 1 - 0.5;
    return (h1 + diff * t + 1) % 1;
  }

  const positions = new Float32Array(targetCount * 3);
  const colors = new Float32Array(targetCount * 3);

  for (let i = 0; i < targetCount; i++) {
    const pt = sampled[i];
    // Invert Y so up is positive in Three.js
    const wx = (pt.x - centerX) * scale;
    const wy = (centerY - pt.y) * scale + 9.0; // centered at y = 9.0

    // Compute synthetic 3D volumetric thickness (Z) based on tube curvature
    // Random angle across cross section to make it a true 3D cylinder
    const angle = random() * Math.PI * 2;
    const radius = 0.55 * (0.8 + 0.4 * random());
    const wz = Math.sin(angle) * radius;

    positions[i * 3 + 0] = parseFloat(wx.toFixed(4));
    positions[i * 3 + 1] = parseFloat(wy.toFixed(4));
    positions[i * 3 + 2] = parseFloat(wz.toFixed(4));

    // Form normal: offset from the FIGURE'S OWN axis: n.set(x, y * 0.15, z).normalize()
    const nx_raw = wx;
    const ny_raw = (wy - 9.0) * 0.15;
    const nz_raw = wz;
    const nLen = Math.sqrt(nx_raw * nx_raw + ny_raw * ny_raw + nz_raw * nz_raw) || 1;
    const nx = nx_raw / nLen;
    const ny = ny_raw / nLen;
    const nz = nz_raw / nLen;

    // Light vector (studio key light)
    const lx = 0.577, ly = 0.577, lz = 0.577;
    const dot = Math.max(0, nx * lx + ny * ly + nz * lz);
    const shade = dot * 0.65 + 0.35;

    // HSL Remap:
    // Scarlet target: 0.985, Cobalt target: 0.625
    let { h, s, l } = rgbToHsl(pt.r, pt.g, pt.b);

    if (s >= 0.12) {
      // Determine nearer target along shortest arc
      const dScarlet = Math.abs((0.985 - h + 1.5) % 1 - 0.5);
      const dCobalt = Math.abs((0.625 - h + 1.5) % 1 - 0.5);
      const targetH = dScarlet < dCobalt ? 0.985 : 0.625;
      h = shortestArcLerp(h, targetH, 0.85); // 85% pull
    }

    const remappedRgb = hslToRgb(h, s, l);
    // Bake shading into color
    colors[i * 3 + 0] = parseFloat(((remappedRgb.r / 255) * shade).toFixed(4));
    colors[i * 3 + 1] = parseFloat(((remappedRgb.g / 255) * shade).toFixed(4));
    colors[i * 3 + 2] = parseFloat(((remappedRgb.b / 255) * shade).toFixed(4));
  }

  const outDir = path.resolve('public/data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'pipe_cloud_40k.json');
  fs.writeFileSync(outPath, JSON.stringify({
    count: targetCount,
    positions: Array.from(positions),
    colors: Array.from(colors)
  }));

  console.log(`Saved 40,000-bead cloud to ${outPath}`);
}

generatePipeCloud().catch(console.error);
