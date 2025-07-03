export function renderTAX(segment: string, parts: string[]): string {
    const dutyRegime = parts[0] ?? '';
    const taxType = parts[1] ?? '';
    const category = parts[2] ?? '';
    const percentage = parts[3] ?? '';
  
    return `
      <h3>TAX – Duty/tax/fee details</h3>
      <code>${segment}</code>
      <p><strong>Duty regime:</strong> ${dutyRegime}</p>
      <p><strong>Tax type:</strong> ${taxType}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Percentage:</strong> ${percentage}</p>
    `;
  }
  