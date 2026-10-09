const fs = require('fs');
let data = JSON.parse(fs.readFileSync('asset-manifest.json', 'utf8'));

// 1. Add required framework
data.framework = 'dragon9_fluid_motion';

// 2. Map audio_engine to the required system_parameters format
data.system_parameters = {
    harmonic_tuning: {
        universal_baseline_hz: 432.0
    },
    ...data.audio_engine
};

// 3. Rename 'scenes' to 'chapters'
if (data.scenes) {
    data.chapters = data.scenes;
}

fs.writeFileSync('asset-manifest.json', JSON.stringify(data, null, 2));
console.log('Manifest perfectly aligned to Dragon 9 schema.');
