const fs = require('fs');

// Create a valid 1x1 black PNG
const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const buffer = Buffer.from(base64Png, 'base64');

const files = [
    'public/og-image.png',
    'public/assets/images/thumb-sample.png',
    'public/assets/images/thumb-cr.png',
    'public/assets/images/thumb-starforge.png'
];

files.forEach(file => {
    fs.writeFileSync(file, buffer);
    console.log(`Created: ${file}`);
});
