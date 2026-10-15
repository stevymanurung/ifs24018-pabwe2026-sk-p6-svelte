import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

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

      // Inline generated CSS into HTML so the browser does not need a separate,
      // render-blocking stylesheet request on the critical loading path.
      for (const cssAsset of cssAssets) {
        const cssPath = `/${cssAsset.fileName}`;
        const escapedPath = cssPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const linkPattern = new RegExp(`<link\\b(?=[^>]*\\brel=[\"']stylesheet[\"'])(?=[^>]*\\bhref=[\"'](?:[^\"']*/)?${escapedPath.split('/').pop()}(?:\\?[^\"']*)?[\"'])[^>]*\\/?\\s*>`, 'i');
        const css = String(cssAsset.source).replace(/<\/style/gi, '<\\/style');
        const styleTag = `<style>${css}</style>`;

        if (linkPattern.test(html)) {
          html = html.replace(linkPattern, styleTag);
        } else if (!html.includes(styleTag)) {
          // Fallback for Vite output format changes: still inline the CSS.
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
