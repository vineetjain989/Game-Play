# Next.js Subway Runner — Premium 3D Demo

This repo is a prototype/high-fidelity demo built with Next.js + TypeScript + react-three-fiber. It demonstrates a polished 3D runner scene with PBR-like lighting, animated character, obstacles, particles, camera effects and an animated HUD graph.

## Quickstart

1. Clone the repo and `cd` into it.
2. Install dependencies:

```bash
npm install
```

3. Download placeholder model(s):

- Download a sample GLB with animation (e.g. Fox) and save as `public/models/character.glb`.
  Example source: https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Fox

4. Run dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Swap in premium assets

Replace `public/models/character.glb` with your production glTF (draco compressed) models and add HDR/IBL for realistic lighting. Compress textures (KTX2) and use Draco to reduce download size.

## Notes & next steps

- This demo uses `@react-three/drei` helpers for environment and the GLTF loader.
- For production: serve assets via CDN, enable KTX2, Draco compression and add LODs.
- If you want, I can prepare a ready-to-deploy GitHub repo zip including compressed sample assets.
