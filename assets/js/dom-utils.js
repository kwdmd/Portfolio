/** Small DOM and output-safety helpers shared by the page modules. */
export const query = (selector, root = document) => root.querySelector(selector);
export const queryAll = (selector, root = document) => Array.from(root.querySelectorAll(selector));

/** Template tag used only for readable HTML; dynamic text is escaped separately. */
export function html(parts, ...values) {
  return parts.reduce((result, part, index) => result + part + (values[index] ?? ''), '');
}

export function escapeHTML(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value ?? '').replace(/[&<>"']/g, (character) => entities[character]);
}

export function sanitizeExternalURL(value) {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) ? escapeHTML(url.href) : '';
  } catch {
    return '';
  }
}

function sanitizeLocalURL(value, pattern) {
  return typeof value === 'string' && pattern.test(value) && !value.includes('..')
    ? escapeHTML(value)
    : sanitizeExternalURL(value);
}

export function sanitizeResourceURL(value) {
  return sanitizeLocalURL(value, /^(?:comma|documents|musician|rocket-defense)\/[a-zA-Z0-9_./-]+(?:#[a-zA-Z0-9-]+)?$/);
}

export function sanitizeImageURL(value) {
  return sanitizeLocalURL(value, /^(?:assets|musician\/img|comma\/img)\/[a-zA-Z0-9_./-]+$/);
}
