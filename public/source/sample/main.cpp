#include "raylib.h"
#include <iostream>

int main() {
    const int screenWidth = 800;
    const int screenHeight = 450;

    SetConfigFlags(FLAG_VSYNC_HINT); 
    InitWindow(screenWidth, screenHeight, "HolyForge Diagnostic");
    SetTargetFPS(60);

    std::cout << "HolyForge Engine // Core Verification Success" << std::endl;

    while (!WindowShouldClose()) {
        BeginDrawing();
            ClearBackground(BLACK);
            DrawRectangleLines(screenWidth/2 - 50, screenHeight/2 - 50, 100, 100, (Color){ 245, 158, 11, 100 });
            DrawCircleGradient(screenWidth/2, screenHeight/2, 40 + (float)GetTime()*2, (Color){ 245, 158, 11, 20 }, BLANK);
            DrawText("SYSTEM: STABLE", 20, 20, 10, GREEN);
            DrawText("WASM: ACTIVE", 20, 35, 10, GREEN);
            DrawFPS(screenWidth - 80, 20);
        EndDrawing();
    }

    CloseWindow();
    return 0;
}
