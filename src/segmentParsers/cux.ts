import { ediDictionary } from '../ediDictionary';

export function renderCUX(segment: string, parts: string[]): string {
  try {
    console.log('renderCUX input:', { segment, parts });
    parts = parts || [];

    // Determine rawQualifier, rawCode and rawType depending on how parts are provided
    let rawQualifier = '';
    let rawCode = '';
    let rawType = '';

    if (parts.length === 1 && parts[0].includes(':')) {
      // single composite element “qualifier:code:type”
      [rawQualifier, rawCode, rawType] = parts[0].split(':');
    } else {
      // separate qualifier and “code:type”
      rawQualifier = parts[0] ?? '';
      [rawCode, rawType] = parts[1]?.split(':') ?? ['', ''];
    }

    // Cast to allow dynamic indexing without TS errors
    const qualifierMap = (ediDictionary.CUX.fields as Record<string, string>) || {};
    const currencyMap  = (ediDictionary.CUX.currencies as Record<string, string>) || {};

    // Lookup descriptions
    const qualifierDesc = qualifierMap[rawQualifier] || '';
    const currencyDesc  = currencyMap[rawCode]        || '';

    // Check mandatory fields
    const missing: string[] = [];
    if (!rawQualifier) missing.push('Currency qualifier');
    if (!rawCode)      missing.push('Currency code');
    if (!rawType)      missing.push('Currency type');

    const missingHtml = missing.length
      ? `<p style="color:red"><strong>Missing mandatory fields:</strong> ${missing.join(', ')}</p>`
      : '';

    // Highlight unknown codes
    const unknownQualHtml = rawQualifier && !qualifierDesc
      ? `<p style="color:red"><strong>Unknown qualifier code:</strong> ${rawQualifier}</p>`
      : '';
    const unknownCodeHtml = rawCode && !currencyDesc
      ? `<p style="color:red"><strong>Unknown currency code:</strong> ${rawCode}</p>`
      : '';

    return `
      <h3>${ediDictionary.CUX.name}</h3>
      <code>${segment}</code>
      ${missingHtml}
      ${unknownQualHtml}
      ${unknownCodeHtml}
      <p>
        <strong>Qualifier:</strong>
        ${rawQualifier || '<em>N/A</em>'}
        ${qualifierDesc ? ` (${qualifierDesc})` : ''}
      </p>
      <p>
        <strong>Currency:</strong>
        ${rawCode || '<em>N/A</em>'}
        ${currencyDesc ? ` (${currencyDesc})` : ''}
      </p>
      <p><strong>Type:</strong> ${rawType || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderCUX error:', e);
    // Fallback UI on error to avoid blank screen
    return `
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${ediDictionary.CUX.name}</h3>
        <p style="color:red"><strong>Error rendering CUX:</strong> ${e.message}</p>
        <code>${segment}</code>
      </div>
    `;
  }
}
