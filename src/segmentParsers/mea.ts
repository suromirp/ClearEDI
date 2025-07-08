// src/renderMEA.ts
import { ediDictionary } from '../ediDictionary';

export function renderMEA(segment: string, parts: string[]): string {
  try {
    console.log('renderMEA input:', { segment, parts });
    parts = parts || [];

    // MEA010 = purpose code (e.g. PD)
    // parts[1] in your example is not used here
    // MEA020 = C502 composite at parts[2]: qualifier:value:unit
    const rawPurpose = parts[0] ?? '';
    const detailParts = (parts[2] ?? '').split(':');
    const rawQualifier = detailParts[0] ?? '';
    const rawValue     = detailParts[1] ?? '';
    const rawUnit      = detailParts[2] ?? '';

    // Dictionaries
    const meaFields     = (ediDictionary.MEA.fields ?? {}) as Record<string,string>;

    // Look up the human‐readable purpose
    const purposeDesc   = meaFields[rawPurpose] || '';
    // (optional) look up measurement‐qualifier texts if you have them:
    const qualifierDesc = meaFields[rawQualifier] || '';

    // Only PD is truly mandatory plus the value
    const missing: string[] = [];
    if (!rawPurpose)   missing.push('MEA010 Measurement purpose');
    if (!rawValue)     missing.push('MEA020 Measurement value');

    // Build error output
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>MEA – ${ediDictionary.MEA.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Purpose (MEA010):</strong> ${rawPurpose || '<em>N/A</em>'}${purposeDesc ? ` (${purposeDesc})` : ''}</p>
      <p><strong>Qualifier (MEA020-1):</strong> ${rawQualifier || '<em>N/A</em>'}${qualifierDesc ? ` (${qualifierDesc})` : ''}</p>
      <p><strong>Value (MEA020-2):</strong> ${rawValue || '<em>N/A</em>'}</p>
      <p><strong>Unit (MEA020-3):</strong> ${rawUnit || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderMEA error:', e);
    return `
      <h3>MEA – ${ediDictionary.MEA.name}</h3>
      <p class="edi-error">Error rendering MEA: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
