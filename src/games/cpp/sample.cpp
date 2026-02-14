#include "raylib.h"
#include <iostream>

int main() {
    const int screenWidth = 800;
    const int screenHeight = 450;

    InitWindow(screenWidth, screenHeight, "HolyForge System Diagnostic");
    SetTargetFPS(60);

    std::cout << "HolyForge Games Engine Initialized." << std::endl;
    std::cout << "Running native binary on host machine." << std::endl;

    float angle = 0.0f;

    while (!WindowShouldClose()) {
        angle += 2.0f;
        
        BeginDrawing();
            ClearBackground(BLACK);
            
            // Draw a spinning diagnostic gear/shape
            DrawPoly((Vector2){ screenWidth/2, screenHeight/2 }, 6, 80, angle, (Color){ 245, 158, 11, 255 });
            DrawPolyLinesEx((Vector2){ screenWidth/2, screenHeight/2 }, 6, 90, angle, 2, WHITE);
            
            DrawText("SYSTEM_DIAGNOSTIC: ACTIVE", 20, 20, 20, GREEN);
            DrawText("WASM_BRIDGE: CONNECTED", 20, 50, 20, GREEN);
            DrawFPS(screenWidth - 100, 20);
            
        EndDrawing();
    }

    CloseWindow();
    return 0;
}