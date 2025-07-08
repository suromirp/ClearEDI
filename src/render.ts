import { parseSegments } from './segmentParser';
import { getContainer, getTextarea, getToggle } from './ui/elementsUI';
import { renderProductTable } from './ui/renderProducts';

import { renderUNB } from './segmentParsers/unb';
import { renderUNH } from './segmentParsers/unh';
import { renderBGM } from './segmentParsers/bgm';
import { renderDTM } from './segmentParsers/dtm';
import { renderNAD } from './segmentParsers/nad';
import { renderRFF } from './segmentParsers/rff';
import { renderLIN } from './segmentParsers/lin';
import { renderQTY } from './segmentParsers/qty';
import { renderPRI } from './segmentParsers/pri';
import { renderCUX } from './segmentParsers/cux';
import { renderPIA } from './segmentParsers/pia';
import { renderPAC } from './segmentParsers/pac';
import { renderCPS } from './segmentParsers/cps';
import { renderMEA } from './segmentParsers/mea';
import { renderUNS } from './segmentParsers/uns';
import { renderUNT } from './segmentParsers/unt';
import { renderUNZ } from './segmentParsers/unz';
import { renderTAX } from './segmentParsers/tax';
import { renderMOA } from './segmentParsers/moa';
import { renderCNT } from './segmentParsers/cnt';
import { renderPCI } from './segmentParsers/pci';
import { renderGIN } from './segmentParsers/gin';
import { parseDefault } from './segmentParsers/defaultParser';

import { ediDictionary } from './ediDictionary';
import { runValidation } from './runValidation';
import { messageTypeMap } from './validation/messageTypes';

export function render() {
  const textarea = getTextarea();
  const container = getContainer();
  const toggleCheckbox = getToggle();
  const showUnknowns = toggleCheckbox.checked;

  const segments = parseSegments(textarea.value);
  container.innerHTML = '';

  let currentProduct: any = {};
  const products: any[] = [];

  let rawMessageType = '';

  for (const segment of segments) {
    const [tag, ...parts] = segment.split('+');
    const dict = ediDictionary[tag as keyof typeof ediDictionary];

    if (tag === 'LIN') {
      if (
        currentProduct.lineNumber &&
        currentProduct.ean &&
        currentProduct.quantity
      ) {
        products.push(currentProduct);
      }
      currentProduct = {};  // reset for the new line
    }

    if (!dict && !showUnknowns) continue;

    const el = document.createElement('div');
    el.className = 'segment';
    let html = '';
    let shouldAppend = true;

    switch (tag) {
      case 'UNB':
        html = renderUNB(segment, parts);
        break;
      case 'UNH':
        html = renderUNH(segment, parts);
        rawMessageType = parts[1]?.split(':')[0] ?? '';
        break;
      case 'BGM':
        html = renderBGM(segment, parts);
        rawMessageType = rawMessageType || parts[0]?.split(':')[0] || '';
        break;
      case 'DTM':
        html = renderDTM(segment, parts);
        break;
      case 'NAD':
        html = renderNAD(segment, parts);
        break;
      case 'RFF':
        html = renderRFF(segment, parts);
        break;
      case 'LIN': {
        const { html: linHtml, product } = renderLIN(segment, parts);
        html = linHtml;
        currentProduct = product;
        break;
      }
      case 'QTY': {
        const { html: qtyHtml, quantity } = renderQTY(segment, parts);
        html = qtyHtml;
        if (quantity) currentProduct.quantity = quantity;
        break;
      }
      case 'PRI': {
        const { html: priHtml, price } = renderPRI(segment, parts);
        html = priHtml;
        if (price) currentProduct.price = price;
        break;
      }
      case 'CUX':
        html = renderCUX(segment, parts);
        break;
      case 'PIA':
        html = renderPIA(segment, parts);
        break;
      case 'PAC':
        html = renderPAC(segment, parts);
        break;
      case 'CPS':
        html = renderCPS(segment, parts);
        break;
      case 'MEA':
        html = renderMEA(segment, parts);
        break;
      case 'UNS':
        html = renderUNS(segment, parts);
        break;
      case 'UNT':
        html = renderUNT(segment, parts);
        break;
      case 'UNZ':
        html = renderUNZ(segment, parts);
        break;

      case 'TAX':
        html = renderTAX(segment, parts);
        break;

      case 'MOA':
        html = renderMOA(segment, parts);
        break;

      case 'CNT':
        html = renderCNT(segment, parts);
        break;
      case 'GIN':
        html = renderGIN(segment, parts);
        break;
      case 'PCI':
        html = renderPCI(segment, parts);
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
  }

    if (
      currentProduct.lineNumber &&
      currentProduct.ean &&
      currentProduct.quantity
    ) {
      products.push(currentProduct);
    }
  

  //  Validatie bovenaan
  const { valid, missing, type } = runValidation(segments);

  const readableType = messageTypeMap[type ?? ''] ?? type ?? 'Onbekend';
  
  const validationDiv = document.createElement('div');
  validationDiv.className = `validation-box ${valid ? 'success' : 'error'}`;
  validationDiv.innerHTML = `
    <div>
      <p><strong>${valid
        ? `✅ Berichttype ${readableType} is volledig en correct.`
        : `❌ Berichttype ${readableType} bevat fouten of ontbrekende segmenten:`}</strong></p>
      ${!valid ? `<ul>${missing.map(e => `<li>${e}</li>`).join('')}</ul>` : ''}
    </div>
  `;
  container.prepend(validationDiv);  

  //  Productentabel
  renderProductTable(products, container);
}
