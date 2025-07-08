import { ordersValidationRules } from './validationRulesORDERS';
import { validateWithRules } from './validationUtils';

export function validateORDERS(segments: string[]) {
  const result = validateWithRules(segments, ordersValidationRules);
  if (!result.valid) {
    console.warn('ORDERS validation failed. Missing segments:', result.missing);
  }
  return result;
}
