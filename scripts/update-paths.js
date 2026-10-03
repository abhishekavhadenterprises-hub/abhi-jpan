const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = 'c:/Users/Graphics/Downloads/mjpan/jpan-web/src/data/products.ts';
const PRODUCTS_DIR = 'c:/Users/Graphics/Downloads/mjpan/jpan-web/public/products';

// Read the list of processed images
const processedFiles = fs.readdirSync(PRODUCTS_DIR);
console.log(`Found ${processedFiles.length} processed images in public/products/`);

// Read products.ts
let content = fs.readFileSync(PRODUCTS_FILE, 'utf8');

// Build a mapping: original filename (without ext) -> new png filename
// Current format: "/Orignal Images 22-7-26/FILENAME.ext"
// Target format:  "/products/FILENAME.png"

const regex = /\"\/Orignal Images 22-7-26\/([^"]+)\"/g;
let replacements = 0;

content = content.replace(regex, (match, originalFilename) => {
  const baseName = path.basename(originalFilename, path.extname(originalFilename));
  const newPath = `/products/${baseName}.png`;
  
  // Verify the file exists
  const fullPath = path.join(PRODUCTS_DIR, `${baseName}.png`);
  if (fs.existsSync(fullPath)) {
    replacements++;
    return `"${newPath}"`;
  } else {
    console.warn(`WARNING: No processed file found for: ${baseName}.png`);
    return match; // Keep original if not found
  }
});

fs.writeFileSync(PRODUCTS_FILE, content, 'utf8');
console.log(`Updated ${replacements} image paths in products.ts`);
