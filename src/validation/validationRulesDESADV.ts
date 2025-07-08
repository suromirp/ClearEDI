import type { ValidationRule } from './validationTypes';

export const desadvValidationRules: ValidationRule[] = [
  { segment: 'UNH', mandatory: true },
  { segment: 'BGM', mandatory: true },
  { segment: 'DTM', mandatory: true },                              // 137 - document date
  { segment: 'DTM', mandatory: true, condition: () => true },        // 132 - arrival (altijd verplicht)
  { segment: 'DTM', condition: segs => segs.some(line => line.startsWith('DTM+11:')) }, // 11 - despatch (optioneel)
  { segment: 'RFF', mandatory: true },
  { segment: 'NAD', mandatory: true },
  { segment: 'CPS', mandatory: true },
  { segment: 'LIN', mandatory: true },
  { segment: 'QTY', mandatory: true },
  { segment: 'UNS', mandatory: true },
  { segment: 'CNT', mandatory: true },
  { segment: 'UNT', mandatory: true }
];
