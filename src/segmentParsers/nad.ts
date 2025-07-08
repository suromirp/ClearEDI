// src/renderNAD.ts
import { ediDictionary } from '../ediDictionary';

export function renderNAD(segment: string, parts: string[]): string {
  try {
    console.log('renderNAD input:', { segment, parts });
    parts = parts || [];

    // EDIFACT NAD structure (after splitting on '+'):
    // parts[0] = NAD qualifier (NAD010)
    // parts[1] = party identification (NAD020)
    // parts[2] = code list qualifier (NAD030) – often empty
    // parts[3] = party name (NAD040)
    // parts[4] = street (NAD050)
    // parts[5] = city (NAD060)
    // parts[6] = subdivision (NAD070) – unused here
    // parts[7] = postcode (NAD080)
    // parts[8] = country code (NAD081)
    const rawQualifier = parts[0] ?? '';
    const rawId        = parts[1] ?? '';
    const rawName      = parts[3] ?? '';
    const rawStreet    = parts[4] ?? '';
    const rawCity      = parts[5] ?? '';
    const rawPostcode  = parts[7] ?? '';
    const rawCountry   = parts[8] ?? '';

    // Lookup qualifier description
    const nadFields     = (ediDictionary.NAD.fields ?? {}) as Record<string,string>;
    const qualifierDesc = nadFields[rawQualifier] || '';

    // Lookup country name if you added an ISO map (optional)
    const countryMap    = ((ediDictionary.NAD as any).countries ?? {}) as Record<string,string>;
    const countryName   = countryMap[rawCountry] || '';

    // Collect missing mandatory fields
    const missing: string[] = [];
    if (!rawQualifier) missing.push('NAD010 Party qualifier');
    if (!rawId)        missing.push('NAD020 Party identification');

    // Render errors only if missing
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>NAD – ${ediDictionary.NAD.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Function (NAD010):</strong> ${rawQualifier || '<em>N/A</em>'}${qualifierDesc ? ` (${qualifierDesc})` : ''}</p>
      <p><strong>Identification (NAD020):</strong> ${rawId || '<em>N/A</em>'}</p>
      <p><strong>Name (NAD040):</strong> ${rawName || '<em>N/A</em>'}</p>
      <p><strong>Street:</strong> ${rawStreet || '<em>N/A</em>'}</p>
      <p><strong>City:</strong> ${rawCity || '<em>N/A</em>'}</p>
      <p><strong>Postcode:</strong> ${rawPostcode || '<em>N/A</em>'}</p>
      <p><strong>Country:</strong> ${rawCountry || '<em>N/A</em>'}${countryName ? ` (${countryName})` : ''}</p>
    `;
  } catch (e: any) {
    console.error('renderNAD error:', e);
    return `
      <h3>NAD – ${ediDictionary.NAD.name}</h3>
      <p class="edi-error">Error rendering NAD: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
