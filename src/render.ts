import { parseSegments } from './segmentParser';
import { getContainer, getTextarea, getToggle } from './ui/elementsUI';

import { renderUNB } from './segmentParsers/unb';
import { renderBGM } from './segmentParsers/bgm';
import { renderDTM } from './segmentParsers/dtm';
import { renderNAD } from './segmentParsers/nad';
import { renderRFF } from './segmentParsers/rff';
import { renderQTY } from './segmentParsers/qty';
import { renderLIN } from './segmentParsers/lin';
import { renderUNH } from './segmentParsers/unh';
import { parseDefault } from './segmentParsers/defaultParser';
import { ediDictionary } from './ediDictionary';

export function render() {
  const textarea = getTextarea();
  const container = getContainer();
  const toggleCheckbox = getToggle();
  const showUnknowns = toggleCheckbox.checked;

  const segments = parseSegments(textarea.value);
  container.innerHTML = '';

  let currentProduct: any = {};
  const products: any[] = [];

  for (const segment of segments) {
    const [tag, ...parts] = segment.split('+');
    const dict = ediDictionary[tag];

    if (!dict && !showUnknowns) continue;

    const el = document.createElement('div');
    el.className = 'segment';
    let html = '';
    let shouldAppend = true;

    switch (tag) {
      case 'UNB':
        html = renderUNB(segment, parts);
        break;
      case 'BGM':
        html = renderBGM(segment, parts);
        break;
      case 'DTM':
        html = renderDTM(segment, parts, dict);
        break;
      case 'NAD':
        html = renderNAD(segment, parts, dict);
        break;
      case 'RFF':
        html = renderRFF(segment, parts, dict);
        break;
      case 'QTY': {
        const { html: qtyHtml, quantity } = renderQTY(segment, parts, dict);
        html = qtyHtml;
        if (quantity) currentProduct.quantity = quantity;
        break;
      }
      case 'LIN': {
        const { html: linHtml, product } = renderLIN(segment, parts);
        html = linHtml;
        currentProduct = product;
        break;
      }
      case 'UNH':
        html = renderUNH(segment, parts, dict);
        break;

      default:
        if (showUnknowns) {
          parseDefault(segment, parts, container);
        }
        shouldAppend = false;
        break;
    }

    if (shouldAppend) {
      el.innerHTML = html;
      container.appendChild(el);
    }

    if (
      currentProduct.lineNumber &&
      currentProduct.ean &&
      currentProduct.quantity
    ) {
      products.push(currentProduct);
      currentProduct = {};
    }
  }

  // Voeg productentabel toe als er iets is
  if (products.length > 0) {
    const table = document.createElement('table');
    table.className = 'product-table';
    table.innerHTML = `
      <caption>Gevonden producten</caption>
      <thead>
        <tr>
          <th>Regel</th>
          <th>EAN-code</th>
          <th>Aantal</th>
          <th>Prijs</th>
        </tr>
      </thead>
      <tbody>
        ${products
          .map(
            (p) => `
          <tr>
            <td>${p.lineNumber}</td>
            <td>${p.ean}</td>
            <td>${p.quantity}</td>
            <td>€${p.price ?? ''}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    `;
    container.appendChild(table);
  }
}
