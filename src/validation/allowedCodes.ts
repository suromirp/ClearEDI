/**
 * allowedCodes maps:
 *   messageType → segmentTag → qualifierCode → description
 */
export type AllowedCodesMap = {
  [messageType: string]: {
    [segmentTag: string]: {
      [qualifier: string]: string;
    };
  };
};

export const allowedCodes: AllowedCodesMap = {
  ORDERS: {

    BGM: {
      '220': 'Order',                                   // :contentReference[oaicite:0]{index=0}
    },

    // QTY: only “Ordered quantity”
    QTY: { '21': 'Ordered quantity' }, // :contentReference[oaicite:0]{index=0}

    // DTM: document date + requested delivery date
    DTM: {
      '137': 'Document/message date/time', // :contentReference[oaicite:1]{index=1}
      '2': 'Requested delivery date/time', // :contentReference[oaicite:2]{index=2}
    },

    // RFF: backorder reference + VAT registration number
    RFF: {
      ADE: 'Account number', // :contentReference[oaicite:3]{index=3}
      VA: 'VAT registration number', // :contentReference[oaicite:4]{index=4}
    },

    // CUX: reference and order currency
    CUX: {
      '2': 'Reference currency', // :contentReference[oaicite:5]{index=5}
      '9': 'Order currency', // :contentReference[oaicite:6]{index=6}
    },

    // LIN: only EAN
    LIN: { 
      EN: 'International Article Numbering Association (EAN)', // :contentReference[oaicite:7]{index=7}
      '2': 'Cancelled',
      '5': 'Accepted without amendment',
      '6': 'Accepted with amendment',
    },
    // PRI: only net price
    PRI: {
      AAA: 'Calculation net (the price stated is the net price including allowances/charges)', // :contentReference[oaicite:8]{index=8}
    },

    // NAD: buyer, supplier, delivery party, invoicee
    NAD: {
      BY: 'Buyer', // :contentReference[oaicite:9]{index=9}
      SU: 'Supplier', // :contentReference[oaicite:10]{index=10}
      DP: 'Delivery party', // :contentReference[oaicite:11]{index=11}
      IV: 'Invoicee', // :contentReference[oaicite:12]{index=12}
    },
  },

  ORDRSP: {

    BGM: {
      '231': 'Purchase order response',                 // :contentReference[oaicite:1]{index=1}

      // Message functions
      '9': 'original',
      '4':   'Change',
      '29':  'Accepted without amendment',
    },
    // QTY: confirmed, cancelled, backorder
    QTY: {
      '12': 'Confirmed quantity', // :contentReference[oaicite:13]{index=13}
      '182': 'Cancelled quantity', // :contentReference[oaicite:14]{index=14}
      '83': 'Backorder quantity', // :contentReference[oaicite:15]{index=15}
    },

    // DTM: doc date, order date, confirmed + backorder delivery dates
    DTM: {
      '137': 'Document/message date/time', // :contentReference[oaicite:16]{index=16}
      '171': 'Order date/time', // :contentReference[oaicite:17]{index=17}
      '67': 'Confirmed delivery date/time', // :contentReference[oaicite:18]{index=18}
      '506': 'Backorder delivery date/time', // :contentReference[oaicite:19]{index=19}
    },

    // RFF: always order number
    RFF: { ON: 'Order number' }, // :contentReference[oaicite:20]{index=20}

    // NAD: buyer, supplier, delivery party
    NAD: {
      BY: 'Buyer', // :contentReference[oaicite:21]{index=21}
      SU: 'Supplier', // :contentReference[oaicite:22]{index=22}
      DP: 'Delivery party', // :contentReference[oaicite:23]{index=23}
    },
  },

  DESADV: {

    BGM: {
      '351': 'Despatch advice',                         // :contentReference[oaicite:2]{index=2}
    },
    // QTY: confirmed, cancelled, backorder
    QTY: {
      '12': 'Confirmed quantity', // :contentReference[oaicite:24]{index=24}
      '182': 'Cancelled quantity', // :contentReference[oaicite:25]{index=25}
      '83': 'Backorder quantity', // :contentReference[oaicite:26]{index=26}
    },

    // DTM: document, despatch, arrival, best-before
    DTM: {
      '137': 'Document/message date/time', // :contentReference[oaicite:27]{index=27}
      '11': 'Despatch date and/or time, actual', // :contentReference[oaicite:28]{index=28}
      '132': 'Arrival date/time, estimated', // :contentReference[oaicite:29]{index=29}
      '361': 'Best before date', // :contentReference[oaicite:30]{index=30}
    },

    // RFF: bill of lading + order
    RFF: {
      BM: 'Bill of loading number', // :contentReference[oaicite:31]{index=31}
      ON: 'Order number (purchase)', // :contentReference[oaicite:32]{index=32}
    },

    // NAD: buyer, supplier, delivery party, carrier
    NAD: {
      BY: 'Buyer', // :contentReference[oaicite:33]{index=33}
      SU: 'Supplier', // :contentReference[oaicite:34]{index=34}
      DP: 'Delivery party', // :contentReference[oaicite:35]{index=35}
      CA: 'Carrier', // :contentReference[oaicite:36]{index=36}
    },

    CPS: {},

    PAC: { '52': 'Packaging details code' }, // :contentReference[oaicite:37]{index=37}

    PCI: { '33E': 'SSCC label' }, // :contentReference[oaicite:38]{index=38}

    GIN: {
      BN: 'Serial number', // :contentReference[oaicite:39]{index=39}
      BX: 'Batch number', // :contentReference[oaicite:40]{index=40}
    },

    PIA: {
      '5': 'Additional product identification', // :contentReference[oaicite:41]{index=41}
      SA: "Supplier's article number", // :contentReference[oaicite:42]{index=42}
    },

    LIN: { EN: 'International Article Numbering Association (EAN)' }, // :contentReference[oaicite:43]{index=43}

    PRI: { AAA: 'Calculation net' }, // :contentReference[oaicite:44]{index=44}
  },

  INVOIC: {

     BGM: {
      '380': 'Commercial invoice',                      // 
      '381': 'Credit note',                             // 
    },
    // QTY: invoiced quantity only
    QTY: { '47': 'Invoiced quantity' }, // :contentReference[oaicite:45]{index=45}

    // MOA: line-item amount + charge/allowance
    MOA: {
      '203': 'Line item amount', // :contentReference[oaicite:46]{index=46}
      '8': 'Charge/Allowance amount', // :contentReference[oaicite:47]{index=47}
    },

    // PRI: net + gross + contract
    PRI: {
      AAA: 'Calculation net', // :contentReference[oaicite:48]{index=48}
      AAB: 'Calculation gross', // :contentReference[oaicite:49]{index=49}
      CT: 'Contract', // :contentReference[oaicite:50]{index=50}
    },

    // RFF: order reference
    RFF: { ON: 'Order number' }, // :contentReference[oaicite:51]{index=51}

    // NAD: buyer, supplier, delivery party, invoicee
    NAD: {
      BY: 'Buyer', // :contentReference[oaicite:52]{index=52}
      SU: 'Supplier', // :contentReference[oaicite:53]{index=53}
      DP: 'Delivery party', // :contentReference[oaicite:54]{index=54}
      IV: 'Invoicee', // :contentReference[oaicite:55]{index=55}
    },
  },
};
