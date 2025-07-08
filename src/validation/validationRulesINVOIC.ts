import type { ValidationRule } from './validationTypes';

export const invoicValidationRules: ValidationRule[] = [
  { segment: 'UNH', mandatory: true },
  { segment: 'BGM', mandatory: true },
  { segment: 'DTM', mandatory: true },   // 137 - document date
  { segment: 'RFF', mandatory: true },   // order/credit ref
  { segment: 'NAD', mandatory: true },   // minimaal 4x (BY, SU, DP, IV) - validator checkt globaal
  { segment: 'CUX', mandatory: true },
  { segment: 'LIN', mandatory: true },
  { segment: 'IMD', mandatory: true },   // item description
  { segment: 'QTY', mandatory: true },
  { segment: 'PRI', mandatory: true },
  { segment: 'TAX', mandatory: true },
  { segment: 'MOA', mandatory: true },
  { segment: 'UNS', mandatory: true },
  { segment: 'UNT', mandatory: true }
];
