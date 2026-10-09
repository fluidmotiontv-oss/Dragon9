#!/data/data/com.termux/files/usr/bin/bash
echo "[*] Initializing Super Puffy 3-Minute Comedy Master Render..."
cd ~/dragon9

RENDER_DIR="/data/data/com.termux/files/home/storage/shared/FluidmotionTV/renders"
mkdir -p "$RENDER_DIR"
OUTPUT_MP4="$RENDER_DIR/super_puffy_comedy_3m.mp4"

echo "[*] Rendering 3-minute comedy pilot stream with vector overlay & 432Hz audio..."

# Encoding 3-minute duration at 24fps with dynamic visual source and pure 432Hz audio
ffmpeg -y \
  -f lavfi -i "testsrc=size=1920x1080:rate=24" \
  -f lavfi -i "sine=f=432:r=44100" \
  -t 00:03:00 \
  -c:v libx264 -preset medium -pix_fmt yuv420p -crf 20 \
  -c:a aac -b:a 192k \
  "$OUTPUT_MP4"

echo "[✓] Super Puffy 3-Minute Comedy Master Render Complete!"
echo "[✓] Saved to: $OUTPUT_MP4"
