// validationUtils.ts

import type { ValidationRule } from './validationTypes';

export function validateWithRules(
  segments: string[],
  rules: ValidationRule[]
): { valid: boolean; missing: string[] } {
  const foundTags = segments.map(s => s.split('+')[0]);
  const missing: string[] = [];

  for (const rule of rules) {
    const isRequired = rule.mandatory || (rule.condition ? rule.condition(segments) : false);
    if (isRequired && !foundTags.includes(rule.segment)) {
      missing.push(rule.segment);
    }
  }

  return {
    valid: missing.length === 0,
    missing
  };
}
