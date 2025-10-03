// Script to update project images in HTML
const fs = require('fs');
const path = require('path');

const imagesDir = './images/projects';
const htmlFile = './index.html';

// Get all JPG images (excluding videos for now)
const images = fs.readdirSync(imagesDir)
    .filter(file => file.endsWith('.JPG'))
    .slice(0, 21); // Use first 21 images

console.log(`Found ${images.length} images`);

// Read HTML
let html = fs.readFileSync(htmlFile, 'utf8');

// Find all project cards and update their images
let imageIndex = 0;
html = html.replace(/src="HELIX_HEATHWOOD_V04_Final\.jpg"/g, (match) => {
    if (imageIndex < images.length) {
        const newSrc = `images/projects/${images[imageIndex]}`;
        imageIndex++;
        return `src="${newSrc}"`;
    }
    return match;
});

// Write updated HTML
fs.writeFileSync(htmlFile, html, 'utf8');
console.log(`✅ Updated ${imageIndex} project images!`);
