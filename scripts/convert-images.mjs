import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const inputDir = './src/assets/image';
const outputDir = './public/image';

// Helper to convert bytes to a readable string (KB/MB)
const formatSize = (bytes) => (bytes / 1024).toFixed(2) + ' KB';

async function convertToWebp() {
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  const files = await fs.readdir(inputDir);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const fileName = path.parse(file).name;
    const outputPath = path.join(outputDir, `${fileName}.webp`);
    const statsBefore = await fs.stat(inputPath);

    // Only convert common image formats
    if (/\.(jpe?g|png|tiff)$/i.test(file)) {
      await sharp(inputPath)
        .resize({
          width: 256, height: 256, withoutEnlargement: true
        })
        .webp({ quality: 75 }) // 80 is the sweet spot for WebP
        .toFile(outputPath);

      const statsAfter = await fs.stat(outputPath);
      console.log(`✅ Converted: ${file} -> ${fileName}.webp (${formatSize(statsBefore.size)} -> ${formatSize(statsAfter.size)})`);
    }
  }
}

convertToWebp().catch(console.error);
