#!/data/data/com.termux/files/usr/bin/bash
echo "[*] Initializing Dragon 9 18-Minute Extended Run..."
cd ~/dragon9

# Update manifest for 18 minutes
cat << 'INNER_EOF' > super_puff_manifest.json
{
  "project": {
    "title": "Super Puff Extended",
    "slug": "super_puff_pilot_18m",
    "target_runtime": "00:18:00",
    "framerate": 24,
    "resolution": {
      "width": 1920,
      "height": 1080
    },
    "color_space": "Rec.709",
    "branding": "FluidmotionTV / Dragon 9"
  },
  "audio_engine": {
    "master_tuning": "432Hz"
  },
  "scenes": [
    { "scene_id": "scene_01_awakening" },
    { "scene_id": "scene_02_build" },
    { "scene_id": "scene_03_cadence_shift" },
    { "scene_id": "scene_04_climax" },
    { "scene_id": "scene_05_resolution" }
  ]
}
INNER_EOF

node cartoon-generator.js

RENDER_DIR="/data/data/com.termux/files/home/storage/shared/FluidmotionTV/renders"
mkdir -p "$RENDER_DIR"
cp super_puff_manifest.json "$RENDER_DIR/super_puff_pilot_18m.json"

echo "[✓] 18-minute extended payload compiled and rendered to shared storage."
