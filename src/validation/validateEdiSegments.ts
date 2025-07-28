// validateEdiSegments.ts

import type { ValidationRule } from './validationTypes';

import { segmentDependencies } from './segmentDependencies';

export function validateEdiSegments(
  segments: string[],
  rules: ValidationRule[],
  context?: { messageType?: string }
): { valid: boolean; missing: string[] } {
  const errors: string[] = [];

  // 1. Standard rules check
  for (const rule of rules) {
    const found = segments.find(s => s.startsWith(rule.segment + '+'));
    const isRequired = rule.mandatory || (rule.condition?.(segments) ?? false);

    if (!found && isRequired) {
      errors.push(`Missing segment: ${rule.segment}`);
    } else if (found && rule.validate) {
      const result = rule.validate(found, context);
      if (result !== true) errors.push(result);
    }
  }

  // 2. Extra dependency checks
  if (context?.messageType) {
    const deps = segmentDependencies.filter(d => d.messageType === context.messageType);

    for (const dep of deps) {
      const triggerLines = segments.filter(s => s.startsWith(`${dep.triggerSegment}+${dep.triggerCode}`));
      const requiredLines = segments.filter(s => s.startsWith(`${dep.requiredSegment}+${dep.requiredCode}`));

      if (triggerLines.length > 0 && requiredLines.length === 0) {
        errors.push(
          `Missing ${dep.requiredSegment}+${dep.requiredCode} for ${dep.triggerSegment}+${dep.triggerCode}`
        );
      }
    }
  }

  // 3. Return result
  return {
    valid: errors.length === 0,
    missing: errors
  };
}

