export function validateORDERS(segments: string[]): string[] {
    const requiredTags = ['UNB', 'UNH', 'BGM', 'DTM', 'NAD', 'LIN', 'UNZ'];
    return requiredTags.filter(tag => !segments.some(s => s.startsWith(tag + '+')));
  }
  