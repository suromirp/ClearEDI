// src/renderUNS.ts
import { ediDictionary } from '../ediDictionary';

/**
 * Renders the UNS (Section control) segment with validation,
 * dictionary lookup, and runtime safety.
 */
export function renderUNS(segment: string, parts: string[]): string {
  try {
    console.log('renderUNS input:', { segment, parts });
    parts = parts || [];

    // UNS010 = section identification (S = detail, D = summary)
    const rawSectionId = parts[0] ?? '';

    // Pull in the valid codes map
    const unsFields  = (ediDictionary.UNS.fields ?? {}) as Record<string,string>;
    const sectionDesc = unsFields[rawSectionId] || '';

    // Check mandatory UNS010
    const missing: string[] = [];
    if (!rawSectionId) missing.push('UNS010 Section identification');

    // Build error HTML only if missing
    const missingHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    // Warn if code is present but unknown
    const unknownHtml = rawSectionId && !sectionDesc
      ? `<p class="edi-error">Unknown section identification code: ${rawSectionId}</p>`
      : '';

    return `
      <h3>UNS – ${ediDictionary.UNS.name}</h3>
      <code>${segment}</code>
      ${missingHtml}
      ${unknownHtml}
      <p>
        <strong>Section identification (UNS010):</strong>
        ${rawSectionId || '<em>N/A</em>'}
        ${sectionDesc ? ` (${sectionDesc})` : ''}
      </p>
    `;
  } catch (e: any) {
    console.error('renderUNS error:', e);
    return `
      <h3>UNS – ${ediDictionary.UNS.name}</h3>
      <p class="edi-error">Error rendering UNS: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
