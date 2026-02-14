#!/bin/bash

# HolyForge Compilation Script
# This script compiles all games in the repo to WASM for production deployment.

set -e

# Configuration
OUTPUT_DIR="public/games"
RAYLIB_PATH="/Users/xillioneur/raylib"
mkdir -p "$OUTPUT_DIR"

echo "🚀 Starting HolyForge Build Pipeline..."

# 1. Compile Core Diagnostic (Sample)
echo "📦 Building: System Diagnostic..."
emcc src/games/cpp/sample.cpp -o "$OUTPUT_DIR/sample.js" -s USE_GLFW=3 -s ASYNCIFY -O3

# 2. Compile Code Review Episode 8 (Uses SDL2)
echo "📦 Building: Code Review Episode 8..."
# Explicitly list sources to avoid broken leftovers like enemy.cpp
EP8_DIR="src/games/cpp/code-review/episode-8"
emcc "$EP8_DIR/main.cpp" "$EP8_DIR/game.cpp" "$EP8_DIR/training_bot.cpp" "$EP8_DIR/utils.cpp" \
    -o "$OUTPUT_DIR/cr-episode-8.js" \
    -s USE_GLFW=3 -s USE_SDL=2 -s ASYNCIFY -s FORCE_FILESYSTEM=1 -O3 || echo "⚠️  Episode 8 skipped"

# 3. Compile Code Review Episode 10 (Uses Raylib)
echo "📦 Building: Code Review Episode 10..."
EP10_DIR="src/games/cpp/code-review/episode-10"
# Link against the pre-compiled libraylib.web.a
emcc "$EP10_DIR/main.cpp" "$EP10_DIR/core.cpp" "$EP10_DIR/player.cpp" "$EP10_DIR/enemy.cpp" "$EP10_DIR/particles.cpp" "$EP10_DIR/render.cpp" \
    -o "$OUTPUT_DIR/cr-episode-10.js" \
    -I$RAYLIB_PATH/src "$RAYLIB_PATH/src/libraylib.web.a" \
    -s USE_GLFW=3 -s ASYNCIFY -s FORCE_FILESYSTEM=1 \
    -DPLATFORM_WEB -O3 || echo "⚠️  Episode 10 skipped"

echo ""
echo "✅ Build Complete. Binaries are in $OUTPUT_DIR"
