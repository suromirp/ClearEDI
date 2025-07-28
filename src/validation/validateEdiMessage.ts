// validateEdiMessage.ts
import { detectEdiType } from './detectEdiType';
import { validateEdiSegments } from './validateEdiSegments';
import type { ValidationRule } from './validationTypes';
import { ordrspValidationRules } from './validationRulesORDRSP';
import { ordersValidationRules } from './validationRulesORDERS';
import { desadvValidationRules } from './validationRulesDESADV';
import { invoicValidationRules } from './validationRulesINVOIC';

export function validateEdiMessage(segments: string[]) {
  const messageType = detectEdiType(segments);

const ruleMap: Record<string, ValidationRule[]> = {
  ORDRSP: ordrspValidationRules,
  ORDERS: ordersValidationRules,
  DESADV: desadvValidationRules,
  INVOIC: invoicValidationRules
};

  const rules  = ruleMap[messageType];

if (!rules) {
  return {
    valid: false,
    missing: [`Unknown or unsupported message type: ${messageType}`],
    messageType
  };
}

  const result = validateEdiSegments(segments, rules, { messageType });

  // Extra validatie per type
  if (messageType === 'ORDRSP') {
    const linCount = segments.filter(s => s.startsWith('LIN+')).length;
    if (linCount < 1) {
      result.valid = false;
      result.missing.push('At least one LIN segment is required');
    }
  }

  return { ...result, messageType };
}