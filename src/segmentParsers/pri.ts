// src/renderPRI.ts
import { ediDictionary } from '../ediDictionary';

export function renderPRI(
  segment: string,
  parts: string[]
): { html: string; price: string } {
  try {
    console.log('renderPRI input:', { segment, parts });
    parts = parts || [];

    // PRI010 = Price qualifier (e.g. AAA = Calculation net)
    // PRI020 = Price amount
    const rawComposite    = parts[0] ?? '';
    const compositeParts = rawComposite.split(':');
    const [rawQualifier = '', rawAmount = '', priceType = '', priceBasis = ''] = rawComposite.split(':');

    // Lookup qualifier description
    const priFields       = (ediDictionary.PRI.fields ?? {}) as Record<string,string>;
    const qualifierDesc   = priFields[rawQualifier] || '';

    // Format amount to two decimals if numeric
    const displayAmount = !isNaN(Number(rawAmount))
      ? Number(rawAmount).toFixed(2)
      : rawAmount;

    // Collect missing mandatory fields
    const missing: string[] = [];
    if (!rawQualifier) missing.push('PRI010 Price qualifier');
    if (!rawAmount)    missing.push('PRI020 Price amount');

    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    // Warn on unknown qualifier codes
    const unknownHtml = rawQualifier && !qualifierDesc
      ? `<p class="edi-error">Unknown qualifier code: ${rawQualifier}</p>`
      : '';

      let formatHTML = '';
    if (
      compositeParts.length !== 4 ||
      rawQualifier !== 'AAA' ||
      priceType !== 'CT' ||
      priceBasis !== 'NTP'
    ) {
      formatHTML = `<p class="edi-error">PRI must follow format: PRI+AAA:&lt;amount&gt;:CT:NTP'</p>`;
    }

    // Build HTML
    const html = `
      <h3>PRI – ${ediDictionary.PRI.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      ${unknownHtml}
      ${formatHTML}
      <p><strong>Qualifier (PRI010):</strong> ${rawQualifier || '<em>N/A</em>'}${qualifierDesc ? ` (${qualifierDesc})` : ''}</p>
      <p><strong>Amount (PRI020):</strong> ${displayAmount || '<em>N/A</em>'}</p>
    `;

    return { html, price: displayAmount };
  } catch (e: any) {
    console.error('renderPRI error:', e);
    return {
      html: `
        <h3>PRI – ${ediDictionary.PRI.name}</h3>
        <p class="edi-error">Error rendering PRI: ${e.message}</p>
        <code>${segment}</code>
      `,
      price: ''
    };
  }
}
