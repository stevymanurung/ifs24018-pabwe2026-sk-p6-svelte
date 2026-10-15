export function classNames(...values) { return values.flat().filter(Boolean).join(' '); }
export function getErrorMessage(error, fallback = 'Terjadi kesalahan. Silakan coba lagi.') { return error instanceof Error && error.message ? error.message : fallback; }
export function formatDate(value) { if (!value) return '—'; const date = new Date(value); return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date); }
export function normalizeList(payload, key) { const value = payload?.data?.[key]; return Array.isArray(value) ? value : []; }
export function safeUrl(value) { try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } }
