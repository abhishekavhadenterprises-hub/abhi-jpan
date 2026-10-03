const sharp = require('sharp');

const rawFile = 'public/images/flare_nut_b_raw.png';
const destFile = 'public/images/flare_nut_b_premium.png';
const referenceBg = 'public/images/steel_component.png';

(async () => {
  try {
    const bgBuffer = await sharp(referenceBg)
      .resize(800, 800, { fit: 'cover' })
      .blur(40)
      .modulate({ brightness: 0.8 })
      .toBuffer();

    const meta = await sharp(rawFile).metadata();
    
    const svgMask = Buffer.from(
      '<svg width=\"' + meta.width + '\" height=\"' + meta.height + '\">' +
        '<defs>' +
          '<radialGradient id=\"grad\" cx=\"50%\" cy=\"50%\" r=\"50%\">' +
            '<stop offset=\"50%\" stop-color=\"white\" stop-opacity=\"1\"/>' +
            '<stop offset=\"90%\" stop-color=\"white\" stop-opacity=\"0\"/>' +
          '</radialGradient>' +
        '</defs>' +
        '<rect x=\"0\" y=\"0\" width=\"' + meta.width + '\" height=\"' + meta.height + '\" fill=\"url(#grad)\" />' +
      '</svg>'
    );

    const componentBuffer = await sharp(rawFile)
      .ensureAlpha()
      .composite([{ input: svgMask, blend: 'dest-in' }])
      .toBuffer();
      
    await sharp(bgBuffer)
      .composite([{ input: componentBuffer, gravity: 'center' }])
      .toFile(destFile);
    
    console.log('Processed FLARE NUT - B premium image.');
  } catch (e) {
    console.error(e);
  }
})();
