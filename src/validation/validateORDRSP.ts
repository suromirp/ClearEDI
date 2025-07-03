export function validateORDRSP(segments: string[]): string[] {
    const requiredTags = ['UNB', 'UNH', 'BGM', 'DTM', 'NAD', 'LIN', 'UNS', 'UNT', 'UNZ'];
    return requiredTags.filter(tag => !segments.some(s => s.startsWith(tag + '+')));
  }
  