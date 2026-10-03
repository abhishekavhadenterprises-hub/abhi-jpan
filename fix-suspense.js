const fs = require('fs');
const path = require('path');

const files = [
  'FinancialResultsList.tsx', 
  'FinancialFilter.tsx', 
  'AnnualReportsGrid.tsx', 
  'AnnualReportsFilter.tsx', 
  'StatementOfDeviationsListing.tsx', 
  'StatementOfDeviationsFilter.tsx'
];

files.forEach(file => {
  const fullPath = path.join('./src/components', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if we already wrapped it to avoid double-wrapping
    if (content.includes('React.Suspense') && content.includes('Inner')) {
      console.log('Skipping (already wrapped):', file);
      return;
    }

    const exportRegex = /export function ([A-Za-z0-9_]+)\(([^)]*)\)\s*\{/;
    const match = content.match(exportRegex);
    if(match) {
      const name = match[1];
      const args = match[2];
      
      // Determine what to pass to Inner component
      let propsString = '';
      if (args.includes('props')) {
        propsString = '{...props}';
      } else if (args.trim() !== '') {
        // If it uses destructured args like `{ data }`, we can't just pass `{...data}` easily without changing signature.
        // Let's just change the signature of the exported wrapper to `(props: any)` or similar.
        // Or simply replace the first line entirely, renaming to Inner, and inject the wrapper before it.
      }
      
      // Better approach:
      // Just replace "export function Name" with "function NameInner"
      // and prepend the wrapper:
      // "export function Name(props: any) { return <React.Suspense><NameInner {...props}/></React.Suspense>; }\n"
      
      content = content.replace(exportRegex, `export function ${name}(props: any) {\n  return (\n    <React.Suspense fallback={<div className="py-12 text-center text-charcoal/50">Loading...</div>}>\n      <${name}Inner {...props} />\n    </React.Suspense>\n  );\n}\n\nfunction ${name}Inner(${args}) {`);
      
      fs.writeFileSync(fullPath, content);
      console.log('Wrapped:', name);
    }
  } else {
    console.log('File not found:', fullPath);
  }
});
