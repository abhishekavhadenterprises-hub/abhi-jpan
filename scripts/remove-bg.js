const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.resolve('public/Orignal Images 22-7-26');
const OUTPUT_DIR = path.resolve('public/products');

const MIME_MAP = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

async function main() {
  const { removeBackground } = await import('@imgly/background-removal-node');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(INPUT_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return Object.keys(MIME_MAP).includes(ext);
  });

  console.log(`Found ${files.length} images to process.`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  let processed = 0;
  let failed = 0;

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(OUTPUT_DIR, `${baseName}.png`);

    // Skip if already processed
    if (fs.existsSync(outputPath)) {
      console.log(`[SKIP] ${file} — already processed`);
      processed++;
      continue;
    }

    try {
      const count = processed + failed + 1;
      console.log(`[${count}/${files.length}] Processing: ${file}...`);

      const inputBuffer = fs.readFileSync(inputPath);
      const mimeType = MIME_MAP[ext];
      const blob = new Blob([inputBuffer], { type: mimeType });

      const resultBlob = await removeBackground(blob, {
        debug: false,
        output: {
          format: 'image/png',
          quality: 1,
        },
      });

      const resultBuffer = Buffer.from(await resultBlob.arrayBuffer());
      fs.writeFileSync(outputPath, resultBuffer);

      processed++;
      console.log(`  ✓ Saved: ${baseName}.png (${(resultBuffer.length / 1024).toFixed(0)} KB)`);
    } catch (err) {
      failed++;
      console.error(`  ✗ FAILED: ${file} — ${err.message}`);
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Processed: ${processed} | Failed: ${failed} | Total: ${files.length}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
