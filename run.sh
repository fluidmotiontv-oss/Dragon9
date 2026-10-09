#!/data/data/com.termux/files/usr/bin/bash
echo "=== Running Full Dragon 9 Pipeline ==="
node orchestrator.js
node cartoon-generator.js
node fluidmotion-companion.js
echo "=== Pipeline Cycle Complete ==="
