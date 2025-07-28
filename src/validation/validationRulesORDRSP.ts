// validationRulesORDRSP.ts

import { validateFixedSegment } from './validateFixedSegments';
import type { ValidationRule } from './validationTypes';

export const validationRulesORDRSP: ValidationRule[] = [
  // Header
  { segment: 'UNH', mandatory: true, validate: validateFixedSegment },
  { segment: 'BGM', mandatory: true, validate: validateFixedSegment },
  { segment: 'DTM', mandatory: true, validate: validateFixedSegment },
  { segment: 'CUX', mandatory: true, validate: validateFixedSegment },

  // References
  { segment: 'RFF', mandatory: true, validate: validateFixedSegment },

  // Parties
  { segment: 'NAD', mandatory: true, validate: validateFixedSegment },

  // Lines
  { segment: 'LIN', mandatory: true }, // LIN bevat variabele productcodes, geen vaste expected value

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
      segs.some(s => s.startsWith('DTM+67:')) // confirmed delivery date/time
  },
  {
    segment: 'DTM',
    condition: segs =>
      segs.some(s => s.startsWith('LIN+6')) &&
      segs.some(s => s.startsWith('DTM+506:')) // backorder delivery date/time
  },

  // Summary & trailer
  { segment: 'UNS', mandatory: true, validate: validateFixedSegment },
  { segment: 'CNT', mandatory: true, validate: validateFixedSegment },
  { segment: 'UNT', mandatory: true, validate: validateFixedSegment }
];
