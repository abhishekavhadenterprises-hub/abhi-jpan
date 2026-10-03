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
      const output = outputMatch[1];
      
      console.log(`Processing ${input} -> ${output}`);
      
      try {
        const meta = await sharp(input).metadata();
        
        // Target ratio 5:4
        const targetRatio = 5 / 4;
        
        let cropWidth = meta.width;
        let cropHeight = meta.height;
        
        // Assuming the image is 1024x1024
        // target width is 1024, height should be 819
        if (meta.width / meta.height > targetRatio) {
          cropWidth = Math.round(meta.height * targetRatio);
        } else {
          cropHeight = Math.round(meta.width / targetRatio);
        }
        
        const top = Math.round((meta.height - cropHeight) / 2);
        const left = Math.round((meta.width - cropWidth) / 2);
        
        await sharp(input)
          .extract({ left: left, top: top, width: cropWidth, height: cropHeight })
          .toFile(path.join(__dirname, output));
          
        console.log(`Successfully cropped to ${cropWidth}x${cropHeight} and saved to ${output}`);
      } catch (err) {
        console.error(`Error processing ${input}:`, err);
      }
    }
  }
}

run();
