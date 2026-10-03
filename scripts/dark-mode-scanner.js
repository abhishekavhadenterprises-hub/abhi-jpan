const fs = require('fs');
const path = require('path');

const APP_DIR = path.resolve('./src/app');
const COMPONENTS_DIR = path.resolve('./src/components');

function getComponentCompliance(filePath) {
  if (!fs.existsSync(filePath)) return { exists: false, compliant: false, issues: ['File not found'] };
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, idx) => {
    // Only examine lines with class / className
    if (!line.includes('className') && !line.includes('class=')) return;

    // Check for solid base bg-white without dark:bg
    if (/(?<!hover:)bg-white(?!\/)\b/.test(line) && !/dark:bg-/.test(line)) {
      issues.push({ line: idx + 1, type: 'solid bg-white without dark:bg', text: line.trim() });
    }

    // Check for solid base bg-slate-50 / bg-gray-50 without dark:bg
    if (/(?<!hover:)bg-(slate|gray|zinc)-(50|100|200)(?!\/)\b/.test(line) && !/dark:bg-/.test(line)) {
      issues.push({ line: idx + 1, type: 'light background without dark:bg', text: line.trim() });
    }

    // Check for base dark text text-[#0D2440] without dark:text
    if (/(?<!hover:)text-\[#0D2440\](?!\/)/.test(line) && !/dark:(hover:)?text-/.test(line)) {
      issues.push({ line: idx + 1, type: 'hardcoded dark text without dark:text', text: line.trim() });
    }

    // Check for hover:text-[#0D2440] without dark:hover:text- or dark:text-
    if (/hover:text-\[#0D2440\]/.test(line) && !/dark:(hover:)?text-/.test(line)) {
      issues.push({ line: idx + 1, type: 'hover dark text without dark hover/text', text: line.trim() });
    }

    // Check for base light border without dark:border
    if (/(?<!hover:)border-(slate|gray)-(100|200|300)(?!\/)\b/.test(line) && !/dark:border-/.test(line)) {
      issues.push({ line: idx + 1, type: 'light border without dark:border', text: line.trim() });
    }
  });

  return {
    exists: true,
    compliant: issues.length === 0,
    issuesCount: issues.length,
    issues: issues.slice(0, 5) // top 5
  };
}

function findPages(dir, baseRoute = '') {
  let pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      pages = pages.concat(findPages(path.join(dir, entry.name), `${baseRoute}/${entry.name}`));
    } else if (entry.name === 'page.tsx') {
      pages.push({
        route: baseRoute === '' ? '/' : baseRoute,
        filePath: path.join(dir, entry.name)
      });
    }
  }
  return pages;
}

function extractImportedComponents(pageFilePath) {
  const content = fs.readFileSync(pageFilePath, 'utf8');
  const importRegex = /import\s+\{?([A-Za-z0-9_,\s]+)\}?\s+from\s+["'](@\/components(?:\/[^"']+)?)["']/g;
  const components = [];
  let match;

  // Build recursive map of all components in COMPONENTS_DIR once if needed
  function findComponentFile(name, relSubpath) {
    if (relSubpath && relSubpath !== '') {
      let target = path.join(COMPONENTS_DIR, relSubpath.endsWith('.tsx') ? relSubpath : `${relSubpath}.tsx`);
      if (fs.existsSync(target)) return target;
      let targetTs = path.join(COMPONENTS_DIR, relSubpath.endsWith('.ts') ? relSubpath : `${relSubpath}.ts`);
      if (fs.existsSync(targetTs)) return targetTs;
      let targetIdx = path.join(COMPONENTS_DIR, relSubpath, 'index.tsx');
      if (fs.existsSync(targetIdx)) return targetIdx;
      let targetIdxTs = path.join(COMPONENTS_DIR, relSubpath, 'index.ts');
      if (fs.existsSync(targetIdxTs)) return targetIdxTs;
    }
    // Search recursively
    function searchDir(d) {
      for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, ent.name);
        if (ent.isDirectory()) {
          const res = searchDir(full);
          if (res) return res;
        } else if (ent.name === `${name}.tsx` || ent.name === `${name}.ts`) {
          return full;
        }
      }
      return null;
    }
    return searchDir(COMPONENTS_DIR);
  }

  while ((match = importRegex.exec(content)) !== null) {
    const rawNames = match[1];
    const importPath = match[2];
    const relComponent = importPath.replace('@/components/', '').replace('@/components', '');
    
    const compNames = rawNames.split(',').map(s => s.trim().split(' as ')[0]).filter(Boolean);
    compNames.forEach(name => {
      const resolvedFile = findComponentFile(name, relComponent);
      components.push({
        name,
        importPath,
        resolvedFile: resolvedFile || path.join(COMPONENTS_DIR, `${name}.tsx`)
      });
    });
  }

  return components;
}

