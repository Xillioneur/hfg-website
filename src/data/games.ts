export interface SourceFile {
  name: string;
  content: string;
  language: 'cpp' | 'h' | 'c';
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sourceFiles: SourceFile[];
  assets?: string[]; // List of required asset paths
  language: 'C++' | 'C';
}

export const games: Game[] = [
  {
    id: 'starforge-3d',
    title: 'Starforge 3D',
    description: 'A high-performance 3D space exploration demo built with Raylib. Features dynamic lighting, mesh loading, and a custom orbital camera system.',
    thumbnail: 'https://placehold.co/600x400/020617/f59e0b?text=Starforge+3D',
    language: 'C++',
    assets: ['models/ship.obj', 'textures/skybox.png', 'sounds/engine.wav'],
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
      },
      {
        name: 'game.h',
        language: 'h',
        content: `#ifndef GAME_H
#define GAME_H

#include "raylib.h"

class Game {
public:
    void Init();
    void Update();
    void Draw();
    void Shutdown();

private:
    Camera3D camera;
    Model ship;
    Texture2D sky;
};

#endif`
      },
      {
        name: 'game.cpp',
        language: 'cpp',
        content: `#include "game.h"

void Game::Init() {
    InitWindow(800, 450, "Starforge 3D");
    camera = { 0 };
    camera.position = (Vector3){ 10.0f, 10.0f, 10.0f };
    camera.target = (Vector3){ 0.0f, 0.0f, 0.0f };
    camera.up = (Vector3){ 0.0f, 1.0f, 0.0f };
    camera.fovy = 45.0f;
    camera.projection = CAMERA_PERSPECTIVE;
    
    ship = LoadModel("assets/models/ship.obj");
    sky = LoadTexture("assets/textures/skybox.png");
}

void Game::Update() {
    UpdateCamera(&camera, CAMERA_ORBITAL);
}

void Game::Draw() {
    BeginDrawing();
        ClearBackground(BLACK);
        BeginMode3D(camera);
            DrawModel(ship, (Vector3){ 0, 0, 0 }, 1.0f, WHITE);
            DrawGrid(10, 1.0f);
        EndMode3D();
    EndDrawing();
}`
      }
    ]
  },
  {
    id: 'celestial-pong',
    title: 'Celestial Pong',
    description: 'A classic arcade game reimagined with physics-based movement and a starry backdrop.',
    thumbnail: 'https://placehold.co/600x400/1e293b/f59e0b?text=Celestial+Pong',
    language: 'C++',
    sourceFiles: [
      {
        name: 'main.cpp',
        language: 'cpp',
        content: `#include <raylib.h>

int main(void) {
    InitWindow(800, 450, "Celestial Pong");
    SetTargetFPS(60);
    // ... game logic ...
    return 0;
}`
      }
    ]
  },
  {
    id: 'faith-runner',
    title: 'Faith Runner',
    description: 'An endless runner where you must leap over obstacles of doubt. Built purely in C.',
    thumbnail: 'https://placehold.co/600x400/0f172a/f8fafc?text=Faith+Runner',
    language: 'C',
    sourceFiles: [
      {
        name: 'main.c',
        language: 'c',
        content: `#include <stdio.h>
#include <emscripten.h>

void update_game() {
    // Physics calculation
}

int main() {
    emscripten_set_main_loop(update_game, 0, 1);
    return 0;
}`
      }
    ]
  }
];