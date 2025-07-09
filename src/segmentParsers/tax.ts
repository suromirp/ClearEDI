// src/renderTAX.ts
import { ediDictionary } from '../ediDictionary';

export function renderTAX(segment: string, parts: string[]): string {
  try {
    console.log('renderTAX input:', { segment, parts });
    parts = parts || [];

    // Correcte definitie volgens EDIFACT bol.com documentatie:
    // TAX+<5283>+<C241-5153>+++:::<5278>
    const rawDutyQualifier = parts[0] ?? '';          // 5283 - Duty/tax/fee function qualifier
    const rawTaxType       = parts[1] ?? '';          // C241-5153 - Duty/tax/fee type, coded
    const amountParts      = (parts[4] ?? '').split(':');
    const rawPercentage    = amountParts[3] ?? '';    // 5278 - Duty/tax/fee rate

    // Lookup descriptions
    const taxFields        = (ediDictionary.TAX.fields ?? {}) as Record<string, string>;
    const dutyQualifierDesc= taxFields[rawDutyQualifier] || '';
    const taxTypeDesc      = taxFields[rawTaxType]      || '';

    // Collect missing mandatory fields
    const missing: string[] = [];
    if (!rawDutyQualifier) missing.push('TAX010 Duty/tax/fee function qualifier');
    if (!rawTaxType)       missing.push('TAX020 Duty/tax/fee type, coded');
    if (!rawPercentage)    missing.push('TAX050 Duty/tax/fee rate');

    // Build status HTML
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>TAX – ${ediDictionary.TAX.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p>
        <strong>Duty/tax/fee function qualifier (TAX010):</strong>
        ${rawDutyQualifier || '<em>N/A</em>'}
        ${dutyQualifierDesc ? ` (${dutyQualifierDesc})` : ''}
      </p>
      <p>
        <strong>Duty/tax/fee type (TAX020):</strong>
        ${rawTaxType || '<em>N/A</em>'}
        ${taxTypeDesc ? ` (${taxTypeDesc})` : ''}
      </p>
      <p>
        <strong>Duty/tax/fee rate (TAX050):</strong>
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
