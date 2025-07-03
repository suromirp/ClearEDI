export function renderUNB(segment: string, parts: string[]): string {
  const sender = parts[2]?.split(':')[0] ?? '';
  const recipient = parts[3]?.split(':')[0] ?? '';
  const date = parts[4]?.slice(0, 6) ?? '';
  const time = parts[4]?.slice(6) ?? '';

  return `
    <h3>UNB – Interchange header</h3>
    <code>${segment}</code>
    <p><strong>Sender:</strong> ${sender}</p>
    <p><strong>Recipient:</strong> ${recipient}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
  `;
}