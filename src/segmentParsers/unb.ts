import { formatDate } from '../ui/formatDate';

export function renderUNB(segment: string, parts: string[]): string {
  const [syntaxId, syntaxVersion] = parts[0]?.split(':') ?? [];
  const [senderCode, senderQualifier] = parts[1]?.split(':') ?? [];
  const [receiverCode, receiverQualifier] = parts[2]?.split(':') ?? [];
  const [date, time] = parts[3]?.split(':') ?? [];
  const controlReference = parts[4] ?? '';
  const testIndicator = parts[6];

  return `
    <h3>UNB – Interchange header</h3>
    <code>${segment}</code>
    <p>🛈 Syntax identifier: <strong>${syntaxId}</strong></p>
    <p>🛈 Versie: <strong>${syntaxVersion}</strong></p>
    <p>🛈 Verzendercode: <strong>${senderCode}</strong></p>
    <p>🛈 Qualifier: <strong>${senderQualifier}</strong> (${
    senderQualifier === '14' ? 'GLN' : '⚠️ onbekend'
  })</p>
    <p>🛈 Ontvangercode: <strong>${receiverCode}</strong></p>
    <p>🛈 Qualifier: <strong>${receiverQualifier}</strong> (${
    receiverQualifier === '14' ? 'GLN' : '⚠️ onbekend'
  })</p>
    <p>🛈 Verzenddatum: <strong>${formatDate('20' + date)}</strong></p>
    <p>🛈 Verzendtijd: <strong>${time}</strong></p>
    <p>🛈 Controlereferentie: <strong>${controlReference}</strong></p>
    ${
      testIndicator === '1'
        ? '<p>🛈 <strong>Testbericht</strong> (test indicator = 1)</p>'
        : ''
    }
  `;
}
