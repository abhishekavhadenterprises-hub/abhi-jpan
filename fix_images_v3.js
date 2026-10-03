const sharp = require('sharp');
const fs = require('fs');

const originals = [
  { src: 'public/images/premium_refnet.png', dest: 'public/images/refnet_final_v3.png' },
  { src: 'public/images/premium_condenser_inlet.png', dest: 'public/images/condenser_inlet_final_v3.png' },
  { src: 'public/images/copper_return_bends_premium.png', dest: 'public/images/ahu_kit_final_v3.png' }
];

(async () => {
  for (let item of originals) {
    if (!fs.existsSync(item.src)) { 
      console.log('Missing', item.src); 
      continue; 
    }
    try {
      // Create a premium dark radial background to match the others
      const bgBuffer = Buffer.from(`
        <svg width="800" height="800">
          <defs>
            <radialGradient id="spot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#2a2a2a" stop-opacity="1"/>
              <stop offset="100%" stop-color="#080808" stop-opacity="1"/>
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="800" height="800" fill="url(#spot)" />
        </svg>
      `);

      // Resize the original so it fits nicely inside
      const resizedOriginal = await sharp(item.src)
        .resize({ width: 600, height: 600, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer();

      // Composite the resized original over the premium dark background
      await sharp(bgBuffer)
      .composite([{ input: resizedOriginal, gravity: 'center' }])
      .toFile(item.dest);
      
      console.log('Generated ' + item.dest);
    } catch (e) {
      console.error(e);
    }
  }
})();
