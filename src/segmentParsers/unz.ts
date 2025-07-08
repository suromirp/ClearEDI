// src/renderUNZ.ts
import { ediDictionary } from '../ediDictionary';

/**
 * Renders the UNZ (Interchange trailer) segment with validation,
 * runtime safety, and dynamic segment name lookup.
 */
export function renderUNZ(segment: string, parts: string[]): string {
  try {
    console.log('renderUNZ input:', { segment, parts });
    parts = parts || [];

    // UNZ010 = number of messages (mandatory)
    // UNZ020 = interchange control reference (mandatory)
    const rawMsgCount     = parts[0] ?? '';
    const rawControlRef   = parts[1] ?? '';

    // Validate mandatory fields
    const missing: string[] = [];
    if (!rawMsgCount)   missing.push('Number of messages');
    if (!rawControlRef) missing.push('Interchange control reference');

    const missingHtml = missing.length
      ? `<p style="color:red"><strong>Missing mandatory fields:</strong> ${missing.join(', ')}</p>`
      : '';

    // Warn if message count is not a valid integer
    const invalidCountHtml = rawMsgCount && !/^\d+$/.test(rawMsgCount)
      ? `<p style="color:red"><strong>Invalid message count (not a number):</strong> ${rawMsgCount}</p>`
      : '';

    // Render the UNZ segment HTML
    return `
      <h3>UNZ - ${ediDictionary.UNZ.name}</h3>
      <code>${segment}</code>
      ${missingHtml}
      ${invalidCountHtml}
      <p>
        <strong>Number of messages:</strong>
        ${rawMsgCount || '<em>N/A</em>'}
      </p>
      <p>
        <strong>Interchange control reference:</strong>
        ${rawControlRef || '<em>N/A</em>'}
      </p>
    `;
  } catch (e: any) {
    console.error('renderUNZ error:', e);
    // Fallback UI on error to avoid a blank screen
    return `
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${ediDictionary.UNZ.name}</h3>
        <p style="color:red"><strong>Error rendering UNZ:</strong> ${e.message}</p>
        <code>${segment}</code>
      </div>
    `;
  }
}
