export function validateINVOIC(segments: string[]): string[] {
    const requiredTags = ['UNB', 'UNH', 'BGM', 'DTM', 'NAD', 'LIN', 'MOA', 'UNS', 'UNT', 'UNZ', 'TAX'];
    return requiredTags.filter(tag => !segments.some(s => s.startsWith(tag + '+')));
  }
  