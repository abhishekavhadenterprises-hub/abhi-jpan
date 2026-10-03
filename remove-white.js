const sharp = require('sharp');
const path = require('path');

async function processImage(srcFile, destFile, bgRef, cropLeft = 0) {
  try {
    const meta = await sharp(srcFile).metadata();
    const left = Math.floor(meta.width * cropLeft);
    const width = meta.width - left;
    const height = meta.height;

    const { data, info } = await sharp(srcFile)
      .extract({ left: left, top: 0, width: width, height: height })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const outData = Buffer.alloc(data.length);

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i+1];
      let b = data[i+2];
      let a = data[i+3];

      let minVal = Math.min(r, g, b);
      let maxDiff = Math.max(Math.abs(r-g), Math.abs(r-b), Math.abs(g-b));
      
      // Target white/light gray background
      if (minVal > 220 && maxDiff < 15) {
         a = 0; // Pure transparent
      } else if (minVal > 180 && maxDiff < 25) {
         // Soften edges
         let factor = (220 - minVal) / 40; // 0 at 220, 1 at 180
         a = Math.floor(factor * 255);
         if (a < 0) a = 0;
         if (a > 255) a = 255;
      }

      outData[i] = r;
      outData[i+1] = g;
      outData[i+2] = b;
      outData[i+3] = a;
    }

    const bgBuffer = await sharp(bgRef)
        .resize(800, 800, { fit: 'cover' })
        .blur(40)
        .modulate({ brightness: 0.8 })
        .toBuffer();

    const objectBuffer = await sharp(outData, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    }).png().toBuffer();

    await sharp(bgBuffer)
      .composite([{ input: objectBuffer, gravity: 'center' }])
      .toFile(destFile);

    console.log('Processed', destFile);
  } catch (err) {
    console.error('Error processing', destFile, err);
  }
}

const brainDir = 'C:/Users/Graphics/.gemini/antigravity/brain/0d8ec40e-7fb5-472f-93ca-0c4f9c1b3ba9';
const originals = [
  { src: 'media__1781174253219.png', dest: 'public/images/premium_refnet.png', cropLeft: 0.35 },
  { src: 'media__1781174266997.png', dest: 'public/images/premium_condenser_inlet.png', cropLeft: 0.35 },
  { src: 'media__1781174277887.png', dest: 'public/images/copper_return_bends_premium.png', cropLeft: 0.35 },
  { src: 'media__1781174294351.png', dest: 'public/images/aluminum_evaporator_tubing_premium.png', cropLeft: 0.35 },
  { src: 'media__1781174307253.png', dest: 'public/images/steel_compressor_lines_premium.png', cropLeft: 0.35 },
];

const referenceBg = 'public/images/steel_component.png';

async function run() {
  for (let item of originals) {
    await processImage(path.join(brainDir, item.src), item.dest, referenceBg, item.cropLeft);
  }
  
  // also do flare nut and socket
  await processImage('public/images/flare_nut_b_raw.png', 'public/images/flare_nut_b_premium.png', referenceBg, 0);
  await processImage('public/images/socket_raw.png', 'public/images/socket_premium.png', referenceBg, 0);
}

run();
