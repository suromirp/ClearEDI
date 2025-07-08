// src/renderUNT.ts
import { ediDictionary } from '../ediDictionary';

/**
 * Renders the UNT (Message trailer) segment with mandatory‐field validation
 * and dynamic segment name lookup.
 */
export function renderUNT(segment: string, parts: string[]): string {
  try {
    console.log('renderUNT input:', { segment, parts });
    parts = parts || [];

    // UNT010 = Number of segments in the message
    // UNT020 = Message reference number
    const rawSegmentCount     = parts[0] ?? '';
    const rawMessageRefNumber = parts[1] ?? '';

    // Collect missing mandatory fields
    const missing: string[] = [];
    if (!rawSegmentCount)     missing.push('UNT010 Number of segments');
    if (!rawMessageRefNumber) missing.push('UNT020 Message reference number');

    // Build error HTML only if missing
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>UNT – ${ediDictionary.UNT.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Number of segments (UNT010):</strong> ${rawSegmentCount || '<em>N/A</em>'}</p>
      <p><strong>Message reference number (UNT020):</strong> ${rawMessageRefNumber || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderUNT error:', e);
    return `
      <h3>UNT – ${ediDictionary.UNT.name}</h3>
      <p class="edi-error">Error rendering UNT: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
