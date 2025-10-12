import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_DIR = './public';
const OUTPUT_DIR = './public/optimized';
const QUALITY = {
  jpeg: 80,
  png: 80,
  webp: 80
};

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get all image files
function getImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'optimized') {
      // Recursively search subdirectories
      files.push(...getImageFiles(fullPath));
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (IMAGE_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

// Optimize a single image
async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const name = path.basename(inputPath, ext);
    const relativePath = path.relative(INPUT_DIR, inputPath);
    const outputPath = path.join(OUTPUT_DIR, relativePath);
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    let sharpInstance = sharp(inputPath);
    
    // Get image metadata
    const metadata = await sharpInstance.metadata();
    console.log(`Processing: ${relativePath} (${metadata.width}x${metadata.height})`);
    
    // Resize if image is too large (max width 1200px for main images, 800px for gallery)
    const maxWidth = relativePath.includes('main') ? 1200 : 800;
    if (metadata.width > maxWidth) {
      sharpInstance = sharpInstance.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Optimize based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharpInstance
        .jpeg({ 
          quality: QUALITY.jpeg,
          progressive: true,
          mozjpeg: true
        })
        .toFile(outputPath);
    } else if (ext === '.png') {
      await sharpInstance
        .png({ 
          quality: QUALITY.png,
          compressionLevel: 9,
          progressive: true
        })
        .toFile(outputPath);
    }
    
    // Also create WebP version for better compression
    const webpPath = outputPath.replace(ext, '.webp');
    await sharp(inputPath)
      .resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath);
    
    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const webpSize = fs.statSync(webpPath).size;
    
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`  ✓ Optimized: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    console.log(`  ✓ WebP: ${(webpSize / 1024).toFixed(1)}KB (${webpSavings}% smaller)`);
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  const imageFiles = getImageFiles(INPUT_DIR);
  console.log(`Found ${imageFiles.length} images to optimize\n`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let totalWebpSize = 0;
  
  for (const imageFile of imageFiles) {
    const originalSize = fs.statSync(imageFile).size;
    totalOriginalSize += originalSize;
    
    await optimizeImage(imageFile);
    
    const ext = path.extname(imageFile).toLowerCase();
    const relativePath = path.relative(INPUT_DIR, imageFile);
    const outputPath = path.join(OUTPUT_DIR, relativePath);
    const webpPath = outputPath.replace(ext, '.webp');
    
    if (fs.existsSync(outputPath)) {
      totalOptimizedSize += fs.statSync(outputPath).size;
    }
    if (fs.existsSync(webpPath)) {
      totalWebpSize += fs.statSync(webpPath).size;
    }
    
    console.log(''); // Empty line for readability
  }
  
  console.log('📊 Optimization Summary:');
  console.log(`Original total size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`\n💾 Space saved: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`💾 WebP savings: ${((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log('\n✅ Image optimization complete!');
}

main().catch(console.error);
