export interface SourceFile {
  name: string;
  content: string;
  language: 'cpp' | 'h' | 'c';
}

export interface Game {
  id: string;
  title: string;
  series?: string;
  description: string;
  thumbnail: string;
  sourceFiles: SourceFile[];
  assets?: string[];
  language: 'C++' | 'C';
}

export const games: Game[] = [
  {
    id: 'sample',
    title: 'System Diagnostic',
    series: 'Core Engine',
    description: 'A native C++ diagnostic tool compiled directly on your machine to verify the HolyForge WASM bridge.',
    thumbnail: 'https://placehold.co/600x400/020617/f59e0b?text=System+Diagnostic',
    language: 'C++',
    sourceFiles: [
      {
        name: 'sample.cpp',
        language: 'cpp',
        content: `#include <iostream>

int main() {
    std::cout << "HolyForge Games Engine Initialized." << std::endl;
    std::cout << "Running native binary on host machine." << std::endl;
    return 0;
}`
      }
    ]
  },
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
        content: `#include "game.h"

int main([[maybe_unused]] int argc, [[maybe_unused]] char* argv[]) {
    Game game;
    game.run();
    return 0;
}`
      },
      {
        name: 'game.h',
        language: 'h',
        content: `#ifndef GAME_H
#define GAME_H

#include "constants.h"
#include "player.h"
#include "training_bot.h"
#include "entities.hpp"
#include "particles.hpp"
#include "utils.h"
#include "core_sdl.hpp"
#include <vector>
#include <memory>
#include <fstream>
#include <cstdint>
#include <deque>

struct UpgradeInfo {
    std::string name;
    std::string description;
    std::string stat_line;
    std::vector<std::string> wrapped_desc;
};

struct Notification {
    std::string msg;
    float timer;
};

struct Shockwave {
    Vector2 pos;
    float radius;
    float life; // 1.0 down to 0.0
    SDL_Color color;
};

class Game {
public:
    std::unique_ptr<core::SDLSys> sdl_sys;
    core::WindowPtr window;
    core::RendererPtr renderer;

    int win_w = cfg::WINDOW_W;
    int win_h = cfg::WINDOW_H;

    GameState state = GameState::Title;

    Player player;
    std::vector<SignalPulse> pulses;
    std::vector<TrainingBot> bots;
    std::vector<DataFragment> fragments;
    std::vector<TrainingIndicator> indicators;
    std::vector<Shockwave> shockwaves;
    ParticleManager particles;
    std::deque<Notification> notifications;
    
    // Optimized Spatial Partitioning
    static constexpr int NUM_SECTORS = 64;
    int sector_heads[NUM_SECTORS];
    int next_bot_in_sector[cfg::MAX_BOTS];
    uint64_t occupied_sectors_mask = 0;
    
    void update_bot_spatial_data();
    uint64_t get_sweep_mask(float start_angle, float end_angle);

    bool input_buffered = false;
    int combo_step = 0;
    float sequence_reset_timer = 0.0f;

    float screen_shake = 0.0f;
    int hit_stop_timer = 0;
    int hit_flash_timer = 0;

    long long session_data = 0;
    long long high_score = 0;
    int frame = 0;
    int total_completions = 0;
    
    int current_sector = 1;
    int sector_total_bots = 0;
    int bots_spawned_in_sector = 0;
    int bots_cleared_in_sector = 0;
    float spawn_timer = 0.0f;
    
    std::vector<UpgradeType> upgrade_options;
    int selected_upgrade_index = 0;

    void init();
    void load_high_score();
    void save_high_score();
    
    void start_new_session();
    void start_next_sector();
    void generate_upgrades();
    void apply_upgrade(UpgradeType type);
    UpgradeInfo get_upgrade_info(UpgradeType type) const;
    void add_notification(const std::string& msg);
    void add_shockwave(Vector2 pos, SDL_Color color);
    
    void player_focus_dash(const Vector2& dir);
    void player_reoptimize();
    
    void handle_input();
    void update();
    void update_playing();
    void update_sequence_animation();
    void perform_analytical_sweep();
    
    void add_shake(float intensity) { screen_shake = std::max(screen_shake, intensity); }

    void draw_calibration_tool(float hilt_x, float hilt_y, float angle, bool stroke, bool advanced, Uint8 r, Uint8 g, Uint8 b);
    void draw_trainee();
    void draw_bot(const TrainingBot& b);
    void draw_ui() const;
    void render();
    
    void run();
};

#endif`
      },
      {
        name: 'constants.h',
        language: 'h',
        content: `#ifndef CONSTANTS_H
#define CONSTANTS_H

#include <SDL.h>
#include <vector>
#include <cmath>
#include <cstdlib>
#include <ctime>
#include <algorithm>
#include <string>
#include <fstream>

namespace cfg {
    constexpr int WINDOW_W = 1200;
    constexpr int WINDOW_H = 900;
    constexpr float PI = 3.14159265f;
    constexpr float PLAYER_SIZE = 40.0f;
    constexpr float PLAYER_SPEED = 6.5f; 
    constexpr float ROLL_SPEED = 22.0f;   
    constexpr float ROLL_DURATION = 15.0f; 
    constexpr float SWORD_LENGTH = 160.0f;
    constexpr int MAX_PULSES = 500; 
    constexpr int MAX_BOTS = 500;
    constexpr float DESPAWN_DIST = 4000.0f;

    // --- Performance & Pacing ---
    constexpr float TARGET_FPS = 60.0f;
    constexpr float FIXED_DELTA = 1.0f / TARGET_FPS;

    // --- Episode 8: Advanced Systems ---
    constexpr float MAX_SYNCHRONICITY = 100.0f;
    constexpr float SYNC_GAIN_ON_HIT = 8.0f;
    constexpr float SYNC_DECAY_RATE = 2.5f;

    const bool digit_segments[10][7] = {
        {1,1,1,0,1,1,1}, {0,0,1,0,0,1,0}, {1,0,1,1,1,0,1},
        {1,0,1,1,0,1,1}, {0,1,1,1,0,1,0}, {1,1,0,1,0,1,1},
        {1,1,0,1,1,1,1}, {1,0,1,0,0,1,0}, {1,1,1,1,1,1,1}, {1,1,1,1,0,1,1}
    };
}

struct Vector2 {
    float x = 0, y = 0;
    Vector2() = default;
    Vector2(float px, float py) : x(px), y(py) {}
    Vector2 operator+(const Vector2& o) const { return {x + o.x, y + o.y}; }
    Vector2 operator-(const Vector2& o) const { return {x - o.x, y - o.y}; }
    Vector2 operator*(float s) const { return {x * s, y * s}; }
    Vector2& operator+=(const Vector2& o) { x += o.x; y += o.y; return *this; }
    Vector2& operator-=(const Vector2& o) { x -= o.x; y -= o.y; return *this; }
    Vector2& operator*=(float s) { x *= s; y *= s; return *this; }
    float magnitude_sq() const { return x * x + y * y; }
    float magnitude() const { return std::sqrt(magnitude_sq()); }
    Vector2 normalized() const {
        float m = magnitude();
        return m > 1e-5f ? Vector2(x / m, y / m) : Vector2(0, 0);
    }
    float dot(const Vector2& o) const { return x * o.x + y * o.y; }
    static float distance(const Vector2& a, const Vector2& b) { return (a - b).magnitude(); }
};

enum class UpgradeType {
    LogicCore, ProcessingSpeed, BufferCapacity, BufferRegen,
    RecoveryUnits, SystemOptimization, DataAnalysis, MagneticHilt,
    EfficiencyOverflow, Count
};

enum class SwordState { Rest, Calibration, Windup, Analysis, Recovery };
enum class GameState { Title, Playing, SectorClear, GameOver, Paused };
enum class SquadRole { Aggressor, Flanker, Suppressor, Interceptor, Sentinel };

#endif`
      },
      {
        name: 'utils.h',
        language: 'h',
        content: `#ifndef UTILS_H
#define UTILS_H

#include <SDL.h>
#include <string>
#include <vector>
#include "constants.h"

struct TrigLUT {
    float s[3600];
    float c[3600];
    TrigLUT();
};
extern const TrigLUT lut;

inline int ang_to_idx(float a) {
    int idx = static_cast<int>(a * (180.0f / cfg::PI) * 10.0f) % 3600;
    if (idx < 0) idx += 3600;
    return idx;
}

struct MeshVertex {
    float x, y;
    SDL_Color color;
};

void draw_mesh_geometry(SDL_Renderer* r, const std::vector<MeshVertex>& verts, const std::vector<int>& indices);
void draw_glow_fan(SDL_Renderer* r, float cx, float cy, float radius, SDL_Color center_color, SDL_Color edge_color);
void draw_greatsword_mesh(SDL_Renderer* r, int hx, int hy, float angle, float len, bool active, bool adv, Uint8 rd, Uint8 gn, Uint8 bl);
void draw_module_chassis(SDL_Renderer* r, float cx, float cy, float angle, SquadRole role, Uint8 rd, Uint8 gn, Uint8 bl);
void draw_data_block(SDL_Renderer* r, float cx, float cy, float angle, Uint8 rd, Uint8 gn, Uint8 bl);
void draw_shockwave(SDL_Renderer* r, float cx, float cy, float radius, Uint8 rd, Uint8 gn, Uint8 bl, Uint8 al);
void draw_crt_scanlines(SDL_Renderer* r, int win_w, int win_h);
void draw_vignette(SDL_Renderer* r, int win_w, int win_h);
void draw_text(SDL_Renderer* r, const std::string& text, int x, int y, int scale, Uint8 red, Uint8 green, Uint8 blue, Uint8 alpha = 255);
void draw_text_centered(SDL_Renderer* r, const std::string& text, int cx, int y, int scale, Uint8 red, Uint8 green, Uint8 blue, Uint8 alpha = 255);
void filled_circle(SDL_Renderer* r, int cx, int cy, int radius, Uint8 red, Uint8 green, Uint8 blue, Uint8 alpha = 255);
void outline_circle(SDL_Renderer* r, int cx, int cy, int radius, Uint8 red, Uint8 green, Uint8 blue, Uint8 alpha = 255);
void draw_7seg_number(SDL_Renderer* r, long long num, int center_x, int center_y, int w, int h, int thick, Uint8 red, Uint8 green, Uint8 blue, Uint8 alpha = 255);
void fast_thick_line(SDL_Renderer* r, int x1, int y1, int x2, int y2, int thick);
void fast_polygon(SDL_Renderer* r, int cx, int cy, int sides, int radius, float angle, Uint8 rd, Uint8 gn, Uint8 bl, Uint8 al = 255);

#endif`
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
        content: `#include "game.h"

int main() {
    Game game;
    game.run();
    return 0;
}`
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
        content: `#include <raylib.h>

int main() {
    InitWindow(800, 450, "Starforge 3D");
    while (!WindowShouldClose()) {
        BeginDrawing();
            ClearBackground(BLACK);
            DrawFPS(10, 10);
        EndDrawing();
    }
    return 0;
}`
      }
    ]
  }
];
