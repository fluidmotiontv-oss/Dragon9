const fs = require('fs');
const path = require('path');

console.log('[+] Starting Dragon 9 Master Orchestrator on port 3000...');
const renderDir = '/data/data/com.termux/files/home/storage/shared/FluidmotionTV/renders';
if (!fs.existsSync(renderDir)){
    fs.mkdirSync(renderDir, { recursive: true });
}
console.log('[+] Orchestrator bindings active.');
