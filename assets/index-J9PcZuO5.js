(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();let b,M,w;function F(r,e,n){b=r,M=e,w=n}function k(){return b}function E(){return M}function R(){return w}function S(){const r=document.createElement("textarea");r.placeholder="Plak hier je EDI-bericht...";const e=document.createElement("label");e.className="toggle-unknowns";const n=document.createElement("input");n.type="checkbox",n.checked=!1,e.appendChild(n),e.appendChild(document.createTextNode(" Toon onbekende segmenten en codes"));const o=document.createElement("div");o.className="button-row";const t=document.createElement("button");t.className="paste-button",t.textContent="Paste",t.type="button";const s=document.createElement("button");s.className="reset-button",s.textContent="Reset",s.type="button";const i=document.createElement("div");return i.className="edi-output",t.addEventListener("click",async()=>{try{const a=await navigator.clipboard.readText();r.value=a,i.innerHTML="",r.dispatchEvent(new Event("input",{bubbles:!0}))}catch(a){alert("Klembordinhoud kan niet worden geplakt. Geef toestemming of gebruik een veilige browser."),console.error("Clipboard error:",a)}}),s.addEventListener("click",()=>{r.value="",i.innerHTML=""}),o.appendChild(t),o.appendChild(s),document.body.appendChild(e),document.body.appendChild(r),document.body.appendChild(o),document.body.appendChild(i),F(r,i,n),{textarea:r,toggleCheckbox:n}}function H(r){return r.split(/'/).map(e=>e.trim()).filter(Boolean)}function L(r,e){if(r.length===0)return;const n=document.createElement("table");n.className="product-table",n.innerHTML=`
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
        ${r.map(o=>`
          <tr>
            <td>${o.lineNumber}</td>
            <td>${o.ean}</td>
            <td>${o.quantity}</td>
            <td>${o.price?"€"+o.price:""}</td>
          </tr>
        `).join("")}
      </tbody>
    `,e.appendChild(n)}const c={UNB:{name:"Interchange Header"},UNZ:{name:"Interchange trailer",fields:{UNZ010:"Number of messages",UNZ020:"Interchange control reference"}},UNH:{name:"Message Header"},UNT:{name:"Message Trailer"},BGM:{name:"Beginning of Message",fields:{220:"Order",231:"Purchase order response",351:"Despatch advice",380:"Commercial invoice",381:"Credit note",9:"Original",4:"Change",29:"Accepted without amendment"}},DTM:{name:"Date/Time/Period",fields:{137:"Document/message date/time",2:"Requested delivery date/time",11:"Despatch date and/or time",132:"Arrival date/time, estimated",171:"Order date/time",67:"Confirmed delivery date/time",506:"Backorder delivery date/time",102:"CCYYMMDD (format qualifier)"}},RFF:{name:"Reference",fields:{ON:"Order number",ADE:"Account number",BM:"Bill of lading number",IV:"Invoice number",DQ:"Delivery note number",VA:"VAT registration number"}},NAD:{name:"Name and address",fields:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"},countries:{NL:"Netherlands",DE:"Germany",FR:"France",BE:"Belgium"}},CUX:{name:"Currency Details",fields:{2:"Reference currency",9:"Order currency",4:"Invoicing currency"},currencies:{EUR:"Euro"}},LIN:{name:"Line Item"},PIA:{name:"Additional product ID",fields:{1:"Additional identification",5:"Buyers item number"},codeLists:{SA:"Supplier’s article number",IN:"Buyer’s item number"}},QTY:{name:"Quantity",fields:{21:"Ordered quantity",12:"Confirmed/despatched quantity",47:"Invoiced quantity",182:"Cancelled quantity",83:"Backorder quantity"}},PRI:{name:"Price",fields:{AAA:"Calculation net",AAB:"Calculation gross"}},TAX:{name:"Tax",fields:{7:"Tax",VAT:"Value added tax",S:"Standard rate",Z:"Zero rated goods",E:"Exempt from tax"}},FTX:{name:"Free Text",fields:{AAI:"General information",1:"Text for subsequent use"}},PAT:{name:"Payment Terms",fields:{1:"Basic",5:"Date of invoice",D:"Day"}},PCD:{name:"Percentage Details",fields:{7:"Percentage of invoice",13:"Invoice value"}},ALC:{name:"Allowance/Charge",fields:{A:"Allowance",C:"Charge",FC:"Freight Charge",TD:"Trade Discount"}},IMD:{name:"Item Description",fields:{F:"Free-form",81:"Title"}},MOA:{name:"Monetary Amount",fields:{203:"Line item amount",8:"Charge/Allowance amount"}},TDT:{name:"Details of Transport",fields:{8067:"Transport mode coded",31:"Truck"}},CPS:{name:"Consignment Packing Sequence"},PAC:{name:"Packaging",fields:{52:"Barcoded package"}},MEA:{name:"Measurements",fields:{PD:"Physical dimensions",KGM:"Kilogram"}},HAN:{name:"Handling Instructions"},PCI:{name:"Package Identification",fields:{"33E":"SSCC label"}},GIN:{name:"Goods Identity Number",fields:{BJ:"Batch number"}},UNS:{name:"Section control",fields:{S:"Start of detail section",D:"Start of summary section"}},CNT:{name:"Control total",fields:{2:"Number of line items in message"}}};function Q(r){const e=r.slice(0,4),n=r.slice(4,6),o=r.slice(6,8);return new Date(`${e}-${n}-${o}`).toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})}function q(r,e){try{console.log("renderUNB input:",{segment:r,parts:e}),e=e||[];const[n,o="",t="",s=""]=e,[i,a]=o.split(":"),[d,l]=t.split(":"),[m="",f=""]=s.split(":");let $=m;/^\d{6}$/.test(m)&&($=Q("20"+m));const h=f.length===4?`${f.slice(0,2)}:${f.slice(2,4)}`:"",N=[];i||N.push("Sender identification (parts[1])"),d||N.push("Recipient identification (parts[2])"),m||N.push("Interchange date (parts[3])");const u=N.length?`<div>${N.map(A=>`<p class="edi-error">${A} is mandatory</p>`).join("")}</div>`:"";return`
      <h3>UNB – ${c.UNB.name}</h3>
      <code>${r}</code>
      ${u}
      <p><strong>Sender:</strong> ${i||"<em>N/A</em>"}${a?` (${a})`:""}</p>
      <p><strong>Recipient:</strong> ${d||"<em>N/A</em>"}${l?` (${l})`:""}</p>
      <p><strong>Date:</strong> ${$||"<em>N/A</em>"}</p>
      <p><strong>Time:</strong> ${h||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderUNB error:",n),`
      <h3>UNB – ${c.UNB.name}</h3>
      <p class="edi-error">Error rendering UNB: ${n.message}</p>
      <code>${r}</code>
    `}}function B(r,e){try{console.log("renderUNH input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t="",s="",i=""]=(e[1]??"").split(":"),a=[];n||a.push("Message reference"),o||a.push("Message type"),t||a.push("Version"),s||a.push("Release"),i||a.push("Agency");const d=a.length?a.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"";return`
      <h3>UNH – ${c.UNH.name}</h3>
      <code>${r}</code>
      ${d}
      <p><strong>Message reference:</strong> ${n||"<em>n.v.t.</em>"}</p>
      <p><strong>Type:</strong> ${o||"<em>n.v.t.</em>"}</p>
      <p><strong>Version:</strong> ${t||"<em>n.v.t.</em>"}</p>
      <p><strong>Release:</strong> ${s||"<em>n.v.t.</em>"}</p>
      <p><strong>Agency:</strong> ${i||"<em>n.v.t.</em>"}</p>
    `}catch(n){return console.error("renderUNH error:",n),`
      <h3>UNH – ${c.UNH.name}</h3>
      <p class="edi-error">Error rendering UNH: ${n.message}</p>
      <code>${r}</code>
    `}}function x(r,e){try{console.log("renderBGM input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",t=e[2]??"",i=(c.BGM.fields??{})[t]||"",a=[];n||a.push("BGM001 Document/message name (C002) is mandatory"),o||a.push("BGM002 Document number is mandatory"),t||a.push("BGM003 Message function code is mandatory");const d=a.length?`<div class="edi-error">${a.map(l=>`<p>${l}</p>`).join("")}</div>`:"";return`
      <h3>BGM – ${c.BGM.name}</h3>
      <code>${r}</code>
      ${d}
      <p><strong>Document code:</strong> ${n||"<em>N/A</em>"}</p>
      <p><strong>Document number:</strong> ${o||"<em>N/A</em>"}</p>
      <p><strong>Message function:</strong> ${t||"<em>N/A</em>"}${i?` (${i})`:""}</p>
    `}catch(n){return console.error("renderBGM error:",n),`
      <div class="edi-error">
        <h3>BGM – ${c.BGM.name}</h3>
        <p>Error rendering BGM: ${n.message}</p>
      </div>
      <code>${r}</code>
    `}}function G(r,e){try{console.log("renderDTM input:",{segment:r,parts:e}),e=e||[];const[n=""]=e,[o="",t="",s=""]=n.split(":"),a=(c.DTM.fields??{})[o]||"";let d=t;s==="102"&&/^\d{8}$/.test(t)?d=`${t.slice(6,8)}-${t.slice(4,6)}-${t.slice(0,4)}`:s==="203"&&/^\d{10}$/.test(t)&&(d=`${t.slice(6,8)}-${t.slice(4,6)}-${t.slice(0,4)} ${t.slice(8,10)}:00`);const l=[];o||l.push("DTM010 Qualifier"),t||l.push("DTM020 Date/time value");const m=l.length?l.map(f=>`<p class="edi-error">${f} is mandatory</p>`).join(""):"";return`
      <h3>DTM – ${c.DTM.name}</h3>
      <code>${r}</code>
      ${m}
      <p><strong>Qualifier:</strong> ${o||"<em>N/A</em>"}${a?` (${a})`:""}</p>
      <p><strong>Date:</strong> ${d||"<em>N/A</em>"}</p>
      <p><strong>Format code:</strong> ${s||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderDTM error:",n),`
      <h3>DTM – ${c.DTM.name}</h3>
      <p class="edi-error">Error rendering DTM: ${n.message}</p>
      <code>${r}</code>
    `}}function O(r,e){try{console.log("renderNAD input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",t=e[3]??"",s=e[4]??"",i=e[5]??"",a=e[7]??"",d=e[8]??"",m=(c.NAD.fields??{})[n]||"",$=(c.NAD.countries??{})[d]||"",h=[];n||h.push("NAD010 Party qualifier"),o||h.push("NAD020 Party identification");const N=h.length?h.map(u=>`<p class="edi-error">${u} is mandatory</p>`).join(""):"";return`
      <h3>NAD – ${c.NAD.name}</h3>
      <code>${r}</code>
      ${N}
      <p><strong>Function (NAD010):</strong> ${n||"<em>N/A</em>"}${m?` (${m})`:""}</p>
      <p><strong>Identification (NAD020):</strong> ${o||"<em>N/A</em>"}</p>
      <p><strong>Name (NAD040):</strong> ${t||"<em>N/A</em>"}</p>
      <p><strong>Street:</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>City:</strong> ${i||"<em>N/A</em>"}</p>
      <p><strong>Postcode:</strong> ${a||"<em>N/A</em>"}</p>
      <p><strong>Country:</strong> ${d||"<em>N/A</em>"}${$?` (${$})`:""}</p>
    `}catch(n){return console.error("renderNAD error:",n),`
      <h3>NAD – ${c.NAD.name}</h3>
      <p class="edi-error">Error rendering NAD: ${n.message}</p>
      <code>${r}</code>
    `}}function X(r,e){try{console.log("renderRFF input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.RFF.fields??{})[o]||"",a=[];o||a.push("RFF010 Reference qualifier"),t||a.push("RFF020 Reference value");const d=a.length?a.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"";return`
      <h3>RFF – ${c.RFF.name}</h3>
      <code>${r}</code>
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
    `}catch(n){return console.error("renderRFF error:",n),`
      <h3>RFF – ${c.RFF.name}</h3>
      <p class="edi-error">Error rendering RFF: ${n.message}</p>
      <code>${r}</code>
    `}}function V(r,e){try{console.log("renderLIN input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[2]??"",[t="",s=""]=o.split(":"),i=[];n||i.push("LIN010 Line number"),t||i.push("LIN020 Item identification");const a=i.length?i.map(m=>`<p class="edi-error">${m} is mandatory</p>`).join(""):"";return{html:`
      <h3>LIN – ${c.LIN.name}</h3>
      <code>${r}</code>
      ${a}
      <p><strong>Line number (LIN010):</strong> ${n||"<em>N/A</em>"}</p>
      <p><strong>Item ID type (LIN020-2):</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>Item identification (LIN020-1):</strong> ${t||"<em>N/A</em>"}</p>
    `,product:{lineNumber:n,ean:t,itemIdType:s}}}catch(n){return console.error("renderLIN error:",n),{html:`
        <div class="edi-error">
          <h3>LIN – ${c.LIN.name}</h3>
          <p>Error rendering LIN: ${n.message}</p>
          <code>${r}</code>
        </div>
      `,product:null}}}function j(r,e){try{console.log("renderQTY input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.QTY.fields??{})[o]||"",a=[];o||a.push("QTY010 Quantity qualifier"),t||a.push("QTY020 Quantity value");const d=a.length?a.map(f=>`<p class="edi-error">${f} is mandatory</p>`).join(""):"",l=o&&!i?`<p class="edi-error">Unknown qualifier code: ${o}</p>`:"";return{html:`
      <h3>QTY – ${c.QTY.name}</h3>
      <code>${r}</code>
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
    `,quantity:t}}catch(n){return console.error("renderQTY error:",n),{html:`
        <h3>QTY – ${c.QTY.name}</h3>
        <p class="edi-error">Error rendering QTY: ${n.message}</p>
        <code>${r}</code>
      `,quantity:""}}}function Y(r,e){try{console.log("renderPRI input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.PRI.fields??{})[o]||"",a=isNaN(Number(t))?t:Number(t).toFixed(2),d=[];o||d.push("PRI010 Price qualifier"),t||d.push("PRI020 Price amount");const l=d.length?d.map($=>`<p class="edi-error">${$} is mandatory</p>`).join(""):"",m=o&&!i?`<p class="edi-error">Unknown qualifier code: ${o}</p>`:"";return{html:`
      <h3>PRI – ${c.PRI.name}</h3>
      <code>${r}</code>
      ${l}
      ${m}
      <p><strong>Qualifier (PRI010):</strong> ${o||"<em>N/A</em>"}${i?` (${i})`:""}</p>

      <p><strong>Amount (PRI020):</strong> ${a||"<em>N/A</em>"}</p>
    `,price:a}}catch(n){return console.error("renderPRI error:",n),{html:`
        <h3>PRI – ${c.PRI.name}</h3>
        <p class="edi-error">Error rendering PRI: ${n.message}</p>
        <code>${r}</code>
      `,price:""}}}function W(r,e){var n;try{console.log("renderCUX input:",{segment:r,parts:e}),e=e||[];let o="",t="",s="";e.length===1&&e[0].includes(":")?[o,t,s]=e[0].split(":"):(o=e[0]??"",[t,s]=((n=e[1])==null?void 0:n.split(":"))??["",""]);const i=c.CUX.fields||{},a=c.CUX.currencies||{},d=i[o]||"",l=a[t]||"",m=[];o||m.push("Currency qualifier"),t||m.push("Currency code"),s||m.push("Currency type");const f=m.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${m.join(", ")}</p>`:"",$=o&&!d?`<p style="color:red"><strong>Unknown qualifier code:</strong> ${o}</p>`:"",h=t&&!l?`<p style="color:red"><strong>Unknown currency code:</strong> ${t}</p>`:"";return`
      <h3>${c.CUX.name}</h3>
      <code>${r}</code>
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
        <code>${r}</code>
      </div>
    `}}function Z(r,e){var n;try{console.log("renderPIA input:",{segment:r,parts:e}),e=e||[];const o=e[0]??"",[t="",s=""]=((n=e[1])==null?void 0:n.split(":"))??[],i=c.PIA.fields??{},a=c.PIA.codeLists??{},d=i[o]||"",l=a[s]||"",m=[];o||m.push("PIA010 function qualifier"),t||m.push("PIA020 item identification");const f=m.length?m.map(N=>`<p class="edi-error">${N} is mandatory</p>`).join(""):"",$=o&&!d?`<p class="edi-error">Unknown PIA010 qualifier: ${o}</p>`:"",h=s&&!l?`<p class="edi-error">Unknown PIA020 code list qualifier: ${s}</p>`:"";return`
      <h3>PIA – ${c.PIA.name}</h3>
      <code>${r}</code>
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
      <code>${r}</code>
    `}}function K(r,e){try{console.log("renderPAC input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",t=(e[1]??"").split(":")[1]??"",s=e[2]??"",i=c.PAC.fields??{},a=i[t]||"",d=i[s]||"",l=[];n||l.push("PAC010 Number of packages is mandatory"),t||l.push("PAC020 Packaging details code is mandatory"),s||l.push("PAC030 Package type code is mandatory");const m=l.length?l.map(f=>`<p class="edi-error">${f}</p>`).join(""):"";return`
      <h3>PAC – ${c.PAC.name}</h3>
      <code>${r}</code>
      ${m}
      <p><strong>Number of packages (PAC010):</strong> ${n||"<em>N/A</em>"}</p>
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
    `}catch(n){return console.error("renderPAC error:",n),`
      <h3>PAC – ${c.PAC.name}</h3>
      <p class="edi-error">Error rendering PAC: ${n.message}</p>
      <code>${r}</code>
    `}}function _(r,e){try{console.log("renderCPS input:",{segment:r,parts:e}),e=e||[];const[n="",o=""]=e,t=[];n||t.push("CPS010 Hierarchical id");const s=t.length?t.map(i=>`<p class="edi-error">${i} is mandatory</p>`).join(""):"";return`
      <h3>CPS – ${c.CPS.name}</h3>
      <code>${r}</code>
      ${s}
      <p><strong>Hierarchical id (CPS010):</strong> ${n||"<em>n.v.t.</em>"}</p>
      <p><strong>Parent hierarchical id (CPS020):</strong> ${o||"<em>—</em>"}</p>
    `}catch(n){return console.error("renderCPS error:",n),`
      <h3>CPS – ${c.CPS.name}</h3>
      <p class="edi-error">Error rendering CPS: ${n.message}</p>
      <code>${r}</code>
    `}}function z(r,e){try{console.log("renderMEA input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=(e[2]??"").split(":"),t=o[0]??"",s=o[1]??"",i=o[2]??"",a=c.MEA.fields??{},d=a[n]||"",l=a[t]||"",m=[];n||m.push("MEA010 Measurement purpose"),s||m.push("MEA020 Measurement value");const f=m.length?m.map($=>`<p class="edi-error">${$} is mandatory</p>`).join(""):"";return`
      <h3>MEA – ${c.MEA.name}</h3>
      <code>${r}</code>
      ${f}
      <p><strong>Purpose (MEA010):</strong> ${n||"<em>N/A</em>"}${d?` (${d})`:""}</p>
      <p><strong>Qualifier (MEA020-1):</strong> ${t||"<em>N/A</em>"}${l?` (${l})`:""}</p>
      <p><strong>Value (MEA020-2):</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>Unit (MEA020-3):</strong> ${i||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderMEA error:",n),`
      <h3>MEA – ${c.MEA.name}</h3>
      <p class="edi-error">Error rendering MEA: ${n.message}</p>
      <code>${r}</code>
    `}}function J(r,e){try{console.log("renderUNS input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",t=(c.UNS.fields??{})[n]||"",s=[];n||s.push("UNS010 Section identification");const i=s.length?s.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"",a=n&&!t?`<p class="edi-error">Unknown section identification code: ${n}</p>`:"";return`
      <h3>UNS – ${c.UNS.name}</h3>
      <code>${r}</code>
      ${i}
      ${a}
      <p>
        <strong>Section identification (UNS010):</strong>
        ${n||"<em>N/A</em>"}
        ${t?` (${t})`:""}
      </p>
    `}catch(n){return console.error("renderUNS error:",n),`
      <h3>UNS – ${c.UNS.name}</h3>
      <p class="edi-error">Error rendering UNS: ${n.message}</p>
      <code>${r}</code>
    `}}function ee(r,e){try{console.log("renderUNT input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",t=[];n||t.push("UNT010 Number of segments"),o||t.push("UNT020 Message reference number");const s=t.length?t.map(i=>`<p class="edi-error">${i} is mandatory</p>`).join(""):"";return`
      <h3>UNT – ${c.UNT.name}</h3>
      <code>${r}</code>
      ${s}
      <p><strong>Number of segments (UNT010):</strong> ${n||"<em>N/A</em>"}</p>
      <p><strong>Message reference number (UNT020):</strong> ${o||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderUNT error:",n),`
      <h3>UNT – ${c.UNT.name}</h3>
      <p class="edi-error">Error rendering UNT: ${n.message}</p>
      <code>${r}</code>
    `}}function ne(r,e){try{console.log("renderUNZ input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",t=[];n||t.push("Number of messages"),o||t.push("Interchange control reference");const s=t.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${t.join(", ")}</p>`:"",i=n&&!/^\d+$/.test(n)?`<p style="color:red"><strong>Invalid message count (not a number):</strong> ${n}</p>`:"";return`
      <h3>UNZ - ${c.UNZ.name}</h3>
      <code>${r}</code>
      ${s}
      ${i}
      <p>
        <strong>Number of messages:</strong>
        ${n||"<em>N/A</em>"}
      </p>
      <p>
        <strong>Interchange control reference:</strong>
        ${o||"<em>N/A</em>"}
      </p>
    `}catch(n){return console.error("renderUNZ error:",n),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.UNZ.name}</h3>
        <p style="color:red"><strong>Error rendering UNZ:</strong> ${n.message}</p>
        <code>${r}</code>
      </div>
    `}}function re(r,e){try{console.log("renderTAX input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",s=(e[4]??"").split(":")[3]??"",i=c.TAX.fields??{},a=i[n]||"",d=i[o]||"",l=[];n||l.push("TAX010 Duty/tax/fee function qualifier"),o||l.push("TAX020 Duty/tax/fee type, coded"),s||l.push("TAX050 Duty/tax/fee rate");const m=l.length?l.map(f=>`<p class="edi-error">${f} is mandatory</p>`).join(""):"";return`
      <h3>TAX – ${c.TAX.name}</h3>
      <code>${r}</code>
      ${m}
      <p>
        <strong>Duty/tax/fee function qualifier (TAX010):</strong>
        ${n||"<em>N/A</em>"}
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
    `}catch(n){return console.error("renderTAX error:",n),`
      <h3>TAX – ${c.TAX.name}</h3>
      <p class="edi-error">Error rendering TAX: ${n.message}</p>
      <code>${r}</code>
    `}}function te(r,e){try{console.log("renderMOA input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.MOA.fields??{})[o]||"",a=[];o||a.push("Amount qualifier"),t||a.push("Amount value");const d=a.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${a.join(", ")}</p>`:"",l=o&&!i?`<p style="color:red"><strong>Unknown qualifier code:</strong> ${o}</p>`:"";return`
      <h3>${c.MOA.name}</h3>
      <code>${r}</code>
      ${d}
      ${l}
      <p>
        <strong>Qualifier:</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p><strong>Amount:</strong> €${t||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderMOA error:",n),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.MOA.name}</h3>
        <p style="color:red"><strong>Error rendering MOA:</strong> ${n.message}</p>
        <code>${r}</code>
      </div>
    `}}function oe(r,e){try{console.log("renderCNT input:",{segment:r,parts:e}),e=e||[];const[n="",o=""]=(e[0]??"").split(":"),s=(c.CNT.fields??{})[n]||"",i=[];n||i.push("CNT010 Control qualifier"),o||i.push("CNT020 Control value");const a=i.length?i.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"",d=n&&!s?`<p class="edi-error">Unknown qualifier code: ${n}</p>`:"";return`
      <h3>CNT – ${c.CNT.name}</h3>
      <code>${r}</code>
      ${a}
      ${d}
      <p>
        <strong>Qualifier (CNT010):</strong>
        ${n||"<em>N/A</em>"}
        ${s?` (${s})`:""}
      </p>
      <p><strong>Count (CNT020):</strong> ${o||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderCNT error:",n),`
      <h3>CNT – ${c.CNT.name}</h3>
      <p class="edi-error">Error rendering CNT: ${n.message}</p>
      <code>${r}</code>
    `}}function se(r,e){try{console.log("renderPCI input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.PCI.fields??{})[o]||"",a=[];o||a.push("PCI010 Identification qualifier"),t||a.push("PCI020 Identification number");const d=a.length?a.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"";return`
      <h3>PCI – ${c.PCI.name}</h3>
      <code>${r}</code>
      ${d}
      <p>
        <strong>Qualifier (PCI010):</strong>
        ${o||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p><strong>Identification (PCI020):</strong> ${t||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderPCI error:",n),`
      <h3>PCI – ${c.PCI.name}</h3>
      <p class="edi-error">Error rendering PCI: ${n.message}</p>
      <code>${r}</code>
    `}}function ie(r,e){try{console.log("renderGIN input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e.slice(1).filter(m=>!!m),i=(c.GIN.fields??{})[n]||"",a=[];n||a.push("GIN010 Identity qualifier"),o.length===0&&a.push("GIN020 Identity number");const d=a.length?a.map(m=>`<p class="edi-error">${m} is mandatory</p>`).join(""):"",l=n&&!i?`<p class="edi-error">Unknown qualifier code: ${n}</p>`:"";return`
      <h3>GIN – ${c.GIN.name}</h3>
      <code>${r}</code>
      ${d}
      ${l}
      <p>
        <strong>Qualifier (GIN010):</strong>
        ${n||"<em>N/A</em>"}
        ${i?` (${i})`:""}
      </p>
      <p>
        <strong>Identity number${o.length>1?"s":""} (GIN020):</strong>
        ${o.length?o.join(", "):"<em>N/A</em>"}
      </p>
    `}catch(n){return console.error("renderGIN error:",n),`
      <h3>GIN – ${c.GIN.name}</h3>
      <p class="edi-error">Error rendering GIN: ${n.message}</p>
      <code>${r}</code>
    `}}function ae(r,e,n){var i;const o=r.split("+")[0],t=(i=c[o])==null?void 0:i.name,s=document.createElement("div");s.className="segment",s.innerHTML=`
    <h3>⚠️ ${t?`${o} – ${t}`:`Unknown segment (${o})`}</h3>
    <code>${r}</code>
    <p>${t?"No renderer implemented yet, but the segment name is known":"This segment is not recognized or supported yet."}</p>
  `,n.appendChild(s)}const ce=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"DTM",condition:r=>r.some(e=>e.includes("DTM+2:"))},{segment:"NAD",mandatory:!0},{segment:"CUX",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"PRI",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function T(r,e){const n=r.map(t=>t.split("+")[0]),o=[];for(const t of e)(t.mandatory||(t.condition?t.condition(r):!1))&&!n.includes(t.segment)&&o.push(t.segment);return{valid:o.length===0,missing:o}}function de(r){const e=T(r,ce);return e.valid||console.warn("ORDERS validation failed. Missing segments:",e.missing),e}const le=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"RFF",mandatory:!0},{segment:"NAD",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",condition:r=>r.some(e=>e.startsWith("LIN+5"))},{segment:"QTY",condition:r=>r.some(e=>e.startsWith("LIN+6"))},{segment:"QTY",condition:r=>r.some(e=>e.startsWith("LIN+2"))},{segment:"DTM",condition:r=>r.some(e=>e.startsWith("LIN+5"))&&r.some(e=>e.startsWith("DTM+67:"))},{segment:"DTM",condition:r=>r.some(e=>e.startsWith("LIN+6"))&&r.some(e=>e.startsWith("DTM+506:"))},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function me(r){const e=T(r,le);return r.filter(o=>o.startsWith("LIN+")).length<1&&(e.valid=!1,e.missing.push("Minimaal 1 LIN-segment vereist")),e}const ue=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0,condition:r=>r.some(e=>e.startsWith("DTM+137:"))},{segment:"DTM",mandatory:!0,condition:r=>r.some(e=>e.startsWith("DTM+132:"))},{segment:"DTM",condition:r=>r.some(e=>e.startsWith("DTM+11:"))},{segment:"RFF",mandatory:!0,condition:r=>r.some(e=>e.startsWith("RFF+ON:"))},{segment:"NAD",mandatory:!0},{segment:"CPS",mandatory:!0},{segment:"PAC",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}];function pe(r){const e=T(r,ue);return e.valid||console.warn("DESADV validation failed. Missing segments:",e.missing),e}const ge=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"DTM",condition:r=>r.some(e=>e.startsWith("DTM+171:"))},{segment:"RFF",mandatory:!0},{segment:"RFF",condition:r=>r.some(e=>e.startsWith("RFF+DQ:"))},{segment:"NAD",mandatory:!0},{segment:"CUX",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"PIA",mandatory:!0},{segment:"IMD",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"MOA",mandatory:!0},{segment:"PRI",mandatory:!0},{segment:"TAX",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"MOA",mandatory:!0},{segment:"TAX",mandatory:!0},{segment:"UNT",mandatory:!0}];function fe(r){const e=T(r,ge);return e.valid||console.warn("INVOIC validation failed. Missing segments:",e.missing),e}const U={220:"ORDERS",231:"ORDRSP",351:"INVOIC",DESADV:"DESADV"};function $e(r){var s;const e=r.find(i=>i.startsWith("UNH+"));if(!e)return null;const o=(s=e.split("+")[2])==null?void 0:s.split(":"),t=o==null?void 0:o[0];return U[t??""]??t??null}function he(r){const e=$e(r);if(!e)return{valid:!1,missing:["⚠️ Kan berichttype niet detecteren"],type:null};let n;switch(e){case"ORDERS":n=de(r);break;case"ORDRSP":n=me(r);break;case"DESADV":n=pe(r);break;case"INVOIC":n=fe(r);break;default:return{valid:!1,missing:["⚠️ Onbekend berichttype"],type:e}}return{valid:n.valid,missing:n.missing,type:e}}function D(){var h,N;const r=k(),e=E(),o=R().checked,t=H(r.value);e.innerHTML="";let s={};const i=[];let a="";for(const u of t){const[A,...p]=u.split("+"),v=c[A];if(A==="LIN"&&(s.lineNumber&&s.ean&&s.quantity&&i.push(s),s={}),!v&&!o)continue;const I=document.createElement("div");I.className="segment";let g="",P=!0;switch(A){case"UNB":g=q(u,p);break;case"UNH":g=B(u,p),a=((h=p[1])==null?void 0:h.split(":")[0])??"";break;case"BGM":g=x(u,p),a=a||((N=p[0])==null?void 0:N.split(":")[0])||"";break;case"DTM":g=G(u,p);break;case"NAD":g=O(u,p);break;case"RFF":g=X(u,p);break;case"LIN":{const{html:C,product:y}=V(u,p);g=C,s=y;break}case"QTY":{const{html:C,quantity:y}=j(u,p);g=C,y&&(s.quantity=y);break}case"PRI":{const{html:C,price:y}=Y(u,p);g=C,y&&(s.price=y);break}case"CUX":g=W(u,p);break;case"PIA":g=Z(u,p);break;case"PAC":g=K(u,p);break;case"CPS":g=_(u,p);break;case"MEA":g=z(u,p);break;case"UNS":g=J(u,p);break;case"UNT":g=ee(u,p);break;case"UNZ":g=ne(u,p);break;case"TAX":g=re(u,p);break;case"MOA":g=te(u,p);break;case"CNT":g=oe(u,p);break;case"GIN":g=ie(u,p);break;case"PCI":g=se(u,p);break;default:o&&ae(u,p,e),P=!1;break}P&&(I.innerHTML=g,e.appendChild(I))}s.lineNumber&&s.ean&&s.quantity&&i.push(s);const{valid:d,missing:l,type:m}=he(t),f=U[m??""]??m??"Onbekend",$=document.createElement("div");$.className=`validation-box ${d?"success":"error"}`,$.innerHTML=`
    <div>
      <p><strong>${d?`✅ Berichttype ${f} is volledig en correct.`:`❌ Berichttype ${f} bevat fouten of ontbrekende segmenten:`}</strong></p>
      ${d?"":`<ul>${l.map(u=>`<li>${u}</li>`).join("")}</ul>`}
    </div>
  `,e.prepend($),L(i,e)}const{textarea:Ne,toggleCheckbox:ye}=S();Ne.addEventListener("input",D);ye.addEventListener("change",D);D();
