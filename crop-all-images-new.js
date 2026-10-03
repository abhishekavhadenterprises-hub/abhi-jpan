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
      const oldOutput = outputMatch[1]; // e.g. public/images/condenser_inlet_new_padded.jpg
      
      // Change _padded to _cropped
      const newOutput = oldOutput.replace('_padded', '_cropped');
      
      console.log(`Processing ${input} -> ${newOutput}`);
      
      try {
        const meta = await sharp(input).metadata();
        
        // Target ratio 5:4
        const targetRatio = 5 / 4;
        
        let cropWidth = meta.width;
        let cropHeight = meta.height;
        
        if (meta.width / meta.height > targetRatio) {
          cropWidth = Math.round(meta.height * targetRatio);
        } else {
          cropHeight = Math.round(meta.width / targetRatio);
        }
        
        const top = Math.round((meta.height - cropHeight) / 2);
        const left = Math.round((meta.width - cropWidth) / 2);
        
        await sharp(input)
          .extract({ left: left, top: top, width: cropWidth, height: cropHeight })
          .toFile(path.join(__dirname, newOutput));
          
        console.log(`Successfully cropped and saved to ${newOutput}`);
      } catch (err) {
        console.error(`Error processing ${input}:`, err);
      }
    }
  }
  
  // Now update ProductsGrid.tsx
  const gridPath = path.join(__dirname, 'src/components/ProductsGrid.tsx');
  let gridContent = fs.readFileSync(gridPath, 'utf8');
  gridContent = gridContent.replace(/_padded\.png/g, '_cropped.png');
  gridContent = gridContent.replace(/_padded\.jpg/g, '_cropped.jpg');
  fs.writeFileSync(gridPath, gridContent);
  console.log('Updated ProductsGrid.tsx');
}

run();
