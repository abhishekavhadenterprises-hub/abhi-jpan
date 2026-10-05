const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components', 'home');

const targets = [
  {
    file: 'Certifications.tsx',
    search: '<h2 className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05] uppercase whitespace-nowrap">',
    close: '</h2>',
    as: 'h2'
  },
  {
    file: 'ContactPreview.tsx',
    search: '<h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase text-[#0D2440] dark:text-white leading-[1.02] mb-4">',
    close: '</h2>',
    as: 'h2'
  },
  {
    file: 'Hero.tsx',
    search: '<h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-[3.75rem] xl:text-[4.5rem] 2xl:text-[5rem] font-heading font-black tracking-tight leading-[0.96] text-[#0D2440] dark:text-white uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">',
    close: '</h1>',
    as: 'h1'
  },
  {
    file: 'Industries.tsx',
    search: '<h3 className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">',
    close: '</h3>',
    as: 'h3'
  },
  {
    file: 'Infrastructure.tsx',
    search: '<h3 className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">',
    close: '</h3>',
    as: 'h3'
  },
  {
    file: 'ProductShowcase.tsx',
    search: '<h3 className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">',
    close: '</h3>',
    as: 'h3'
  },
  {
    file: 'WhyChooseUs.tsx',
    search: '<h3 className="text-4xl md:text-5xl lg:text-[5rem] font-light tracking-tight text-[#111] dark:text-white leading-[1.05]">',
    close: '</h3>',
    as: 'h3'
  }
];

for (const target of targets) {
  let filePath = path.join(componentsDir, target.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if missing
  if (!content.includes('ScrollWipeHeading')) {
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfImport = content.indexOf('\\n', lastImportIndex);
    content = content.replace(/^(import.*\\n)+/m, (match) => match + 'import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";\\n');
  }

  // Find start tag
  const startIdx = content.indexOf(target.search);
  if (startIdx === -1) {
    console.log(`Could not find search string in ${target.file}`);
    continue;
  }

  // Find close tag after start tag
  const closeIdx = content.indexOf(target.close, startIdx);
  if (closeIdx === -1) {
    console.log(`Could not find close string in ${target.file}`);
    continue;
  }

  // Extract inner content
  const innerContent = content.substring(startIdx + target.search.length, closeIdx);

  // Extract className
  const classMatch = target.search.match(/className="([^"]+)"/);
  const className = classMatch ? classMatch[1] : '';

  // Build replacement
  const replacement = `<ScrollWipeHeading as="${target.as}" className="${className}">${innerContent}</ScrollWipeHeading>`;

  // Replace
  content = content.substring(0, startIdx) + replacement + content.substring(closeIdx + target.close.length);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${target.file}`);
}
