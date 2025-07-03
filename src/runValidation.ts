import { validateORDERS } from './validation/validateORDERS';
import { validateORDRSP } from './validation/validateORDRSP';
import { validateDESADV } from './validation/validateDESADV';
import { validateINVOIC } from './validation/validateINVOIC';

export function runValidation(segments: string[], messageType: string): string[] {
  switch (messageType) {
    case 'ORDERS':
      return validateORDERS(segments);
    case 'ORDRSP':
      return validateORDRSP(segments);
    case 'DESADV':
      return validateDESADV(segments);
    case 'INVOIC':
      return validateINVOIC(segments);
    default:
      return ['⚠️ Onbekend berichttype'];
  }
}
