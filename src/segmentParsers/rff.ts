// src/renderRFF.ts
import { ediDictionary } from '../ediDictionary';

export function renderRFF(segment: string, parts: string[]): string {
  try {
    console.log('renderRFF input:', { segment, parts });
    parts = parts || [];

    // RFF010 = Reference qualifier (e.g. ON = Order number, BM = Bill of lading number)
    // RFF020 = Reference value
    const rawComposite   = parts[0] ?? '';
    const [rawQualifier = '', rawValue = ''] = rawComposite.split(':');

    // Lookup qualifier descriptions from the dictionary
    const rffFields     = (ediDictionary.RFF.fields ?? {}) as Record<string, string>;
    const qualifierDesc = rffFields[rawQualifier] || '';

    // Collect any missing mandatory fields
    const missing: string[] = [];
    if (!rawQualifier) missing.push('RFF010 Reference qualifier');
    if (!rawValue)     missing.push('RFF020 Reference value');

    // Build error messages only if there are missing fields
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>RFF – ${ediDictionary.RFF.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p>
        <strong>Qualifier (RFF010):</strong>
        ${rawQualifier || '<em>N/A</em>'}
        ${qualifierDesc ? ` (${qualifierDesc})` : ''}
      </p>
      <p>
        <strong>Value (RFF020):</strong>
        ${rawValue || '<em>N/A</em>'}
      </p>
    `;
  } catch (e: any) {
    console.error('renderRFF error:', e);
    return `
      <h3>RFF – ${ediDictionary.RFF.name}</h3>
      <p class="edi-error">Error rendering RFF: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
