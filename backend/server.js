const express = require('express');
const cors = require('cors');
const os = require('os');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dragon 9 Diagnostic & Status Endpoint
app.get('/api/health', (req, res) => {
  const cpus = os.cpus();
  res.json({
    status: 'online',
    server: 'Dragon 9 Node',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(os.uptime()),
    loadAvg: os.loadavg(),
    memory: {
      totalMb: Math.round(os.totalmem() / (1024 * 1024)),
      freeMb: Math.round(os.freemem() / (1024 * 1024)),
      usedMb: Math.round((os.totalmem() - os.freemem()) / (1024 * 1024)),
    },
    cpu: {
      model: cpus[0] ? cpus[0].model : 'Unknown',
      cores: cpus.length,
    },
    network: os.networkInterfaces()
  });
});

// Tethered Phone ADB Status Endpoint
app.get('/api/phone-status', (req, res) => {
  exec('adb devices -l', (err, stdout) => {
    if (err) {
      return res.json({ adbInstalled: false, devices: [], error: err.message });
    }
    const lines = stdout.split('\n').filter(l => l.trim() && !l.startsWith('List of devices'));
    const devices = lines.map(line => {
      const parts = line.trim().split(/\s+/);
      return {
        serial: parts[0],
        state: parts[1],
        details: parts.slice(2).join(' ')
      };
    });
    res.json({ adbInstalled: true, devices });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Dragon 9 Backend] Active on http://0.0.0.0:${PORT}`);
});
