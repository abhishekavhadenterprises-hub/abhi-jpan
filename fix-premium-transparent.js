const sharp = require('sharp');
const path = require('path');

const brainDir = 'C:/Users/Graphics/.gemini/antigravity/brain/0d8ec40e-7fb5-472f-93ca-0c4f9c1b3ba9';
const originals = [
  { src: 'media__1781174253219.png', dest: 'public/images/premium_refnet.png', cropLeft: 0.35, scale: 0.9 },
  { src: 'media__1781174266997.png', dest: 'public/images/premium_condenser_inlet.png', cropLeft: 0.35, scale: 0.9 },
  { src: 'media__1781174277887.png', dest: 'public/images/copper_return_bends_premium.png', cropLeft: 0.35, scale: 0.9 },
  { src: 'media__1781174294351.png', dest: 'public/images/aluminum_evaporator_tubing_premium.png', cropLeft: 0.35, scale: 0.9 },
  { src: 'media__1781174307253.png', dest: 'public/images/steel_compressor_lines_premium.png', cropLeft: 0.35, scale: 0.9 },
];

async function processImage(srcFile, destFile, cropLeft, scaleFactor) {
  try {
    const meta = await sharp(srcFile).metadata();
    const left = Math.floor(meta.width * cropLeft);
    const width = meta.width - left;
    const height = meta.height;

    // Extract the raw image without the white background using our logic
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
         a = 0; 
      } else if (minVal > 180 && maxDiff < 25) {
         let factor = (220 - minVal) / 40; 
         a = Math.floor(factor * 255);
         if (a < 0) a = 0;
         if (a > 255) a = 255;
      }

      outData[i] = r;
      outData[i+1] = g;
      outData[i+2] = b;
      outData[i+3] = a;
    }

    const objectBuffer = await sharp(outData, {
      raw: { width: info.width, height: info.height, channels: 4 }
    }).png().toBuffer();

    const targetSize = Math.floor(800 * scaleFactor);
    const resizedBuffer = await sharp(objectBuffer)
      .resize({ width: targetSize, height: targetSize, fit: 'inside' })
      .toBuffer();

    // Create an 800x800 white canvas and composite the resized image in the center
    const whiteCanvas = await sharp({
      create: {
        width: 800,
        height: 800,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([{ input: resizedBuffer, gravity: 'center' }])
      .png()
      .toBuffer();

    // Apply the radial gradient mask to the 800x800 white canvas
    const svgMask = Buffer.from(
      '<svg width="800" height="800">' +
        '<defs>' +
          '<radialGradient id="grad" cx="50%" cy="50%" r="50%">' +
            '<stop offset="40%" stop-color="white" stop-opacity="1"/>' +
            '<stop offset="85%" stop-color="white" stop-opacity="0"/>' +
          '</radialGradient>' +
        '</defs>' +
        '<rect x="0" y="0" width="800" height="800" fill="url(#grad)" />' +
      '</svg>'
    );

    // This creates an image with a white spotlight in the middle fading to transparent
    await sharp(whiteCanvas)
      .composite([{ input: svgMask, blend: 'dest-in' }])
      .png()
      .toFile(destFile);

    console.log('Processed transparent spotlight image:', destFile);
  } catch (err) {
    console.error('Error processing', destFile, err);
  }
}

async function run() {
  for (let item of originals) {
    await processImage(path.join(brainDir, item.src), item.dest, item.cropLeft, item.scale);
  }
  
  await processImage('public/images/flare_nut_b_raw.png', 'public/images/flare_nut_b_premium.png', 0, 0.75);
  await processImage('public/images/socket_raw.png', 'public/images/socket_premium.png', 0, 0.75);
}

run();
