const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(srcDir);
const heroFiles = allFiles.filter(f => f.endsWith('Hero.tsx') && !f.includes('home\\Hero.tsx') && !f.includes('PremiumHero.tsx') && !f.includes('ProductsHero.tsx'));

console.log(`Found ${heroFiles.length} hero files to process.`);

heroFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Extract component name
  const componentMatch = content.match(/export function ([A-Za-z0-9_]+)\(/);
  if (!componentMatch) return;
  const componentName = componentMatch[1];

  // Extract image source
  const imgMatch = content.match(/src="(\/images\/[^"]+)"/);
  const imageSrc = imgMatch ? imgMatch[1] : '/images/default-hero.jpg';

  // Extract title
  let title = '';
  let subtitle = '';
  
  // Try to find h1 content
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || content.match(/<motion\.h1[^>]*>([\s\S]*?)<\/motion\.h1>/);
  if (h1Match) {
    const h1Content = h1Match[1];
    // Remove tags but keep span for subtitle splitting if possible
    // Some have <br />
    const cleaned = h1Content.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ');
    
    const spanMatch = h1Content.match(/<span[^>]*>(.*?)<\/span>/);
    if (spanMatch) {
      const spanText = spanMatch[1].replace(/<[^>]+>/g, '').trim();
      subtitle = spanText;
      title = cleaned.replace(/<span[^>]*>.*?<\/span>/gi, '').replace(/<[^>]+>/g, '').trim();
    } else {
      title = cleaned.replace(/<[^>]+>/g, '').trim();
    }
  }

  // Extract description
  let description = '';
  const pMatch = content.match(/<p[^>]*>([\s\S]*?)<\/p>/) || content.match(/<motion\.p[^>]*>([\s\S]*?)<\/motion\.p>/);
  if (pMatch) {
    description = pMatch[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  }

  // Extract badge text (span inside something with tracking or uppercase)
  let badgeText = '';
  const badgeMatch = content.match(/<span[^>]*uppercase[^>]*>([\s\S]*?)<\/span>/);
  if (badgeMatch) {
    badgeText = badgeMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  if (!title) title = componentName.replace('Hero', '');
  if (!subtitle) subtitle = '';

  const newContent = `"use client";

import React from "react";
import { PremiumHero } from "@/components/ui/PremiumHero";

export function ${componentName}() {
  return (
    <PremiumHero 
      title="${title.replace(/"/g, '\\"')}"
      subtitle="${subtitle.replace(/"/g, '\\"')}"
      description="${description.replace(/"/g, '\\"')}"
      imageSrc="${imageSrc}"
      ${badgeText ? `badgeText="${badgeText.replace(/"/g, '\\"')}"` : ''}
    />
  );
}
`;

  fs.writeFileSync(file, newContent, 'utf8');
  console.log(`Processed: ${componentName}`);
});
