import './sass/main.scss';
import { parseSegments } from './segmentParser';
import { ediDictionary } from './ediDictionary';

// === UI-elementen ===
const toggleWrapper = document.createElement('label');
toggleWrapper.className = 'toggle-unknowns';

const toggleCheckbox = document.createElement('input');
toggleCheckbox.type = 'checkbox';
toggleCheckbox.checked = false;

toggleWrapper.appendChild(toggleCheckbox);
toggleWrapper.appendChild(document.createTextNode(' Toon onbekende segmenten en codes'));

const textarea = document.createElement('textarea');
textarea.placeholder = 'Plak hier je EDI-bericht...';

const container = document.createElement('div');
container.className = 'edi-output';

document.body.appendChild(toggleWrapper);
document.body.appendChild(textarea);
document.body.appendChild(container);

type Product = {
  lineNumber: string;
  ean: string;
  quantity: string;
  price: string;
};

function formatDate(yyyymmdd: string): string {
  const y = yyyymmdd.slice(0, 4);
  const m = yyyymmdd.slice(4, 6);
  const d = yyyymmdd.slice(6, 8);
  const date = new Date(`${y}-${m}-${d}`);
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function render() {
  const segments = parseSegments(textarea.value);
  container.innerHTML = '';
  const showUnknowns = toggleCheckbox.checked;

  const products: Product[] = [];
  let berichtdatum: string | null = null;
  let messageType: string | null = null;
  let currentProduct: Partial<Product> = {};

  for (const segment of segments) {
    const [tag, ...parts] = segment.split('+');
    if (tag === 'UNH') {
      messageType = parts[1]?.split(':')[0];
      break;
    }
  }

  segments.forEach(segment => {
    const [tag, ...parts] = segment.split('+');
    const dict = ediDictionary[tag];
    const isUnknownSegment = !dict;
    if (isUnknownSegment && !showUnknowns) return;

    const el = document.createElement('div');
    el.className = 'segment';

    const lines: string[] = [];

    if (tag === 'BGM') {
      const el = document.createElement('div');
      el.className = 'segment';
    
      const lines: string[] = [];
      lines.push(`<h3>${tag} – Berichtinformatie</h3>`);
      lines.push(`<code>${segment}</code>`);
    
      const [typeCode, docNumber, functionCode] = parts;
    
      // Type uitleg
      const typeDescription = {
        '220': 'Bestelling',
        '231': 'Orderbevestiging',
      }[typeCode] ?? '⚠️ onbekend';
    
      // Functie uitleg
      const functionDescription = {
        '9': 'Origineel bericht',
        '4': 'Wijziging (Change)',
        '29': 'Geaccepteerd zonder wijziging',
      }[functionCode] ?? '⚠️ onbekend';
    
      // Regels toevoegen
      lines.push(`<p>🛈 Veld 1.1: <strong>${typeCode}</strong> = ${typeDescription}</p>`);
      lines.push(`<p>🛈 Veld 2.1: <strong>${docNumber}</strong> = Berichtnummer</p>`);
      lines.push(`<p>🛈 Veld 3.1: <strong>${functionCode}</strong> = ${functionDescription}</p>`);
    
      el.innerHTML = lines.join('');
      container.appendChild(el);
      return;
    }
    
    // Speciale parsing per segmenttype
    if (tag === 'UNB') {
      lines.push(`<h3>${tag} – Interchange header</h3>`);
      lines.push(`<code>${segment}</code>`);
      lines.push(`<p>🛈 Syntax: <strong>${parts[0].split(':')[0]}</strong></p>`);
      lines.push(`<p>🛈 Versie: <strong>${parts[0].split(':')[1]}</strong></p>`);
      lines.push(`<p>🛈 Verzender: <strong>${parts[1].split(':')[0]}</strong> (GLN)</p>`);
      lines.push(`<p>🛈 Ontvanger: <strong>${parts[2].split(':')[0]}</strong> (GLN)</p>`);
      lines.push(`<p>🛈 Verzenddatum: <strong>${formatDate('20' + parts[3].split(':')[0])}</strong></p>`);
      lines.push(`<p>🛈 Verzendtijd: <strong>${parts[3].split(':')[1]}</strong></p>`);
      if (parts[6] === '1') lines.push(`<p>🛈 Type: <strong>Testbericht</strong></p>`);
      el.innerHTML = lines.join('');
      container.appendChild(el);
      return;
    }

    if (tag === 'QTY') {
      const el = document.createElement('div');
      el.className = 'segment';
    
      const lines: string[] = [];
      lines.push(`<h3>${tag} – Aantal (QTY)</h3>`);
      lines.push(`<code>${segment}</code>`);
    
      const [code, value] = parts[0]?.split(':') ?? [];
    
      const codeExplanation = ediDictionary['QTY']?.fields?.[code] ?? '⚠️ onbekend';
    
      lines.push(`<p>🛈 Veld 1.1: <strong>${code}</strong> = ${codeExplanation}</p>`);
      if (value) {
        lines.push(`<p>🛈 Veld 1.2: <strong>${value}</strong> = Aantal</p>`);
        currentProduct.quantity = value;
      }
    
      el.innerHTML = lines.join('');
      container.appendChild(el);
      return;
    }

    if (tag === 'UNH') {
      const [ref] = parts;
      const [type, versie, release, agency, assocCode] = parts[1]?.split(':') ?? [];
      lines.push(`<h3>${tag} – Berichtkop</h3>`);
      lines.push(`<code>${segment}</code>`);
      lines.push(`<p>🛈 Referentie: <strong>${ref}</strong></p>`);
      lines.push(`<p>🛈 Berichttype: <strong>${type}</strong> (${ediDictionary['UNH']?.fields?.[type] ?? 'onbekend'})</p>`);
      lines.push(`<p>🛈 Versie: <strong>${versie}</strong></p>`);
      lines.push(`<p>🛈 Release: <strong>${release}</strong></p>`);
      lines.push(`<p>🛈 Agency: <strong>${agency}</strong></p>`);
      lines.push(`<p>🛈 Association code: <strong>${assocCode}</strong></p>`);
      el.innerHTML = lines.join('');
      container.appendChild(el);
      return;
    }

    if (tag === 'DTM') {
      const [code, value, format] = parts[0]?.split(':') ?? [];
      const codeExplanation = ediDictionary['DTM']?.fields?.[code] ?? '⚠️ onbekend';
      const formatExplanation = format === '102' ? 'Datumformaat (CCYYMMDD)' : '⚠️ onbekend';
      lines.push(`<h3>${tag} – Datum/tijd (DTM)</h3>`);
      lines.push(`<code>${segment}</code>`);
      lines.push(`<p>🛈 Veld 1.1: <strong>${code}</strong> = ${codeExplanation}</p>`);
      if (value?.length === 8 && /^\d{8}$/.test(value)) {
        lines.push(`<p>🛈 Veld 1.2: ${formatDate(value)}</p>`);
      }
      lines.push(`<p>🛈 Veld 1.3: <strong>${format}</strong> = ${formatExplanation}</p>`);
      el.innerHTML = lines.join('');
      container.appendChild(el);
      return;
    }

    if (tag === 'NAD') {
      const rol = parts[0];
      const partijId = parts[1]?.split(':')[0] ?? '';
      const naam = parts[2]?.trim();
      const straat = parts[3]?.trim();
      const plaats = parts[4]?.trim();
      const postcode = parts[5]?.trim();
      const land = parts[6]?.trim();
      const rolUitleg = ediDictionary['NAD']?.fields?.[rol] ?? 'Onbekende partij';
      lines.push(`<h3>${tag} – ${rolUitleg}</h3>`);
      lines.push(`<code>${segment}</code>`);
      lines.push(`<p>🛈 Rolcode: <strong>${rol}</strong> (${rolUitleg})</p>`);
      if (partijId) lines.push(`<p>🛈 Partij ID: <strong>${partijId}</strong></p>`);
      if (naam) lines.push(`<p>🛈 Naam: <strong>${naam}</strong></p>`);
      if (straat) lines.push(`<p>🛈 Adres: <strong>${straat}</strong></p>`);
      if (postcode || plaats) lines.push(`<p>🛈 Postcode & Plaats: <strong>${[postcode, plaats].filter(Boolean).join(' ')}</strong></p>`);
      if (land) lines.push(`<p>🛈 Land: <strong>${land}</strong></p>`);
      el.innerHTML = lines.join('');
      container.appendChild(el);
      return;
    }

    if (tag === 'RFF') {
      const [qualifier, value] = parts[0]?.split(':') ?? [];
      const uitleg = ediDictionary['RFF']?.fields?.[qualifier] ?? '⚠️ onbekend';
      lines.push(`<h3>${tag} – Referentie (RFF)</h3>`);
      lines.push(`<code>${segment}</code>`);
      lines.push(`<p>🛈 Veld 1.1: <strong>${qualifier}</strong> = ${uitleg}</p>`);
      if (value) lines.push(`<p>🛈 Veld 1.2: <strong>${value}</strong></p>`);
      el.innerHTML = lines.join('');
      container.appendChild(el);
      return;
    }

    if (tag === 'LIN') {
      const el = document.createElement('div');
      el.className = 'segment';
    
      const lineNumber = parts[0] ?? '';
      const ean = parts[2]?.split(':')[0] ?? '';
      const codeSystem = parts[2]?.split(':')[1] ?? '';
    
      el.innerHTML = `
        <h3>LIN – Artikelregel (LIN)</h3>
        <code>${segment}</code>
        <p>🛈 Artikelregelnummer: <strong>${lineNumber}</strong></p>
        <p>🛈 EAN-code: <strong>${ean}</strong></p>
        <p>🛈 Code-systeem: <strong>${codeSystem}</strong> (meestal 'EN' = Europees Artikelnummer)</p>
      `;
    
      container.appendChild(el);
    
      currentProduct = {
        lineNumber,
        ean,
        quantity: '',
        price: '',
      };
      return;
    }
    

    lines.push(`<h3>${tag} – ${dict?.label ?? '⚠️ Onbekend segment'}</h3>`);
    lines.push(`<code>${segment}</code>`);
    parts.forEach((part, i) => {
      const subparts = part.split(':');
      subparts.forEach((code, j) => {
        const explanation = dict?.fields?.[code];
        const showEvenIfNoExplanation = (tag === 'BGM' && i === 1 && j === 0);
        const isUnknownField = !explanation && !showEvenIfNoExplanation;
        if (isUnknownField && !showUnknowns) return;
        if (showEvenIfNoExplanation) {
          lines.push(`<p class="field-explanation">🛈 Veld ${i + 1}.${j + 1}: <strong>${code}</strong> (ordernummer)</p>`);
        } else {
          lines.push(`<p class="field-explanation">🛈 Veld ${i + 1}.${j + 1}: <strong>${code}</strong> = ${explanation ?? '⚠️ onbekend'}</p>`);
        }
      });
    });
    el.innerHTML = lines.join('');
    container.appendChild(el);
  });

  if (berichtdatum) {
    const dateBox = document.createElement('div');
    dateBox.className = 'segment';
    dateBox.innerHTML = `<h3>📅 Berichtdatum</h3><p>${berichtdatum}</p>`;
    container.prepend(dateBox);
  }

  if (messageType) {
    const typeBox = document.createElement('div');
    typeBox.className = 'segment';
    typeBox.innerHTML = `<h3>📦 Berichttype</h3><p>${messageType}</p>`;
    container.prepend(typeBox);
  }

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
        ${products.map(p => `
          <tr>
            <td>${p.lineNumber}</td>
            <td>${p.ean}</td>
            <td>${p.quantity}</td>
            <td>€${p.price}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    container.appendChild(table);
  }
}

textarea.addEventListener('input', render);
toggleCheckbox.addEventListener('change', render);
