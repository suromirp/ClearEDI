// segmentDependencies.ts

// In this file you can specify what codes are needed together to function

export type SegmentDependency = {
  triggerSegment: string;           // bijv. 'LIN'
  triggerCode: string;              // bijv. '5'
  requiredSegment: string;          // bijv. 'QTY'
  requiredCode: string;             // bijv. '12'
  messageType: string;              // bijv. 'ORDRSP'
};

export const segmentDependencies: SegmentDependency[] = [

  // --- ORDERS segment dependencies ---

  // Each LIN (line item) must include:
  // PIA+1 (Additional article reference / supplier code)
  // QTY+21 (Ordered quantity)
  {
    messageType: 'ORDERS',
    triggerSegment: 'LIN',
    triggerCode: '*',
    requiredSegment: 'PIA',
    requiredCode: '1'
  },
  {
    messageType: 'ORDERS',
    triggerSegment: 'LIN',
    triggerCode: '*',
    requiredSegment: 'QTY',
    requiredCode: '21'
  },

  // If DTM+137 (order date) is present, DTM+2 (requested delivery date) is required
  {
    messageType: 'ORDERS',
    triggerSegment: 'DTM',
    triggerCode: '137',
    requiredSegment: 'DTM',
    requiredCode: '2'
  },

  // If RFF+VA (VAT number) is used, RFF+ADE (Account) must be present as well
  {
    messageType: 'ORDERS',
    triggerSegment: 'RFF',
    triggerCode: 'VA',
    requiredSegment: 'RFF',
    requiredCode: 'ADE'
  },

  // Every order must include NAD segments for buyer (BY) and supplier (SU)
  {
    messageType: 'ORDERS',
    triggerSegment: 'BGM',
    triggerCode: '220',
    requiredSegment: 'NAD',
    requiredCode: 'BY'
  },
  {
    messageType: 'ORDERS',
    triggerSegment: 'BGM',
    triggerCode: '220',
    requiredSegment: 'NAD',
    requiredCode: 'SU'
  },

  { 
    messageType: 'ORDRSP', 
    triggerSegment: 'LIN', 
    triggerCode: '5', 
    requiredSegment: 'QTY', 
    requiredCode: '12' 
  },
  { 
    messageType: 'ORDRSP', 
    triggerSegment: 'LIN', 
    triggerCode: '6', 
    requiredSegment: 'QTY', 
    requiredCode: '83' 
  },
  { 
    messageType: 'ORDRSP', 
    triggerSegment: 'LIN', 
    triggerCode: '2', 
    requiredSegment: 'QTY', 
    requiredCode: '182' 
  },

  // --- DESADV segment dependencies ---

// Every LIN (line item) must be followed by a QTY with code 12 (Despatched quantity)
{
  messageType: 'DESADV',
  triggerSegment: 'LIN',
  triggerCode: '*',
  requiredSegment: 'QTY',
  requiredCode: '12'
},

// Each PAC (package) must be accompanied by a GIN+BX (Batch number)
{
  messageType: 'DESADV',
  triggerSegment: 'PAC',
  triggerCode: '*',
  requiredSegment: 'GIN',
  requiredCode: 'BX'
},

// Each PAC may also include a GIN+BN (Serial number), especially for unique identification
{
  messageType: 'DESADV',
  triggerSegment: 'PAC',
  triggerCode: '*',
  requiredSegment: 'GIN',
  requiredCode: 'BN'
},

// Every CPS (hierarchy) must be followed by a PAC (package)
{
  messageType: 'DESADV',
  triggerSegment: 'CPS',
  triggerCode: '*',
  requiredSegment: 'PAC',
  requiredCode: '*'
},

// If DTM+11 (actual despatch date) is present, DTM+132 (estimated arrival) must also be present
{
  messageType: 'DESADV',
  triggerSegment: 'DTM',
  triggerCode: '11',
  requiredSegment: 'DTM',
  requiredCode: '132'
},

// If a despatch is sent, order reference must always be present: RFF+ON
{
  messageType: 'DESADV',
  triggerSegment: 'BGM',
  triggerCode: '351',
  requiredSegment: 'RFF',
  requiredCode: 'ON'
},

   // Each line item (LIN) must include a price, quantity, and amount
  {
    messageType: 'INVOIC',
    triggerSegment: 'LIN',
    triggerCode: '*',
    requiredSegment: 'PRI',
    requiredCode: 'AAA'
  },
  {
    messageType: 'INVOIC',
    triggerSegment: 'LIN',
    triggerCode: '*',
    requiredSegment: 'QTY',
    requiredCode: '47'
  },
  {
    messageType: 'INVOIC',
    triggerSegment: 'LIN',
    triggerCode: '*',
    requiredSegment: 'MOA',
    requiredCode: '203'
  },

  // If RFF+DQ (Delivery note) is used, RFF+ON (Order number) must also be present
  {
    messageType: 'INVOIC',
    triggerSegment: 'RFF',
    triggerCode: 'DQ',
    requiredSegment: 'RFF',
    requiredCode: 'ON'
  },

  // Totals section dependencies: if any MOA+259 or 260 is used, TAX must be present
  {
    messageType: 'INVOIC',
    triggerSegment: 'MOA',
    triggerCode: '259',
    requiredSegment: 'TAX',
    requiredCode: '7' // 7 = VAT
  },
  {
    messageType: 'INVOIC',
    triggerSegment: 'MOA',
    triggerCode: '260',
    requiredSegment: 'TAX',
    requiredCode: '7'
  },

  // Optional: enforce that totals group together
  {
    messageType: 'INVOIC',
    triggerSegment: 'MOA',
    triggerCode: '9',
    requiredSegment: 'MOA',
    requiredCode: '125'
  },
  {
    messageType: 'INVOIC',
    triggerSegment: 'MOA',
    triggerCode: '259',
    requiredSegment: 'MOA',
    requiredCode: '260'
  }
];
