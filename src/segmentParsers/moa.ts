import { ediDictionary } from '../ediDictionary';

export function renderMOA(segment: string, parts: string[]): string {
  try {
    console.log('renderMOA input:', { segment, parts });
    parts = parts || [];

    // MOA010 = amount qualifier (e.g. 203 = line item amount, 8 = charge amount)
    // MOA020 = monetary amount value
    const rawComposite = parts[0] ?? '';
    const [rawQualifier = '', rawAmount = ''] = rawComposite.split(':');

    // Safely grab qualifier descriptions or default to empty map
    const moaFields = ((ediDictionary.MOA as any).fields ?? {}) as Record<string, string>;
    const qualifierDesc = moaFields[rawQualifier] || '';

    // Validate mandatory fields: qualifier and amount
    const missing: string[] = [];
    if (!rawQualifier) missing.push('Amount qualifier');
    if (!rawAmount)    missing.push('Amount value');

    const missingHtml = missing.length
      ? `<p style="color:red"><strong>Missing mandatory fields:</strong> ${missing.join(', ')}</p>`
      : '';

    // Warn on unknown qualifier codes
    const unknownQualHtml = rawQualifier && !qualifierDesc
      ? `<p style="color:red"><strong>Unknown qualifier code:</strong> ${rawQualifier}</p>`
      : '';

    // Render the MOA segment HTML
    return `
      <h3>${ediDictionary.MOA.name}</h3>
      <code>${segment}</code>
      ${missingHtml}
      ${unknownQualHtml}
      <p>
        <strong>Qualifier:</strong>
        ${rawQualifier || '<em>N/A</em>'}
        ${qualifierDesc ? ` (${qualifierDesc})` : ''}
      </p>
      <p><strong>Amount:</strong> €${rawAmount || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderMOA error:', e);
    // Return a safe error block to avoid a blank screen
    return `
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${ediDictionary.MOA.name}</h3>
        <p style="color:red"><strong>Error rendering MOA:</strong> ${e.message}</p>
        <code>${segment}</code>
      </div>
    `;
  }
}
