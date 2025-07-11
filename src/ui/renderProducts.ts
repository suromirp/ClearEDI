export function renderProductTable(
  products: Array<{ lineNumber: string, ean: string, quantity: string, price?: string, qtyCode?: string }>,
  container: HTMLElement
) {
  if (products.length === 0) return;

  const qtyOrder = ['12', '182', '83'];

  const table = document.createElement('table');
  table.className = 'product-table';

  table.innerHTML = `
    <caption>Gevonden producten per QTY-code</caption>
    <thead>
      <tr>
        <th>Line #</th>
        <th>EAN Code</th>
        <th>Quantity</th>
        <th>Unit Price (€)</th>
      </tr>    
    </thead>
    <tbody>
      ${qtyOrder.map(code => {
        const filtered = products.filter(p => p.qtyCode === code);
        if (filtered.length === 0) return '';
        return `
          <tr><td colspan="4"><strong>QTY+${code} ${explainQtyCode(code)}</strong></td></tr>
          ${filtered.map(p => `
            <tr>
              <td>${p.lineNumber}</td>
              <td>${p.ean}</td>
              <td>${p.quantity}</td>
              <td>${p.price ? '€' + p.price : ''}</td>
            </tr>
          `).join('')}
        `;
      }).join('')}
      ${
        // Toon overige producten zonder qtyCode ook
        products.filter(p => !qtyOrder.includes(p.qtyCode || '')).map(p => `
          <tr>
            <td>${p.lineNumber}</td>
            <td>${p.ean}</td>
            <td>${p.quantity}</td>
            <td>${p.price ? '€' + p.price : ''}</td>
          </tr>
        `).join('')
      }
    </tbody>
  `;

  container.appendChild(table);
}

function explainQtyCode(code: string): string {
  switch (code) {
    case '12': return '(Accepted)';
    case '182': return '(Cancelled)';
    case '83': return '(Backorder)';
    default: return '';
  }
}
