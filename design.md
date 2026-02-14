# Website Design Document for HolyForge Games

## 1. Introduction
HolyForge Games is a studio dedicated to creating high-quality C++ and C games that inspire and entertain. This website will serve as a platform to showcase and play these games directly in the browser, leveraging WebAssembly (WASM) for native-like performance. The design emphasizes speed, performance, and throughput, ensuring seamless experiences that honor the craftsmanship of game development. By utilizing the latest technologies, the site will deliver fast load times, responsive gameplay, and easy extensibility for adding new games—all while reflecting excellence in pursuit of glorifying God the Father, the Son, and the Holy Spirit through innovative and reliable digital creation.

This document outlines the architecture, technologies, features, and implementation plan for the website.

## 2. Objectives
- Enable users to play studio-built C++ and C games natively in the browser without downloads or plugins.
- Support compilation of .cpp files to .wasm files for on-demand or easy game addition, ensuring the process is streamlined for studio administrators.
- Prioritize performance: Achieve sub-100ms response times, high frame rates (60+ FPS for games), and global low-latency delivery.
- Make adding new games straightforward, with minimal manual intervention.
- Ensure the site is secure, scalable, and cost-effective, hosted entirely on Cloudflare.
- Incorporate themes of faith and inspiration subtly in the UI, such as motivational quotes or design elements that evoke wonder and creation.

## 3. Technologies
The stack focuses on the latest advancements for speed and performance, as of February 2026.

### Frontend
- **Framework**: React 19.2 (latest stable release, featuring improved concurrent rendering, server components, action-based state management, and Web Components support for better performance and developer experience).
- **Build Tool**: Vite (for fast development and production builds, with built-in support for React and WASM loading).
- **State Management**: React's built-in hooks and Context API for simplicity; optional Zustand or Jotai for complex game states if needed.
- **UI Library**: Minimalist approach with Tailwind CSS for rapid, performant styling. No heavy component libraries to keep bundle sizes small.
- **WASM Integration**: WebAssembly API for loading and executing .wasm modules in React components. Use `wasm-loader` in Vite for seamless imports.

### Backend and Compilation
- **Compilation Toolchain**: Emscripten (latest version, for compiling C++ and C source to WASM). Compilation will be handled in a build pipeline rather than runtime to ensure speed and reliability. For "straight from the source" play, games will be pre-compiled during addition/deployment, with source code viewable for transparency.
- **Runtime Execution**: Browser-side WASM execution via JavaScript interop in React. For complex games, offload heavy computations to Web Workers to maintain UI responsiveness.
- **Dynamic Aspects**: Cloudflare Workers (with Rust-based proxy for 25% performance boost and 10ms latency reduction) for any API needs, such as game metadata or user progress saving.

### Hosting and Infrastructure
- **Platform**: Cloudflare Pages for static asset hosting (React app), integrated with Cloudflare Workers for full-stack capabilities. Use Pages Functions for serverless API endpoints.
- **Storage**: Cloudflare R2 for storing .wasm files, game assets, and source code (if viewable).
- **Performance Features**:
  - Cloudflare's global CDN with edge computing for sub-100ms TTFB.
  - Rust-powered core proxy (FL2) for faster request handling.
  - Static asset optimization: Brotli compression, image optimization via Polish, and caching with Tiered Cache.
  - Edge-side rendering (ESR) with Workers for dynamic content.
  - Zero Trust security for admin endpoints.
- **Database**: Cloudflare D1 (SQLite-based) for lightweight storage of game metadata, user scores, etc.
- **Deployment**: Git-based CI/CD with Cloudflare Pages; automatic builds on push.

### Why These Technologies?
- React 19 ensures modern, efficient UI development with concurrent features for smooth game interfaces.
- Vite + WASM provides near-native speeds for games, outperforming pure JS.
- Cloudflare's latest stack (including Astro influences post-acquisition for content-driven sites) delivers unmatched performance: 20% faster internet upgrades via Rust, edge functions, and AI-optimized routing.
- Emscripten enables C++ to WASM compilation, allowing studio games to run in-browser at high speeds.

## 4. Architecture
The site follows a Jamstack/full-stack hybrid model for optimal performance.

