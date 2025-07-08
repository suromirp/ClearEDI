// src/renderUNH.ts
import { ediDictionary } from '../ediDictionary';

export function renderUNH(segment: string, parts: string[]): string {
  try {
    console.log('renderUNH input:', { segment, parts });
    parts = parts || [];

    // Extract sub‐elements from UNH+<ref>+<type>:<ver>:<rel>:<agency>:<assoc>
    const messageRef = parts[0] ?? '';
    const [messageType = '', version = '', release = '', agency = ''] =
      (parts[1] ?? '').split(':');

    // Check mandatory fields
    const missing: string[] = [];
    if (!messageRef)  missing.push('Message reference');
    if (!messageType) missing.push('Message type');
    if (!version)     missing.push('Version');
    if (!release)     missing.push('Release');
    if (!agency)      missing.push('Agency');

    // Render any missing‐field errors
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>UNH – ${ediDictionary.UNH.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Message reference:</strong> ${messageRef || '<em>n.v.t.</em>'}</p>
      <p><strong>Type:</strong> ${messageType || '<em>n.v.t.</em>'}</p>
      <p><strong>Version:</strong> ${version || '<em>n.v.t.</em>'}</p>
      <p><strong>Release:</strong> ${release || '<em>n.v.t.</em>'}</p>
      <p><strong>Agency:</strong> ${agency || '<em>n.v.t.</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderUNH error:', e);
    return `
      <h3>UNH – ${ediDictionary.UNH.name}</h3>
      <p class="edi-error">Error rendering UNH: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
