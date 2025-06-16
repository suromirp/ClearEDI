import { formatDate } from '../ui/formatDate';

export function renderDTM(segment: string, parts: string[], dict: any): string {
  const [code, value, format] = parts[0]?.split(':') ?? [];
  const codeExplanation = dict?.fields?.[code] ?? '⚠️ onbekend';
  const formatExplanation = format === '102' ? 'CCYYMMDD' : '⚠️ onbekend';

  return `
    <h3>DTM – Date/time/period</h3>
    <code>${segment}</code>
    <p>🛈 Datumtype ${code} = ${codeExplanation}</p>
    ${value?.length === 8 && /^\d{8}$/.test(value) ? `<p>🛈 ${formatDate(value)}</p>` : ''}
    <p>🛈 ${format} = ${formatExplanation}</p>
  `;
}
