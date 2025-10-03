const fs = require('fs');
const path = require('path');

const htmlFile = './index.html';

// Generic construction project descriptions
const descriptions = [
    { category: 'Residential', title: 'Residential Construction', desc: 'Quality home construction with modern amenities' },
    { category: 'Building', title: 'Commercial Building', desc: 'Professional construction for commercial spaces' },
    { category: 'Project', title: 'Construction Project', desc: 'Expert craftsmanship in every detail' },
    { category: 'Residential', title: 'Housing Development', desc: 'Creating comfortable living spaces' },
    { category: 'Commercial', title: 'Commercial Complex', desc: 'Building for business excellence' },
    { category: 'Structure', title: 'Modern Structure', desc: 'Contemporary design meets quality construction' },
    { category: 'Residential', title: 'Apartment Complex', desc: 'Multi-unit residential excellence' },
    { category: 'Building', title: 'Building Construction', desc: 'Solid foundation, quality build' },
    { category: 'Project', title: 'Development Project', desc: 'Transforming visions into reality' },
    { category: 'Residential', title: 'Residential Building', desc: 'Homes built with care and precision' },
    { category: 'Commercial', title: 'Business Center', desc: 'Premium commercial construction' },
    { category: 'Structure', title: 'Structural Work', desc: 'Engineering excellence in construction' },
    { category: 'Residential', title: 'Housing Project', desc: 'Quality residential construction' },
    { category: 'Building', title: 'Multi-Story Building', desc: 'Vertical construction expertise' },
    { category: 'Project', title: 'Construction Site', desc: 'Professional project execution' },
    { category: 'Residential', title: 'Residential Complex', desc: 'Creating communities, building homes' },
    { category: 'Commercial', title: 'Commercial Property', desc: 'Built for business success' },
    { category: 'Structure', title: 'Architectural Project', desc: 'Design and construction excellence' },
    { category: 'Residential', title: 'Living Spaces', desc: 'Comfortable homes, quality construction' },
    { category: 'Building', title: 'Building Development', desc: 'Professional construction services' },
    { category: 'Project', title: 'Construction Work', desc: 'Expert execution from start to finish' }
];

// Read HTML
let html = fs.readFileSync(htmlFile, 'utf8');

// Find all project cards and update their content
let descIndex = 0;
html = html.replace(/<span class="project-category">.*?<\/span>\s*<h3>.*?<\/h3>\s*<p>.*?<\/p>/gs, (match) => {
    // Skip video cards
    if (descIndex >= descriptions.length) {
        return match;
    }

    const desc = descriptions[descIndex];
    descIndex++;

    return `<span class="project-category">${desc.category}</span>
                            <h3>${desc.title}</h3>
                            <p>${desc.desc}</p>`;
});

// Write updated HTML
fs.writeFileSync(htmlFile, html, 'utf8');
console.log(`✅ Updated ${descIndex} project descriptions!`);
