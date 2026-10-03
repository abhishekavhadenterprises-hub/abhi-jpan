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

const referenceBg = 'public/images/steel_component.png';

async function processImage(srcFile, destFile, cropLeft, scaleFactor) {
  try {
    // 1. Create the blurred dark background
    const bgBuffer = await sharp(referenceBg)
      .resize(800, 800, { fit: 'cover' })
      .blur(40)
      .modulate({ brightness: 0.8 })
      .toBuffer();

    // 2. Load the source image and crop if necessary
    const meta = await sharp(srcFile).metadata();
    const left = Math.floor(meta.width * cropLeft);
    const width = meta.width - left;
    const height = meta.height;

    const croppedBuffer = await sharp(srcFile)
      .extract({ left: left, top: 0, width: width, height: height })
      .toBuffer();

    // 3. Resize the cropped image to fit within an 800x800 bounding box, scaled down a bit
    const targetSize = Math.floor(800 * scaleFactor);
    const resizedBuffer = await sharp(croppedBuffer)
      .resize({ width: targetSize, height: targetSize, fit: 'inside' })
      .toBuffer();

    // 4. Create an 800x800 white canvas and composite the resized image in the center
    // Because the source images have white backgrounds, this seamlessly extends the white background to 800x800!
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

    // 5. Apply the radial gradient mask to the 800x800 white canvas
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

    const maskedCanvas = await sharp(whiteCanvas)
      .composite([{ input: svgMask, blend: 'dest-in' }])
      .toBuffer();

    // 6. Composite the masked canvas onto the blurred dark background
    await sharp(bgBuffer)
      .composite([{ input: maskedCanvas, gravity: 'center' }])
      .toFile(destFile);

    console.log('Processed', destFile);
  } catch (e) {
    console.error('Error processing', destFile, e);
  }
}

async function run() {
  for (let item of originals) {
    await processImage(path.join(brainDir, item.src), item.dest, item.cropLeft, item.scale);
  }
  
  // For flare nut and socket, they are already small, so maybe scale = 1.0 or 1.5?
  // Let's use scale = 1.5 to make them a bit more visible, but fit inside 800x800.
  // Wait, if we use fit: 'inside', it will resize them.
  // We want them to fill a good portion of the 800x800 area.
  // We can just set targetSize to 500.
  await processImage('public/images/flare_nut_b_raw.png', 'public/images/flare_nut_b_premium.png', 0, 0.6);
  await processImage('public/images/socket_raw.png', 'public/images/socket_premium.png', 0, 0.6);
}

run();
