const sharp = require('sharp');

async function processImage() {
  const input = 'C:/Users/Graphics/.gemini/antigravity/brain/3e2ecf23-4b4f-459f-a89b-7fea435b8663/media__1781680104687.jpg';
  const output = 'public/images/discharge_tubing_padded.jpg';
  
  const meta = await sharp(input).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);
  
  // For 5:4 ratio
  const ratio = 5 / 4; // 1.25
  let targetWidth = meta.width;
  let targetHeight = meta.height;
  
  if (meta.width / meta.height > ratio) {
    // too wide, increase height
    targetHeight = Math.round(meta.width / ratio);
  } else {
    // too tall, increase width
    targetWidth = Math.round(meta.height * ratio);
  }
  
  const { data } = await sharp(input)
    .extract({ left: 10, top: 10, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const bg = { r: data[0], g: data[1], b: data[2], alpha: 1 };
  console.log('Background color:', bg);
  
  await sharp(input)
    .extend({
      top: Math.max(0, Math.round((targetHeight - meta.height) / 2)),
      bottom: Math.max(0, Math.round((targetHeight - meta.height) / 2)),
      left: Math.max(0, Math.round((targetWidth - meta.width) / 2)),
      right: Math.max(0, Math.round((targetWidth - meta.width) / 2)),
      background: bg
    })
    .toFile(output);
    
  console.log('Done padding image to', output);
}

processImage().catch(console.error);
