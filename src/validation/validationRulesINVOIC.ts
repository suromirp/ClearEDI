// validationRulesINVOIC.ts

import { validateFixedSegment } from './validateFixedSegments';
import type { ValidationRule } from './validationTypes';

export const validationRulesINVOIC: ValidationRule[] = [
  // 1. Message header
  { segment: 'UNH', mandatory: true, validate: validateFixedSegment },
  { segment: 'BGM', mandatory: true, validate: validateFixedSegment },

  // 2. Header dates
  { segment: 'DTM', mandatory: true, validate: validateFixedSegment },

  // 3. References
  { segment: 'RFF', mandatory: true, validate: validateFixedSegment },

  // 4. Parties — required: BY, SU, DP, IV
  { segment: 'NAD', mandatory: true, validate: validateFixedSegment },

  // 5. Currency
  { segment: 'CUX', mandatory: true, validate: validateFixedSegment },

  // 6. Detail lines
  { segment: 'LIN', mandatory: true }, // Line-specific, EAN varies
  { segment: 'PIA', mandatory: true, validate: validateFixedSegment },
  { segment: 'IMD', mandatory: true }, // Description
  { segment: 'QTY', mandatory: true, validate: validateFixedSegment },
  { segment: 'MOA', mandatory: true, validate: validateFixedSegment },
  { segment: 'PRI', mandatory: true, validate: validateFixedSegment },
  { segment: 'TAX', mandatory: true, validate: validateFixedSegment },

  // 7. Summary / trailer
  { segment: 'UNS', mandatory: true, validate: validateFixedSegment },
  { segment: 'MOA', mandatory: true, validate: validateFixedSegment }, // totals
  { segment: 'TAX', mandatory: true, validate: validateFixedSegment }, // summary tax
  { segment: 'UNT', mandatory: true, validate: validateFixedSegment }
];

