import { desadvValidationRules } from './validationRulesDESADV';
import { validateWithRules } from './validationUtils';

export function validateDESADV(segments: string[]) {
  const result = validateWithRules(segments, desadvValidationRules);
  if (!result.valid) {
    console.warn('DESADV validation failed. Missing segments:', result.missing);
  }
  return result;
}
