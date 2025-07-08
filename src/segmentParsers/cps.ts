// src/renderCPS.ts
import { ediDictionary } from '../ediDictionary';

export function renderCPS(segment: string, parts: string[]): string {
  try {
    console.log('renderCPS input:', { segment, parts });
    parts = parts || [];

    // CPS010 = hierarchical level id (mandatory)
    // CPS020 = parent hierarchical id (optional)
    const [hierId = '', parentId = ''] = parts;

    // Check mandatory CPS010
    const missing: string[] = [];
    if (!hierId) missing.push('CPS010 Hierarchical id');

    // Build error HTML if needed
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>CPS – ${ediDictionary.CPS.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Hierarchical id (CPS010):</strong> ${hierId || '<em>n.v.t.</em>'}</p>
      <p><strong>Parent hierarchical id (CPS020):</strong> ${parentId || '<em>—</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderCPS error:', e);
    return `
      <h3>CPS – ${ediDictionary.CPS.name}</h3>
      <p class="edi-error">Error rendering CPS: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
