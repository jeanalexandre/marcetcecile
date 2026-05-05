import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, 'public', 'images');
const outputDir = join(__dirname, 'public', 'images-optimized');

// Créer le dossier de sortie s'il n'existe pas
await mkdir(outputDir, { recursive: true });

async function optimizeImage(filePath, fileName) {
  const ext = extname(fileName).toLowerCase();

  // Traiter uniquement les PNG
  if (ext !== '.png') {
    console.log(`⏭️  Ignoring ${fileName}`);
    return;
  }

  const outputFileName = basename(fileName, ext) + '.webp';
  const outputPath = join(outputDir, outputFileName);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    console.log(`🖼️  Converting ${fileName} (${metadata.width}x${metadata.height})`);

    // Créer plusieurs versions: mobile, tablet, desktop
    const sizes = [
      { width: 400, suffix: '-mobile' },
      { width: 800, suffix: '-tablet' },
      { width: 1200, suffix: '-desktop' },
    ];

    // Version principale optimisée
    await image
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`✅ Created ${outputFileName}`);

    // Créer les versions responsive
    for (const { width, suffix } of sizes) {
      if (metadata.width > width) {
        const resizedPath = join(outputDir, basename(fileName, ext) + suffix + '.webp');
        await sharp(filePath)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(resizedPath);
        console.log(`   ↳ Created ${basename(resizedPath)}`);
      }
    }

  } catch (error) {
    console.error(`❌ Error processing ${fileName}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  const files = await readdir(dirPath);

  for (const file of files) {
    const filePath = join(dirPath, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      await optimizeImage(filePath, file);
    }
  }
}

console.log('🚀 Starting image optimization...\n');
await processDirectory(sourceDir);
console.log('\n✨ Optimization complete!');
console.log(`📁 Optimized images saved to: ${outputDir}`);

