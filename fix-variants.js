const fs = require('fs');
const path = require('path');

const dir = './src';
const walkSync = (d) => {
  let results = [];
  const list = fs.readdirSync(d);
  list.forEach(file => {
    const fileDir = path.join(d, file);
    const stat = fs.statSync(fileDir);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkSync(fileDir));
    } else {
      if(fileDir.endsWith('.tsx') || fileDir.endsWith('.ts')) {
        results.push(fileDir);
      }
    }
  });
  return results;
}

const files = walkSync(dir);
let changedCount = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const variantsRegex = /const ([a-zA-Z0-9_]+Variants) = \{/g;
  if (variantsRegex.test(content)) {
    content = content.replace(variantsRegex, 'const $1: Variants = {');
    changed = true;
  }

  if (changed) {
    if (content.includes('framer-motion')) {
      content = content.replace(/import\s+\{([^}]+)\}\s+from\s+["']framer-motion["']/, (match, p1) => {
        if (p1.includes('Variants')) return match;
        return `import { ${p1.trim()}, Variants } from "framer-motion"`;
      });
    } else {
      content = `import { Variants } from "framer-motion";\n` + content;
    }
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log(`Updated ${file}`);
  }
});
console.log('Total files fixed:', changedCount);
