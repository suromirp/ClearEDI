// src/renderPIA.ts
import { ediDictionary } from '../ediDictionary';

export function renderPIA(segment: string, parts: string[]): string {
  try {
    console.log('renderPIA input:', { segment, parts });
    parts = parts || [];

    // PIA010 = function qualifier
    // PIA020 = C212: idValue:codeListQualifier
    const rawFunction    = parts[0] ?? '';
    const [idValue = '', rawCodeList = ''] = parts[1]?.split(':') ?? [];

    // Lookup maps
    const fnMap    = (ediDictionary.PIA.fields   ?? {}) as Record<string,string>;
    const clMap    = (ediDictionary.PIA.codeLists ?? {}) as Record<string,string>;

    const functionDesc = fnMap[rawFunction]    || '';
    const codeListDesc = clMap[rawCodeList]    || '';

    // Mandatory checks
    const missing: string[] = [];
    if (!rawFunction) missing.push('PIA010 function qualifier');
    if (!idValue)     missing.push('PIA020 item identification');

    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    // Unknown‐qualifier warnings
    const unknownFn = rawFunction && !functionDesc
      ? `<p class="edi-error">Unknown PIA010 qualifier: ${rawFunction}</p>`
      : '';
    const unknownCL = rawCodeList && !codeListDesc
      ? `<p class="edi-error">Unknown PIA020 code list qualifier: ${rawCodeList}</p>`
      : '';

    return `
      <h3>PIA – ${ediDictionary.PIA.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      ${unknownFn}
      ${unknownCL}
      <p>
        <strong>Function (PIA010):</strong>
        ${rawFunction || '<em>N/A</em>'}
        ${functionDesc ? ` (${functionDesc})` : ''}
      </p>
      <p>
        <strong>Item identification (PIA020-1):</strong>
        ${idValue || '<em>N/A</em>'}
      </p>
      <p>
        <strong>Code list qualifier (PIA020-3):</strong>
        ${rawCodeList || '<em>N/A</em>'}
        ${codeListDesc ? ` (${codeListDesc})` : ''}
      </p>
    `;
  } catch (e: any) {
    console.error('renderPIA error:', e);
    return `
      <h3>PIA – ${ediDictionary.PIA.name}</h3>
      <p class="edi-error">Error rendering PIA: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
