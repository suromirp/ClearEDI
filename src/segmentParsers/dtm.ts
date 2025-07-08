// src/renderDTM.ts
import { ediDictionary } from '../ediDictionary';

export function renderDTM(segment: string, parts: string[]): string {
  try {
    console.log('renderDTM input:', { segment, parts });
    parts = parts || [];

    // Parse the composite C507 element into qualifier, value and format
    const [rawComposite = ''] = parts;
    const [rawQualifier = '', rawValue = '', rawFormat = ''] = rawComposite.split(':');

    // Lookup qualifier description
    const dtmFields = (ediDictionary.DTM.fields ?? {}) as Record<string, string>;
    const qualifierDesc = dtmFields[rawQualifier] || '';

    // Format the date (YYYYMMDD → DD-MM-YYYY) or date+hour (YYYYMMDDHH)
    let formattedDate = rawValue;
    if (rawFormat === '102' && /^\d{8}$/.test(rawValue)) {
      formattedDate = `${rawValue.slice(6, 8)}-${rawValue.slice(4, 6)}-${rawValue.slice(0, 4)}`;
    } else if (rawFormat === '203' && /^\d{10}$/.test(rawValue)) {
      formattedDate = `${rawValue.slice(6, 8)}-${rawValue.slice(4, 6)}-${rawValue.slice(0, 4)} ${rawValue.slice(8, 10)}:00`;
    }

    // Check mandatory fields
    const missing: string[] = [];
    if (!rawQualifier) missing.push('DTM010 Qualifier');
    if (!rawValue)     missing.push('DTM020 Date/time value');

    // Build error messages only if missing
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>DTM – ${ediDictionary.DTM.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Qualifier:</strong> ${rawQualifier || '<em>N/A</em>'}${qualifierDesc ? ` (${qualifierDesc})` : ''}</p>
      <p><strong>Date:</strong> ${formattedDate || '<em>N/A</em>'}</p>
      <p><strong>Format code:</strong> ${rawFormat || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderDTM error:', e);
    return `
      <h3>DTM – ${ediDictionary.DTM.name}</h3>
      <p class="edi-error">Error rendering DTM: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
