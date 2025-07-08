// src/renderGIN.ts
import { ediDictionary } from '../ediDictionary';

export function renderGIN(segment: string, parts: string[]): string {
  try {
    console.log('renderGIN input:', { segment, parts });
    parts = parts || [];

    // GIN010 = identity qualifier (e.g. BN, BX)
    // GIN020 = identity number(s)
    const rawQualifier   = parts[0] ?? '';
    const identityValues = parts.slice(1).filter(v => !!v);

    // Safely access any qualifier descriptions (if you later add them to the dictionary)
    const ginEntry   = ediDictionary.GIN as { name: string; fields?: Record<string,string> };
    const ginFields  = ginEntry.fields ?? {};
    const qualifierDesc = ginFields[rawQualifier] || '';

    // Collect missing mandatory fields
    const missing: string[] = [];
    if (!rawQualifier)             missing.push('GIN010 Identity qualifier');
    if (identityValues.length === 0) missing.push('GIN020 Identity number');

    // Build status HTML if needed
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    // Warn if qualifier code is unrecognized
    const unknownHtml = rawQualifier && !qualifierDesc
      ? `<p class="edi-error">Unknown qualifier code: ${rawQualifier}</p>`
      : '';

    return `
      <h3>GIN – ${ediDictionary.GIN.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      ${unknownHtml}
      <p>
        <strong>Qualifier (GIN010):</strong>
        ${rawQualifier || '<em>N/A</em>'}
        ${qualifierDesc ? ` (${qualifierDesc})` : ''}
      </p>
      <p>
        <strong>Identity number${identityValues.length > 1 ? 's' : ''} (GIN020):</strong>
        ${identityValues.length
          ? identityValues.join(', ')
          : '<em>N/A</em>'}
      </p>
    `;
  } catch (e: any) {
    console.error('renderGIN error:', e);
    return `
      <h3>GIN – ${ediDictionary.GIN.name}</h3>
      <p class="edi-error">Error rendering GIN: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}