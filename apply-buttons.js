const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/components');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Remove existing slide-up divs to prevent double animation since we are using CSS ::before
  content = content.replace(/<div\s+className=["'][^"']*absolute\s+-?inset-[^"']*translate-y-(full|\[100\%\])[^"']*["']\s*\/>/g, '');
  content = content.replace(/<motion\.div\s+className=["'][^"']*absolute\s+-?inset-[^"']*translate-y-(full|\[100\%\])[^"']*["']\s*\/>/g, '');

  // 2. Add btn-slide-* to buttons and links with bg- and px-
  content = content.replace(/<(button|Link)([^>]*?)className=(["'])(.*?)\3([^>]*?)>/g, (match, tag, before, quote, classes, after) => {
    if (classes.includes('px-') && classes.includes('py-') && classes.includes('bg-')) {
      if (!classes.includes('btn-slide-gold') && !classes.includes('btn-slide-white')) {
        let newClasses = classes.replace(/hover:bg-[a-zA-Z0-9\/-]+|hover:text-[a-zA-Z0-9\/-]+|group-hover:text-[a-zA-Z0-9\/-]+|group-hover\/btn:text-[a-zA-Z0-9\/-]+/g, '');
        newClasses = newClasses.replace(/\s+/g, ' ').trim();
        
        if (newClasses.includes('bg-gold')) {
          newClasses += ' btn-slide-white group';
        } else {
          newClasses += ' btn-slide-gold group';
        }
        return `<${tag}${before}className=${quote}${newClasses}${quote}${after}>`;
      }
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified ' + modifiedCount + ' files.');
