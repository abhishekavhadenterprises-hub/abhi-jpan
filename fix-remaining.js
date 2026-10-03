const sharp = require('sharp');
const fs = require('fs');

async function fix() {
  const images = [
    '5a_distributor',
    'muffler_coupling',
    'refnet_y_joint'
  ];
  
  for (const name of images) {
    const input = `public/images/${name}_new.jpg`;
    const output = `public/images/${name}_final.jpg`;
    
    if (fs.existsSync(input)) {
      const meta = await sharp(input).metadata();
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
        
      console.log(`Successfully mirrored ${name} to ${output}`);
    } else {
      console.log(`Skipping ${name}, file not found.`);
    }
  }
  
  let content = fs.readFileSync('src/components/ProductsGrid.tsx', 'utf8');
  content = content.replace(/5a_distributor_new\.jpg/g, '5a_distributor_final.jpg');
  content = content.replace(/muffler_coupling_new\.jpg/g, 'muffler_coupling_final.jpg');
  content = content.replace(/refnet_y_joint_new\.jpg/g, 'refnet_y_joint_final.jpg');
  fs.writeFileSync('src/components/ProductsGrid.tsx', content);
  console.log('Updated ProductsGrid.tsx');
}

fix();
