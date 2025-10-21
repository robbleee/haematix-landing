const sharp = require('sharp');
const path = require('path');

const images = [
  'public/profile-pics/robbie.png',
  'public/profile-pics/danny.png',
  'public/profile-pics/john.png',
  'public/profile-pics/luke.png'
];

async function brightenImages() {
  console.log('Brightening profile photos...');
  
  for (const imagePath of images) {
    const fullPath = path.join(__dirname, imagePath);
    console.log(`Processing: ${imagePath}`);
    
    await sharp(fullPath)
      .modulate({
        brightness: 1.15  // 15% brighter
      })
      .toFile(fullPath + '.temp');
    
    // Replace original with brightened version
    const fs = require('fs');
    fs.renameSync(fullPath + '.temp', fullPath);
    
    console.log(`✓ Brightened: ${imagePath}`);
  }
  
  console.log('\nAll images brightened successfully!');
}

brightenImages().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});

