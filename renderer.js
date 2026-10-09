import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("[Renderer] Initialising Dragon 9 Render Engine...");

const manifestPath = path.join(__dirname, 'assets/manifests/full-episode-1.json');
if (!fs.existsSync(manifestPath)) {
    console.error("[!] Manifest not found. Run generate-full-manifest.js first.");
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log(`[+] Loaded Manifest: ${manifest.title}`);

// Target an 18-minute block format (or switch to 3 minutes if preferred)
const targetDurationMinutes = 18; 
const targetFPS = manifest.settings.framerate || 24;
const totalFrames = targetDurationMinutes * 60 * targetFPS;

console.log(`[+] Target Render Block: ${targetDurationMinutes} minutes (${totalFrames} total frames at ${targetFPS} fps)`);
console.log("[+] Beginning render simulation across scenes...");

let simulatedFrame = 0;
const batchSize = Math.floor(totalFrames / 10);

const renderInterval = setInterval(() => {
    simulatedFrame += batchSize;
    if (simulatedFrame >= totalFrames) {
        simulatedFrame = totalFrames;
        clearInterval(renderInterval);
        
        const outputPath = path.join(__dirname, 'assets/visuals/episode-1-18min.mp4');
        fs.writeFileSync(outputPath, 'MOCK_RENDERED_VIDEO_STREAM');
        
        console.log(`\n[+] Render Complete! Output generated at: ${outputPath}`);
    } else {
        const percent = ((simulatedFrame / totalFrames) * 100).toFixed(1);
        console.log(`[+] Rendering... Frame ${simulatedFrame} / ${totalFrames} (${percent}%)`);
    }
}, 200);
