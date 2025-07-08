// src/renderQTY.ts
import { ediDictionary } from '../ediDictionary';

export function renderQTY(
  segment: string,
  parts: string[]
): { html: string; quantity: string } {
  try {
    console.log('renderQTY input:', { segment, parts });
    parts = parts || [];

    // QTY010 = Quantity qualifier (e.g. 21 = Ordered quantity, 12 = Despatched quantity)
    // QTY020 = Quantity value
    const rawComposite = parts[0] ?? '';
    const [rawQualifier = '', rawValue = ''] = rawComposite.split(':');

    // Qualifier lookup
    const qtyFields     = (ediDictionary.QTY.fields ?? {}) as Record<string,string>;
    const qualifierDesc = qtyFields[rawQualifier] || '';

    // Mandatory checks
    const missing: string[] = [];
    if (!rawQualifier) missing.push('QTY010 Quantity qualifier');
    if (!rawValue)     missing.push('QTY020 Quantity value');

    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    // Unknown-qualifier warning
    const unknownHtml = rawQualifier && !qualifierDesc
      ? `<p class="edi-error">Unknown qualifier code: ${rawQualifier}</p>`
      : '';

    // Build HTML
    const html = `
      <h3>QTY – ${ediDictionary.QTY.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      ${unknownHtml}
      <p>
        <strong>Qualifier (QTY010):</strong>
        ${rawQualifier || '<em>N/A</em>'}
        ${qualifierDesc ? ` (${qualifierDesc})` : ''}
      </p>
      <p>
        <strong>Quantity (QTY020):</strong>
        ${rawValue || '<em>N/A</em>'}
      </p>
    `;

    return { html, quantity: rawValue };
  } catch (e: any) {
    console.error('renderQTY error:', e);
    return {
      html: `
        <h3>QTY – ${ediDictionary.QTY.name}</h3>
        <p class="edi-error">Error rendering QTY: ${e.message}</p>
        <code>${segment}</code>
      `,
      quantity: ''
    };
  }
}
