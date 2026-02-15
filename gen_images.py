import struct
import zlib
import os

def create_png(width, height, color):
    r, g, b = color
    # PNG signature
    png = bytes([137, 80, 78, 71, 13, 10, 26, 10])
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    png += pack_chunk(b'IHDR', ihdr_data)
    
    # IDAT chunk (pixel data)
    row_data = b'\x00' + bytes([r, g, b]) * width
    img_data = row_data * height
    png += pack_chunk(b'IDAT', zlib.compress(img_data))
    
    # IEND chunk
    png += pack_chunk(b'IEND', b'')
    return png

def pack_chunk(tag, data):
    return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

os.makedirs('public/assets/images', exist_ok=True)

with open('public/og-image.png', 'wb') as f:
    f.write(create_png(1200, 630, (15, 23, 42)))

with open('public/assets/images/thumb-sample.png', 'wb') as f:
    f.write(create_png(600, 400, (245, 158, 11)))

with open('public/assets/images/thumb-cr.png', 'wb') as f:
    f.write(create_png(600, 400, (59, 130, 246)))

with open('public/assets/images/thumb-starforge.png', 'wb') as f:
    f.write(create_png(600, 400, (239, 68, 68)))

print("Python: Successfully generated colorful PNG assets.")