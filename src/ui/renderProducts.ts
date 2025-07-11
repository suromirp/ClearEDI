export function renderProductTable(products: Array<{ lineNumber:string, ean:string, quantity:string, price?:string, qtyCode?:string }>, container: HTMLElement) {
  if (products.length === 0) return;

  // Sorteer producten eerst op QTY-code volgorde: 12, 182, 83
  const qtyOrder = ['12', '182', '83'];
  const sortedProducts = products.slice().sort((a, b) => {
    const aIndex = qtyOrder.indexOf(a.qtyCode || '');
    const bIndex = qtyOrder.indexOf(b.qtyCode || '');
    return aIndex - bIndex;
  });

  const table = document.createElement('table');
  table.className = 'product-table';
  table.innerHTML = `
    <caption>Gevonden producten</caption>
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
        const filtered = sortedProducts.filter(p => p.qtyCode === code);
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
