const fs = require('fs');
let data = JSON.parse(fs.readFileSync('asset-manifest.json', 'utf8'));

// Ensure every chapter has a visual_assets and audio_assets block
data.chapters.forEach((chapter, index) => {
    if (!chapter.visual_assets) chapter.visual_assets = {};
    if (!chapter.audio_assets) chapter.audio_assets = {};
    
    // Add a placeholder so the resolution matrix has something to read
    chapter.visual_assets[`scene_${index + 1}_base`] = { 
        filename: `super_puff_scene_${index + 1}.mp4`, 
        status: "pending" 
    };
});

fs.writeFileSync('asset-manifest.json', JSON.stringify(data, null, 2));
console.log('Asset Matrix synchronized.');
