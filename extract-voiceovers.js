import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("[Extractor] Reading Super Puff manifest...");

const manifestPath = path.join(__dirname, 'assets/manifests/super-puff-manifest.json');
if (!fs.existsSync(manifestPath)) {
    console.error("[!] Manifest not found. Run super-puff-manifest.js first.");
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const outputDir = path.join(__dirname, 'assets/audio/voiceovers');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

manifest.scenes.forEach(scene => {
    const fileName = `scene-${scene.sceneId}-vo.txt`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, scene.audioVoiceover);
    console.log(`[+] Exported VO for Scene ${scene.sceneId}: assets/audio/voiceovers/${fileName}`);
});

console.log("[+] All voiceover scripts successfully extracted for audio generation!");
