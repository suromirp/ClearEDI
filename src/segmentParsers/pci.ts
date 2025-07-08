// src/renderPCI.ts
import { ediDictionary } from '../ediDictionary';

export function renderPCI(segment: string, parts: string[]): string {
  try {
    console.log('renderPCI input:', { segment, parts });
    parts = parts || [];

    // PCI010 = package identification qualifier (e.g. 33E = SSCC label)
    // PCI020 = identification number
    const rawComposite = parts[0] ?? '';
    const [rawQualifier = '', rawId = ''] = rawComposite.split(':');

    // Lookup qualifier descriptions
    const pciFields     = (ediDictionary.PCI.fields ?? {}) as Record<string, string>;
    const qualifierDesc = pciFields[rawQualifier] || '';

    // Collect missing mandatory fields
    const missing: string[] = [];
    if (!rawQualifier) missing.push('PCI010 Identification qualifier');
    if (!rawId)        missing.push('PCI020 Identification number');

    // Build error messages only if missing
    const statusHtml = missing.length
      ? missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')
      : '';

    return `
      <h3>PCI – ${ediDictionary.PCI.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p>
        <strong>Qualifier (PCI010):</strong>
        ${rawQualifier || '<em>N/A</em>'}
        ${qualifierDesc ? ` (${qualifierDesc})` : ''}
      </p>
      <p><strong>Identification (PCI020):</strong> ${rawId || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderPCI error:', e);
    return `
      <h3>PCI – ${ediDictionary.PCI.name}</h3>
      <p class="edi-error">Error rendering PCI: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
