const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') results = results.concat(walk(full));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(full);
    }
  }
  return results;
}

// 1. Build map of all components in src/components (basename -> new path)
const compFiles = walk('src/components');
const compMap = new Map(); // e.g. 'PoliciesHero' -> 'investors/policies-codes/PoliciesHero'

for (const f of compFiles) {
  const rel = path.relative('src/components', f).replace(/\\/g, '/');
  const base = path.basename(f, path.extname(f));
  if (base !== 'index') {
    compMap.set(base, rel.replace(/\.(tsx|ts)$/, ''));
  }
}

console.log('Total indexed components:', compMap.size);

// 2. Scan all files in src
const allSrcFiles = walk('src');
let fixedCount = 0;

for (const filePath of allSrcFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern A: from "@/components/SomeName"
  // If SomeName is in compMap and not directly existing
  content = content.replace(/from\s+['"]@\/components\/([^'"]+)['"]/g, (match, p1) => {
    // Check if @/components/p1 actually exists
    const directPath1 = path.join('src/components', p1 + '.tsx');
    const directPath2 = path.join('src/components', p1 + '.ts');
    const directDir = path.join('src/components', p1, 'index.ts');
    const directDirTsx = path.join('src/components', p1, 'index.tsx');

    if (fs.existsSync(directPath1) || fs.existsSync(directPath2) || fs.existsSync(directDir) || fs.existsSync(directDirTsx)) {
      return match; // valid as is
    }

    // Lookup base name
    const baseName = path.basename(p1);
    if (compMap.has(baseName)) {
      const newSubPath = compMap.get(baseName);
      modified = true;
      fixedCount++;
      return `from "@/components/${newSubPath}"`;
    }
    return match;
  });

  // Pattern B: relative imports inside src/components that broke
  // e.g. import ... from "./BrandIcons" inside Leadership.tsx or BlogDetailModal.tsx
  if (filePath.includes('src\\components\\') || filePath.includes('src/components/')) {
    // check for ./BrandIcons or similar
    content = content.replace(/from\s+['"]\.\/BrandIcons['"]/g, () => {
      modified = true;
      fixedCount++;
      return `from "@/components/ui/BrandIcons"`;
    });

    content = content.replace(/from\s+['"]\.\/shared\/ContactMap['"]/g, () => {
      modified = true;
      fixedCount++;
      return `from "@/components/contact/ContactMap"`;
    });

    content = content.replace(/from\s+['"]\.\/ProductCard['"]/g, () => {
      modified = true;
      fixedCount++;
      return `from "@/components/products/shared/ProductCard"`;
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('Fixed imports count:', fixedCount);
