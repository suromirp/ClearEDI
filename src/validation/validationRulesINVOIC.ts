// validationRulesINVOIC.ts
import type { ValidationRule } from './validationTypes';

export const invoicValidationRules: ValidationRule[] = [
  // 1. Message header
  { segment: 'UNH', mandatory: true },                                      // M UNH :contentReference[oaicite:25]{index=25}
  { segment: 'BGM', mandatory: true },                                      // M BGM :contentReference[oaicite:26]{index=26}

  // 2. Header dates
  { segment: 'DTM', mandatory: true },                                      // M DTM+137 (Issue date) :contentReference[oaicite:27]{index=27}
  { segment: 'DTM', condition: segs =>                                       // M DTM+171 when present in example :contentReference[oaicite:28]{index=28}
      segs.some(s => s.startsWith('DTM+171:'))
  },

  // 3. References in header
  { segment: 'RFF', mandatory: true },                                      // M RFF+ON (Order number) :contentReference[oaicite:29]{index=29}
  { segment: 'RFF', condition: segs =>                                      // M RFF+DQ (Delivery note) :contentReference[oaicite:30]{index=30}
      segs.some(s => s.startsWith('RFF+DQ:'))
  },

  // 4. Parties — at least BY, SU, DP and IV must occur (validator can check per-qualifier)
  { segment: 'NAD', mandatory: true },                                      // M NAD (Buyer/Supplier/Delivery/Invoicee) :contentReference[oaicite:31]{index=31}

  // 5. Currency
  { segment: 'CUX', mandatory: true },                                      // M CUX :contentReference[oaicite:32]{index=32}

  // 6. Detail lines
  { segment: 'LIN', mandatory: true },                                      // M LIN :contentReference[oaicite:33]{index=33}
  { segment: 'PIA', mandatory: true },                                      // M PIA+1 (Additional product ID) :contentReference[oaicite:34]{index=34}
  { segment: 'IMD', mandatory: true },                                      // M IMD :contentReference[oaicite:35]{index=35}
  { segment: 'QTY', mandatory: true },                                      // M QTY+47 :contentReference[oaicite:36]{index=36}
  { segment: 'MOA', mandatory: true },                                      // M MOA+203 (Line item amount) :contentReference[oaicite:37]{index=37}
  { segment: 'PRI', mandatory: true },                                      // M PRI 
  { segment: 'TAX', mandatory: true },                                      // M TAX :contentReference[oaicite:39]{index=39}

  // 7. Summary / trailer
  { segment: 'UNS', mandatory: true },                                      // M UNS :contentReference[oaicite:40]{index=40}
  { segment: 'MOA', mandatory: true },                                      // M MOA+9/125/176/259/260 (Invoice totals) :contentReference[oaicite:41]{index=41}
  { segment: 'TAX', mandatory: true },                                      // M TAX (Totals) :contentReference[oaicite:42]{index=42}
  { segment: 'UNT', mandatory: true }                                       // M UNT :contentReference[oaicite:43]{index=43}
];
