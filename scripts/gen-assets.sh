#!/bin/bash

# HolyForge Asset Generation Script
# Converts SVGs to Production-ready PNGs for X.com and Crawlers.

IMG_DIR="public/assets/images"
mkdir -p "$IMG_DIR"

echo "🎨 Generating Production PNG Assets..."

# Main OG Image
sips -s format png "$IMG_DIR/og-main.svg" --out public/og-image.png

# Thumbnails
sips -s format png "$IMG_DIR/thumb-sample.svg" --out "$IMG_DIR/thumb-sample.png"
sips -s format png "$IMG_DIR/thumb-cr.svg" --out "$IMG_DIR/thumb-cr.png"
sips -s format png "$IMG_DIR/thumb-starforge.svg" --out "$IMG_DIR/thumb-starforge.png"

echo "✅ Assets generated and verified:"
ls -lh public/og-image.png "$IMG_DIR"/*.png
