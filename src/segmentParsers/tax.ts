// src/renderTAX.ts
import { ediDictionary } from '../ediDictionary';

export function renderTAX(segment: string, parts: string[]): string {
  try {
    console.log('renderTAX input:', { segment, parts });
    parts = parts || [];

    // TAX+<C241-328>+<C243-330>+<C241-329>+<C241-3055>+<C243-331>:<C243-332>:<C243-333>:<C243-334>
    const rawDutyRegime  = parts[0] ?? '';              // C241-328
    const rawTaxType     = parts[1] ?? '';              // C243-330
    const rawCategory    = parts[2] ?? '';              // C241-329
    // parts[3] is agency, ignore
    // parts[4] is the amount composite "qualifier:...:percentage:..."
    const amountParts    = (parts[4] ?? '').split(':');
    const rawPercentage  = amountParts[3] ?? '';

    // Lookup descriptions
    const taxFields      = (ediDictionary.TAX.fields ?? {}) as Record<string,string>;
    const dutyRegimeDesc = taxFields[rawDutyRegime] || '';
    const taxTypeDesc    = taxFields[rawTaxType]    || '';
    const categoryDesc   = taxFields[rawCategory]   || '';

    // Collect missing mandatory fields
    const missing: string[] = [];
    if (!rawDutyRegime)  missing.push('TAX010 Duty regime');
    if (!rawTaxType)     missing.push('TAX020 Tax type code');
    if (!rawCategory)    missing.push('TAX030 Tax category code');
    if (!rawPercentage)  missing.push('TAX040 Tax percentage');

    // Build status HTML
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>TAX – ${ediDictionary.TAX.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p>
        <strong>Duty regime (TAX010):</strong>
        ${rawDutyRegime || '<em>N/A</em>'}
        ${dutyRegimeDesc ? ` (${dutyRegimeDesc})` : ''}
      </p>
      <p>
        <strong>Tax type (TAX020):</strong>
        ${rawTaxType || '<em>N/A</em>'}
        ${taxTypeDesc ? ` (${taxTypeDesc})` : ''}
      </p>
      <p>
        <strong>Category (TAX030):</strong>
        ${rawCategory || '<em>N/A</em>'}
        ${categoryDesc ? ` (${categoryDesc})` : ''}
      </p>
      <p>
        <strong>Percentage (TAX040):</strong>
        ${rawPercentage || '<em>N/A</em>'}
      </p>
    `;
  } catch (e: any) {
    console.error('renderTAX error:', e);
    return `
      <h3>TAX – ${ediDictionary.TAX.name}</h3>
      <p class="edi-error">Error rendering TAX: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
