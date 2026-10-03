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

const referenceBg = 'public/images/steel_component.png';

(async () => {
  try {
    // Create a smooth abstract premium background by heavily blurring the reference image
    const bgBuffer = await sharp(referenceBg)
      .resize(800, 800, { fit: 'cover' })
      .blur(40) // heavy blur to smooth out the original pipes and keep the dark gradient/lighting
      .modulate({ brightness: 0.8 }) // slightly darken so the new copper component pops
      .toBuffer();

    for (let item of originals) {
      const srcFile = path.join(brainDir, item.src);
      const destFile = item.dest;
      
      const meta = await sharp(srcFile).metadata();
      const left = Math.floor(meta.width * item.cropLeft);
      const width = meta.width - left;
      const height = meta.height;
      
      // We create a sharp radial mask to smoothly blend out the factory background of the component
      const svgMask = Buffer.from(
        '<svg width=\"' + width + '\" height=\"' + height + '\">' +
          '<defs>' +
            '<radialGradient id=\"grad\" cx=\"50%\" cy=\"50%\" r=\"50%\">' +
              '<stop offset=\"50%\" stop-color=\"white\" stop-opacity=\"1\"/>' +
              '<stop offset=\"90%\" stop-color=\"white\" stop-opacity=\"0\"/>' +
            '</radialGradient>' +
          '</defs>' +
          '<rect x=\"0\" y=\"0\" width=\"' + width + '\" height=\"' + height + '\" fill=\"url(#grad)\" />' +
        '</svg>'
      );

      // Extract the component and apply the soft mask
      const componentBuffer = await sharp(srcFile)
        .extract({ left: left, top: 0, width: width, height: height })
        .ensureAlpha()
        .composite([{ input: svgMask, blend: 'dest-in' }])
        .toBuffer();
        
      // Composite the masked component onto the premium blurred reference background
      await sharp(bgBuffer)
        .composite([{ input: componentBuffer, gravity: 'center' }])
        .toFile(destFile);
      
      console.log('Applied exact matching premium background to ' + destFile);
    }
  } catch (e) {
    console.error(e);
  }
})();
