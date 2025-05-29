import { build } from 'esbuild';

// Electronメインプロセスのビルド
await build({
  entryPoints: ['electron/main.ts'],
  platform: 'node',
  packages: 'external',
  bundle: true,
  format: 'esm',
  outdir: 'dist/electron',
  external: ['electron']
});

// Electronプリロードスクリプトのビルド
await build({
  entryPoints: ['electron/preload.ts'],
  platform: 'node',
  packages: 'external',
  bundle: true,
  format: 'esm',
  outdir: 'dist/electron',
  external: ['electron']
});

console.log('Electronアプリケーションのビルドが完了しました！');