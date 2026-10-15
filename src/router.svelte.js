let currentPath = $state(
  typeof globalThis.window === 'undefined' ? '/' : globalThis.window.location.pathname,
);

function readPath() {
  currentPath = globalThis.window.location.pathname;
}

if (typeof globalThis.window !== 'undefined') {
  globalThis.window.addEventListener('popstate', readPath);
}

export const router = {
  get path() {
    return currentPath;
  },
  navigate(path) {
    if (typeof globalThis.window === 'undefined') {
      return;
    }

    globalThis.window.history.pushState({}, '', path);
    readPath();
    globalThis.window.scrollTo?.({ top: 0, behavior: 'instant' });
  },
  replace(path) {
    if (typeof globalThis.window === 'undefined') {
      return;
    }

    globalThis.window.history.replaceState({}, '', path);
    readPath();
  },
};

export function pathFor(path) {
  return path === currentPath ? 'aria-current="page"' : '';
}
