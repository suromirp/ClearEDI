import type { ValidationRule } from './validationTypes';

export const ordrspValidationRules: ValidationRule[] = [
  // Header
  { segment: 'UNH', mandatory: true },
  { segment: 'BGM', mandatory: true },
  { segment: 'DTM', mandatory: true },       // e.g. 137 or 171
  { segment: 'CUX', 
    mandatory: true,
    condition: segs => segs.includes('CUX+2:EUR:9')
  },

  // References
  { segment: 'RFF', mandatory: true },       // ON: Order number

  // Parties
  { segment: 'NAD', mandatory: true },       // BY, SU, etc.

  // Lines
  { segment: 'LIN', mandatory: true },       // one or more line items

  // QTY: conditional per action code in LIN
  {
    segment: 'QTY',
    condition: segs => segs.some(s => s.startsWith('LIN+5')) // confirmed
  },
  {
    segment: 'QTY',
    condition: segs => segs.some(s => s.startsWith('LIN+6')) // backorder
  },
  {
    segment: 'QTY',
    condition: segs => segs.some(s => s.startsWith('LIN+2')) // cancelled
  },

  // DTM qualifiers per action code
  {
    segment: 'DTM',
    condition: segs =>
      segs.some(s => s.startsWith('LIN+5')) &&
      segs.some(s => s.startsWith('DTM+67:'))   // confirmed delivery date/time
  },
  {
    segment: 'DTM',
    condition: segs =>
      segs.some(s => s.startsWith('LIN+6')) &&
      segs.some(s => s.startsWith('DTM+506:'))  // backorder delivery date/time
  },

  // Summary & trailer
  { segment: 'UNS', mandatory: true },
  { segment: 'CNT', mandatory: true },
  { segment: 'UNT', mandatory: true }
];
