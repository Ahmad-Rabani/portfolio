#!/usr/bin/env node

/**
 * Image Conversion Script
 * Converts PNG images to WebP format
 * 
 * Usage:
 *   node convert-images.js
 * 
 * Requirements:
 *   npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE_DIR = './public';
const QUALITY = 80; // WebP quality (0-100)

// Directories containing images
const IMAGE_DIRS = [
  'Hero',
  'project images',
  'projects'
];

let convertedCount = 0;
let skippedCount = 0;
let errorCount = 0;

async function convertImages() {
  console.log('🖼️  Starting image conversion to WebP...\n');

  for (const dir of IMAGE_DIRS) {
    const fullPath = path.join(BASE_DIR, dir);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Directory not found: ${fullPath}`);
      continue;
    }

    console.log(`📁 Processing: ${fullPath}`);
    const files = fs.readdirSync(fullPath);

    for (const file of files) {
      if (!file.endsWith('.png')) continue;

      const inputPath = path.join(fullPath, file);
      const outputPath = path.join(fullPath, file.replace('.png', '.webp'));

      // Skip if WebP already exists
      if (fs.existsSync(outputPath)) {
        console.log(`   ⏭️  ${file} → ${file.replace('.png', '.webp')} (already exists)`);
        skippedCount++;
        continue;
      }

      try {
        // Get file size before conversion
        const inputSize = fs.statSync(inputPath).size;
        
        // Convert to WebP
        await sharp(inputPath)
          .webp({ quality: QUALITY })
          .toFile(outputPath);

        const outputSize = fs.statSync(outputPath).size;
        const savings = Math.round(((inputSize - outputSize) / inputSize) * 100);
        
        console.log(`   ✅ ${file} → ${file.replace('.png', '.webp')} (saved ${savings}%)`);
        convertedCount++;
      } catch (error) {
        console.error(`   ❌ ${file} - Error: ${error.message}`);
        errorCount++;
      }
    }
    console.log('');
  }

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   ✅ Converted: ${convertedCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  
  if (errorCount === 0 && convertedCount > 0) {
    console.log('\n🎉 All images converted successfully!');
    console.log('   Your portfolio will now load images much faster.');
  }
}

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('❌ Error: sharp module not found');
  console.error('\nPlease install it first:');
  console.error('   npm install sharp');
  process.exit(1);
}

convertImages().catch(error => {
  console.error('❌ Conversion failed:', error);
  process.exit(1);
});
