import type { ValidationRule } from './validationTypes';

export const ordrspValidationRules: ValidationRule[] = [
  { segment: 'UNH', mandatory: true },
  { segment: 'BGM', mandatory: true },
  { segment: 'DTM', mandatory: true }, // 137/171
  { segment: 'RFF', mandatory: true },
  { segment: 'NAD', mandatory: true },
  { segment: 'CUX', mandatory: true },
  { segment: 'LIN', mandatory: true },

  // Conditioneel: afhankelijk van LIN-actiecode (volgens bol.com-specificatie)
  { segment: 'QTY', condition: segs => segs.some(line => line.startsWith('LIN+5')) },   // QTY+12 bij actiecode 5 (confirmed)
  { segment: 'QTY', condition: segs => segs.some(line => line.startsWith('LIN+6')) },   // QTY+83 bij actiecode 6 (backorder)
  { segment: 'QTY', condition: segs => segs.some(line => line.startsWith('LIN+2')) },   // QTY+182 bij actiecode 2 (cancelled)

  // Bij actiecode 5 (confirmed) DTM+67 verplicht, bij actiecode 6 (backorder) DTM+506 verplicht
  { segment: 'DTM', condition: segs =>
      segs.some(line => line.startsWith('LIN+5')) &&
      segs.some(line => line.startsWith('DTM+67:'))
  },
  { segment: 'DTM', condition: segs =>
      segs.some(line => line.startsWith('LIN+6')) &&
      segs.some(line => line.startsWith('DTM+506:'))
  },

  { segment: 'PRI', mandatory: true },
  { segment: 'TAX', mandatory: true },
  { segment: 'UNS', mandatory: true },
  { segment: 'CNT', mandatory: true },
  { segment: 'UNT', mandatory: true }
];
