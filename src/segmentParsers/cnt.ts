// src/renderCNT.ts
import { ediDictionary } from '../ediDictionary';

export function renderCNT(segment: string, parts: string[]): string {
  try {
    console.log('renderCNT input:', { segment, parts });
    parts = parts || [];

    // CNT010 = control qualifier (e.g. 1 = Number of line items)
    // CNT020 = control value
    const [rawQualifier = '', rawCount = ''] = (parts[0] ?? '').split(':');

    // Lookup qualifier description
    const cntFields     = (ediDictionary.CNT.fields ?? {}) as Record<string,string>;
    const qualifierDesc = cntFields[rawQualifier] || '';

    // Mandatory checks
    const missing: string[] = [];
    if (!rawQualifier) missing.push('CNT010 Control qualifier');
    if (!rawCount)     missing.push('CNT020 Control value');

    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    // Unknown-qualifier warning only if it’s non-empty and not in the dictionary
    const unknownHtml = rawQualifier && !qualifierDesc
      ? `<p class="edi-error">Unknown qualifier code: ${rawQualifier}</p>`
      : '';

    return `
      <h3>CNT – ${ediDictionary.CNT.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      ${unknownHtml}
      <p>
        <strong>Qualifier (CNT010):</strong>
        ${rawQualifier || '<em>N/A</em>'}
        ${qualifierDesc ? ` (${qualifierDesc})` : ''}
      </p>
      <p><strong>Count (CNT020):</strong> ${rawCount || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderCNT error:', e);
    return `
      <h3>CNT – ${ediDictionary.CNT.name}</h3>
      <p class="edi-error">Error rendering CNT: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
