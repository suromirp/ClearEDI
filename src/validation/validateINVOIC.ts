import { invoicValidationRules } from './validationRulesINVOIC';
import { validateWithRules } from './validationUtils';

export function validateINVOIC(segments: string[]) {
  const result = validateWithRules(segments, invoicValidationRules);
  if (!result.valid) {
    console.warn('INVOIC validation failed. Missing segments:', result.missing);
  }
  return result;
}
