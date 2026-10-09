#!/data/data/com.termux/files/usr/bin/bash
# Dragon 9 Manifest-Driven Pipeline Unified Batch Script

echo "[*] Initializing Dragon 9 workspace and directories..."
cd ~/dragon9
mkdir -p ~/storage/shared/FluidmotionTV/renders
mkdir -p app/src/main/assets/www/assets

echo "[*] Step 1: Ensuring Super Puff Manifest is active..."
cat << 'INNER_EOF' > super_puff_manifest.json
{
  "project": {
    "title": "Super Puff Pilot",
    "slug": "super_puff_pilot_3m",
    "target_runtime": "00:03:00",
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
    { "scene_id": "scene_01_hook" },
    { "scene_id": "scene_02_build" },
    { "scene_id": "scene_03_climax" }
  ]
}
INNER_EOF

echo "[*] Step 2: Executing Cartoon Generator Pipeline..."
node cartoon-generator.js

echo "[*] Step 3: Exporting render payload to shared storage..."
RENDER_DIR="/data/data/com.termux/files/home/storage/shared/FluidmotionTV/renders"
mkdir -p "$RENDER_DIR"
cp super_puff_manifest.json "$RENDER_DIR/super_puff_pilot_3m.json"

echo "[✓] Complete! Manifest-driven asset package compiled and rendered to shared storage."
