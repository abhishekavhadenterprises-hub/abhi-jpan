const sharp = require('sharp');
const fs = require('fs');

async function fix() {
  const input = 'public/images/5a_distributor_new.jpg';
  const output = 'public/images/5a_distributor_final.jpg';
  
  const meta = await sharp(input).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);
  
  // Target ratio 5:4
  const targetRatio = 5 / 4;
  let targetWidth = meta.width;
  let targetHeight = meta.height;
  
  if (meta.width / meta.height > targetRatio) {
    targetHeight = Math.round(meta.width / targetRatio);
  } else {
    targetWidth = Math.round(meta.height * targetRatio);
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
    
  console.log('Successfully mirrored to', output);
  
  // update ProductsGrid
  let content = fs.readFileSync('src/components/ProductsGrid.tsx', 'utf8');
  content = content.replace('5a_distributor_new.jpg', '5a_distributor_final.jpg');
  // Just in case there are others
  content = content.replace('muffler_coupling_new.jpg', 'muffler_coupling_final.jpg');
  content = content.replace('refnet_y_joint_new.jpg', 'refnet_y_joint_final.jpg');
  
  fs.writeFileSync('src/components/ProductsGrid.tsx', content);
}

fix();
