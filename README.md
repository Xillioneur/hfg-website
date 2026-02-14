# HolyForge Games Website

A high-performance React application designed to showcase and play C++ games compiled to WebAssembly (WASM).

## Features

- **Game Catalog**: Browse and search through the collection of games.
- **WASM Player**: Simulated WebAssembly player with C++ source code viewer.
- **Modern UI**: Built with React 19, TypeScript, and Tailwind CSS v4.
- **Responsive Design**: Fully responsive layout optimized for all devices.
- **Faith-Inspired**: Designed with themes of creation, light, and excellence.

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or pnpm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

This project is optimized for **Cloudflare Pages**.

1. Connect your repository to Cloudflare Pages.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.

## Project Structure

- `src/components`: Reusable UI components (GameCard, WasmPlayer, Layout).
- `src/pages`: Route components (Home, Games, GameDetail, About).
- `src/data`: Mock data for games.
- `src/games/cpp`: Example C++ source files (placeholders).

## Note on WASM

Since this is a prototype running without a full Emscripten toolchain, the `WasmPlayer` component simulates the loading and execution of a WASM module using HTML5 Canvas. In a production environment, this would load real `.wasm` files compiled from the C++ source.