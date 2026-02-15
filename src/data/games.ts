export interface SourceFileMetadata {
  name: string;
  path: string;
  language: 'cpp' | 'h' | 'c';
}

export type GameCategory = 'Tutorial' | 'Studio' | 'Tech Demo' | 'Classic';

export interface Game {
  id: string;
  title: string;
  series?: string;
  category: GameCategory;
  description: string;
  metaDescription: string;
  keywords: string[];
  thumbnail: string;
  sourceFiles: SourceFileMetadata[];
  assets?: string[];
  language: 'C++' | 'C';
}

export const games: Game[] = [
  {
    id: 'sample',
    title: 'System Diagnostic',
    series: 'Core Engine',
    category: 'Tech Demo',
    description: 'A native C++ diagnostic tool compiled directly on your machine to verify the HolyForge WASM bridge.',
    metaDescription: 'Verify C++ WebAssembly performance with the HolyForge System Diagnostic tool. Native execution at 60 FPS. Developed by Willie Johnson.',
    keywords: ['WASM', 'C++', 'WebAssembly', 'Performance', 'Raylib'],
    thumbnail: '/assets/images/thumb-sample.svg',
    language: 'C++',
    sourceFiles: [
      { name: 'main.cpp', path: '/source/sample/main.cpp', language: 'cpp' }
    ]
  },
  {
    id: 'cr-episode-8',
    title: 'Code Review: Episode 8',
    series: 'Code Review',
    category: 'Tutorial',
    description: 'A performance-optimized 2D game developed during the Code Review tutorial series. Demonstrates efficient memory management and sprite rendering in C++.',
    metaDescription: 'Learn C++ optimization techniques for web games. Episode 8 covers spatial partitioning and memory efficiency in WASM. By @liwawil.',
    keywords: ['Code Review', 'C++ Tutorial', 'Optimization', 'Game Dev', 'SDL2'],
    thumbnail: '/assets/images/thumb-cr.svg',
    language: 'C++',
    sourceFiles: [
      { name: 'main.cpp', path: '/source/episode-8/main.cpp', language: 'cpp' },
      { name: 'game.h', path: '/source/episode-8/game.h', language: 'h' },
      { name: 'constants.h', path: '/source/episode-8/constants.h', language: 'h' },
      { name: 'utils.h', path: '/source/episode-8/utils.h', language: 'h' }
    ]
  },
  {
    id: 'cr-episode-10',
    title: 'Code Review: Episode 10',
    series: 'Code Review',
    category: 'Tutorial',
    description: 'Advanced gameplay mechanics and architectural patterns. This episode focuses on decoupling game logic from rendering.',
    metaDescription: 'Advanced C++ game architecture for the web. Decouple logic from rendering with Episode 10 of Code Review by Willie Johnson.',
    keywords: ['Architecture', 'C++', 'Raylib', 'Tutorial', 'WASM'],
    thumbnail: '/assets/images/thumb-cr.svg',
    language: 'C++',
    sourceFiles: [
      { name: 'main.cpp', path: '/source/episode-10/main.cpp', language: 'cpp' }
    ]
  },
  {
    id: 'starforge-3d',
    title: 'Starforge 3D',
    category: 'Studio',
    description: 'A high-performance 3D space exploration demo built with Raylib.',
    metaDescription: 'Experience native 3D space exploration in your browser with Starforge 3D. Powered by Raylib and WebAssembly. Crafted by @liwawil.',
    keywords: ['3D', 'Raylib', 'C++', 'Space', 'WASM'],
    thumbnail: '/assets/images/thumb-starforge.svg',
    language: 'C++',
    assets: ['models/ship.obj', 'textures/skybox.png'],
    sourceFiles: [
      { name: 'main.cpp', path: '/source/sample/main.cpp', language: 'cpp' }
    ]
  }
];