### High-Level Overview
- **Client-Side**: React app loads game lists from metadata. Selecting a game fetches .wasm and assets from R2, instantiates WASM in a Canvas/WebGL context via React component.
- **Server-Side**: Workers handle admin uploads/compilation triggers. Compilation occurs in CI/CD (e.g., GitHub Actions integrated with Cloudflare) to avoid runtime overhead on Workers.
- **Data Flow**:
  1. User browses games → React fetches metadata from D1 via Workers API.
  2. Play game → Load .wasm module asynchronously, initialize with Emscripten runtime.
  3. Admin adds game: Upload .cpp source → Trigger build pipeline to compile to .wasm → Store in R2 → Update D1.
- **Scalability**: Cloudflare handles global distribution; Workers scale automatically.

### Key Components
- **Game Player Component**: A React component using `useEffect` to load WASM:
  ```jsx
  import React, { useEffect, useRef } from 'react';
  import init from './game.wasm'; // Vite handles WASM import

  const GamePlayer = ({ gameId }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      init().then((module) => {
        // Initialize Emscripten module, bind to canvas
        module.canvas = canvasRef.current;
        module.callMain(); // Run game entry point
      });
    }, []);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
  };
  ```
  - Use Web Workers for background WASM execution if needed for 60 FPS.
- **Compilation Pipeline**: For easy game addition:
  - Admin dashboard (React form) uploads .cpp files to R2 temporarily.
  - Worker triggers a build (via Cloudflare Queue or external CI) using Emscripten in a Docker container.
  - Output .wasm stored in R2; metadata updated in D1.
  - Rationale: Runtime compilation in Workers is infeasible due to toolchain size; pre-build ensures speed.
- **Performance Optimizations**:
  - Lazy loading of WASM modules.
  - Code splitting in React for smaller bundles.
  - Cloudflare Argo Smart Routing for optimal paths.
  - WASM binary optimization with `wasm-opt`.

## 5. Features
- **Game Catalog**: Grid view of games with thumbnails, descriptions, and "Play Now" buttons.
- **Game Viewer**: Full-screen mode with controls; display source code snippet for "from the source" transparency.
- **Admin Panel**: Secure (Zero Trust) section to upload .cpp, trigger compilation, and add metadata.
- **User Features**: Save progress (via IndexedDB or D1), leaderboards.
- **Theming**: Clean, fast-loading design with subtle faith-inspired elements (e.g., loading spinner with a cross motif, quotes like "Created in His image").
- **Analytics**: Cloudflare Radar for monitoring performance.

## 6. UI/UX Design
- **Layout**: Single-page app with React Router for navigation.
- **Pages**:
  - Home: Welcome message, featured games.
  - Games: List/filter/search.
  - Game Page: Embedded player, source viewer.
  - About: Studio mission, tied to faith.
- **Accessibility**: ARIA labels for game controls; keyboard navigation.
- **Mobile Responsiveness**: Games scale to device; touch controls.

## 7. Security
- **Cloudflare Zero Trust**: Protect admin routes.
- **WAF**: Block malicious traffic.
- **HTTPS**: Enforced by Cloudflare.
- **WASM Safety**: Sandboxed execution; no direct file access.

## 8. Performance Metrics and Testing
- **Targets**: 95th percentile load time < 2s; game startup < 1s; FPS > 60.
- **Tools**: Lighthouse, Web Vitals; Cloudflare Observability.
- **Testing**: Unit tests with Vitest; e2e with Playwright. Benchmark WASM vs. JS equivalents.

## 9. Deployment and Maintenance
- **Deployment Pipeline**: Git repo → Cloudflare Pages deploy. Use `wrangler` for Workers.
- **Adding Games**: Studio devs commit source to repo branch; merge triggers build/compilation/deploy.
- **Monitoring**: Cloudflare Dashboard for uptime/performance.
- **Costs**: Free tier for Pages/Workers; scale as needed.
- **Future-Proofing**: Modular design for easy updates to React 20+ or new Cloudflare features.

This design ensures a high-performance site that makes HolyForge Games accessible and enjoyable, with efficient processes for growth. Implementation can begin with a prototype focusing on one sample game.
