const fs = require('fs');
const zlib = require('zlib');

function createPng(width, height, r, g, b) {
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeInt32BE(width, 0);
    ihdrData.writeInt32BE(height, 4);
    ihdrData[8] = 8; // bit depth
    ihdrData[9] = 2; // color type (RGB)
    ihdrData[10] = 0; // compression
    ihdrData[11] = 0; // filter
    ihdrData[12] = 0; // interlace
    
    const ihdr = createChunk('IHDR', ihdrData);
    
    // Pixel data: each row starts with a 0 byte (no filter)
    const rowSize = width * 3 + 1;
    const imgData = Buffer.alloc(rowSize * height);
    for (let y = 0; y < height; y++) {
        imgData[y * rowSize] = 0;
        for (let x = 0; x < width; x++) {
            const pos = y * rowSize + 1 + x * 3;
            imgData[pos] = r;
            imgData[pos + 1] = g;
            imgData[pos + 2] = b;
        }
    }
    
    const idatData = zlib.deflateSync(imgData);
    const idat = createChunk('IDAT', idatData);
    const iend = createChunk('IEND', Buffer.alloc(0));
    
    return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type);
    const crc = Buffer.alloc(4);
    crc.writeInt32BE(zlib.crc32(Buffer.concat([typeBuf, data])), 0);
    return Buffer.concat([len, typeBuf, data, crc]);
}

// Ensure dir exists
if (!fs.existsSync('public/assets/images')) {
    fs.mkdirSync('public/assets/images', { recursive: true });
}

// Generate unique colorful PNGs
fs.writeFileSync('public/og-image.png', createPng(1200, 630, 15, 23, 42)); // Midnight Blue
fs.writeFileSync('public/assets/images/thumb-sample.png', createPng(600, 400, 245, 158, 11)); // Amber Gold
fs.writeFileSync('public/assets/images/thumb-cr.png', createPng(600, 400, 59, 130, 246)); // Blue
fs.writeFileSync('public/assets/images/thumb-starforge.png', createPng(600, 400, 239, 68, 68)); // Red

console.log("Successfully generated real PNG assets.");
