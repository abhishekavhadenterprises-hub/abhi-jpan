const fs = require('fs');
const path = require('path');

const homeDir = path.join(__dirname, 'src', 'components', 'home');

const files = fs.readdirSync(homeDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(homeDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace `text-white` with `text-slate-900 dark:text-white` (avoiding already replaced or specific ones)
  // We need to be careful not to replace `text-white` inside buttons that should always be white
  
  // Replace `text-slate-300` or `text-slate-400` with `text-slate-600 dark:text-slate-300`
  content = content.replace(/text-slate-300/g, "text-slate-600 dark:text-slate-300");
  content = content.replace(/text-slate-400/g, "text-slate-500 dark:text-slate-400");
  
  // Replace section border
  content = content.replace(/border-white\/\[0\.08\]/g, "border-slate-200 dark:border-white/[0.08]");
  
  // Replace `bg-transparent text-white`
  content = content.replace(/bg-transparent text-white/g, "bg-transparent text-[#0D2440] dark:text-white");
  
  // Replace standard heading text white
  content = content.replace(/text-white leading-/g, "text-[#0D2440] dark:text-white leading-");
  
  // Replace cyan-400 (which is hard to see on white) to deep blue in light mode
  content = content.replace(/text-cyan-400/g, "text-[#2E5E99] dark:text-cyan-400");
  content = content.replace(/bg-cyan-400/g, "bg-[#2E5E99] dark:bg-cyan-400");
  content = content.replace(/shadow-\[0_0_6px_#38bdf8\]/g, "shadow-[0_0_6px_#2E5E99] dark:shadow-[0_0_6px_#38bdf8]");

  fs.writeFileSync(filePath, content, 'utf-8');
}

console.log("Updated home components for light mode");
