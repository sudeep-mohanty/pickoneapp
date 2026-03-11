const { createCanvas } = (() => {
  // We'll create a simple SVG-based approach since we may not have canvas
  return { createCanvas: null };
})();

// Generate SVG-based OG image
const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D0D0D"/>
      <stop offset="100%" style="stop-color:#1A1A1A"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF5733"/>
      <stop offset="100%" style="stop-color:#FFD700"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Hand emoji area -->
  <text x="600" y="250" text-anchor="middle" font-size="120" fill="white">✌️</text>
  
  <!-- Title -->
  <text x="600" y="370" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="72" fill="white">Pick One</text>
  
  <!-- Subtitle -->
  <text x="600" y="430" text-anchor="middle" font-family="monospace" font-size="24" fill="#888888">set two options. share the link. let fate decide.</text>
  
  <!-- Domain -->
  <text x="600" y="560" text-anchor="middle" font-family="monospace" font-size="20" fill="url(#accent)">pickoneapp.fun</text>
  
  <!-- Accent line -->
  <rect x="480" y="460" width="240" height="3" rx="1.5" fill="url(#accent)" opacity="0.5"/>
</svg>`;

// Generate icon SVG
const iconSvg = (size) => `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#0D0D0D"/>
  <text x="${size/2}" y="${size * 0.65}" text-anchor="middle" font-size="${size * 0.5}" fill="white">✌️</text>
</svg>`;

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, 'public');

// Write SVGs
fs.writeFileSync(path.join(publicDir, 'og-default.svg'), ogSvg);
fs.writeFileSync(path.join(publicDir, 'icon-192.svg'), iconSvg(192));
fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), iconSvg(512));
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), iconSvg(32));

console.log('Generated SVG assets in public/');
console.log('');
console.log('IMPORTANT: Convert these to PNG before deploying:');
console.log('  - og-default.svg → og-default.png (1200x630)');
console.log('  - icon-192.svg → icon-192.png');
console.log('  - icon-512.svg → icon-512.png');
console.log('  - favicon.svg → favicon.png');
console.log('');
console.log('You can use https://cloudconvert.com/svg-to-png or any image editor.');
console.log('Or on Mac: open the SVG in Preview → Export as PNG');
