  const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components', 'home');

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already imported
  if (!content.includes('ScrollWipeHeading')) {
    // Add import statement after the last import
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfImport = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfImport + 1) + 'import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";\n' + content.slice(endOfImport + 1);
    } else {
      content = 'import { ScrollWipeHeading } from "@/components/ui/ScrollWipeHeading";\n' + content;
    }
  }

  // Now replace main heading. Look for `<h1` or `<h2` or `<motion.h2` with text-4xl or larger.
  // Actually, simple regex replacement is dangerous for nested content.
  // Let's just output the lines containing h1/h2 with big text so we can see them.
  console.log(`--- ${file} ---`);
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.match(/<h[123].*(text-4xl|text-5xl|text-6xl|text-7xl)/) || line.match(/<motion\.h[123].*(text-4xl|text-5xl|text-6xl|text-7xl)/)) {
      console.log(`${i + 1}: ${line}`);
    }
  });
}
