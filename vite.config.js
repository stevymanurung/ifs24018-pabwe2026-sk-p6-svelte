import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

function nonBlockingStylesheet() {
  return {
    name: 'non-blocking-stylesheet',
    apply: 'build',
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'asset' || output.fileName !== 'index.html') continue;
        output.source = String(output.source).replace(
          /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
          '<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="$1"></noscript>',
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [svelte(), nonBlockingStylesheet()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
      include: ['src/helpers/**/*.js', 'src/features/**/*.js', 'src/router.js'],
    },
  },
});
