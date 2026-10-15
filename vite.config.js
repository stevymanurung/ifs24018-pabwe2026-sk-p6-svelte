import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({ plugins: [svelte()], test: { environment: 'jsdom', setupFiles: './src/test-setup.js', coverage: { provider: 'v8', reporter: ['text','html'], thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 }, include: ['src/helpers/**/*.js','src/features/**/*.js','src/router.js'] } } });
