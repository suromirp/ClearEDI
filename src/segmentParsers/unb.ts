// src/renderUNB.ts
import { ediDictionary } from '../ediDictionary';
import { formatDate } from '../ui/formatDate';

export function renderUNB(segment: string, parts: string[]): string {
  try {
    console.log('renderUNB input:', { segment, parts });
    parts = parts || [];

    // UNB structure:
    // parts[0] = syntax identifier (e.g. "UNOC:3")
    // parts[1] = sender identification (GLN:qualifier)
    // parts[2] = recipient identification (GLN:qualifier)
    // parts[3] = date/time composite in form YYMMDD:HHMM
    const [_, senderComp = '', recipientComp = '', dateTimeComp = ''] = parts;

    // Parse sender and recipient
    const [rawSender, senderQual]         = senderComp.split(':');
    const [rawRecipient, recipientQual]   = recipientComp.split(':');

    // Parse date/time composite
    const [rawDate = '', rawTime = ''] = dateTimeComp.split(':');

    // Format date: from YYMMDD → "20YYMMDD" → localized NL date
    let formattedDate = rawDate;
    if (/^\d{6}$/.test(rawDate)) {
      formattedDate = formatDate('20' + rawDate);
    }

    // Format time: HHMM → "HH:MM"
    const formattedTime = rawTime.length === 4
      ? `${rawTime.slice(0,2)}:${rawTime.slice(2,4)}`
      : '';

    // Validate mandatory fields
    const missing: string[] = [];
    if (!rawSender)    missing.push('Sender identification (parts[1])');
    if (!rawRecipient) missing.push('Recipient identification (parts[2])');
    if (!rawDate)      missing.push('Interchange date (parts[3])');

    // Only render error messages if something is missing
    const statusHtml = missing.length
      ? `<div>${missing.map(m => `<p class="edi-error">${m} is mandatory</p>`).join('')}</div>`
      : '';

    return `
      <h3>UNB – ${ediDictionary.UNB.name}</h3>
      <code>${segment}</code>
      ${statusHtml}
      <p><strong>Sender:</strong> ${rawSender || '<em>N/A</em>'}${senderQual ? ` (${senderQual})` : ''}</p>
      <p><strong>Recipient:</strong> ${rawRecipient || '<em>N/A</em>'}${recipientQual ? ` (${recipientQual})` : ''}</p>
      <p><strong>Date:</strong> ${formattedDate || '<em>N/A</em>'}</p>
      <p><strong>Time:</strong> ${formattedTime || '<em>N/A</em>'}</p>
    `;
  } catch (e: any) {
    console.error('renderUNB error:', e);
    return `
      <h3>UNB – ${ediDictionary.UNB.name}</h3>
      <p class="edi-error">Error rendering UNB: ${e.message}</p>
      <code>${segment}</code>
    `;
  }
}
