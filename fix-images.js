const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/Graphics/.gemini/antigravity/brain/0d8ec40e-7fb5-472f-93ca-0c4f9c1b3ba9';
const originals = [
  { src: 'media__1781174253219.png', dest: 'public/images/refnet_y_joint.png', cropLeft: 0.35 },
  { src: 'media__1781174266997.png', dest: 'public/images/condenser_inlet.png', cropLeft: 0.35 },
  { src: 'media__1781174277887.png', dest: 'public/images/ahu_kit_daikin.png', cropLeft: 0.35 },
  { src: 'media__1781174294351.png', dest: 'public/images/5a_distributor.png', cropLeft: 0.35 },
  { src: 'media__1781174307253.png', dest: 'public/images/header_assy.png', cropLeft: 0.35 }
];

(async () => {
  for (let item of originals) {
    const srcFile = path.join(brainDir, item.src);
    const destFile = item.dest;
    
    try {
      const meta = await sharp(srcFile).metadata();
      const left = Math.floor(meta.width * item.cropLeft);
      const width = meta.width - left;
      const height = meta.height;
      
      const svgMask = Buffer.from(
        '<svg width=\"' + width + '\" height=\"' + height + '\">' +
          '<defs>' +
            '<radialGradient id=\"grad\" cx=\"50%\" cy=\"50%\" r=\"50%\">' +
              '<stop offset=\"55%\" stop-color=\"white\" stop-opacity=\"1\"/>' +
              '<stop offset=\"100%\" stop-color=\"white\" stop-opacity=\"0\"/>' +
            '</radialGradient>' +
          '</defs>' +
          '<rect x=\"0\" y=\"0\" width=\"' + width + '\" height=\"' + height + '\" fill=\"url(#grad)\" />' +
        '</svg>'
      );

      const maskedBuffer = await sharp(srcFile)
        .extract({ left: left, top: 0, width: width, height: height })
        .ensureAlpha()
        .composite([{ input: svgMask, blend: 'dest-in' }])
        .toBuffer();
        
      await sharp({
        create: {
          width: 800,
          height: 800,
          channels: 4,
          background: { r: 247, g: 248, b: 249, alpha: 1 }
        }
      })
      .composite([{ input: maskedBuffer, gravity: 'center' }])
      .toFile(destFile);
      
      console.log('Smoothed ' + destFile);
    } catch (e) {
      console.error(e);
    }
  }
})();
