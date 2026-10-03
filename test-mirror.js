const sharp = require('sharp');
const path = require('path');

async function test() {
  const input = 'C:/Users/Graphics/.gemini/antigravity/brain/3e2ecf23-4b4f-459f-a89b-7fea435b8663/media__1781687422695.jpg';
  const output = 'public/images/cu_tee_test.jpg';
  
  const meta = await sharp(input).metadata();
  const ratio = 5 / 4;
  let targetWidth = meta.width;
  let targetHeight = meta.height;
  
  if (meta.width / meta.height > ratio) {
    targetHeight = Math.round(meta.width / ratio);
  } else {
    targetWidth = Math.round(meta.height * ratio);
  }
  
  const top = Math.max(0, Math.round((targetHeight - meta.height) / 2));
  const bottom = Math.max(0, Math.round((targetHeight - meta.height) / 2));
  const left = Math.max(0, Math.round((targetWidth - meta.width) / 2));
  const right = Math.max(0, Math.round((targetWidth - meta.width) / 2));
  
  await sharp(input)
    .extend({
      top, bottom, left, right,
      extendWith: 'mirror'
    })
    .toFile(output);
    
  console.log('Test done!');
}

test();
