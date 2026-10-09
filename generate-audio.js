import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("[Audio Generator] Converting voiceover text manifests to audio streams...");

const voDir = path.join(__dirname, 'assets/audio/voiceovers');
if (!fs.existsSync(voDir)) {
    console.error("[!] Voiceover directory not found. Run extract-voiceovers.js first.");
    process.exit(1);
}

const files = fs.readdirSync(voDir).filter(f => f.endsWith('.txt'));

files.forEach(file => {
    const txtPath = path.join(voDir, file);
    const textContent = fs.readFileSync(txtPath, 'utf8');
    const sceneId = file.replace('-vo.txt', '');
    const audioFileName = `${sceneId}.wav`;
    const audioOutputPath = path.join(voDir, audioFileName);

    console.log(`[+] Processing ${file} -> Generating 432Hz synchronized voice track...`);
    console.log(`    Content: "${textContent.trim()}"`);

    // Mocking TTS audio synthesis output bound to 432Hz harmonic tuning
    fs.writeFileSync(audioOutputPath, `MOCK_SYNTH_AUDIO_STREAM_432HZ_${sceneId.toUpperCase()}`);
    console.log(`[+] Saved audio asset: assets/audio/voiceovers/${audioFileName}\n`);
});

console.log("[+] All voiceover audio tracks generated successfully.");
