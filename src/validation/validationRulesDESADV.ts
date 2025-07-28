// validationRulesDESADV.ts
import type { ValidationRule } from './validationTypes';

export const desadvValidationRules: ValidationRule[] = [
  // 1. Message header
  { segment: 'UNH', mandatory: true },   
  { segment: 'BGM', mandatory: true },   // M BGM – Beginning of Message 

  // 2. Document dates (C507)
  {
    segment: 'DTM',
    mandatory: true,
    condition: segs => segs.some(s => s.startsWith('DTM+137:'))
  },                                      // M 137 = Document/message date 
  {
    segment: 'DTM',
    mandatory: true,
    condition: segs => segs.some(s => s.startsWith('DTM+132:'))
  },                                      // M 132 = Arrival date/time, estimated 
  {
    segment: 'DTM',
    condition: segs => segs.some(s => s.startsWith('DTM+11:'))
  },                                      // C 11 = Despatch date/time, actual 

  // 3. References
  {
    segment: 'RFF',
    mandatory: true,
    condition: segs => segs.some(s => s.startsWith('RFF+ON:'))
  },                                      // M RFF+ON (Order number) 

  // 4. Parties
  { segment: 'NAD', mandatory: true },   // M NAD (BY, SU, DP…) 

  // 5. Packing hierarchy
  { segment: 'CPS', mandatory: true },   // M CPS – Packing sequence 
  { segment: 'PAC', mandatory: true },   // M PAC – Package details 

  // 6. Line items
  { segment: 'LIN', mandatory: true },   // M LIN – Line item 
  { segment: 'QTY', mandatory: true },   // M QTY – Quantities 

  // 7. Summary & trailer
  { segment: 'UNS', mandatory: false },   // M UNS – Section control - Niet zeker of dit nodig is, in EDIFACT staat van wel. In het voorbeeld van DESADV komt dit niet terug.
  { segment: 'CNT', mandatory: true },   // M CNT – Control total 
  { segment: 'UNT', mandatory: true }    // M UNT – Message trailer 
];
