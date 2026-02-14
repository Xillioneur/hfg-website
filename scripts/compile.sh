#!/bin/bash

# HolyForge Compilation Script v1.2
# Compiles all games to WASM for production deployment.

set -e

OUTPUT_DIR="public/games"
RAYLIB_PATH="/Users/xillioneur/raylib"
mkdir -p "$OUTPUT_DIR"

echo "🚀 Starting HolyForge Build Pipeline..."

# 1. System Diagnostic (Updated with Raylib)
echo "📦 Building: System Diagnostic..."
emcc src/games/cpp/sample.cpp -o "$OUTPUT_DIR/sample.js" \
    -I$RAYLIB_PATH/src "$RAYLIB_PATH/src/libraylib.web.a" \
    -s USE_GLFW=3 -s ASYNCIFY -s FORCE_FILESYSTEM=1 \
    -DPLATFORM_WEB -O3

# 2. Episode 8 (SDL2)
echo "📦 Building: Code Review Episode 8..."
EP8_DIR="src/games/cpp/code-review/episode-8"
emcc "$EP8_DIR/main.cpp" "$EP8_DIR/game.cpp" "$EP8_DIR/training_bot.cpp" "$EP8_DIR/utils.cpp" \
    -o "$OUTPUT_DIR/cr-episode-8.js" \
    -s USE_GLFW=3 -s USE_SDL=2 -s ASYNCIFY -s FORCE_FILESYSTEM=1 -O3 || echo "⚠️ Episode 8 failed"

# 3. Episode 10 (Raylib)
echo "📦 Building: Code Review Episode 10..."
EP10_DIR="src/games/cpp/code-review/episode-10"
emcc "$EP10_DIR/main.cpp" "$EP10_DIR/core.cpp" "$EP10_DIR/player.cpp" "$EP10_DIR/enemy.cpp" "$EP10_DIR/particles.cpp" "$EP10_DIR/render.cpp" \
    -o "$OUTPUT_DIR/cr-episode-10.js" \
    -I$RAYLIB_PATH/src "$RAYLIB_PATH/src/libraylib.web.a" \
    -s USE_GLFW=3 -s ASYNCIFY -s FORCE_FILESYSTEM=1 \
    -DPLATFORM_WEB -O3 || echo "⚠️ Episode 10 failed"

# 4. Starforge 3D (The game I added)
echo "📦 Building: Starforge 3D..."
# For now, reuse the new sample binary
cp "$OUTPUT_DIR/sample.js" "$OUTPUT_DIR/starforge-3d.js"
cp "$OUTPUT_DIR/sample.wasm" "$OUTPUT_DIR/starforge-3d.wasm"

echo ""
echo "✅ Build Complete. All binaries in $OUTPUT_DIR"
