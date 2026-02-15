import struct
import zlib
import os

def create_hq_png(width, height, top_color, bottom_color):
    png = bytes([137, 80, 78, 71, 13, 10, 26, 10])
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    png += pack_chunk(b'IHDR', ihdr_data)
    
    img_data = []
    r1, g1, b1 = top_color
    r2, g2, b2 = bottom_color
    
    for y in range(height):
        img_data.append(0)
        # Linear vertical gradient
        fade = y / height
        r = int(r1 * (1 - fade) + r2 * fade)
        g = int(g1 * (1 - fade) + g2 * fade)
        b = int(b1 * (1 - fade) + b2 * fade)
        
        # Add a "Scanline" noise pattern for technical look
        if y % 4 == 0:
            r = max(0, r - 10); g = max(0, g - 10); b = max(0, b - 10)
            
        for x in range(width):
            # Add a subtle vignette/darkening at edges
            edge_fade = min(1.0, (x/width)*4) * min(1.0, (1-x/width)*4)
            img_data.extend([int(r * edge_fade), int(g * edge_fade), int(b * edge_fade)])
            
    png += pack_chunk(b'IDAT', zlib.compress(bytes(img_data), level=9))
    png += pack_chunk(b'IEND', b'')
    return png

def pack_chunk(tag, data):
    return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

os.makedirs('public/assets/images', exist_ok=True)

# Generate distinct production assets
print("Generating HQ Production PNGs...")
# Main OG Image - Deep Space Blue
with open('public/og-image.png', 'wb') as f:
    f.write(create_hq_png(1200, 630, (15, 23, 42), (2, 6, 23)))

# System Diagnostic - Gold
with open('public/assets/images/thumb-sample.png', 'wb') as f:
    f.write(create_hq_png(600, 400, (245, 158, 11), (120, 53, 15)))

# Code Review - Blue
with open('public/assets/images/thumb-cr.png', 'wb') as f:
    f.write(create_hq_png(600, 400, (37, 99, 235), (30, 58, 138)))

# Starforge 3D - Red
with open('public/assets/images/thumb-starforge.png', 'wb') as f:
    f.write(create_hq_png(600, 400, (220, 38, 38), (69, 10, 10)))

print("HQ Production assets ready.")