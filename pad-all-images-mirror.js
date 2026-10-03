const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const files = fs.readdirSync(__dirname).filter(f => f.startsWith('pad-image') && f.endsWith('.js'));
  
  for (const file of files) {
    const code = fs.readFileSync(path.join(__dirname, file), 'utf8');
    const inputMatch = code.match(/const input = ['"]([^'"]+)['"]/);
    const outputMatch = code.match(/const output = ['"]([^'"]+)['"]/);
    
    if (inputMatch && outputMatch) {
      const input = inputMatch[1];
      const oldOutput = outputMatch[1];
      
      // Use _final for the perfect versions
      const newOutput = oldOutput.replace('_padded', '_final').replace('_cropped', '_final');
      
      console.log(`Processing ${input} -> ${newOutput}`);
      
      try {
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
          .toFile(path.join(__dirname, newOutput));
          
        console.log(`Successfully mirrored and saved to ${newOutput}`);
      } catch (err) {
        console.error(`Error processing ${input}:`, err);
      }
    }
  }
  
  // Update ProductsGrid.tsx to use _final
  const gridPath = path.join(__dirname, 'src/components/ProductsGrid.tsx');
  let gridContent = fs.readFileSync(gridPath, 'utf8');
  gridContent = gridContent.replace(/_cropped\.png/g, '_final.png');
  gridContent = gridContent.replace(/_cropped\.jpg/g, '_final.jpg');
  gridContent = gridContent.replace(/_padded\.png/g, '_final.png');
  gridContent = gridContent.replace(/_padded\.jpg/g, '_final.jpg');
  fs.writeFileSync(gridPath, gridContent);
  console.log('Updated ProductsGrid.tsx to use _final images');
}

run();
