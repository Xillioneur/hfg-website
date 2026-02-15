import struct
import zlib
import os

def create_hq_png(width, height, top_color, bottom_color, is_square=False):
    png = bytes([137, 80, 78, 71, 13, 10, 26, 10])
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    png += pack_chunk(b'IHDR', ihdr_data)
    
    img_data = []
    r1, g1, b1 = top_color
    r2, g2, b2 = bottom_color
    
    for y in range(height):
        img_data.append(0)
        fade = y / height
        r = int(r1 * (1 - fade) + r2 * fade)
        g = int(g1 * (1 - fade) + g2 * fade)
        b = int(b1 * (1 - fade) + b2 * fade)
        
        for x in range(width):
            # If square (logo), add a centered golden "H" pattern
            if is_square:
                # Simple cross pattern for the logo binary
                if (abs(x - width//2) < width//8) or (abs(y - height//2) < height//8):
                    img_data.extend([245, 158, 11])
                else:
                    img_data.extend([r, g, b])
            else:
                img_data.extend([r, g, b])
            
    png += pack_chunk(b'IDAT', zlib.compress(bytes(img_data), level=9))
    png += pack_chunk(b'IEND', b'')
    return png

def pack_chunk(tag, data):
    return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

os.makedirs('public/assets/images', exist_ok=True)

print("Generating production PNGs...")
# og-logo.png
with open('public/og-logo.png', 'wb') as f:
    f.write(create_hq_png(512, 512, (2, 6, 23), (15, 23, 42), True))

# favicon.png
with open('public/favicon.png', 'wb') as f:
    f.write(create_hq_png(32, 32, (2, 6, 23), (15, 23, 42), True))

# og-image.png
with open('public/og-image.png', 'wb') as f:
    fade_img = create_hq_png(1200, 630, (15, 23, 42), (2, 6, 23))
    f.write(fade_img)

print("Branding assets ready.")
