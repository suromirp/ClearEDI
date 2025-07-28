(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();let U,E,F,k;function q(r,e,n,o){U=r,E=e,F=n,k=o}function B(){return U}function H(){return E}function Q(){return F}function L(){return k}function O(){const r=document.createElement("textarea");r.placeholder="Plak hier je EDI-bericht...";const e=document.createElement("div");e.className="error-count";const n=document.createElement("div");n.className="toggle-row";const o=document.createElement("label");o.className="toggle-unknowns";const t=document.createElement("input");t.type="checkbox",t.checked=!1,o.appendChild(t),o.appendChild(document.createTextNode(" Toon onbekende segmenten en codes"));const s=document.createElement("div");s.className="button-row";const i=document.createElement("button");i.className="paste-button",i.textContent="Paste",i.type="button";const a=document.createElement("button");a.className="reset-button",a.textContent="Reset",a.type="button";const l=document.createElement("div");return l.className="edi-output",i.addEventListener("click",async()=>{try{const d=await navigator.clipboard.readText();r.value=d,l.innerHTML="",r.dispatchEvent(new Event("input",{bubbles:!0}))}catch(d){alert("Klembordinhoud kan niet worden geplakt. Geef toestemming of gebruik een veilige browser."),console.error("Clipboard error:",d)}}),a.addEventListener("click",()=>{r.value="",l.innerHTML=""}),document.body.appendChild(e),s.appendChild(i),s.appendChild(a),document.body.appendChild(n),document.body.appendChild(r),document.body.appendChild(s),document.body.appendChild(l),q(r,l,t,e),{textarea:r,toggleCheckbox:t}}function x(r){return r.split(/'/).map(e=>e.trim()).filter(Boolean)}function G(r,e){if(r.length===0)return;const n=["12","182","83"],o=document.createElement("table");o.className="product-table",o.innerHTML=`
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
      ${n.map(t=>{const s=r.filter(i=>i.qtyCode===t);return s.length===0?"":`
          <tr><td colspan="4"><strong>QTY+${t} ${X(t)}</strong></td></tr>
          ${s.map(i=>`
            <tr>
              <td>${i.lineNumber}</td>
              <td>${i.ean}</td>
              <td>${i.quantity}</td>
              <td>${i.price?"€"+i.price:""}</td>
            </tr>
          `).join("")}
        `}).join("")}
      ${r.filter(t=>!n.includes(t.qtyCode||"")).map(t=>`
          <tr>
            <td>${t.lineNumber}</td>
            <td>${t.ean}</td>
            <td>${t.quantity}</td>
            <td>${t.price?"€"+t.price:""}</td>
          </tr>
        `).join("")}
    </tbody>
  `,e.appendChild(o)}function X(r){switch(r){case"12":return"(Accepted)";case"182":return"(Cancelled)";case"83":return"(Backorder)";default:return""}}const R={ORDERS:{BGM:{220:"Order"},QTY:{21:"Ordered quantity"},DTM:{137:"Document/message date/time",2:"Requested delivery date/time"},RFF:{ADE:"Account number",VA:"VAT registration number"},CUX:{2:"Reference currency",9:"Order currency"},LIN:{EN:"International Article Numbering Association (EAN)",2:"Cancelled",5:"Accepted without amendment",6:"Accepted with amendment"},PRI:{AAA:"Calculation net (the price stated is the net price including allowances/charges)"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"}},ORDRSP:{BGM:{231:"Purchase order response",9:"original",4:"Change",29:"Accepted without amendment"},QTY:{12:"Confirmed quantity",182:"Cancelled quantity",83:"Backorder quantity"},CUX:{2:"Reference currency",EUR:"Euro",9:"Order currency",__expected__:"2:EUR:9"},DTM:{137:"Document/message date/time",171:"Order date/time",67:"Confirmed delivery date/time",506:"Backorder delivery date/time"},RFF:{ON:"Order number"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party"}},DESADV:{BGM:{351:"Despatch advice"},QTY:{12:"Confirmed quantity",182:"Cancelled quantity",83:"Backorder quantity"},DTM:{137:"Document/message date/time",11:"Despatch date and/or time, actual",132:"Arrival date/time, estimated",361:"Best before date"},RFF:{BM:"Bill of loading number",ON:"Order number (purchase)"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",CA:"Carrier"},CPS:{},PAC:{52:"Packaging details code"},PCI:{"33E":"SSCC label"},GIN:{BN:"Serial number",BX:"Batch number"},PIA:{5:"Additional product identification",SA:"Supplier's article number"},LIN:{EN:"International Article Numbering Association (EAN)"},PRI:{AAA:"Calculation net"}},INVOIC:{BGM:{380:"Commercial invoice",381:"Credit note"},QTY:{47:"Invoiced quantity"},MOA:{203:"Line item amount",8:"Charge/Allowance amount"},PRI:{AAA:"Calculation net",AAB:"Calculation gross",CT:"Contract"},RFF:{ON:"Order number"},NAD:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"}}};function u(r,e){var a;const[n]=r.split("+"),o=(e==null?void 0:e.messageType)??"UNKNOWN",t=(a=R[o])==null?void 0:a[n],s=t==null?void 0:t.__expected__;if(!t||!s)return!0;if(r.replace(`${n}+`,"")!==s){const[l,d,m]=s.split(":");return`Invalid ${n} segment: received '${r}', expected '${n}+${s}'.
Explanation:
- ${l} = ${t[l]??"(unknown)"}
- ${d} = ${t[d]??"(unknown)"}
- ${m} = ${t[m]??"(unknown)"}`}return!0}const Y=[{segment:"UNH",mandatory:!0,validate:u},{segment:"BGM",mandatory:!0,validate:u},{segment:"DTM",mandatory:!0,validate:u},{segment:"CUX",mandatory:!0,validate:u},{segment:"RFF",mandatory:!0,validate:u},{segment:"NAD",mandatory:!0,validate:u},{segment:"LIN",mandatory:!0},{segment:"QTY",condition:r=>r.some(e=>e.startsWith("LIN+5"))},{segment:"QTY",condition:r=>r.some(e=>e.startsWith("LIN+6"))},{segment:"QTY",condition:r=>r.some(e=>e.startsWith("LIN+2"))},{segment:"DTM",condition:r=>r.some(e=>e.startsWith("LIN+5"))&&r.some(e=>e.startsWith("DTM+67:"))},{segment:"DTM",condition:r=>r.some(e=>e.startsWith("LIN+6"))&&r.some(e=>e.startsWith("DTM+506:"))},{segment:"UNS",mandatory:!0,validate:u},{segment:"CNT",mandatory:!0,validate:u},{segment:"UNT",mandatory:!0,validate:u}],j=[{segment:"UNH",mandatory:!0,validate:u},{segment:"BGM",mandatory:!0,validate:u},{segment:"DTM",mandatory:!0,validate:u},{segment:"RFF",mandatory:!0,validate:u},{segment:"NAD",mandatory:!0,validate:u},{segment:"CPS",mandatory:!0,validate:u},{segment:"PAC",mandatory:!0,validate:u},{segment:"LIN",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"UNS",mandatory:!1,validate:u},{segment:"CNT",mandatory:!0,validate:u},{segment:"UNT",mandatory:!0,validate:u}],V=[{segment:"UNH",mandatory:!0,validate:u},{segment:"BGM",mandatory:!0,validate:u},{segment:"DTM",mandatory:!0,validate:u},{segment:"RFF",mandatory:!0,validate:u},{segment:"NAD",mandatory:!0,validate:u},{segment:"CUX",mandatory:!0,validate:u},{segment:"LIN",mandatory:!0},{segment:"PIA",mandatory:!0,validate:u},{segment:"IMD",mandatory:!0},{segment:"QTY",mandatory:!0,validate:u},{segment:"MOA",mandatory:!0,validate:u},{segment:"PRI",mandatory:!0,validate:u},{segment:"TAX",mandatory:!0,validate:u},{segment:"UNS",mandatory:!0,validate:u},{segment:"MOA",mandatory:!0,validate:u},{segment:"TAX",mandatory:!0,validate:u},{segment:"UNT",mandatory:!0,validate:u}],Z=[{segment:"UNH",mandatory:!0},{segment:"BGM",mandatory:!0},{segment:"DTM",mandatory:!0},{segment:"DTM",condition:r=>r.some(e=>e.includes("DTM+2:"))},{segment:"NAD",mandatory:!0},{segment:"CUX",mandatory:!0},{segment:"LIN",mandatory:!0},{segment:"QTY",mandatory:!0},{segment:"PRI",mandatory:!0},{segment:"UNS",mandatory:!0},{segment:"CNT",mandatory:!0},{segment:"UNT",mandatory:!0}],W={ORDRSP:Y,DESADV:j,INVOIC:V,ORDERS:Z};function _(r){var o;const e=r.find(t=>t.startsWith("UNH+"));return((o=e==null?void 0:e.split("+")[2])==null?void 0:o.split(":")[0])??"UNKNOWN"}function K(r){var s;const e=_(r),n=W[e]??[],o=r.map(i=>i.split("+")[0]),t=[];for(const i of n){const a=o.includes(i.segment);(i.mandatory??((s=i.condition)==null?void 0:s.call(i,r)))&&!a&&t.push(i.segment)}return{valid:t.length===0,missing:t,type:e}}const z={220:"ORDERS",231:"ORDRSP",351:"INVOIC",DESADV:"DESADV"},c={UNB:{name:"Interchange Header"},UNZ:{name:"Interchange trailer",fields:{UNZ010:"Number of messages",UNZ020:"Interchange control reference"}},UNH:{name:"Message Header"},UNT:{name:"Message Trailer"},BGM:{name:"Beginning of Message",fields:{220:"Order",231:"Purchase order response",351:"Despatch advice",380:"Commercial invoice",381:"Credit note",9:"Original",4:"Change",29:"Accepted without amendment"}},DTM:{name:"Date/Time/Period",fields:{137:"Document/message date/time",2:"Requested delivery date/time",11:"Despatch date and/or time",132:"Arrival date/time, estimated",171:"Order date/time",67:"Confirmed delivery date/time",506:"Backorder delivery date/time",102:"CCYYMMDD (format qualifier)"}},RFF:{name:"Reference",fields:{ON:"Order number",ADE:"Account number",BM:"Bill of lading number",IV:"Invoice number",DQ:"Delivery note number",VA:"VAT registration number"}},NAD:{name:"Name and address",fields:{BY:"Buyer",SU:"Supplier",DP:"Delivery party",IV:"Invoicee"},countries:{NL:"Netherlands",DE:"Germany",FR:"France",BE:"Belgium"}},CUX:{name:"Currency Details",fields:{2:"Reference currency",9:"Order currency",4:"Invoicing currency"},currencies:{EUR:"Euro"}},LIN:{name:"Line Item",fields:{2:"Cancelled",5:"Accepted without amendment",6:"Accepted with amendment",EN:"International Article Numbering Association (EAN)"}},PIA:{name:"Additional product ID",fields:{1:"Additional identification",5:"Buyers item number"},codeLists:{SA:"Supplier’s article number",IN:"Buyer’s item number"}},QTY:{name:"Quantity",fields:{21:"Ordered quantity",12:"Confirmed/despatched quantity",47:"Invoiced quantity",182:"Cancelled quantity",83:"Backorder quantity"}},PRI:{name:"Price",fields:{AAA:"Calculation net",AAB:"Calculation gross"}},TAX:{name:"Tax",fields:{7:"Tax",VAT:"Value added tax",S:"Standard rate",Z:"Zero rated goods",E:"Exempt from tax"}},FTX:{name:"Free Text",fields:{AAI:"General information",1:"Text for subsequent use"}},PAT:{name:"Payment Terms",fields:{1:"Basic",5:"Date of invoice",D:"Day"}},PCD:{name:"Percentage Details",fields:{7:"Percentage of invoice",13:"Invoice value"}},ALC:{name:"Allowance/Charge",fields:{A:"Allowance",C:"Charge",FC:"Freight Charge",TD:"Trade Discount"}},IMD:{name:"Item Description",fields:{F:"Free-form",81:"Title"}},MOA:{name:"Monetary Amount",fields:{203:"Line item amount",8:"Charge/Allowance amount"}},TDT:{name:"Details of Transport",fields:{8067:"Transport mode coded",31:"Truck"}},CPS:{name:"Consignment Packing Sequence"},PAC:{name:"Packaging",fields:{52:"Barcoded package"}},MEA:{name:"Measurements",fields:{PD:"Physical dimensions",KGM:"Kilogram"}},HAN:{name:"Handling Instructions"},PCI:{name:"Package Identification",fields:{"33E":"SSCC label"}},GIN:{name:"Goods Identity Number",fields:{BJ:"Batch number"}},UNS:{name:"Section control",fields:{S:"Start of detail section",D:"Start of summary section"}},CNT:{name:"Control total",fields:{2:"Number of line items in message"}}};function J(r){const e=r.slice(0,4),n=r.slice(4,6),o=r.slice(6,8);return new Date(`${e}-${n}-${o}`).toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})}function ee(r,e){try{console.log("renderUNB input:",{segment:r,parts:e}),e=e||[];const[n,o="",t="",s=""]=e,[i,a]=o.split(":"),[l,d]=t.split(":"),[m="",p=""]=s.split(":");let h=m;/^\d{6}$/.test(m)&&(h=J("20"+m));const N=p.length===4?`${p.slice(0,2)}:${p.slice(2,4)}`:"",y=[];i||y.push("Sender identification (parts[1])"),l||y.push("Recipient identification (parts[2])"),m||y.push("Interchange date (parts[3])");const C=y.length?`<div>${y.map(I=>`<p class="edi-error">${I} is mandatory</p>`).join("")}</div>`:"";return`
      <h3>UNB – ${c.UNB.name}</h3>
      <code>${r}</code>
      ${C}
      <p><strong>Sender:</strong> ${i||"<em>N/A</em>"}${a?` (${a})`:""}</p>
      <p><strong>Recipient:</strong> ${l||"<em>N/A</em>"}${d?` (${d})`:""}</p>
      <p><strong>Date:</strong> ${h||"<em>N/A</em>"}</p>
      <p><strong>Time:</strong> ${N||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderUNB error:",n),`
      <h3>UNB – ${c.UNB.name}</h3>
      <p class="edi-error">Error rendering UNB: ${n.message}</p>
      <code>${r}</code>
    `}}function ne(r,e){try{console.log("renderUNH input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t="",s="",i=""]=(e[1]??"").split(":"),a=[];n||a.push("Message reference"),o||a.push("Message type"),t||a.push("Version"),s||a.push("Release"),i||a.push("Agency");const l=a.length?a.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"";return`
      <h3>UNH – ${c.UNH.name}</h3>
      <code>${r}</code>
      ${l}
      <p><strong>Message reference:</strong> ${n||"<em>n.v.t.</em>"}</p>
      <p><strong>Type:</strong> ${o||"<em>n.v.t.</em>"}</p>
      <p><strong>Version:</strong> ${t||"<em>n.v.t.</em>"}</p>
      <p><strong>Release:</strong> ${s||"<em>n.v.t.</em>"}</p>
      <p><strong>Agency:</strong> ${i||"<em>n.v.t.</em>"}</p>
    `}catch(n){return console.error("renderUNH error:",n),`
      <h3>UNH – ${c.UNH.name}</h3>
      <p class="edi-error">Error rendering UNH: ${n.message}</p>
      <code>${r}</code>
    `}}function te(r,e){try{console.log("renderBGM input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",t=e[2]??"",i=(c.BGM.fields??{})[t]||"",a=[];n||a.push("BGM001 Document/message name (C002) is mandatory"),o||a.push("BGM002 Document number is mandatory"),t||a.push("BGM003 Message function code is mandatory");const l=a.length?`<div class="edi-error">${a.map(d=>`<p>${d}</p>`).join("")}</div>`:"";return`
      <h3>BGM – ${c.BGM.name}</h3>
      <code>${r}</code>
      ${l}
      <p><strong>Document code:</strong> ${n||"<em>N/A</em>"}</p>
      <p><strong>Document number:</strong> ${o||"<em>N/A</em>"}</p>
      <p><strong>Message function:</strong> ${t||"<em>N/A</em>"}${i?` (${i})`:""}</p>
    `}catch(n){return console.error("renderBGM error:",n),`
      <div class="edi-error">
        <h3>BGM – ${c.BGM.name}</h3>
        <p>Error rendering BGM: ${n.message}</p>
      </div>
      <code>${r}</code>
    `}}function re(r,e){try{console.log("renderDTM input:",{segment:r,parts:e}),e=e||[];const[n=""]=e,[o="",t="",s=""]=n.split(":"),a=(c.DTM.fields??{})[o]||"";let l=t;s==="102"&&/^\d{8}$/.test(t)?l=`${t.slice(6,8)}-${t.slice(4,6)}-${t.slice(0,4)}`:s==="203"&&/^\d{10}$/.test(t)&&(l=`${t.slice(6,8)}-${t.slice(4,6)}-${t.slice(0,4)} ${t.slice(8,10)}:00`);const d=[];o||d.push("DTM010 Qualifier"),t||d.push("DTM020 Date/time value");const m=d.length?d.map(p=>`<p class="edi-error">${p} is mandatory</p>`).join(""):"";return`
      <h3>DTM – ${c.DTM.name}</h3>
      <code>${r}</code>
      ${m}
      <p><strong>Qualifier:</strong> ${o||"<em>N/A</em>"}${a?` (${a})`:""}</p>
      <p><strong>Date:</strong> ${l||"<em>N/A</em>"}</p>
      <p><strong>Format code:</strong> ${s||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderDTM error:",n),`
      <h3>DTM – ${c.DTM.name}</h3>
      <p class="edi-error">Error rendering DTM: ${n.message}</p>
      <code>${r}</code>
    `}}function oe(r,e){try{console.log("renderNAD input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",t=e[3]??"",s=e[4]??"",i=e[5]??"",a=e[7]??"",l=e[8]??"",m=(c.NAD.fields??{})[n]||"",h=(c.NAD.countries??{})[l]||"",N=[];n||N.push("NAD010 Party qualifier"),o||N.push("NAD020 Party identification");const y=N.length?N.map(C=>`<p class="edi-error">${C} is mandatory</p>`).join(""):"";return`
      <h3>NAD – ${c.NAD.name}</h3>
      <code>${r}</code>
      ${y}
      <p><strong>Function (NAD010):</strong> ${n||"<em>N/A</em>"}${m?` (${m})`:""}</p>
      <p><strong>Identification (NAD020):</strong> ${o||"<em>N/A</em>"}</p>
      <p><strong>Name (NAD040):</strong> ${t||"<em>N/A</em>"}</p>
      <p><strong>Street:</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>City:</strong> ${i||"<em>N/A</em>"}</p>
      <p><strong>Postcode:</strong> ${a||"<em>N/A</em>"}</p>
      <p><strong>Country:</strong> ${l||"<em>N/A</em>"}${h?` (${h})`:""}</p>
    `}catch(n){return console.error("renderNAD error:",n),`
      <h3>NAD – ${c.NAD.name}</h3>
      <p class="edi-error">Error rendering NAD: ${n.message}</p>
      <code>${r}</code>
    `}}function se(r,e){try{console.log("renderRFF input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.RFF.fields??{})[o]||"",a=[];o||a.push("RFF010 Reference qualifier"),t||a.push("RFF020 Reference value");const l=a.length?a.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"";return`
      <h3>RFF – ${c.RFF.name}</h3>
      <code>${r}</code>
      ${l}
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
    `}}function ie(r,e){try{console.log("renderLIN input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[2]??"",[t="",s=""]=o.split(":"),i=[];n||i.push("LIN010 Line number"),t||i.push("LIN020 Item identification");const a=i.length?i.map(m=>`<p class="edi-error">${m} is mandatory</p>`).join(""):"";return{html:`
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
      `,product:null}}}function ae(r,e){try{console.log("renderQTY input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.QTY.fields??{})[o]||"",a=[];o||a.push("QTY010 Quantity qualifier"),t||a.push("QTY020 Quantity value");const l=a.length?a.map(p=>`<p class="edi-error">${p} is mandatory</p>`).join(""):"",d=o&&!i?`<p class="edi-error">Unknown qualifier code: ${o}</p>`:"";return{html:`
      <h3>QTY – ${c.QTY.name}</h3>
      <code>${r}</code>
      ${l}
      ${d}
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
      `,quantity:""}}}function ce(r,e){try{console.log("renderPRI input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=n.split(":"),[t="",s="",i="",a=""]=n.split(":"),d=(c.PRI.fields??{})[t]||"",m=isNaN(Number(s))?s:Number(s).toFixed(2),p=[];t||p.push("PRI010 Price qualifier"),s||p.push("PRI020 Price amount");const h=p.length?p.map(I=>`<p class="edi-error">${I} is mandatory</p>`).join(""):"",N=t&&!d?`<p class="edi-error">Unknown qualifier code: ${t}</p>`:"";let y="";return(o.length!==4||t!=="AAA"||i!=="CT"||a!=="NTP")&&(y=`<p class="edi-error">PRI must follow format: PRI+AAA:&lt;amount&gt;:CT:NTP'</p>`),{html:`
      <h3>PRI – ${c.PRI.name}</h3>
      <code>${r}</code>
      ${h}
      ${N}
      ${y}
      <p><strong>Qualifier (PRI010):</strong> ${t||"<em>N/A</em>"}${d?` (${d})`:""}</p>
      <p><strong>Amount (PRI020):</strong> ${m||"<em>N/A</em>"}</p>
    `,price:m}}catch(n){return console.error("renderPRI error:",n),{html:`
        <h3>PRI – ${c.PRI.name}</h3>
        <p class="edi-error">Error rendering PRI: ${n.message}</p>
        <code>${r}</code>
      `,price:""}}}function de(r,e){var n;try{console.log("renderCUX input:",{segment:r,parts:e}),e=e||[];let o="",t="",s="";e.length===1&&e[0].includes(":")?[o,t,s]=e[0].split(":"):(o=e[0]??"",[t,s]=((n=e[1])==null?void 0:n.split(":"))??["",""]);const i=c.CUX.fields||{},a=c.CUX.currencies||{},l=i[o]||"",d=a[t]||"",m=[];o||m.push("Currency qualifier"),t||m.push("Currency code"),s||m.push("Currency type");const p=m.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${m.join(", ")}</p>`:"",h=o&&!l?`<p style="color:red"><strong>Unknown qualifier code:</strong> ${o}</p>`:"",N=t&&!d?`<p style="color:red"><strong>Unknown currency code:</strong> ${t}</p>`:"";return`
      <h3>${c.CUX.name}</h3>
      <code>${r}</code>
      ${p}
      ${h}
      ${N}
      <p>
        <strong>Qualifier:</strong>
        ${o||"<em>N/A</em>"}
        ${l?` (${l})`:""}
      </p>
      <p>
        <strong>Currency:</strong>
        ${t||"<em>N/A</em>"}
        ${d?` (${d})`:""}
      </p>
      <p><strong>Type:</strong> ${s||"<em>N/A</em>"}</p>
    `}catch(o){return console.error("renderCUX error:",o),`
      <div style="border:1px solid red; padding:10px; background:#fee">
        <h3>${c.CUX.name}</h3>
        <p style="color:red"><strong>Error rendering CUX:</strong> ${o.message}</p>
        <code>${r}</code>
      </div>
    `}}function le(r,e){var n;try{console.log("renderPIA input:",{segment:r,parts:e}),e=e||[];const o=e[0]??"",[t="",s=""]=((n=e[1])==null?void 0:n.split(":"))??[],i=c.PIA.fields??{},a=c.PIA.codeLists??{},l=i[o]||"",d=a[s]||"",m=[];o||m.push("PIA010 function qualifier"),t||m.push("PIA020 item identification");const p=m.length?m.map(y=>`<p class="edi-error">${y} is mandatory</p>`).join(""):"",h=o&&!l?`<p class="edi-error">Unknown PIA010 qualifier: ${o}</p>`:"",N=s&&!d?`<p class="edi-error">Unknown PIA020 code list qualifier: ${s}</p>`:"";return`
      <h3>PIA – ${c.PIA.name}</h3>
      <code>${r}</code>
      ${p}
      ${h}
      ${N}
      <p>
        <strong>Function (PIA010):</strong>
        ${o||"<em>N/A</em>"}
        ${l?` (${l})`:""}
      </p>
      <p>
        <strong>Item identification (PIA020-1):</strong>
        ${t||"<em>N/A</em>"}
      </p>
      <p>
        <strong>Code list qualifier (PIA020-3):</strong>
        ${s||"<em>N/A</em>"}
        ${d?` (${d})`:""}
      </p>
    `}catch(o){return console.error("renderPIA error:",o),`
      <h3>PIA – ${c.PIA.name}</h3>
      <p class="edi-error">Error rendering PIA: ${o.message}</p>
      <code>${r}</code>
    `}}function me(r,e){try{console.log("renderPAC input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",t=(e[1]??"").split(":")[1]??"",s=e[2]??"",i=c.PAC.fields??{},a=i[t]||"",l=i[s]||"",d=[];n||d.push("PAC010 Number of packages is mandatory"),t||d.push("PAC020 Packaging details code is mandatory"),s||d.push("PAC030 Package type code is mandatory");const m=d.length?d.map(p=>`<p class="edi-error">${p}</p>`).join(""):"";return`
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
        ${l?` (${l})`:""}
      </p>
    `}catch(n){return console.error("renderPAC error:",n),`
      <h3>PAC – ${c.PAC.name}</h3>
      <p class="edi-error">Error rendering PAC: ${n.message}</p>
      <code>${r}</code>
    `}}function ue(r,e){try{console.log("renderCPS input:",{segment:r,parts:e}),e=e||[];const[n="",o=""]=e,t=[];n||t.push("CPS010 Hierarchical id");const s=t.length?t.map(i=>`<p class="edi-error">${i} is mandatory</p>`).join(""):"";return`
      <h3>CPS – ${c.CPS.name}</h3>
      <code>${r}</code>
      ${s}
      <p><strong>Hierarchical id (CPS010):</strong> ${n||"<em>n.v.t.</em>"}</p>
      <p><strong>Parent hierarchical id (CPS020):</strong> ${o||"<em>—</em>"}</p>
    `}catch(n){return console.error("renderCPS error:",n),`
      <h3>CPS – ${c.CPS.name}</h3>
      <p class="edi-error">Error rendering CPS: ${n.message}</p>
      <code>${r}</code>
    `}}function pe(r,e){try{console.log("renderMEA input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=(e[2]??"").split(":"),t=o[0]??"",s=o[1]??"",i=o[2]??"",a=c.MEA.fields??{},l=a[n]||"",d=a[t]||"",m=[];n||m.push("MEA010 Measurement purpose"),s||m.push("MEA020 Measurement value");const p=m.length?m.map(h=>`<p class="edi-error">${h} is mandatory</p>`).join(""):"";return`
      <h3>MEA – ${c.MEA.name}</h3>
      <code>${r}</code>
      ${p}
      <p><strong>Purpose (MEA010):</strong> ${n||"<em>N/A</em>"}${l?` (${l})`:""}</p>
      <p><strong>Qualifier (MEA020-1):</strong> ${t||"<em>N/A</em>"}${d?` (${d})`:""}</p>
      <p><strong>Value (MEA020-2):</strong> ${s||"<em>N/A</em>"}</p>
      <p><strong>Unit (MEA020-3):</strong> ${i||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderMEA error:",n),`
      <h3>MEA – ${c.MEA.name}</h3>
      <p class="edi-error">Error rendering MEA: ${n.message}</p>
      <code>${r}</code>
    `}}function ge(r,e){try{console.log("renderUNS input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",t=(c.UNS.fields??{})[n]||"",s=[];n||s.push("UNS010 Section identification");const i=s.length?s.map(l=>`<p class="edi-error">${l} is mandatory</p>`).join(""):"",a=n&&!t?`<p class="edi-error">Unknown section identification code: ${n}</p>`:"";return`
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
    `}}function $e(r,e){try{console.log("renderUNT input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",t=[];n||t.push("UNT010 Number of segments"),o||t.push("UNT020 Message reference number");const s=t.length?t.map(i=>`<p class="edi-error">${i} is mandatory</p>`).join(""):"";return`
      <h3>UNT – ${c.UNT.name}</h3>
      <code>${r}</code>
      ${s}
      <p><strong>Number of segments (UNT010):</strong> ${n||"<em>N/A</em>"}</p>
      <p><strong>Message reference number (UNT020):</strong> ${o||"<em>N/A</em>"}</p>
    `}catch(n){return console.error("renderUNT error:",n),`
      <h3>UNT – ${c.UNT.name}</h3>
      <p class="edi-error">Error rendering UNT: ${n.message}</p>
      <code>${r}</code>
    `}}function fe(r,e){try{console.log("renderUNZ input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",t=[];n||t.push("Number of messages"),o||t.push("Interchange control reference");const s=t.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${t.join(", ")}</p>`:"",i=n&&!/^\d+$/.test(n)?`<p style="color:red"><strong>Invalid message count (not a number):</strong> ${n}</p>`:"";return`
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
    `}}function he(r,e){try{console.log("renderTAX input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e[1]??"",s=(e[4]??"").split(":")[3]??"",i=c.TAX.fields??{},a=i[n]||"",l=i[o]||"",d=[];n||d.push("TAX010 Duty/tax/fee function qualifier"),o||d.push("TAX020 Duty/tax/fee type, coded"),s||d.push("TAX050 Duty/tax/fee rate");const m=d.length?d.map(p=>`<p class="edi-error">${p} is mandatory</p>`).join(""):"";return`
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
        ${l?` (${l})`:""}
      </p>
      <p>
        <strong>Duty/tax/fee rate (TAX050):</strong>
        ${s||"<em>N/A</em>"}
      </p>
    `}catch(n){return console.error("renderTAX error:",n),`
      <h3>TAX – ${c.TAX.name}</h3>
      <p class="edi-error">Error rendering TAX: ${n.message}</p>
      <code>${r}</code>
    `}}function Ne(r,e){try{console.log("renderMOA input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.MOA.fields??{})[o]||"",a=[];o||a.push("Amount qualifier"),t||a.push("Amount value");const l=a.length?`<p style="color:red"><strong>Missing mandatory fields:</strong> ${a.join(", ")}</p>`:"",d=o&&!i?`<p style="color:red"><strong>Unknown qualifier code:</strong> ${o}</p>`:"";return`
      <h3>${c.MOA.name}</h3>
      <code>${r}</code>
      ${l}
      ${d}
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
    `}}function ye(r,e){try{console.log("renderCNT input:",{segment:r,parts:e}),e=e||[];const[n="",o=""]=(e[0]??"").split(":"),s=(c.CNT.fields??{})[n]||"",i=[];n||i.push("CNT010 Control qualifier"),o||i.push("CNT020 Control value");const a=i.length?i.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"",l=n&&!s?`<p class="edi-error">Unknown qualifier code: ${n}</p>`:"";return`
      <h3>CNT – ${c.CNT.name}</h3>
      <code>${r}</code>
      ${a}
      ${l}
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
    `}}function Ae(r,e){try{console.log("renderPCI input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",[o="",t=""]=n.split(":"),i=(c.PCI.fields??{})[o]||"",a=[];o||a.push("PCI010 Identification qualifier"),t||a.push("PCI020 Identification number");const l=a.length?a.map(d=>`<p class="edi-error">${d} is mandatory</p>`).join(""):"";return`
      <h3>PCI – ${c.PCI.name}</h3>
      <code>${r}</code>
      ${l}
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
    `}}function Ce(r,e){try{console.log("renderGIN input:",{segment:r,parts:e}),e=e||[];const n=e[0]??"",o=e.slice(1).filter(m=>!!m),i=(c.GIN.fields??{})[n]||"",a=[];n||a.push("GIN010 Identity qualifier"),o.length===0&&a.push("GIN020 Identity number");const l=a.length?a.map(m=>`<p class="edi-error">${m} is mandatory</p>`).join(""):"",d=n&&!i?`<p class="edi-error">Unknown qualifier code: ${n}</p>`:"";return`
      <h3>GIN – ${c.GIN.name}</h3>
      <code>${r}</code>
      ${l}
      ${d}
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
    `}}function Te(r,e,n){var i;const o=r.split("+")[0],t=(i=c[o])==null?void 0:i.name,s=document.createElement("div");s.className="segment",s.innerHTML=`
    <h3>⚠️ ${t?`${o} – ${t}`:`Unknown segment (${o})`}</h3>
    <code>${r}</code>
    <p>${t?"No renderer implemented yet, but the segment name is known":"This segment is not recognized or supported yet."}</p>
  `,n.appendChild(s)}function v(){var y,C,I,M;const r=B(),e=H(),o=Q().checked,t=x(r.value);e.innerHTML="";let s={};const i=[];let a="";for(const g of t){const[D,...$]=g.split("+"),S=c[D];if(D==="LIN"&&(s.lineNumber&&s.ean&&s.quantity&&i.push(s),s={}),!S&&!o)continue;const P=document.createElement("div");P.className="segment";let f="",w=!0;switch(D){case"UNB":f=ee(g,$);break;case"UNH":f=ne(g,$),a=((y=$[1])==null?void 0:y.split(":")[0])??"";break;case"BGM":f=te(g,$),a=(a||((C=$[0])==null?void 0:C.split(":")[0]))??"";break;case"DTM":f=re(g,$);break;case"NAD":f=oe(g,$);break;case"RFF":f=se(g,$);break;case"LIN":{const{html:A,product:T}=ie(g,$);f=A,s=T;break}case"QTY":{const{html:A,quantity:T}=ae(g,$);f=A,T&&(s.quantity=T);break}case"PRI":{const{html:A,price:T}=ce(g,$);f=A,T&&(s.price=T);break}case"CUX":f=de(g,$);break;case"PIA":f=le(g,$);break;case"PAC":f=me(g,$);break;case"CPS":f=ue(g,$);break;case"MEA":f=pe(g,$);break;case"UNS":f=ge(g,$);break;case"UNT":f=$e(g,$);break;case"UNZ":f=fe(g,$);break;case"TAX":f=he(g,$);break;case"MOA":f=Ne(g,$);break;case"CNT":f=ye(g,$);break;case"PCI":f=Ae(g,$);break;case"GIN":f=Ce(g,$);break;default:o&&Te(g,$,e),w=!1;break}const b=(I=R[a])==null?void 0:I[D];if(b){const A=((M=$[0])==null?void 0:M.split(":")[0])??"";b.hasOwnProperty(A)||(f=`<p class="edi-error">
          Unknown ${D} qualifier: "${A}"<br/>
          allowed: ${Object.keys(b).join(", ")}
        </p>`+f)}w&&(P.innerHTML=f,e.appendChild(P))}s.lineNumber&&s.ean&&s.quantity&&i.push(s);const{valid:l,missing:d,type:m}=K(t),p=z[m??""]??m??"Unknown",h=L();d.length>0?h.textContent=`❌ ${d.length} segment(s) missing for ${p}`:h.textContent=`✅ ${p} contains all required segments`;const N=document.createElement("div");N.className=`validation-box ${l?"success":"error"}`,N.innerHTML=`
    <div>
      <p><strong>
      ${l?`✅ ${p} contains all required segments`:`❌ ${p} is missing required segments:`}
    </strong></p>
      ${l?"":`<ul>${d.map(g=>`<li>${g}</li>`).join("")}</ul>`}
    </div>
  `,e.prepend(N),G(i,e)}const{textarea:Ie,toggleCheckbox:De}=O();Ie.addEventListener("input",v);De.addEventListener("change",v);v();
