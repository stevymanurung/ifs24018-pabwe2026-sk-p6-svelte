const BASE_URL = import.meta.env?.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1';
export function getToken() { try { return localStorage.getItem('delcom_token') || ''; } catch { return ''; } }
export function setToken(token) { try { if (token) localStorage.setItem('delcom_token', token); else localStorage.removeItem('delcom_token'); } catch { /* storage may be unavailable */ } }
export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData) && options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const token = getToken(); if (token && !headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  let payload = {}; try { payload = await response.json(); } catch { payload = {}; }
  if (!response.ok || payload.status === 'error') throw new Error(payload.message || `Permintaan gagal (${response.status})`);
  return payload;
}
export const apiGet = (path) => apiRequest(path);
export const apiPost = (path, data) => apiRequest(path, { method: 'POST', body: data instanceof FormData ? data : JSON.stringify(data ?? {}) });
export const apiPut = (path, data) => apiRequest(path, { method: 'PUT', body: data instanceof FormData ? data : JSON.stringify(data ?? {}) });
export const apiDelete = (path) => apiRequest(path, { method: 'DELETE' });
