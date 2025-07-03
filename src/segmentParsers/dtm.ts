export function renderDTM(segment: string, parts: string[]): string {
  const dateInfo = parts[0]?.split(':') ?? [];
  const dateCode = dateInfo[0] ?? '';
  const dateValue = dateInfo[1] ?? '';
  const format = dateInfo[2] ?? '';

  let formattedDate = dateValue;

  if (format === '102' && /^\d{8}$/.test(dateValue)) {
    // Formaat YYYYMMDD → DD-MM-YYYY
    formattedDate = `${dateValue.slice(6, 8)}-${dateValue.slice(4, 6)}-${dateValue.slice(0, 4)}`;
  } else if (format === '203' && /^\d{10}$/.test(dateValue)) {
    // Formaat YYYYMMDDHH (datum + uur)
    formattedDate = `${dateValue.slice(6, 8)}-${dateValue.slice(4, 6)}-${dateValue.slice(0, 4)} ${dateValue.slice(8, 10)}:00`;
  }

  return `
    <h3>DTM – Date/Time/Period</h3>
    <code>${segment}</code>
    <p><strong>Code:</strong> ${dateCode}</p>
    <p><strong>Waarde:</strong> ${formattedDate} (formaat: ${format})</p>
  `;
}