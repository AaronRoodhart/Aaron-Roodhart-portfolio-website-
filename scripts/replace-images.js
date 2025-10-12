import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OPTIMIZED_DIR = './public/optimized';
const PUBLIC_DIR = './public';

// Get all optimized images
function getOptimizedImages(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getOptimizedImages(fullPath));
    } else if (stat.isFile()) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Replace original images with optimized versions
async function replaceImages() {
  console.log('🔄 Replacing original images with optimized versions...\n');
  
  const optimizedImages = getOptimizedImages(OPTIMIZED_DIR);
  let replacedCount = 0;
  
  for (const optimizedPath of optimizedImages) {
    try {
      // Get relative path from optimized directory
      const relativePath = path.relative(OPTIMIZED_DIR, optimizedPath);
      const originalPath = path.join(PUBLIC_DIR, relativePath);
      
      // Skip WebP files for now (we'll handle them separately)
      if (path.extname(optimizedPath) === '.webp') {
        continue;
      }
      
      // Check if original file exists
      if (fs.existsSync(originalPath)) {
        // Backup original (optional - you can remove this if you don't want backups)
        const backupPath = originalPath + '.backup';
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(originalPath, backupPath);
        }
        
        // Replace with optimized version
        fs.copyFileSync(optimizedPath, originalPath);
        
        const originalSize = fs.statSync(originalPath + '.backup').size;
        const optimizedSize = fs.statSync(originalPath).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✓ Replaced: ${relativePath} (${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB, ${savings}% smaller)`);
        replacedCount++;
      } else {
        console.log(`⚠️  Original not found: ${relativePath}`);
      }
    } catch (error) {
      console.error(`Error replacing ${optimizedPath}:`, error.message);
    }
  }
  
  console.log(`\n✅ Replaced ${replacedCount} images with optimized versions!`);
  console.log('\n💡 Note: Original images are backed up with .backup extension');
  console.log('💡 WebP versions are available in the optimized folder for future use');
}

replaceImages().catch(console.error);
