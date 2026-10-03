const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const input = 'C:/Users/Graphics/.gemini/antigravity/brain/3e2ecf23-4b4f-459f-a89b-7fea435b8663/media__1781678374069.jpg';
  const output = 'public/images/5a_distributor_tall.jpg';
  
  // get metadata
  const meta = await sharp(input).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);
  
  // target aspect ratio 5:4 (width:height = 1.25)
  // since it's tall, we probably need to increase width
  const targetHeight = meta.height;
  const targetWidth = Math.round(meta.height * 1.25);
  
  // extract top-left pixel for background color
  const { data } = await sharp(input)
    .extract({ left: 10, top: 10, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const bg = { r: data[0], g: data[1], b: data[2], alpha: 1 };
  console.log('Background color:', bg);
  
  await sharp(input)
    .extend({
      top: 0,
      bottom: 0,
      left: Math.max(0, Math.round((targetWidth - meta.width) / 2)),
      right: Math.max(0, Math.round((targetWidth - meta.width) / 2)),
      background: bg
    })
    .toFile(output);
    
  console.log('Done padding image to', output);
}

processImage().catch(console.error);
