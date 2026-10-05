const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components', 'home');
const filesToFix = [
  'Certifications.tsx',
  'ContactPreview.tsx',
  'Hero.tsx',
  'Industries.tsx',
  'Infrastructure.tsx',
  'ProductShowcase.tsx',
  'WhyChooseUs.tsx'
];

for (const file of filesToFix) {
  let filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('import { ScrollWipeHeading }')) {
    // Insert just after the first import statement
    const firstImportIdx = content.indexOf('import ');
    if (firstImportIdx !== -1) {
      const insertionPoint = content.indexOf('\n', firstImportIdx) + 1;
      content = content.slice(0, insertionPoint) + 'import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";\n' + content.slice(insertionPoint);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed imports in ${file}`);
    }
  }
}
