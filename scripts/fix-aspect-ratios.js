import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BACKUP_DIR = './public';
const OUTPUT_DIR = './public';

// Images that should maintain their aspect ratio (don't force resize)
const PRESERVE_ASPECT_IMAGES = [
  '3d-1.png', '3d-2.png', '3d-3.png', '3d-4.png',
  'backpack-1.jpeg', 'backpack-2.jpeg', 'backpack-3.jpeg',
  'custom-1.jpg', 'custom-2.JPG', 'custom-3.jpg', 'custom-4.JPG', 'custom-5.jpg',
  'dot-1.jpeg', 'dot-2.JPG', 'dot-3.JPG', 'dot-4.JPG', 'dot-5.JPG',
  'photo1.png', 'photo2.png', 'photo3.png', 'photo4.png', 'photo5.png', 'photo6.png', 'photo7.png', 'photo8.png',
  'IMG_0350.JPG', 'IMG_1572.JPG', 'IMG_1873.JPG', 'IMG_2458.JPG', 'IMG_3175.JPG', 'IMG_3177_Original.JPG', 'IMG_5982.JPG',
  '4298327E-377B-4D54-8A1A-56697C2C9640.jpeg',
  'vipassana-main.JPG'
];

// Get all backup files
function getBackupFiles() {
  const files = [];
  const items = fs.readdirSync(BACKUP_DIR);
  
  for (const item of items) {
    if (item.endsWith('.backup')) {
      files.push(path.join(BACKUP_DIR, item));
    }
  }
  
  return files;
}

// Fix aspect ratio for a single image
async function fixAspectRatio(backupPath) {
  try {
    const originalPath = backupPath.replace('.backup', '');
    const fileName = path.basename(originalPath);
    
    console.log(`Fixing aspect ratio for: ${fileName}`);
    
    // Get original image metadata
    const originalMetadata = await sharp(backupPath).metadata();
    console.log(`  Original: ${originalMetadata.width}x${originalMetadata.height}`);
    
    let sharpInstance = sharp(backupPath);
    
    // For images that should preserve aspect ratio, use different resizing strategy
    if (PRESERVE_ASPECT_IMAGES.includes(fileName)) {
      // For vertical/portrait images, limit height instead of width
      if (originalMetadata.height > originalMetadata.width) {
        // Portrait image - limit height to 1200px
        if (originalMetadata.height > 1200) {
          sharpInstance = sharpInstance.resize(null, 1200, {
            withoutEnlargement: true,
            fit: 'inside'
          });
        }
      } else {
        // Landscape image - limit width to 1200px
        if (originalMetadata.width > 1200) {
          sharpInstance = sharpInstance.resize(1200, null, {
            withoutEnlargement: true,
            fit: 'inside'
          });
        }
      }
    } else {
      // For main images, use the original strategy
      const maxWidth = fileName.includes('main') ? 1200 : 800;
      if (originalMetadata.width > maxWidth) {
        sharpInstance = sharpInstance.resize(maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }
    }
    
    // Optimize based on format
    const ext = path.extname(fileName).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharpInstance
        .jpeg({ 
          quality: 80,
          progressive: true,
          mozjpeg: true
        })
        .toFile(originalPath);
    } else if (ext === '.png') {
      await sharpInstance
        .png({ 
          quality: 80,
          compressionLevel: 9,
          progressive: true
        })
        .toFile(originalPath);
    }
    
    // Get new metadata
    const newMetadata = await sharp(originalPath).metadata();
    console.log(`  Fixed: ${newMetadata.width}x${newMetadata.height}`);
    
    // Get file sizes
    const originalSize = fs.statSync(backupPath).size;
    const newSize = fs.statSync(originalPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`  Size: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
    
  } catch (error) {
    console.error(`Error fixing ${backupPath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🔧 Fixing image aspect ratios...\n');
  
  const backupFiles = getBackupFiles();
  console.log(`Found ${backupFiles.length} backup files to process\n`);
  
  for (const backupFile of backupFiles) {
    await fixAspectRatio(backupFile);
  }
  
  console.log('✅ Aspect ratio fixes complete!');
}

main().catch(console.error);
