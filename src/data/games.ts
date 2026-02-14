export interface SourceFile {
  name: string;
  content: string;
  language: 'cpp' | 'h' | 'c';
}

export interface Game {
  id: string;
  title: string;
  series?: string; // Tutorial series name
  description: string;
  thumbnail: string;
  sourceFiles: SourceFile[];
  assets?: string[];
  language: 'C++' | 'C';
}

export const games: Game[] = [
  {
    id: 'cr-episode-8',
    title: 'Code Review: Episode 8',
    series: 'Code Review',
    description: 'A performance-optimized 2D game developed during the Code Review tutorial series. Demonstrates efficient memory management and sprite rendering in C++.',
    thumbnail: 'https://placehold.co/600x400/1e293b/f59e0b?text=Code+Review+E8',
    language: 'C++',
    sourceFiles: [
      {
        name: 'main.cpp',
        language: 'cpp',
        content: `#include <iostream>
#include "raylib.h"

int main() {
    InitWindow(800, 450, "Code Review: Episode 8");
    SetTargetFPS(60);
    
    while (!WindowShouldClose()) {
        BeginDrawing();
            ClearBackground(RAYWHITE);
            DrawText("Episode 8: Optimization", 190, 200, 20, LIGHTGRAY);
        EndDrawing();
    }
    
    CloseWindow();
    return 0;
}`
      }
    ]
  },
  {
    id: 'cr-episode-10',
    title: 'Code Review: Episode 10',
    series: 'Code Review',
    description: 'Advanced gameplay mechanics and architectural patterns. This episode focuses on decoupling game logic from rendering.',
    thumbnail: 'https://placehold.co/600x400/0f172a/f59e0b?text=Code+Review+E10',
    language: 'C++',
    sourceFiles: [
      {
        name: 'main.cpp',
        language: 'cpp',
        content: `#include "engine.h"

int main() {
    Engine engine;
    engine.Run();
    return 0;
}`
      },
      {
        name: 'engine.h',
        language: 'h',
        content: `#ifndef ENGINE_H
#define ENGINE_H

class Engine {
public:
    void Run();
};

#endif`
      }
    ]
  },
  {
    id: 'starforge-3d',
    title: 'Starforge 3D',
    description: 'A high-performance 3D space exploration demo built with Raylib.',
    thumbnail: 'https://placehold.co/600x400/020617/f59e0b?text=Starforge+3D',
    language: 'C++',
    assets: ['models/ship.obj', 'textures/skybox.png'],
    sourceFiles: [
      {
        name: 'main.cpp',
        language: 'cpp',
        content: `#include "game.h"
#include "raylib.h"

int main() {
    Game game;
    game.Init();
    while (!WindowShouldClose()) {
        game.Update();
        game.Draw();
    }
    game.Shutdown();
    return 0;
}`
      }
    ]
  }
];
