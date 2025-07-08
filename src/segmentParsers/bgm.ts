// src/renderBGM.ts
import { ediDictionary } from '../ediDictionary';

export function renderBGM(segment: string, parts: string[]): string {
  try {
    console.log('renderBGM input:', { segment, parts });
    parts = parts || [];

    // parts structure for BGM:
    // parts[0] = C002 composite (e.g. "351::9")
    // parts[1] = document number
    // parts[2] = message function code
    const rawC002 = parts[0] ?? '';
    const documentNumber = parts[1] ?? '';
    const rawFunc = parts[2] ?? '';

    // Lookup function description
    const bgmFields = (ediDictionary.BGM.fields ?? {}) as Record<string, string>;
    const funcDesc = bgmFields[rawFunc] || '';

    // Validate mandatory fields
    const missing: string[] = [];
    if (!rawC002)      missing.push('BGM001 Document/message name (C002) is mandatory');
    if (!documentNumber) missing.push('BGM002 Document number is mandatory');
    if (!rawFunc)      missing.push('BGM003 Message function code is mandatory');

    // Build error block if needed
    const statusHtml = missing.length
      ? `<div class="edi-error">${missing.map(m => `<p>${m}</p>`).join('')}</div>`
      : '';

    return `
      <h3>BGM – ${ediDictionary.BGM.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Document code:</strong> ${rawC002 || '<em>N/A</em>'}</p>
      <p><strong>Document number:</strong> ${documentNumber || '<em>N/A</em>'}</p>
      <p><strong>Message function:</strong> ${rawFunc || '<em>N/A</em>'}${funcDesc ? ` (${funcDesc})` : ''}</p>
    `;
  } catch (e: any) {
    console.error('renderBGM error:', e);
    return `
      <div class="edi-error">
        <h3>BGM – ${ediDictionary.BGM.name}</h3>
        <p>Error rendering BGM: ${e.message}</p>
      </div>
      <code>${segment}</code>
    `;
  }
}
