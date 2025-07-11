(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();let v,E,F,R;function q(n,e,r,o){v=n,E=e,F=r,R=o}function B(){return v}function Q(){return E}function H(){return F}function L(){return R}function O(){const n=document.createElement("textarea");n.placeholder="Plak hier je EDI-bericht...";const e=document.createElement("div");e.className="error-count";const r=document.createElement("div");r.className="toggle-row";const o=document.createElement("label");o.className="toggle-unknowns";const t=document.createElement("input");t.type="checkbox",t.checked=!1,o.appendChild(t),o.appendChild(document.createTextNode(" Toon onbekende segmenten en codes"));const s=document.createElement("div");s.className="button-row";const i=document.createElement("button");i.className="paste-button",i.textContent="Paste",i.type="button";const a=document.createElement("button");a.className="reset-button",a.textContent="Reset",a.type="button";const d=document.createElement("div");return d.className="edi-output",i.addEventListener("click",async()=>{try{const l=await navigator.clipboard.readText();n.value=l,d.innerHTML="",n.dispatchEvent(new Event("input",{bubbles:!0}))}catch(l){alert("Klembordinhoud kan niet worden geplakt. Geef toestemming of gebruik een veilige browser."),console.error("Clipboard error:",l)}}),a.addEventListener("click",()=>{n.value="",d.innerHTML=""}),document.body.appendChild(e),s.appendChild(i),s.appendChild(a),document.body.appendChild(r),document.body.appendChild(n),document.body.appendChild(s),document.body.appendChild(d),q(n,d,t,e),{textarea:n,toggleCheckbox:t}}function x(n){return n.split(/'/).map(e=>e.trim()).filter(Boolean)}function G(n,e){if(n.length===0)return;const r=["12","182","83"],o=document.createElement("table");o.className="product-table",o.innerHTML=`
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
      ${r.map(t=>{const s=n.filter(i=>i.qtyCode===t);return s.length===0?"":`
          <tr><td colspan="4"><strong>QTY+${t} ${V(t)}</strong></td></tr>
          ${s.map(i=>`
            <tr>
              <td>${i.lineNumber}</td>
              <td>${i.ean}</td>
              <td>${i.quantity}</td>
              <td>${i.price?"€"+i.price:""}</td>
            </tr>
          `).join("")}
        `}).join("")}
      ${n.filter(t=>!r.includes(t.qtyCode||"")).map(t=>`
          <tr>
            <td>${t.lineNumber}</td>
            <td>${t.ean}</td>
            <td>${t.quantity}</td>
            <td>${t.price?"€"+t.price:""}</td>
          </tr>
        `).join("")}
    </tbody>
  `,e.appendChild(o)}function V(n){switch(n){case"12":return"(Accepted)";case"182":return"(Cancelled)";case"83":return"(Backorder)";default:return""}}const c={UNB:{name:"Interchange Header"},UNZ:{name:"Interchange trailer",fields:{UNZ010:"Number of messages",UNZ020:"Interchange control reference"}},UNH:{name:"Message Header"},UNT:{name:"Message Trailer"},BGM:{name:"Beginning of Message",fields:{220:"Order",231:"Purchase order response",351:"Despatch advice",380:"Commercial invoice",381:"Credit note",9:"Original",4:"Change",29:"Accepted without amendment"}},DTM:{name:"Date/Time/Period",fields:{137:"Document/message date/time",2:"Requested delivery date/time",11:"Despatch date and/or time",132:"Arrival date/time, estimated",171:"Order date/time",67:"Confirmed delivery date/time",506:"Backorder delivery date/time",102:"CCYYMMDD (format qualifier)"}},RFF:{name:"Reference",fields:{ON:"Order number",ADE:"Account number",BM:"Bill of lading number",IV:"Invoice number",DQ:"Delivery note number",VA:"VAT registration number"}},NAD:{name:"Name and address",fields:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"},countries:{NL:"Netherlands",DE:"Germany",FR:"France",BE:"Belgium"}},CUX:{name:"Currency Details",fields:{2:"Reference currency",9:"Order currency",4:"Invoicing currency"},currencies:{EUR:"Euro"}},LIN:{name:"Line Item"},PIA:{name:"Additional product ID",fields:{1:"Additional identification",5:"Buyers item number"},codeLists:{SA:"Supplier’s article number",IN:"Buyer’s item number"}},QTY:{name:"Quantity",fields:{21:"Ordered quantity",12:"Confirmed/despatched quantity",47:"Invoiced quantity",182:"Cancelled quantity",83:"Backorder quantity"}},PRI:{name:"Price",fields:{AAA:"Calculation net",AAB:"Calculation gross"}},TAX:{name:"Tax",fields:{7:"Tax",VAT:"Value added tax",S:"Standard rate",Z:"Zero rated goods",E:"Exempt from tax"}},FTX:{name:"Free Text",fields:{AAI:"General information",1:"Text for subsequent use"}},PAT:{name:"Payment Terms",fields:{1:"Basic",5:"Date of invoice",D:"Day"}},PCD:{name:"Percentage Details",fields:{7:"Percentage of invoice",13:"Invoice value"}},ALC:{name:"Allowance/Charge",fields:{A:"Allowance",C:"Charge",FC:"Freight Charge",TD:"Trade Discount"}},IMD:{name:"Item Description",fields:{F:"Free-form",81:"Title"}},MOA:{name:"Monetary Amount",fields:{203:"Line item amount",8:"Charge/Allowance amount"}},TDT:{name:"Details of Transport",fields:{8067:"Transport mode coded",31:"Truck"}},CPS:{name:"Consignment Packing Sequence"},PAC:{name:"Packaging",fields:{52:"Barcoded package"}},MEA:{name:"Measurements",fields:{PD:"Physical dimensions",KGM:"Kilogram"}},HAN:{name:"Handling Instructions"},PCI:{name:"Package Identification",fields:{"33E":"SSCC label"}},GIN:{name:"Goods Identity Number",fields:{BJ:"Batch number"}},UNS:{name:"Section control",fields:{S:"Start of detail section",D:"Start of summary section"}},CNT:{name:"Control total",fields:{2:"Number of line items in message"}}};function X(n){const e=n.slice(0,4),r=n.slice(4,6),o=n.slice(6,8);return new Date(`${e}-${r}-${o}`).toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})}function Y(n,e){try{console.log("renderUNB input:",{segment:n,parts:e}),e=e||[];const[r,o="",t="",s=""]=e,[i,a]=o.split(":"),[d,l]=t.split(":"),[m="",f=""]=s.split(":");let $=m;/^\d{6}$/.test(m)&&($=X("20"+m));const h=f.length===4?`${f.slice(0,2)}:${f.slice(2,4)}`:"",N=[];i||N.push("Sender identification (parts[1])"),d||N.push("Recipient identification (parts[2])"),m||N.push("Interchange date (parts[3])");const C=N.length?`<div>${N.map(D=>`<p class="edi-error">${D} is mandatory</p>`).join("")}</div>`:"";return`
      <h3>UNB – ${c.UNB.name}</h3>
      <code>${n}</code>
      ${C}
      <p><strong>Sender:</strong> ${i||"<em>N/A</em>"}${a?` (${a})`:""}</p>
      <p><strong>Recipient:</strong> ${d||"<em>N/A</em>"}${l?` (${l})`:""}</p>
      <p><strong>Date:</strong> ${$||"<em>N/A</em>"}</p>
      <p><strong>Time:</strong> ${h||"<em>N/A</em>"}</p>
    `}catch(r){return console.error("renderUNB error:",r),`
      <h3>UNB – ${c.UNB.name}</h3>
      <p class="edi-error">Error rendering UNB: ${r.message}</p>
      <code>${n}</code>
    `}}function j(n,e){try{console.log("renderUNH input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",[o="",t="",s="",i=""]=(e[1]??"").split(":"),a=[];r||a.push("Message reference"),o||a.push("Message type"),t||a.push("Version"),s||a.push("Release"),i||a.push("Agency");const d=a.length?a.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"";return`
      <h3>UNH – ${c.UNH.name}</h3>
      <code>${n}</code>
      ${d}
      <p><strong>Message reference:</strong> ${r||"<em>n.v.t.</em>"}</p>
      <p><strong>Type:</strong> ${o||"<em>n.v.t.</em>"}</p>
      <p><strong>Version:</strong> ${t||"<em>n.v.t.</em>"}</p>
      <p><strong>Release:</strong> ${s||"<em>n.v.t.</em>"}</p>
      <p><strong>Agency:</strong> ${i||"<em>n.v.t.</em>"}</p>
    `}catch(r){return console.error("renderUNH error:",r),`
      <h3>UNH – ${c.UNH.name}</h3>
      <p class="edi-error">Error rendering UNH: ${r.message}</p>
      <code>${n}</code>
    `}}function W(n,e){try{console.log("renderBGM input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",o=e[1]??"",t=e[2]??"",i=(c.BGM.fields??{})[t]||"",a=[];r||a.push("BGM001 Document/message name (C002) is mandatory"),o||a.push("BGM002 Document number is mandatory"),t||a.push("BGM003 Message function code is mandatory");const d=a.length?`<div class="edi-error">${a.map(l=>`<p>${l}</p>`).join("")}</div>`:"";return`
      <h3>BGM – ${c.BGM.name}</h3>
      <code>${n}</code>
      ${d}
      <p><strong>Document code:</strong> ${r||"<em>N/A</em>"}</p>
      <p><strong>Document number:</strong> ${o||"<em>N/A</em>"}</p>
      <p><strong>Message function:</strong> ${t||"<em>N/A</em>"}${i?` (${i})`:""}</p>
    `}catch(r){return console.error("renderBGM error:",r),`
      <div class="edi-error">
        <h3>BGM – ${c.BGM.name}</h3>
        <p>Error rendering BGM: ${r.message}</p>
      </div>
      <code>${n}</code>
    `}}function Z(n,e){try{console.log("renderDTM input:",{segment:n,parts:e}),e=e||[];const[r=""]=e,[o="",t="",s=""]=r.split(":"),a=(c.DTM.fields??{})[o]||"";let d=t;s==="102"&&/^\d{8}$/.test(t)?d=`${t.slice(6,8)}-${t.slice(4,6)}-${t.slice(0,4)}`:s==="203"&&/^\d{10}$/.test(t)&&(d=`${t.slice(6,8)}-${t.slice(4,6)}-${t.slice(0,4)} ${t.slice(8,10)}:00`);const l=[];o||l.push("DTM010 Qualifier"),t||l.push("DTM020 Date/time value");const m=l.length?l.map(f=>`<p class="edi-error">${f} is mandatory</p>`).join(""):"";return`
      <h3>DTM – ${c.DTM.name}</h3>
      <code>${n}</code>
      ${m}
      <p><strong>Qualifier:</strong> ${o||"<em>N/A</em>"}${a?` (${a})`:""}</p>
      <p><strong>Date:</strong> ${d||"<em>N/A</em>"}</p>
      <p><strong>Format code:</strong> ${s||"<em>N/A</em>"}</p>
    `}catch(r){return console.error("renderDTM error:",r),`
      <h3>DTM – ${c.DTM.name}</h3>
      <p class="edi-error">Error rendering DTM: ${r.message}</p>
      <code>${n}</code>
    `}}function K(n,e){try{console.log("renderNAD input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",o=e[1]??"",t=e[3]??"",s=e[4]??"",i=e[5]??"",a=e[7]??"",d=e[8]??"",m=(c.NAD.fields??{})[r]||"",$=(c.NAD.countries??{})[d]||"",h=[];r||h.push("NAD010 Party qualifier"),o||h.push("NAD020 Party identification");const N=h.length?h.map(C=>`<p class="edi-error">${C} is mandatory</p>`).join(""):"";return`
      <h3>NAD – ${c.NAD.name}</h3>
      <code>${n}</code>
      ${N}
      <p><strong>Function (NAD010):</strong> ${r||"<em>N/A</em>"}${m?` (${m})`:""}</p>
      <p><strong>Identification (NAD020):</strong> ${o||"<em>N/A</em>"}</p>
      <p><strong>Name (NAD040):</strong> ${t||"<em>N/A</em>"}</p>
      <p><strong>Street:</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>City:</strong> ${i||"<em>N/A</em>"}</p>
      <p><strong>Postcode:</strong> ${a||"<em>N/A</em>"}</p>
      <p><strong>Country:</strong> ${d||"<em>N/A</em>"}${$?` (${$})`:""}</p>
    `}catch(r){return console.error("renderNAD error:",r),`
      <h3>NAD – ${c.NAD.name}</h3>
      <p class="edi-error">Error rendering NAD: ${r.message}</p>
      <code>${n}</code>
    `}}function _(n,e){try{console.log("renderRFF input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",[o="",t=""]=r.split(":"),i=(c.RFF.fields??{})[o]||"",a=[];o||a.push("RFF010 Reference qualifier"),t||a.push("RFF020 Reference value");const d=a.length?a.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"";return`
      <h3>RFF – ${c.RFF.name}</h3>
      <code>${n}</code>
      ${d}
      <p>
        <strong>Qualifier (RFF010):</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p>
        <strong>Value (RFF020):</strong>
        ${t||"<em>N/A</em>"}
      </p>
    `}catch(r){return console.error("renderRFF error:",r),`
      <h3>RFF – ${c.RFF.name}</h3>
      <p class="edi-error">Error rendering RFF: ${r.message}</p>
      <code>${n}</code>
    `}}function z(n,e){try{console.log("renderLIN input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",o=e[2]??"",[t="",s=""]=o.split(":"),i=[];r||i.push("LIN010 Line number"),t||i.push("LIN020 Item identification");const a=i.length?i.map(m=>`<p class="edi-error">${m} is mandatory</p>`).join(""):"";return{html:`
      <h3>LIN – ${c.LIN.name}</h3>
      <code>${n}</code>
      ${a}
      <p><strong>Line number (LIN010):</strong> ${r||"<em>N/A</em>"}</p>
      <p><strong>Item ID type (LIN020-2):</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>Item identification (LIN020-1):</strong> ${t||"<em>N/A</em>"}</p>
    `,product:{lineNumber:r,ean:t,itemIdType:s}}}catch(r){return console.error("renderLIN error:",r),{html:`
        <div class="edi-error">
          <h3>LIN – ${c.LIN.name}</h3>
          <p>Error rendering LIN: ${r.message}</p>
          <code>${n}</code>
        </div>
      `,product:null}}}function J(n,e){try{console.log("renderQTY input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",[o="",t=""]=r.split(":"),i=(c.QTY.fields??{})[o]||"",a=[];o||a.push("QTY010 Quantity qualifier"),t||a.push("QTY020 Quantity value");const d=a.length?a.map(f=>`<p class="edi-error">${f} is mandatory</p>`).join(""):"",l=o&&!i?`<p class="edi-error">Unknown qualifier code: ${o}</p>`:"";return{html:`
      <h3>QTY – ${c.QTY.name}</h3>
      <code>${n}</code>
      ${d}
      ${l}
      <p>
        <strong>Qualifier (QTY010):</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p>
        <strong>Quantity (QTY020):</strong>
        ${t||"<em>N/A</em>"}
      </p>
    `,quantity:t}}catch(r){return console.error("renderQTY error:",r),{html:`
        <h3>QTY – ${c.QTY.name}</h3>
        <p class="edi-error">Error rendering QTY: ${r.message}</p>
        <code>${n}</code>
      `,quantity:""}}}function ee(n,e){try{console.log("renderPRI input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",[o="",t=""]=r.split(":"),i=(c.PRI.fields??{})[o]||"",a=isNaN(Number(t))?t:Number(t).toFixed(2),d=[];o||d.push("PRI010 Price qualifier"),t||d.push("PRI020 Price amount");const l=d.length?d.map($=>`<p class="edi-error">${$} is mandatory</p>`).join(""):"",m=o&&!i?`<p class="edi-error">Unknown qualifier code: ${o}</p>`:"";return{html:`
      <h3>PRI – ${c.PRI.name}</h3>
      <code>${n}</code>
      ${l}
      ${m}
      <p><strong>Qualifier (PRI010):</strong> ${o||"<em>N/A</em>"}${i?` (${i})`:""}</p>

      <p><strong>Amount (PRI020):</strong> ${a||"<em>N/A</em>"}</p>
    `,price:a}}catch(r){return console.error("renderPRI error:",r),{html:`
        <h3>PRI – ${c.PRI.name}</h3>
        <p class="edi-error">Error rendering PRI: ${r.message}</p>
        <code>${n}</code>
      `,price:""}}}function ne(n,e){var r;try{console.log("renderCUX input:",{segment:n,parts:e}),e=e||[];let o="",t="",s="";e.length===1&&e[0].includes(":")?[o,t,s]=e[0].split(":"):(o=e[0]??"",[t,s]=((r=e[1])==null?void 0:r.split(":"))??["",""]);const i=c.CUX.fields||{},a=c.CUX.currencies||{},d=i[o]||"",l=a[t]||"",m=[];o||m.push("Currency qualifier"),t||m.push("Currency code"),s||m.push("Currency type");const f=m.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${m.join(", ")}</p>`:"",$=o&&!d?`<p style="color:red"><strong>Unknown qualifier code:</strong> ${o}</p>`:"",h=t&&!l?`<p style="color:red"><strong>Unknown currency code:</strong> ${t}</p>`:"";return`
      <h3>${c.CUX.name}</h3>
      <code>${n}</code>
      ${f}
      ${$}
      ${h}
      <p>
        <strong>Qualifier:</strong>
        ${o||"<em>N/A</em>"}
        ${d?` (${d})`:""}
      </p>
      <p>
        <strong>Currency:</strong>
        ${t||"<em>N/A</em>"}
        ${l?` (${l})`:""}
      </p>
      <p><strong>Type:</strong> ${s||"<em>N/A</em>"}</p>
    `}catch(o){return console.error("renderCUX error:",o),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.CUX.name}</h3>
        <p style="color:red"><strong>Error rendering CUX:</strong> ${o.message}</p>
        <code>${n}</code>
      </div>
    `}}function re(n,e){var r;try{console.log("renderPIA input:",{segment:n,parts:e}),e=e||[];const o=e[0]??"",[t="",s=""]=((r=e[1])==null?void 0:r.split(":"))??[],i=c.PIA.fields??{},a=c.PIA.codeLists??{},d=i[o]||"",l=a[s]||"",m=[];o||m.push("PIA010 function qualifier"),t||m.push("PIA020 item identification");const f=m.length?m.map(N=>`<p class="edi-error">${N} is mandatory</p>`).join(""):"",$=o&&!d?`<p class="edi-error">Unknown PIA010 qualifier: ${o}</p>`:"",h=s&&!l?`<p class="edi-error">Unknown PIA020 code list qualifier: ${s}</p>`:"";return`
      <h3>PIA – ${c.PIA.name}</h3>
      <code>${n}</code>
      ${f}
      ${$}
      ${h}
      <p>
        <strong>Function (PIA010):</strong>
        ${o||"<em>N/A</em>"}
        ${d?` (${d})`:""}
      </p>
      <p>
        <strong>Item identification (PIA020-1):</strong>
        ${t||"<em>N/A</em>"}
      </p>
      <p>
        <strong>Code list qualifier (PIA020-3):</strong>
        ${s||"<em>N/A</em>"}
        ${l?` (${l})`:""}
      </p>
    `}catch(o){return console.error("renderPIA error:",o),`
      <h3>PIA – ${c.PIA.name}</h3>
      <p class="edi-error">Error rendering PIA: ${o.message}</p>
      <code>${n}</code>
    `}}function te(n,e){try{console.log("renderPAC input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",t=(e[1]??"").split(":")[1]??"",s=e[2]??"",i=c.PAC.fields??{},a=i[t]||"",d=i[s]||"",l=[];r||l.push("PAC010 Number of packages is mandatory"),t||l.push("PAC020 Packaging details code is mandatory"),s||l.push("PAC030 Package type code is mandatory");const m=l.length?l.map(f=>`<p class="edi-error">${f}</p>`).join(""):"";return`
      <h3>PAC – ${c.PAC.name}</h3>
      <code>${n}</code>
      ${m}
      <p><strong>Number of packages (PAC010):</strong> ${r||"<em>N/A</em>"}</p>
      <p>
       <strong>Packaging details code (PAC020):</strong>
      ${t||"<em>N/A</em>"}
       ${a?` (${a})`:""}
      </p>
      <p>
        <strong>Package type code (PAC030):</strong>
        ${s||"<em>N/A</em>"}
        ${d?` (${d})`:""}
      </p>
    `}catch(r){return console.error("renderPAC error:",r),`
      <h3>PAC – ${c.PAC.name}</h3>
      <p class="edi-error">Error rendering PAC: ${r.message}</p>
      <code>${n}</code>
    `}}function oe(n,e){try{console.log("renderCPS input:",{segment:n,parts:e}),e=e||[];const[r="",o=""]=e,t=[];r||t.push("CPS010 Hierarchical id");const s=t.length?t.map(i=>`<p class="edi-error">${i} is mandatory</p>`).join(""):"";return`
      <h3>CPS – ${c.CPS.name}</h3>
      <code>${n}</code>
      ${s}
      <p><strong>Hierarchical id (CPS010):</strong> ${r||"<em>n.v.t.</em>"}</p>
      <p><strong>Parent hierarchical id (CPS020):</strong> ${o||"<em>—</em>"}</p>
    `}catch(r){return console.error("renderCPS error:",r),`
      <h3>CPS – ${c.CPS.name}</h3>
      <p class="edi-error">Error rendering CPS: ${r.message}</p>
      <code>${n}</code>
    `}}function se(n,e){try{console.log("renderMEA input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",o=(e[2]??"").split(":"),t=o[0]??"",s=o[1]??"",i=o[2]??"",a=c.MEA.fields??{},d=a[r]||"",l=a[t]||"",m=[];r||m.push("MEA010 Measurement purpose"),s||m.push("MEA020 Measurement value");const f=m.length?m.map($=>`<p class="edi-error">${$} is mandatory</p>`).join(""):"";return`
      <h3>MEA – ${c.MEA.name}</h3>
      <code>${n}</code>
      ${f}
      <p><strong>Purpose (MEA010):</strong> ${r||"<em>N/A</em>"}${d?` (${d})`:""}</p>
      <p><strong>Qualifier (MEA020-1):</strong> ${t||"<em>N/A</em>"}${l?` (${l})`:""}</p>
      <p><strong>Value (MEA020-2):</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>Unit (MEA020-3):</strong> ${i||"<em>N/A</em>"}</p>
    `}catch(r){return console.error("renderMEA error:",r),`
      <h3>MEA – ${c.MEA.name}</h3>
      <p class="edi-error">Error rendering MEA: ${r.message}</p>
      <code>${n}</code>
    `}}function ie(n,e){try{console.log("renderUNS input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",t=(c.UNS.fields??{})[r]||"",s=[];r||s.push("UNS010 Section identification");const i=s.length?s.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"",a=r&&!t?`<p class="edi-error">Unknown section identification code: ${r}</p>`:"";return`
      <h3>UNS – ${c.UNS.name}</h3>
      <code>${n}</code>
      ${i}
      ${a}
      <p>
        <strong>Section identification (UNS010):</strong>
        ${r||"<em>N/A</em>"}
        ${t?` (${t})`:""}
      </p>
    `}catch(r){return console.error("renderUNS error:",r),`
      <h3>UNS – ${c.UNS.name}</h3>
      <p class="edi-error">Error rendering UNS: ${r.message}</p>
      <code>${n}</code>
    `}}function ae(n,e){try{console.log("renderUNT input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",o=e[1]??"",t=[];r||t.push("UNT010 Number of segments"),o||t.push("UNT020 Message reference number");const s=t.length?t.map(i=>`<p class="edi-error">${i} is mandatory</p>`).join(""):"";return`
      <h3>UNT – ${c.UNT.name}</h3>
      <code>${n}</code>
      ${s}
      <p><strong>Number of segments (UNT010):</strong> ${r||"<em>N/A</em>"}</p>
      <p><strong>Message reference number (UNT020):</strong> ${o||"<em>N/A</em>"}</p>
    `}catch(r){return console.error("renderUNT error:",r),`
      <h3>UNT – ${c.UNT.name}</h3>
      <p class="edi-error">Error rendering UNT: ${r.message}</p>
      <code>${n}</code>
    `}}function ce(n,e){try{console.log("renderUNZ input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",o=e[1]??"",t=[];r||t.push("Number of messages"),o||t.push("Interchange control reference");const s=t.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${t.join(", ")}</p>`:"",i=r&&!/^\d+$/.test(r)?`<p style="color:red"><strong>Invalid message count (not a number):</strong> ${r}</p>`:"";return`
      <h3>UNZ - ${c.UNZ.name}</h3>
      <code>${n}</code>
      ${s}
      ${i}
      <p>
        <strong>Number of messages:</strong>
        ${r||"<em>N/A</em>"}
      </p>
      <p>
        <strong>Interchange control reference:</strong>
        ${o||"<em>N/A</em>"}
      </p>
    `}catch(r){return console.error("renderUNZ error:",r),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.UNZ.name}</h3>
        <p style="color:red"><strong>Error rendering UNZ:</strong> ${r.message}</p>
        <code>${n}</code>
      </div>
    `}}function de(n,e){try{console.log("renderTAX input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",o=e[1]??"",s=(e[4]??"").split(":")[3]??"",i=c.TAX.fields??{},a=i[r]||"",d=i[o]||"",l=[];r||l.push("TAX010 Duty/tax/fee function qualifier"),o||l.push("TAX020 Duty/tax/fee type, coded"),s||l.push("TAX050 Duty/tax/fee rate");const m=l.length?l.map(f=>`<p class="edi-error">${f} is mandatory</p>`).join(""):"";return`
      <h3>TAX – ${c.TAX.name}</h3>
      <code>${n}</code>
      ${m}
      <p>
        <strong>Duty/tax/fee function qualifier (TAX010):</strong>
        ${r||"<em>N/A</em>"}
        ${a?` (${a})`:""}
      </p>
      <p>
        <strong>Duty/tax/fee type (TAX020):</strong>
        ${o||"<em>N/A</em>"}
        ${d?` (${d})`:""}
      </p>
      <p>
        <strong>Duty/tax/fee rate (TAX050):</strong>
        ${s||"<em>N/A</em>"}
      </p>
    `}catch(r){return console.error("renderTAX error:",r),`
      <h3>TAX – ${c.TAX.name}</h3>
      <p class="edi-error">Error rendering TAX: ${r.message}</p>
      <code>${n}</code>
    `}}function le(n,e){try{console.log("renderMOA input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",[o="",t=""]=r.split(":"),i=(c.MOA.fields??{})[o]||"",a=[];o||a.push("Amount qualifier"),t||a.push("Amount value");const d=a.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${a.join(", ")}</p>`:"",l=o&&!i?`<p style="color:red"><strong>Unknown qualifier code:</strong> ${o}</p>`:"";return`
      <h3>${c.MOA.name}</h3>
      <code>${n}</code>
      ${d}
      ${l}
      <p>
        <strong>Qualifier:</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p><strong>Amount:</strong> €${t||"<em>N/A</em>"}</p>
    `}catch(r){return console.error("renderMOA error:",r),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.MOA.name}</h3>
        <p style="color:red"><strong>Error rendering MOA:</strong> ${r.message}</p>
        <code>${n}</code>
      </div>
    `}}function me(n,e){try{console.log("renderCNT input:",{segment:n,parts:e}),e=e||[];const[r="",o=""]=(e[0]??"").split(":"),s=(c.CNT.fields??{})[r]||"",i=[];r||i.push("CNT010 Control qualifier"),o||i.push("CNT020 Control value");const a=i.length?i.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"",d=r&&!s?`<p class="edi-error">Unknown qualifier code: ${r}</p>`:"";return`
      <h3>CNT – ${c.CNT.name}</h3>
      <code>${n}</code>
      ${a}
      ${d}
      <p>
        <strong>Qualifier (CNT010):</strong>
        ${r||"<em>N/A</em>"}
        ${s?` (${s})`:""}
      </p>
      <p><strong>Count (CNT020):</strong> ${o||"<em>N/A</em>"}</p>
    `}catch(r){return console.error("renderCNT error:",r),`
      <h3>CNT – ${c.CNT.name}</h3>
      <p class="edi-error">Error rendering CNT: ${r.message}</p>
      <code>${n}</code>
    `}}function ue(n,e){try{console.log("renderPCI input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",[o="",t=""]=r.split(":"),i=(c.PCI.fields??{})[o]||"",a=[];o||a.push("PCI010 Identification qualifier"),t||a.push("PCI020 Identification number");const d=a.length?a.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"";return`
      <h3>PCI – ${c.PCI.name}</h3>
      <code>${n}</code>
      ${d}
      <p>
        <strong>Qualifier (PCI010):</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p><strong>Identification (PCI020):</strong> ${t||"<em>N/A</em>"}</p>
    `}catch(r){return console.error("renderPCI error:",r),`
      <h3>PCI – ${c.PCI.name}</h3>
      <p class="edi-error">Error rendering PCI: ${r.message}</p>
      <code>${n}</code>
    `}}function pe(n,e){try{console.log("renderGIN input:",{segment:n,parts:e}),e=e||[];const r=e[0]??"",o=e.slice(1).filter(m=>!!m),i=(c.GIN.fields??{})[r]||"",a=[];r||a.push("GIN010 Identity qualifier"),o.length===0&&a.push("GIN020 Identity number");const d=a.length?a.map(m=>`<p class="edi-error">${m} is mandatory</p>`).join(""):"",l=r&&!i?`<p class="edi-error">Unknown qualifier code: ${r}</p>`:"";return`
      <h3>GIN – ${c.GIN.name}</h3>
      <code>${n}</code>
      ${d}
      ${l}
      <p>
        <strong>Qualifier (GIN010):</strong>
        ${r||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p>
        <strong>Identity number${o.length>1?"s":""} (GIN020):</strong>
        ${o.length?o.join(", "):"<em>N/A</em>"}
      </p>
    `}catch(r){return console.error("renderGIN error:",r),`
      <h3>GIN – ${c.GIN.name}</h3>
      <p class="edi-error">Error rendering GIN: ${r.message}</p>
      <code>${n}</code>
    `}}function ge(n,e,r){var i;const o=n.split("+")[0],t=(i=c[o])==null?void 0:i.name,s=document.createElement("div");s.className="segment",s.innerHTML=`
    <h3>⚠️ ${t?`${o} – ${t}`:`Unknown segment (${o})`}</h3>
    <code>${n}</code>
    <p>${t?"No renderer implemented yet, but the segment name is known":"This segment is not recognized or supported yet."}</p>
  `,r.appendChild(s)}const fe={ORDERS:{BGM:{220:"Order"},QTY:{21:"Ordered quantity"},DTM:{137:"Document/message date/time",2:"Requested delivery date/time"},RFF:{ADE:"Account number",VA:"VAT registration number"},CUX:{2:"Reference currency",9:"Order currency"},LIN:{EN:"International Article Numbering Association (EAN)"},PRI:{AAA:"Calculation net (the price stated is the net price including allowances/charges)"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"}},ORDRSP:{BGM:{231:"Purchase order response"},QTY:{12:"Confirmed quantity",182:"Cancelled quantity",83:"Backorder quantity"},DTM:{137:"Document/message date/time",171:"Order date/time",67:"Confirmed delivery date/time",506:"Backorder delivery date/time"},RFF:{ON:"Order number"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party"}},DESADV:{BGM:{351:"Despatch advice"},QTY:{12:"Confirmed quantity",182:"Cancelled quantity",83:"Backorder quantity"},DTM:{137:"Document/message date/time",11:"Despatch date and/or time, actual",132:"Arrival date/time, estimated",361:"Best before date"},RFF:{BM:"Bill of lading number",ON:"Order number (purchase)"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",CA:"Carrier"},CPS:{},PAC:{52:"Packaging details code"},PCI:{"33E":"SSCC label"},GIN:{BN:"Serial number",BX:"Batch number"},PIA:{5:"Additional product identification",SA:"Supplier's article number"},LIN:{EN:"International Article Numbering Association (EAN)"},PRI:{AAA:"Calculation net"}},INVOIC:{BGM:{380:"Commercial invoice",381:"Credit note"},QTY:{47:"Invoiced quantity"},MOA:{203:"Line item amount",8:"Charge/Allowance amount"},PRI:{AAA:"Calculation net",AAB:"Calculation gross",CT:"Contract"},RFF:{ON:"Order number"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"}}},$e=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"DTM",condition:n=>n.some(e=>e.includes("DTM+2:"))},{segment:"NAD",mandatory:!0},{segment:"CUX",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"PRI",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function I(n,e){const r=n.map(t=>t.split("+")[0]),o=[];for(const t of e)(t.mandatory||(t.condition?t.condition(n):!1))&&!r.includes(t.segment)&&o.push(t.segment);return{valid:o.length===0,missing:o}}function he(n){const e=I(n,$e);return e.valid||console.warn("ORDERS validation failed. Missing segments:",e.missing),e}const Ne=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"RFF",mandatory:!0},{segment:"NAD",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",condition:n=>n.some(e=>e.startsWith("LIN+5"))},{segment:"QTY",condition:n=>n.some(e=>e.startsWith("LIN+6"))},{segment:"QTY",condition:n=>n.some(e=>e.startsWith("LIN+2"))},{segment:"DTM",condition:n=>n.some(e=>e.startsWith("LIN+5"))&&n.some(e=>e.startsWith("DTM+67:"))},{segment:"DTM",condition:n=>n.some(e=>e.startsWith("LIN+6"))&&n.some(e=>e.startsWith("DTM+506:"))},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function ye(n){const e=I(n,Ne);return n.filter(o=>o.startsWith("LIN+")).length<1&&(e.valid=!1,e.missing.push("Minimaal 1 LIN-segment vereist")),e}const Ae=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0,condition:n=>n.some(e=>e.startsWith("DTM+137:"))},{segment:"DTM",mandatory:!0,condition:n=>n.some(e=>e.startsWith("DTM+132:"))},{segment:"DTM",condition:n=>n.some(e=>e.startsWith("DTM+11:"))},{segment:"RFF",mandatory:!0,condition:n=>n.some(e=>e.startsWith("RFF+ON:"))},{segment:"NAD",mandatory:!0},{segment:"CPS",mandatory:!0},{segment:"PAC",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function Ce(n){const e=I(n,Ae);return e.valid||console.warn("DESADV validation failed. Missing segments:",e.missing),e}const Te=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"DTM",condition:n=>n.some(e=>e.startsWith("DTM+171:"))},{segment:"RFF",mandatory:!0},{segment:"RFF",condition:n=>n.some(e=>e.startsWith("RFF+DQ:"))},{segment:"NAD",mandatory:!0},{segment:"CUX",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"PIA",mandatory:!0},{segment:"IMD",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"MOA",mandatory:!0},{segment:"PRI",mandatory:!0},{segment:"TAX",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"MOA",mandatory:!0},{segment:"TAX",mandatory:!0},{segment:"UNT",mandatory:!0}];function De(n){const e=I(n,Te);return e.valid||console.warn("INVOIC validation failed. Missing segments:",e.missing),e}const k={220:"ORDERS",231:"ORDRSP",351:"INVOIC",DESADV:"DESADV"};function Ie(n){var s;const e=n.find(i=>i.startsWith("UNH+"));if(!e)return null;const o=(s=e.split("+")[2])==null?void 0:s.split(":"),t=o==null?void 0:o[0];return k[t??""]??t??null}function Pe(n){const e=Ie(n);if(!e)return{valid:!1,missing:["⚠️ Kan berichttype niet detecteren"],type:null};let r;switch(e){case"ORDERS":r=he(n);break;case"ORDRSP":r=ye(n);break;case"DESADV":r=Ce(n);break;case"INVOIC":r=De(n);break;default:return{valid:!1,missing:["⚠️ Onbekend berichttype"],type:e}}return{valid:r.valid,missing:r.missing,type:e}}function M(){var N,C,D,w;const n=B(),e=Q(),o=H().checked,t=x(n.value);e.innerHTML="";let s={};const i=[];let a="";for(const u of t){const[T,...p]=u.split("+"),S=c[T];if(T==="LIN"&&(s.lineNumber&&s.ean&&s.quantity&&i.push(s),s={}),!S&&!o)continue;const P=document.createElement("div");P.className="segment";let g="",U=!0;switch(T){case"UNB":g=Y(u,p);break;case"UNH":g=j(u,p),a=((N=p[1])==null?void 0:N.split(":")[0])??"";break;case"BGM":g=W(u,p),a=(a||((C=p[0])==null?void 0:C.split(":")[0]))??"";break;case"DTM":g=Z(u,p);break;case"NAD":g=K(u,p);break;case"RFF":g=_(u,p);break;case"LIN":{const{html:y,product:A}=z(u,p);g=y,s=A;break}case"QTY":{const{html:y,quantity:A}=J(u,p);g=y,A&&(s.quantity=A);break}case"PRI":{const{html:y,price:A}=ee(u,p);g=y,A&&(s.price=A);break}case"CUX":g=ne(u,p);break;case"PIA":g=re(u,p);break;case"PAC":g=te(u,p);break;case"CPS":g=oe(u,p);break;case"MEA":g=se(u,p);break;case"UNS":g=ie(u,p);break;case"UNT":g=ae(u,p);break;case"UNZ":g=ce(u,p);break;case"TAX":g=de(u,p);break;case"MOA":g=le(u,p);break;case"CNT":g=me(u,p);break;case"PCI":g=ue(u,p);break;case"GIN":g=pe(u,p);break;default:o&&ge(u,p,e),U=!1;break}const b=(D=fe[a])==null?void 0:D[T];if(b){const y=((w=p[0])==null?void 0:w.split(":")[0])??"";b.hasOwnProperty(y)||(g=`<p class="edi-error">
          Unknown ${T} qualifier: "${y}"<br/>
          allowed: ${Object.keys(b).join(", ")}
        </p>`+g)}U&&(P.innerHTML=g,e.appendChild(P))}s.lineNumber&&s.ean&&s.quantity&&i.push(s);const{valid:d,missing:l,type:m}=Pe(t),f=k[m??""]??m??"Unknown",$=L();l.length>0?$.textContent=`❌ ${l.length} contains all required segments ${f}`:$.textContent=`✅ No errors found ${f}`;const h=document.createElement("div");h.className=`validation-box ${d?"success":"error"}`,h.innerHTML=`
    <div>
      <p><strong>${d?`✅ Message type ${f} has all segments`:`❌ Message type ${f} has errors or missing segments:`}</strong></p>
      ${d?"":`<ul>${l.map(u=>`<li>${u}</li>`).join("")}</ul>`}
    </div>
  `,e.prepend(h),G(i,e)}const{textarea:be,toggleCheckbox:Me}=O();be.addEventListener("input",M);Me.addEventListener("change",M);M();
