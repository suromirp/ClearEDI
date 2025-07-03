export function renderMEA(segment: string, parts: string[]): string {
    const measurementPurposeCode = parts[0] ?? '';
    const measurementDetails = parts[1]?.split(':') ?? [];
    const measurementDimension = measurementDetails[0] ?? '';
    const measurementValue = measurementDetails[1] ?? '';
  
    return `
      <h3>MEA – Measurements</h3>
      <code>${segment}</code>
      <p>🛈 Doel meting: <strong>${measurementPurposeCode}</strong></p>
      <p>🛈 Type meting: <strong>${measurementDimension}</strong></p>
      <p>🛈 Waarde: <strong>${measurementValue}</strong></p>
    `;
  }
  