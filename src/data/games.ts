export interface SourceFileMetadata {
  name: string;
  path: string; // URL to fetch the source from
  language: 'cpp' | 'h' | 'c';
}

export interface Game {
  id: string;
  title: string;
  series?: string;
  description: string;
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
    description: 'A native C++ diagnostic tool compiled directly on your machine to verify the HolyForge WASM bridge.',
    thumbnail: 'https://placehold.co/600x400/020617/f59e0b?text=System+Diagnostic',
    language: 'C++',
    sourceFiles: [
      { name: 'main.cpp', path: '/source/sample/main.cpp', language: 'cpp' }
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
    description: 'Advanced gameplay mechanics and architectural patterns. This episode focuses on decoupling game logic from rendering.',
    thumbnail: 'https://placehold.co/600x400/0f172a/f59e0b?text=Code+Review+E10',
    language: 'C++',
    sourceFiles: [
      { name: 'main.cpp', path: '/source/episode-10/main.cpp', language: 'cpp' }
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
      { name: 'main.cpp', path: '/source/sample/main.cpp', language: 'cpp' }
    ]
  }
];