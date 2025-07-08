// src/renderLIN.ts
import { ediDictionary } from '../ediDictionary';

export function renderLIN(
  segment: string,
  parts: string[]
): { html: string; product: any } {
  try {
    console.log('renderLIN input:', { segment, parts });
    parts = parts || [];

    // LIN010 = Line item number
    // LIN020 = C212 composite: item identification and qualifier
    const lineNumber = parts[0] ?? '';
    const idComposite = parts[2] ?? '';
    const [rawItemId = '', rawItemIdType = ''] = idComposite.split(':');

    // Validate mandatory fields
    const missing: string[] = [];
    if (!lineNumber) missing.push('LIN010 Line number');
    if (!rawItemId)  missing.push('LIN020 Item identification');

    // Build error HTML
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    // Build HTML snippet
    const html = `
      <h3>LIN – ${ediDictionary.LIN.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Line number (LIN010):</strong> ${lineNumber || '<em>N/A</em>'}</p>
      <p><strong>Item ID type (LIN020-2):</strong> ${rawItemIdType || '<em>N/A</em>'}</p>
      <p><strong>Item identification (LIN020-1):</strong> ${rawItemId || '<em>N/A</em>'}</p>
    `;

    const product = { lineNumber, ean: rawItemId, itemIdType: rawItemIdType };

    return { html, product };
  } catch (e: any) {
    console.error('renderLIN error:', e);
    return {
      html: `
        <div class="edi-error">
          <h3>LIN – ${ediDictionary.LIN.name}</h3>
          <p>Error rendering LIN: ${e.message}</p>
          <code>${segment}</code>
        </div>
      `,
      product: null,
    };
  }
}
