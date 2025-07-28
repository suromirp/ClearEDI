import type { ValidationRule } from './validationTypes';

export const validationRulesORDERS: ValidationRule[] = [
  { segment: 'UNH', mandatory: true },
  { segment: 'BGM', mandatory: true },
  { segment: 'DTM', mandatory: true },                               // 137 - document date
  { segment: 'DTM', condition: segs => segs.some(line => line.includes('DTM+2:')) }, // 2 - requested delivery date per orderregel
  { segment: 'NAD', mandatory: true }, 
  { segment: 'CUX', mandatory: true },
  { segment: 'LIN', mandatory: true },
  { segment: 'QTY', mandatory: true },
  { segment: 'PRI', mandatory: true },
  { segment: 'UNS', mandatory: true },
  { segment: 'CNT', mandatory: true },
  { segment: 'UNT', mandatory: true }
];
