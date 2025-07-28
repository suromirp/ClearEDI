// src/runValidation.ts
import type { ValidationRule } from './validation/validationTypes';
import { validationRulesORDRSP } from './validation/validationRulesORDRSP';
import { validationRulesDESADV } from './validation/validationRulesDESADV';
import { validationRulesINVOIC } from './validation/validationRulesINVOIC';
import { validationRulesORDERS } from './validation/validationRulesORDERS';

const rulesPerType: Record<string, ValidationRule[]> = {
  ORDRSP: validationRulesORDRSP,
  DESADV: validationRulesDESADV,
  INVOIC: validationRulesINVOIC,
  ORDERS: validationRulesORDERS,
};

function detectMessageType(segments: string[]): string {
  const unh = segments.find(s => s.startsWith('UNH+'));
  const type = unh?.split('+')[2]?.split(':')[0];
  return type ?? 'UNKNOWN';
}

export function runValidation(segments: string[]) {
  const type = detectMessageType(segments);
  const rules = rulesPerType[type] ?? [];

  const segmentTags = segments.map(s => s.split('+')[0]);
  const missing: string[] = [];

  for (const rule of rules) {
    const present = segmentTags.includes(rule.segment);
    const required = rule.mandatory ?? rule.condition?.(segments);

    if (required && !present) {
      missing.push(rule.segment);
    }

    // Je kunt ook inline segment-validators hier draaien indien nodig:
    // if (rule.validate && present) {
    //   const segment = segments.find(s => s.startsWith(rule.segment + '+'))!;
    //   const result = rule.validate(segment, { messageType: type });
    //   if (typeof result === 'string') missing.push(`${rule.segment}: ${result}`);
    // }
  }

  return {
    valid: missing.length === 0,
    missing,
    type,
  };
}
