// validateORDRSP.ts

import { ordrspValidationRules } from './validationRulesORDRSP';
import { validateWithRules } from './validationUtils';

export function validateORDRSP(segments: string[]) {
  const result = validateWithRules(segments, ordrspValidationRules);

  // Extra: LIN moet minimaal 1× voorkomen
  const linCount = segments.filter(line => line.startsWith('LIN+')).length;
  if (linCount < 1) {
    result.valid = false;
    result.missing.push('Minimaal 1 LIN-segment vereist');
  }

  return result;
}
