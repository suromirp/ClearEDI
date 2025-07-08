import { validateORDERS } from './validation/validateORDERS';
import { validateORDRSP } from './validation/validateORDRSP';
import { validateDESADV } from './validation/validateDESADV';
import { validateINVOIC } from './validation/validateINVOIC';
import { detectEdiType } from './validation/detectEdiType';

export function runValidation(segments: string[]): {
  valid: boolean;
  missing: string[];
  type: string | null;
} {
  const messageType = detectEdiType(segments);
  if (!messageType) {
    return {
      valid: false,
      missing: ['⚠️ Kan berichttype niet detecteren'],
      type: null
    };
  }

  let result;
  switch (messageType) {
    case 'ORDERS':
      result = validateORDERS(segments);
      break;
    case 'ORDRSP':
      result = validateORDRSP(segments);
      break;
    case 'DESADV':
      result = validateDESADV(segments);
      break;
    case 'INVOIC':
      result = validateINVOIC(segments);
      break;
    default:
      return {
        valid: false,
        missing: ['⚠️ Onbekend berichttype'],
        type: messageType
      };
  }

  return {
    valid: result.valid,
    missing: result.missing,
    type: messageType
  };
}
