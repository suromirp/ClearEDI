export function validateDESADV(segments: string[]): string[] {
    const requiredTags = ['UNB', 'UNH', 'BGM', 'DTM', 'NAD', 'CPS', 'PAC', 'LIN', 'UNS', 'UNT', 'UNZ', 'UNS'];
    return requiredTags.filter(tag => !segments.some(s => s.startsWith(tag + '+')));
  }
  