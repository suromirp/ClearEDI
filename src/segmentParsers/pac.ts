// src/renderPAC.ts
import { ediDictionary } from '../ediDictionary';

export function renderPAC(segment: string, parts: string[]): string {
  try {
    console.log('renderPAC input:', { segment, parts });
    parts = parts || [];

    // Extract the three mandatory elements:
    // PAC010 = Number of packages
    // PAC020 = Packaging details code (second element after splitting parts[1] on ':')
    // PAC030 = Package type code
    const rawCount       = parts[0] ?? '';
    const detailParts    = (parts[1] ?? '').split(':');
    const rawDetailCode  = detailParts[1] ?? '';
    const rawPackageType = parts[2] ?? '';

    // Pull in the valid PAC codes from the central dictionary
    const pacFields = (ediDictionary.PAC.fields ?? {}) as Record<string, string>;

    // Collect any missing mandatory fields
    const errors: string[] = [];
    if (!rawCount)       errors.push('PAC010 Number of packages is mandatory');
    if (!rawDetailCode)  errors.push('PAC020 Packaging details code is mandatory');
    if (!rawPackageType) errors.push('PAC030 Package type code is mandatory');

    // Render each error, if any, as its own <p> with the edi-error class
    const statusHtml = errors.length
      ? errors.map(e => `<p class="edi-error">${e}</p>`).join('') 
      : '';

    return `
      <h3>PAC – ${ediDictionary.PAC.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Number of packages (PAC010):</strong> ${rawCount || '<em>N/A</em>'}</p>
      <p><strong>Packaging details code (PAC020):</strong> ${rawDetailCode || '<em>N/A</em>'}</p>
      <p><strong>Package type code (PAC030):</strong> ${rawPackageType || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderPAC error:', e);
    return `
      <h3>PAC – ${ediDictionary.PAC.name}</h3>
      <p class="edi-error">Error rendering PAC: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
