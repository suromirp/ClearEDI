export function renderBGM(segment: string, parts: string[]): string {
  const [rawType, docNumber, functionCode] = parts;
  const [typeCode] = rawType?.split(':') ?? [];

  const typeDescription = {
    '220': 'Bestelling',
    '231': 'Orderbevestiging',
    '351': 'Factuur',
  }[typeCode] ?? '⚠️ onbekend';

  const functionDescription = {
    '9': 'Origineel bericht',
    '4': 'Wijziging (Change)',
    '29': 'Geaccepteerd zonder wijziging',
  }[functionCode] ?? '⚠️ onbekend';

  return `
    <h3>BGM – Berichtinformatie</h3>
    <code>${segment}</code>
    <p>🛈 (1001): <strong>${typeCode}</strong> = Berichttype (${typeDescription})</p>
    <p>🛈 (1004): <strong>${docNumber}</strong> = Document-/berichtnummer</p>
    <p>🛈 (1225): <strong>${functionCode}</strong> = Berichtfunctie (${functionDescription})</p>
  `;
}