function runScanner() {
  console.log('========================================================================');
  console.log(' 🔍 JPAN TUBULAR SITE-WIDE DARK MODE CHECKLIST & SCANNER');
  console.log('========================================================================\n');

  const pages = findPages(APP_DIR);
  const results = [];

  let totalPages = pages.length;
  let passedPages = 0;
  let failedPages = 0;

  let totalSectionsScanned = 0;
  let passedSections = 0;
  let failedSections = 0;

  for (const page of pages) {
    const pageCompliance = getComponentCompliance(page.filePath);
    const components = extractImportedComponents(page.filePath);

    const sectionResults = [];
    let pageHasIssue = !pageCompliance.compliant;

    for (const comp of components) {
      totalSectionsScanned++;
      const compCompliance = getComponentCompliance(comp.resolvedFile);
      if (compCompliance.compliant) {
        passedSections++;
      } else {
        failedSections++;
        pageHasIssue = true;
      }

      sectionResults.push({
        name: comp.name,
        file: path.relative('.', comp.resolvedFile).replace(/\\/g, '/'),
        compliant: compCompliance.compliant,
        issuesCount: compCompliance.issuesCount,
        sampleIssue: compCompliance.issues ? compCompliance.issues[0] : null
      });
    }

    if (!pageHasIssue) {
      passedPages++;
    } else {
      failedPages++;
    }

    results.push({
      route: page.route,
      pageFile: path.relative('.', page.filePath).replace(/\\/g, '/'),
      pageCompliant: pageCompliance.compliant,
      isFullyDone: !pageHasIssue,
      sections: sectionResults
    });
  }

  // Print Output Table / Checklist
  console.log(`Summary: ${totalPages} Routes | ${totalSectionsScanned} Total Sections/Components\n`);

  results.forEach((res, idx) => {
    const statusBadge = res.isFullyDone ? '✅ [DONE]' : '❌ [NEEDS POLISH]';
    console.log(`${idx + 1}. Route: ${res.route.padEnd(35)} ${statusBadge}`);
    
    if (res.sections.length > 0) {
      res.sections.forEach(sec => {
        const secBadge = sec.compliant ? '  ✓' : '  ✗';
        const details = sec.compliant ? 'DONE' : `PENDING (${sec.issuesCount} unadapted tokens)`;
        console.log(`   ${secBadge} ${sec.name.padEnd(35)} -> ${details}`);
        if (!sec.compliant && sec.sampleIssue) {
          console.log(`       [Line ${sec.sampleIssue.line}]: ${sec.sampleIssue.type}`);
        }
      });
    } else {
      console.log('   (Self-contained page layout)');
    }
    console.log('');
  });

  console.log('========================================================================');
  console.log(` 📊 OVERALL SCAN METRICS:`);
  console.log(`    - Pages Fully Compliant:   ${passedPages} / ${totalPages} (${Math.round((passedPages / totalPages) * 100)}%)`);
  console.log(`    - Pages Requiring Polish:  ${failedPages} / ${totalPages}`);
  console.log(`    - Sections Fully Compliant:${passedSections} / ${totalSectionsScanned} (${Math.round((passedSections / totalSectionsScanned) * 100)}%)`);
  console.log(`    - Sections Requiring Polish:${failedSections} / ${totalSectionsScanned}`);
  console.log('========================================================================\n');

  // Export JSON report
  const reportPath = path.resolve('./dark_mode_scanner_results.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    metrics: {
      totalPages,
      passedPages,
      failedPages,
      pagePassRate: `${Math.round((passedPages / totalPages) * 100)}%`,
      totalSectionsScanned,
      passedSections,
      failedSections,
      sectionPassRate: `${Math.round((passedSections / totalSectionsScanned) * 100)}%`
    },
    results
  }, null, 2));

  console.log(`Detailed JSON checklist saved to: ${reportPath}`);
}

runScanner();
