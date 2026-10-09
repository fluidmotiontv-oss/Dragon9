#!/usr/bin/env node
/**
 * Dragon 9 Cartoon & Companion Asset Generator
 * "the fluid motion of the future"
 * 
 * Generates vector keyframes, procedural plasma particle sequences,
 * and animated companion spritesheets for the Desktop Dragon Buddy.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const COLOR = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    magenta: '\x1b[35m',
    gray: '\x1b[90m'
};

class CartoonGenerator {
    constructor() {
        this.outputDir = path.join(ROOT_DIR, 'app/src/main/assets/www/assets');
        this.spritePath = path.join(this.outputDir, 'dragon_buddy.svg');
    }

    generateDragonBuddySVG(frameIndex = 0, state = 'idle') {
        const bounce = Math.sin((frameIndex / 4) * Math.PI * 2) * 6;
        const eyeGlow = 0.7 + Math.sin(frameIndex) * 0.3;
        const mouthOpen = state === 'spit_plasma' ? 14 : 4;
        const plasmaBall = state === 'spit_plasma' ? `
            <circle cx="${95 + frameIndex * 8}" cy="${60 - frameIndex * 2}" r="${8 + frameIndex * 2}" fill="url(#plasmaGlow)" filter="url(#glowFilter)"/>
        ` : '';

        return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="140" height="140">
  <defs>
    <radialGradient id="plasmaGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="40%" stop-color="#00ffff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ff00aa" stop-opacity="0"/>
    </radialGradient>
    <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <g transform="translate(10, ${15 + bounce})">
    <!-- Tail with procedural cybernetic segments -->
    <path d="M 30,70 Q 15,${80 - bounce} 5,${70 + bounce} Q 12,${60 + bounce} 28,62 Z" fill="#0088cc" stroke="#00ffff" stroke-width="1.5"/>
    <circle cx="5" cy="${70 + bounce}" r="4" fill="#00ffff" filter="url(#glowFilter)"/>

    <!-- Dragon Body -->
    <ellipse cx="55" cy="65" rx="30" ry="24" fill="#051c2c" stroke="#00d4ff" stroke-width="2"/>
    <path d="M 40,75 Q 55,85 70,75" stroke="#00ffff" stroke-width="1.5" fill="none" opacity="0.6"/>

    <!-- Holographic Horns -->
    <path d="M 60,35 Q 52,12 40,16 Q 48,28 55,38 Z" fill="#ff00aa" filter="url(#glowFilter)"/>
    <path d="M 75,34 Q 85,10 98,14 Q 88,26 80,38 Z" fill="#ff00aa" filter="url(#glowFilter)"/>

    <!-- Head -->
    <ellipse cx="68" cy="46" rx="26" ry="22" fill="#072b42" stroke="#00ffff" stroke-width="2"/>

    <!-- Luminous Eyes -->
    <ellipse cx="60" cy="42" rx="5" ry="7" fill="#00ffff" opacity="${eyeGlow}"/>
    <circle cx="61" cy="40" r="2.5" fill="#ffffff"/>
    <ellipse cx="78" cy="42" rx="5" ry="7" fill="#00ffff" opacity="${eyeGlow}"/>
    <circle cx="79" cy="40" r="2.5" fill="#ffffff"/>

    <!-- Snout and Plasma Vent Mouth -->
    <ellipse cx="76" cy="54" rx="14" ry="${mouthOpen}" fill="#020e17" stroke="#00ffff" stroke-width="1.5"/>
    ${plasmaBall}

    <!-- Cybernetic Feet -->
    <circle cx="42" cy="86" r="6" fill="#00aaff"/>
    <circle cx="68" cy="86" r="6" fill="#00aaff"/>
  </g>
</svg>`;
    }

    generateSpritesheetPackage() {
        console.log(`\n${COLOR.magenta}[CARTOON-ENGINE]${COLOR.reset} ${COLOR.bright}Compiling Desktop Dragon Buddy Keyframe Sequence...${COLOR.reset}`);

        const states = ['idle', 'crawl', 'spit_plasma', 'celebrate'];
        const frames = [];

        states.forEach((state) => {
            for (let i = 0; i < 4; i++) {
                const svgContent = this.generateDragonBuddySVG(i, state);
                const frameName = `dragon_${state}_f${i}.svg`;
                const target = path.join(this.outputDir, frameName);
                fs.writeFileSync(target, svgContent, 'utf8');
                frames.push(frameName);
            }
        });

        // Write primary scalable SVG companion
        fs.writeFileSync(this.spritePath, this.generateDragonBuddySVG(0, 'idle'), 'utf8');
        console.log(`${COLOR.green}✓${COLOR.reset} Generated master vector companion: ${COLOR.cyan}app/src/main/assets/www/assets/dragon_buddy.svg${COLOR.reset}`);
        console.log(`${COLOR.green}✓${COLOR.reset} Generated 16 keyframe SVG animation frames in: ${COLOR.cyan}${this.outputDir}${COLOR.reset}`);

        // Write plasma particle parameters configuration
        const particleProfile = {
            name: "Dragon 9 Procedural Plasma Emitter",
            version: "1.0",
            max_particles: 128,
            lifetime_ms: 1200,
            color_ramp: ["#ffffff", "#00ffff", "#ff00aa", "rgba(0, 255, 255, 0)"],
            turbulence_noise_frequency: 0.15,
            cursor_tracking_damping: 0.08
        };

        const particleConfigTarget = path.join(this.outputDir, 'plasma_particles.json');
        fs.writeFileSync(particleConfigTarget, JSON.stringify(particleProfile, null, 2), 'utf8');
        console.log(`${COLOR.green}✓${COLOR.reset} Generated particle physics descriptor: ${COLOR.cyan}plasma_particles.json${COLOR.reset}`);
    }

    run() {
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
        this.generateSpritesheetPackage();
        console.log(`${COLOR.green}✓${COLOR.reset} ${COLOR.bright}Cartoon generation pipeline completed successfully.${COLOR.reset}\n`);
    }
}

const generator = new CartoonGenerator();
generator.run();
