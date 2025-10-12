import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const IMAGE_PATH = './public/3d-main.JPG';
const BACKUP_PATH = './public/3d-main.JPG.backup';

async function rotateCloneHelmet() {
  try {
    console.log('🔄 Rotating clone helmet image...\n');
    
    // Check if the image exists
    if (!fs.existsSync(IMAGE_PATH)) {
      console.error('❌ Image not found:', IMAGE_PATH);
      return;
    }
    
    // Get original metadata
    const originalMetadata = await sharp(IMAGE_PATH).metadata();
    console.log(`Original dimensions: ${originalMetadata.width}x${originalMetadata.height}`);
    
    // Rotate the image 90 degrees clockwise
    const rotatedImage = await sharp(IMAGE_PATH)
      .rotate(90)
      .jpeg({ 
        quality: 80,
        progressive: true,
        mozjpeg: true
      })
      .toBuffer();
    
    // Get new metadata
    const newMetadata = await sharp(rotatedImage).metadata();
    console.log(`Rotated dimensions: ${newMetadata.width}x${newMetadata.height}`);
    
    // Write the rotated image
    fs.writeFileSync(IMAGE_PATH, rotatedImage);
    
    // Get file sizes
    const originalSize = fs.statSync(IMAGE_PATH).size;
    console.log(`File size: ${(originalSize / 1024).toFixed(1)}KB`);
    
    console.log('\n✅ Clone helmet image rotated successfully!');
    console.log('💡 The image has been rotated 90 degrees clockwise');
    
  } catch (error) {
    console.error('❌ Error rotating image:', error.message);
  }
}

rotateCloneHelmet().catch(console.error);
