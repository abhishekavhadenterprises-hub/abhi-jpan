const fs = require('fs');
const path = require('path');
const navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
const footer = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
const navLinks = [...navbar.matchAll(/href:\s*['"`](\/[a-zA-Z0-9-]+)/g)].map(m => m[1]);
const footLinks = [...footer.matchAll(/href=["'](\/[a-zA-Z0-9-]+)/g)].map(m => m[1]);
const allLinks = [...new Set([...navLinks, ...footLinks])].filter(l => l !== '/');
const missing = allLinks.filter(l => !fs.existsSync(path.join('src/app', l)));
console.log('Missing routes:', missing);
