
let currentPath = $state(
  globalThis.window === undefined
    ? '/'
    : globalThis.window.location.pathname,
);

function readPath() {
  currentPath = globalThis.window.location.pathname;
}

if (globalThis.window !== undefined) {
  globalThis.window.addEventListener('popstate', readPath);
}
