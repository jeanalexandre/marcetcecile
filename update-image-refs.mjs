#!/usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';

const files = await glob('src/pages/**/*.astro');

for (const file of files) {
  let content = await readFile(file, 'utf-8');
  let modified = false;

  // Remplacer les références PNG par WebP optimisées
  const imagePattern = /\/images\/([a-zA-Z0-9-_]+)\.png/g;

  if (imagePattern.test(content)) {
    content = content.replace(imagePattern, '/images-optimized/$1.webp');
    modified = true;
  }

  if (modified) {
    await writeFile(file, content, 'utf-8');
    console.log(`✅ Updated: ${file}`);
  }
}

console.log('\n✨ All image references updated!');

