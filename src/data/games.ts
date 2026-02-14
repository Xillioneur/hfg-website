export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sourceCode: string;
  language: 'C++' | 'C';
}

export const games: Game[] = [
  {
    id: 'celestial-pong',
    title: 'Celestial Pong',
    description: 'A classic arcade game reimagined with physics-based movement and a starry backdrop. Play against the AI in this test of reflexes.',
    thumbnail: 'https://placehold.co/600x400/1e293b/f59e0b?text=Celestial+Pong',
    language: 'C++',
    sourceCode: `#include <raylib.h>

const int screenWidth = 800;
const int screenHeight = 450;

int main(void)
{
    InitWindow(screenWidth, screenHeight, "Celestial Pong");

    SetTargetFPS(60);

    // Game state variables
    Vector2 ballPosition = { (float)screenWidth/2, (float)screenHeight/2 };
    Vector2 ballSpeed = { 5.0f, 4.0f };
    int ballRadius = 20;

    Rectangle player1 = { 50, screenHeight/2 - 50, 20, 100 };
    Rectangle player2 = { screenWidth - 70, screenHeight/2 - 50, 20, 100 };

    while (!WindowShouldClose())
    {
        // Update
        ballPosition.x += ballSpeed.x;
        ballPosition.y += ballSpeed.y;

        if ((ballPosition.y >= (screenHeight - ballRadius)) || (ballPosition.y <= ballRadius)) ballSpeed.y *= -1.0f;
        
        // ... Collision logic ...

        // Draw
        BeginDrawing();
            ClearBackground(BLACK);
            DrawCircleV(ballPosition, (float)ballRadius, WHITE);
            DrawRectangleRec(player1, WHITE);
            DrawRectangleRec(player2, WHITE);
        EndDrawing();
    }

    CloseWindow();
    return 0;
}`
  },
  {
    id: 'faith-runner',
    title: 'Faith Runner',
    description: 'An endless runner where you must leap over obstacles of doubt. Built purely in C for maximum efficiency.',
    thumbnail: 'https://placehold.co/600x400/0f172a/f8fafc?text=Faith+Runner',
    language: 'C',
    sourceCode: `#include <stdio.h>
#include <emscripten.h>

int score = 0;
float playerY = 0.0f;

void update_game() {
    score++;
    // Physics calculation for jump
    // ...
}

int main() {
    printf("Faith Runner initialized.
");
    emscripten_set_main_loop(update_game, 0, 1);
    return 0;
}`
  }
];
