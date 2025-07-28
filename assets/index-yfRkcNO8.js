(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();let v,E,F,R;function q(n,e,t,o){v=n,E=e,F=t,R=o}function B(){return v}function H(){return E}function Q(){return F}function L(){return R}function O(){const n=document.createElement("textarea");n.placeholder="Plak hier je EDI-bericht...";const e=document.createElement("div");e.className="error-count";const t=document.createElement("div");t.className="toggle-row";const o=document.createElement("label");o.className="toggle-unknowns";const r=document.createElement("input");r.type="checkbox",r.checked=!1,o.appendChild(r),o.appendChild(document.createTextNode(" Toon onbekende segmenten en codes"));const s=document.createElement("div");s.className="button-row";const i=document.createElement("button");i.className="paste-button",i.textContent="Paste",i.type="button";const a=document.createElement("button");a.className="reset-button",a.textContent="Reset",a.type="button";const l=document.createElement("div");return l.className="edi-output",i.addEventListener("click",async()=>{try{const d=await navigator.clipboard.readText();n.value=d,l.innerHTML="",n.dispatchEvent(new Event("input",{bubbles:!0}))}catch(d){alert("Klembordinhoud kan niet worden geplakt. Geef toestemming of gebruik een veilige browser."),console.error("Clipboard error:",d)}}),a.addEventListener("click",()=>{n.value="",l.innerHTML=""}),document.body.appendChild(e),s.appendChild(i),s.appendChild(a),document.body.appendChild(t),document.body.appendChild(n),document.body.appendChild(s),document.body.appendChild(l),q(n,l,r,e),{textarea:n,toggleCheckbox:r}}function x(n){return n.split(/'/).map(e=>e.trim()).filter(Boolean)}function G(n,e){if(n.length===0)return;const t=["12","182","83"],o=document.createElement("table");o.className="product-table",o.innerHTML=`
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
      ${t.map(r=>{const s=n.filter(i=>i.qtyCode===r);return s.length===0?"":`
          <tr><td colspan="4"><strong>QTY+${r} ${V(r)}</strong></td></tr>
          ${s.map(i=>`
            <tr>
              <td>${i.lineNumber}</td>
              <td>${i.ean}</td>
              <td>${i.quantity}</td>
              <td>${i.price?"€"+i.price:""}</td>
            </tr>
          `).join("")}
        `}).join("")}
      ${n.filter(r=>!t.includes(r.qtyCode||"")).map(r=>`
          <tr>
            <td>${r.lineNumber}</td>
            <td>${r.ean}</td>
            <td>${r.quantity}</td>
            <td>${r.price?"€"+r.price:""}</td>
          </tr>
        `).join("")}
    </tbody>
  `,e.appendChild(o)}function V(n){switch(n){case"12":return"(Accepted)";case"182":return"(Cancelled)";case"83":return"(Backorder)";default:return""}}const c={UNB:{name:"Interchange Header"},UNZ:{name:"Interchange trailer",fields:{UNZ010:"Number of messages",UNZ020:"Interchange control reference"}},UNH:{name:"Message Header"},UNT:{name:"Message Trailer"},BGM:{name:"Beginning of Message",fields:{220:"Order",231:"Purchase order response",351:"Despatch advice",380:"Commercial invoice",381:"Credit note",9:"Original",4:"Change",29:"Accepted without amendment"}},DTM:{name:"Date/Time/Period",fields:{137:"Document/message date/time",2:"Requested delivery date/time",11:"Despatch date and/or time",132:"Arrival date/time, estimated",171:"Order date/time",67:"Confirmed delivery date/time",506:"Backorder delivery date/time",102:"CCYYMMDD (format qualifier)"}},RFF:{name:"Reference",fields:{ON:"Order number",ADE:"Account number",BM:"Bill of lading number",IV:"Invoice number",DQ:"Delivery note number",VA:"VAT registration number"}},NAD:{name:"Name and address",fields:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"},countries:{NL:"Netherlands",DE:"Germany",FR:"France",BE:"Belgium"}},CUX:{name:"Currency Details",fields:{2:"Reference currency",9:"Order currency",4:"Invoicing currency"},currencies:{EUR:"Euro"}},LIN:{name:"Line Item",fields:{2:"Cancelled",5:"Accepted without amendment",6:"Accepted with amendment",EN:"International Article Numbering Association (EAN)"}},PIA:{name:"Additional product ID",fields:{1:"Additional identification",5:"Buyers item number"},codeLists:{SA:"Supplier’s article number",IN:"Buyer’s item number"}},QTY:{name:"Quantity",fields:{21:"Ordered quantity",12:"Confirmed/despatched quantity",47:"Invoiced quantity",182:"Cancelled quantity",83:"Backorder quantity"}},PRI:{name:"Price",fields:{AAA:"Calculation net",AAB:"Calculation gross"}},TAX:{name:"Tax",fields:{7:"Tax",VAT:"Value added tax",S:"Standard rate",Z:"Zero rated goods",E:"Exempt from tax"}},FTX:{name:"Free Text",fields:{AAI:"General information",1:"Text for subsequent use"}},PAT:{name:"Payment Terms",fields:{1:"Basic",5:"Date of invoice",D:"Day"}},PCD:{name:"Percentage Details",fields:{7:"Percentage of invoice",13:"Invoice value"}},ALC:{name:"Allowance/Charge",fields:{A:"Allowance",C:"Charge",FC:"Freight Charge",TD:"Trade Discount"}},IMD:{name:"Item Description",fields:{F:"Free-form",81:"Title"}},MOA:{name:"Monetary Amount",fields:{203:"Line item amount",8:"Charge/Allowance amount"}},TDT:{name:"Details of Transport",fields:{8067:"Transport mode coded",31:"Truck"}},CPS:{name:"Consignment Packing Sequence"},PAC:{name:"Packaging",fields:{52:"Barcoded package"}},MEA:{name:"Measurements",fields:{PD:"Physical dimensions",KGM:"Kilogram"}},HAN:{name:"Handling Instructions"},PCI:{name:"Package Identification",fields:{"33E":"SSCC label"}},GIN:{name:"Goods Identity Number",fields:{BJ:"Batch number"}},UNS:{name:"Section control",fields:{S:"Start of detail section",D:"Start of summary section"}},CNT:{name:"Control total",fields:{2:"Number of line items in message"}}};function X(n){const e=n.slice(0,4),t=n.slice(4,6),o=n.slice(6,8);return new Date(`${e}-${t}-${o}`).toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})}function Y(n,e){try{console.log("renderUNB input:",{segment:n,parts:e}),e=e||[];const[t,o="",r="",s=""]=e,[i,a]=o.split(":"),[l,d]=r.split(":"),[m="",u=""]=s.split(":");let $=m;/^\d{6}$/.test(m)&&($=X("20"+m));const h=u.length===4?`${u.slice(0,2)}:${u.slice(2,4)}`:"",N=[];i||N.push("Sender identification (parts[1])"),l||N.push("Recipient identification (parts[2])"),m||N.push("Interchange date (parts[3])");const A=N.length?`<div>${N.map(T=>`<p class="edi-error">${T} is mandatory</p>`).join("")}</div>`:"";return`
      <h3>UNB – ${c.UNB.name}</h3>
      <code>${n}</code>
      ${A}
      <p><strong>Sender:</strong> ${i||"<em>N/A</em>"}${a?` (${a})`:""}</p>
      <p><strong>Recipient:</strong> ${l||"<em>N/A</em>"}${d?` (${d})`:""}</p>
      <p><strong>Date:</strong> ${$||"<em>N/A</em>"}</p>
      <p><strong>Time:</strong> ${h||"<em>N/A</em>"}</p>
    `}catch(t){return console.error("renderUNB error:",t),`
      <h3>UNB – ${c.UNB.name}</h3>
      <p class="edi-error">Error rendering UNB: ${t.message}</p>
      <code>${n}</code>
    `}}function j(n,e){try{console.log("renderUNH input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",[o="",r="",s="",i=""]=(e[1]??"").split(":"),a=[];t||a.push("Message reference"),o||a.push("Message type"),r||a.push("Version"),s||a.push("Release"),i||a.push("Agency");const l=a.length?a.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"";return`
      <h3>UNH – ${c.UNH.name}</h3>
      <code>${n}</code>
      ${l}
      <p><strong>Message reference:</strong> ${t||"<em>n.v.t.</em>"}</p>
      <p><strong>Type:</strong> ${o||"<em>n.v.t.</em>"}</p>
      <p><strong>Version:</strong> ${r||"<em>n.v.t.</em>"}</p>
      <p><strong>Release:</strong> ${s||"<em>n.v.t.</em>"}</p>
      <p><strong>Agency:</strong> ${i||"<em>n.v.t.</em>"}</p>
    `}catch(t){return console.error("renderUNH error:",t),`
      <h3>UNH – ${c.UNH.name}</h3>
      <p class="edi-error">Error rendering UNH: ${t.message}</p>
      <code>${n}</code>
    `}}function W(n,e){try{console.log("renderBGM input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=e[1]??"",r=e[2]??"",i=(c.BGM.fields??{})[r]||"",a=[];t||a.push("BGM001 Document/message name (C002) is mandatory"),o||a.push("BGM002 Document number is mandatory"),r||a.push("BGM003 Message function code is mandatory");const l=a.length?`<div class="edi-error">${a.map(d=>`<p>${d}</p>`).join("")}</div>`:"";return`
      <h3>BGM – ${c.BGM.name}</h3>
      <code>${n}</code>
      ${l}
      <p><strong>Document code:</strong> ${t||"<em>N/A</em>"}</p>
      <p><strong>Document number:</strong> ${o||"<em>N/A</em>"}</p>
      <p><strong>Message function:</strong> ${r||"<em>N/A</em>"}${i?` (${i})`:""}</p>
    `}catch(t){return console.error("renderBGM error:",t),`
      <div class="edi-error">
        <h3>BGM – ${c.BGM.name}</h3>
        <p>Error rendering BGM: ${t.message}</p>
      </div>
      <code>${n}</code>
    `}}function Z(n,e){try{console.log("renderDTM input:",{segment:n,parts:e}),e=e||[];const[t=""]=e,[o="",r="",s=""]=t.split(":"),a=(c.DTM.fields??{})[o]||"";let l=r;s==="102"&&/^\d{8}$/.test(r)?l=`${r.slice(6,8)}-${r.slice(4,6)}-${r.slice(0,4)}`:s==="203"&&/^\d{10}$/.test(r)&&(l=`${r.slice(6,8)}-${r.slice(4,6)}-${r.slice(0,4)} ${r.slice(8,10)}:00`);const d=[];o||d.push("DTM010 Qualifier"),r||d.push("DTM020 Date/time value");const m=d.length?d.map(u=>`<p class="edi-error">${u} is mandatory</p>`).join(""):"";return`
      <h3>DTM – ${c.DTM.name}</h3>
      <code>${n}</code>
      ${m}
      <p><strong>Qualifier:</strong> ${o||"<em>N/A</em>"}${a?` (${a})`:""}</p>
      <p><strong>Date:</strong> ${l||"<em>N/A</em>"}</p>
      <p><strong>Format code:</strong> ${s||"<em>N/A</em>"}</p>
    `}catch(t){return console.error("renderDTM error:",t),`
      <h3>DTM – ${c.DTM.name}</h3>
      <p class="edi-error">Error rendering DTM: ${t.message}</p>
      <code>${n}</code>
    `}}function K(n,e){try{console.log("renderNAD input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=e[1]??"",r=e[3]??"",s=e[4]??"",i=e[5]??"",a=e[7]??"",l=e[8]??"",m=(c.NAD.fields??{})[t]||"",$=(c.NAD.countries??{})[l]||"",h=[];t||h.push("NAD010 Party qualifier"),o||h.push("NAD020 Party identification");const N=h.length?h.map(A=>`<p class="edi-error">${A} is mandatory</p>`).join(""):"";return`
      <h3>NAD – ${c.NAD.name}</h3>
      <code>${n}</code>
      ${N}
      <p><strong>Function (NAD010):</strong> ${t||"<em>N/A</em>"}${m?` (${m})`:""}</p>
      <p><strong>Identification (NAD020):</strong> ${o||"<em>N/A</em>"}</p>
      <p><strong>Name (NAD040):</strong> ${r||"<em>N/A</em>"}</p>
      <p><strong>Street:</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>City:</strong> ${i||"<em>N/A</em>"}</p>
      <p><strong>Postcode:</strong> ${a||"<em>N/A</em>"}</p>
      <p><strong>Country:</strong> ${l||"<em>N/A</em>"}${$?` (${$})`:""}</p>
    `}catch(t){return console.error("renderNAD error:",t),`
      <h3>NAD – ${c.NAD.name}</h3>
      <p class="edi-error">Error rendering NAD: ${t.message}</p>
      <code>${n}</code>
    `}}function _(n,e){try{console.log("renderRFF input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",[o="",r=""]=t.split(":"),i=(c.RFF.fields??{})[o]||"",a=[];o||a.push("RFF010 Reference qualifier"),r||a.push("RFF020 Reference value");const l=a.length?a.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"";return`
      <h3>RFF – ${c.RFF.name}</h3>
      <code>${n}</code>
      ${l}
      <p>
        <strong>Qualifier (RFF010):</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p>
        <strong>Value (RFF020):</strong>
        ${r||"<em>N/A</em>"}
      </p>
    `}catch(t){return console.error("renderRFF error:",t),`
      <h3>RFF – ${c.RFF.name}</h3>
      <p class="edi-error">Error rendering RFF: ${t.message}</p>
      <code>${n}</code>
    `}}function z(n,e){try{console.log("renderLIN input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=e[2]??"",[r="",s=""]=o.split(":"),i=[];t||i.push("LIN010 Line number"),r||i.push("LIN020 Item identification");const a=i.length?i.map(m=>`<p class="edi-error">${m} is mandatory</p>`).join(""):"";return{html:`
      <h3>LIN – ${c.LIN.name}</h3>
      <code>${n}</code>
      ${a}
      <p><strong>Line number (LIN010):</strong> ${t||"<em>N/A</em>"}</p>
      <p><strong>Item ID type (LIN020-2):</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>Item identification (LIN020-1):</strong> ${r||"<em>N/A</em>"}</p>
    `,product:{lineNumber:t,ean:r,itemIdType:s}}}catch(t){return console.error("renderLIN error:",t),{html:`
        <div class="edi-error">
          <h3>LIN – ${c.LIN.name}</h3>
          <p>Error rendering LIN: ${t.message}</p>
          <code>${n}</code>
        </div>
      `,product:null}}}function J(n,e){try{console.log("renderQTY input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",[o="",r=""]=t.split(":"),i=(c.QTY.fields??{})[o]||"",a=[];o||a.push("QTY010 Quantity qualifier"),r||a.push("QTY020 Quantity value");const l=a.length?a.map(u=>`<p class="edi-error">${u} is mandatory</p>`).join(""):"",d=o&&!i?`<p class="edi-error">Unknown qualifier code: ${o}</p>`:"";return{html:`
      <h3>QTY – ${c.QTY.name}</h3>
      <code>${n}</code>
      ${l}
      ${d}
      <p>
        <strong>Qualifier (QTY010):</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p>
        <strong>Quantity (QTY020):</strong>
        ${r||"<em>N/A</em>"}
      </p>
    `,quantity:r}}catch(t){return console.error("renderQTY error:",t),{html:`
        <h3>QTY – ${c.QTY.name}</h3>
        <p class="edi-error">Error rendering QTY: ${t.message}</p>
        <code>${n}</code>
      `,quantity:""}}}function ee(n,e){try{console.log("renderPRI input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=t.split(":"),[r="",s="",i="",a=""]=t.split(":"),d=(c.PRI.fields??{})[r]||"",m=isNaN(Number(s))?s:Number(s).toFixed(2),u=[];r||u.push("PRI010 Price qualifier"),s||u.push("PRI020 Price amount");const $=u.length?u.map(T=>`<p class="edi-error">${T} is mandatory</p>`).join(""):"",h=r&&!d?`<p class="edi-error">Unknown qualifier code: ${r}</p>`:"";let N="";return(o.length!==4||r!=="AAA"||i!=="CT"||a!=="NTP")&&(N=`<p class="edi-error">PRI must follow format: PRI+AAA:&lt;amount&gt;:CT:NTP'</p>`),{html:`
      <h3>PRI – ${c.PRI.name}</h3>
      <code>${n}</code>
      ${$}
      ${h}
      ${N}
      <p><strong>Qualifier (PRI010):</strong> ${r||"<em>N/A</em>"}${d?` (${d})`:""}</p>
      <p><strong>Amount (PRI020):</strong> ${m||"<em>N/A</em>"}</p>
    `,price:m}}catch(t){return console.error("renderPRI error:",t),{html:`
        <h3>PRI – ${c.PRI.name}</h3>
        <p class="edi-error">Error rendering PRI: ${t.message}</p>
        <code>${n}</code>
      `,price:""}}}function ne(n,e){var t;try{console.log("renderCUX input:",{segment:n,parts:e}),e=e||[];let o="",r="",s="";e.length===1&&e[0].includes(":")?[o,r,s]=e[0].split(":"):(o=e[0]??"",[r,s]=((t=e[1])==null?void 0:t.split(":"))??["",""]);const i=c.CUX.fields||{},a=c.CUX.currencies||{},l=i[o]||"",d=a[r]||"",m=[];o||m.push("Currency qualifier"),r||m.push("Currency code"),s||m.push("Currency type");const u=m.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${m.join(", ")}</p>`:"",$=o&&!l?`<p style="color:red"><strong>Unknown qualifier code:</strong> ${o}</p>`:"",h=r&&!d?`<p style="color:red"><strong>Unknown currency code:</strong> ${r}</p>`:"";return`
      <h3>${c.CUX.name}</h3>
      <code>${n}</code>
      ${u}
      ${$}
      ${h}
      <p>
        <strong>Qualifier:</strong>
        ${o||"<em>N/A</em>"}
        ${l?` (${l})`:""}
      </p>
      <p>
        <strong>Currency:</strong>
        ${r||"<em>N/A</em>"}
        ${d?` (${d})`:""}
      </p>
      <p><strong>Type:</strong> ${s||"<em>N/A</em>"}</p>
    `}catch(o){return console.error("renderCUX error:",o),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.CUX.name}</h3>
        <p style="color:red"><strong>Error rendering CUX:</strong> ${o.message}</p>
        <code>${n}</code>
      </div>
    `}}function te(n,e){var t;try{console.log("renderPIA input:",{segment:n,parts:e}),e=e||[];const o=e[0]??"",[r="",s=""]=((t=e[1])==null?void 0:t.split(":"))??[],i=c.PIA.fields??{},a=c.PIA.codeLists??{},l=i[o]||"",d=a[s]||"",m=[];o||m.push("PIA010 function qualifier"),r||m.push("PIA020 item identification");const u=m.length?m.map(N=>`<p class="edi-error">${N} is mandatory</p>`).join(""):"",$=o&&!l?`<p class="edi-error">Unknown PIA010 qualifier: ${o}</p>`:"",h=s&&!d?`<p class="edi-error">Unknown PIA020 code list qualifier: ${s}</p>`:"";return`
      <h3>PIA – ${c.PIA.name}</h3>
      <code>${n}</code>
      ${u}
      ${$}
      ${h}
      <p>
        <strong>Function (PIA010):</strong>
        ${o||"<em>N/A</em>"}
        ${l?` (${l})`:""}
      </p>
      <p>
        <strong>Item identification (PIA020-1):</strong>
        ${r||"<em>N/A</em>"}
      </p>
      <p>
        <strong>Code list qualifier (PIA020-3):</strong>
        ${s||"<em>N/A</em>"}
        ${d?` (${d})`:""}
      </p>
    `}catch(o){return console.error("renderPIA error:",o),`
      <h3>PIA – ${c.PIA.name}</h3>
      <p class="edi-error">Error rendering PIA: ${o.message}</p>
      <code>${n}</code>
    `}}function re(n,e){try{console.log("renderPAC input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",r=(e[1]??"").split(":")[1]??"",s=e[2]??"",i=c.PAC.fields??{},a=i[r]||"",l=i[s]||"",d=[];t||d.push("PAC010 Number of packages is mandatory"),r||d.push("PAC020 Packaging details code is mandatory"),s||d.push("PAC030 Package type code is mandatory");const m=d.length?d.map(u=>`<p class="edi-error">${u}</p>`).join(""):"";return`
      <h3>PAC – ${c.PAC.name}</h3>
      <code>${n}</code>
      ${m}
      <p><strong>Number of packages (PAC010):</strong> ${t||"<em>N/A</em>"}</p>
      <p>
       <strong>Packaging details code (PAC020):</strong>
      ${r||"<em>N/A</em>"}
       ${a?` (${a})`:""}
      </p>
      <p>
        <strong>Package type code (PAC030):</strong>
        ${s||"<em>N/A</em>"}
        ${l?` (${l})`:""}
      </p>
    `}catch(t){return console.error("renderPAC error:",t),`
      <h3>PAC – ${c.PAC.name}</h3>
      <p class="edi-error">Error rendering PAC: ${t.message}</p>
      <code>${n}</code>
    `}}function oe(n,e){try{console.log("renderCPS input:",{segment:n,parts:e}),e=e||[];const[t="",o=""]=e,r=[];t||r.push("CPS010 Hierarchical id");const s=r.length?r.map(i=>`<p class="edi-error">${i} is mandatory</p>`).join(""):"";return`
      <h3>CPS – ${c.CPS.name}</h3>
      <code>${n}</code>
      ${s}
      <p><strong>Hierarchical id (CPS010):</strong> ${t||"<em>n.v.t.</em>"}</p>
      <p><strong>Parent hierarchical id (CPS020):</strong> ${o||"<em>—</em>"}</p>
    `}catch(t){return console.error("renderCPS error:",t),`
      <h3>CPS – ${c.CPS.name}</h3>
      <p class="edi-error">Error rendering CPS: ${t.message}</p>
      <code>${n}</code>
    `}}function se(n,e){try{console.log("renderMEA input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=(e[2]??"").split(":"),r=o[0]??"",s=o[1]??"",i=o[2]??"",a=c.MEA.fields??{},l=a[t]||"",d=a[r]||"",m=[];t||m.push("MEA010 Measurement purpose"),s||m.push("MEA020 Measurement value");const u=m.length?m.map($=>`<p class="edi-error">${$} is mandatory</p>`).join(""):"";return`
      <h3>MEA – ${c.MEA.name}</h3>
      <code>${n}</code>
      ${u}
      <p><strong>Purpose (MEA010):</strong> ${t||"<em>N/A</em>"}${l?` (${l})`:""}</p>
      <p><strong>Qualifier (MEA020-1):</strong> ${r||"<em>N/A</em>"}${d?` (${d})`:""}</p>
      <p><strong>Value (MEA020-2):</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>Unit (MEA020-3):</strong> ${i||"<em>N/A</em>"}</p>
    `}catch(t){return console.error("renderMEA error:",t),`
      <h3>MEA – ${c.MEA.name}</h3>
      <p class="edi-error">Error rendering MEA: ${t.message}</p>
      <code>${n}</code>
    `}}function ie(n,e){try{console.log("renderUNS input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",r=(c.UNS.fields??{})[t]||"",s=[];t||s.push("UNS010 Section identification");const i=s.length?s.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"",a=t&&!r?`<p class="edi-error">Unknown section identification code: ${t}</p>`:"";return`
      <h3>UNS – ${c.UNS.name}</h3>
      <code>${n}</code>
      ${i}
      ${a}
      <p>
        <strong>Section identification (UNS010):</strong>
        ${t||"<em>N/A</em>"}
        ${r?` (${r})`:""}
      </p>
    `}catch(t){return console.error("renderUNS error:",t),`
      <h3>UNS – ${c.UNS.name}</h3>
      <p class="edi-error">Error rendering UNS: ${t.message}</p>
      <code>${n}</code>
    `}}function ae(n,e){try{console.log("renderUNT input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=e[1]??"",r=[];t||r.push("UNT010 Number of segments"),o||r.push("UNT020 Message reference number");const s=r.length?r.map(i=>`<p class="edi-error">${i} is mandatory</p>`).join(""):"";return`
      <h3>UNT – ${c.UNT.name}</h3>
      <code>${n}</code>
      ${s}
      <p><strong>Number of segments (UNT010):</strong> ${t||"<em>N/A</em>"}</p>
      <p><strong>Message reference number (UNT020):</strong> ${o||"<em>N/A</em>"}</p>
    `}catch(t){return console.error("renderUNT error:",t),`
      <h3>UNT – ${c.UNT.name}</h3>
      <p class="edi-error">Error rendering UNT: ${t.message}</p>
      <code>${n}</code>
    `}}function ce(n,e){try{console.log("renderUNZ input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=e[1]??"",r=[];t||r.push("Number of messages"),o||r.push("Interchange control reference");const s=r.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${r.join(", ")}</p>`:"",i=t&&!/^\d+$/.test(t)?`<p style="color:red"><strong>Invalid message count (not a number):</strong> ${t}</p>`:"";return`
      <h3>UNZ - ${c.UNZ.name}</h3>
      <code>${n}</code>
      ${s}
      ${i}
      <p>
        <strong>Number of messages:</strong>
        ${t||"<em>N/A</em>"}
      </p>
      <p>
        <strong>Interchange control reference:</strong>
        ${o||"<em>N/A</em>"}
      </p>
    `}catch(t){return console.error("renderUNZ error:",t),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.UNZ.name}</h3>
        <p style="color:red"><strong>Error rendering UNZ:</strong> ${t.message}</p>
        <code>${n}</code>
      </div>
    `}}function de(n,e){try{console.log("renderTAX input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=e[1]??"",s=(e[4]??"").split(":")[3]??"",i=c.TAX.fields??{},a=i[t]||"",l=i[o]||"",d=[];t||d.push("TAX010 Duty/tax/fee function qualifier"),o||d.push("TAX020 Duty/tax/fee type, coded"),s||d.push("TAX050 Duty/tax/fee rate");const m=d.length?d.map(u=>`<p class="edi-error">${u} is mandatory</p>`).join(""):"";return`
      <h3>TAX – ${c.TAX.name}</h3>
      <code>${n}</code>
      ${m}
      <p>
        <strong>Duty/tax/fee function qualifier (TAX010):</strong>
        ${t||"<em>N/A</em>"}
        ${a?` (${a})`:""}
      </p>
      <p>
        <strong>Duty/tax/fee type (TAX020):</strong>
        ${o||"<em>N/A</em>"}
        ${l?` (${l})`:""}
      </p>
      <p>
        <strong>Duty/tax/fee rate (TAX050):</strong>
        ${s||"<em>N/A</em>"}
      </p>
    `}catch(t){return console.error("renderTAX error:",t),`
      <h3>TAX – ${c.TAX.name}</h3>
      <p class="edi-error">Error rendering TAX: ${t.message}</p>
      <code>${n}</code>
    `}}function le(n,e){try{console.log("renderMOA input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",[o="",r=""]=t.split(":"),i=(c.MOA.fields??{})[o]||"",a=[];o||a.push("Amount qualifier"),r||a.push("Amount value");const l=a.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${a.join(", ")}</p>`:"",d=o&&!i?`<p style="color:red"><strong>Unknown qualifier code:</strong> ${o}</p>`:"";return`
      <h3>${c.MOA.name}</h3>
      <code>${n}</code>
      ${l}
      ${d}
      <p>
        <strong>Qualifier:</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p><strong>Amount:</strong> €${r||"<em>N/A</em>"}</p>
    `}catch(t){return console.error("renderMOA error:",t),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.MOA.name}</h3>
        <p style="color:red"><strong>Error rendering MOA:</strong> ${t.message}</p>
        <code>${n}</code>
      </div>
    `}}function me(n,e){try{console.log("renderCNT input:",{segment:n,parts:e}),e=e||[];const[t="",o=""]=(e[0]??"").split(":"),s=(c.CNT.fields??{})[t]||"",i=[];t||i.push("CNT010 Control qualifier"),o||i.push("CNT020 Control value");const a=i.length?i.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"",l=t&&!s?`<p class="edi-error">Unknown qualifier code: ${t}</p>`:"";return`
      <h3>CNT – ${c.CNT.name}</h3>
      <code>${n}</code>
      ${a}
      ${l}
      <p>
        <strong>Qualifier (CNT010):</strong>
        ${t||"<em>N/A</em>"}
        ${s?` (${s})`:""}
      </p>
      <p><strong>Count (CNT020):</strong> ${o||"<em>N/A</em>"}</p>
    `}catch(t){return console.error("renderCNT error:",t),`
      <h3>CNT – ${c.CNT.name}</h3>
      <p class="edi-error">Error rendering CNT: ${t.message}</p>
      <code>${n}</code>
    `}}function ue(n,e){try{console.log("renderPCI input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",[o="",r=""]=t.split(":"),i=(c.PCI.fields??{})[o]||"",a=[];o||a.push("PCI010 Identification qualifier"),r||a.push("PCI020 Identification number");const l=a.length?a.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"";return`
      <h3>PCI – ${c.PCI.name}</h3>
      <code>${n}</code>
      ${l}
      <p>
        <strong>Qualifier (PCI010):</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p><strong>Identification (PCI020):</strong> ${r||"<em>N/A</em>"}</p>
    `}catch(t){return console.error("renderPCI error:",t),`
      <h3>PCI – ${c.PCI.name}</h3>
      <p class="edi-error">Error rendering PCI: ${t.message}</p>
      <code>${n}</code>
    `}}function pe(n,e){try{console.log("renderGIN input:",{segment:n,parts:e}),e=e||[];const t=e[0]??"",o=e.slice(1).filter(m=>!!m),i=(c.GIN.fields??{})[t]||"",a=[];t||a.push("GIN010 Identity qualifier"),o.length===0&&a.push("GIN020 Identity number");const l=a.length?a.map(m=>`<p class="edi-error">${m} is mandatory</p>`).join(""):"",d=t&&!i?`<p class="edi-error">Unknown qualifier code: ${t}</p>`:"";return`
      <h3>GIN – ${c.GIN.name}</h3>
      <code>${n}</code>
      ${l}
      ${d}
      <p>
        <strong>Qualifier (GIN010):</strong>
        ${t||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p>
        <strong>Identity number${o.length>1?"s":""} (GIN020):</strong>
        ${o.length?o.join(", "):"<em>N/A</em>"}
      </p>
    `}catch(t){return console.error("renderGIN error:",t),`
      <h3>GIN – ${c.GIN.name}</h3>
      <p class="edi-error">Error rendering GIN: ${t.message}</p>
      <code>${n}</code>
    `}}function ge(n,e,t){var i;const o=n.split("+")[0],r=(i=c[o])==null?void 0:i.name,s=document.createElement("div");s.className="segment",s.innerHTML=`
    <h3>⚠️ ${r?`${o} – ${r}`:`Unknown segment (${o})`}</h3>
    <code>${n}</code>
    <p>${r?"No renderer implemented yet, but the segment name is known":"This segment is not recognized or supported yet."}</p>
  `,t.appendChild(s)}const fe={ORDERS:{BGM:{220:"Order"},QTY:{21:"Ordered quantity"},DTM:{137:"Document/message date/time",2:"Requested delivery date/time"},RFF:{ADE:"Account number",VA:"VAT registration number"},CUX:{2:"Reference currency",9:"Order currency"},LIN:{EN:"International Article Numbering Association (EAN)",2:"Cancelled",5:"Accepted without amendment",6:"Accepted with amendment"},PRI:{AAA:"Calculation net (the price stated is the net price including allowances/charges)"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"}},ORDRSP:{BGM:{231:"Purchase order response",9:"original",4:"Change",29:"Accepted without amendment"},QTY:{12:"Confirmed quantity",182:"Cancelled quantity",83:"Backorder quantity"},DTM:{137:"Document/message date/time",171:"Order date/time",67:"Confirmed delivery date/time",506:"Backorder delivery date/time"},RFF:{ON:"Order number"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party"}},DESADV:{BGM:{351:"Despatch advice"},QTY:{12:"Confirmed quantity",182:"Cancelled quantity",83:"Backorder quantity"},DTM:{137:"Document/message date/time",11:"Despatch date and/or time, actual",132:"Arrival date/time, estimated",361:"Best before date"},RFF:{BM:"Bill of loading number",ON:"Order number (purchase)"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",CA:"Carrier"},CPS:{},PAC:{52:"Packaging details code"},PCI:{"33E":"SSCC label"},GIN:{BN:"Serial number",BX:"Batch number"},PIA:{5:"Additional product identification",SA:"Supplier's article number"},LIN:{EN:"International Article Numbering Association (EAN)"},PRI:{AAA:"Calculation net"}},INVOIC:{BGM:{380:"Commercial invoice",381:"Credit note"},QTY:{47:"Invoiced quantity"},MOA:{203:"Line item amount",8:"Charge/Allowance amount"},PRI:{AAA:"Calculation net",AAB:"Calculation gross",CT:"Contract"},RFF:{ON:"Order number"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"}}},$e=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"DTM",condition:n=>n.some(e=>e.includes("DTM+2:"))},{segment:"NAD",mandatory:!0},{segment:"CUX",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"PRI",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function D(n,e){const t=n.map(r=>r.split("+")[0]),o=[];for(const r of e)(r.mandatory||(r.condition?r.condition(n):!1))&&!t.includes(r.segment)&&o.push(r.segment);return{valid:o.length===0,missing:o}}function he(n){const e=D(n,$e);return e.valid||console.warn("ORDERS validation failed. Missing segments:",e.missing),e}const Ne=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"CUX",mandatory:!0,condition:n=>n.includes("CUX+2:EUR:9")},{segment:"RFF",mandatory:!0},{segment:"NAD",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",condition:n=>n.some(e=>e.startsWith("LIN+5"))},{segment:"QTY",condition:n=>n.some(e=>e.startsWith("LIN+6"))},{segment:"QTY",condition:n=>n.some(e=>e.startsWith("LIN+2"))},{segment:"DTM",condition:n=>n.some(e=>e.startsWith("LIN+5"))&&n.some(e=>e.startsWith("DTM+67:"))},{segment:"DTM",condition:n=>n.some(e=>e.startsWith("LIN+6"))&&n.some(e=>e.startsWith("DTM+506:"))},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function ye(n){const e=D(n,Ne);return n.filter(o=>o.startsWith("LIN+")).length<1&&(e.valid=!1,e.missing.push("Minimaal 1 LIN-segment vereist")),e}const Ae=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0,condition:n=>n.some(e=>e.startsWith("DTM+137:"))},{segment:"DTM",mandatory:!0,condition:n=>n.some(e=>e.startsWith("DTM+132:"))},{segment:"DTM",condition:n=>n.some(e=>e.startsWith("DTM+11:"))},{segment:"RFF",mandatory:!0,condition:n=>n.some(e=>e.startsWith("RFF+ON:"))},{segment:"NAD",mandatory:!0},{segment:"CPS",mandatory:!0},{segment:"PAC",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"UNS",mandatory:!1},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function Ce(n){const e=D(n,Ae);return e.valid||console.warn("DESADV validation failed. Missing segments:",e.missing),e}const Te=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"DTM",condition:n=>n.some(e=>e.startsWith("DTM+171:"))},{segment:"RFF",mandatory:!0},{segment:"RFF",condition:n=>n.some(e=>e.startsWith("RFF+DQ:"))},{segment:"NAD",mandatory:!0},{segment:"CUX",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"PIA",mandatory:!0},{segment:"IMD",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"MOA",mandatory:!0},{segment:"PRI",mandatory:!0},{segment:"TAX",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"MOA",mandatory:!0},{segment:"TAX",mandatory:!0},{segment:"UNT",mandatory:!0}];function Ie(n){const e=D(n,Te);return e.valid||console.warn("INVOIC validation failed. Missing segments:",e.missing),e}const k={220:"ORDERS",231:"ORDRSP",351:"INVOIC",DESADV:"DESADV"};function De(n){var s;const e=n.find(i=>i.startsWith("UNH+"));if(!e)return null;const o=(s=e.split("+")[2])==null?void 0:s.split(":"),r=o==null?void 0:o[0];return k[r??""]??r??null}function Pe(n){const e=De(n);if(!e)return{valid:!1,missing:["⚠️ Kan berichttype niet detecteren"],type:null};let t;switch(e){case"ORDERS":t=he(n);break;case"ORDRSP":t=ye(n);break;case"DESADV":t=Ce(n);break;case"INVOIC":t=Ie(n);break;default:return{valid:!1,missing:["⚠️ Onbekend berichttype"],type:e}}return{valid:t.valid,missing:t.missing,type:e}}function M(){var N,A,T,w;const n=B(),e=H(),o=Q().checked,r=x(n.value);e.innerHTML="";let s={};const i=[];let a="";for(const p of r){const[I,...g]=p.split("+"),S=c[I];if(I==="LIN"&&(s.lineNumber&&s.ean&&s.quantity&&i.push(s),s={}),!S&&!o)continue;const P=document.createElement("div");P.className="segment";let f="",U=!0;switch(I){case"UNB":f=Y(p,g);break;case"UNH":f=j(p,g),a=((N=g[1])==null?void 0:N.split(":")[0])??"";break;case"BGM":f=W(p,g),a=(a||((A=g[0])==null?void 0:A.split(":")[0]))??"";break;case"DTM":f=Z(p,g);break;case"NAD":f=K(p,g);break;case"RFF":f=_(p,g);break;case"LIN":{const{html:y,product:C}=z(p,g);f=y,s=C;break}case"QTY":{const{html:y,quantity:C}=J(p,g);f=y,C&&(s.quantity=C);break}case"PRI":{const{html:y,price:C}=ee(p,g);f=y,C&&(s.price=C);break}case"CUX":f=ne(p,g);break;case"PIA":f=te(p,g);break;case"PAC":f=re(p,g);break;case"CPS":f=oe(p,g);break;case"MEA":f=se(p,g);break;case"UNS":f=ie(p,g);break;case"UNT":f=ae(p,g);break;case"UNZ":f=ce(p,g);break;case"TAX":f=de(p,g);break;case"MOA":f=le(p,g);break;case"CNT":f=me(p,g);break;case"PCI":f=ue(p,g);break;case"GIN":f=pe(p,g);break;default:o&&ge(p,g,e),U=!1;break}const b=(T=fe[a])==null?void 0:T[I];if(b){const y=((w=g[0])==null?void 0:w.split(":")[0])??"";b.hasOwnProperty(y)||(f=`<p class="edi-error">
          Unknown ${I} qualifier: "${y}"<br/>
          allowed: ${Object.keys(b).join(", ")}
        </p>`+f)}U&&(P.innerHTML=f,e.appendChild(P))}s.lineNumber&&s.ean&&s.quantity&&i.push(s);const{valid:l,missing:d,type:m}=Pe(r),u=k[m??""]??m??"Unknown",$=L();d.length>0?$.textContent=`❌ ${d.length} contains all required segments ${u}`:$.textContent=`✅ No errors found ${u}`;const h=document.createElement("div");h.className=`validation-box ${l?"success":"error"}`,h.innerHTML=`
    <div>
      <p><strong>${l?`✅ Message type ${u} has all segments`:`❌ Message type ${u} has errors or missing segments:`}</strong></p>
      ${l?"":`<ul>${d.map(p=>`<li>${p}</li>`).join("")}</ul>`}
    </div>
  `,e.prepend(h),G(i,e)}const{textarea:be,toggleCheckbox:Me}=O();be.addEventListener("input",M);Me.addEventListener("change",M);M();
