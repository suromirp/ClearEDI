import { validateFixedSegment } from './validateFixedSegments';
import type { ValidationRule } from './validationTypes';

export const validationRulesDESADV: ValidationRule[] = [
  // 1. Message header
  { segment: 'UNH', mandatory: true, validate: validateFixedSegment },
  { segment: 'BGM', mandatory: true, validate: validateFixedSegment },

  // 2. Document dates
  { segment: 'DTM', mandatory: true, validate: validateFixedSegment },

  // 3. References
  { segment: 'RFF', mandatory: true, validate: validateFixedSegment },

  // 4. Parties
  { segment: 'NAD', mandatory: true, validate: validateFixedSegment },

  // 5. Packing hierarchy
  { segment: 'CPS', mandatory: true, validate: validateFixedSegment },
  { segment: 'PAC', mandatory: true, validate: validateFixedSegment },

  // 6. Line items
  { segment: 'LIN', mandatory: true }, // variable values per item (EAN, etc.)
  { segment: 'QTY', mandatory: true }, // quantity per line — validated conditionally

  // 7. Summary & trailer
  { segment: 'UNS', mandatory: false, validate: validateFixedSegment }, // optional section control
  { segment: 'CNT', mandatory: true, validate: validateFixedSegment },
  { segment: 'UNT', mandatory: true, validate: validateFixedSegment }
]; 