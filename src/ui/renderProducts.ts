// src/ui/renderProducts.ts
export function renderProductTable(products: Array<{ lineNumber:string, ean:string, quantity:string, price?:string }>, container: HTMLElement) {
    if (products.length === 0) return;
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
        ${products.map(p => `
          <tr>
            <td>${p.lineNumber}</td>
            <td>${p.ean}</td>
            <td>${p.quantity}</td>
            <td>${p.price ? '€' + p.price : ''}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    container.appendChild(table);
  }
  