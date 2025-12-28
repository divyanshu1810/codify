const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/logo.svg');
const publicDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'favicon.ico', size: 32 },
  { name: 'icon.png', size: 192 },
  { name: 'apple-icon.png', size: 180 },
  { name: 'og-image.png', size: 1200, height: 630 },
];

async function generateIcons() {
  console.log('🎨 Generating icons from SVG...\n');

  for (const config of sizes) {
    try {
      const outputPath = path.join(publicDir, config.name);
      const height = config.height || config.size;

      // For ICO files, generate PNG first then convert
      if (config.name.endsWith('.ico')) {
        await sharp(svgPath)
          .resize(config.size, config.size)
          .png()
          .toFile(outputPath.replace('.ico', '-temp.png'));

        // Rename to ico (browsers accept PNG with .ico extension)
        fs.renameSync(outputPath.replace('.ico', '-temp.png'), outputPath);
      } else if (config.name === 'og-image.png') {
        // Create OG image with text
        const svg = `
          <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
              </linearGradient>
              <radialGradient id="glow">
                <stop offset="0%" stop-color="#1DB954" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#1DB954" stop-opacity="0"/>
              </radialGradient>
            </defs>

            <rect width="1200" height="630" fill="url(#bg)"/>

            <!-- Grid pattern -->
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
            </pattern>
            <rect width="1200" height="630" fill="url(#grid)"/>

            <!-- Glow circles -->
            <circle cx="600" cy="315" r="300" fill="url(#glow)"/>

            <!-- Logo -->
            <g transform="translate(400, 200)">
              <path d="M80 40 L40 128 L80 216" stroke="#1DB954" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <path d="M320 40 L360 128 L320 216" stroke="#1DB954" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <path d="M240 20 L160 236" stroke="#1ed760" stroke-width="16" stroke-linecap="round"/>
              <circle cx="200" cy="128" r="8" fill="#1DB954"/>
            </g>

            <!-- Text -->
            <text x="600" y="420" text-anchor="middle" font-family="monospace" font-size="72" font-weight="bold" fill="#1DB954">
              Codify Wrapped
            </text>
            <text x="600" y="480" text-anchor="middle" font-family="monospace" font-size="32" fill="#B3B3B3">
              Your GitHub Year in Review
            </text>
          </svg>
        `;

        await sharp(Buffer.from(svg))
          .png()
          .toFile(outputPath);
      } else {
        await sharp(svgPath)
          .resize(config.size, height)
          .png()
          .toFile(outputPath);
      }

      console.log(`✅ Generated: ${config.name} (${config.size}x${height})`);
    } catch (error) {
      console.error(`❌ Error generating ${config.name}:`, error.message);
    }
  }

  console.log('\n✨ Icon generation complete!');
}

generateIcons().catch(console.error);
