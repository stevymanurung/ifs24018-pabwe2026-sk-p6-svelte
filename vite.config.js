import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

/** Inline emitted CSS into index.html to remove the stylesheet network request
 * from the initial critical request chain. */
function inlineCriticalStylesheet() {
  return {
    name: 'inline-critical-stylesheet',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const htmlAsset = bundle['index.html'];
      if (!htmlAsset || htmlAsset.type !== 'asset') return;

      let html = typeof htmlAsset.source === 'string'
        ? htmlAsset.source
        : Buffer.from(htmlAsset.source).toString('utf8');

      const cssAssets = Object.values(bundle).filter(
        (asset) => asset.type === 'asset' && asset.fileName.endsWith('.css'),
      );

      for (const cssAsset of cssAssets) {
        const fileName = cssAsset.fileName.split('/').pop();
        // Escape the filename before using it in a regular expression.
        const escapedName = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const linkPattern = new RegExp(
          `<link\\b(?=[^>]*\\brel=["']stylesheet["'])(?=[^>]*\\bhref=["'][^"']*${escapedName}(?:\\?[^"']*)?["'])[^>]*\\/?\\s*>`,
          'gi',
        );
        const css = String(cssAsset.source).replace(/<\/style/gi, '<\\/style');
        const styleTag = `<style>${css}</style>`;

        if (linkPattern.test(html)) {
          // Replace every matching stylesheet link, not just the first one.
          html = html.replace(linkPattern, styleTag);
        } else if (!html.includes(styleTag)) {
          // Vite output can change formatting between versions. If a matching
          // link was not found, add the CSS to the document head as a fallback.
          html = html.replace('</head>', `${styleTag}</head>`);
        }
        delete bundle[cssAsset.fileName];
      }

      htmlAsset.source = html;
    },
  };
}

export default defineConfig({
  plugins: [svelte(), inlineCriticalStylesheet()],
  build: {
    cssCodeSplit: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
      // Enforce 100% coverage on the helper module that currently has unit tests.
      // Add other modules here only after adding tests for them.
      include: ['src/helpers/toolsHelper.js'],
    },
  },
});
